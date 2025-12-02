import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const Hotspot = ({ x, y, label, desc, theme }) => (
  <div className="absolute group" style={{ top: y, left: x }}>
    <div className={`w-4 h-4 rounded-full ${theme.accentBg} animate-ping absolute`}></div>
    <div className={`relative w-4 h-4 rounded-full ${theme.accentBg} border-2 border-white cursor-pointer`}></div>
    
    <div className="absolute left-6 top-0 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-50">
      <div className={`p-4 rounded-xl ${theme.glass} border ${theme.border} text-left`}>
        <p className="text-xs font-bold uppercase mb-1">{label}</p>
        <p className={`text-[10px] ${theme.textMuted}`}>{desc}</p>
      </div>
    </div>
  </div>
);

const Dashboard = ({ t, theme, isDark, ASSETS }) => {
  return (
    <section id="system" className={`py-32 relative overflow-hidden ${theme.glass} border-y ${theme.border}`}>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-5xl font-black mb-8 leading-tight">Total Control.<br/>Zero Friction.</h2>
          <p className={`text-xl mb-8 leading-relaxed ${theme.textMuted}`}>
            La interfaz de Handicapp fue diseñada con veterinarios y entrenadores olímpicos. Cada píxel tiene un propósito.
          </p>
          <ul className="space-y-4 mb-8">
            {["Stock Control", "Health Alerts", "Team Notify"].map((item, i) => (
              <li key={i} className="flex items-center gap-4 font-bold">
                <CheckCircle2 className={theme.accent} /> {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative group">
          <div className={`absolute inset-0 rounded-[2rem] blur-2xl opacity-30 ${theme.accentBg}`}></div>
          <div className={`relative rounded-[2rem] overflow-hidden border ${theme.border} shadow-2xl`}>
            <div className="aspect-[16/9] w-full bg-zinc-900 relative">
              {ASSETS.dashboardScreen ? (
                <img src={ASSETS.dashboardScreen} alt="Dashboard" className="w-full h-full object-cover object-top" />
              ) : (
                <div className="flex items-center justify-center h-full text-zinc-700">Dashboard Preview</div>
              )}
              {/* HOTSPOTS */}
              <Hotspot x="20%" y="30%" label={t.hotspots.stock} desc={t.hotspots.stock_d} theme={theme} />
              <Hotspot x="50%" y="50%" label={t.hotspots.health} desc={t.hotspots.health_d} theme={theme} />
              <Hotspot x="80%" y="20%" label={t.hotspots.notify} desc={t.hotspots.notify_d} theme={theme} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
