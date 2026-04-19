import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
      // دالة لتطبيق الكلاس على الـ HTML مباشرة
      applyTheme: (theme) => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      },
    }),
    {
      name: 'ratil-theme-storage', // اسم المفتاح في LocalStorage
    }
  )
);