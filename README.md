# JSON 工具箱

一个功能全面的在线 JSON 处理工具网站，参考 json.cn 的极简设计风格。

🔗 **在线预览**: https://json-toolbox.vercel.app (部署后)

## 功能特性

- **JSON 格式化** - 美化 JSON 数据，支持自定义缩进和键名排序
- **JSON 验证** - 验证 JSON 语法有效性，分析数据结构
- **JSON 转义** - 字符串转义与反转义，支持特殊字符
- **JSON 树形视图** - 可视化展示 JSON 结构，支持折叠展开
- **JSON 对比** - 比较两个 JSON 数据的差异

## 技术栈

- **框架**: Next.js 14 + React 18 + TypeScript
- **样式**: Tailwind CSS
- **部署**: Vercel (静态导出)

## 本地开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build
```

## 部署说明

### 方式一：使用 Vercel CLI

1. 安装 Vercel CLI:
```bash
npm i -g vercel
```

2. 登录并部署:
```bash
vercel login
vercel --prod
```

### 方式二：GitHub + Vercel 自动部署

1. 将代码推送到 GitHub
2. 在 Vercel 导入 GitHub 仓库
3. 设置构建命令: `npm run build`
4. 设置输出目录: `dist`
5. 点击 Deploy

### 方式三：手动上传

1. 运行 `npm run build` 生成 `dist` 目录
2. 在 Vercel 创建新项目
3. 选择 "Import Git Repository" 或拖拽上传 `dist` 文件夹

## 项目结构

```
json-toolbox/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 主页面
│   ├── layout.tsx         # 根布局
│   └── globals.css        # 全局样式
├── components/             # React 组件
│   ├── ui/                # UI 组件
│   └── tools/             # 工具组件
├── dist/                   # 构建输出目录
└── package.json
```

## 性能优化

- 纯前端处理，数据不上传服务器
- 静态导出，CDN 加速
- 代码分割，按需加载
- 响应式设计，适配各种设备

## 许可证

MIT
