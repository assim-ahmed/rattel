// store/useLoaderStore.js أو أضفه لمتجر الثيم
import { create } from 'zustand';

export const useLoaderStore = create((set) => ({
  hasLoaded: false,
  setHasLoaded: () => set({ hasLoaded: true }),
}));