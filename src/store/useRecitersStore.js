import { create } from 'zustand';

const useRecitersStore = create((set) => ({
    reciters: [],
    setReciters: (data) => set({ reciters: data }),
}));

export default useRecitersStore;