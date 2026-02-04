import { useState, useRef, useEffect } from "react";
import { Send, Bot, Sparkles, Loader2, User, RefreshCw, Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"; // ✅ 改用更像 VSCode/GPT 的主题

import { 
  INITIAL_CHAT_MESSAGES, 
  SUGGESTED_PROMPTS, 
  MOCK_FULL_MARKDOWN_RESPONSE 
} from "@/data/deep-dive-mock";
import type { ChatMessage, ReportType } from "@/types/deep-dive";

// ==========================================
// 🎨 THEME CONFIGURATION (仿 Gemini/GPT 风格)
// ==========================================
const GEMINI_MARKDOWN_THEME = `
  /* 基础排版 */
  prose prose-invert prose-sm max-w-none 
  text-slate-300 leading-7

  /* 标题 (Headings) - 干净的白色 */
  prose-headings:text-slate-100 prose-headings:font-semibold 
  prose-headings:mb-4 prose-headings:mt-6 prose-h1:text-2xl prose-h2:text-xl

  /* 段落 (Paragraphs) */
  prose-p:my-3 prose-p:leading-relaxed

  /* 列表 (Lists) */
  prose-ul:my-2 prose-ul:list-disc prose-ul:pl-4 prose-li:my-1 prose-li:text-slate-300

  /* 强文本 (Bold) */
  prose-strong:text-white prose-strong:font-bold

  /* 表格 (Tables) - 极简线条风格 */
  prose-table:w-full prose-table:border-collapse prose-table:my-4 
  prose-table:text-sm
  prose-thead:border-b prose-thead:border-slate-700
  prose-th:text-slate-200 prose-th:font-medium prose-th:text-left prose-th:py-3 prose-th:px-2
  prose-td:border-b prose-td:border-slate-800 prose-td:py-3 prose-td:px-2 prose-td:text-slate-400

  /* 引用 (Blockquotes) - 灰色竖线风格 */
  prose-blockquote:border-l-[3px] prose-blockquote:border-slate-600 
  prose-blockquote:pl-4 prose-blockquote:text-slate-400 prose-blockquote:italic

  /* 行内代码 (Inline Code) - 类似 GPT 的胶囊背景 */
  prose-code:text-slate-200 prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 
  prose-code:rounded-md prose-code:font-mono prose-code:text-[0.9em]
  prose-code:before:content-none prose-code:after:content-none

  /* 链接 (Links) */
  prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
`;

interface DeepDiveChatProps {
  activeType: ReportType;
}

export function DeepDiveChat({ activeType }: DeepDiveChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const mockResponse = MOCK_FULL_MARKDOWN_RESPONSE;
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: mockResponse,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1000);
  };

  const handleClear = () => {
    setMessages(INITIAL_CHAT_MESSAGES);
  };

  return (
    <div className="flex flex-col h-full bg-[#0A1025]/60 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden relative group animate-fade-in-up delay-100">
      
      {/* Background Noise - 降低透明度让背景更干净 */}
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
        <button onClick={handleClear} className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-full transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 relative z-10 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start max-w-4xl'}`}>
            
            {/* AI Avatar */}
            {msg.role === 'model' && (
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-1">
                <Sparkles className="w-4 h-4 text-indigo-400" />
              </div>
            )}

            {/* Bubble Container */}
            <div 
              className={`rounded-2xl px-5 py-4 shadow-sm text-sm leading-relaxed overflow-hidden ${
                msg.role === 'user' 
                  ? 'bg-[#2E77F7] text-white rounded-tr-sm max-w-[85%]' // User: Bright Blue (Like iMessage/GPT User)
                  : 'bg-transparent text-slate-200 w-full' // AI: Transparent background (Like GPT/Gemini)
              }`}
            >
              {msg.role === 'model' ? (
                <div className={GEMINI_MARKDOWN_THEME}> {/* ✅ 应用主题常量 */}
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      code({node, inline, className, children, ...props}: any) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                          <div className="rounded-lg overflow-hidden border border-slate-700/50 my-5 bg-[#0d1117]">
                            {/* Code Header (Mac Style) */}
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
                              style={vscDarkPlus} // 使用 VSCode 风格
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
                    {msg.text}
                  </ReactMarkdown>
                </div>
              ) : (
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
        
        {/* Loading State (Gemini-like Pulse) */}
        {isLoading && (
          <div className="flex gap-4 justify-start max-w-3xl">
             <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
             </div>
             <div className="flex items-center gap-1 mt-2">
                <span className="w-2 h-2 bg-indigo-400/50 rounded-full animate-pulse"></span>
                <span className="w-2 h-2 bg-indigo-400/50 rounded-full animate-pulse delay-150"></span>
                <span className="w-2 h-2 bg-indigo-400/50 rounded-full animate-pulse delay-300"></span>
             </div>
          </div>
        )}

        {/* Suggestion Chips */}
        {messages.length < 3 && !isLoading && (
          <div className="mt-8 ml-12">
             <p className="text-xs text-slate-500 mb-3 ml-1">Suggested questions</p>
             <div className="flex flex-wrap gap-2">
               {SUGGESTED_PROMPTS.map((prompt, idx) => (
                 <button
                   key={idx}
                   onClick={() => handleSend(prompt)}
                   className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800/40 text-xs text-slate-300 hover:bg-slate-700 hover:text-white transition-all cursor-pointer text-left"
                 >
                   {prompt}
                 </button>
               ))}
             </div>
          </div>
        )}
      </div>

      {/* Input Area - Floating Style */}
      <div className="p-4 relative z-10 w-full max-w-4xl mx-auto">
        <div className="relative flex items-center group bg-[#1e293b]/80 backdrop-blur-xl border border-slate-600/50 rounded-2xl shadow-2xl transition-all focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/20">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask SeerGo anything..."
            disabled={isLoading}
            className="w-full bg-transparent border-none text-white text-sm pl-4 pr-12 py-4 focus:ring-0 outline-none placeholder:text-slate-500"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-indigo-600 rounded-xl text-white hover:bg-indigo-500 disabled:opacity-0 disabled:scale-90 transition-all shadow-lg shadow-indigo-600/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="text-center mt-3">
           <span className="text-[10px] text-slate-500">AI output can be inaccurate. Please verify critical metrics.</span>
        </div>
      </div>

    </div>
  );
}
