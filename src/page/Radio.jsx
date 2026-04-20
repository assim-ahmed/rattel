import React, { useState } from 'react';
import useFetch from '../hook/useFetch';
import usePlayerStore from '../store/usePlayerStore';

const Radio = () => {
    // استخراج الدالة المجهزة وتشغيل حالة التشغيل من الـ Store
    const { playTrack, currentTrack, isPlaying, setIsPlaying } = usePlayerStore();
    
    // جلب بيانات الإذاعات
    const { data, loading } = useFetch('https://www.mp3quran.net/api/v3/radios?language=ar');
    const [searchTerm, setSearchTerm] = useState('');

    // تصفية الإذاعات بناءً على البحث
    const filteredRadios = data?.radios?.filter(radio => 
        radio.name.includes(searchTerm)
    ) || [];

    const handleRadioClick = (radio) => {
        // إذا ضغط المستخدم على إذاعة تعمل بالفعل، نقوم بتبديل حالة التشغيل (Play/Pause)
        if (currentTrack === radio.url) {
            setIsPlaying(!isPlaying);
        } else {
            // تشغيل إذاعة جديدة باستخدام الدالة التي عرفتها في الـ Store
            playTrack(radio.url, radio.name, "بث مباشر - إذاعة القرآن الكريم");
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 pt-8 pb-32 px-6 text-right transition-colors" dir="rtl">
            <div className="max-w-7xl mx-auto">
                
                {/* الرأس والبحث */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 dark:text-white flex items-center gap-3">
                            <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                            الإذاعات <span className="text-blue-600">المباشرة</span>
                        </h2>
                        <p className="text-slate-500 mt-1">استمع لنخبة من الإذاعات القرآنية حول العالم</p>
                    </div>

                    <div className="relative group w-full md:w-80">
                        <input 
                            type="text"
                            placeholder="ابحث عن إذاعة محددة..."
                            className="w-full pr-12 pl-4 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 ring-blue-500 transition-all dark:text-white"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    </div>
                </div>

                {/* عرض الشبكة */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {loading ? (
                         Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="h-24 bg-white dark:bg-slate-900 rounded-3xl animate-pulse border border-slate-50 dark:border-slate-800"></div>
                        ))
                    ) : (
                        filteredRadios.map((radio) => {
                            const isThisRadioActive = currentTrack === radio.url;
                            
                            return (
                                <button 
                                    key={radio.id}
                                    onClick={() => handleRadioClick(radio)}
                                    className={`group p-4 rounded-[2rem] border transition-all duration-300 flex items-center gap-4 text-right
                                        ${isThisRadioActive 
                                            ? 'bg-blue-600 border-blue-600 shadow-lg' 
                                            : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:shadow-xl hover:border-blue-200'
                                        }`}
                                >
                                    {/* أيقونة المشغل الذكية */}
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all
                                        ${isThisRadioActive 
                                            ? 'bg-white/20 text-white' 
                                            : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                                        }`}>
                                        {isThisRadioActive && isPlaying ? (
                                            /* أنيميشن الصوت */
                                            <div className="flex gap-1 items-end h-3">
                                                <div className="w-1 bg-white animate-[bounce_1s_infinite]"></div>
                                                <div className="w-1 bg-white animate-[bounce_1.2s_infinite]"></div>
                                                <div className="w-1 bg-white animate-[bounce_0.8s_infinite]"></div>
                                            </div>
                                        ) : (
                                            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className={`font-bold text-sm truncate ${isThisRadioActive ? 'text-white' : 'text-slate-800 dark:text-slate-100'}`}>
                                            {radio.name}
                                        </h3>
                                        <p className={`text-[10px] mt-1 ${isThisRadioActive ? 'text-blue-100' : 'text-slate-400'}`}>
                                            {isThisRadioActive && isPlaying ? "يتم الاستماع الآن" : "بث إذاعي مباشر"}
                                        </p>
                                    </div>
                                </button>
                            );
                        })
                    )}
                </div>

                {!loading && filteredRadios.length === 0 && (
                    <div className="text-center py-20 text-slate-400 italic">
                        لم يتم العثور على إذاعة بهذا الاسم..
                    </div>
                )}
            </div>
        </div>
    );
};

export default Radio;