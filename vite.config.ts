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

  // 4. 构建配置
  build: {
    // Vite 7 + React 19 推荐目标，支持 Top-level await 等现代特性
    // 优化产物提及并提升运行时性能
    target: 'esnext',
  },
})
