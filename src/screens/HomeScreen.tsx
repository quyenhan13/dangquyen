import React, { useEffect, useState } from 'react';
import Avatar from '../components/Avatar';
import MovieCard from '../components/MovieCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { getHistory } from '../storage/watchHistory';
import { CONFIG } from '../config';

// Cache đơn giản ngoài component
let moviesCache: any[] = [];
let lastFetchTime = 0;
const CACHE_TTL = 10 * 60 * 1000; // 10 phút

interface Movie {
  display_name: string;
  poster_url: string;
  slug: string;
  total_eps: number;
  latest_ep: string;
  is_series: boolean;
}

interface HomeProps {
  onWatch: (slug: string) => void;
}

const HomeScreen: React.FC<HomeProps> = ({ onWatch }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setHistory(getHistory());
    
    const fetchMovies = async () => {
      // Sử dụng cache nếu còn hạn
      if (moviesCache.length > 0 && Date.now() - lastFetchTime < CACHE_TTL) {
        setMovies(moviesCache);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/movies.php`, { credentials: 'include' });
        const result = await response.json();
        if (result.status === 'success') {
          setMovies(result.data);
          moviesCache = result.data;
          lastFetchTime = Date.now();
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter(m => 
    m.display_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const validSlugs = new Set(movies.map(m => m.slug));
  const validHistory = history.filter(item => validSlugs.has(item.slug));

  return (
    <div className="flex flex-col gap-4 pb-10">
      {/* Top Bar giống phim.php */}
      <div 
        className="sticky top-0 z-50 px-6 pb-6 pt-12 flex flex-col gap-5 bg-background/80 backdrop-blur-3xl border-b border-white/5"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 1.5rem)' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-primary to-primary-variant flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-black text-lg">V</span>
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-white">
              V<span className="bg-linear-to-r from-primary to-primary-variant bg-clip-text text-transparent">TEEN</span>
              <span className="ml-1 text-[10px] bg-vip text-black px-1.5 py-0.5 rounded-sm align-top font-black">PRO</span>
            </h1>
          </div>
          <Avatar size={36} isAdmin={true} />
        </div>

        {/* Search Bar Premium */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-text-dim group-focus-within:text-primary transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Tìm kiếm phim, diễn viên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-white placeholder:text-text-dim/50 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Tiếp tục xem (Nếu có) */}
      {validHistory.length > 0 && searchTerm === '' && (
        <section className="px-6 py-2">
          <h3 className="text-[10px] font-bold text-text-dim uppercase tracking-widest mb-4 opacity-50">Tiếp tục xem</h3>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {validHistory.map((item) => (
              <div 
                key={item.slug} 
                className="flex-none w-28 group cursor-pointer"
                onClick={() => onWatch(item.slug)}
              >
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-white/5 shadow-2xl">
                  <img 
                    src={item.poster} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/300x450/111/444?text=VTeen';
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <div className="h-full bg-primary w-2/3" />
                  </div>
                </div>
                <p className="text-[10px] font-bold mt-2 truncate text-white/80">{item.title}</p>
                <p className="text-[9px] font-bold text-primary mt-0.5">Tap {item.lastEpisode}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Danh sách phim chính */}
      <section className="px-6">
        <h3 className="text-[10px] font-bold text-text-dim uppercase tracking-widest mb-4 opacity-50">
          {searchTerm ? `Kết quả cho "${searchTerm}"` : 'Tất cả phim'}
        </h3>

        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonLoader key={i} type="card" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredMovies.map((movie) => (
              <MovieCard 
                key={movie.slug}
                title={movie.display_name}
                poster={movie.poster_url}
                latestEp={movie.latest_ep}
                totalEps={movie.total_eps}
                isSeries={movie.is_series}
                onClick={() => onWatch(movie.slug)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomeScreen;
