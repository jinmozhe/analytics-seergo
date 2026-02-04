import { COVERAGE_DATA } from "@/data/report-content";

export function CoveragePrecision() {
  const circumference = 283;
  const offset = circumference - (COVERAGE_DATA.percentage / 100) * circumference;

  return (
    <section className="relative block w-full py-12 md:py-20 px-4 md:px-8 max-w-[1400px] mx-auto min-h-screen flex flex-col justify-center overflow-hidden">
      
      <div className="flex flex-col h-full justify-center space-y-10 md:space-y-20 max-w-6xl mx-auto w-full">
        
        <div className="text-center space-y-2 mb-4">
          <h2 className="text-2xl md:text-4xl font-bold">
             <span className="text-gradient-report">覆盖度与精准度</span>
             <span className="text-white"> 效能评估</span>
          </h2>
          <p className="text-slate-600 uppercase tracking-widest text-xs">Reach & Quality</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-start relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

          {/* 1. Coverage (Left) */}
          <div className="flex flex-col space-y-6 md:space-y-10">
             <div className="space-y-2">
                <h3 className="text-sm font-bold text-[#007AFF] uppercase tracking-wider">01 覆盖度</h3>
                <div className="text-lg md:text-xl font-medium text-white">{COVERAGE_DATA.label}</div>
             </div>

             {/* 移动端: Flex-col 且居中图表 */}
             <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
                <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                       <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="2"></circle>
                       <circle cx="50" cy="50" r="45" fill="none" stroke="#007AFF" strokeWidth="2" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(0,122,255,0.5)] transition-all duration-1000 ease-out"></circle>
                    </svg>
                    <div className="absolute text-center">
                       <span className="text-5xl font-bold text-white tracking-tight">{COVERAGE_DATA.percentage}%</span>
                    </div>
                </div>
                
                <div className="space-y-4 md:space-y-6 flex-1 text-center md:text-left w-full">
                   <div className="flex md:block justify-between border-b border-white/5 md:border-none pb-2 md:pb-0">
                      <div className="text-xs text-slate-500 mb-1">目标池渗透率</div>
                      <div className="text-sm md:text-base text-slate-300">已覆盖目标池</div>
                   </div>
                   <div className="flex md:block justify-between">
                      <div className="text-xs text-slate-500 mb-1">核心业绩</div>
                      <div className="text-sm md:text-base text-white font-mono">{COVERAGE_DATA.revenue} <span className="text-xs text-slate-500 font-sans">Sold</span></div>
                   </div>
                </div>
             </div>

             <div className="pt-4 md:pt-6 border-t border-white/5">
                <div className="flex items-start gap-3">
                   <div className="w-1 h-1 rounded-full bg-red-500 mt-2 shadow-[0_0_8px_red] shrink-0"></div>
                   <div className="space-y-1">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">策略预警</span>
                      <p className="text-sm text-slate-400 leading-relaxed">
                         非目标池投放正在稀释核心预算。<br />
                         <span className="text-red-400">建议立即缩减非必要花费。</span>
                      </p>
                   </div>
                </div>
             </div>
          </div>

          {/* 2. Precision (Right) */}
          <div className="flex flex-col space-y-6 md:space-y-10">
             <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">02 精准度</h3>
                <div className="text-lg md:text-xl font-medium text-white">策略精准度</div>
             </div>

             <div className="space-y-6 md:space-y-8 pt-2">
                {COVERAGE_DATA.bars.map((bar, idx) => (
                  <div key={idx} className="group">
                     <div className="flex justify-between items-end mb-3">
                        <span className="text-sm text-white font-medium">
                          {bar.label} <span className="text-xs text-slate-500 ml-2">{bar.sub}</span>
                        </span>
                        <span className="text-sm md:text-lg font-mono text-slate-400">{bar.value}%</span>
                     </div>
                     <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${bar.color} ${idx === 0 ? 'shadow-[0_0_15px_rgba(0,122,255,0.6)]' : ''}`} style={{ width: `${bar.value}%` }}></div>
                     </div>
                  </div>
                ))}
             </div>

             <div className="pt-4 md:pt-6 border-t border-white/5">
                <p className="text-[10px] text-slate-600 leading-relaxed uppercase tracking-wider">
                   数据来源：基于 Top 1000 搜索词的语义分析模型 v3.2
                </p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
