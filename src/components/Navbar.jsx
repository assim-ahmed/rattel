import React, { useState, useEffect } from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { Link, useLocation } from 'react-router-dom'; // استيراد useLocation

const Navbar = () => {
    const { theme, toggleTheme } = useThemeStore();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    // الحصول على المسار الحالي
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // دالة للتحقق مما إذا كان الرابط نشطاً
    const isActive = (path) => location.pathname === path;

    const navItems = [
        { name: 'الرئيسية', icon: (color) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>, path: '/' },


        { name: 'المصحف', icon: (color) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 7v14" /><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" /></svg>, path: '/quran' },

        { name: 'المفضلة', icon: (color) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14.876 18.99-1.368 1.323a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.244 1.572" /><path d="M15 15h6" /></svg>, path: '/favorites' },
        { name: 'عن رتل', icon: (color) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>, path: '/about' },
    ];

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-2 transition-all duration-500 ">
            <nav
                className={`w-full max-w-7xl flex items-center justify-between px-6 py-3 transition-all duration-500 border 
                ${scrolled
                    ? 'rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-2xl shadow-blue-500/10'
                    : 'rounded-2xl bg-transparent border-transparent'}`}
            >

                {/* Branding */}
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="relative w-10 h-10 overflow-hidden rounded-2xl shadow-inner transition-transform group-hover:scale-110 active:scale-95">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-400 opacity-20 group-hover:opacity-100 transition-opacity" />
                        <img src="/favicon.png" className="relative z-10 w-full h-full object-cover p-1.5" alt="Logo" />
                    </div>
                    <h1 className="text-2xl font-black bg-gradient-to-l from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">
                        رتل
                    </h1>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => {
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all group overflow-hidden
                                ${active 
                                    ? 'text-blue-600 dark:text-white' 
                                    : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white'}`}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <span className={`text-lg transition-opacity ${active ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                                        {/* تمرير لون الأيقونة بناءً على الحالة */}
                                        {item.icon(active ? '#2563eb' : (theme === 'dark' ? '#94a3b8' : '#1f2d56'))}
                                    </span>
                                    {item.name}
                                </span>
                                
                                {/* تأثير الخلفية للعنصر النشط وعند الحوم */}
                                <div className={`absolute inset-0 transition-transform duration-300 rounded-xl
                                ${active 
                                    ? 'bg-blue-50 dark:bg-blue-900/30 scale-100' 
                                    : 'bg-slate-100 dark:bg-slate-800 scale-0 group-hover:scale-100'}`} 
                                />
                            </Link>
                        );
                    })}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-blue-500/20 transition-all hover:-translate-y-1 active:scale-90"
                    >
                        <div className="relative overflow-hidden w-6 h-6">
                            <span className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${theme === 'light' ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>🌙</span>
                            <span className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${theme === 'dark' ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>☀️</span>
                        </div>
                    </button>

                    <button
                        className="md:hidden w-11 h-11 flex items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/40 active:scale-90"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div className="space-y-1.5">
                            <div className={`w-5 h-0.5 bg-white rounded-full transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <div className={`w-5 h-0.5 bg-white rounded-full transition-all ${isOpen ? 'opacity-0' : ''}`} />
                            <div className={`w-5 h-0.5 bg-white rounded-full ml-auto transition-all ${isOpen ? '-rotate-45 -translate-y-2 w-5' : ''}`} />
                        </div>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 top-[88px] p-4 md:hidden transition-all duration-500 pointer-events-none ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                <div className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[32px] border border-white/20 dark:border-slate-800 p-6 shadow-2xl pointer-events-auto">
                    <div className="grid grid-cols-2 gap-4">
                        {navItems.map((item) => {
                            const active = isActive(item.path);
                            return (
                                <Link 
                                    key={item.name} 
                                    to={item.path} 
                                    onClick={() => setIsOpen(false)} // غلق القائمة عند الضغط
                                    className={`flex flex-col items-center justify-center p-6 rounded-[24px] gap-3 transition-colors group
                                    ${active 
                                        ? 'bg-blue-100 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800' 
                                        : 'bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}
                                >
                                    <span className={`text-3xl transition-transform group-hover:scale-110 ${active ? 'scale-110' : ''}`}>
                                        {item.icon(active ? '#2563eb' : (theme === 'dark' ? '#94a3b8' : '#1f2d56'))}
                                    </span>
                                    <span className={`font-bold ${active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-200'}`}>
                                        {item.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;