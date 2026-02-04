import { KPI_GAP_CARDS, KPI_METRICS_TOTAL, KPI_METRICS_AD } from "@/data/report-content";

export function KpiOverview() {
  const salesCard = KPI_GAP_CARDS.find(c => c.id === 'sales-gap')!;
  const roiCard = KPI_GAP_CARDS.find(c => c.id === 'roi-gap')!;

  return (
    // ✅ 关键修复: 添加 overflow-hidden 防止背景光球导致横向滚动
    <section className="relative block w-full py-12 md:py-20 px-4 md:px-8 max-w-[1400px] mx-auto min-h-screen flex flex-col justify-center overflow-hidden">
      
      {/* --- AMBIENT BACKGROUND SPHERES --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
         <div 
           className="absolute -top-[15%] -left-[10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full mix-blend-screen opacity-20 filter blur-[90px] animate-pulse-slow"
           style={{ background: 'radial-gradient(circle, rgba(46, 119, 247, 0.6) 0%, transparent 70%)' }}
         ></div>
         <div 
           className="absolute top-[30%] -right-[15%] w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full mix-blend-screen opacity-15 filter blur-[100px] animate-pulse-slow"
           style={{ 
             background: 'radial-gradient(circle, rgba(249, 115, 22, 0.5) 0%, transparent 70%)',
             animationDelay: '3s'
           }}
         ></div>
      </div>

      <div className="relative z-10 flex flex-col h-full justify-center space-y-6 md:space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-4">
          <h2 className="text-2xl md:text-4xl font-bold">
             <span className="text-gradient-report">核心 KPI</span>
             <span className="text-white"> 概览</span>
          </h2>
          <p className="text-slate-500 uppercase tracking-widest text-[10px] md:text-xs">Performance Snapshot</p>
        </div>

        {/* Top Row: Gap Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Card 1 */}
          <div className="glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden group flex flex-col justify-between">
            {/* 内容保持不变，padding 已调整为 p-6 md:p-8 */}
            <div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-base md:text-lg font-medium text-slate-200">{salesCard.title}</h3>
                <span className={`px-2 py-1 rounded bg-${salesCard.statusColor}-500/10 text-${salesCard.statusColor}-400 text-[10px] font-bold border border-${salesCard.statusColor}-500/20`}>
                  {salesCard.status}
                </span>
              </div>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-white tracking-tight">{salesCard.currentValue}</div>
                  <div className="text-[10px] md:text-xs text-slate-400">{salesCard.currentLabel}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg md:text-xl font-bold text-slate-500">{salesCard.targetValue}</div>
                  <div className="text-[10px] md:text-xs text-slate-600">{salesCard.targetLabel}</div>
                </div>
              </div>
              <div className="relative h-3 md:h-4 bg-slate-800 rounded-full overflow-hidden mb-6">
                <div className="absolute h-full bg-slate-600 w-full opacity-30"></div>
                <div className="absolute h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]" style={{ width: `${salesCard.progress}%` }}></div>
              </div>
            </div>
            <div className="pt-5 border-t border-white/5 flex items-start md:items-center gap-3">
              <div className={`w-2 h-2 rounded-full bg-${salesCard.statusColor}-500 shadow-[0_0_8px_${salesCard.statusColor}] shrink-0 mt-1.5 md:mt-0`}></div>
              <div className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: salesCard.alertMessage }}></div>
            </div>
          </div>

          {/* Card 2 (Same adjustments) */}
          <div className="glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden group flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-base md:text-lg font-medium text-slate-200">{roiCard.title}</h3>
                <span className={`px-2 py-1 rounded bg-${roiCard.statusColor}-500/10 text-${roiCard.statusColor}-400 text-[10px] font-bold border border-${roiCard.statusColor}-500/20`}>
                  {roiCard.status}
                </span>
              </div>
              <div className="flex flex-col gap-4 mb-4">
                 <div className="flex justify-between items-end">
                    <span className="text-3xl md:text-4xl font-bold text-orange-400">{roiCard.currentValue}</span>
                    <span className="text-xs md:text-sm font-bold text-slate-400 mb-1">{roiCard.currentLabel}</span>
                 </div>
                 <div className="flex items-end gap-2 h-12 md:h-16 w-full mt-2">
                     {/* Bars 保持不变 */}
                     <div className="w-full bg-slate-800 h-[60%] rounded-sm"></div>
                     <div className="w-full bg-slate-800 h-[70%] rounded-sm"></div>
                     <div className="w-full bg-slate-800 h-[50%] rounded-sm"></div>
                     <div className="w-full bg-slate-800 h-[80%] rounded-sm"></div>
                     <div className="w-full bg-slate-800 h-[65%] rounded-sm"></div>
                     <div className="w-full bg-slate-800 h-[55%] rounded-sm"></div>
                     <div className="w-full bg-orange-500 h-[69%] rounded-sm shadow-[0_0_10px_rgba(249,115,22,0.5)] relative group/bar">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-orange-300 opacity-0 group-hover/bar:opacity-100 transition-opacity">{roiCard.progress}%</div>
                     </div>
                 </div>
              </div>
            </div>
            <div className="pt-5 border-t border-white/5 flex items-start md:items-center gap-3">
               <div className={`w-2 h-2 rounded-full bg-${roiCard.statusColor}-500 shadow-[0_0_8px_${roiCard.statusColor}] shrink-0 mt-1.5 md:mt-0`}></div>
               <div className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: roiCard.alertMessage }}></div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Metrics Total */}
          <div className="glass-card p-6 md:p-8 rounded-3xl bg-blue-900/10 border-blue-500/10">
             <div className="text-xs font-bold text-blue-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> 整体表现
             </div>
             <div className="grid grid-cols-4 gap-2 md:gap-4 divide-x divide-white/5">
                {KPI_METRICS_TOTAL.map((m, i) => (
                  <div key={m.label} className={i === 0 ? "pr-2 md:pr-4" : i === 3 ? "pl-2 md:pl-4" : "px-2 md:px-4"}>
                     <div className="text-[9px] md:text-[10px] text-slate-400 mb-1 truncate">{m.label}</div>
                     <div className={`text-sm md:text-lg font-bold ${m.highlight ? 'text-blue-400' : 'text-white'}`}>{m.value}</div>
                  </div>
                ))}
             </div>
          </div>
          {/* Metrics Ad */}
          <div className="glass-card p-6 md:p-8 rounded-3xl bg-orange-900/10 border-orange-500/10">
             <div className="text-xs font-bold text-orange-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> 广告表现
             </div>
             <div className="grid grid-cols-4 gap-2 md:gap-4 divide-x divide-white/5">
                {KPI_METRICS_AD.map((m, i) => (
                  <div key={m.label} className={i === 0 ? "pr-2 md:pr-4" : i === 3 ? "pl-2 md:pl-4" : "px-2 md:px-4"}>
                     <div className="text-[9px] md:text-[10px] text-slate-400 mb-1 truncate">{m.label}</div>
                     <div className={`text-sm md:text-lg font-bold ${m.highlight ? 'text-orange-400' : 'text-white'}`}>{m.value}</div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
