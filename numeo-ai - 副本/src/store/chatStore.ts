import { create } from 'zustand';
import { Message, CalculationResult } from '../types';
import { sendCalculation } from '../api/client';

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  sidebarOpen: boolean;
  
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  toggleSidebar: () => void;
}

let messageId = 0;
const generateId = () => `msg_${++messageId}_${Date.now()}`;

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isLoading: false,
  sidebarOpen: true,

  sendMessage: async (content: string) => {
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    set((state) => ({
      messages: [...state.messages, userMessage],
      isLoading: true,
    }));

    try {
      const result = await sendCalculation(content);

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: content,
        result: result as CalculationResult,
        timestamp: Date.now(),
      };

      set((state) => ({
        messages: [...state.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: '请求失败，请检查网络连接后重试。',
        result: { type: 'error', message: '网络请求失败' },
        timestamp: Date.now(),
      };

      set((state) => ({
        messages: [...state.messages, errorMessage],
        isLoading: false,
      }));
    }
  },

  clearMessages: () => set({ messages: [] }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));