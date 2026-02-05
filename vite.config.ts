import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    // 1. Tailwind CSS v4 插件 (必须优先加载)
    // 负责解析 CSS-first 配置并生成原子类
    tailwindcss(),

    // 2. React SWC 插件
    // 提供极速的 Fast Refresh 和 JSX 转换 [User Standard]
    react(),

    // 3. TSConfig Paths 插件
    // 自动读取 tsconfig.json 中的 "paths" (@/*) 映射
    // 替代手动配置 resolve.alias，确保与 TS 环境一致
    tsconfigPaths(),
  ],

  // [新增] 开发服务器配置
  server: {
    // 明确指定 host 和 port，避免有时自动飘移
    host: 'localhost',
    port: 5173,

    // 核心：代理配置 (解决本地开发跨域问题)
    proxy: {
      '/api': {
        // 目标地址：你的远程后端接口域名
        target: 'https://quant.seergo.cn',
        // 关键参数：设置为 true 时，Vite 会更改 HTTP 请求头中的 Host 字段
        // 欺骗后端服务器，让它以为请求是来自它自己的域名，从而绕过 CORS
        changeOrigin: true,
        // 如果后端是自签名证书 HTTPS，可能需要设为 false (通常公网 HTTPS 不需要)
        secure: false,
        // 可选：如果后端路径也是 /api 开头，则不需要 rewrite
        // 这里假设后端真实地址是 https://quant.seergo.cn/api/v1/...
      }
    }
  },

  // 4. 构建配置
  build: {
    // Vite 7 + React 19 推荐目标，支持 Top-level await 等现代特性
    // 优化产物提及并提升运行时性能
    target: 'esnext',
  },
})
