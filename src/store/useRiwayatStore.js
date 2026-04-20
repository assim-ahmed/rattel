import { create } from 'zustand';

const useRiwayatStore = create((set) => ({
    riwayat: [],
    setRiwayat: (data) => set({ riwayat: data }),
}));

export default useRiwayatStore;