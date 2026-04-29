import React from 'react';
import { motion } from 'framer-motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface BottomTabsProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

const BottomTabs: React.FC<BottomTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: Tab[] = [
    { 
      id: 'home', 
      label: 'Trang chủ', 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg> 
    },
    { 
      id: 'hub', 
      label: 'Hub', 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg> 
    },
    { 
      id: 'profile', 
      label: 'Tôi', 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4-4v2"/><circle cx="12" cy="7" r="4"/></svg> 
    },
  ];

  const handleTabClick = async (id: string) => {
    if (activeTab !== id) {
      try {
        await Haptics.impact({ style: ImpactStyle.Light });
      } catch (e) {}
      onTabChange(id);
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
      <div className="glass-panel flex items-center justify-around py-3 px-4 rounded-[2.5rem] shadow-2xl shadow-black/50">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`relative flex flex-col items-center gap-1 p-2 transition-all duration-300 ${isActive ? 'scale-110' : 'opacity-40 grayscale'}`}
            >
              <div className={`transition-all ${isActive ? 'bg-primary text-white p-2.5 rounded-2xl shadow-lg shadow-primary/40' : 'text-white'}`}>
                {tab.icon}
              </div>
              <span className={`text-[8px] font-black uppercase tracking-widest transition-all ${isActive ? 'text-primary' : 'text-white'}`}>
                {tab.label}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_10px_#8b5cf6]"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomTabs;
