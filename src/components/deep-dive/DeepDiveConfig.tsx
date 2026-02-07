// src/components/deep-dive/DeepDiveConfig.tsx
import { useState } from "react";
import { Download, AlertCircle } from "lucide-react";
import { 
  type DeepDiveState, 
  type TimeOption, 
  type AdTypeOption,
  type ReportTypeOption, 
  type DetailOption 
} from "@/types/deep-dive";
import { REPORT_SOURCE_MAP, UNKNOWN_REPORT_CONFIG } from "@/lib/deep-dive-constants";

interface DeepDiveConfigProps {
  // 核心状态 (4层)
  state: DeepDiveState;
  // 状态变更回调
  onChange: (field: keyof DeepDiveState, value: string) => void;
  
  // 动态选项 (由 Hook 计算得出)
  options: {
    timeOptions: TimeOption[];
    adTypeOptions: AdTypeOption[];
    reportTypeOptions: ReportTypeOption[];
    detailOptions: DetailOption[];
  };

  // 下载链接 (如果为 null 表示当前组合没有报告或报告未生成)
  downloadUrl: string | null;
}

export function DeepDiveConfig({ 
  state, 
  onChange, 
  options, 
  downloadUrl 
}: DeepDiveConfigProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  // 处理下载点击
  const handleDownload = () => {
    if (!downloadUrl) return;
    setIsDownloading(true);
    window.open(downloadUrl, "_blank");
    setTimeout(() => setIsDownloading(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      
      {/* --- Main Configuration Panel --- */}
      <div className="bg-[#0A1025]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col gap-8 animate-fade-in-down shadow-2xl">
         
         {/* 01. Time Range Selection */}
         <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center justify-between">
               <span>01. 选择周期 (TIME RANGE)</span>
               <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400">
                 可选: {options.timeOptions.length}
               </span>
            </h3>
            <div className="flex flex-wrap gap-3">
               {options.timeOptions.map((opt) => {
                 const isSelected = state.timeId === opt.id;
                 return (
                   <button
                     key={opt.id}
                     onClick={() => onChange('timeId', opt.id)}
                     // [UPDATED] 调整了样式，确保单行文本居中
                     className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                       isSelected
                         ? "bg-[#2E77F7] border-[#2E77F7] text-white shadow-[0_0_20px_rgba(46,119,247,0.4)]"
                         : "bg-[#0F172A] border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200"
                     }`}
                   >
                     {/* [UPDATED] 仅显示 Label (现在 Label 已经是日期范围了) */}
                     <span className={isSelected ? "font-bold" : ""}>{opt.label}</span>
                   </button>
                 );
               })}
            </div>
         </div>

         {/* 02. Ad Type Selection */}
         <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
               02. 广告类型 (AD TYPE)
            </h3>
            <div className="flex flex-wrap gap-3">
               {options.adTypeOptions.length > 0 ? (
                 options.adTypeOptions.map((opt) => {
                   const isSelected = state.adTypeId === opt.id;
                   const Icon = opt.icon || AlertCircle;
                   
                   return (
                     <button
                       key={opt.id}
                       onClick={() => onChange('adTypeId', opt.id)}
                       className={`px-5 py-3 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                         isSelected
                           ? "bg-[#8b5cf6] border-[#8b5cf6] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                           : "bg-[#0F172A] border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200"
                       }`}
                     >
                       <Icon className="w-4 h-4" />
                       {opt.label}
                     </button>
                   );
                 })
               ) : (
                 <div className="text-sm text-slate-600 italic px-2">
                   请先选择时间周期...
                 </div>
               )}
            </div>
         </div>

         {/* 03. Report Type Selection */}
         <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
               03. 报告类型 (REPORT TYPE)
            </h3>
            <div className="flex flex-wrap gap-4">
               {options.reportTypeOptions.length > 0 ? (
                 options.reportTypeOptions.map((opt) => {
                   const isSelected = state.reportTypeId === opt.id;
                   const Icon = opt.icon || AlertCircle;
                   
                   return (
                     <button
                       key={opt.id}
                       onClick={() => onChange('reportTypeId', opt.id)}
                       className={`px-6 py-3 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center gap-3 ${
                         isSelected
                           ? "bg-[#6366f1] border-[#6366f1] text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                           : "bg-[#0F172A] border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200"
                       }`}
                     >
                       <Icon className="w-4 h-4" />
                       {opt.label}
                     </button>
                   );
                 })
               ) : (
                 <div className="text-sm text-slate-600 italic px-2">
                   请先选择广告类型...
                 </div>
               )}
            </div>
         </div>

         {/* 04. Report Detail Selection */}
         <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
               04. 报告明细 (SELECT REPORT)
            </h3>
            
            {options.detailOptions.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                 {options.detailOptions.map((opt) => {
                   const isSelected = state.detailId === opt.id;
                   const config = REPORT_SOURCE_MAP[opt.id] || UNKNOWN_REPORT_CONFIG;
                   const Icon = config.icon;

                   return (
                     <button
                       key={opt.id}
                       onClick={() => onChange('detailId', opt.id)}
                       className={`h-24 flex flex-col items-center justify-center gap-3 rounded-xl border transition-all duration-200 ${
                         isSelected
                           ? "bg-[#052e16] border-[#10b981] text-[#34d399] shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                           : "bg-[#0F172A] border-white/5 text-slate-400 hover:bg-[#1e293b] hover:border-white/10"
                       }`}
                     >
                       <div className={isSelected ? "text-[#34d399]" : "text-slate-500"}>
                          <Icon className="w-5 h-5" />
                       </div>
                       <span className="text-xs font-medium text-center px-1">
                         {opt.label}
                       </span>
                     </button>
                   );
                 })}
              </div>
            ) : (
              <div className="p-8 border border-dashed border-slate-800 rounded-xl text-center text-slate-600 text-sm">
                当前组合下暂无明细数据
              </div>
            )}
         </div>

         {/* Action: Download Button */}
         <div className="pt-4 border-t border-white/5">
            <button 
              onClick={handleDownload}
              disabled={!downloadUrl || isDownloading}
              className={`w-full py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.05)] ${
                !downloadUrl 
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed opacity-50" 
                  : "bg-white hover:bg-slate-200 text-slate-900 cursor-pointer"
              }`}
            >
                {isDownloading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
                    正在请求下载...
                  </>
                ) : !downloadUrl ? (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    暂无报告文件
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    下载 PDF 分析报告
                  </>
                )}
            </button>
         </div>

      </div>
    </div>
  );
}
