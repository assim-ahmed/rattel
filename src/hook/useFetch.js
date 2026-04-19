import { useState, useEffect } from 'react';


const useFetch = (url) => {
    const [data, setData] = useState(null);    // لتخزين البيانات القادمة من الـ API
    const [loading, setLoading] = useState(true); // حالة التحميل
    const [error, setError] = useState(null);    // حالة الخطأ في حال فشل الطلب

    useEffect(() => {
        // نستخدم AbortController لمنع تسريب الذاكرة إذا أغلق المستخدم الصفحة قبل وصول البيانات
        const abortCont = new AbortController();

        const fetchData = async () => {
            try {
                const response = await fetch(url, { signal: abortCont.signal });
                
                if (!response.ok) {
                    throw Error('عذراً، تعذر جلب البيانات من المصدر');
                }
                
                const result = await response.json();
                setData(result);
                setError(null);
                setLoading(false);
            } catch (err) {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted');
                } else {
                    setLoading(false);
                    setError(err.message);
                }
            }
        };

        fetchData();

        // تنظيف (Cleanup) عند إغلاق المكون
        return () => abortCont.abort();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;