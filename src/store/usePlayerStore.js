import { create } from 'zustand';

const usePlayerStore = create((set) => ({
    // البيانات الأولية
    currentTrack: null, // سيحتوي على رابط الصوت (src)
    trackName: '',
    reciterName: '',
    isPlaying: false,

    // وظيفة لتشغيل سورة جديدة
    playTrack: (src, trackName, reciterName) => set({
        currentTrack: src,
        trackName: trackName,
        reciterName: reciterName,
        isPlaying: true // يبدأ التشغيل فوراً عند الاختيار
    }),

    // وظيفة للتحكم في التشغيل/التوقف
    setIsPlaying: (status) => set({ isPlaying: status }),
}));

export default usePlayerStore;