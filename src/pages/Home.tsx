import { HeroSection } from "@/components/home/HeroSection";
import { ResultsSection } from "@/components/home/ResultsSection";
import { ModelsDashboard } from "@/components/home/ModelsDashboard";
import { ProcessFlow } from "@/components/home/ProcessFlow";
import { ComparisonSection } from "@/components/home/ComparisonSection";

export default function Home() {
  return (
    // ✅ 显式锁定背景色为 #010409，防止受全局 Report 主题色 (#020617) 影响
    // ✅ 添加 min-h-screen 和 w-full 确保覆盖完整
    <div className="bg-[#010409] min-h-screen w-full -mt-24 pt-24">
      
      {/* 2. 核心视觉区 (Fluid Orbs) */}
      <div className="-mt-24"> 
        <HeroSection />
      </div>

      {/* 3. 三张清单 (Cards & Infinite Scroll) */}
      <ResultsSection />

      {/* 4. 全息模型控制台 (Tabs & Visuals) */}
      <ModelsDashboard />

      {/* 5. 流程图 (Liquid Pipe) */}
      <ProcessFlow />

      {/* 6. 对比表格 (Table) */}
      <ComparisonSection />

      {/* 7. Final CTA Section */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center relative overflow-hidden bg-[#000103] border-t border-white/5">
        {/* Background Replica */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden select-none">
          <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] flex items-center justify-center">
              <div className="absolute w-[320px] h-[320px] bg-blue-600/50 rounded-full blur-[60px] mix-blend-screen animate-breathe z-0 top-[20%] left-[25%] md:left-[35%]"></div>
              <div className="absolute w-[240px] h-[240px] bg-orange-500/50 rounded-full blur-[50px] mix-blend-screen z-0 top-[45%] left-[55%] md:left-[60%]"></div>
          </div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="mb-10">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-center leading-tight tracking-tight relative z-10">
                <span className="block mb-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] text-white">
                   AI 训练的最佳时间
                </span>
                <span className="text-gradient-custom block">
                   一是昨天，二是现在
                </span>
              </h2>
          </div>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-16 font-light max-w-3xl mx-auto leading-relaxed relative z-10">
            您的模型每晚启动一天，就少积累 24 小时的博弈经验。<br />
            立即接入 SeerGo，让您的店铺从此刻开始享受“复利”增长。
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16 relative z-10">
            <button className="px-10 py-5 text-xl font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-full shadow-[0_0_50px_rgba(37,99,235,0.4)] transition-all transform hover:-translate-y-1 hover:shadow-[0_0_70px_rgba(37,99,235,0.6)] border border-blue-400/30 cursor-pointer">
              免费生成店铺“利润漏点”报告
            </button>
            <button className="px-10 py-5 text-xl font-medium text-slate-300 border border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:border-white hover:text-white rounded-full transition-all backdrop-blur-sm cursor-pointer">
              预约 AI 专家演示
            </button>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 relative z-10">
             <div className="flex items-center gap-3">
               <div className="font-bold text-white text-lg tracking-wider">aws <span className="font-normal text-xs text-slate-400 border-l border-slate-600 pl-2 ml-1">PARTNER</span></div>
             </div>
             <div className="flex items-center gap-3">
               <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
               <div className="text-left leading-tight">
                  <div className="text-xs text-slate-400 uppercase">Security</div>
                  <div className="text-sm font-bold text-white">AES-256</div>
               </div>
             </div>
             <div className="flex items-center gap-3">
               <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center font-serif font-bold text-white">S</div>
               <div className="text-left leading-tight">
                  <div className="text-xs text-slate-400 uppercase">Verified</div>
                  <div className="text-sm font-bold text-white">SP-API</div>
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
