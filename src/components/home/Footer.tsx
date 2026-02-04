export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            {/* --- Footer Logo --- */}
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-8 h-8 md:w-9 md:h-9" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="logoGradFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#007AFF" />
                    <stop offset="50%" stopColor="#8A6D9B" />
                    <stop offset="100%" stopColor="#FF6F3C" />
                  </linearGradient>
                </defs>
                <path d="M12 8H28C33.5 8 38 12.5 38 18V21C38 22.5 37 24 35 24H23L12 13V8Z" fill="url(#logoGradFooter)" />
                <path d="M28 32H12C6.5 32 2 27.5 2 22V19C2 17.5 3 16 5 16H17L28 27V32Z" fill="url(#logoGradFooter)" />
              </svg>
              <span className="text-2xl text-white tracking-wide drop-shadow-md transition-colors font-semibold font-sans">
                SeerGo
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              面向亚马逊卖家的智能量化运营系统。
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-white font-bold mb-6">产品</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-blue-400 transition-colors">功能</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">模型</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">定价</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">资源</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-blue-400 transition-colors">博客</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">案例</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">帮助中心</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">公司</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-blue-400 transition-colors">关于我们</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">职业发展</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">联系</a></li>
            </ul>
          </div>
        </div>

        {/* --- Copyright & Social --- */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-600 text-xs">
            © 2024 Intelligent Quant Inc. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-slate-600 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href="#" className="text-slate-600 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
