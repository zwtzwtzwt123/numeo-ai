import { useState } from 'react';
import { useChatStore } from '../store/chatStore';
import { MODULE_CATEGORIES } from '../data/modules';

interface Props {
  onClose: () => void;
}

export default function HelpPanel({ onClose }: Props) {
  const [activeTab, setActiveTab] = useState<'quickstart' | 'input' | 'modules' | 'faq' | 'examples'>('quickstart');
  const sendMessage = useChatStore(s => s.sendMessage);

  const tabs = [
    { key: 'quickstart' as const, label: '🚀 快速入门' },
    { key: 'input' as const, label: '📝 输入指南' },
    { key: 'modules' as const, label: '📋 模块概览' },
    { key: 'faq' as const, label: '❓ 常见问题' },
    { key: 'examples' as const, label: '💡 示例库' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* 遮罩 */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      {/* 面板 */}
      <div className="relative ml-auto w-full max-w-2xl h-full bg-dark-800 border-l border-dark-600 overflow-y-auto shadow-2xl">
        {/* 头部 */}
        <div className="sticky top-0 bg-dark-800 border-b border-dark-600 p-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold">📚 帮助文档</h2>
          <button onClick={onClose} className="text-dark-400 hover:text-white text-xl">✕</button>
        </div>

        {/* 标签页 */}
        <div className="flex border-b border-dark-600 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm whitespace-nowrap transition-colors ${activeTab === tab.key ? 'text-accent-cyan border-b-2 border-accent-cyan' : 'text-dark-400 hover:text-white'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 内容区 */}
        <div className="p-6 space-y-4 text-sm text-dark-300">
          
          {/* ========== 快速入门 ========== */}
          {activeTab === 'quickstart' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-bold mb-2">如何输入计算问题？</h3>
                <p>在输入框中直接输入你的计算问题，按 <kbd className="bg-dark-600 px-1.5 py-0.5 rounded text-xs">Enter</kbd> 发送。</p>
                <div className="bg-dark-900 rounded-lg p-3 mt-2 space-y-2">
                  <p className="text-dark-400 text-xs">✅ 正确示例：</p>
                  <p className="font-mono text-accent-green">100 meters to feet</p>
                  <p className="font-mono text-accent-green">复利10万元，年利率5%，10年</p>
                  <p className="font-mono text-accent-green">kinetic energy of 2kg at 10m/s</p>
                  <p className="font-mono text-accent-green">BMI W=70 H=1.75</p>
                </div>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">支持的输入格式</h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-dark-900 rounded p-2">
                    <span className="text-accent-cyan">自然语言：</span>
                    <p className="mt-1">100米等于多少英尺</p>
                  </div>
                  <div className="bg-dark-900 rounded p-2">
                    <span className="text-accent-cyan">参数格式：</span>
                    <p className="mt-1">a=5 b=3 c=?</p>
                  </div>
                  <div className="bg-dark-900 rounded p-2">
                    <span className="text-accent-cyan">数学表达式：</span>
                    <p className="mt-1">x^2+2x+1=0</p>
                  </div>
                  <div className="bg-dark-900 rounded p-2">
                    <span className="text-accent-cyan">混合中英文：</span>
                    <p className="mt-1">kinetic energy 2kg 10m/s</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">结果解读</h3>
                <div className="space-y-2">
                  <div className="bg-dark-900 rounded p-2">
                    <span className="text-accent-cyan">📐 标题：</span>显示计算所属的模块和类型
                  </div>
                  <div className="bg-dark-900 rounded p-2">
                    <span className="text-accent-purple">📏 公式：</span>使用的数学/物理公式
                  </div>
                  <div className="bg-dark-900 rounded p-2">
                    <span className="text-dark-300">📝 步骤：</span>详细推导过程（可折叠）
                  </div>
                  <div className="bg-dark-900 rounded p-2">
                    <span className="text-accent-green">✅ 结果：</span>最终答案（绿色高亮）
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========== 输入指南 ========== */}
          {activeTab === 'input' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-bold mb-2">中文输入示例</h3>
                <div className="bg-dark-900 rounded-lg p-3 space-y-1 font-mono text-xs">
                  <p>· 复利10万元，年利率5%，10年</p>
                  <p>· 贷款100万，年利率4.5%，30年</p>
                  <p>· 自由落体高度20米</p>
                  <p>· 三角形面积 b=10 h=5</p>
                  <p>· 米饭热量</p>
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold mb-2">英文输入示例</h3>
                <div className="bg-dark-900 rounded-lg p-3 space-y-1 font-mono text-xs">
                  <p>· 100 meters to feet</p>
                  <p>· compound interest 100000, 5%, 10 years</p>
                  <p>· kinetic energy of 2kg at 10m/s</p>
                  <p>· solve x^2+2x+1=0</p>
                  <p>· BMI W=70 H=1.75</p>
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold mb-2">科学计数法</h3>
                <div className="bg-dark-900 rounded-lg p-3 space-y-1 font-mono text-xs">
                  <p>· 1.6e-19（库仑电荷）</p>
                  <p>· 2e11（弹性模量）</p>
                  <p>· 6.674e-11（引力常数）</p>
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold mb-2">参数命名规则</h3>
                <div className="bg-dark-900 rounded-lg p-3 space-y-1 text-xs">
                  <p>· 用 <code>a=5 b=3</code> 传参数</p>
                  <p>· 用 <code>q1=1e-6 q2=2e-6</code> 区分同类参数</p>
                  <p>· 带单位：<code>L=10m v=5m/s</code></p>
                  <p>· 角度：<code>A=30°</code> 或 <code>angle=45</code></p>
                </div>
              </div>
            </div>
          )}

          {/* ========== 模块概览 ========== */}
          {activeTab === 'modules' && (
            <div className="space-y-4">
              {MODULE_CATEGORIES.map(cat => (
                <div key={cat.name} className="bg-dark-900 rounded-lg p-4">
                  <h3 className="text-white font-bold mb-2">{cat.icon} {cat.name}</h3>
                  <div className="space-y-2">
                    {cat.modules.map(mod => (
                      <div key={mod.id} className="flex items-start gap-2 text-xs">
                        <span className="text-lg shrink-0">{mod.icon}</span>
                        <div>
                          <span className="text-accent-cyan font-medium">{mod.name}</span>
                          <span className="text-dark-500 ml-1">({mod.nameEn})</span>
                          <p className="text-dark-400 mt-0.5">{mod.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="bg-dark-900 rounded-lg p-4 text-center">
                <p className="text-2xl mb-2">📊</p>
                <p className="text-white font-bold">总计 620+ 个计算功能</p>
                <p className="text-dark-400 text-xs mt-1">覆盖换算、数学、物理、财务、工程、机械、生活7大领域</p>
              </div>
            </div>
          )}

          {/* ========== 常见问题 ========== */}
          {activeTab === 'faq' && (
            <div className="space-y-4">
              {[
                { q: '为什么结果显示 N/A？', a: '概念查询类功能（如"水泥强度等级"）返回的是文字说明，不是数值。N/A 是前端显示问题，不影响功能。' },
                { q: '为什么数值显示为 0？', a: '结果太小（如 1.6e-19），前端四舍五入显示为 0。科学计数法的值已正确计算。' },
                { q: '如何查看计算步骤？', a: '点击结果卡片中的"收起步骤 ▴"/"展开步骤 ▾"按钮。' },
                { q: '支持哪些语言？', a: '目前支持中英文混合输入。界面中文为主，英文界面开发中。' },
                { q: '如何输入特殊符号？', a: '点击顶部"⌨ 科学键盘"按钮，提供5种分类键盘（通用/数学/希腊/物理/财务）。' },
                { q: '语音输入怎么用？', a: '输入框左侧麦克风按钮，点击后说话即可（Chrome 浏览器支持最好）。' },
                { q: '为什么有时返回"请指定xxx概念"？', a: '输入的关键词不够明确，系统无法判断具体要算哪个功能。请参考示例输入。' },
                { q: '手机端如何使用？', a: '手机浏览器直接打开即可，界面自适应。建议横屏使用科学键盘。' },
              ].map((faq, i) => (
                <div key={i} className="bg-dark-900 rounded-lg p-3">
                  <p className="text-white font-medium text-sm">Q: {faq.q}</p>
                  <p className="text-dark-400 text-xs mt-1">A: {faq.a}</p>
                </div>
              ))}
            </div>
          )}

          {/* ========== 示例库 ========== */}
          {activeTab === 'examples' && (
            <div className="space-y-4">
              <p className="text-dark-400 text-xs">点击任意示例可直接计算</p>
              {MODULE_CATEGORIES.map(cat => (
                <div key={cat.name} className="bg-dark-900 rounded-lg p-4">
                  <h3 className="text-white font-bold mb-2 text-sm">{cat.icon} {cat.name}</h3>
                  <div className="space-y-2">
                    {cat.modules.map(mod => (
                      <div key={mod.id}>
                        <div className="flex items-center gap-1 text-xs mb-1">
                          <span>{mod.icon}</span>
                          <span className="text-accent-cyan">{mod.name}</span>
                        </div>
                        <div className="space-y-0.5 ml-5">
                          {mod.examples?.map((ex, i) => (
                            <button
                              key={i}
                              onClick={() => { sendMessage(ex); onClose(); }}
                              className="block w-full text-left text-xs text-dark-400 hover:text-white bg-dark-800 hover:bg-dark-700 rounded px-2 py-1 transition-colors font-mono"
                            >
                              ↳ {ex}
                            </button>
                          ))}
                          {mod.subModules?.map((sub, i) => (
                            <button
                              key={'sub'+i}
                              onClick={() => { sendMessage(sub.example); onClose(); }}
                              className="block w-full text-left text-xs text-dark-500 hover:text-white truncate py-0.5 ml-2"
                            >
                              · {sub.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}