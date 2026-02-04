import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import Report from "@/pages/Report";
import DeepDive from "@/pages/DeepDive"; // 1. 引入新页面组件

export const router = createBrowserRouter([
  {
    element: <MainLayout />, // 主布局（包含全局 Navbar/Footer）
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "report",
        element: <Report />,
      },
    ],
  },
  // 2. 将 Deep Dive 添加为独立的顶级路由
  // 这样它就可以完全控制自己的布局（全屏深色背景），不受 MainLayout 影响
  {
    path: "deep-dive",
    element: <DeepDive />,
  },
]);
