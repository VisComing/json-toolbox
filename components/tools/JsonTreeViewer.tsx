'use client';

import { useState, useCallback } from 'react';

interface JsonNodeProps {
  data: unknown;
  name?: string;
  depth?: number;
}

function JsonNode({ data, name, depth = 0 }: JsonNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const type = getType(data);
  const isExpandable = type === 'object' || type === 'array';

  function getType(value: unknown): string {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    return typeof value;
  }

  function getValueStyle(type: string): string {
    switch (type) {
      case 'string': return 'text-green-600';
      case 'number': return 'text-blue-600';
      case 'boolean': return 'text-purple-600';
      case 'null': return 'text-gray-500';
      default: return 'text-gray-800';
    }
  }

  function formatValue(value: unknown, type: string): string {
    if (value === null) return 'null';
    if (type === 'string') return `"${value}"`;
    return String(value);
  }

  const toggleExpand = () => {
    if (isExpandable) {
      setIsExpanded(!isExpanded);
    }
  };

  const renderContent = () => {
    if (type === 'object' && data !== null) {
      const obj = data as Record<string, unknown>;
      const entries = Object.entries(obj);

      if (entries.length === 0) {
        return <span className="text-gray-500">{'{}'}</span>;
      }

      return (
        <div>
          <div
            className="inline-flex items-center cursor-pointer hover:bg-gray-100 rounded px-1 -ml-1"
            onClick={toggleExpand}
          >
            <svg
              className={`w-3 h-3 mr-1 text-gray-400 transition-transform ${isExpanded ? '' : '-rotate-90'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-500">{'{'}</span>
            {!isExpanded && (
              <span className="text-gray-400 mx-1">... {entries.length} 个属性</span>
            )}
            {!isExpanded && <span className="text-gray-500">{'}'}</span>}
          </div>

          {isExpanded && (
            <div className="ml-4 border-l border-gray-200 pl-2">
              {entries.map(([key, value], index) => (
                <div key={key} className="py-0.5">
                  <JsonNode
                    name={key}
                    data={value}
                    depth={depth + 1}
                  />
                  {index < entries.length - 1 && <span className="text-gray-400">,</span>}
                </div>
              ))}
              <span className="text-gray-500">{'}'}</span>
            </div>
          )}
        </div>
      );
    }

    if (type === 'array') {
      const arr = data as unknown[];

      if (arr.length === 0) {
        return <span className="text-gray-500">[]</span>;
      }

      return (
        <div>
          <div
            className="inline-flex items-center cursor-pointer hover:bg-gray-100 rounded px-1 -ml-1"
            onClick={toggleExpand}
          >
            <svg
              className={`w-3 h-3 mr-1 text-gray-400 transition-transform ${isExpanded ? '' : '-rotate-90'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-500">[</span>
            {!isExpanded && (
              <span className="text-gray-400 mx-1">... {arr.length} 个元素</span>
            )}
            {!isExpanded && <span className="text-gray-500">]</span>}
          </div>

          {isExpanded && (
            <div className="ml-4 border-l border-gray-200 pl-2">
              {arr.map((item, index) => (
                <div key={index} className="py-0.5">
                  <JsonNode
                    data={item}
                    depth={depth + 1}
                  />
                  {index < arr.length - 1 && <span className="text-gray-400">,</span>}
                </div>
              ))}
              <span className="text-gray-500">]</span>
            </div>
          )}
        </div>
      );
    }

    return (
      <span className={getValueStyle(type)}>
        {formatValue(data, type)}
      </span>
    );
  };

  return (
    <div className="font-mono text-sm">
      {name !== undefined && (
        <>
          <span className="text-gray-800">&quot;{name}&quot;</span>
          <span className="text-gray-500 mx-1">:</span>
        </>
      )}
      {renderContent()}
    </div>
  );
}

interface JsonTreeViewerProps {
  className?: string;
}

export default function JsonTreeViewer({ className }: JsonTreeViewerProps) {
  const [input, setInput] = useState('');
  const [parsed, setParsed] = useState<unknown | null>(null);
  const [error, setError] = useState('');

  const parseJson = useCallback(() => {
    if (!input.trim()) {
      setParsed(null);
      setError('');
      return;
    }

    try {
      const result = JSON.parse(input);
      setParsed(result);
      setError('');
    } catch (e) {
      setError(`JSON 解析错误: ${e instanceof Error ? e.message : '未知错误'}`);
      setParsed(null);
    }
  }, [input]);

  const handleSample = () => {
    const sample = {
      "users": [
        {
          "id": 1,
          "name": "张三",
          "email": "zhangsan@example.com",
          "isActive": true,
          "roles": ["admin", "user"],
          "profile": {
            "age": 28,
            "city": "北京",
            "hobbies": ["阅读", "编程", "旅游"]
          }
        },
        {
          "id": 2,
          "name": "李四",
          "email": "lisi@example.com",
          "isActive": false,
          "roles": ["user"],
          "profile": {
            "age": 32,
            "city": "上海",
            "hobbies": ["音乐", "运动"]
          }
        }
      ],
      "total": 2,
      "page": 1
    };
    setInput(JSON.stringify(sample, null, 2));
  };

  return (
    <div className={className}>
      {/* 输入区域 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">输入 JSON</span>
          <div className="flex gap-2">
            <button onClick={handleSample} className="btn-secondary btn-sm">
              示例
            </button>
            <button onClick={() => setInput('')} className="btn-secondary btn-sm">
              清空
            </button>
          </div>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="在此粘贴 JSON 数据..."
          className="code-editor w-full h-32"
          spellCheck={false}
        />
        <button onClick={parseJson} className="btn-primary mt-3">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          生成树形视图
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

      {/* 树形视图 */}
      {parsed !== null && (
        <div className="bg-white border rounded-lg p-4 overflow-auto max-h-[500px]">
          <JsonNode data={parsed} />
        </div>
      )}

      {/* 使用说明 */}
      {!parsed && !error && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 mb-2">树形查看器说明</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 以可折叠的树形结构查看 JSON 数据</li>
            <li>• 支持展开/收起对象和数组节点</li>
            <li>• 不同类型数据使用不同颜色标识</li>
            <li>• 方便浏览大型嵌套 JSON 结构</li>
          </ul>
        </div>
      )}
    </div>
  );
}
