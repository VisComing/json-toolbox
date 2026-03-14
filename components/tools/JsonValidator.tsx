'use client';

import { useState, useCallback } from 'react';

interface ValidationResult {
  valid: boolean;
  message: string;
  details?: {
    type: string;
    keys?: number;
    items?: number;
    depth: number;
  };
}

interface JsonValidatorProps {
  className?: string;
}

export default function JsonValidator({ className }: JsonValidatorProps) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ValidationResult | null>(null);

  const getJsonType = (value: unknown): string => {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    return typeof value;
  };

  const analyzeJson = (value: unknown): { keys?: number; items?: number } => {
    if (Array.isArray(value)) {
      return { items: value.length };
    }
    if (typeof value === 'object' && value !== null) {
      return { keys: Object.keys(value).length };
    }
    return {};
  };

  const calculateDepth = (value: unknown): number => {
    if (typeof value !== 'object' || value === null) return 0;
    if (Array.isArray(value)) {
      return 1 + Math.max(0, ...value.map(calculateDepth));
    }
    const values = Object.values(value);
    return 1 + Math.max(0, ...values.map(calculateDepth));
  };

  const validateJson = useCallback(() => {
    if (!input.trim()) {
      setResult(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const type = getJsonType(parsed);
      const details = analyzeJson(parsed);

      setResult({
        valid: true,
        message: '✓ JSON 格式有效',
        details: {
          type,
          ...details,
          depth: calculateDepth(parsed),
        },
      });
    } catch (e) {
      setResult({
        valid: false,
        message: `✗ JSON 格式无效: ${e instanceof Error ? e.message : '未知错误'}`,
      });
    }
  }, [input]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch {
      setResult({
        valid: false,
        message: '无法读取剪贴板，请手动粘贴',
      });
    }
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
  };

  return (
    <div className={className}>
      {/* 输入区域 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">输入 JSON 进行验证</span>
          <div className="flex gap-2">
            <button onClick={handlePaste} className="btn-secondary btn-sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              粘贴
            </button>
            <button onClick={handleClear} className="btn-secondary btn-sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              清空
            </button>
          </div>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="在此粘贴 JSON 数据进行验证..."
          className="code-editor w-full h-64"
          spellCheck={false}
        />
      </div>

      {/* 验证按钮 */}
      <div className="flex gap-3 mb-6">
        <button onClick={validateJson} className="btn-primary">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          验证 JSON
        </button>
      </div>

      {/* 验证结果 */}
      {result && (
        <div className={`p-4 rounded-lg border ${
          result.valid
            ? 'bg-green-50 border-green-200'
            : 'bg-red-50 border-red-200'
        }`}>
          <div className={`flex items-center mb-3 ${
            result.valid ? 'text-green-800' : 'text-red-800'
          }`}>
            {result.valid ? (
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <span className="font-semibold">{result.message}</span>
          </div>

          {result.valid && result.details && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-3 rounded border">
                <div className="text-xs text-gray-500 mb-1">数据类型</div>
                <div className="text-sm font-medium text-gray-800 capitalize">
                  {result.details.type === 'object' ? '对象' :
                   result.details.type === 'array' ? '数组' :
                   result.details.type === 'string' ? '字符串' :
                   result.details.type === 'number' ? '数字' :
                   result.details.type === 'boolean' ? '布尔值' : result.details.type}
                </div>
              </div>

              {result.details.keys !== undefined && (
                <div className="bg-white p-3 rounded border">
                  <div className="text-xs text-gray-500 mb-1">键名数量</div>
                  <div className="text-sm font-medium text-gray-800">{result.details.keys}</div>
                </div>
              )}

              {result.details.items !== undefined && (
                <div className="bg-white p-3 rounded border">
                  <div className="text-xs text-gray-500 mb-1">元素数量</div>
                  <div className="text-sm font-medium text-gray-800">{result.details.items}</div>
                </div>
              )}

              <div className="bg-white p-3 rounded border">
                <div className="text-xs text-gray-500 mb-1">嵌套深度</div>
                <div className="text-sm font-medium text-gray-800">{result.details.depth}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 提示信息 */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-medium text-blue-800 mb-2">验证说明</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• 验证器会检查 JSON 语法是否正确</li>
          <li>• 支持验证对象、数组、字符串、数字、布尔值和 null</li>
          <li>• 对于复杂结构，会分析嵌套深度和元素数量</li>
          <li>• 错误信息会指出具体的语法问题位置</li>
        </ul>
      </div>
    </div>
  );
}
