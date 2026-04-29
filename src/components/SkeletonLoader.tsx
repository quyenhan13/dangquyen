import React from 'react';

interface SkeletonProps {
  type: 'card' | 'banner' | 'text' | 'avatar';
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonProps> = ({ type, className = '' }) => {
  const baseClasses = "animate-pulse bg-white/10 relative overflow-hidden";
  
  if (type === 'card') {
    return (
      <div className={`rounded-xl aspect-[2/3] ${baseClasses} ${className}`}>
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>
    );
  }
  
  if (type === 'banner') {
    return (
      <div className={`rounded-2xl aspect-[16/9] ${baseClasses} ${className}`}>
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>
    );
  }

  if (type === 'avatar') {
    return (
      <div className={`rounded-full ${baseClasses} ${className}`}>
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>
    );
  }

  return (
    <div className={`rounded ${baseClasses} ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
    </div>
  );
};

export default SkeletonLoader;
