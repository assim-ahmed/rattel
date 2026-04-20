import { useEffect } from 'react';
import { useThemeStore } from './store/useThemeStore';
import { useLoaderStore } from './store/useLoaderStore'; // استيراد مخزن اللودر
import { Routes , Route } from 'react-router-dom';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Home from './page/Home';
import Moshaf from './page/Moshaf';
import AudioPlayer from './components/AudioPlayer';
import Favorites from './page/Favorites';
import About from './page/About';
import Radio from './page/Radio';






function App() {
  const { theme, applyTheme } = useThemeStore();
  // جلب الحالة والدالة من Zustand
  const { hasLoaded, setHasLoaded } = useLoaderStore();

  // تطبيق الثيم عند التغيير
  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
      
      {/* 1. اللودر: يظهر فقط إذا لم يسبق تحميله في هذه الجلسة */}
      {!hasLoaded && (
        <Loader onFinished={() => setHasLoaded()} />
      )}

      {/* 2. المحتوى الأساسي: يظهر بناءً على حالة hasLoaded */}
      <main className={`transition-opacity duration-1000 ${!hasLoaded ? 'opacity-0' : 'opacity-100'}`}>
        
        <Navbar />
        <Hero/>

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/quran' element={<Moshaf/>} />
          <Route path='/Favorites' element={<Favorites/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/radio' element={<Radio/>} />
          <Route path="*" element={<Home />} />
        </Routes>
        <AudioPlayer/>

        
      </main>
    </div>
  );
}

export default App;