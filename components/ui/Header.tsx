'use client';

import Link from 'next/link';

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const tools = [
    { id: 'format', name: '格式化', icon: 'M4 6h16M4 12h16m-7 6h7' },
    { id: 'validate', name: '验证', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'escape', name: '转义', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
    { id: 'tree', name: '树形视图', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
    { id: 'compare', name: '对比', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
  ];

  const scrollToTool = (toolId: string) => {
    const element = document.getElementById(`tool-${toolId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className={`bg-white border-b border-gray-200 sticky top-0 z-50 ${className}`}>
      {/* 顶部导航 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">JSON 工具箱</span>
          </Link>

          {/* 快捷工具导航 */}
          <nav className="hidden md:flex items-center gap-1">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => scrollToTool(tool.id)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:text-primary-500 hover:bg-gray-50 rounded-md transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tool.icon} />
                </svg>
                {tool.name}
              </button>
            ))}
          </nav>

          {/* GitHub 链接 */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>

      {/* 移动端快捷导航 */}
      <div className="md:hidden border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => scrollToTool(tool.id)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full whitespace-nowrap"
              >
                {tool.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
