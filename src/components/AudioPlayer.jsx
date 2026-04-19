import React, { useState, useEffect, useRef } from 'react';
import usePlayerStore from '../store/usePlayerStore';

const AudioPlayer = () => {
    const { currentTrack, trackName, reciterName, isPlaying, setIsPlaying } = usePlayerStore();
    
    // حالات محلية للوقت والتحميل
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isBuffering, setIsBuffering] = useState(false);
    
    const audioRef = useRef(null);

    // 1. منطق شريط التحميل العلوي (يتحرك عند تغيير السورة فقط)
    useEffect(() => {
        if (currentTrack) {
            setIsBuffering(true);
            setLoadingProgress(0);
            const timer = setInterval(() => {
                setLoadingProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(timer);
                        setIsBuffering(false);
                        return 100;
                    }
                    return prev + 15;
                });
            }, 80);
            return () => clearInterval(timer);
        }
    }, [currentTrack]);

    // 2. مزامنة حالة التشغيل مع Zustand
    useEffect(() => {
        if (audioRef.current && !isBuffering) {
            isPlaying ? audioRef.current.play().catch(() => {}) : audioRef.current.pause();
        }
    }, [isPlaying, currentTrack, isBuffering]);

    // 3. تنسيق الوقت (من ثواني إلى 00:00)
    const formatTime = (time) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // 4. تحديث الوقت أثناء التشغيل
    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const handleSeek = (e) => {
        const time = Number(e.target.value);
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    if (!currentTrack) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col">
            
            {/* شريط التحميل العلوي (يظهر فقط عند التغيير) */}
            <div className="w-full h-1 bg-transparent overflow-hidden">
                {isBuffering && (
                    <div 
                        className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6] transition-all duration-300"
                        style={{ width: `${loadingProgress}%` }}
                    ></div>
                )}
            </div>

            {/* جسم المشغل - ثابت دائماً */}
            <div className="bg-white/95 dark:bg-slate-900/98 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-4 py-3 shadow-[0_-10px_25px_rgba(0,0,0,0.1)]">
                <div className="max-w-7xl mx-auto flex flex-col gap-2">
                    
                    {/* شريط التقدم الفعلي للمقطع */}
                    <input 
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className="absolute -top-[5px] left-0 w-full h-1 bg-transparent appearance-none cursor-pointer accent-blue-600 hover:accent-blue-400 transition-all"
                    />

                    <div className="flex items-center justify-between gap-4" dir="rtl">
                        
                        {/* القسم الأيمن: المعلومات */}
                        <div className="flex items-center gap-3 w-1/4">
                            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0">
                                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                            </div>
                            <div className="hidden sm:block truncate">
                                <p className="font-bold text-slate-800 dark:text-white text-sm truncate">{trackName}</p>
                                <p className="text-[11px] text-slate-500 font-medium">{reciterName}</p>
                            </div>
                        </div>

                        {/* القسم الأوسط: التحكم والوقت */}
                        <div className="flex flex-col items-center gap-1 flex-1">
                            <div className="flex items-center gap-5">
                                {/* عداد الوقت المنقضي */}
                                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 w-10 text-left">
                                    {formatTime(currentTime)}
                                </span>

                                <button 
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="w-12 h-12 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all"
                                >
                                    {isPlaying ? (
                                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                                    ) : (
                                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="mr-1"><path d="M8 5v14l11-7z"/></svg>
                                    )}
                                </button>

                                {/* إجمالي وقت المقطع */}
                                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 w-10 text-right">
                                    {formatTime(duration)}
                                </span>
                            </div>
                        </div>

                        {/* القسم الأيسر: الصوت */}
                        <div className="w-1/4 flex justify-end items-center gap-2 text-slate-400">
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14"/></svg>
                            <input 
                                type="range" 
                                min="0" max="1" step="0.05" 
                                onChange={(e) => (audioRef.current.volume = e.target.value)}
                                className="w-20 accent-blue-600 hidden md:block cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                {/* عنصر الصوت الخفي */}
                <audio 
                    ref={audioRef} 
                    src={currentTrack} 
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                />
            </div>
        </div>
    );
};

export default AudioPlayer;