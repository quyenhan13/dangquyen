import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BottomTabs from './components/BottomTabs'
import HomeScreen from './screens/HomeScreen'
import WatchScreen from './screens/WatchScreen'
import LoginScreen from './screens/LoginScreen'
import HubScreen from './screens/HubScreen'
import ProfileScreen from './screens/ProfileScreen'
import './index.css'

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [watchingSlug, setWatchingSlug] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('vteen_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed?.api_token) {
          setUser(parsed);
          // Đồng bộ khi khởi động
          import('./storage/watchHistory').then(m => m.syncHistoryWithServer());
          import('./storage/favorites').then(m => m.syncFavoritesWithServer());
        }
      } catch (e) {
        localStorage.removeItem('vteen_user');
      }
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (userData: any) => {
    if (!userData?.api_token) {
      localStorage.removeItem('vteen_user');
      return;
    }
    setUser(userData);
    localStorage.setItem('vteen_user', JSON.stringify(userData));
    
    // Đồng bộ ngay sau khi login
    import('./storage/watchHistory').then(m => m.syncHistoryWithServer());
    import('./storage/favorites').then(m => m.syncFavoritesWithServer());
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('vteen_user');
    setActiveTab('home');
    setWatchingSlug(null);
  };

  const handleWatch = (slug: string) => {
    setWatchingSlug(slug);
  };

  const [updateInfo, setUpdateInfo] = useState<any>(null);

  useEffect(() => {
    const checkUpdate = async () => {
      try {
        const res = await fetch(`${CONFIG.SITE_BASE_URL}/version.json?t=${Date.now()}`);
        const data = await res.json();
        if (data.version !== CONFIG.VERSION) {
          setUpdateInfo(data);
        }
      } catch (e) {}
    };
    
    const timeout = setTimeout(checkUpdate, 3000); // Check sau 3s khi mở app
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return null;

  if (!user) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="h-[100dvh] bg-background text-white relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.main 
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full overflow-y-auto overscroll-none pb-32"
        >
          {activeTab === 'home' && <HomeScreen onWatch={handleWatch} />}
          {activeTab === 'hub' && <HubScreen />}
          {activeTab === 'profile' && (
            <ProfileScreen 
              user={user} 
              onLogout={handleLogout} 
              onWatch={handleWatch} 
            />
          )}
        </motion.main>
      </AnimatePresence>

      <AnimatePresence>
        {watchingSlug && (
          <WatchScreen 
            slug={watchingSlug} 
            onBack={() => setWatchingSlug(null)} 
            onUnauthorized={handleLogout}
          />
        )}
      </AnimatePresence>

      {!watchingSlug && (
        <BottomTabs activeTab={activeTab} onTabChange={setActiveTab} />
      )}

      {/* Update Prompt */}
      <AnimatePresence>
        {updateInfo && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
          >
            <div className="bg-card w-full max-w-sm rounded-[2.5rem] p-8 border border-white/10 shadow-2xl text-center">
              <div className="w-16 h-16 bg-primary/20 text-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-white mb-2">Cập nhật mới!</h3>
              <p className="text-text-dim text-sm mb-6 leading-relaxed">
                Phiên bản {updateInfo.version} đã sẵn sàng. <br/>
                <span className="text-[10px] italic">"{updateInfo.notes}"</span>
              </p>
              <div className="flex flex-col gap-3">
                <a 
                  href={CONFIG.SITE_BASE_URL + '/VTeens.ipa'}
                  className="bg-primary py-4 rounded-2xl text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all"
                >
                  Tải bản IPA ngay
                </a>
                <button 
                  onClick={() => setUpdateInfo(null)}
                  className="py-3 text-text-dim text-[10px] font-bold uppercase tracking-widest"
                >
                  Để sau
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
