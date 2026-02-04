export function ProcessFlow() {
  return (
    <section className="py-32 bg-[#010409] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         {/* --- Header --- */}
         <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-wide text-center leading-tight">
            <span className="text-white">进阶式 AI</span>
            <span className="text-gradient-custom">&nbsp;介入流程</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed mt-4">
            从数据洞察到策略执行，全链路智能化
          </p>
        </div>
    
        {/* --- The Liquid Flow Container --- */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
           
           {/* Connecting Pipe Background (Desktop Only) */}
           <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 z-0">
              {/* Animated Pulse in the Pipe */}
              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 blur-sm flow-line"></div>
           </div>
    
           {/* --- Stage 1: Input (Data Ingestion) --- */}
           <div className="relative z-10 group">
              <div className="mx-auto w-full max-w-sm bg-[#050a18] rounded-2xl p-8 border border-white/5 relative transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(0,122,255,0.2)] hover:border-blue-500/30">
                  {/* Top Node Connection */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#010409] border-2 border-blue-600 flex items-center justify-center z-20">
                     <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  </div>
    
                  <div className="text-center mb-6">
                     <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                     </div>
                     <h3 className="text-xl font-bold text-white">全景数据“洞察”</h3>
                     <p className="text-xs text-blue-500/60 font-mono mt-2">Data Ingestion</p>
                  </div>
                  
                  <div className="space-y-3 text-sm text-slate-400 text-center">
                     <p>全量采集店铺销售、广告、库存、竞品数据。</p>
                     <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent my-3"></div>
                     <p className="text-white">生成《店铺数据体检报告》</p>
                  </div>
              </div>
           </div>
    
           {/* --- Stage 2: Core (RL Core Engine) - Highlighted --- */}
           <div className="relative z-10 group md:-mt-8"> {/* Lifted up on desktop */}
              <div className="mx-auto w-full max-w-sm bg-[#0a0f1e] rounded-2xl p-10 border border-purple-500/30 relative transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_60px_rgba(168,85,247,0.25)] hover:border-purple-500/60 scale-105">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-purple-500/5 rounded-2xl blur-xl group-hover:bg-purple-500/10 transition-all"></div>
                  
                  {/* Top Node Connection */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#010409] border-2 border-purple-500 flex items-center justify-center z-20 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                     <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse"></div>
                  </div>
    
                  <div className="text-center mb-6 relative">
                     <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-500/10 text-purple-400 mb-4 group-hover:rotate-180 transition-transform duration-700">
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                     </div>
                     <h3 className="text-2xl font-bold text-white">强化学习“破局”</h3>
                     <p className="text-xs text-purple-500/60 font-mono mt-2">RL Core Engine</p>
                  </div>
                  
                  <div className="space-y-3 text-sm text-slate-400 text-center relative">
                     <p className="italic text-purple-200">万次虚拟博弈推演</p>
                     <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent my-3"></div>
                     <p className="text-white font-bold">输出博弈论最优解</p>
                  </div>
              </div>
           </div>
    
           {/* --- Stage 3: Output (Auto Execution) --- */}
           <div className="relative z-10 group">
              <div className="mx-auto w-full max-w-sm bg-[#050a18] rounded-2xl p-8 border border-white/5 relative transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(249,115,22,0.2)] hover:border-orange-500/30">
                  {/* Top Node Connection */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#010409] border-2 border-orange-600 flex items-center justify-center z-20">
                     <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                  </div>
    
                  <div className="text-center mb-6">
                     <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/10 text-orange-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                     </div>
                     <h3 className="text-xl font-bold text-white">动态模型“护航”</h3>
                     <p className="text-xs text-orange-500/60 font-mono mt-2">Auto Execution</p>
                  </div>
                  
                  <div className="space-y-3 text-sm text-slate-400 text-center">
                     <p>实时监控波动，自动修正策略。</p>
                     <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent my-3"></div>
                     <p className="text-white">7×24h 人机协作闭环</p>
                  </div>
              </div>
           </div>
    
        </div>
      </div>
    </section>
  );
}
