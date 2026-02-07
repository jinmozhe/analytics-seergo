// src/components/report/DecisionConsole.tsx
import { useState } from "react";
import type { DecisionApiResponse } from "@/types/report";
import { cn } from "@/lib/utils";

interface DecisionConsoleProps {
  data: DecisionApiResponse | null;
}

// Icon Helper
const ICON_MAP: Record<string, React.JSX.Element> = {
    "target-arrow": (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
        </svg>
    ),
    "target-arrow-outline": (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
    ),
    "trending-up": (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
        </svg>
    ),
    "scale-balance": (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
        </svg>
    )
};

export function DecisionConsole({ data }: DecisionConsoleProps) {
  // 1. State Initialization
  const [activeStrategyId, setActiveStrategyId] = useState<string>(data?.strategies?.[0]?.id || "");
  const [activeBudget, setActiveBudget] = useState<string>("hold"); 
  const [activeExpand, setActiveExpand] = useState<string>("structure");

  if (!data) return <div className="py-20 text-center text-slate-600 animate-pulse">Loading Decision Console...</div>;

  // 2. Derived Data
  const currentStrategy = data.strategies.find(s => s.id === activeStrategyId) || data.strategies[0];
  const budgetOptions = data.controls.budget.options;
  const expandOptions = data.controls.expand.options;

  const getGradientClass = (color: string) => {
      switch (color) {
          case 'indigo': return "bg-gradient-to-br from-[#4F46E5] to-[#3730A3]";
          case 'slate': return "bg-gradient-to-br from-slate-700 to-slate-900";
          case 'blue': 
          default: return "bg-gradient-to-br from-[#2E77F7] to-[#1a63e0]";
      }
  };

  return (
    <section className="w-full border-t border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)] relative z-30">
      
      <div className="w-full max-w-[1280px] px-0 flex flex-col py-24 md:py-32 mx-auto relative">
        {/* [修复] 移除 'block'，只保留 'flex' 以支持 flex-col */}
        <div className="relative z-10 flex flex-col h-full justify-center space-y-10 w-full px-4 md:px-0 pb-10">
          
          {/* Background Ambience */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
             <div className="absolute -top-[10%] right-[10%] w-[600px] h-[600px] rounded-full mix-blend-screen opacity-20 filter blur-[100px] animate-pulse-slow" 
                  style={{ background: 'radial-gradient(circle, rgba(46, 119, 247, 0.6) 0%, transparent 70%)' }}></div>
             <div className="absolute -bottom-[10%] -left-[5%] w-[550px] h-[550px] rounded-full mix-blend-screen opacity-15 filter blur-[90px] animate-pulse-slow" 
                  style={{ background: 'radial-gradient(circle, rgba(249, 115, 22, 0.5) 0%, transparent 70%)', animationDelay: '2.5s' }}></div>
          </div>

          {/* Header */}
          <div className="text-center space-y-4 mb-8 relative z-10">
            <div className="space-y-2">
               <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                  <span className="text-white">{data.header.title_prefix}</span>
                  <span className="hero-gradient-text">{data.header.title_highlight}</span>
               </h2>
               <p className="text-slate-600 font-medium uppercase tracking-[0.3em] text-sm md:text-base">
                  {data.header.subtitle}
               </p>
            </div>
            <div className="text-slate-400 text-sm md:text-base font-light tracking-wide max-w-3xl mx-auto leading-relaxed mt-4">
               <p>{data.header.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 h-auto lg:h-[520px] relative z-10">
             
             {/* === LEFT PANEL: Controls === */}
             <div className="lg:col-span-8 bg-[#0B1221] border border-white/5 rounded-[32px] p-8 flex flex-col relative overflow-hidden group/panel">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>
                
                <div className="flex flex-col flex-1 relative z-10 min-h-0">
                   
                   {/* Step 1: Goals */}
                   <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-[#007AFF] flex items-center justify-center text-white font-bold text-xs border border-white/5 shadow-[0_0_10px_rgba(0,122,255,0.3)]">01</div>
                         <span className="text-sm font-bold text-slate-300 tracking-wider uppercase">确定战略目标</span>
                      </div>
                      {currentStrategy.status_tag && (
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30">
                             <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                             <span className="text-[10px] font-bold text-blue-300 tracking-widest uppercase">{currentStrategy.status_tag}</span>
                          </div>
                      )}
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full pb-8">
                      {data.strategies.map((strategy) => {
                          const isActive = strategy.id === activeStrategyId;
                          return (
                              <button 
                                key={strategy.id}
                                onClick={() => setActiveStrategyId(strategy.id)}
                                className={cn(
                                    "relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 group outline-none h-full w-full overflow-hidden",
                                    isActive 
                                        ? "bg-[#007AFF] border-[#007AFF] shadow-[0_0_25px_rgba(0,122,255,0.4)] scale-[1.02] z-10" 
                                        : "bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10"
                                )}
                              >
                                {isActive && strategy.id === 'strategy_roi' && (
                                    <div className="absolute top-3 right-3 text-white">
                                        {ICON_MAP["target-arrow"]}
                                    </div>
                                )}
                                
                                <div className={cn(
                                    "mb-4 transition-transform duration-300 group-hover:scale-110",
                                    isActive ? "text-white" : "text-slate-500 group-hover:text-slate-400"
                                )}>
                                    {strategy.id === 'strategy_roi' 
                                        ? ICON_MAP["target-arrow-outline"] 
                                        : (ICON_MAP[strategy.icon_key] || ICON_MAP["trending-up"])
                                    }
                                </div>
                                <span className={cn(
                                    "text-xl font-bold tracking-wide transition-colors duration-300",
                                    isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                                )}>
                                    {strategy.label}
                                </span>
                              </button>
                          );
                      })}
                   </div>
                </div>

                {/* Bottom Controls Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 pt-6 border-t border-white/5 shrink-0">
                   
                   {/* Step 2: Budget */}
                   <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-2">
                         <div className="w-6 h-6 rounded-full bg-[#007AFF] flex items-center justify-center text-white font-bold text-[10px] border border-white/5 shadow-[0_0_8px_rgba(0,122,255,0.3)]">02</div>
                         <span className="text-sm font-bold text-slate-400 tracking-wider uppercase">{data.controls.budget.title}</span>
                      </div>
                      
                      {/* Budget Slider UI */}
                      <div className="relative bg-[#020617] h-14 rounded-2xl p-1 flex items-center justify-between border border-white/5 group/slider">
                         {/* Option 1 */}
                         <div 
                            onClick={() => setActiveBudget(budgetOptions[0].id)}
                            className={cn(
                                "absolute left-0 top-0 bottom-0 w-1/3 flex items-center justify-center text-[10px] font-bold cursor-pointer transition-all rounded-l-2xl z-10",
                                activeBudget === budgetOptions[0].id ? "bg-white text-slate-900 shadow-lg scale-105 z-20 rounded-xl m-1 h-[calc(100%-8px)]" : "text-slate-600 hover:text-white hover:bg-white/5"
                            )}
                         >
                            {budgetOptions[0].label}
                         </div>

                         {/* Option 3 */}
                         <div 
                            onClick={() => setActiveBudget(budgetOptions[2].id)}
                            className={cn(
                                "absolute right-0 top-0 bottom-0 w-1/3 flex items-center justify-center text-[10px] font-bold cursor-pointer transition-all rounded-r-2xl z-10",
                                activeBudget === budgetOptions[2].id ? "bg-white text-slate-900 shadow-lg scale-105 z-20 rounded-xl m-1 h-[calc(100%-8px)]" : "text-slate-600 hover:text-white hover:bg-white/5"
                            )}
                         >
                            {budgetOptions[2].label}
                         </div>

                         {/* Option 2 (Middle) */}
                         <div 
                            onClick={() => setActiveBudget(budgetOptions[1].id)}
                            className={cn(
                                "mx-auto w-1/3 h-full rounded-xl text-xs font-bold z-20 cursor-pointer select-none flex items-center justify-center transition-all",
                                activeBudget === budgetOptions[1].id ? "bg-white text-slate-900 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95" : "text-slate-600 hover:text-white"
                            )}
                         >
                            {budgetOptions[1].label}
                         </div>
                         
                         <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-800 -z-0"></div>
                      </div>
                   </div>

                   {/* Step 3: Expand */}
                   <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-2">
                         <div className="w-6 h-6 rounded-full bg-[#007AFF] flex items-center justify-center text-white font-bold text-[10px] border border-white/5 shadow-[0_0_8px_rgba(0,122,255,0.3)]">03</div>
                         <span className="text-sm font-bold text-slate-400 tracking-wider uppercase">{data.controls.expand.title}</span>
                      </div>
                      
                      <div className="bg-[#020617] p-1 rounded-2xl flex border border-white/5 h-14">
                         {expandOptions.map((opt) => (
                             <button
                                key={opt.id}
                                onClick={() => setActiveExpand(opt.id)}
                                className={cn(
                                    "flex-1 rounded-xl text-[10px] md:text-xs font-bold transition-all duration-300 uppercase tracking-wide",
                                    activeExpand === opt.id 
                                        ? "bg-[#007AFF] text-white shadow-lg" 
                                        : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                                )}
                             >
                                {opt.label}
                             </button>
                         ))}
                      </div>
                   </div>

                </div>
             </div>

             {/* === RIGHT PANEL: Action Preview === */}
             <div className={cn(
                 "lg:col-span-4 rounded-[32px] p-8 flex flex-col relative overflow-hidden transition-all duration-500 shadow-2xl",
                 getGradientClass(currentStrategy.system_promise.theme_color)
             )}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] pointer-events-none"></div>
                
                {/* Tag */}
                <div className="flex items-center justify-start mb-6 relative z-10 h-8">
                   <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 backdrop-blur-md shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      <span className="text-[10px] font-bold text-white tracking-widest uppercase">{currentStrategy.system_promise.tag}</span>
                   </div>
                </div>

                {/* Title & Desc */}
                <div className="mb-6 relative z-10">
                   <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">{currentStrategy.system_promise.title}</h3>
                   <p className="text-sm font-medium text-blue-100/60 uppercase tracking-widest">{currentStrategy.system_promise.mode_label}</p>
                </div>
                <p className="text-base md:text-lg text-blue-50/80 leading-relaxed mb-10 font-light relative z-10">
                   {currentStrategy.system_promise.desc}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-auto relative z-10">
                   {/* ROI Metric */}
                   <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm border border-white/10 flex flex-col justify-center">
                      <div className="text-[10px] text-blue-200 uppercase tracking-wider mb-2">{currentStrategy.system_promise.metrics.roi.label}</div>
                      <div className="flex items-baseline">
                         <span className="text-xl md:text-2xl font-bold text-white/80 mr-0.5">{currentStrategy.system_promise.metrics.roi.sign}</span>
                         <span className="text-2xl md:text-4xl font-[Inter] font-bold text-white tracking-tighter leading-none">{currentStrategy.system_promise.metrics.roi.val}</span>
                         <span className="text-xs md:text-lg font-bold text-white/60 ml-0.5">{currentStrategy.system_promise.metrics.roi.unit}</span>
                      </div>
                   </div>
                   {/* Sales Metric */}
                   <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm border border-white/10 flex flex-col justify-center">
                      <div className="text-[10px] text-blue-200 uppercase tracking-wider mb-2">{currentStrategy.system_promise.metrics.sales.label}</div>
                      <div className="flex items-baseline">
                         <span className="text-xl md:text-2xl font-bold text-white/80 mr-0.5">{currentStrategy.system_promise.metrics.sales.sign}</span>
                         <span className="text-2xl md:text-4xl font-[Inter] font-bold text-white tracking-tighter leading-none">{currentStrategy.system_promise.metrics.sales.val}</span>
                         <span className="text-xs md:text-lg font-bold text-white/60 ml-0.5">{currentStrategy.system_promise.metrics.sales.unit}</span>
                      </div>
                   </div>
                </div>

                {/* Action Button */}
                <div className="mt-8 relative z-10">
                   <button className="w-full py-5 bg-white text-[#007AFF] rounded-2xl font-bold text-xl tracking-widest uppercase hover:bg-slate-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-3 group pl-6">
                      {data.action_button_text}
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                      </svg>
                   </button>
                </div>

             </div>

          </div>

        </div>
      </div>
    </section>
  );
}
