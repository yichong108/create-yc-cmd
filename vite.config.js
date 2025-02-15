import {defineConfig} from 'vite'
import {VitePluginNode} from 'vite-plugin-node';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig({
    plugins: [
        VitePluginNode({
            appPath: './lib/main.js', // 入口文件
        }),
        topLevelAwait({
            promiseExportName: '__tla',
            promiseImportName: i => `__tla_${i}`
        }),
    ],
    build: {
        lib: {
            formats: ['es'], // 输出格式为 CommonJS
            entry: './lib/main.js',
        },
    },
})
