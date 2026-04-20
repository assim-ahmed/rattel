import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    // جلب البيانات من localStorage عند فتح الصفحة
    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('quran_favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    // دالة لحذف قارئ من المفضلة وتحديث الصفحة فوراً
    const removeFavorite = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        const updatedFavorites = favorites.filter(fav => fav.id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem('quran_favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 pt-8 pb-12 px-6 text-right" dir="rtl">
            <div className="max-w-7xl mx-auto">
                
                {/* الرأس */}
                <div className="mb-12">
                    <h2 className="text-3xl font-black text-slate-800 dark:text-white flex items-center gap-3">
                        <span className="text-red-500">
                            <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                        </span>
                        القراء <span className="text-blue-600">المفضلون</span>
                    </h2>
                    <p className="text-slate-500 mt-2">قائمتك الخاصة للقراء الذين تتابعهم باستمرار</p>
                </div>

                {/* التحقق من وجود بيانات */}
                {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {favorites.map((reciter) => (
                            <Link 
                                key={reciter.id} 
                                to={`/quran?id=${reciter.id}`}
                                className="group relative bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all flex items-center gap-4"
                            >
                                {/* أيقونة القارئ */}
                                <div className="w-14 h-14 shrink-0 rounded-2xl bg-red-50 dark:bg-red-900/10 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                                </div>

                                {/* بيانات القارئ */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-slate-800 dark:text-slate-100 truncate group-hover:text-red-500 transition-colors">
                                        {reciter.name}
                                    </h3>
                                    <p className="text-[10px] text-slate-400 mt-1 truncate">
                                        {reciter.moshaf?.[0]?.name || "مصحف متاح"}
                                    </p>
                                </div>

                                {/* حذف من المفضلة + سهم */}
                                <div className="flex flex-col items-center gap-3 border-r pr-3 border-slate-100 dark:border-slate-800">
                                    <button 
                                        onClick={(e) => removeFavorite(e, reciter.id)}
                                        className="text-red-500 hover:text-red-700 transition-transform hover:scale-125"
                                        title="حذف من المفضلة"
                                    >
                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                        </svg>
                                    </button>
                                    <div className="text-slate-300 group-hover:text-blue-500 group-hover:-translate-x-1 transition-all">
                                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    /* رسالة في حالة عدم وجود مفضلات */
                    <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                        <div className="text-slate-200 dark:text-slate-800 mb-4">
                            <svg width="80" height="80" fill="currentColor" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-400">قائمة المفضلات فارغة</h3>
                        <p className="text-slate-500 mt-2">ابدأ بإضافة بعض القراء للوصول إليهم بسرعة</p>
                        <Link to="/" className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all font-bold">
                            تصفح القراء الآن
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;