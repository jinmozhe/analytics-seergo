// src/pages/DeepDive.tsx
import { useMemo } from "react";
import { useLoaderData } from "react-router-dom"; // 注意: RRv7 兼容层，若纯 v7 项目可能是 'react-router'
import { Navbar } from "@/components/home/Navbar";
import { DeepDiveConfig } from "@/components/deep-dive/DeepDiveConfig";
import { DeepDiveChat } from "@/components/deep-dive/DeepDiveChat";
import { useDeepDive } from "@/hooks/use-deep-dive";
import { useDeepDiveChat } from "@/hooks/use-deep-dive-chat";
import type { 
  ReportAPIItem, 
  DeepDiveConfig as ConfigType,
  DeepDiveState,
  ReportType
} from "@/types/deep-dive";

export default function DeepDive() {
  // =========================================
  // 1. 获取路由层预加载的数据 (Loader Data)
  // =========================================
  const { rawReports, config } = useLoaderData() as { 
    rawReports: ReportAPIItem[]; 
    config: ConfigType;
  };

  // =========================================
  // 2. 初始化业务逻辑 (Business Logic)
  // =========================================
  
  // A. 报告筛选逻辑 (4层级联: Time -> AdType -> ReportType -> Detail)
  const { state, actions, options, currentReport } = useDeepDive(rawReports);

  // B. AI 对话逻辑 (Right Panel Logic)
  // 核心集成点：将当前选中的 Report ID 传递给 Chat Hook
  // 当 Report ID 改变时，Chat Hook 会自动重置并加载新的历史记录
  const activeReportId = currentReport?.id || null;

  const { 
    messages, 
    isStreaming, 
    streamingContent, 
    sendMessage,
    isLoadingHistory 
  } = useDeepDiveChat(config, activeReportId);

  // =========================================
  // 3. 辅助逻辑 (Helpers)
  // =========================================

  // [UPDATED] 处理左侧配置变更 (适配 4 层状态)
  const handleConfigChange = (field: keyof DeepDiveState, value: string) => {
    switch (field) {
      case 'timeId':
        actions.setTimeId(value);
        break;
      case 'adTypeId': // [NEW] 广告类型
        actions.setAdTypeId(value);
        break;
      case 'reportTypeId': // [RENAMED] 报告类型
        actions.setReportTypeId(value);
        break;
      case 'detailId':
        actions.setDetailId(value);
        break;
    }
  };

  // 计算 PDF 下载链接
  const downloadUrl = useMemo(() => {
     if (!currentReport?.pdf_path) return null;
     
     // 后端返回: "/reports/2026.pdf"
     // 兼容处理：确保它以 / 开头
     return currentReport.pdf_path.startsWith("/") 
        ? currentReport.pdf_path 
        : `/${currentReport.pdf_path}`;
        
  }, [currentReport]);

  // [UPDATED] 推导 Chat 组件需要的 Broad Type
  // 用于显示模型类型 (e.g., "SP Model Active", "DSP Model Active")
  const activeBroadType = useMemo<ReportType>(() => {
    if (!state.adTypeId) return 'sp'; // 默认兜底
    
    // 将后端的大写枚举 (SP, SB...) 转换为 Chat 组件需要的小写类型
    const type = state.adTypeId.toLowerCase();
    
    // 类型守卫: 确保它是合法的 ReportType ('sp' | 'sb' | 'sbv' | 'sd' | 'dsp')
    if (['sp', 'sb', 'sbv', 'sd', 'dsp'].includes(type)) {
      return type as ReportType;
    }
    
    return 'sp'; // 再次兜底
  }, [state.adTypeId]);

  // =========================================
  // 4. 渲染视图 (Render)
  // =========================================
  return (
    <div className="min-h-screen w-full bg-[#020617] text-white flex flex-col font-sans selection:bg-blue-500/30">
      <Navbar />

      <main className="flex-1 flex flex-col w-full max-w-[1800px] mx-auto px-4 md:px-6 pt-24 pb-6 relative z-10">
        
        {/* Header Section */}
        <div className="mb-8 space-y-2 px-2 animate-fade-in-down">
           <div className="flex items-center gap-3 opacity-70">
              <span className="text-xs font-mono text-blue-400 tracking-widest uppercase">
                / DEEP-DIVE ANALYSIS
              </span>
           </div>
           <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              <span className="text-white">全维数据</span>
              <span className="text-slate-500 mx-3">/</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                深度探索
              </span>
           </h1>
        </div>

        {/* Content Grid Layout */}
        <div className="flex flex-col xl:flex-row gap-8 h-full min-h-[600px]">
           
           {/* LEFT COLUMN: Configuration Panel */}
           <div className="w-full xl:w-[600px] shrink-0 flex flex-col h-full">
              <DeepDiveConfig 
                state={state} 
                onChange={handleConfigChange}
                options={options}
                downloadUrl={downloadUrl}
              />
           </div>

           {/* RIGHT COLUMN: AI Chat Terminal */}
           <div className="flex-1 h-full min-h-[600px]">
              <DeepDiveChat 
                activeType={activeBroadType} 
                messages={messages}
                isStreaming={isStreaming}
                streamingContent={streamingContent}
                onSendMessage={sendMessage}
                isLoadingHistory={isLoadingHistory}
              />
           </div>

        </div>

      </main>
    </div>
  );
}
