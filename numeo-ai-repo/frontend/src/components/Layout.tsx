import { useState } from 'react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import ScienceKeyboard from './ScienceKeyboard';
import HelpPanel from './HelpPanel';
import DocsPanel from './DocsPanel';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-dark-900 overflow-hidden">
      {/* 移动端遮罩 */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-20" onClick={() => setSidebarOpen(false)} />
      )}

      {/* 侧边栏 */}
      <div className={`
        ${sidebarOpen ? 'w-72' : 'w-0 overflow-hidden'}
        lg:w-72 lg:relative
        ${sidebarOpen ? '' : 'lg:hidden'}
        transition-all duration-300 shrink-0 h-full z-30
        ${sidebarOpen ? 'fixed lg:relative' : 'fixed'}
      `}>
        <div className="w-72 h-full">
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* 主区域 */}
      <div className="flex-1 min-w-0 h-full grid grid-rows-[auto_1fr_auto] overflow-hidden">
        {/* 顶部栏 */}
        <header className="h-12 border-b border-dark-600 flex items-center px-4 bg-dark-800 shrink-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-dark-400 hover:text-white mr-3 text-lg">
            ☰
          </button>
          <h1 className="font-bold text-sm">
            <span className="text-accent-cyan">Numeo</span>
            <span className="text-dark-400 ml-2 hidden sm:inline">AI 通用计算平台</span>
          </h1>
          <div className="flex-1" />
          <button
            onClick={() => setDocsOpen(!docsOpen)}
            className="px-3 py-1 rounded-lg text-xs text-dark-400 hover:text-white transition-colors"
          >
            📋 文档
          </button>
          <button
            onClick={() => setHelpOpen(!helpOpen)}
            className="px-3 py-1 rounded-lg text-xs text-dark-400 hover:text-white transition-colors"
          >
            📚 帮助
          </button>
          <button
            onClick={() => setKeyboardOpen(!keyboardOpen)}
            className={`px-3 py-1 rounded-lg text-xs transition-colors ml-1 ${keyboardOpen ? 'bg-accent-cyan/20 text-accent-cyan' : 'text-dark-400 hover:text-white'}`}
          >
            ⌨ 科学键盘
          </button>
        </header>

        {/* 聊天区域 */}
        <div className="overflow-hidden">
          <ChatArea />
        </div>

        {/* 科学键盘 */}
        {keyboardOpen && <ScienceKeyboard onClose={() => setKeyboardOpen(false)} />}
        
        {/* 帮助面板 */}
        {helpOpen && <HelpPanel onClose={() => setHelpOpen(false)} />}
        
        {/* 文档面板 */}
        {docsOpen && <DocsPanel onClose={() => setDocsOpen(false)} />}
      </div>
    </div>
  );
}