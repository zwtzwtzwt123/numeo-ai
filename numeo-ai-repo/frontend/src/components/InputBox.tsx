import { useState, useRef, KeyboardEvent, useEffect, useCallback } from 'react';
import { useChatStore } from '../store/chatStore';

export default function InputBox() {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);
  const sendMessage = useChatStore(s => s.sendMessage);
  const isLoading = useChatStore(s => s.isLoading);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const el = inputRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 120) + 'px';
    }
  }, [input]);

  // 语音识别初始化
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'zh-CN';

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev + transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  }, [isListening]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    sendMessage(trimmed);
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-3 shrink-0">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-end gap-2 bg-dark-800 border border-dark-600 rounded-xl px-4 py-2 focus-within:border-accent-cyan/50 transition-colors">
          {/* 语音按钮 */}
          {recognitionRef.current && (
            <button
              onClick={toggleListening}
              className={`p-1.5 rounded-lg transition-colors shrink-0 ${isListening ? 'bg-red-500/20 text-red-400 animate-pulse' : 'text-dark-400 hover:text-white'}`}
              title={isListening ? '正在聆听...' : '语音输入'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
            </button>
          )}

          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? '正在聆听...' : '输入任意计算问题... (Enter 发送，Shift+Enter 换行)'}
            rows={1}
            className="flex-1 bg-transparent border-none outline-none resize-none text-sm py-1.5 max-h-32 placeholder-dark-500"
            disabled={isLoading}
          />

          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-1.5 rounded-lg bg-accent-cyan text-dark-900 hover:bg-accent-cyan/80 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}