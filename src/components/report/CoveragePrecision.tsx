// src/components/report/CoveragePrecision.tsx
import type { CoverageApiResponse } from "@/types/report";

interface CoveragePrecisionProps {
  data: CoverageApiResponse | null;
}

export function CoveragePrecision({ data }: CoveragePrecisionProps) {
  if (!data) return <div className="py-20 text-center text-slate-600">Loading Coverage Data...</div>;

  const circumference = 283;
  const offset = circumference - (data.coverage_section.chart_percent / 100) * circumference;

  return (
    // [Fix] Removed 'block' class to resolve conflict with 'flex'
    <section className="relative w-full py-12 md:py-20 px-4 md:px-8 max-w-[1400px] mx-auto min-h-screen flex flex-col justify-center overflow-hidden">
      
      <div className="flex flex-col h-full justify-center space-y-10 md:space-y-20 max-w-6xl mx-auto w-full">
        
        <div className="text-center space-y-2 mb-4">
          <h2 className="text-2xl md:text-4xl font-bold">
             <span className="text-gradient-report">{data.header.title_highlight}</span>
             <span className="text-white">{data.header.title_suffix}</span>
          </h2>
          <p className="text-slate-600 uppercase tracking-widest text-xs">{data.header.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-start relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

          {/* 1. Coverage (Left) */}
          <div className="flex flex-col space-y-6 md:space-y-10">
             <div className="space-y-2">
                <h3 className="text-sm font-bold text-[#007AFF] uppercase tracking-wider">{data.coverage_section.step_label}</h3>
                <div className="text-lg md:text-xl font-medium text-white">{data.coverage_section.main_title}</div>
             </div>

             <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
                <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                       <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="2"></circle>
                       <circle cx="50" cy="50" r="45" fill="none" stroke="#007AFF" strokeWidth="2" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(0,122,255,0.5)] transition-all duration-1000 ease-out"></circle>
                    </svg>
                    <div className="absolute text-center">
                       <span className="text-5xl font-bold text-white tracking-tight">{data.coverage_section.chart_percent}%</span>
                    </div>
                </div>
                
                <div className="space-y-4 md:space-y-6 flex-1 text-center md:text-left w-full">
                   {data.coverage_section.metrics.map((m, i) => (
                       <div key={i} className={`flex md:block justify-between ${i === 0 ? 'border-b border-white/5 md:border-none pb-2 md:pb-0' : ''}`}>
                          <div className="text-xs text-slate-500 mb-1">{m.label}</div>
                          <div className="text-sm md:text-base text-white font-mono">
                             {m.value} {m.sub_label && <span className="text-xs text-slate-500 font-sans">{m.sub_label}</span>}
                          </div>
                       </div>
                   ))}
                </div>
             </div>

             <div className="pt-4 md:pt-6 border-t border-white/5">
                <div className="flex items-start gap-3">
                   <div className="w-1 h-1 rounded-full bg-red-500 mt-2 shadow-[0_0_8px_red] shrink-0"></div>
                   <div className="space-y-1">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">{data.coverage_section.alert_box.title}</span>
                      <p className="text-sm text-slate-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.coverage_section.alert_box.message_html }}></p>
                   </div>
                </div>
             </div>
          </div>

          {/* 2. Precision (Right) */}
          <div className="flex flex-col space-y-6 md:space-y-10">
             <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">{data.precision_section.step_label}</h3>
                <div className="text-lg md:text-xl font-medium text-white">{data.precision_section.main_title}</div>
             </div>

             <div className="space-y-6 md:space-y-8 pt-2">
                {data.precision_section.bars.map((bar, idx) => (
                  <div key={idx} className="group">
                     <div className="flex justify-between items-end mb-3">
                        <span className="text-sm text-white font-medium">
                          {bar.label} <span className="text-xs text-slate-500 ml-2">{bar.sub}</span>
                        </span>
                        <span className="text-sm md:text-lg font-mono text-slate-400">{bar.value}%</span>
                     </div>
                     <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${bar.color_class} ${idx === 0 ? 'shadow-[0_0_15px_rgba(0,122,255,0.6)]' : ''}`} style={{ width: `${bar.value}%` }}></div>
                     </div>
                  </div>
                ))}
             </div>

             <div className="pt-4 md:pt-6 border-t border-white/5">
                <p className="text-[10px] text-slate-600 leading-relaxed uppercase tracking-wider">
                   {data.precision_section.footer_note}
                </p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
