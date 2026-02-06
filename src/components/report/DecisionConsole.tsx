// src/components/report/DecisionConsole.tsx
import { useState } from "react";
import type { DecisionApiResponse } from "@/types/report";

interface DecisionConsoleProps {
  data: DecisionApiResponse | null;
}

export function DecisionConsole({ data }: DecisionConsoleProps) {
  // [修复 1] Hooks 必须在条件返回之前无条件调用
  // 使用可选链 (?.) 防止 data 为 null 时报错，提供空字符串作为 fallback
  // 注意：在 Loader 模式下，如果 data 为 null，组件会直接进入下方的 return，这些 state 值不会被用到
  const [activeGoal, setActiveGoal] = useState<string>(data?.strategies?.[0]?.id || "");
  
  // 预算选项默认选第 2 个 (index 1)，需做越界保护
  const [activeBudget, setActiveBudget] = useState<string>(data?.controls?.budget?.options?.[1]?.id || "");
  
  // 扩量选项默认选第 3 个 (index 2)，需做越界保护
  const [activePath, setActivePath] = useState<string>(data?.controls?.expand?.options?.[2]?.id || "");

  // 空状态保护 (此时 Hooks 已经初始化完毕)
  if (!data) return <div className="py-20 text-center text-slate-600">Loading Decision Console...</div>;

  // 动态查找当前选中的策略数据
  const currentStrategy = data.strategies.find(s => s.id === activeGoal) || data.strategies[0];

  return (
    // [修复 2] 移除了 'block'，保留 'flex' 以支持 flex-col 布局
    <section className="relative w-full py-12 md:py-20 px-4 md:px-8 max-w-[1400px] mx-auto min-h-screen flex flex-col justify-center overflow-hidden">
      
      <div className="flex flex-col h-full justify-center space-y-6 md:space-y-10 max-w-6xl mx-auto w-full">
        
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-bold">
               <span className="text-white">{data.header.title_prefix}</span>
               <span className="text-gradient-report">{data.header.title_highlight}</span>
            </h2>
            <p className="text-slate-600 uppercase tracking-widest text-[10px]">{data.header.subtitle}</p>
          </div>
          <p className="text-slate-400 text-xs md:text-base font-light max-w-3xl mx-auto leading-relaxed">
             {data.header.description}
          </p>
        </div>

        {/* Strategy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {data.strategies.map((opt) => (
            <button 
              key={opt.id}
              onClick={() => setActiveGoal(opt.id)}
              className={`relative group flex flex-row md:flex-col items-center text-left md:text-center p-4 md:p-8 rounded-2xl border transition-all duration-300 outline-none overflow-hidden cursor-pointer gap-4 md:gap-0 ${
                activeGoal === opt.id 
                  ? 'bg-[#007AFF]/10 border-[#007AFF] shadow-[0_0_30px_rgba(0,122,255,0.15)]' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
               {opt.is_recommended && (
                 <div className="absolute top-0 left-0 bg-gradient-to-br from-blue-600 to-blue-700 text-white text-[10px] font-bold px-3 py-1 rounded-tl-xl rounded-br-lg shadow-lg z-10 tracking-wider">
                    系统推荐
                 </div>
               )}

               <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center md:mb-6 shrink-0 transition-colors duration-300 ${activeGoal === opt.id ? 'bg-[#007AFF] text-white shadow-lg' : 'bg-slate-800 text-slate-500'}`}>
                  {/* Icons Mapping based on icon_key */}
                  {opt.icon_key === 'roi' && (<svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>)}
                  {opt.icon_key === 'sales' && (<svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>)}
                  {opt.icon_key === 'balance' && (<svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>)}
               </div>

               <div className="flex-1">
                  <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-3 tracking-wide">{opt.label}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed md:min-h-[48px] md:flex md:items-center md:justify-center">{opt.desc}</p>
               </div>
            </button>
          ))}
        </div>

        {/* Controls Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
           <div className="bg-white/5 border border-white/10 rounded-2xl py-6 px-4 md:py-9 md:px-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                 <svg className="w-5 h-5 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                 <span className="text-sm md:text-base font-bold text-slate-200 uppercase tracking-wider">{data.controls.budget.title}</span>
              </div>
              <div className="flex bg-black/40 p-1 rounded-xl">
                 {data.controls.budget.options.map((opt) => (
                    <button key={opt.id} onClick={() => setActiveBudget(opt.id)} className={`flex-1 py-2 md:py-3 text-xs md:text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${activeBudget === opt.id ? 'bg-[#007AFF] text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>{opt.label}</button>
                 ))}
              </div>
           </div>
           <div className="bg-white/5 border border-white/10 rounded-2xl py-6 px-4 md:py-9 md:px-8 flex flex-col justify-center">
               <div className="flex items-center gap-3 mb-4 md:mb-6">
                 <svg className="w-5 h-5 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                 <span className="text-sm md:text-base font-bold text-slate-200 uppercase tracking-wider">{data.controls.expand.title}</span>
              </div>
              <div className="flex bg-black/40 p-1 rounded-xl">
                 {data.controls.expand.options.map((opt) => (
                    <button key={opt.id} onClick={() => setActivePath(opt.id)} className={`flex-1 py-2 md:py-3 text-xs md:text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${activePath === opt.id ? 'bg-[#007AFF] text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>{opt.label}</button>
                 ))}
              </div>
           </div>
        </div>

        {/* Execution Bar */}
        <div className="relative w-full bg-[#0A1025] border border-white/10 rounded-3xl overflow-hidden shadow-2xl mb-10">
           <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#007AFF]/50 to-transparent"></div>
           <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 gap-6 md:gap-0">
              <div className="flex flex-col space-y-2 max-w-2xl text-center md:text-left">
                 <h3 
                   className="text-lg md:text-2xl font-light text-slate-200 leading-snug"
                   dangerouslySetInnerHTML={{ __html: currentStrategy.system_promise.title_html }}
                 ></h3>
                 <div className="flex items-center justify-center md:justify-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]"></div>
                    <p 
                      className="text-xs md:text-sm text-slate-400"
                      dangerouslySetInnerHTML={{ __html: currentStrategy.system_promise.subtitle_html }}
                    ></p>
                 </div>
              </div>
              <div className="shrink-0 relative group w-full md:w-auto">
                 <button className="w-full md:w-auto relative px-8 py-4 bg-[#2E77F7] hover:bg-[#1a63e0] text-white rounded-xl font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(46,119,247,0.4)] group-hover:scale-105 active:scale-95 cursor-pointer">
                    {data.action_button_text}
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                 </button>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
