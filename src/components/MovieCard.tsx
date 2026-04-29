import React from 'react';

interface MovieCardProps {
  title: string;
  poster: string;
  latestEp?: string;
  totalEps?: number;
  isSeries?: boolean;
  onClick?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ 
  title, 
  poster, 
  latestEp, 
  totalEps, 
  isSeries,
  onClick 
}) => {
  return (
    <div 
      className="group relative flex flex-col gap-2 cursor-pointer transition-transform duration-300 active:scale-95"
      onClick={onClick}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-card border border-white/5 shadow-2xl">
        <img 
          src={poster} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/300x450/111/444?text=VTeen';
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {isSeries && (
            <span className="glass px-2 py-0.5 rounded-md text-[9px] font-black text-white uppercase tracking-wider">
              Series
            </span>
          )}
          {latestEp && (
            <span className="bg-primary/90 text-[9px] font-black px-2 py-0.5 rounded-md text-white shadow-lg uppercase tracking-wider">
              EP {latestEp}
            </span>
          )}
        </div>

        {/* Play Button Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-2xl">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="px-1.5">
        <h3 className="text-xs font-black line-clamp-2 leading-tight text-white/90 group-hover:text-primary transition-colors uppercase tracking-tight">
          {title}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-[9px] font-bold text-text-dim/60 uppercase">
            {totalEps ? `${totalEps} TẬP` : 'PHIM LẺ'}
          </p>
          <div className="w-1 h-1 rounded-full bg-white/10" />
          <p className="text-[9px] font-bold text-primary/80 uppercase">HD PRO</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
