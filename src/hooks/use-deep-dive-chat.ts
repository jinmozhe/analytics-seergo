// src/hooks/use-deep-dive-chat.ts
import { useState, useEffect, useRef, useCallback } from "react";
import {
    fetchQAHistory,
    initiateQA,
    getQAStreamUrl
} from "@/services/deep-dive";
import type {
    DeepDiveConfig,
    ChatMessage,
    QAMessage
} from "@/types/deep-dive";

export function useDeepDiveChat(
    config: DeepDiveConfig,
    currentReportId: string | null
) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);

    const [isStreaming, setIsStreaming] = useState(false);
    const [streamingContent, setStreamingContent] = useState("");

    // [Fix] 引入 prevId 状态，用于在渲染期间检测 ID 变化
    const [prevReportId, setPrevReportId] = useState<string | null>(null);

    // ✅ 关键修复 1: 使用 Ref 来追踪累积的文本，穿透闭包限制
    const contentRef = useRef("");
    const eventSourceRef = useRef<EventSource | null>(null);

    // [Fix] Pattern: 当 Report ID 变化时，在渲染阶段直接重置状态 (Derived State Pattern)
    // 这种写法避免了在 useEffect 中同步 setState 导致的 Cascading Renders
    if (currentReportId !== prevReportId) {
        setPrevReportId(currentReportId);
        setMessages([]);
        setStreamingContent("");
        setIsStreaming(false);
        // 乐观更新：如果有新 ID，立即进入 Loading 状态
        setIsLoadingHistory(!!currentReportId);
        // 注意：Ref 不建议在 Render 中重置，我们在 Effect 中处理
    }

    // 1. 切换报告时加载历史记录 (仅处理副作用: Fetching)
    useEffect(() => {
        // 重置 Ref (Side effect safe)
        contentRef.current = "";

        if (!currentReportId) {
            // 状态已在 Render 阶段重置，此处无需操作
            return;
        }

        let isMounted = true;
        // setIsLoadingHistory(true); // 已在 Render 阶段乐观设置

        fetchQAHistory(config, currentReportId)
            .then((history: QAMessage[]) => {
                if (!isMounted) return;
                const uiMessages: ChatMessage[] = history.flatMap(item => [
                    {
                        id: `${item.id}-q`,
                        role: 'user',
                        text: item.question,
                        timestamp: new Date(item.created_at).getTime()
                    },
                    {
                        id: `${item.id}-a`,
                        role: 'model',
                        text: item.answer,
                        timestamp: new Date(item.created_at).getTime() + 1000
                    }
                ]);
                setMessages(uiMessages);
            })
            .catch(err => console.error("History fetch failed:", err))
            .finally(() => {
                if (isMounted) setIsLoadingHistory(false);
            });

        return () => { isMounted = false; };
    }, [config, currentReportId]);

    // 2. 发送消息处理
    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim() || !currentReportId || isStreaming) return;

        // 使用临时 ID 做乐观更新，避免闪烁
        const tempId = Date.now().toString(); // 简化处理，生产环境建议用 UUID

        // A. 乐观更新
        const userMsg: ChatMessage = {
            id: tempId,
            role: 'user',
            text: text,
            timestamp: Date.now()
        };
        setMessages(prev => [...prev, userMsg]);

        // B. 准备流式接收
        setIsStreaming(true);
        setStreamingContent("");
        contentRef.current = ""; // ✅ 重置 Ref

        try {
            // C. 初始化 API 请求
            const qaId = await initiateQA(config, currentReportId, text);

            // D. 建立 SSE 连接
            const streamUrl = getQAStreamUrl(config, qaId);
            const es = new EventSource(streamUrl);
            eventSourceRef.current = es;

            es.onmessage = (event) => {
                // [DONE] 处理逻辑
                if (event.data === "[DONE]") {
                    es.close();
                    setIsStreaming(false);

                    // ✅ 关键修复 2: 从 Ref 中读取完整的累积文本
                    const finalAnswer = contentRef.current;

                    if (finalAnswer) {
                        setMessages(prev => [
                            ...prev,
                            {
                                id: qaId,
                                role: 'model',
                                text: finalAnswer, // 使用 Ref 的值
                                timestamp: Date.now()
                            }
                        ]);
                    }

                    setStreamingContent("");
                    contentRef.current = "";
                    return;
                }

                // [ERROR] 处理逻辑
                if (event.data.startsWith("[ERROR]")) {
                    console.error("SSE Error:", event.data);
                    es.close();
                    setIsStreaming(false);
                    return;
                }

                // 数据块处理逻辑
                try {
                    const json = JSON.parse(event.data);
                    if (json.content) {
                        // ✅ 关键修复 3: 同时更新 Ref (用于逻辑) 和 State (用于渲染)
                        contentRef.current += json.content;
                        setStreamingContent(contentRef.current);
                    }
                } catch (e) {
                    console.warn("SSE Parse Error", e);
                }
            };

            es.onerror = (err) => {
                console.error("SSE Connection Error", err);
                es.close();
                setIsStreaming(false);
                // 出错时也尝试保存已接收的内容
                if (contentRef.current) {
                    setMessages(prev => [
                        ...prev,
                        {
                            id: qaId,
                            role: 'model',
                            text: contentRef.current,
                            timestamp: Date.now()
                        }
                    ]);
                }
            };

        } catch (error) {
            console.error("Send failed:", error);
            setIsStreaming(false);
        }
    }, [config, currentReportId, isStreaming]);

    // 清理逻辑
    useEffect(() => {
        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }
        };
    }, []);

    return {
        messages,
        isStreaming,
        streamingContent,
        sendMessage,
        isLoadingHistory
    };
}
