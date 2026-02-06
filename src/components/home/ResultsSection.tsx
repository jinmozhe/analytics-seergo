// src/components/home/ResultsSection.tsx
import type { HomeResultsData } from "@/types/home";

// 1. 标签颜色映射 (仅用于 Badge)
const TAG_STYLE_MAP: Record<string, string> = {
  red: "bg-red-500/10 text-red-400 border-red-500/20",
  orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

// 2. 日志标题颜色映射
const LOG_TITLE_COLOR_MAP: Record<string, string> = {
  success: "text-emerald-400",
  warning: "text-amber-400",
  danger: "text-red-400",
};

interface ResultsSectionProps {
  data: HomeResultsData | null;
}

export function ResultsSection({ data }: ResultsSectionProps) {
  if (!data) return <div className="py-24 text-center text-slate-600">Loading Results...</div>;

  const { header, cards, execution_logs_data } = data;

  // 渲染单次日志列表的辅助函数 (用于无限滚动需要渲染两次)
  const renderLogList = () => (
    <>
      {execution_logs_data.map((log, index) => {
        const titleColor = LOG_TITLE_COLOR_MAP[log.type] || "text-emerald-400";
        return (
          <div key={index} className="p-4 rounded-xl bg-slate-900/40 border border-white/5 text-sm hover:bg-slate-800/60 transition-colors group/log mb-4 mx-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-slate-500 text-[10px] border border-white/10 px-1 rounded">[{log.time}]</span>
              <span className={`font-bold text-sm ${titleColor}`}>{log.title}</span>
            </div>
            <div className="space-y-1.5 pl-3 border-l border-white/10 ml-1 group-hover/log:border-blue-500/30 transition-colors">
              <p className="text-slate-300 text-xs leading-relaxed">
                <span className="text-slate-500 mr-2 text-[10px] uppercase tracking-wider font-bold">动作</span>
                {log.action}
              </p>
              <p className="text-slate-400 text-[10px] leading-relaxed">
                <span className="text-slate-500 mr-2 text-[10px] uppercase tracking-wider font-bold">原因</span>
                {log.reason}
              </p>
              <p className="text-slate-400 text-[10px] leading-relaxed">
                <span className="text-slate-500 mr-2 text-[10px] uppercase tracking-wider font-bold">预期</span>
                {log.expectation}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );

  return (
    <section className="py-24 relative border-t border-white/5 bg-[#010409]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header --- */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-wide text-center leading-tight">
            <span className="block text-white mb-3">{header.title_main}</span>
            <div>
              <span className="inline-block text-gradient-custom">{header.title_highlight}</span>
            </div>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed mt-4">
            {header.description}
          </p>
        </div>

        {/* --- Grid Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            
            {/* 1. Loss List Card (Red) */}
            <div className="glass-card bg-[#0f172a]/40 rounded-3xl p-6 relative overflow-hidden group hover:border-red-500/50 transition-all duration-500 border border-white/5 shadow-2xl flex flex-col h-full">
              <div className="absolute -top-[100px] -right-[100px] w-64 h-64 bg-red-600/10 rounded-full blur-[80px] group-hover:bg-red-600/20 transition-all duration-700 pointer-events-none"></div>
              
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-900/20 flex items-center justify-center text-red-400 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.15)] group-hover:shadow-[0_0_25px_rgba(239,68,68,0.3)] transition-all">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide">{cards.loss_list.title}</h3>
                  <p className="text-xs text-red-400 font-mono tracking-widest uppercase">{cards.loss_list.subtitle}</p>
                </div>
              </div>

              <p className="text-slate-400 text-sm mb-6 leading-relaxed border-b border-white/5 pb-4">
                {cards.loss_list.description}
              </p>

              <div className="space-y-3 mb-8 relative z-10 flex-1">
                {cards.loss_list.items.map((item, idx) => (
                   <div key={idx} className="p-3 rounded-lg bg-slate-900/50 border border-red-500/10 hover:border-red-500/30 transition-colors flex justify-between items-center group/item">
                      <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full ${item.tag_color === 'red' ? 'bg-red-500 animate-pulse' : 'bg-orange-500'}`}></div>
                        <span className="text-sm text-slate-300 group-hover/item:text-white transition-colors">{item.label}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${TAG_STYLE_MAP[item.tag_color] || TAG_STYLE_MAP.red}`}>
                        {item.tag}
                      </span>
                   </div>
                ))}
              </div>

              <div className="mt-auto bg-gradient-to-r from-slate-900 to-slate-900/50 rounded-xl p-4 border border-red-500/10 relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-1 bg-red-500"></div>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-xs text-slate-400">{cards.loss_list.stats.label_1}</span>
                    <span className="text-lg font-mono font-bold text-white">{cards.loss_list.stats.value_1}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">{cards.loss_list.stats.label_2}</span>
                    <span className="text-lg font-mono font-bold text-emerald-400">{cards.loss_list.stats.value_2}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Opportunity List Card (Emerald) */}
            <div className="glass-card bg-[#0f172a]/40 rounded-3xl p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-all duration-500 border border-white/5 shadow-2xl flex flex-col h-full">
              <div className="absolute -top-[100px] -right-[100px] w-64 h-64 bg-emerald-600/10 rounded-full blur-[80px] group-hover:bg-emerald-600/20 transition-all duration-700 pointer-events-none"></div>
              
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-900/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide">{cards.opportunity_list.title}</h3>
                  <p className="text-xs text-emerald-400 font-mono tracking-widest uppercase">{cards.opportunity_list.subtitle}</p>
                </div>
              </div>

              <p className="text-slate-400 text-sm mb-6 leading-relaxed border-b border-white/5 pb-4">
                {cards.opportunity_list.description}
              </p>

              <div className="space-y-3 mb-8 relative z-10 flex-1">
                {cards.opportunity_list.items.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-900/50 border border-emerald-500/10 hover:border-emerald-500/30 transition-colors flex justify-between items-center group/item">
                      <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full ${item.tag_color === 'emerald' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-emerald-600'}`}></div>
                        <span className="text-sm text-slate-300 group-hover/item:text-white transition-colors">{item.label}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${TAG_STYLE_MAP[item.tag_color] || TAG_STYLE_MAP.emerald}`}>
                        {item.tag}
                      </span>
                    </div>
                ))}
              </div>

              <div className="mt-auto bg-gradient-to-r from-slate-900 to-slate-900/50 rounded-xl p-4 border border-emerald-500/10 relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-1 bg-emerald-500"></div>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-xs text-slate-400">{cards.opportunity_list.stats.label_1}</span>
                    <span className="text-lg font-mono font-bold text-white">{cards.opportunity_list.stats.value_1}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">{cards.opportunity_list.stats.label_2}</span>
                    <span className="text-lg font-mono font-bold text-emerald-400">{cards.opportunity_list.stats.value_2}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Execution Log (Blue) */}
          <div className="h-full">
            <div className="glass-card bg-[#0f172a]/40 rounded-3xl p-6 relative overflow-hidden group hover:border-blue-500/50 transition-all duration-500 border border-white/5 shadow-2xl flex flex-col h-full">
              <div className="absolute -top-[100px] -right-[100px] w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] group-hover:bg-blue-600/20 transition-all duration-700 pointer-events-none"></div>
              
              <div className="flex items-center gap-4 mb-6 relative z-10 flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-900/20 flex items-center justify-center text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-all">
                  <svg className="w-7 h-7 animate-[spin_4s_linear_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white tracking-wide">{cards.execution_log.title}</h3>
                    <div className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </div>
                  </div>
                  <p className="text-xs text-blue-400 font-mono tracking-widest uppercase">{cards.execution_log.subtitle}</p>
                </div>
              </div>

              <p className="text-slate-400 text-sm mb-6 leading-relaxed border-b border-white/5 pb-4 relative z-10 flex-shrink-0">
                {cards.execution_log.description}
              </p>

              <div className="overflow-hidden relative z-10 group/scroll h-[400px]">
                <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#0f172a]/80 to-transparent z-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#0f172a]/80 to-transparent z-20 pointer-events-none"></div>
                
                {/* 滚动容器：必须包含两份数据以实现无缝滚动 */}
                <div className="animate-scroll-up group-hover/scroll:[animation-play-state:paused]">
                  <div>{renderLogList()}</div>
                  <div>{renderLogList()}</div>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-slate-900 to-slate-900/50 rounded-xl p-4 border border-blue-500/10 relative overflow-hidden z-10 flex-shrink-0">
                <div className="absolute inset-y-0 left-0 w-1 bg-blue-500"></div>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-xs text-slate-400">{cards.execution_log.stats.label_1}</span>
                    <div className="text-lg font-mono font-bold text-white flex items-center gap-2">
                      {cards.execution_log.stats.value_1}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">{cards.execution_log.stats.label_2}</span>
                    <span className="text-lg font-mono font-bold text-blue-400">{cards.execution_log.stats.value_2}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
