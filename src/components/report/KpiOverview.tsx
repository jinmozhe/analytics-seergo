// src/components/report/KpiOverview.tsx
import { useState, useEffect } from 'react';
import type { KpiApiResponse } from "@/types/report";
import { cn } from "@/lib/utils";

interface KpiOverviewProps {
  data: KpiApiResponse | null;
}

export function KpiOverview({ data }: KpiOverviewProps) {
  // 1. Client-Side Time Logic (North America Eastern Time)
  const [naDate, setNaDate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateFormatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      setNaDate(dateFormatter.format(now).replace(/-/g, '/'));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Loading State
  if (!data) return (
    <div className="min-h-[400px] flex items-center justify-center text-slate-500 animate-pulse font-mono text-sm">
       Loading Metrics...
    </div>
  );

  return (
    <section className="w-full border-t border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)] relative z-30">
      <div className="w-full max-w-[1280px] px-0 flex flex-col py-24 md:py-32 mx-auto">
        {/* [修复] 移除了 'block' 类名，保留 'flex' 以消除冲突 */}
        <div className="relative z-10 flex flex-col h-full justify-center space-y-8 pb-10">
          
          {/* Background Ambience (From provided HTML) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
            <div className="absolute -top-[15%] -left-[10%] w-[600px] h-[600px] rounded-full mix-blend-screen opacity-20 filter blur-[90px] animate-pulse-slow" 
                 style={{ background: 'radial-gradient(circle, rgba(46, 119, 247, 0.6) 0%, transparent 70%)' }}></div>
            <div className="absolute top-[30%] -right-[15%] w-[500px] h-[500px] rounded-full mix-blend-screen opacity-15 filter blur-[100px] animate-pulse-slow" 
                 style={{ background: 'radial-gradient(circle, rgba(249, 115, 22, 0.5) 0%, transparent 70%)', animationDelay: '3s' }}></div>
          </div>

          {/* Header */}
          <div className="text-center space-y-4 mb-4 relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              <span className="hero-gradient-text">{data.header.title_highlight}</span>
              <span className="text-white">{data.header.title_suffix}</span>
            </h2>
            <p className="text-slate-500 font-medium uppercase tracking-[0.3em] text-sm md:text-base">
              {data.header.subtitle}
            </p>
            <div className="flex justify-center mt-6">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-lg animate-pulse-slow">
                <div className="text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div className="h-4 w-px bg-white/10"></div>
                <div className="flex flex-col md:flex-row md:items-center md:gap-3 text-left">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">北美东部标准时间</span>
                  <span className="text-xs md:text-sm font-mono text-blue-300 font-bold tracking-wide">{naDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Super Summary Panel */}
          <div className="glass-card rounded-[32px] overflow-hidden mb-2 relative group border-white/10 z-10">
            <div className="absolute top-0 left-[20%] w-1/3 h-full bg-blue-500/5 blur-[100px] pointer-events-none"></div>
            <div className="absolute top-0 right-[20%] w-1/3 h-full bg-orange-500/5 blur-[100px] pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
              {/* Sales */}
              <div className="p-8 lg:p-10 flex flex-col items-center justify-center relative hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#0B1221] border border-white/5 flex items-center justify-center text-slate-400 shadow-sm shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <span className="text-sm text-slate-400 font-bold uppercase tracking-wider">{data.super_summary.sales.label}</span>
                  <div className="flex items-center gap-1 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/30">
                    <svg className="w-3 h-3 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                    <span className="text-xs font-bold text-blue-300">{data.super_summary.sales.trend_value}</span>
                  </div>
                </div>
                <div className="text-5xl lg:text-7xl font-bold text-white font-[Inter] tracking-tighter drop-shadow-lg">{data.super_summary.sales.value}</div>
              </div>

              {/* Volume */}
              <div className="p-8 lg:p-10 flex flex-col items-center justify-center relative hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#0B1221] border border-white/5 flex items-center justify-center text-slate-400 shadow-sm shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                  </div>
                  <span className="text-sm text-slate-400 font-bold uppercase tracking-wider">{data.super_summary.volume.label}</span>
                  <div className="flex items-center gap-1 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/30">
                    <svg className="w-3 h-3 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                    <span className="text-xs font-bold text-blue-300">{data.super_summary.volume.trend_value}</span>
                  </div>
                </div>
                <div className="text-5xl lg:text-7xl font-bold text-white font-[Inter] tracking-tighter drop-shadow-lg">{data.super_summary.volume.value}</div>
              </div>

              {/* ROI */}
              <div className="p-8 lg:p-10 flex flex-col items-center justify-center relative hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#0B1221] border border-white/5 flex items-center justify-center text-slate-400 shadow-sm shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"></path></svg>
                  </div>
                  <span className="text-sm text-slate-400 font-bold uppercase tracking-wider">{data.super_summary.roi.label}</span>
                  <div className="flex items-center gap-1 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                    <svg className="w-3 h-3 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>
                    <span className="text-xs font-bold text-orange-400">{data.super_summary.roi.trend_value}</span>
                  </div>
                </div>
                <div className="text-5xl lg:text-7xl font-bold text-white font-[Inter] tracking-tighter drop-shadow-lg">{data.super_summary.roi.value}</div>
              </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="bg-[#020617]/40 border-t border-white/5 backdrop-blur-sm grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
              <div className="p-4 lg:py-6 flex flex-col items-center justify-center border-b lg:border-b-0 border-white/5 group hover:bg-white/[0.02] transition-colors">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2">{data.bottom_bar.spend.label}</span>
                <span className="text-2xl font-bold text-slate-200 font-mono group-hover:text-white transition-colors">{data.bottom_bar.spend.value}</span>
              </div>
              <div className="p-4 lg:py-6 flex flex-col items-center justify-center border-b lg:border-b-0 border-white/5 group hover:bg-white/[0.02] transition-colors">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2">{data.bottom_bar.sales.label}</span>
                <span className="text-2xl font-bold text-slate-200 font-mono group-hover:text-white transition-colors">{data.bottom_bar.sales.value}</span>
              </div>
              <div className="p-4 lg:py-6 flex flex-col items-center justify-center group hover:bg-white/[0.02] transition-colors">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2">{data.bottom_bar.volume.label}</span>
                <span className="text-2xl font-bold text-slate-200 font-mono group-hover:text-white transition-colors">{data.bottom_bar.volume.value}</span>
              </div>
              <div className="p-4 lg:py-6 flex flex-col items-center justify-center relative group hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{data.bottom_bar.roi.label}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                </div>
                <span className="text-2xl font-bold text-slate-200 font-mono group-hover:text-white transition-colors">{data.bottom_bar.roi.value}</span>
              </div>
            </div>
          </div>

          {/* GAP CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch z-10 mt-6">
            {data.gap_cards.map((card) => {
              const isBlue = card.status_color === 'blue';
              // [修复] 移除未使用的 isOrange 变量，逻辑由 else 处理
              
              const tagBg = isBlue ? "bg-blue-500/10" : "bg-orange-500/10";
              const tagText = isBlue ? "text-blue-300" : "text-orange-400";
              const tagBorder = isBlue ? "border-blue-500/30" : "border-orange-500/20";
              const barBg = isBlue ? "bg-blue-500" : "bg-orange-500";
              const barShadow = isBlue ? "shadow-[0_0_10px_rgba(59,130,246,0.6)]" : "shadow-[0_0_10px_rgba(249,115,22,0.6)]";
              const dotShadow = isBlue ? "shadow-[0_0_8px_rgba(59,130,246,0.8)]" : "shadow-[0_0_8px_orange]";
              const textHighlight = isBlue ? "text-white" : "text-orange-400";

              return (
                <div key={card.id} className="glass-card p-8 rounded-3xl relative overflow-hidden group flex flex-col justify-between">
                  <div>
                    {/* Card Header */}
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-lg font-medium text-slate-200">{card.title}</h3>
                      <span className={cn("px-2 py-1 rounded text-[10px] font-bold border", tagBg, tagText, tagBorder)}>
                        {card.status_tag}
                      </span>
                    </div>

                    {/* Main Metrics */}
                    <div className="flex justify-between items-end mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className={cn("text-4xl font-bold tracking-tight", textHighlight)}>
                          {card.current_value}
                        </span>
                        <span className="text-sm font-bold text-slate-500">{card.current_label}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold text-slate-300">{card.target_value}</span>
                        <div className="text-xs text-slate-600">{card.target_label}</div>
                      </div>
                    </div>

                    {/* === Card Body: Chart Type (Sales) === */}
                    {card.type === 'chart' && card.chart_data && (
                      <>
                        {/* Progress Bar (My vs Top 1) */}
                        <div className="mb-2 mt-5 relative">
                          <div className="relative h-2 bg-slate-800 rounded-full overflow-visible">
                            <div className="absolute h-full bg-slate-600 w-full opacity-30 rounded-full"></div>
                            <div 
                              className={cn("absolute h-full rounded-full", barBg, barShadow)} 
                              style={{ width: `${card.progress_percent}%` }}
                            ></div>
                            <div 
                              className="absolute -top-9 -translate-x-1/2 z-10"
                              style={{ left: `${card.progress_percent}%` }}
                            >
                              <div className={cn("bg-white text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-lg whitespace-nowrap", isBlue ? "text-blue-600" : "text-orange-600")}>
                                {card.progress_percent}%
                              </div>
                              <div className="w-1.5 h-1.5 bg-white rotate-45 absolute -bottom-0.5 left-1/2 -translate-x-1/2"></div>
                            </div>
                          </div>
                        </div>

                        {/* Bar Chart */}
                        <div className="mt-8">
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-3 flex justify-between">
                            <span>近7日销量走势</span>
                            <span className="text-white font-bold">Today</span>
                          </div>
                          <div className="flex items-end justify-between gap-2 h-16 relative">
                            {card.chart_data.map((val, idx) => {
                              const isToday = idx === card.chart_data!.length - 1;
                              const heightPercent = Math.min((val / 300) * 100, 100); // 假设最大值300
                              return (
                                <div key={idx} className="w-full h-full flex items-end relative group/bar cursor-pointer">
                                  <div className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200 z-20 pointer-events-none">
                                    <div className="bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded shadow-xl border border-white/10 whitespace-nowrap">
                                      {val} 单
                                    </div>
                                    <div className="w-2 h-2 bg-slate-800 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2 border-r border-b border-white/10"></div>
                                  </div>
                                  <div 
                                    className={cn(
                                      "w-full rounded-sm transition-all duration-300 relative",
                                      isToday 
                                        ? cn(barBg, "group-hover/bar:bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.4)] group-hover/bar:shadow-[0_0_15px_rgba(59,130,246,0.6)]")
                                        : "bg-slate-700/30 group-hover/bar:bg-slate-600"
                                    )}
                                    style={{ height: `${heightPercent}%` }}
                                  ></div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    )}

                    {/* === Card Body: Progress Type (ROI) === */}
                    {card.type === 'progress' && (
                      <div className="mt-8">
                        <div className="flex justify-between text-xs text-slate-500 mb-2">
                          <span>达成率</span>
                          <span className={cn("font-bold", tagText)}>{card.progress_percent}%</span>
                        </div>
                        <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner border border-white/5">
                          <div 
                            className={cn("h-full rounded-full", barBg, barShadow)} 
                            style={{ width: `${card.progress_percent}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-2 text-[10px] text-slate-600">
                          <span>0.00</span>
                          <span>Target: {card.target_value}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Footer */}
                  <div className="pt-5 mt-auto border-t border-white/5 flex items-center gap-3">
                    <div className={cn("w-2 h-2 rounded-full shrink-0", barBg, dotShadow)}></div>
                    <div 
                      className="text-sm md:text-base text-slate-300 font-medium leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: card.footer_html }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
