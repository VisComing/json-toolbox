'use client';

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/ui/Hero";
import ToolCard from "@/components/ui/ToolCard";
import JsonFormatter from "@/components/tools/JsonFormatter";
import JsonValidator from "@/components/tools/JsonValidator";
import JsonEscape from "@/components/tools/JsonEscape";
import JsonTreeViewer from "@/components/tools/JsonTreeViewer";
import JsonCompare from "@/components/tools/JsonCompare";

const tools = [
  {
    id: "format",
    title: "JSON 格式化",
    description: "格式化、压缩、排序键名，支持自定义缩进",
    icon: "M4 6h16M4 12h16m-7 6h7",
    component: JsonFormatter,
  },
  {
    id: "validate",
    title: "JSON 验证器",
    description: "验证 JSON 语法，分析数据结构",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    component: JsonValidator,
  },
  {
    id: "escape",
    title: "JSON 转义",
    description: "字符串转义与反转义，支持特殊字符",
    icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
    component: JsonEscape,
  },
  {
    id: "tree",
    title: "JSON 树形视图",
    description: "可视化展示 JSON 结构，支持折叠展开",
    icon: "M4 6h16M4 10h16M4 14h16M4 18h16",
    component: JsonTreeViewer,
  },
  {
    id: "compare",
    title: "JSON 对比",
    description: "比较两个 JSON 数据的差异",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
    component: JsonCompare,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 头部导航 */}
      <Header />

      {/* 主要内容 */}
      <main className="flex-1">
        {/* Hero 区域 */}
        <Hero />

        {/* 工具区域 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* 标题 */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              丰富的 JSON 工具
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              提供多种实用的 JSON 处理工具，满足您的各种需求
            </p>
          </div>

          {/* 工具卡片列表 */}
          <div className="space-y-8">
            {tools.map((tool) => {
              const Component = tool.component;
              return (
                <ToolCard
                  key={tool.id}
                  id={tool.id}
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                >
                  <Component />
                </ToolCard>
              );
            })}
          </div>
        </div>

        {/* 功能介绍区域 */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                为什么选择我们
              </h2>
              <p className="text-gray-600">
                简洁、高效、安全的在线 JSON 工具箱
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 功能 1 */}
              <div className="card p-6 text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">极速处理</h3>
                <p className="text-gray-600 text-sm">
                  纯前端处理，无需服务器，数据不会离开您的浏览器，响应速度极快
                </p>
              </div>

              {/* 功能 2 */}
              <div className="card p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">安全可靠</h3>
                <p className="text-gray-600 text-sm">
                  所有数据处理在本地完成，不会上传至服务器，保障您的数据隐私
                </p>
              </div>

              {/* 功能 3 */}
              <div className="card p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">响应式设计</h3>
                <p className="text-gray-600 text-sm">
                  完美适配各种设备，无论是电脑还是手机都能流畅使用
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <Footer />
    </div>
  );
}
