import React, { useState } from 'react';
import { 
  Building2, 
  Database, 
  ShieldCheck, 
  MessageSquare, 
  Sparkles, 
  ChevronDown, 
  Terminal, 
  Layers, 
  ExternalLink,
  Zap,
  DollarSign
} from 'lucide-react';
import { ActiveTab, SystemStatus } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  systemStatus: SystemStatus | null;
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const mainTabs = [
    { 
      id: 'blueocean_portal' as ActiveTab, 
      label: 'Portal Huéspedes (Reservas en Vivo)', 
      icon: Sparkles, 
      badge: 'En Vivo',
      color: 'from-amber-500/20 to-rose-500/20 text-rose-300 border-rose-500/30' 
    },
    { 
      id: 'supabase_sql' as ActiveTab, 
      label: 'Base Supabase (SQL & Tablas)', 
      icon: Database, 
      badge: '$0/mes',
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30' 
    },
    { 
      id: 'roadmap_costos' as ActiveTab, 
      label: 'Hoja de Ruta $0/mes', 
      icon: ShieldCheck, 
      badge: 'Canva → Vercel',
      color: 'from-blue-500/20 to-indigo-500/20 text-blue-300 border-blue-500/30' 
    },
    { 
      id: 'feedback' as ActiveTab, 
      label: 'Lo que Sí y Lo que No', 
      icon: MessageSquare, 
      badge: 'Tus Decisiones',
      color: 'from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30' 
    },
  ];

  const advancedTabs = [
    { id: 'blueocean_data' as ActiveTab, label: 'Inspector Airtable' },
    { id: 'overview' as ActiveTab, label: 'Núcleo de Arquitectura' },
    { id: 'blueocean' as ActiveTab, label: 'Modelo Revenue Blue Ocean' },
    { id: 'literature' as ActiveTab, label: 'Literatura Especializada' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0c0d0e]/95 backdrop-blur border-b border-zinc-800 text-zinc-100">
      {/* Top Banner de Identidad y Certidumbre */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-zinc-950 font-bold text-sm shadow-md">
            BO
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white tracking-tight">
                BLUE OCEAN
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-zinc-800 text-amber-400 border border-amber-500/30">
                Hoteles Boutique & Microestancias
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Banco de Trabajo para Validar Diseño, Base SQL en Supabase y Migración a Costo Cero
            </p>
          </div>
        </div>

        {/* Indicadores de Ahorro y Estado */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Hosting & Base: $0 USD / mes</span>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs transition border border-zinc-700"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Avanzado</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {showAdvanced && (
              <div className="absolute right-0 mt-1 w-52 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl py-1 z-50 text-xs">
                {advancedTabs.map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setActiveTab(t.id);
                      setShowAdvanced(false);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-zinc-800 transition ${
                      activeTab === t.id ? 'text-amber-400 font-semibold bg-zinc-800/60' : 'text-zinc-300'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-2 overflow-x-auto py-2 scrollbar-none">
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-zinc-800 text-white border border-zinc-600 shadow-md ring-1 ring-zinc-700'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-zinc-500'}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold border ${
                  isActive ? tab.color : 'bg-zinc-800/80 text-zinc-400 border-zinc-700'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
