'use client';

import { ReactNode } from 'react';

interface ToolCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  children: ReactNode;
}

export default function ToolCard({ id, title, description, icon, children }: ToolCardProps) {
  return (
    <div id={`tool-${id}`} className="scroll-mt-24">
      <div className="card overflow-hidden">
        {/* 卡片头部 */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
        </div>

        {/* 卡片内容 */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
