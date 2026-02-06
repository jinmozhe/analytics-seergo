// src/router.tsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import Report from "@/pages/Report";
import DeepDive from "@/pages/DeepDive";
import { fetchDeepDiveConfig, fetchReportList } from "@/services/deep-dive";
import { analysisService } from "@/services/analysisService";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // 主布局（包含全局 Navbar/Footer）
    children: [
      {
        index: true, // 使用 index 路由替代 path: "/"
        element: <Home />,
      },
      {
        path: "report",
        element: <Report />,
        // [新增] Report 页面的并行数据加载器
        loader: async () => {
            try {
                // 一次性获取所有维度的数据 (Hero, KPI, Insight, Coverage, Simulation, Decision)
                const dashboardData = await analysisService.fetchReportPageData();
                return dashboardData;
            } catch (error) {
                console.error("[Router] Report Loader Failed:", error);
                throw error; // Let ErrorBoundary handle it
            }
        }
      },
    ],
  },
  
  // ============================================================
  // Deep Dive 独立路由 (Independent Route)
  // ============================================================
  {
    path: "deep-dive",
    element: <DeepDive />,
    
    /**
     * 核心 Loader 逻辑:
     * 1. 串行加载运行时配置 (config.json)
     * 2. 使用配置获取业务数据 (Report List)
     * 3. 阻塞渲染直到数据就绪 (或抛出错误)
     */
    loader: async () => {
      try {
        // Step 1: 加载 public/config.json
        const config = await fetchDeepDiveConfig();
        
        // Step 2: 使用动态配置请求后端 API
        const response = await fetchReportList(config);
        
        // Step 3: 返回数据给组件
        // 注意：这里只返回 data 数组给 Hook 使用，同时透传 config 以备不时之需
        return { 
          rawReports: response.data,
          config 
        };
      } catch (error) {
        // 这里的错误会被 React Router 的 ErrorBoundary 捕获
        // 建议后续添加 errorElement 处理 UI 降级
        console.error("[Router] Deep Dive Loader Failed:", error);
        throw error; 
      }
    },
  },
]);
