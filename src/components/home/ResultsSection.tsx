import { EXECUTION_LOGS } from "@/data/home-content";

export function ResultsSection() {
  return (
    <section className="py-24 relative border-t border-white/5 bg-[#010409]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Header --- */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-wide text-center leading-tight">
            <span className="block text-white mb-3">拒绝盲目烧钱</span>
            <div>
              <span className="inline-block text-gradient-custom">
                三张清单看清生意真相
              </span>
            </div>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed mt-4">
            SeerGo 24小时为您监控、诊断并自动执行，让每一分预算都花在刀刃上。
          </p>
        </div>

        {/* --- Grid Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Stacked Cards (Loss & Opportunity) */}
          <div className="flex flex-col gap-8">
            
            {/* 1. Loss List Card (Red) */}
            <div className="glass-card bg-[#0f172a]/40 rounded-3xl p-6 relative overflow-hidden group hover:border-red-500/50 transition-all duration-500 border border-white/5 shadow-2xl flex flex-col h-full">
              {/* Glow Effect */}
              <div className="absolute -top-[100px] -right-[100px] w-64 h-64 bg-red-600/10 rounded-full blur-[80px] group-hover:bg-red-600/20 transition-all duration-700 pointer-events-none"></div>
              
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-900/20 flex items-center justify-center text-red-400 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.15)] group-hover:shadow-[0_0_25px_rgba(239,68,68,0.3)] transition-all">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide">漏钱清单</h3>
                  <p className="text-xs text-red-400 font-mono tracking-widest uppercase">Loss Detection Active</p>
                </div>
              </div>
              
              <p className="text-slate-400 text-sm mb-6 leading-relaxed border-b border-white/5 pb-4">
                智能识别店铺中的隐形失血点，精准定位无效支出，即刻止损提升利润空间。
              </p>

              <div className="space-y-3 mb-8 relative z-10 flex-1">
                <div className="p-3 rounded-lg bg-slate-900/50 border border-red-500/10 hover:border-red-500/30 transition-colors flex justify-between items-center group/item">
                   <div className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                     <span className="text-sm text-slate-300 group-hover/item:text-white transition-colors">高花费 / 0 转化广告</span>
                   </div>
                   <span className="text-[10px] font-bold bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20">HIGH RISK</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/50 border border-red-500/10 hover:border-red-500/30 transition-colors flex justify-between items-center group/item">
                   <div className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                     <span className="text-sm text-slate-300 group-hover/item:text-white transition-colors">长期高 ACOS 词</span>
                   </div>
                   <span className="text-[10px] font-bold bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/20">MED RISK</span>
                </div>
              </div>

              <div className="mt-auto bg-gradient-to-r from-slate-900 to-slate-900/50 rounded-xl p-4 border border-red-500/10 relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-1 bg-red-500"></div>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-xs text-slate-400">昨日为您节省无效预算</span>
                    <span className="text-lg font-mono font-bold text-white">$128.50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">优化后预计降低 ACOS</span>
                    <span className="text-lg font-mono font-bold text-emerald-400">-5.2%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Opportunity List Card (Emerald) */}
            <div className="glass-card bg-[#0f172a]/40 rounded-3xl p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-all duration-500 border border-white/5 shadow-2xl flex flex-col h-full">
              {/* Glow Effect */}
              <div className="absolute -top-[100px] -right-[100px] w-64 h-64 bg-emerald-600/10 rounded-full blur-[80px] group-hover:bg-emerald-600/20 transition-all duration-700 pointer-events-none"></div>
              
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-900/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide">机会清单</h3>
                   <p className="text-xs text-emerald-400 font-mono tracking-widest uppercase">Growth Scanner Active</p>
                </div>
              </div>

              <p className="text-slate-400 text-sm mb-6 leading-relaxed border-b border-white/5 pb-4">
                通过全网数据挖掘，发现被低估的流量入口与增长点，撬动新一轮增长势能。
              </p>

              <div className="space-y-3 mb-8 relative z-10 flex-1">
                <div className="p-3 rounded-lg bg-slate-900/50 border border-emerald-500/10 hover:border-emerald-500/30 transition-colors flex justify-between items-center group/item">
                   <div className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                     <span className="text-sm text-slate-300 group-hover/item:text-white transition-colors">低价潜力词挖掘</span>
                   </div>
                   <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">98% MATCH</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/50 border border-emerald-500/10 hover:border-emerald-500/30 transition-colors flex justify-between items-center group/item">
                   <div className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
                     <span className="text-sm text-slate-300 group-hover/item:text-white transition-colors">竞品流量薄弱点</span>
                   </div>
                   <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">OPPORTUNITY</span>
                </div>
              </div>

              <div className="mt-auto bg-gradient-to-r from-slate-900 to-slate-900/50 rounded-xl p-4 border border-emerald-500/10 relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-1 bg-emerald-500"></div>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                     <span className="text-xs text-slate-400">发现高潜关键词</span>
                     <span className="text-lg font-mono font-bold text-white">3 个</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-xs text-slate-400">建议增加投入预计带来销售额</span>
                     <span className="text-lg font-mono font-bold text-emerald-400">+$450.00</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Execution (Full Height, Infinite Scroll) */}
          <div className="h-full">
            <div className="glass-card bg-[#0f172a]/40 rounded-3xl p-6 relative overflow-hidden group hover:border-blue-500/50 transition-all duration-500 border border-white/5 shadow-2xl flex flex-col h-full">
               {/* Glow Effect */}
               <div className="absolute -top-[100px] -right-[100px] w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] group-hover:bg-blue-600/20 transition-all duration-700 pointer-events-none"></div>

               <div className="flex items-center gap-4 mb-6 relative z-10 flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-900/20 flex items-center justify-center text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-all">
                  <svg className="w-7 h-7 animate-[spin_4s_linear_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div className="flex-1">
                   <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-white tracking-wide">今日自动化日志</h3>
                      <div className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                      </div>
                   </div>
                   <p className="text-xs text-blue-400 font-mono tracking-widest uppercase">Auto Execution Live</p>
                </div>
              </div>

              <p className="text-slate-400 text-sm mb-6 leading-relaxed border-b border-white/5 pb-4 relative z-10 flex-shrink-0">
                24h 智能托管，自动执行并同步解释依据，每一次调整都清晰可见、有据可依。
              </p>

               {/* Infinite Auto-Scrolling Log Container (Fixed Height) */}
               <div className="overflow-hidden relative z-10 group/scroll h-[400px]">
                  {/* Fade masks */}
                  <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#0f172a]/80 to-transparent z-20 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#0f172a]/80 to-transparent z-20 pointer-events-none"></div>

                  {/* Moving Track (Paused on hover) */}
                  <div className="animate-scroll-up group-hover/scroll:[animation-play-state:paused]">
                      {/* Render logs twice for seamless loop */}
                      {[1, 2].map((i) => (
                        <div key={i}>
                          {EXECUTION_LOGS.map((log, index) => (
                            <div 
                              key={`${i}-${log.time}-${index}`} 
                              className="p-4 rounded-xl bg-slate-900/40 border border-white/5 text-sm hover:bg-slate-800/60 transition-colors group/log mb-4 mx-1"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="font-mono text-slate-500 text-[10px] border border-white/10 px-1 rounded">
                                    [{log.time}]
                                  </span>
                                  <span className={`font-bold text-sm ${
                                    log.type === 'warning' ? 'text-amber-400' : 
                                    log.type === 'danger' ? 'text-red-400' : 'text-emerald-400'
                                  }`}>
                                    {log.title}
                                  </span>
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
                          ))}
                        </div>
                      ))}
                  </div>
               </div>
               
               <div className="mt-6 bg-gradient-to-r from-slate-900 to-slate-900/50 rounded-xl p-4 border border-blue-500/10 relative overflow-hidden z-10 flex-shrink-0">
                  <div className="absolute inset-y-0 left-0 w-1 bg-blue-500"></div>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-xs text-slate-400">今日自动执行操作</span>
                      <div className="text-lg font-mono font-bold text-white flex items-center gap-2">
                        18 <span className="text-xs text-slate-500 font-normal">次</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-400">自动化人效提升</span>
                        <span className="text-lg font-mono font-bold text-blue-400">300%</span>
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
