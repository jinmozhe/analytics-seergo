import { COMPARISON_DATA } from "@/data/home-content";

export function ComparisonSection() {
  return (
    <section className="py-24 bg-[#010409]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Header --- */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="block text-gradient-custom mb-3">
              为什么“强化学习”
            </span>
            <span className="block">
               <span className="text-gradient-custom">比“人工/规则工具”</span>
               <span className="text-white">更强大</span>
            </span>
          </h2>
        </div>

        {/* --- Minimalist Comparison Table --- */}
        <div className="mb-20">
           {/* Table Header */}
           <div className="grid grid-cols-12 gap-4 pb-4 border-b border-white/10 text-xs md:text-sm uppercase tracking-widest text-slate-500 font-bold">
              <div className="col-span-3 pl-4">维度</div>
              <div className="col-span-4">传统规则</div>
              <div className="col-span-5 text-blue-400">SeerGo AI</div>
           </div>
           
           {/* Table Rows */}
           <div className="space-y-0 mt-2">
             {COMPARISON_DATA.map((row) => (
               <div 
                 key={row.dim}
                 className="grid grid-cols-12 gap-4 items-center p-5 border-b border-white/5 hover:bg-white/[0.05] hover:border-l-2 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(0,122,255,0.1)] transition-all duration-300 group"
               >
                  {/* Column 1: Dimension & Icon */}
                  <div className="col-span-3 text-slate-400 font-medium text-sm md:text-base group-hover:text-white transition-colors flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d={row.iconPath} />
                          </svg>
                      </div>
                      {row.dim}
                  </div>
                  
                  {/* Column 2: Traditional Rule (Strikethrough) */}
                  <div className="col-span-4 text-slate-500 text-sm md:text-base line-through decoration-slate-700/50 group-hover:text-slate-400 group-hover:decoration-transparent transition-all">
                    {row.rule}
                  </div>
                  
                  {/* Column 3: SeerGo AI (Highlight) */}
                  <div className="col-span-5 text-white text-sm md:text-lg font-bold flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <span className="group-hover:text-blue-200 transition-colors">
                       {row.seergo}
                     </span>
                  </div>
               </div>
             ))}
           </div>
        </div>

        {/* --- Feature Cards (Deep Layer & Glow) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Asset (Compounding Asset) */}
          <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden bg-[#050a18] border border-white/5 group hover:border-purple-500/30 transition-all duration-700 shadow-2xl">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-900/10 rounded-full blur-[80px] group-hover:bg-purple-800/20 transition-all duration-700 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-blue-900/10 rounded-full blur-[60px] pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent flex items-center justify-center text-purple-400 mb-8 border border-white/5 shadow-inner group-hover:scale-105 transition-transform duration-500">
                 <svg className="w-8 h-8 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">模型资产 —— 越用越强</h3>
              <p className="text-purple-500/60 text-xs font-mono mb-6 uppercase tracking-widest">Compounding Asset</p>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base border-l border-white/10 pl-4">
                告别“经验主义”。SeerGo 的 AI 模型如同您的顶级操盘手，随着数据积累，构建他人无法复制的算法壁垒。
              </p>
            </div>
          </div>

          {/* Card 2: Trust (White-Box Logic) */}
          <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden bg-[#050a18] border border-white/5 group hover:border-blue-500/30 transition-all duration-700 shadow-2xl">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-900/10 rounded-full blur-[80px] group-hover:bg-blue-800/20 transition-all duration-700 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-cyan-900/10 rounded-full blur-[60px] pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent flex items-center justify-center text-blue-400 mb-8 border border-white/5 shadow-inner group-hover:scale-105 transition-transform duration-500">
                 <svg className="w-8 h-8 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">信任机制 —— 白盒决策</h3>
              <p className="text-blue-500/60 text-xs font-mono mb-6 uppercase tracking-widest">White-Box Logic</p>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base border-l border-white/10 pl-4">
                决策理由可视化。系统执行的每一个动作（提价、否词、补货），都会附带清晰的数据理由。拒绝黑箱操作。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
