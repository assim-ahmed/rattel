import useFetch from './useFetch';

const useFetchById = (id) => {
    const { data, loading, error } = useFetch('https://mp3quran.net/api/v3/reciters');
    
    // الوصول للمصفوفة الأساسية
    const recitersList = data?.reciters || [];

    // البحث عن الشيخ المطلوب بناءً على الـ id
    // استخدمنا Number تحسباً لأن الـ id قد يأتي من الرابط كـ String
    const reciter = recitersList.find(r => r.id === Number(id));

    return { reciter, loading, error };
};

export default useFetchById;