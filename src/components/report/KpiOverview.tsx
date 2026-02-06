// src/components/report/KpiOverview.tsx
import type { KpiApiResponse } from "@/types/report";

interface KpiOverviewProps {
  data: KpiApiResponse | null;
}

export function KpiOverview({ data }: KpiOverviewProps) {
  if (!data) return <div className="py-20 text-center text-slate-600">Loading KPI Data...</div>;

  return (
    // [修复] 移除了 'block' 类，保留 'flex' 以配合 flex-col 和 justify-center 工作
    <section className="relative w-full py-12 md:py-20 px-4 md:px-8 max-w-[1400px] mx-auto min-h-screen flex flex-col justify-center overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {/* ... Spheres ... */}
      </div>

      <div className="relative z-10 flex flex-col h-full justify-center space-y-6 md:space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-4">
          <h2 className="text-2xl md:text-4xl font-bold">
             <span className="text-gradient-report">{data.header.title_prefix}</span>
             <span className="text-white">{data.header.title_highlight}</span>
          </h2>
          <p className="text-slate-500 uppercase tracking-widest text-[10px] md:text-xs">{data.header.subtitle}</p>
        </div>

        {/* Top Row: Gap Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {data.gap_cards.map((card) => (
            <div key={card.id} className="glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden group flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-base md:text-lg font-medium text-slate-200">{card.title}</h3>
                  {/* 注意：Tailwind 通常不支持动态拼接类名 (bg-${color})，如果样式丢失，请在 index.css 中使用 safelist 或改用 style 属性 */}
                  <span className={`px-2 py-1 rounded bg-${card.status_color}-500/10 text-${card.status_color}-400 text-[10px] font-bold border border-${card.status_color}-500/20`}>
                    {card.status_label}
                  </span>
                </div>
                
                {card.id === 'sales-gap' ? (
                    <div className="flex justify-between items-end mb-8">
                        <div>
                        <div className="text-2xl md:text-3xl font-bold text-white tracking-tight">{card.current_value}</div>
                        <div className="text-[10px] md:text-xs text-slate-400">{card.current_label}</div>
                        </div>
                        <div className="text-right">
                        <div className="text-lg md:text-xl font-bold text-slate-500">{card.target_value}</div>
                        <div className="text-[10px] md:text-xs text-slate-600">{card.target_label}</div>
                        </div>
                    </div>
                ) : (
                     <div className="flex flex-col gap-4 mb-4">
                        <div className="flex justify-between items-end">
                            <span className="text-3xl md:text-4xl font-bold text-orange-400">{card.current_value}</span>
                            <span className="text-xs md:text-sm font-bold text-slate-400 mb-1">{card.current_label}</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                             <div className={`h-full bg-${card.status_color}-500`} style={{ width: `${card.progress_percent}%` }}></div>
                        </div>
                     </div>
                )}

                {card.id === 'sales-gap' && (
                    <div className="relative h-3 md:h-4 bg-slate-800 rounded-full overflow-hidden mb-6">
                        <div className="absolute h-full bg-slate-600 w-full opacity-30"></div>
                        <div className="absolute h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]" style={{ width: `${card.progress_percent}%` }}></div>
                    </div>
                )}
              </div>

              <div className="pt-5 border-t border-white/5 flex items-start md:items-center gap-3">
                <div className={`w-2 h-2 rounded-full bg-${card.status_color}-500 shadow-[0_0_8px_${card.status_color}] shrink-0 mt-1.5 md:mt-0`}></div>
                <div className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: card.alert_html }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row: Metrics Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {data.metric_sections.map((section) => (
             <div 
                key={section.id} 
                className={`glass-card p-6 md:p-8 rounded-3xl ${
                    section.theme_color === 'blue' ? 'bg-blue-900/10 border-blue-500/10' : 'bg-orange-900/10 border-orange-500/10'
                }`}
             >
                <div className={`text-xs font-bold mb-4 uppercase tracking-wider flex items-center gap-2 ${
                    section.theme_color === 'blue' ? 'text-blue-400' : 'text-orange-400'
                }`}>
                   <span className={`w-1.5 h-1.5 rounded-full ${
                       section.theme_color === 'blue' ? 'bg-blue-500' : 'bg-orange-500'
                   }`}></span> 
                   {section.title}
                </div>
                <div className="grid grid-cols-4 gap-2 md:gap-4 divide-x divide-white/5">
                   {section.items.map((m, i) => (
                     <div key={m.label} className={i === 0 ? "pr-2 md:pr-4" : i === 3 ? "pl-2 md:pl-4" : "px-2 md:px-4"}>
                        <div className="text-[9px] md:text-[10px] text-slate-400 mb-1 truncate">{m.label}</div>
                        <div className={`text-sm md:text-lg font-bold ${
                            m.highlight 
                                ? (section.theme_color === 'blue' ? 'text-blue-400' : 'text-orange-400') 
                                : 'text-white'
                        }`}>{m.value}</div>
                     </div>
                   ))}
                </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}
