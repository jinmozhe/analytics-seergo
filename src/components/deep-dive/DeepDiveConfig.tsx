import { useState } from "react";
import { Download, PieChart, Layers, FileText, Video, Users, Box, Wand2, BarChart2 } from "lucide-react";
import { TIME_OPTIONS, CATEGORY_OPTIONS, DETAIL_OPTIONS } from "@/data/deep-dive-mock";
import type { DeepDiveState } from "@/types/deep-dive";

interface DeepDiveConfigProps {
  state: DeepDiveState;
  onChange: (newState: DeepDiveState) => void;
}

export function DeepDiveConfig({ state, onChange }: DeepDiveConfigProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  // Helper to update specific field
  const updateState = (field: keyof DeepDiveState, value: any) => {
    onChange({ ...state, [field]: value });
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert(`报告生成成功:\n周期: ${state.timeId}\n类型: ${state.categoryId}\n明细: ${state.detailId}`);
    }, 1500);
  };

  // Helper to get icon for details
  const getDetailIcon = (id: string) => {
    switch (id) {
      case 'comprehensive': return <PieChart className="w-5 h-5" />;
      case 'sp-asin': case 'sb-asin': return <Layers className="w-5 h-5" />;
      case 'sp-kw': case 'sb-kw': return <FileText className="w-5 h-5" />;
      case 'sb-video': return <Video className="w-5 h-5" />;
      case 'sd-audience': return <Users className="w-5 h-5" />;
      default: return <Box className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      
      {/* --- Panel A: Configuration (Main Config) --- */}
      <div className="bg-[#0A1025]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col gap-8 animate-fade-in-down shadow-2xl">
         
         {/* 01. Time Range */}
         <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
               01. 选择周期 (TIME RANGE)
            </h3>
            <div className="flex flex-wrap gap-3">
               {TIME_OPTIONS.map((opt) => {
                 const isSelected = state.timeId === opt.id;
                 return (
                   <button
                     key={opt.id}
                     onClick={() => updateState('timeId', opt.id)}
                     className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                       isSelected
                         ? "bg-[#2E77F7] border-[#2E77F7] text-white shadow-[0_0_20px_rgba(46,119,247,0.4)]"
                         : "bg-[#0F172A] border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200"
                     }`}
                   >
                     <span className={isSelected ? "font-bold" : ""}>{opt.label}</span>
                     <span className={`text-xs ${isSelected ? "text-blue-100" : "text-slate-600"}`}>({opt.dateRange})</span>
                   </button>
                 );
               })}
            </div>
         </div>

         {/* 02. Report Type */}
         <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
               02. 报告类型 (REPORT TYPE)
            </h3>
            <div className="flex flex-wrap gap-4">
               {CATEGORY_OPTIONS.map((opt) => {
                 const isSelected = state.categoryId === opt.id;
                 return (
                   <button
                     key={opt.id}
                     onClick={() => updateState('categoryId', opt.id)}
                     className={`px-6 py-3 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center gap-3 ${
                       isSelected
                         ? "bg-[#6366f1] border-[#6366f1] text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]" // Purple for Type
                         : "bg-[#0F172A] border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200"
                     }`}
                   >
                     {opt.id === 'diagnosis' ? <Wand2 className="w-4 h-4" /> : <BarChart2 className="w-4 h-4" />}
                     {opt.label}
                   </button>
                 );
               })}
            </div>
         </div>

         {/* 03. Report Detail (Grid Layout) */}
         <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
               03. 报告明细 (SELECT REPORT)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
               {DETAIL_OPTIONS.map((opt) => {
                 const isSelected = state.detailId === opt.id;
                 return (
                   <button
                     key={opt.id}
                     onClick={() => updateState('detailId', opt.id)}
                     className={`h-24 flex flex-col items-center justify-center gap-3 rounded-xl border transition-all duration-200 ${
                       isSelected
                         ? "bg-[#052e16] border-[#10b981] text-[#34d399] shadow-[0_0_15px_rgba(16,185,129,0.2)]" // Green Theme for Detail
                         : "bg-[#0F172A] border-white/5 text-slate-400 hover:bg-[#1e293b] hover:border-white/10"
                     }`}
                   >
                     <div className={isSelected ? "text-[#34d399]" : "text-slate-500"}>
                        {getDetailIcon(opt.id)}
                     </div>
                     <span className="text-xs font-medium">{opt.label}</span>
                   </button>
                 );
               })}
            </div>
         </div>

         {/* Action: Download */}
         <div className="pt-4 border-t border-white/5">
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full py-4 bg-white hover:bg-slate-200 text-slate-900 font-bold rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
                {isDownloading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
                    正在生成报告...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    下载分析报告
                  </>
                )}
            </button>
         </div>

      </div>

      {/* Note: Removed the "Data Preview" panel to focus on the full config UI requested. 
          If you want it back, we can place it below or to the side. */}
    </div>
  );
}
