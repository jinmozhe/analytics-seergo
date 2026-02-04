import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";

export default function MainLayout() {
  return (
    // 1. 全局深色背景 & 字体设置
    <div className="min-h-screen bg-[#010409] text-white selection:bg-blue-500/30 font-sans flex flex-col">
      
      {/* 2. 顶部导航 (Fixed) */}
      <Navbar />

      {/* 3. 页面内容 (自适应高度) */}
      {/* pt-24 是为了给 Fixed Navbar 留出空间，避免内容被遮挡 */}
      <main className="flex-grow pt-24">
        <Outlet />
      </main>

      {/* 4. 底部页脚 */}
      <Footer />
    </div>
  );
}
