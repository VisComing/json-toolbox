'use client';

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const features = [
    { name: 'JSON 格式化', desc: '美化、压缩、排序键名' },
    { name: 'JSON 验证', desc: '语法检查与结构分析' },
    { name: '转义工具', desc: '特殊字符转义与反转义' },
    { name: '树形视图', desc: '可视化 JSON 结构' },
    { name: '对比工具', desc: '比较两个 JSON 差异' },
  ];

  return (
    <footer className={`bg-white border-t border-gray-200 ${className}`}>
      {/* 功能介绍 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {features.map((feature) => (
            <div key={feature.name} className="text-center">
              <h4 className="text-sm font-semibold text-gray-900 mb-1">{feature.name}</h4>
              <p className="text-xs text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 底部信息 */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* 版权信息 */}
            <div className="text-sm text-gray-500">
              © {currentYear} JSON 工具箱. 免费在线 JSON 处理工具
            </div>

            {/* 链接 */}
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-primary-500 transition-colors"
              >
                使用说明
              </a>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-primary-500 transition-colors"
              >
                隐私政策
              </a>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-primary-500 transition-colors"
              >
                联系我们
              </a>
            </div>

            {/* 技术栈 */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>由</span>
              <span className="font-medium text-gray-600">Next.js</span>
              <span>+</span>
              <span className="font-medium text-gray-600">Tailwind CSS</span>
              <span>构建</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
