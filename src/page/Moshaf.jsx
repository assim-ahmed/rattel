import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useFetch from '../hook/useFetch';
import useFetchById from '../hook/useFetchById';
import usePlayerStore from '../store/usePlayerStore';

function Moshaf() {
  const [searchParams] = useSearchParams();
  const reciterId = searchParams.get('id') || 102;
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true); // حالة التحميل
  const {data,loading,error} = useFetch('https://www.mp3quran.net/api/v3/suwar?language=ar');
  const {reciter} = useFetchById(reciterId);
  const playTrack = usePlayerStore((state) => state.playTrack);
  const surahs = data?.suwar || [];

  console.log(reciterId);
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 
    return () => clearTimeout(timer);
  }, []);


  const filteredSurahs = surahs.filter(surah =>
    surah.name.includes(searchTerm)
  );

  // مكون الـ Skeleton Card (يظهر أثناء التحميل)
  const SkeletonCard = () => (
    <div className="bg-slate-200 dark:bg-slate-800/50 rounded-3xl p-6 border border-slate-100 dark:border-slate-700/50 shadow-sm animate-pulse">
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 bg-slate-200 dark:bg-slate-700 rounded-2xl"></div>
        <div className="flex-grow space-y-3">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-3/4"></div>
          <div className="flex gap-2">
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-12"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-12"></div>
          </div>
        </div>
        <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-full"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] p-4 md:p-10 transition-colors duration-300" dir="rtl">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">
              مصحف الشيخ : <span className="text-emerald-600 dark:text-emerald-400">{reciter?.name}</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">عرض سور القرآن الكريم المتاحة للشيخ</p>
          </div>

          <div className="relative group">
            <input
              type="text"
              placeholder="ابحث عن السورة..."
              className="w-full md:w-80 px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Grid System */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // عرض 6 كروت Skeleton أثناء التحميل
            Array(6).fill(0).map((_, index) => <SkeletonCard key={index} />)
          ) : (
            // عرض البيانات الحقيقية بعد انتهاء التحميل
            filteredSurahs.map((surah) => {
                let baseName= "";
                let pathName = reciter?.moshaf[0].server+"/";
                if(surah.id < 10 )
                {
                    baseName = `00${surah.id}.mp3`
                }else if(surah.id > 10 && surah.id < 100)
                {
                    baseName = `0${surah.id}.mp3`
                }else 
                {
                    baseName = `${surah.id}.mp3`
                }
                let fileName =pathName+baseName;

                return <div 
                onClick={()=>{playTrack(fileName,surah.name,reciter?.name)}}
                key={surah.id}
                className="group relative bg-white dark:bg-slate-800/50 rounded-3xl p-6 border border-slate-100 dark:border-slate-700/50 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"
              >
                <div className="flex items-center gap-5">
                  <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold text-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                    {surah.id}
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      سورة {surah.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                        {surah.makkia?'مكية':'مدنية'}
                      </span>
                    </div>
                  </div>

                  <div className="text-2xl text-slate-300 dark:text-slate-600 group-hover:text-emerald-500 transition-colors">
                    ▶️
                  </div>
                </div>
              </div>
            })
          )}
        </div>

        {/* Empty State */}
        {!isLoading && filteredSurahs.length === 0 && (
          <div className="text-center py-20 text-slate-400 dark:text-slate-600 text-lg">
             لا توجد نتائج بحث مطابقة..
          </div>
        )}
      </div>
    </div>
  );
}

export default Moshaf;