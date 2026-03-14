'use client';

import { useState } from 'react';

interface HeroProps {
  className?: string;
}

export default function Hero({ className }: HeroProps) {
  const [input, setInput] = useState('');

  const stats = [
    { label: '格式化', value: 'JSON 美化', desc: '一键格式化' },
    { label: '验证', value: '语法检查', desc: '实时验证' },
    { label: '压缩', value: '去除空格', desc: '体积优化' },
    { label: '转换', value: '多格式支持', desc: '灵活转换' },
  ];

  const handleQuickFormat = () => {
    if (!input.trim()) return;

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      navigator.clipboard.writeText(formatted);
      // 显示提示
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      toast.textContent = '已格式化并复制到剪贴板！';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    } catch {
      // 显示错误提示
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      toast.textContent = 'JSON 格式无效';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  };

  return (
    <div className={`bg-gradient-to-br from-gray-50 to-gray-100 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* 左侧：介绍 */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              专业的 JSON
              <span className="text-primary-500"> 在线工具箱</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              免费、快速、安全的 JSON 处理工具。支持格式化、验证、压缩、转义等多种功能，
              无需安装，即开即用。
            </p>

            {/* 快速统计 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                  <div className="text-sm font-semibold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧：快速格式化 */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">快速格式化</h2>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="粘贴 JSON 数据，一键格式化..."
              className="code-editor w-full h-40 mb-4"
              spellCheck={false}
            />
            <button
              onClick={handleQuickFormat}
              className="btn-primary w-full"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              格式化并复制
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
