// src/components/report/CoveragePrecision.tsx
import type { CoverageApiResponse } from "@/types/report";
import { cn } from "@/lib/utils";

interface CoveragePrecisionProps {
  data: CoverageApiResponse | null;
}

export function CoveragePrecision({ data }: CoveragePrecisionProps) {
  if (!data) return <div className="py-20 text-center text-slate-600 animate-pulse">Loading Coverage Data...</div>;

  // 20-Segment Bar
  const renderSegmentedBar = (percent: number) => {
    const totalSegments = 20;
    const activeSegments = Math.round((percent / 100) * totalSegments);
    return (
      <div className="flex gap-1 w-full h-3 md:h-4">
        {Array.from({ length: totalSegments }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex-1 rounded-sm transition-all duration-500",
              i < activeSegments
                ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                : "bg-slate-800/50 border border-white/5"
            )}
          />
        ))}
      </div>
    );
  };

  // [Fix] 处理 metrics 为 Object (positive/negative) 的情况
  const metrics = data.coverage_section.metrics;
  const isArrayMetrics = Array.isArray(metrics);
  
  // 统一转为数组以便渲染，或者分别渲染 (Angular 版本是左右各一个)
  const positiveMetric = isArrayMetrics ? metrics[0] : (metrics as any).positive;
  const negativeMetric = isArrayMetrics ? metrics[1] : (metrics as any).negative;

  return (
    <section className="relative w-full py-12 md:py-20 px-4 md:px-8 max-w-[1400px] mx-auto min-h-screen flex flex-col justify-center overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
         <div 
            className="absolute -top-[15%] -left-[10%] w-[600px] h-[600px] rounded-full mix-blend-screen opacity-20 blur-[90px] animate-pulse-slow"
            style={{ background: 'radial-gradient(circle, rgba(46, 119, 247, 0.6) 0%, transparent 70%)' }}
         />
         <div 
            className="absolute top-[30%] -right-[15%] w-[500px] h-[500px] rounded-full mix-blend-screen opacity-15 blur-[100px] animate-pulse-slow"
            style={{ background: 'radial-gradient(circle, rgba(249, 115, 22, 0.5) 0%, transparent 70%)', animationDelay: '3s' }}
         />
      </div>

      <div className="relative z-10 flex flex-col h-full justify-center space-y-10 md:space-y-20 max-w-6xl mx-auto w-full">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-sans">
             <span className="text-gradient-report">{data.header.title_highlight}</span>
             <span className="text-white"> {data.header.title_suffix}</span>
          </h2>
          <p className="text-slate-600 uppercase tracking-[0.25em] text-xs font-bold font-sans">{data.header.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-start relative">
          
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

          {/* 1. Precision Section */}
          <div className="flex flex-col space-y-8 md:space-y-10">
             <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">{data.precision_section.step_label}</h3>
                <div className="text-2xl md:text-3xl font-medium text-white font-sans">{data.precision_section.main_title}</div>
             </div>

             <div className="space-y-6 pt-2">
                {data.precision_section.bars.map((bar, idx) => (
                  <div key={idx} className="group">
                     <div className="flex justify-between items-end mb-3">
                        <span className="text-sm text-white font-medium font-sans">
                          {bar.label} <span className="text-xs text-slate-500 ml-2 font-normal">{bar.sub || ""}</span>
                        </span>
                        <span className="text-lg font-bold font-mono text-slate-300">{bar.value}%</span>
                     </div>
                     <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-white/5">
                        <div 
                          className={cn(
                            "h-full rounded-full relative", 
                            bar.color_class,
                            idx === 0 && "shadow-[0_0_15px_rgba(0,122,255,0.6)]"
                          )} 
                          style={{ width: `${bar.value}%` }}
                        />
                     </div>
                  </div>
                ))}
             </div>

             {/* Footer Note (Attempt section level first, then root level) */}
             <div className="pt-6 border-t border-white/5">
                <p className="text-[10px] text-slate-600 leading-relaxed uppercase tracking-wider font-mono">
                   {data.precision_section.footer_note || data.footer_note}
                </p>
             </div>
          </div>

          {/* 2. Coverage Section */}
          <div className="flex flex-col space-y-8 md:space-y-10">
             <div className="space-y-2">
                <h3 className="text-xs font-bold text-[#007AFF] uppercase tracking-widest font-mono">{data.coverage_section.step_label}</h3>
                <div className="text-2xl md:text-3xl font-medium text-white font-sans">{data.coverage_section.main_title}</div>
             </div>

             <div className="space-y-4">
                <div className="flex justify-between items-end">
                   <span className="text-sm text-slate-400 font-sans">覆盖率 (Whitelist Coverage)</span>
                   <span className="text-4xl font-bold text-white tracking-tighter font-mono">{data.coverage_section.chart_percent}%</span>
                </div>
                {renderSegmentedBar(data.coverage_section.chart_percent)}
             </div>

             {/* Metrics Grid (Handled via Object mapping) */}
             <div className="grid grid-cols-2 gap-6 py-4">
                 {/* Positive */}
                 {positiveMetric && (
                    <div className="flex flex-col space-y-1">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold font-sans">{positiveMetric.label}</span>
                        <span className="text-xl text-white font-mono font-bold">{positiveMetric.value}</span>
                        {(positiveMetric.sub || positiveMetric.sub_label) && <span className="text-xs text-slate-600 font-sans">{positiveMetric.sub || positiveMetric.sub_label}</span>}
                    </div>
                 )}
                 {/* Negative */}
                 {negativeMetric && (
                    <div className="flex flex-col space-y-1">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold font-sans">{negativeMetric.label}</span>
                        <span className="text-xl text-white font-mono font-bold">{negativeMetric.value}</span>
                        {(negativeMetric.sub || negativeMetric.sub_label) && <span className="text-xs text-slate-600 font-sans">{negativeMetric.sub || negativeMetric.sub_label}</span>}
                    </div>
                 )}
             </div>

             <div className="mt-2">
                <div className="flex flex-col gap-1 pl-4 border-l-[3px] border-[#FF6F3C] py-1 bg-[#FF6F3C]/[0.02]">
                   <div className="text-[10px] font-mono font-bold text-[#FF6F3C] tracking-widest uppercase leading-none">
                      {data.coverage_section.alert_box.title}
                   </div>
                   <div 
                     className="text-sm text-slate-300 font-medium leading-relaxed font-sans"
                     dangerouslySetInnerHTML={{ __html: data.coverage_section.alert_box.message_html }}
                   />
                </div>
             </div>

          </div>

        </div>
      </div>
    </section>
  );
}
