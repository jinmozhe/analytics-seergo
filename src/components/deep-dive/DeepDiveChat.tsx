// src/components/deep-dive/DeepDiveChat.tsx
import { useState, useRef, useEffect, type ComponentPropsWithoutRef } from "react";
import { Send, Bot, Sparkles, Loader2, User, RefreshCw, Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { ChatMessage, ReportType } from "@/types/deep-dive";

// ==========================================
// 🎨 THEME CONFIGURATION (VSCode / GPT Style)
// ==========================================
const GEMINI_MARKDOWN_THEME = `
  /* 基础排版 */
  prose prose-invert prose-sm max-w-none 
  text-slate-300 leading-7

  /* 标题 (Headings) */
  prose-headings:text-slate-100 prose-headings:font-semibold 
  prose-headings:mb-4 prose-headings:mt-6 prose-h1:text-2xl prose-h2:text-xl

  /* 段落 & 列表 */
  prose-p:my-3 prose-p:leading-relaxed
  prose-ul:my-2 prose-ul:list-disc prose-ul:pl-4 prose-li:my-1 prose-li:text-slate-300

  /* 强文本 */
  prose-strong:text-white prose-strong:font-bold

  /* 表格 (Tables) */
  prose-table:w-full prose-table:border-collapse prose-table:my-4 prose-table:text-sm
  prose-thead:border-b prose-thead:border-slate-700
  prose-th:text-slate-200 prose-th:font-medium prose-th:text-left prose-th:py-3 prose-th:px-2
  prose-td:border-b prose-td:border-slate-800 prose-td:py-3 prose-td:px-2 prose-td:text-slate-400

  /* 引用 (Blockquotes) */
  prose-blockquote:border-l-[3px] prose-blockquote:border-slate-600 
  prose-blockquote:pl-4 prose-blockquote:text-slate-400 prose-blockquote:italic

  /* 行内代码 */
  prose-code:text-slate-200 prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 
  prose-code:rounded-md prose-code:font-mono prose-code:text-[0.9em]
  prose-code:before:content-none prose-code:after:content-none

  /* 链接 */
  prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
`;

// 静态建议 Prompt (保留 UI 完整性，生产环境可从配置读取)
const STATIC_SUGGESTIONS = [
  "分析本周 ACOS 上涨的主要原因",
  "对比 SP 和 SB 广告的转化效果",
  "给出下周的预算分配建议"
];

interface DeepDiveChatProps {
  activeType: ReportType;
  // --- 新增真实数据 Props ---
  messages: ChatMessage[];       // 历史消息列表
  isStreaming: boolean;          // 是否正在接收 SSE 流
  streamingContent: string;      // 当前流式传输的内容片段
  onSendMessage: (text: string) => void; // 发送回调
  isLoadingHistory: boolean;     // 历史记录加载状态
}

export function DeepDiveChat({ 
  activeType,
  messages,
  isStreaming,
  streamingContent,
  onSendMessage,
  isLoadingHistory
}: DeepDiveChatProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // 自动滚动：当历史消息增加、或流式内容更新时触发
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingContent, isStreaming]);

  const handleSend = (text: string = input) => {
    if (!text.trim() || isStreaming || isLoadingHistory) return;
    onSendMessage(text);
    setInput("");
  };

  // 渲染 Markdown 内容的复用组件
  const renderMarkdown = (content: string) => (
    <div className={GEMINI_MARKDOWN_THEME}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // [FIX] Removed unused 'node', added strict types for props
          code({ inline, className, children, ...props }: ComponentPropsWithoutRef<'code'> & { inline?: boolean }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <div className="rounded-lg overflow-hidden border border-slate-700/50 my-5 bg-[#0d1117]">
                {/* Code Header */}
                <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-slate-700/50">
                   <span className="text-xs font-mono text-slate-500 lowercase">{match[1]}</span>
                   <div className="flex items-center gap-1 cursor-pointer hover:text-white text-slate-500 transition-colors">
                      <Copy className="w-3 h-3" />
                      <span className="text-[10px]">Copy</span>
                   </div>
                </div>
                {/* Code Body */}
                <SyntaxHighlighter
                  {...props}
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{ margin: 0, padding: '1rem', background: 'transparent', fontSize: '13px', lineHeight: '1.5' }}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            )
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#0A1025]/60 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden relative group animate-fade-in-up delay-100">
      
      {/* Background Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      {/* Header */}
      <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#020617]/50 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-white tracking-wide">SeerGo Intelligence</div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {activeType.toUpperCase()} Model Active
            </div>
          </div>
        </div>
        
        {/* Header Status Indicator */}
        {isLoadingHistory ? (
          <div className="flex items-center gap-2 text-xs text-slate-500 px-3 py-1 bg-white/5 rounded-full">
            <Loader2 className="w-3 h-3 animate-spin" />
            Syncing...
          </div>
        ) : (
          <button 
            onClick={() => {/* 预留: 清除历史功能 */}} 
            className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-full transition-colors"
            title="Refresh Context"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 relative z-10 custom-scrollbar">
        
        {/* Empty State / Welcome */}
        {messages.length === 0 && !isLoadingHistory && (
           <div className="mt-12 flex flex-col items-center opacity-80">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6">
                 <Sparkles className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">How can I help with this report?</h3>
              <p className="text-sm text-slate-500 max-w-md text-center mb-8">
                I have analyzed the data for the selected period. You can ask about trends, anomalies, or optimization strategies.
              </p>
              
              {/* Static Suggestions */}
              <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
                {STATIC_SUGGESTIONS.map((prompt, idx) => (
                   <button
                     key={idx}
                     onClick={() => handleSend(prompt)}
                     className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800/40 text-xs text-slate-300 hover:bg-slate-700 hover:text-white transition-all cursor-pointer"
                   >
                     {prompt}
                   </button>
                ))}
              </div>
           </div>
        )}

        {/* 1. History Messages */}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start max-w-4xl'}`}>
            
            {/* AI Avatar */}
            {msg.role === 'model' && (
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-1">
                <Sparkles className="w-4 h-4 text-indigo-400" />
              </div>
            )}

            {/* Bubble */}
            <div 
              className={`rounded-2xl px-5 py-4 shadow-sm text-sm leading-relaxed overflow-hidden ${
                msg.role === 'user' 
                  ? 'bg-[#2E77F7] text-white rounded-tr-sm max-w-[85%]' // User Bubble
                  : 'bg-transparent text-slate-200 w-full' // AI Bubble (Transparent)
              }`}
            >
              {msg.role === 'model' ? renderMarkdown(msg.text) : (
                <div className="whitespace-pre-wrap font-sans">{msg.text}</div>
              )}
            </div>

            {/* User Avatar */}
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-slate-700 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                <User className="w-4 h-4 text-slate-300" />
              </div>
            )}
          </div>
        ))}

        {/* 2. Streaming Bubble (Live Generation) */}
        {isStreaming && (
          <div className="flex gap-4 justify-start max-w-4xl">
             <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-1">
                <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
             </div>
             <div className="bg-transparent text-slate-200 w-full rounded-2xl px-5 py-4 shadow-sm text-sm leading-relaxed overflow-hidden">
                {streamingContent ? renderMarkdown(streamingContent) : (
                   <div className="flex items-center gap-1 h-6">
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-100"></span>
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-200"></span>
                   </div>
                )}
             </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 relative z-10 w-full max-w-4xl mx-auto">
        <div className={`
          relative flex items-center group bg-[#1e293b]/80 backdrop-blur-xl border 
          rounded-2xl shadow-2xl transition-all
          ${isLoadingHistory 
             ? "border-slate-700 opacity-50 cursor-not-allowed" 
             : "border-slate-600/50 focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/20"
          }
        `}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isLoadingHistory ? "Syncing history..." : "Ask SeerGo anything..."}
            disabled={isStreaming || isLoadingHistory}
            className="w-full bg-transparent border-none text-white text-sm pl-4 pr-12 py-4 focus:ring-0 outline-none placeholder:text-slate-500 disabled:cursor-not-allowed"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() || isStreaming || isLoadingHistory}
            className="absolute right-2 p-2 bg-indigo-600 rounded-xl text-white hover:bg-indigo-500 disabled:opacity-0 disabled:scale-90 transition-all shadow-lg shadow-indigo-600/20"
          >
            {isStreaming ? (
              <Loader2 className="w-4 h-4 animate-spin" /> 
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
        <div className="text-center mt-3">
           <span className="text-[10px] text-slate-500">AI output can be inaccurate. Please verify critical metrics.</span>
        </div>
      </div>

    </div>
  );
}
