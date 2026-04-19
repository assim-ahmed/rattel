import React, { useState, useEffect } from 'react';

const Loader = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onFinished, 800);
          }, 600);
          return 100;
        }
        return prev + 2; // سرعة التحميل
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onFinished]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center p-6 transition-transform duration-800 ease-in-out
        /* الخلفية ستتغير تلقائياً بناءً على وجود كلاس .dark في الـ html */
        bg-white dark:bg-slate-950
        ${isExiting ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="w-full max-w-md">

        <div className='flex justify-center items-center'>
            <img src="./public/favicon.png" className='size-70 rounded-full' alt="" />
        </div>
        
        {/* النصوص: تتأثر بالـ Dark Mode عبر كلاسات dark: */}
        <div className="flex justify-between items-end mb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-500 dark:text-blue-400">
              جاري التهيئة
            </span>
            <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter">
             <span className="text-blue-600">رتل</span>
            </h2>
          </div>
          <div className="flex flex-col items-end">
             <span className="text-xl font-mono font-bold text-blue-600 dark:text-blue-400">
                {progress}%
             </span>
          </div>
        </div>

        {/* شريط التحميل */}
        <div className="relative h-1.5 w-full bg-slate-100 dark:bg-slate-800/40 rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 transition-all duration-300 ease-out rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            {/* لمعان يتناسب مع الوضع الداكن (شفافية أقل في الداكن) */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent w-[200%] animate-shimmer" />
          </div>
        </div>

        {/* نصوص متغيرة */}
        <div className="mt-8 h-6 overflow-hidden text-center">
          <p className="text-slate-400 dark:text-slate-500 text-sm font-medium italic animate-pulse">
             {progress < 50 ? "بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ" : "وَرَتِّلِ الْقُرْآنَ تَرْتِيلاً"}
          </p>
        </div>
      </div>

      {/* الـ Animation الخاص بـ v4 */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2.5s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default Loader;