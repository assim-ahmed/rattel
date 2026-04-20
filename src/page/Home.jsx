import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hook/useFetch';
import useRecitersStore from '../store/useRecitersStore';
import useRiwayatStore from '../store/useRiwayatStore';

const Home = () => {
    const { reciters, setReciters } = useRecitersStore();
    const { riwayat, setRiwayat } = useRiwayatStore();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRewayah, setSelectedRewayah] = useState('');
    const [favorites, setFavorites] = useState([]);

    const { data: recData, loading } = useFetch('https://www.mp3quran.net/api/v3/reciters?language=ar');
    const { data: riwData } = useFetch('https://www.mp3quran.net/api/v3/riwayat?language=ar');

    useEffect(() => {
        if (recData) setReciters(recData.reciters);
        if (riwData) setRiwayat(riwData.riwayat);
        setFavorites(JSON.parse(localStorage.getItem('quran_favorites')) || []);
    }, [recData, riwData, setReciters, setRiwayat]);

    // --- المنطق المتسلسل للفلترة ---

    // 1. الفلترة بالرواية (المرحلة الأولى)
    const baseList = selectedRewayah === "" 
        ? reciters 
        : reciters.filter((reciter)=>{
        return reciter.moshaf.some(m => String(m.rewaya_id) === String(selectedRewayah));        });

    // 2. البحث بالاسم (المرحلة الثانية - داخل نتائج الرواية فقط)
    const filteredReciters = searchTerm.trim() === "" 
        ? baseList 
        : baseList.filter(reciter => reciter.name.includes(searchTerm));



    const toggleFavorite = (e, reciter) => {
        e.preventDefault(); e.stopPropagation();
        const isExist = favorites.find(f => f.id === reciter.id);
        const updated = isExist ? favorites.filter(f => f.id !== reciter.id) : [...favorites, reciter];
        setFavorites(updated);
        localStorage.setItem('quran_favorites', JSON.stringify(updated));
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 pt-8 pb-12 px-6 text-right transition-colors" dir="rtl">
            <div className="max-w-7xl mx-auto">
                
                {/* أدوات التحكم */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 dark:text-white">قائمة القراء</h2>
                        <p className="text-slate-500 text-sm mt-1">
                            {selectedRewayah !== "" 
                                ? `تم العثور على ${baseList.length} قارئ بهذه الرواية` 
                                : "تصفح جميع القراء المتاحين"}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                        {/* Select الروايات */}
                        <div className="relative">
                            <select 
                                className="w-full sm:w-64 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 focus:ring-2 ring-blue-500 outline-none cursor-pointer appearance-none shadow-sm"
                                value={selectedRewayah}
                                onChange={(e) => {
                                    
                                    setSelectedRewayah(e.target.value);
                                   
                                    setSearchTerm(''); // تصفير البحث عند تغيير الرواية لنتائج أدق
                                }}
                            >
                                <option value="">كل الروايات</option>
                                {riwayat.map(rew => (
                                    <option key={rew.id} value={rew.id}>{rew.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* حقل البحث */}
                        <div className="relative group">
                            <input 
                                type="text"
                                placeholder={selectedRewayah === "" ? "بحث بالاسم..." : "بحث في النتائج المفلترة..."}
                                className="w-full sm:w-72 pr-12 pl-4 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 focus:ring-2 ring-blue-500 outline-none text-slate-800 dark:text-white shadow-sm transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        </div>
                    </div>
                </div>

                {/* شبكة القراء */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading ? (
                        <div className="col-span-full text-center py-10 text-slate-400 italic">جاري تحميل البيانات...</div>
                    ) : (
                        filteredReciters.map(reciter => {
                            const isFav = favorites.some(f => f.id === reciter.id);
                            return (
                                <Link 
                                    key={reciter.id} 
                                    to={`quran?id=${reciter?.id}`}
                                    className="group relative bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-4"
                                >
                                    {/* أيقونة القارئ */}
                                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                                    </div>

                                    {/* بيانات القارئ */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-slate-800 dark:text-slate-100 truncate group-hover:text-blue-600 transition-colors">
                                            {reciter.name}
                                        </h3>
                                      
                                    </div>

                                    {/* القلب فوق السهم */}
                                    <div className="flex flex-col items-center gap-3 border-r pr-3 border-slate-100 dark:border-slate-800">
                                        <button 
                                            onClick={(e) => toggleFavorite(e, reciter)}
                                            className={`transition-all duration-300 ${isFav ? 'text-red-500 scale-110' : 'text-slate-300 hover:text-red-400'}`}
                                        >
                                            <svg width="18" height="18" fill={isFav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                            </svg>
                                        </button>
                                        <div className="text-slate-300 group-hover:text-blue-500 group-hover:-translate-x-1 transition-all">
                                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    )}
                </div>

                {/* حالة عدم وجود نتائج */}
                {!loading && filteredReciters.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-400 text-lg">لا توجد نتائج تطابق اختيارك..</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;