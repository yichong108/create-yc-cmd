import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        // 指定测试文件的匹配模式
        include: ['./lib/tests/**/*.test.ts'], // 只包含 tests 目录下的 .test.js 文件
        globals: true, // 使用全局的 expect 和 describe 等 API
        environment: 'node', // 测试环境设置为 Node.js
    },
})