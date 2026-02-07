// src/components/report/ReportHero.tsx
import { Link } from "react-router-dom";
import type { HeroApiResponse } from "@/types/report";

interface ReportHeroProps {
  data: HeroApiResponse | null;
}

export function ReportHero({ data }: ReportHeroProps) {
  // 1. Loading / Empty State Protection
  if (!data) return (
    <div className="min-h-[60vh] flex items-center justify-center text-slate-500 animate-pulse font-mono text-sm">
      Loading Intelligence Engine...
    </div>
  );

  return (
    <div className="block w-full h-full relative">
        
        {/* =========================================================
            BACKGROUND LAYER (1:1 from Static Hero.tsx)
           ========================================================= */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-[40%] left-[32%] -translate-x-1/2 -translate-y-1/2 z-0">
                <div className="w-[550px] h-[550px] rounded-full mix-blend-screen animate-pulse-slow"
                    style={{ 
                        background: 'radial-gradient(circle at center, rgba(46, 119, 247, 0.85) 0%, rgba(46, 119, 247, 0.35) 40%, transparent 70%)', 
                        filter: 'blur(60px)', 
                        opacity: 0.95 
                    }}>
                </div>
            </div>
            <div className="absolute top-[55%] left-[68%] -translate-x-1/2 -translate-y-1/2 z-0">
                <div className="w-[495px] h-[495px] rounded-full mix-blend-screen animate-pulse-slow"
                    style={{ 
                        background: 'radial-gradient(circle at center, rgba(255, 111, 60, 0.75) 0%, rgba(255, 111, 60, 0.30) 40%, transparent 70%)', 
                        filter: 'blur(55px)', 
                        opacity: 0.95, 
                        animationDelay: '2s' 
                    }}>
                </div>
            </div>
        </div>

        {/* =========================================================
            CONTENT LAYER (Data Driven)
           ========================================================= */}
        <div className="relative z-10 w-full h-full flex flex-col justify-start items-center text-center px-4 pb-10 pt-32 md:pt-44">
            
            <div className="flex flex-col items-center">
                {/* 1. Eyebrow Text */}
                <div className="mb-4 md:mb-10 flex items-center gap-3 opacity-80">
                    <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-[#2E77F7]"></div>
                    <span className="text-[10px] md:text-sm font-bold tracking-[0.3em] text-[#2E77F7] uppercase whitespace-nowrap font-sans">
                        {data.eyebrow_text}
                    </span>
                    <div className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-[#2E77F7]"></div>
                </div>

                {/* 2. Main Title (Split Lines) */}
                <h1 className="text-6xl md:text-[6rem] font-bold tracking-tight leading-none">
                    <div className="text-white drop-shadow-xl mb-2 md:mb-4">
                        {data.main_title_line_1}
                    </div>
                    <div>
                        <span className="hero-gradient-text pb-2">
                            {data.main_title_line_2}
                        </span>
                    </div>
                </h1>
                
                {/* 3. Subtitle */}
                <div className="mt-6 md:mt-8 space-y-3">
                    <h2 className="text-2xl md:text-3xl font-medium text-slate-200 tracking-wide font-sans">
                        {data.subtitle_prefix} · <span className="text-white font-medium">{data.subtitle_suffix}</span>
                    </h2>
                </div>
                
                {/* 4. Description (HTML Support) */}
                <p 
                    className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed pt-6 md:pt-8 font-light font-sans px-4"
                    dangerouslySetInnerHTML={{ __html: data.description }}
                ></p>
            </div>

            {/* 5. Action Cards Area */}
            <div className="flex flex-col items-center gap-6 w-full max-w-[640px] relative z-10 mt-8 md:mt-10">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    
                    {data.cards.map((card) => {
                        // === 渲染风格 A: Primary Card (蓝色渐变 + 微光动画) ===
                        if (card.type === 'primary') {
                            return (
                                <div key={card.id} className="relative group w-full">
                                    <Link 
                                        to="/deep-dive" // [修改] 强制跳转到 Deep Dive
                                        // [修复] 移除了 'block'，保留 'flex' 以消除冲突
                                        className="w-full h-full bg-[#007AFF] hover:bg-[#2E77F7] text-white rounded-2xl p-5 flex items-center justify-between transition-all duration-300 shadow-[0_0_30px_rgba(0,122,255,0.3)] hover:shadow-[0_0_40px_rgba(0,122,255,0.5)] hover:-translate-y-1 relative z-30 text-left overflow-hidden"
                                    >
                                        {/* Shimmer Effect Animation */}
                                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0 pointer-events-none"></div>

                                        <div className="relative z-10">
                                            <div className="text-2xl font-bold tracking-tight mb-1 font-sans">{card.title}</div>
                                            <div className="text-sm font-medium text-blue-100/80 font-mono tracking-wide">{card.subtitle}</div>
                                        </div>

                                        {/* Right Arrow Icon */}
                                        <div className="relative z-10 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-colors ml-2 shrink-0">
                                            <svg className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                            </svg>
                                        </div>
                                    </Link>
                                </div>
                            );
                        }

                        // === 渲染风格 B: Secondary Card (深色玻璃 + 呼吸绿点) ===
                        return (
                            <Link 
                                key={card.id}
                                to="/deep-dive" // [修改] 强制跳转到 Deep Dive
                                className="relative group w-full bg-[#0A1025]/60 border border-white/10 hover:border-[#007AFF]/50 backdrop-blur-md rounded-2xl p-5 flex items-center justify-between transition-all duration-300 hover:bg-[#0A1025]/80 hover:-translate-y-1 text-left"
                            >
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-2xl font-bold text-slate-200 group-hover:text-white transition-colors font-sans">{card.title}</span>
                                        {/* Green Ping Animation */}
                                        <span className="relative flex h-2.5 w-2.5 ml-1">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                        </span>
                                    </div>
                                    <div className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-bold group-hover:text-slate-400 transition-colors font-mono">
                                        {card.subtitle}
                                    </div>
                                </div>

                                {/* External Link Icon */}
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#007AFF] group-hover:bg-[#007AFF]/10 transition-all ml-2 shrink-0">
                                    <svg className="w-5 h-5 text-slate-400 group-hover:text-[#007AFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7V17"></path>
                                    </svg>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                
                {/* 6. Footer Validation Text */}
                <div className="mt-2 flex items-center gap-2 py-2 animate-pulse-slow">
                    <svg className="w-4 h-4 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-xs text-slate-500 font-mono tracking-widest uppercase text-center">
                        {data.footer_validation_text}
                    </span>
                </div>

            </div>
        </div>
    </div>
  );
}
