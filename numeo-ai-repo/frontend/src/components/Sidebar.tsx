import { useState, useEffect } from 'react';
import { useChatStore } from '../store/chatStore';
import { MODULE_CATEGORIES } from '../data/modules';

interface Props {
  onClose: () => void;
}

interface DocFunction {
  name: string;
  formula: string;
  description: string;
  example: string;
}

interface SearchResult {
  type: 'module' | 'function';
  categoryName: string;
  categoryIcon: string;
  moduleName: string;
  moduleIcon?: string;
  functionName?: string;
  formula?: string;
  example?: string;
}

export default function Sidebar({ onClose }: Props) {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [docsFunctions, setDocsFunctions] = useState<DocFunction[]>([]);
  const clearMessages = useChatStore(s => s.clearMessages);
  const sendMessage = useChatStore(s => s.sendMessage);
  const messages = useChatStore(s => s.messages);

  // 加载文档数据用于搜索
  useEffect(() => {
    fetch('https://long-union-7f5e.zwtzwtzwt123456789.workers.dev/docs')
      .then(r => r.json())
      .then(data => {
        const allFns: DocFunction[] = [];
        data.categories?.forEach((cat: any) => {
          cat.modules?.forEach((mod: any) => {
            mod.functions?.forEach((fn: DocFunction) => {
              allFns.push({ ...fn, _module: mod.name, _category: cat.name, _icon: cat.icon });
            });
          });
        });
        setDocsFunctions(allFns);
      })
      .catch(() => {});
  }, []);

  // 搜索逻辑
  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }
    const q = search.toLowerCase();
    const results: SearchResult[] = [];

    // 搜索模块名
    MODULE_CATEGORIES.forEach(cat => {
      cat.modules.forEach(mod => {
        if (mod.name.includes(q) || (mod.nameEn || '').toLowerCase().includes(q)) {
          results.push({
            type: 'module',
            categoryName: cat.name,
            categoryIcon: cat.icon,
            moduleName: mod.name,
            moduleIcon: mod.icon,
            example: mod.examples?.[0],
          });
        }
        // 搜索子功能
        mod.subModules?.forEach(sub => {
          if (sub.name.includes(q) || sub.example.includes(q)) {
            results.push({
              type: 'function',
              categoryName: cat.name,
              categoryIcon: cat.icon,
              moduleName: mod.name,
              moduleIcon: mod.icon,
              functionName: sub.name,
              example: sub.example,
            });
          }
        });
        // 搜索示例
        mod.examples?.forEach(ex => {
          if (ex.toLowerCase().includes(q)) {
            results.push({
              type: 'function',
              categoryName: cat.name,
              categoryIcon: cat.icon,
              moduleName: mod.name,
              moduleIcon: mod.icon,
              functionName: ex,
              example: ex,
            });
          }
        });
      });
    });

    // 搜索文档公式数据
    (docsFunctions as any[]).forEach((fn: any) => {
      if (
        fn.name?.toLowerCase().includes(q) ||
        fn.formula?.toLowerCase().includes(q) ||
        fn.description?.toLowerCase().includes(q) ||
        fn.example?.toLowerCase().includes(q)
      ) {
        // 避免重复
        const exists = results.find(r => r.functionName === fn.name && r.moduleName === fn._module);
        if (!exists) {
          results.push({
            type: 'function',
            categoryName: fn._category || '',
            categoryIcon: fn._icon || '📐',
            moduleName: fn._module || '',
            functionName: fn.name,
            formula: fn.formula,
            example: fn.example,
          });
        }
      }
    });

    setSearchResults(results.slice(0, 20)); // 最多显示20条
  }, [search, docsFunctions]);

  const filteredCategories = search
    ? [] // 有搜索时隐藏模块列表
    : MODULE_CATEGORIES.map(cat => ({
        ...cat,
        modules: cat.modules.filter(m =>
          !search || m.name.includes(search) || (m.nameEn || '').toLowerCase().includes(search.toLowerCase())
        ),
      })).filter(cat => cat.modules.length > 0);

  return (
    <aside className="h-full bg-dark-800 border-r border-dark-600 flex flex-col">
      {/* Logo */}
      <div className="h-12 border-b border-dark-600 flex items-center px-4 shrink-0">
        <span className="text-lg font-bold"><span className="text-accent-cyan">Numeo</span> AI</span>
        <button onClick={onClose} className="lg:hidden ml-auto text-dark-400">✕</button>
      </div>

      {/* 全局搜索 */}
      <div className="p-3">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="搜索功能、公式、示例..."
          className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-1.5 text-sm text-white placeholder-dark-500 outline-none focus:border-accent-cyan/50"
        />
        {search && searchResults.length > 0 && (
          <p className="text-dark-500 text-xs mt-1">{searchResults.length} 个结果</p>
        )}
      </div>

      {/* 搜索结果 */}
      {search && searchResults.length > 0 && (
        <div className="flex-1 overflow-y-auto px-3 pb-3">
          {searchResults.map((result, i) => (
            <button
              key={i}
              onClick={() => {
                if (result.example) {
                  sendMessage(result.example);
                }
                if (window.innerWidth < 1024) onClose();
              }}
              className="w-full text-left p-2 rounded-lg mb-1 bg-dark-700/50 hover:bg-dark-700 transition-colors"
            >
              <div className="flex items-center gap-1 text-xs text-dark-400 mb-0.5">
                <span>{result.categoryIcon}</span>
                <span>{result.categoryName}</span>
                <span className="mx-1">›</span>
                <span>{result.moduleIcon}</span>
                <span className="text-white">{result.moduleName}</span>
              </div>
              {result.type === 'function' && (
                <div className="ml-4">
                  <span className="text-accent-cyan text-sm">{result.functionName}</span>
                  {result.formula && (
                    <span className="text-accent-purple text-xs ml-2 font-mono">{result.formula}</span>
                  )}
                  {result.example && (
                    <p className="text-dark-500 text-xs mt-0.5 font-mono truncate">{result.example}</p>
                  )}
                </div>
              )}
              {result.type === 'module' && result.example && (
                <p className="text-dark-500 text-xs mt-0.5 ml-4 font-mono truncate">{result.example}</p>
              )}
            </button>
          ))}
        </div>
      )}

      {/* 无结果 */}
      {search && searchResults.length === 0 && (
        <div className="flex-1 px-3">
          <p className="text-dark-500 text-sm text-center py-8">
            未找到"{search}"相关功能
          </p>
        </div>
      )}

      {/* 无搜索时显示模块列表 */}
      {!search && (
        <>
          {/* 新建对话 */}
          <div className="px-3 pb-2">
            <button
              onClick={clearMessages}
              className="w-full py-2 px-3 bg-dark-700 hover:bg-dark-600 border border-dark-500 rounded-lg text-sm text-left transition-colors"
            >
              + 新建对话
            </button>
          </div>

          {/* 模块列表 */}
          <nav className="flex-1 overflow-y-auto px-3 pb-3">
            {filteredCategories.map(cat => (
              <div key={cat.name} className="mb-3">
                <button
                  onClick={() => setExpanded(e => ({ ...e, [cat.name]: !e[cat.name] }))}
                  className="w-full flex items-center gap-2 text-xs text-dark-400 uppercase tracking-wider font-semibold px-2 py-1 hover:text-white transition-colors"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                  <span className="ml-auto text-dark-500">{expanded[cat.name] ? '▾' : '▸'}</span>
                </button>
                {(expanded[cat.name] || search) && cat.modules.map(mod => (
                  <div key={mod.id} className="ml-4 mt-0.5">
                    <button
                      onClick={() => {
                        if (mod.examples && mod.examples.length > 0) {
                          sendMessage(mod.examples![0]);
                        }
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-sm text-dark-300 hover:bg-dark-700 hover:text-white transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <span>{mod.icon}</span>
                        <span>{mod.name}</span>
                        <span className="text-xs text-dark-500 ml-auto opacity-0 group-hover:opacity-100">试试</span>
                      </div>
                      {mod.examples && mod.examples.length > 0 && (
                        <div className="text-xs text-dark-500 mt-0.5 truncate">{mod.examples[0]}</div>
                      )}
                    </button>
                    {(expanded[cat.name] || search) && mod.subModules && mod.subModules.length > 0 && (
                      <div className="mt-1 ml-6 space-y-0.5 max-h-40 overflow-y-auto">
                        {mod.subModules.map((sub, si) => (
                          <button
                            key={si}
                            onClick={(e) => {
                              e.stopPropagation();
                              sendMessage(sub.example);
                              if (window.innerWidth < 1024) onClose();
                            }}
                            className="block w-full text-left text-xs text-dark-500 hover:text-white truncate py-0.5"
                          >
                            · {sub.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </nav>
        </>
      )}

      {/* 底部 */}
      <div className="p-3 border-t border-dark-600 text-xs text-dark-500">
        {messages.length} 条对话 · 620+ 功能
      </div>
    </aside>
  );
}