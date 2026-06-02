import { useEffect, useRef } from 'react';
import { Message } from '../types';
import { useChatStore } from '../store/chatStore';
import ResultCard from './cards/ResultCard';

interface Props {
  messages: Message[];
}

export default function MessageList({ messages }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const loading = useChatStore(s => s.isLoading);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      <div className="max-w-3xl mx-auto space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-1' : 'order-1'}`}>
              {msg.role === 'user' ? (
                <div className="bg-accent-cyan/10 border border-accent-cyan/20 rounded-xl px-4 py-2.5 text-sm">
                  <p className="text-white whitespace-pre-wrap break-words">{msg.content}</p>
                </div>
              ) : (
                <div>
                  {msg.result ? (
                    <ResultCard result={msg.result} />
                  ) : (
                    <div className="bg-dark-800 border border-dark-600 rounded-xl px-4 py-2.5 text-sm text-dark-300">
                      {msg.content}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-dark-800 border border-dark-600 rounded-xl px-4 py-3">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="text-xs text-dark-400 ml-2">计算中...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}