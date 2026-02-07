// src/components/report/AiSimulation.tsx
import { useEffect, useRef } from "react";
import type { SimulationApiResponse } from "@/types/report";

interface AiSimulationProps {
  data: SimulationApiResponse | null;
}

export function AiSimulation({ data }: AiSimulationProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  // 粒子沿曲线运动动画
  useEffect(() => {
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !dot) return;

    let startTime: number | null = null;
    const duration = 2500; // 动画周期 2.5s
    let animationId: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      
      // 计算进度 (0 -> 1)
      const progress = (elapsed % duration) / duration;
      
      // 缓动效果 (Ease In Out)
      const ease = progress < 0.5 
        ? 2 * progress * progress 
        : -1 + (4 - 2 * progress) * progress;

      // 获取路径上的坐标点
      try {
        const totalLength = path.getTotalLength();
        const point = path.getPointAtLength(ease * totalLength);
        
        // 映射 SVG 坐标到 DOM 坐标
        // SVG viewBox 是 0 0 600 100
        const xPercent = (point.x / 600) * 100;
        const yPercent = (point.y / 100) * 100;

        dot.style.transform = `translate(${xPercent}%, ${yPercent}%)`;
        dot.style.opacity = progress > 0.9 ? `${1 - (progress - 0.9) * 10}` : '1'; // 尾部渐隐
      } catch {
        // [修复] 移除了未使用的变量 'e' (Optional Catch Binding)
        // 防止 Safari 某些版本报错 (getTotalLength 可能抛出)
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  if (!data) return <div className="py-20 text-center text-slate-600 animate-pulse">Loading Simulation...</div>;

  return (
    <section className="w-full border-t border-white/10 relative z-30">
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-70"></div>
      
      <div className="w-full max-w-[1280px] px-0 flex flex-col py-24 md:py-32 mx-auto">
        <div className="relative z-10 flex flex-col h-full justify-center w-full px-4 md:px-0 mx-auto pb-10">
          
          {/* Ambient Background */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
             <div className="absolute top-[20%] left-[10%] w-[700px] h-[700px] rounded-full mix-blend-screen opacity-10 filter blur-[120px] animate-pulse-slow" 
                  style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)' }}></div>
             <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] rounded-full mix-blend-screen opacity-10 filter blur-[100px] animate-pulse-slow" 
                  style={{ background: 'radial-gradient(circle, rgba(249, 115, 22, 0.3) 0%, transparent 70%)', animationDelay: '2.5s' }}></div>
          </div>

          {/* Header */}
          <div className="text-center space-y-4 mb-10 lg:mb-16 relative z-10">
            <div className="space-y-2">
               <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                  <span className="text-white">{data.header.title_prefix}</span>
                  <span className="hero-gradient-text">{data.header.title_highlight}</span>
               </h2>
               <p className="text-slate-600 font-medium uppercase tracking-[0.3em] text-sm md:text-base">
                  {data.header.subtitle}
               </p>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full relative z-10">
             
             {/* === Left Column: Prediction Highlight === */}
             <div className="col-span-1 lg:col-span-5 flex flex-col justify-center space-y-12 lg:pr-8">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-[#007AFF]"></div>
                   <span className="text-xs font-bold text-[#007AFF] tracking-[0.2em] uppercase font-[Inter]">{data.prediction_highlight.tag_label}</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                   <div className="text-white mb-2">{data.prediction_highlight.main_text_1}</div>
                   <div className="hero-gradient-text">{data.prediction_highlight.main_text_2}</div>
                </h2>

                <div className="border-l-2 border-white/10 pl-6 py-2">
                   <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                      {data.prediction_highlight.description}
                   </p>
                </div>

                <div className="group cursor-default">
                   <div className="flex items-baseline gap-3">
                      <span className="text-4xl md:text-5xl font-[Inter] font-bold text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] group-hover:drop-shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-500">
                         {data.prediction_highlight.value}
                      </span>
                      <span className="text-lg font-bold text-[#3B82F6] font-[Inter] opacity-80">{data.prediction_highlight.period}</span>
                   </div>
                   <div className="text-sm text-slate-500 mt-2 font-medium tracking-wide">{data.prediction_highlight.value_label}</div>
                   <div className="mt-6 w-full h-px bg-gradient-to-r from-[#3B82F6] to-transparent opacity-50"></div>
                </div>

                <p className="text-xs text-slate-600 font-mono tracking-wide">{data.prediction_highlight.footer_note}</p>
             </div>

             {/* === Right Column: Cards Stack === */}
             <div className="col-span-1 lg:col-span-7 flex flex-col h-full justify-center relative group/cards">
                
                {/* --- Card 1: Current Status --- */}
                <div className="w-full rounded-[24px] p-6 border border-white/5 bg-[#0B1221]/80 backdrop-blur-xl relative overflow-hidden hover:border-orange-500/30 transition-all duration-500 z-10 group/status">
                   <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
                   
                   <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                         </div>
                         <span className="text-sm font-bold text-slate-300 tracking-wider uppercase">{data.current_status_card.title}</span>
                      </div>
                      <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20 uppercase tracking-wide">
                         {data.current_status_card.tag}
                      </span>
                   </div>

                   <div className="grid grid-cols-3 gap-4 mb-6 relative z-10">
                      <div>
                         <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">{data.current_status_card.metrics.sales_label}</div>
                         <div className="text-xl md:text-2xl font-bold text-white font-[Inter]">{data.current_status_card.metrics.sales_value}</div>
                      </div>
                      <div className="border-l border-white/5 pl-4">
                         <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">{data.current_status_card.metrics.roas_label}</div>
                         <div className="text-xl md:text-2xl font-bold text-slate-200 font-[Inter]">{data.current_status_card.metrics.roas_value}</div>
                      </div>
                      <div className="border-l border-white/5 pl-4">
                         <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">{data.current_status_card.metrics.profit_label}</div>
                         <div className="text-xl md:text-2xl font-bold text-slate-200 font-[Inter]">{data.current_status_card.metrics.profit_value}</div>
                      </div>
                   </div>

                   <div className="bg-orange-950/30 border border-orange-500/20 rounded-lg p-3 flex items-center gap-3">
                      <svg className="w-4 h-4 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <div 
                         className="text-xs text-orange-100/90 leading-normal font-medium"
                         dangerouslySetInnerHTML={{ __html: data.current_status_card.analysis_content }}
                      />
                   </div>
                </div>

                {/* --- Connector Arrow --- */}
                <div className="relative w-full h-16 flex flex-col items-center justify-center shrink-0 z-20 -my-4 cursor-pointer gap-0.5 group/connector">
                   <div className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-sky-500/50 to-transparent opacity-30 group-hover/connector:opacity-80 transition-opacity duration-500"></div>
                   <svg className="w-6 h-6 text-sky-500/30 transition-all duration-300 transform group-hover/connector:translate-y-1 group-hover/connector:text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                   <svg className="w-6 h-6 text-sky-500/60 -mt-3 transition-all duration-300 delay-75 transform group-hover/connector:translate-y-1.5 group-hover/connector:text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                   <svg className="w-6 h-6 text-sky-400 -mt-3 transition-all duration-300 delay-100 transform group-hover/connector:translate-y-2 group-hover/connector:text-white drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                </div>

                {/* --- Card 2: AI Simulation (Bottom) --- */}
                <div className="w-full rounded-[32px] p-6 md:p-8 border bg-gradient-to-br from-[#0B1221] to-[#020617] backdrop-blur-2xl relative overflow-hidden transition-all duration-500 flex flex-col z-10 border-sky-500/20">
                   
                   {/* Grid Overlay */}
                   <div className="absolute inset-0 transition-opacity duration-700 opacity-20" 
                        style={{ backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                   <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-[100px] pointer-events-none transition-colors duration-700"></div>

                   <div className="flex justify-between items-start relative z-10 mb-8">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 bg-sky-500/10 border-sky-500/30">
                            <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                         </div>
                         <div>
                            <div className="text-sm font-bold text-white tracking-wide">{data.simulation_card.title}</div>
                            <div className="text-[10px] text-sky-400 font-medium">{data.simulation_card.subtitle}</div>
                         </div>
                      </div>
                      <div className="text-right">
                         <div className="text-2xl font-bold text-sky-400 tracking-tighter">{data.simulation_card.confidence_score}</div>
                         <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">置信度评分</div>
                      </div>
                   </div>

                   {/* Simulation Metrics */}
                   <div className="grid grid-cols-3 gap-4 mb-8 relative z-10">
                      <div className="group/metric">
                         <div className="text-[10px] text-slate-400 uppercase font-bold mb-1 group-hover/metric:text-sky-300 transition-colors">{data.simulation_card.metrics.sales_label}</div>
                         <div className="text-2xl md:text-3xl font-bold text-white font-[Inter] tracking-tight">{data.simulation_card.metrics.sales_value}</div>
                         <div className="flex items-center gap-1 mt-1"><span className="text-xs font-bold text-sky-300 bg-sky-500/10 px-1 rounded">{data.simulation_card.metrics.sales_change}</span></div>
                      </div>
                      <div className="border-l border-white/5 pl-4 group/metric">
                         <div className="text-[10px] text-slate-400 uppercase font-bold mb-1 group-hover/metric:text-sky-300 transition-colors">{data.simulation_card.metrics.roas_label}</div>
                         <div className="text-2xl md:text-3xl font-bold text-white font-[Inter] tracking-tight">{data.simulation_card.metrics.roas_value}</div>
                         <div className="flex items-center gap-1 mt-1"><span className="text-xs font-bold text-sky-300 bg-sky-500/10 px-1 rounded">{data.simulation_card.metrics.roas_change}</span></div>
                      </div>
                      <div className="border-l border-white/5 pl-4 group/metric relative">
                         <div className="absolute inset-0 bg-sky-500/5 blur-xl opacity-0 group-hover/metric:opacity-100 transition-opacity"></div>
                         <div className="text-[10px] text-slate-400 uppercase font-bold mb-1 group-hover/metric:text-sky-300 transition-colors relative z-10">{data.simulation_card.metrics.profit_label}</div>
                         <div className="text-2xl md:text-3xl font-bold text-sky-400 font-[Inter] tracking-tight relative z-10">{data.simulation_card.metrics.profit_value}</div>
                         <div className="flex items-center gap-1 mt-1 relative z-10"><span className="text-xs font-bold text-sky-300 bg-sky-500/10 px-1 rounded">{data.simulation_card.metrics.profit_change}</span></div>
                      </div>
                   </div>

                   {/* SVG Chart & Animation */}
                   <div className="relative w-full h-[120px] mt-auto">
                      <div className="flex items-center gap-2 mb-2">
                         <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                         </span>
                         <span className="text-[10px] text-sky-300 font-bold uppercase tracking-widest">AI 优化进行中</span>
                      </div>
                      
                      <div className="relative w-full h-full">
                         {/* Animated Dot (Position controlled by JS) */}
                         <div 
                           ref={dotRef}
                           className="absolute top-0 left-0 w-3 h-3 bg-[#38BDF8] rounded-full shadow-[0_0_15px_rgba(56,189,248,0.8)] z-20 pointer-events-none"
                           style={{ transform: 'translate(0px, 0px)' }} // Init pos
                         >
                            <div className="absolute inset-0.5 bg-white rounded-full opacity-80"></div>
                         </div>

                         {/* SVG Container */}
                         <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 100">
                            <defs>
                               <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.2"></stop>
                                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0"></stop>
                               </linearGradient>
                            </defs>
                            
                            {/* Dashed Baseline */}
                            <path d="M0,80 C150,80 300,75 600,70" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" vectorEffect="non-scaling-stroke"></path>
                            
                            {/* Growth Curve (Main Path) */}
                            <path 
                                ref={pathRef}
                                d="M0,80 C100,80 200,60 300,40 400,20 500,10 600,5" 
                                fill="none" 
                                stroke="#38BDF8" 
                                strokeWidth="2" 
                                filter="drop-shadow(0 0 4px rgba(56,189,248,0.5))" 
                                vectorEffect="non-scaling-stroke">
                            </path>
                            
                            {/* Filled Area */}
                            <path d="M0,80 C100,80 200,60 300,40 400,20 500,10 600,5 V100 H0 Z" fill="url(#growthGrad)" stroke="none"></path>
                         </svg>
                      </div>
                   </div>

                </div>

             </div>

          </div>
        </div>
      </div>
    </section>
  );
}
