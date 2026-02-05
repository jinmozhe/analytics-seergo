// src/pages/DeepDive.tsx
import { useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import { Navbar } from "@/components/home/Navbar";
import { DeepDiveConfig } from "@/components/deep-dive/DeepDiveConfig";
import { DeepDiveChat } from "@/components/deep-dive/DeepDiveChat";
import { useDeepDive } from "@/hooks/use-deep-dive";
import type { 
  ReportAPIItem, 
  DeepDiveConfig as ConfigType,
  DeepDiveState 
} from "@/types/deep-dive";
import type { ReportType } from "@/types/deep-dive"; // 需要确保 DeepDiveChat 接受的类型兼容

export default function DeepDive() {
  // =========================================
  // 1. 获取路由层预加载的数据 (Loader Data)
  // =========================================
  // 这里的 config 和 rawReports 已经在 router.tsx 中通过 await 加载完毕
  // 进入组件时数据绝对可用，无需 loading 状态
  const { rawReports, config } = useLoaderData() as { 
    rawReports: ReportAPIItem[]; 
    config: ConfigType;
  };

  // =========================================
  // 2. 初始化业务逻辑 (Business Logic)
  // =========================================
  // 将原始数据交给 Hook，获取清洗后的选项和级联状态
  const { state, actions, options, currentReport } = useDeepDive(rawReports);

  // =========================================
  // 3. 辅助逻辑 (Helpers)
  // =========================================

  // 处理配置变更回调
  const handleConfigChange = (field: keyof DeepDiveState, value: string) => {
    switch (field) {
      case 'timeId':
        actions.setTimeId(value);
        break;
      case 'categoryId':
        actions.setCategoryId(value);
        break;
      case 'detailId':
        actions.setDetailId(value);
        break;
    }
  };

  // 计算 PDF 下载链接
  const downloadUrl = useMemo(() => {
    if (!currentReport?.pdf_path) return null;

    // 简单处理: 假设静态文件在 API Host 的根目录下
    // 如果 config.api_base_url 是 "http://.../api/v1"，我们需要去掉尾部
    // 生产环境建议由后端直接返回完整 URL
    let baseUrl = config.api_base_url;
    
    // 如果 base_url 包含 /api/v1，尝试剥离它以指向根目录 (根据实际服务器配置调整)
    // 例如: http://127.0.0.1:8000/api/v1 -> http://127.0.0.1:8000
    if (baseUrl.endsWith("/api/v1")) {
      baseUrl = baseUrl.substring(0, baseUrl.length - 7);
    }
    // 移除末尾斜杠
    baseUrl = baseUrl.replace(/\/$/, "");
    
    // 确保 path 开头没有斜杠
    const path = currentReport.pdf_path.startsWith("/") 
      ? currentReport.pdf_path.slice(1) 
      : currentReport.pdf_path;

    return `${baseUrl}/${path}`;
  }, [currentReport, config.api_base_url]);

  // 推导 Chat 组件需要的上下文类型 (Simple Mapping)
  // 假设 report_source 格式为 "SB_VIDEO", "SP_ASIN" 等
  // 我们提取前缀作为 Broad Type ("sb", "sp", "sd")
  const activeBroadType = useMemo(() => {
    if (!state.detailId) return 'sp'; // 默认值
    
    const prefix = state.detailId.split('_')[0].toLowerCase();
    if (['sp', 'sb', 'sd'].includes(prefix)) {
      return prefix as ReportType; // 强转为 DeepDiveChat 需要的类型
    }
    return 'sp'; // 兜底
  }, [state.detailId]);

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
           
           {/* LEFT COLUMN: Configuration Panel (UI + Logic) */}
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
              {/* 目前 Chat 组件仍使用 Mock 数据，但已接收真实的上下文类型 */}
              <DeepDiveChat activeType={activeBroadType} />
           </div>

        </div>

      </main>
    </div>
  );
}
