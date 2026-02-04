// 引入保持不变
import { useState, useMemo } from "react";
import { STRATEGY_OPTIONS, BUDGET_OPTIONS, EXPAND_OPTIONS } from "@/data/report-content";
import type { StrategyGoal, BudgetMode, ExpandPath } from "@/types/report";

export function DecisionConsole() {
  const [activeGoal, setActiveGoal] = useState<StrategyGoal>('roi');
  const [activeBudget, setActiveBudget] = useState<BudgetMode>('hold');
  const [activePath, setActivePath] = useState<ExpandPath>('structure');

  const gradientUnderlineStyle = {
    backgroundImage: 'linear-gradient(to right, #007AFF 0%, #007AFF 60%, #8A6D9B 80%, #FF6F3C 100%)',
    backgroundPosition: '0 100%',
    backgroundSize: '100% 1px',
    backgroundRepeat: 'no-repeat'
  };

  const systemPromise = useMemo(() => {
    // 逻辑保持不变...
    switch (activeGoal) {
      case 'roi':
        return {
          title: (<>系统将优先清理 <span className="text-white font-medium pb-1" style={gradientUnderlineStyle}>不相关</span> 与 <span className="text-white font-medium pb-1" style={gradientUnderlineStyle}>低成功率</span> 广告组。</>),
          subtitle: (<>预计 ROI 显著改善至 <span className="text-white font-bold">2.45</span>，部分长尾销量将主动回撤以换取利润净值。</>)
        };
      case 'sales':
        return {
          title: (<>系统将最大化 <span className="text-white font-medium pb-1" style={gradientUnderlineStyle}>高转化词</span> 出价，并拓展 <span className="text-white font-medium pb-1" style={gradientUnderlineStyle}>竞品流量</span>。</>),
          subtitle: (<>预计销量提升 <span className="text-white font-bold">+25%</span>，ROI 短期可能回调至 1.80。</>)
        };
      case 'balance':
      default:
        return {
          title: (<>系统将平衡 <span className="text-white font-medium pb-1" style={gradientUnderlineStyle}>结构优化</span> 与 <span className="text-white font-medium pb-1" style={gradientUnderlineStyle}>温和扩量</span> 策略。</>),
          subtitle: (<>预计 ROI 维持在 <span className="text-white font-bold">2.10</span>，销量稳步增长 <span className="text-white font-bold">+8%</span>。</>)
        };
    }
  }, [activeGoal]);

  return (
    // ✅ 关键修复: overflow-hidden
    <section className="relative block w-full py-12 md:py-20 px-4 md:px-8 max-w-[1400px] mx-auto min-h-screen flex flex-col justify-center overflow-hidden">
      
      <div className="flex flex-col h-full justify-center space-y-6 md:space-y-10 max-w-6xl mx-auto w-full">
        
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-bold">
               <span className="text-white">智能决策</span>
               <span className="text-gradient-report"> 控制中心</span>
            </h2>
            <p className="text-slate-600 uppercase tracking-widest text-[10px]">Decision Command Center</p>
          </div>
          <p className="text-slate-400 text-xs md:text-base font-light max-w-3xl mx-auto leading-relaxed">
             请选择您的核心战略意图，系统将自动配置关键执行参数
          </p>
        </div>

        {/* Strategy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {STRATEGY_OPTIONS.map((opt) => (
            <button 
              key={opt.id}
              onClick={() => setActiveGoal(opt.id)}
              className={`relative group flex flex-row md:flex-col items-center text-left md:text-center p-4 md:p-8 rounded-2xl border transition-all duration-300 outline-none overflow-hidden cursor-pointer gap-4 md:gap-0 ${
                activeGoal === opt.id 
                  ? 'bg-[#007AFF]/10 border-[#007AFF] shadow-[0_0_30px_rgba(0,122,255,0.15)]' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
               {opt.isRecommended && (
                 <div className="absolute top-0 left-0 bg-gradient-to-br from-blue-600 to-blue-700 text-white text-[10px] font-bold px-3 py-1 rounded-tl-xl rounded-br-lg shadow-lg z-10 tracking-wider">
                    系统推荐
                 </div>
               )}

               <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center md:mb-6 shrink-0 transition-colors duration-300 ${activeGoal === opt.id ? 'bg-[#007AFF] text-white shadow-lg' : 'bg-slate-800 text-slate-500'}`}>
                  {/* Icons... (保持不变) */}
                  {opt.id === 'roi' && (<svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>)}
                  {opt.id === 'sales' && (<svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>)}
                  {opt.id === 'balance' && (<svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>)}
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
                 <span className="text-sm md:text-base font-bold text-slate-200 uppercase tracking-wider">预算调整</span>
              </div>
              <div className="flex bg-black/40 p-1 rounded-xl">
                 {BUDGET_OPTIONS.map((opt) => (
                    <button key={opt.id} onClick={() => setActiveBudget(opt.id as BudgetMode)} className={`flex-1 py-2 md:py-3 text-xs md:text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${activeBudget === opt.id ? 'bg-[#007AFF] text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>{opt.label}</button>
                 ))}
              </div>
           </div>
           <div className="bg-white/5 border border-white/10 rounded-2xl py-6 px-4 md:py-9 md:px-8 flex flex-col justify-center">
               <div className="flex items-center gap-3 mb-4 md:mb-6">
                 <svg className="w-5 h-5 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                 <span className="text-sm md:text-base font-bold text-slate-200 uppercase tracking-wider">扩量方向</span>
              </div>
              <div className="flex bg-black/40 p-1 rounded-xl">
                 {EXPAND_OPTIONS.map((opt) => (
                    <button key={opt.id} onClick={() => setActivePath(opt.id as ExpandPath)} className={`flex-1 py-2 md:py-3 text-xs md:text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${activePath === opt.id ? 'bg-[#007AFF] text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>{opt.label}</button>
                 ))}
              </div>
           </div>
        </div>

        {/* Execution Bar */}
        <div className="relative w-full bg-[#0A1025] border border-white/10 rounded-3xl overflow-hidden shadow-2xl mb-10">
           <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#007AFF]/50 to-transparent"></div>
           <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 gap-6 md:gap-0">
              <div className="flex flex-col space-y-2 max-w-2xl text-center md:text-left">
                 <h3 className="text-lg md:text-2xl font-light text-slate-200 leading-snug">{systemPromise.title}</h3>
                 <div className="flex items-center justify-center md:justify-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]"></div>
                    <p className="text-xs md:text-sm text-slate-400">{systemPromise.subtitle}</p>
                 </div>
              </div>
              <div className="shrink-0 relative group w-full md:w-auto">
                 <button className="w-full md:w-auto relative px-8 py-4 bg-[#2E77F7] hover:bg-[#1a63e0] text-white rounded-xl font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(46,119,247,0.4)] group-hover:scale-105 active:scale-95 cursor-pointer">
                    立即执行决策
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                 </button>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
