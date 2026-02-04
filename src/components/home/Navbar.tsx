import { useState } from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4 animate-fade-in-down pointer-events-none">
      <div className="pointer-events-auto w-full max-w-6xl bg-[#030712]/60 backdrop-blur-[24px] backdrop-saturate-[180%] border border-white/[0.08] rounded-full shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] px-4 py-3 md:px-8 md:py-4 flex justify-between items-center transition-all hover:bg-[#030712]/70 hover:border-white/[0.12] group duration-300">
        
        {/* --- Logo Area (点击 Logo 回首页) --- */}
        <Link to="/" className="flex items-center gap-3">
          {/* Logo SVG */}
          <svg className="w-8 h-8 md:w-9 md:h-9" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGradNav" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#007AFF" />
                <stop offset="50%" stopColor="#8A6D9B" />
                <stop offset="100%" stopColor="#FF6F3C" />
              </linearGradient>
            </defs>
            <path d="M12 8H28C33.5 8 38 12.5 38 18V21C38 22.5 37 24 35 24H23L12 13V8Z" fill="url(#logoGradNav)" />
            <path d="M28 32H12C6.5 32 2 27.5 2 22V19C2 17.5 3 16 5 16H17L28 27V32Z" fill="url(#logoGradNav)" />
          </svg>

          {/* Logo Text */}
          <span className="text-2xl text-white tracking-wide drop-shadow-md group-hover:text-white/90 transition-colors font-semibold font-sans">
            SeerGo
          </span>
        </Link>

        {/* --- Desktop Links --- */}
        <div className="hidden md:flex items-center space-x-2">
          {["功能", "模型", "价格"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-white hover:text-blue-200 px-5 py-2 rounded-full text-base font-medium transition-all hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            >
              {item}
            </a>
          ))}
        </div>

        {/* --- CTA Actions --- */}
        <div className="hidden md:flex items-center gap-5">
          {/* 登录 Link */}
          <Link 
            to="/report" 
            className="text-base font-medium text-white hover:text-blue-200 transition-colors"
          >
            登录
          </Link>
          
          {/* ✅ “立即咨询” 改为 Link，并跳转到 /report */}
          <Link 
            to="/report"
            className="inline-flex items-center justify-center px-7 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all border border-blue-400/30 hover:scale-105 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] cursor-pointer"
          >
            立即咨询
          </Link>
        </div>

        {/* --- Mobile Menu Button --- */}
        <div className="flex md:hidden">
          <button
            onClick={toggleMobileMenu}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-full text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* --- Mobile Menu Dropdown --- */}
      {isMobileMenuOpen && (
        <div className="absolute top-24 left-4 right-4 bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-white/10 p-4 shadow-2xl md:hidden animate-fade-in-up z-40 pointer-events-auto">
          <div className="space-y-1">
            {["功能", "模型", "价格"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-slate-300 hover:text-white hover:bg-white/5 block px-4 py-3 rounded-xl text-base font-medium"
              >
                {item}
              </a>
            ))}
            
            {/* ✅ 移动端菜单：确保“登录”选项显示 */}
            <Link
              to="/report"
              className="text-slate-300 hover:text-white hover:bg-white/5 block px-4 py-3 rounded-xl text-base font-medium border-t border-white/10 mt-2 pt-4"
              onClick={() => setIsMobileMenuOpen(false)} // 点击后自动关闭菜单
            >
              登录
            </Link>
            
             {/* ✅ 移动端菜单：也可以加一个显眼的“立即咨询” */}
             <Link
              to="/report"
              className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 block px-4 py-3 rounded-xl text-base font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              立即咨询
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
