import { useChatStore } from '../store/chatStore';
import MessageList from './MessageList';
import InputBox from './InputBox';
import { MODULE_CATEGORIES } from '../data/modules';

export default function ChatArea() {
  const messages = useChatStore(s => s.messages);
  const sendMessage = useChatStore(s => s.sendMessage);

  return (
    <div className="h-full flex flex-col">
      {messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center px-4 overflow-auto">
          <div className="text-center max-w-2xl py-8">
            <h2 className="text-2xl font-bold mb-2">
              <span className="text-accent-cyan">Numeo</span> AI 通用计算平台
            </h2>
            <p className="text-dark-400 mb-6 text-sm">
              一个能理解你意图的 AI 计算伙伴。覆盖换算、数学、物理、财务、工程、机械、生活7大领域，620+计算功能。
            </p>

            {/* 快捷入口卡片 — 7大类，财务类取2个，共8个卡片 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
              {MODULE_CATEGORIES.flatMap(cat => {
                if (cat.name === '财务类') return cat.modules.slice(0, 2);
                return cat.modules.slice(0, 1);
              }).filter(m => m.examples && m.examples.length > 0).map(mod => (
                <button
                  key={mod.id}
                  onClick={() => sendMessage(mod.examples![0])}
                  className="p-3 bg-dark-800 border border-dark-600 rounded-xl text-left hover:border-accent-cyan/30 transition-colors group"
                >
                  <div className="text-lg mb-1">{mod.icon}</div>
                  <div className="text-sm font-medium text-white group-hover:text-accent-cyan">{mod.name}</div>
                  <div className="text-xs text-dark-500 mt-0.5 truncate">{mod.examples![0]}</div>
                </button>
              ))}
            </div>

            {/* 使用提示 */}
            <div className="text-xs text-dark-500 space-y-1 mb-6">
              <p>💡 直接输入计算问题，如 "100 meters to feet"、"BMI W=70 H=1.75"</p>
              <p>⌨ 点击顶部「科学键盘」输入特殊符号，支持 7 种分类键盘</p>
              <p>📚 点击「帮助」查看输入指南和常见问题</p>
              <p>📋 点击「文档」浏览全部 620+ 功能的公式和示例</p>
              <p>📱 支持中英文混合输入，按 Enter 发送，Shift+Enter 换行</p>
            </div>

            {/* 功能总览 */}
            <details className="text-left pointer-events-auto">
              <summary className="text-sm text-dark-400 cursor-pointer hover:text-white font-medium">
                📋 点击查看全部支持功能
              </summary>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs max-h-[50vh] overflow-y-auto">
                {MODULE_CATEGORIES.map(cat => (
                  <div key={cat.name} className="bg-dark-800 border border-dark-600 rounded-lg p-3">
                    <div className="font-medium text-white text-sm mb-2">{cat.icon} {cat.name}</div>
                    {cat.modules.map(mod => (
                      <div key={mod.id} className="mb-2">
                        <div className="text-accent-cyan font-medium mb-0.5">{mod.icon} {mod.name}</div>
                        <div className="text-dark-500 mb-1">{mod.description}</div>
                        {mod.examples && mod.examples.length > 0 && (
                          <div className="space-y-0.5 mb-1">
                            {mod.examples.map((ex, i) => (
                              <button
                                key={i}
                                onClick={() => sendMessage(ex)}
                                className="block w-full text-left text-dark-400 hover:text-white bg-dark-700/50 rounded px-2 py-0.5 truncate"
                              >
                                ↳ {ex}
                              </button>
                            ))}
                          </div>
                        )}
                        {mod.subModules && mod.subModules.length > 0 && (
                          <div className="space-y-0.5 ml-2">
                            {mod.subModules.map((sub, si) => (
                              <button
                                key={si}
                                onClick={() => sendMessage(sub.example)}
                                className="block w-full text-left text-dark-500 hover:text-white truncate text-xs py-0.5"
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
              </div>
            </details>
          </div>
        </div>
      ) : (
        <MessageList messages={messages} />
      )}

      <InputBox />
    </div>
  );
}