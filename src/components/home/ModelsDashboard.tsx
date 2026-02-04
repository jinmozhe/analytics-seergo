import { useState } from "react";
import { MODELS_DATA } from "@/data/home-content";
import type { ModelTab } from "@/types/home";

export function ModelsDashboard() {
  const [activeTab, setActiveTab] = useState<ModelTab>("profit");
  const activeModel = MODELS_DATA[activeTab];

  // 辅助函数：渲染对应模型的动态可视化图形
  const renderVisualization = (tab: ModelTab) => {
    switch (tab) {
      case "profit":
        return (
          <svg className="w-48 h-32 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]" viewBox="0 0 100 60" fill="none" stroke="currentColor">
            <path d="M10 50 L30 40 L50 45 L70 20 L90 10" strokeWidth="2" strokeLinecap="round" />
            <path d="M10 50 L90 50" strokeWidth="0.5" strokeDasharray="2 2" className="text-slate-600" />
            <circle cx="90" cy="10" r="3" className="fill-white animate-pulse" />
          </svg>
        );
      case "traffic":
        return (
          <div className="flex gap-3 items-end h-32 pl-8">
            <div className="w-6 bg-slate-800 h-12 rounded-sm"></div>
            <div className="w-6 bg-slate-700 h-16 rounded-sm"></div>
            <div className="w-6 bg-blue-600 h-24 rounded-sm shadow-[0_0_20px_rgba(37,99,235,0.5)] animate-pulse"></div>
            <div className="w-6 bg-indigo-500 h-20 rounded-sm"></div>
          </div>
        );
      case "capital":
        return (
          <div className="w-32 h-32 rounded-full border-[6px] border-slate-800 border-t-blue-500 border-r-blue-400 animate-spin"></div>
        );
      case "competition":
        return (
          <div className="grid grid-cols-2 gap-3 transform rotate-45">
            <div className="w-10 h-10 bg-red-500/20 border border-red-500 rounded backdrop-blur-sm"></div>
            <div className="w-10 h-10 bg-slate-800/50 rounded"></div>
            <div className="w-10 h-10 bg-slate-800/50 rounded"></div>
            <div className="w-10 h-10 bg-green-500/20 border border-green-500 rounded backdrop-blur-sm shadow-[0_0_15px_rgba(34,197,94,0.3)]"></div>
          </div>
        );
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#010409]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            <div className="mb-3">
              <span className="inline-block text-gradient-custom">
                不止是工具，而是覆盖全链路的
              </span>
            </div>
            <span className="block text-white">“量化决策模型”</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* --- Left Navigation (Vertical Pills) --- */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {(Object.keys(MODELS_DATA) as ModelTab[]).map((modelKey) => {
              const model = MODELS_DATA[modelKey];
              const isActive = activeTab === modelKey;

              return (
                <button
                  key={modelKey}
                  onClick={() => setActiveTab(modelKey)}
                  className={`group text-left px-6 py-5 rounded-2xl transition-all duration-300 border relative overflow-hidden outline-none cursor-pointer ${
                    isActive
                      ? "border-blue-500 bg-blue-600/10"
                      : "border-white/5 bg-white/[0.02] hover:bg-white/[0.05]"
                  }`}
                >
                  {/* Active Glow Indicator */}
                  <div
                    className={`absolute inset-y-0 left-0 w-1 bg-blue-500 transition-all duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  ></div>

                  <div className="flex items-center justify-between relative z-10">
                    <span
                      className={`font-bold text-lg tracking-wide transition-colors ${
                        isActive
                          ? "text-white"
                          : "text-slate-400 group-hover:text-slate-200"
                      }`}
                    >
                      {model.shortTitle}
                    </span>
                    <span
                      className={`transform transition-transform duration-300 ${
                        isActive
                          ? "translate-x-1 text-blue-400"
                          : "text-slate-600"
                      }`}
                    >
                      →
                    </span>
                  </div>
                  <p
                    className={`text-xs mt-2 font-mono uppercase tracking-wider opacity-60 transition-colors ${
                      isActive ? "text-blue-300" : "text-slate-500"
                    }`}
                  >
                    {model.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* --- Right Content Display (Holographic Window) --- */}
          <div className="lg:col-span-8 glass-card rounded-3xl p-1 border border-white/10 bg-slate-900/50 shadow-2xl relative">
            {/* Decoration Dots */}
            <div className="absolute top-4 left-4 flex gap-2 z-20">
              <div className="w-2 h-2 rounded-full bg-slate-700"></div>
              <div className="w-2 h-2 rounded-full bg-slate-700"></div>
            </div>

            <div className="h-full bg-[#020617] rounded-[20px] p-8 md:p-10 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center border border-white/5">
              {/* Background Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

              {/* Content (Animated on change) */}
              <div 
                key={activeTab} // Key changes trigger re-animation
                className="w-full md:w-1/2 relative z-10 space-y-6 animate-fade-in-up"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
                    {activeModel.coreFeature}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {activeModel.fullTitle}
                  </h3>
                  <p className="text-red-400/90 font-medium italic border-l-2 border-red-500/50 pl-3">
                    {activeModel.painPoint}
                  </p>
                </div>

                <div className="space-y-4">
                  {activeModel.details.map((detail, index) => (
                    <div key={index} className="flex gap-4 group">
                      <div className="flex-shrink-0 w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-blue-400 font-mono text-xs border border-white/10 group-hover:border-blue-500/50 transition-colors">
                        0{index + 1}
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed group-hover:text-slate-200 transition-colors">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visualization Area */}
              <div 
                key={`${activeTab}-vis`}
                className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-64 relative z-10 flex items-center justify-center bg-slate-900/50 rounded-xl border border-white/5 overflow-hidden animate-fade-in-up delay-75"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
                <div className="scale-110 opacity-80 mix-blend-screen">
                  {renderVisualization(activeTab)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
