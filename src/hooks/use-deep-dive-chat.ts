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

    // ✅ 关键修复 1: 使用 Ref 来追踪累积的文本，穿透闭包限制
    const contentRef = useRef("");
    const eventSourceRef = useRef<EventSource | null>(null);

    // 1. 切换报告时加载历史记录
    useEffect(() => {
        if (!currentReportId) {
            setMessages([]);
            return;
        }

        let isMounted = true;
        setIsLoadingHistory(true);
        // 切换报告时，重置流状态
        setIsStreaming(false);
        setStreamingContent("");
        contentRef.current = "";

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

        const tempId = Date.now().toString();

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
                    // 而不是读取可能过时的 streamingContent state
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
