import React, { useState } from 'react';
import useFetch from '../hook/useFetch';
import { Link } from 'react-router-dom';

const Home = () => {
    const { data, loading, error } = useFetch('https://mp3quran.net/api/v3/reciters');
    const [searchTerm, setSearchTerm] = useState('');
    const recitersList = data?.reciters || [];

    const filteredReciters = recitersList.filter(r => r.name.includes(searchTerm));

    // مكون هيكل التحميل (Skeleton Card)
    const SkeletonCard = () => (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 animate-pulse flex items-center gap-4">
            <div className="w-12 h-12 shrink-0 rounded-2xl bg-slate-200 dark:bg-slate-800"></div>
            <div className="flex-1 space-y-3">
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-3/4"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-1/2"></div>
            </div>
            <div className="w-5 h-5 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-200 dark:bg-slate-800/50 pt-5 pb-12 px-6 transition-colors duration-500 text-right" dir="rtl">
            <div className="max-w-7xl mx-auto">
                
                {/* رأس الصفحة */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white mb-2">
                            قائمة <span className="text-blue-600 dark:text-blue-400">القراء</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">اختر قارئك المفضل للاستماع للمصحف الشريف</p>
                    </div>

                    {/* شريط البحث */}
                    <div className="relative group w-full md:w-80">
                        <input 
                            type="text"
                            placeholder="ابحث عن قارئ..."
                            className="w-full pr-12 pl-5 py-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-transparent shadow-lg shadow-blue-500/5 focus:border-blue-500 outline-none transition-all dark:text-white"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    </div>
                </div>

                {/* شبكة القراء أو الهياكل المؤقتة */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading ? (
                        // إظهار 12 كارت Skeleton أثناء التحميل
                        Array.from({ length: 12 }).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))
                    ) : (
                        filteredReciters.map((reciter) => (
                            <Link
                                key={reciter.id}
                                to={`quran?id=${reciter.id}`}>
                                <div 
                                    title={reciter.name}
                                    className="group relative bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 cursor-pointer flex items-center gap-4"
                                >
                                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                                    </div>

                                    <div className="flex-1 overflow-hidden">
                                        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {reciter.name}
                                        </h3>
                                        <span className="text-xs text-slate-400 tracking-wider">
                                            {reciter.moshaf[0]?.name.slice(0, 23)}
                                        </span>
                                    </div>

                                    <div className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-[-4px] transition-all">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                                    </div>

                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-blue-600 rounded-l-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                                </div>
                            </Link>
                        ))
                    )}
                </div>

                {/* حالة الخطأ */}
                {error && (
                    <div className="text-center py-24">
                        <p className="text-red-500 font-bold">حدث خطأ أثناء تحميل البيانات، يرجى المحاولة لاحقاً.</p>
                    </div>
                )}

                {/* حالة عدم وجود نتائج */}
                {!loading && filteredReciters.length === 0 && !error && (
                    <div className="text-center py-24">
                        <p className="text-slate-400 font-bold">لا توجد نتائج مطابقة لبحثك..</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;