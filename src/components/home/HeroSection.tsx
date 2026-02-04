import { TECH_STACK } from "@/data/home-content";

export function HeroSection() {
  return (
    <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-32 overflow-hidden flex flex-col items-center min-h-[100vh] justify-start">
      
      {/* --- Background Effects (Replicated from Angular) --- */}
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
        
        {/* --- Tech Stack Row --- */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16 animate-fade-in-up delay-[100ms]">
          {TECH_STACK.map((tech) => (
            <div 
              key={tech.name}
              className={`group flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-5 md:py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300 cursor-default shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5 ${tech.border}`}
            >
               <div className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${tech.iconColor}`}></div>
               <span className="text-xs md:text-sm font-medium text-slate-300 group-hover:text-white transition-colors tracking-wide">
                 {tech.name}
               </span>
            </div>
          ))}
        </div>
        
        {/* --- Main Headline --- */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wide mb-6 md:mb-8 leading-[1.1] animate-fade-in-up delay-[200ms] relative z-10">
          <span className="block text-gradient-custom pb-2">
            把亚马逊运营从
          </span>
          <span className="flex flex-wrap justify-center items-baseline gap-4 md:gap-6 mt-2">
            <span className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
              “经验”
            </span>
            <span className="text-gradient-custom font-bold italic tracking-wider">
              变成
            </span>
            <span className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
              “科学”
            </span>
          </span>
        </h1>

        {/* --- Subheadline --- */}
        <p className="mt-4 md:mt-6 max-w-3xl mx-auto text-lg md:text-2xl text-slate-300/80 leading-relaxed font-light tracking-widest animate-fade-in-up delay-[300ms] relative z-10">
          让每一个商业决策都有据可依。<br className="hidden md:block" />
          SeerGo 智能量化系统，助您建立数据护城河。
        </p>

        {/* --- CTA Buttons --- */}
        <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center w-full max-w-md sm:max-w-none animate-fade-in-up delay-[400ms]">
          <button className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-full shadow-[0_0_40px_rgba(37,99,235,0.5)] transition-all hover:scale-105 active:scale-95 border border-blue-400/50 tracking-wide cursor-pointer">
            免费获取店铺体检报告
          </button>
          <button className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-medium text-white bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-full transition-all backdrop-blur-xl shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] tracking-wide group cursor-pointer">
              预约演示
          </button>
        </div>

        {/* --- Social Proof --- */}
        <div className="mt-16 md:mt-20 flex items-center justify-center gap-4 text-sm text-slate-400 animate-fade-in-up delay-[500ms]">
          <div className="flex -space-x-3">
             <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 overflow-hidden shadow-lg">
               <img src="https://picsum.photos/seed/u1/40/40" alt="User" className="w-full h-full object-cover opacity-80" />
             </div>
             <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 overflow-hidden shadow-lg">
               <img src="https://picsum.photos/seed/u2/40/40" alt="User" className="w-full h-full object-cover opacity-80" />
             </div>
             <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 overflow-hidden shadow-lg">
               <img src="https://picsum.photos/seed/u3/40/40" alt="User" className="w-full h-full object-cover opacity-80" />
             </div>
             <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold bg-slate-700 text-white shadow-lg">
               +2k
             </div>
          </div>
          <p className="tracking-wide">
            此时此刻，已有 <span className="text-white font-bold">3,420+</span> 位卖家正在使用量化决策
          </p>
        </div>

      </div>
    </section>
  );
}
