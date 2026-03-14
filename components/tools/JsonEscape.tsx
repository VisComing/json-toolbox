'use client';

import { useState, useCallback } from 'react';

interface JsonEscapeProps {
  className?: string;
}

export default function JsonEscape({ className }: JsonEscapeProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'escape' | 'unescape'>('escape');

  const escapeJson = useCallback((str: string): string => {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t')
      .replace(/\b/g, '\\b')
      .replace(/\f/g, '\\f');
  }, []);

  const unescapeJson = useCallback((str: string): string => {
    return str
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t')
      .replace(/\\b/g, '\b')
      .replace(/\\f/g, '\f')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
  }, []);

  const process = useCallback(() => {
    if (!input) {
      setOutput('');
      return;
    }

    try {
      if (mode === 'escape') {
        setOutput(escapeJson(input));
      } else {
        setOutput(unescapeJson(input));
      }
    } catch (e) {
      setOutput(`处理出错: ${e instanceof Error ? e.message : '未知错误'}`);
    }
  }, [input, mode, escapeJson, unescapeJson]);

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className={className}>
      {/* 模式选择 */}
      <div className="flex items-center gap-4 mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="escape"
            checked={mode === 'escape'}
            onChange={() => setMode('escape')}
            className="w-4 h-4 text-primary-500 border-gray-300 focus:ring-primary-500"
          />
          <span className="text-sm text-gray-700">转义 (Escape)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="unescape"
            checked={mode === 'unescape'}
            onChange={() => setMode('unescape')}
            className="w-4 h-4 text-primary-500 border-gray-300 focus:ring-primary-500"
          />
          <span className="text-sm text-gray-700">反转义 (Unescape)</span>
        </label>
      </div>

      {/* 输入输出区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 输入区 */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              {mode === 'escape' ? '原始文本' : '转义后的文本'}
            </span>
            <button onClick={handleClear} className="text-xs text-gray-400 hover:text-gray-600">
              清空
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'escape'
              ? "输入包含特殊字符的文本，例如：Hello \"World\"\nNew line"
              : "输入转义后的 JSON 字符串，例如：Hello \"World\"\\nNew line"
            }
            className="code-editor flex-1 min-h-[300px]"
            spellCheck={false}
          />
        </div>

        {/* 输出区 */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              {mode === 'escape' ? '转义结果' : '原始文本'}
            </span>
            {output && (
              <button onClick={handleCopy} className="text-xs text-primary-500 hover:text-primary-600">
                复制
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={`${mode === 'escape' ? '转义' : '反转义'}后的结果将显示在这里...`}
            className="code-editor flex-1 min-h-[300px] bg-gray-50"
            spellCheck={false}
          />
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <button onClick={process} className="btn-primary">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          {mode === 'escape' ? '转义' : '反转义'}
        </button>
      </div>

      {/* 转义说明 */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-gray-50 rounded border text-center">
          <code className="text-primary-600 font-mono">\\n</code>
          <div className="text-xs text-gray-500 mt-1">换行符</div>
        </div>
        <div className="p-3 bg-gray-50 rounded border text-center">
          <code className="text-primary-600 font-mono">\\t</code>
          <div className="text-xs text-gray-500 mt-1">制表符</div>
        </div>
        <div className="p-3 bg-gray-50 rounded border text-center">
          <code className="text-primary-600 font-mono">\\"</code>
          <div className="text-xs text-gray-500 mt-1">双引号</div>
        </div>
        <div className="p-3 bg-gray-50 rounded border text-center">
          <code className="text-primary-600 font-mono">\\\\</code>
          <div className="text-xs text-gray-500 mt-1">反斜杠</div>
        </div>
      </div>
    </div>
  );
}
