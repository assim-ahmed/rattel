import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    const features = [
        { title: "مكتبة شاملة", desc: "وصول سريع لأكثر من 200 قارئ من مشاهير العالم الإسلامي.", icon: "📚" },
        { title: "روايات متعددة", desc: "دعم كامل لمختلف الروايات مثل حفص، ورش، وقالون وغيرهم.", icon: "📖" },
        { title: "تجربة مستخدم", desc: "واجهة عصرية تدعم الوضع الليلي وسهولة التنقل بين القراء.", icon: "⚡" },
        { title: "قائمة المفضلة", desc: "إمكانية حفظ قراءك المفضلين للوصول إليهم في أي وقت.", icon: "❤️" }
    ];

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 pt-12 pb-20 px-6 text-right" dir="rtl">
            <div className="max-w-4xl mx-auto">
                
                {/* الجزء العلوي: التعريف */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 mb-4 text-sm font-bold tracking-wider text-blue-600 uppercase bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        عن المنصة
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white mb-6">
                        مصحف <span className="text-blue-600">الذاكرين</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
                        منصة رقمية تهدف إلى تقريب كتاب الله للمسلمين حول العالم، من خلال توفير تلاوات قرآنية عطرة بأعلى جودة وبأصوات نخبة من القراء والمشايخ.
                    </p>
                </div>

                {/* المميزات */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                    {features.map((feat, index) => (
                        <div key={index} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all group">
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">
                                {feat.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{feat.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
                        </div>
                    ))}
                </div>

                {/* جزء المطور - Signature */}
                <div className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 border border-blue-100 dark:border-blue-900/30 text-center shadow-sm">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 relative z-10">
                        تصميم وتنفيذ
                    </h2>
                    
                    <div className="inline-flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 px-8 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                            ع
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">المطور والمصمم</p>
                            <p className="text-xl font-black text-slate-900 dark:text-white tracking-wide">عاصم أحمد</p>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center gap-4 relative z-10">
                        <Link to="/" className="text-blue-600 font-bold hover:underline">
                            العودة للرئيسية
                        </Link>
                        <span className="text-slate-300">|</span>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">
                            معرض الأعمال
                        </a>
                    </div>
                </div>

                {/* Footer بسيط */}
                <p className="text-center mt-12 text-slate-400 text-sm">
                    &copy; {new Date().getFullYear()} جميع الحقوق محفوظة لـ عاصم أحمد
                </p>

            </div>
        </div>
    );
};

export default About;