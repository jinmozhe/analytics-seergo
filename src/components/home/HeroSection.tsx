// src/components/home/HeroSection.tsx
import type { HomeHeroData } from "@/types/home";

// 映射配置：将后端返回的 theme 字符串映射为具体的 Tailwind 类名
const THEME_MAP: Record<string, { color: string; border: string; iconColor: string }> = {
  blue:   { color: 'text-blue-400',   border: 'hover:border-blue-500/50',   iconColor: 'bg-blue-500' },
  indigo: { color: 'text-indigo-400', border: 'hover:border-indigo-500/50', iconColor: 'bg-indigo-500' },
  purple: { color: 'text-purple-400', border: 'hover:border-purple-500/50', iconColor: 'bg-purple-500' },
  orange: { color: 'text-orange-400', border: 'hover:border-orange-500/50', iconColor: 'bg-orange-500' },
  emerald:{ color: 'text-emerald-400',border: 'hover:border-emerald-500/50', iconColor: 'bg-emerald-500' },
  cyan:   { color: 'text-cyan-400',   border: 'hover:border-cyan-500/50',   iconColor: 'bg-cyan-500' },
};

interface HeroSectionProps {
  data: HomeHeroData | null;
}

export function HeroSection({ data }: HeroSectionProps) {
  // 空状态/加载骨架 (虽 Loader 会阻塞，但需处理 API 失败返回 null 的情况)
  if (!data) return (
    <section className="min-h-[100vh] flex items-center justify-center pt-36 pb-20">
      <div className="text-slate-500 animate-pulse">Loading Hero Engine...</div>
    </section>
  );

  return (
    <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-32 overflow-hidden flex flex-col items-center min-h-[100vh] justify-start">
      
      {/* --- Background Effects (Unchanged) --- */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute top-[43%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] flex items-center justify-center">
            {/* Blue Sphere */}
            <div className="absolute w-[320px] h-[320px] bg-blue-600/50 rounded-full blur-[60px] mix-blend-screen animate-breathe z-0 top-[20%] left-[25%] md:left-[35%]"></div>
            {/* Orange Sphere */}
            <div className="absolute w-[240px] h-[240px] bg-orange-500/50 rounded-full blur-[50px] mix-blend-screen z-0 top-[45%] left-[55%] md:left-[60%]"></div>
        </div>
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        
        {/* --- Tech Stack Row (Dynamic) --- */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16 animate-fade-in-up delay-[100ms]">
          {data.tech_stack.map((tech) => {
            // 获取样式映射，默认回退到 blue
            const style = THEME_MAP[tech.theme] || THEME_MAP.blue;
            return (
              <div 
                key={tech.name}
                className={`group flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-5 md:py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300 cursor-default shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5 ${style.border}`}
              >
                 <div className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${style.iconColor}`}></div>
                 <span className={`text-xs md:text-sm font-medium text-slate-300 group-hover:text-white transition-colors tracking-wide ${style.color}`}>
                   {tech.name}
                 </span>
              </div>
            );
          })}
        </div>
        
        {/* --- Main Headline (Dynamic) --- */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wide mb-6 md:mb-8 leading-[1.1] animate-fade-in-up delay-[200ms] relative z-10">
          <span className="block text-gradient-custom pb-2">
            {data.headline.prefix}
          </span>
          <span className="flex flex-wrap justify-center items-baseline gap-4 md:gap-6 mt-2">
            <span className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
              {data.headline.highlight_1}
            </span>
            <span className="text-gradient-custom font-bold italic tracking-wider">
              {data.headline.connector}
            </span>
            <span className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
              {data.headline.highlight_2}
            </span>
          </span>
        </h1>

        {/* --- Subheadline (Dynamic) --- */}
        {/* 使用 whitespace-pre-line 处理后端返回的换行符 \n */}
        <p className="mt-4 md:mt-6 max-w-3xl mx-auto text-lg md:text-2xl text-slate-300/80 leading-relaxed font-light tracking-widest animate-fade-in-up delay-[300ms] relative z-10 whitespace-pre-line">
          {data.subheadline}
        </p>

        {/* --- CTA Buttons (Dynamic) --- */}
        <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center w-full max-w-md sm:max-w-none animate-fade-in-up delay-[400ms]">
          <button className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-full shadow-[0_0_40px_rgba(37,99,235,0.5)] transition-all hover:scale-105 active:scale-95 border border-blue-400/50 tracking-wide cursor-pointer">
            {data.cta_buttons.primary}
          </button>
          <button className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-medium text-white bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-full transition-all backdrop-blur-xl shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] tracking-wide group cursor-pointer">
              {data.cta_buttons.secondary}
          </button>
        </div>

        {/* --- Social Proof (Dynamic) --- */}
        <div className="mt-16 md:mt-20 flex items-center justify-center gap-4 text-sm text-slate-400 animate-fade-in-up delay-[500ms]">
          <div className="flex -space-x-3">
             {/* 静态头像占位符 */}
             <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 overflow-hidden shadow-lg">
               <img src="https://picsum.photos/seed/u1/40/40" alt="User" className="w-full h-full object-cover opacity-80" />
             </div>
             <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 overflow-hidden shadow-lg">
               <img src="https://picsum.photos/seed/u2/40/40" alt="User" className="w-full h-full object-cover opacity-80" />
             </div>
             <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 overflow-hidden shadow-lg">
               <img src="https://picsum.photos/seed/u3/40/40" alt="User" className="w-full h-full object-cover opacity-80" />
             </div>
             {/* [修复] 移除了 bg-slate-800，保留 bg-slate-700 以解决样式冲突 */}
             <div className="w-8 h-8 rounded-full border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold bg-slate-700 text-white shadow-lg">
               {data.social_proof.count}
             </div>
          </div>
          <p className="tracking-wide">
            {data.social_proof.text_prefix} <span className="text-white font-bold">{data.social_proof.text_highlight}</span> {data.social_proof.text_suffix}
          </p>
        </div>

      </div>
    </section>
  );
}
