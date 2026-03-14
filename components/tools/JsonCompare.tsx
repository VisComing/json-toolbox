'use client';

import { useState, useCallback } from 'react';

interface DiffResult {
  line: number;
  type: 'added' | 'removed' | 'modified' | 'same';
  left: string;
  right: string;
}

interface JsonCompareProps {
  className?: string;
}

export default function JsonCompare({ className }: JsonCompareProps) {
  const [leftInput, setLeftInput] = useState('');
  const [rightInput, setRightInput] = useState('');
  const [diff, setDiff] = useState<DiffResult[] | null>(null);
  const [error, setError] = useState('');

  const compareJson = useCallback(() => {
    if (!leftInput.trim() && !rightInput.trim()) {
      setError('请至少输入一个 JSON');
      setDiff(null);
      return;
    }

    try {
      let leftObj: unknown = null;
      let rightObj: unknown = null;

      if (leftInput.trim()) {
        leftObj = JSON.parse(leftInput);
      }
      if (rightInput.trim()) {
        rightObj = JSON.parse(rightInput);
      }

      const leftLines = JSON.stringify(leftObj, null, 2).split('\n');
      const rightLines = JSON.stringify(rightObj, null, 2).split('\n');

      const maxLines = Math.max(leftLines.length, rightLines.length);
      const result: DiffResult[] = [];

      for (let i = 0; i < maxLines; i++) {
        const left = leftLines[i] || '';
        const right = rightLines[i] || '';

        if (left === right) {
          result.push({
            line: i + 1,
            type: 'same',
            left,
            right,
          });
        } else {
          // 简单 diff 逻辑
          const nextLeft = leftLines[i + 1] || '';
          const nextRight = rightLines[i + 1] || '';

          if (left === nextRight && right === nextLeft) {
            // 交换
            result.push({
              line: i + 1,
              type: 'removed',
              left,
              right: '',
            });
            result.push({
              line: i + 2,
              type: 'added',
              left: '',
              right,
            });
            i++; // 跳过下一行
          } else if (right === nextRight && left !== '') {
            // 左边多一行
            result.push({
              line: i + 1,
              type: 'removed',
              left,
              right: '',
            });
          } else if (left === nextLeft && right !== '') {
            // 右边多一行
            result.push({
              line: i + 1,
              type: 'added',
              left: '',
              right,
            });
          } else {
            // 修改
            result.push({
              line: i + 1,
              type: 'modified',
              left,
              right,
            });
          }
        }
      }

      setDiff(result);
      setError('');
    } catch (e) {
      setError(`JSON 解析错误: ${e instanceof Error ? e.message : '未知错误'}`);
      setDiff(null);
    }
  }, [leftInput, rightInput]);

  const getLineStyle = (type: string): string => {
    switch (type) {
      case 'added':
        return 'bg-green-50 border-green-200';
      case 'removed':
        return 'bg-red-50 border-red-200';
      case 'modified':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return '';
    }
  };

  const getTypeIcon = (type: string): string => {
    switch (type) {
      case 'added':
        return '+';
      case 'removed':
        return '-';
      case 'modified':
        return '~';
      default:
        return ' ';
    }
  };

  return (
    <div className={className}>
      {/* 输入区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">JSON A</span>
            <button onClick={() => setLeftInput('')} className="text-xs text-gray-400 hover:text-gray-600">
              清空
            </button>
          </div>
          <textarea
            value={leftInput}
            onChange={(e) => setLeftInput(e.target.value)}
            placeholder="输入第一个 JSON..."
            className="code-editor w-full h-48"
            spellCheck={false}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">JSON B</span>
            <button onClick={() => setRightInput('')} className="text-xs text-gray-400 hover:text-gray-600">
              清空
            </button>
          </div>
          <textarea
            value={rightInput}
            onChange={(e) => setRightInput(e.target.value)}
            placeholder="输入第二个 JSON..."
            className="code-editor w-full h-48"
            spellCheck={false}
          />
        </div>
      </div>

      {/* 对比按钮 */}
      <div className="flex gap-3 mb-6">
        <button onClick={compareJson} className="btn-primary">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          对比
        </button>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center text-red-700">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* 对比结果 */}
      {diff && diff.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          {/* 图例 */}
          <div className="flex items-center gap-4 p-3 bg-gray-50 border-b text-xs">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-green-50 border border-green-200 rounded"></span>
              新增
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-red-50 border border-red-200 rounded"></span>
              删除
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-yellow-50 border border-yellow-200 rounded"></span>
              修改
            </span>
          </div>

          {/* 对比表格 */}
          <div className="grid grid-cols-2 divide-x">
            <div>
              <div className="bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600 border-b">
                JSON A
              </div>
              <div className="overflow-auto max-h-[400px]">
                {diff.map((item, index) => (
                  <div
                    key={`left-${index}`}
                    className={`px-4 py-1 font-mono text-xs border-b ${getLineStyle(item.type)} ${
                      item.left === '' ? 'text-gray-300' : 'text-gray-800'
                    }`}
                  >
                    <span className="inline-block w-4 text-gray-400 mr-2">
                      {getTypeIcon(item.type)}
                    </span>
                    <span className="text-gray-400 mr-3 w-6 inline-block">{item.line}</span>
                    {item.left || ' '}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600 border-b">
                JSON B
              </div>
              <div className="overflow-auto max-h-[400px]">
                {diff.map((item, index) => (
                  <div
                    key={`right-${index}`}
                    className={`px-4 py-1 font-mono text-xs border-b ${getLineStyle(item.type)} ${
                      item.right === '' ? 'text-gray-300' : 'text-gray-800'
                    }`}
                  >
                    <span className="inline-block w-4 text-gray-400 mr-2">
                      {getTypeIcon(item.type)}
                    </span>
                    <span className="text-gray-400 mr-3 w-6 inline-block">{item.line}</span>
                    {item.right || ' '}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 提示信息 */}
      {!diff && !error && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 mb-2">对比说明</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 输入两个 JSON 数据进行对比</li>
            <li>• 绿色表示新增内容，红色表示删除内容，黄色表示修改内容</li>
            <li>• 支持对比嵌套对象和数组</li>
          </ul>
        </div>
      )}
    </div>
  );
}
