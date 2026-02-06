// src/components/report/ReportHero.tsx
import { Link } from "react-router-dom";
import type { HeroApiResponse } from "@/types/report";

interface ReportHeroProps {
  data: HeroApiResponse | null;
}

export function ReportHero({ data }: ReportHeroProps) {
  // 空状态保护
  if (!data) return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading Hero...</div>;

  return (
    <section className="relative w-full min-h-screen block overflow-hidden">
      
      {/* --- BACKGROUND SPHERES LAYER (保持原样) --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#020617]">
         <div className="absolute top-[40%] left-[32%] -translate-x-1/2 -translate-y-1/2 z-0">
          <div className="w-[300px] h-[300px] md:w-[550px] md:h-[550px] rounded-full mix-blend-screen animate-pulse-slow"
            style={{ 
              background: 'radial-gradient(circle at center, rgba(46, 119, 247, 0.85) 0%, rgba(46, 119, 247, 0.35) 40%, transparent 70%)',
              filter: 'blur(60px)',
              opacity: 0.95 
            }}
          ></div>
        </div>
        <div className="absolute top-[55%] left-[68%] -translate-x-1/2 -translate-y-1/2 z-0">
           <div className="w-[280px] h-[280px] md:w-[495px] md:h-[495px] rounded-full mix-blend-screen animate-pulse-slow"
            style={{ 
              background: 'radial-gradient(circle at center, rgba(255, 111, 60, 0.75) 0%, rgba(255, 111, 60, 0.30) 40%, transparent 70%)',
              filter: 'blur(55px)',
              opacity: 0.95,
              animationDelay: '2s'
            }}
           ></div>
        </div>
        <div className="absolute inset-0 bg-[#020617] opacity-30 mix-blend-overlay"></div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 w-full h-full min-h-screen flex flex-col justify-center items-center text-center px-4 pb-10 pt-24 md:pt-32">
        
        <div className="flex flex-col items-center">
          {/* Eyebrow Title */}
          <div className="mb-6 md:mb-10 flex items-center gap-3 opacity-80 scale-90 md:scale-100">
             <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-[#2E77F7]"></div>
             <span className="text-xs md:text-sm font-bold tracking-[0.3em] text-[#2E77F7] uppercase">{data.eyebrow_text}</span>
             <div className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-[#2E77F7]"></div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[1.2] md:leading-[1.4]">
            <div className="text-white drop-shadow-xl mb-2 md:mb-4">{data.main_title_line_1}</div>
            <div>
              <span className="text-gradient-report pb-2">{data.main_title_line_2}</span>
            </div>
          </h1>
          
          {/* Subheader */}
          <div className="mt-6 md:mt-8 space-y-3 px-2">
             <h2 className="text-lg md:text-3xl font-medium text-slate-200 tracking-wide leading-snug">
               {data.subtitle_prefix}<span className="hidden md:inline"> · </span><br className="md:hidden"/>
               <span className="text-white font-medium">{data.subtitle_suffix}</span>
             </h2>
          </div>
          
          {/* Description */}
          <p 
            className="text-sm md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed pt-6 md:pt-8 font-light px-4"
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></p>
        </div>

        {/* Actions Area */}
        <div className="flex flex-col items-center gap-6 w-full max-w-[640px] relative z-10 mt-10 md:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
            {data.action_cards.map((card) => (
               <Link 
                  key={card.id}
                  to={card.link_target} 
                  className={`relative group w-full h-full rounded-2xl p-5 flex items-center justify-between transition-all duration-300 z-30 overflow-hidden cursor-pointer ${
                      card.type === 'primary' 
                        ? 'bg-[#007AFF] hover:bg-[#2E77F7] text-white shadow-[0_0_30px_rgba(0,122,255,0.3)] hover:shadow-[0_0_40px_rgba(0,122,255,0.5)] hover:-translate-y-1'
                        : 'bg-[#0A1025]/60 border border-white/10 hover:border-[#007AFF]/50 backdrop-blur-md hover:bg-[#0A1025]/80 hover:-translate-y-1'
                  }`}
                >
                    {/* Shimmer for primary */}
                    {card.type === 'primary' && (
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-0 pointer-events-none"></div>
                    )}

                    <div className="relative z-10 text-left">
                       {card.type === 'glass' && (
                           <div className="flex items-center gap-2 mb-1">
                               <span className="text-xl md:text-2xl font-bold text-slate-200 group-hover:text-white transition-colors">{card.title}</span>
                               <span className="relative flex h-2.5 w-2.5 ml-1">
                                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                 <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                               </span>
                           </div>
                       )}
                       {card.type === 'primary' && (
                           <div className="text-xl md:text-2xl font-bold tracking-tight mb-2">{card.title}</div>
                       )}
                       
                       <div className={`text-[10px] font-medium font-mono tracking-wider uppercase ${
                           card.type === 'primary' ? 'text-blue-100/70' : 'text-slate-500 group-hover:text-slate-400'
                       }`}>
                          {card.subtitle}
                       </div>
                    </div>

                    <div className={`relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all ml-2 shrink-0 ${
                         card.type === 'primary' 
                            ? 'bg-white/20 group-hover:bg-white/30' 
                            : 'rounded-full border border-white/10 group-hover:border-[#007AFF] group-hover:bg-[#007AFF]/10'
                    }`}>
                        <svg className={`w-5 h-5 md:w-6 md:h-6 transition-transform ${
                             card.type === 'primary' ? 'text-white group-hover:translate-x-1' : 'text-slate-400 group-hover:text-[#007AFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={card.type === 'primary' ? "M14 5l7 7m0 0l-7 7m7-7H3" : "M7 17L17 7M17 7H7M17 7V17"}></path>
                        </svg>
                    </div>
               </Link>
            ))}
          </div>
          
          <div className="mt-2 flex items-center gap-2 py-2 animate-pulse-slow">
             <svg className="w-4 h-4 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
             <span className="text-[10px] md:text-xs text-slate-500 font-mono tracking-widest uppercase text-center">
               {data.footer_validation_text}
             </span>
          </div>

        </div>
      </div>
    </section>
  );
}
