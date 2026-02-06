// src/components/report/AnalystInsight.tsx
import type { InsightApiResponse } from "@/types/analysis";

interface AnalystInsightProps {
  data: InsightApiResponse | null;
}

export function AnalystInsight({ data }: AnalystInsightProps) {
  if (!data) return <div className="py-20 text-center text-slate-600">Loading Insights...</div>;

  return (
    <section className="relative block w-full py-12 md:py-20 px-4 md:px-8 max-w-[1400px] mx-auto min-h-screen flex flex-col justify-center overflow-hidden">
      
      {/* Background (省略) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
         {/* ... Orbs ... */}
      </div>

      <div className="relative z-10 flex flex-col h-full justify-center space-y-10 md:space-y-16 max-w-6xl mx-auto w-full">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-4xl font-bold">
             <span className="text-white">{data.header.title_prefix} </span>
             <span className="text-gradient-report">{data.header.title_highlight}</span>
          </h2>
          <p className="text-slate-600 uppercase tracking-widest text-[10px]">{data.header.subtitle}</p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-stretch">
          
          {/* Left: Summary */}
          <div className="relative flex flex-col h-full"> 
             <div>
                <h3 className="text-base md:text-lg font-bold text-white tracking-wider mb-4 md:mb-6">{data.summary_card.title}</h3>
                <div className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-8 tracking-tight">
                  {data.summary_card.roi_display}
                </div>
                <div 
                  className="text-lg md:text-3xl leading-relaxed font-light text-slate-200"
                  dangerouslySetInnerHTML={{ __html: data.summary_card.content_html }}
                ></div>
             </div>

             <div className="flex-1 min-h-[2rem] md:min-h-[4rem]"></div>

             <div className="flex flex-col">
                 <div className="w-full h-6 md:h-8 mb-6 md:mb-8 flex items-center overflow-hidden opacity-30 select-none pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 600 24" preserveAspectRatio="none" fill="none">
                       <path d="M0 12 H10 L12 10 L14 14 L16 8 L18 16 L20 6 L22 18 L24 9 L26 15 L28 11 L30 13 L32 7 L34 17 L36 5 L38 19 L40 10 L42 14 L44 12 L46 12 L48 16 L50 8 L52 12 H600" stroke="white" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
                    </svg>
                 </div>
                 <div className="flex items-center gap-5 pl-2 mb-0 md:mb-10">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-800/50 border border-white/10 flex items-center justify-center relative overflow-hidden group">
                       <svg className="w-6 h-6 md:w-8 md:h-8 text-slate-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </div>
                    <div>
                       <div className="text-base md:text-lg text-white font-bold tracking-wide">{data.summary_card.analyst_info.name}</div>
                       <div 
                          className="text-xs md:text-sm text-slate-500 font-medium flex items-center gap-2"
                          dangerouslySetInnerHTML={{ __html: data.summary_card.analyst_info.status_html }}
                       ></div>
                    </div>
                 </div>
             </div>
          </div>

          {/* Right: Strategy */}
          <div className="space-y-8 md:space-y-12 pl-0 lg:pl-12 border-l-0 lg:border-l border-white/5 flex flex-col justify-center">
             <div>
                <h4 className="text-sm md:text-lg font-bold text-slate-400 uppercase tracking-widest mb-3 md:mb-5">{data.strategy_card.main_title}</h4>
                <div className="text-4xl md:text-6xl font-bold text-white tracking-tight flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                   {data.strategy_card.strategy_name}
                   <span className="text-base md:text-xl font-normal text-[#2E77F7] opacity-80 font-sans">{data.strategy_card.strategy_en}</span>
                </div>
             </div>
             <div>
                <h4 className="text-sm md:text-lg font-bold text-slate-400 uppercase tracking-widest mb-4 md:mb-8">{data.strategy_card.list_title}</h4>
                <div className="space-y-3 md:space-y-4">
                   {data.strategy_card.list_items.map((strategy, idx) => (
                     <div key={idx} className="group cursor-default bg-white/5 border border-white/5 rounded-2xl p-4 md:p-6 hover:border-white/10 hover:bg-white/10 transition-all">
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-lg md:text-xl font-medium text-white group-hover:text-[#2E77F7] transition-colors">{strategy.title}</span>
                           <span className={`text-[10px] font-bold text-blue-300 border border-blue-500/30 bg-blue-500/10 px-2 py-1 rounded tracking-wider`}>{strategy.tag}</span>
                        </div>
                        <p className="text-sm md:text-base text-slate-500">{strategy.desc}</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
