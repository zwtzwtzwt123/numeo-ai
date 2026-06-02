import { useState, useEffect } from 'react';
import { useChatStore } from '../store/chatStore';

interface Props {
  onClose: () => void;
}

interface DocFunction {
  name: string;
  formula: string;
  description: string;
  example: string;
}

interface DocModule {
  id: string;
  name: string;
  description: string;
  functions: DocFunction[];
}

interface DocCategory {
  name: string;
  icon: string;
  modules: DocModule[];
}

interface DocsData {
  categories: DocCategory[];
}

export default function DocsPanel({ onClose }: Props) {
  const [docsData, setDocsData] = useState<DocsData | null>(null);
  const [search, setSearch] = useState('');
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const sendMessage = useChatStore(s => s.sendMessage);

  useEffect(() => {
    fetch('https://long-union-7f5e.zwtzwtzwt123456789.workers.dev/docs')
      .then(r => r.json())
      .then(data => { setDocsData(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filteredCategories = docsData?.categories.map(cat => ({
    ...cat,
    modules: cat.modules.map(mod => ({
      ...mod,
      functions: search
        ? mod.functions.filter(f =>
            f.name.includes(search) ||
            f.formula.includes(search) ||
            f.description.includes(search) ||
            f.example.includes(search) ||
            mod.name.includes(search)
          )
        : mod.functions,
    })).filter(mod => !search || mod.functions.length > 0),
  })).filter(cat => !search || cat.modules.length > 0);

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-2xl h-full bg-dark-800 border-l border-dark-600 overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-dark-800 border-b border-dark-600 p-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold">📋 公式文档</h2>
          <button onClick={onClose} className="text-dark-400 hover:text-white text-xl">✕</button>
        </div>

        {/* 搜索框 */}
        <div className="p-4 border-b border-dark-600">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="搜索公式、功能、示例..."
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-sm text-white placeholder-dark-500 outline-none focus:border-accent-cyan/50"
          />
          {search && (
            <p className="text-dark-500 text-xs mt-1">
              搜索"{search}"：{filteredCategories?.reduce((s, c) => s + c.modules.reduce((s2, m) => s2 + m.functions.length, 0), 0)} 个结果
            </p>
          )}
        </div>

        <div className="p-4 space-y-3">
          {loading && (
            <div className="text-center text-dark-400 py-8">加载中...</div>
          )}

          {!loading && !docsData && (
            <div className="text-center text-dark-400 py-8">加载失败，请稍后重试</div>
          )}

          {filteredCategories?.map(cat => (
            <div key={cat.name} className="bg-dark-900 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedModule(expandedModule === cat.name ? null : cat.name)}
                className="w-full p-3 flex items-center justify-between hover:bg-dark-700 transition-colors"
              >
                <span className="text-sm font-bold">{cat.icon} {cat.name}</span>
                <span className="text-dark-500 text-xs">
                  {cat.modules.reduce((s, m) => s + m.functions.length, 0)} 公式
                  {expandedModule === cat.name ? ' ▴' : ' ▾'}
                </span>
              </button>

              {(expandedModule === cat.name || search) && (
                <div className="px-3 pb-3 space-y-3">
                  {cat.modules.map(mod => (
                    <div key={mod.id} className="border-t border-dark-700 pt-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-accent-cyan font-medium text-sm">{mod.name}</span>
                        <span className="text-dark-500 text-xs">({mod.functions.length}个)</span>
                      </div>
                      <p className="text-dark-400 text-xs mb-2">{mod.description}</p>

                      {mod.functions.map((fn, i) => (
                        <div key={i} className="bg-dark-800 rounded-lg p-2 mb-1.5">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-white text-xs font-medium">{fn.name}</span>
                            <button
                              onClick={() => { sendMessage(fn.example); onClose(); }}
                              className="text-accent-cyan text-xs hover:underline"
                            >
                              试试 →
                            </button>
                          </div>
                          <div className="bg-dark-900 rounded px-2 py-1 mb-1">
                            <span className="text-accent-purple font-mono text-xs">{fn.formula}</span>
                          </div>
                          <p className="text-dark-500 text-xs">{fn.description}</p>
                          <p className="text-dark-600 text-xs mt-0.5 font-mono">示例：{fn.example}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}