import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'create-yc-cmd',
  description: '一个在开发中常用的命令行工具',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com/yichong108/create-yc-cmd' }
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '介绍', link: '/guide/' },
          { text: '安装', link: '/guide/installation' },
          { text: '快速开始', link: '/guide/getting-started' }
        ]
      },
      {
        text: '功能',
        items: [
          { text: '端口释放', link: '/features/release-port' },
          { text: '代理设置', link: '/features/proxy-settings' }
        ]
      }
    ]
  }
})