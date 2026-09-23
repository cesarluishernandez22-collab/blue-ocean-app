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
  DollarSign,
  Award
} from 'lucide-react';
import { ActiveTab, SystemStatus } from '../types';
import { LCMLogo } from './LCMLogo';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  systemStatus: SystemStatus | null;
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const mainTabs = [
    { 
      id: 'hotel_directory' as ActiveTab, 
      label: 'Directorio Hoteles & Renders', 
      icon: Building2, 
      badge: 'Fachadas & Renders',
      color: 'from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30' 
    },
    { 
      id: 'convocatoria' as ActiveTab, 
      label: 'Convocatoria Hoteleros', 
      icon: Award, 
      badge: 'Presentación',
      color: 'from-[#d4af37]/30 to-amber-500/30 text-[#f5d77f] border-[#d4af37]/50 ring-1 ring-[#d4af37]/40' 
    },
    { 
      id: 'metodologia_lcm' as ActiveTab, 
      label: 'Metodología Total Revenue', 
      icon: Award, 
      badge: 'L.C. Monroy',
      color: 'from-[#d4af37]/20 to-amber-500/20 text-[#f5d77f] border-[#d4af37]/40' 
    },
    { 
      id: 'blueocean_portal' as ActiveTab, 
      label: 'Portal Huéspedes (Reservas)', 
      icon: Sparkles, 
      badge: 'En Vivo',
      color: 'from-amber-500/20 to-rose-500/20 text-rose-300 border-rose-500/30' 
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0c0d0e]/95 backdrop-blur border-b border-zinc-800 text-zinc-100">
      {/* Top Banner de Identidad Limpio y Fuerte */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/60">
        <div className="flex items-center gap-3">
          <LCMLogo size="sm" />
          <div>
            <h1 className="text-sm sm:text-base font-black text-[#f5d77f] tracking-tight font-serif leading-tight">
              Plataforma de rentabilidad y maximizacion de ingresos para hoteles y moteles de renta por tiempo
            </h1>
            <p className="text-[11px] text-zinc-400 font-medium">
              Dirección General: Luis César Monroy • Total Revenue Management
            </p>
          </div>
        </div>

        {/* Acceso Directo de Contacto */}
        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/525512305860?text=Hola%20Luis%20C%C3%A9sar%2C%20vi%20la%20plataforma%20y%20me%20interesa%20evaluar%20mi%20hotel."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow"
          >
            <span>WhatsApp Directo (+52 55 1230 5860)</span>
          </a>
        </div>
      </div>

      {/* Main Navigation Tabs: Conceptos de Negocio con Acceso Real */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-2 overflow-x-auto py-2.5 scrollbar-none">
          <button
            onClick={() => setActiveTab('hotel_directory')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all duration-150 cursor-pointer ${
              activeTab === 'hotel_directory'
                ? 'bg-[#002244] text-[#f5d77f] border border-[#d4af37]/60 shadow-md ring-1 ring-[#d4af37]/50'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Building2 className={`w-4 h-4 ${activeTab === 'hotel_directory' ? 'text-[#f5d77f]' : 'text-zinc-400'}`} />
            <span>Catálogo de Fachadas Oficiales</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-sans font-bold bg-[#d4af37]/20 text-[#f5d77f] border border-[#d4af37]/40">
              Propiedades
            </span>
          </button>

          <button
            onClick={() => setActiveTab('metodologia_lcm')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all duration-150 cursor-pointer ${
              activeTab === 'metodologia_lcm'
                ? 'bg-[#002244] text-[#f5d77f] border border-[#d4af37]/60 shadow-md ring-1 ring-[#d4af37]/50'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Award className={`w-4 h-4 ${activeTab === 'metodologia_lcm' ? 'text-[#f5d77f]' : 'text-zinc-400'}`} />
            <span>Revenue Management & Pricing</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-sans font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              Estrategia
            </span>
          </button>

          <button
            onClick={() => setActiveTab('convocatoria')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all duration-150 cursor-pointer ${
              activeTab === 'convocatoria'
                ? 'bg-[#002244] text-[#f5d77f] border border-[#d4af37]/60 shadow-md ring-1 ring-[#d4af37]/50'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Award className={`w-4 h-4 ${activeTab === 'convocatoria' ? 'text-[#f5d77f]' : 'text-zinc-400'}`} />
            <span>Convocatoria Hoteleros (11 Láminas)</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-sans font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
              Alianza
            </span>
          </button>

          <button
            onClick={() => setActiveTab('blueocean_portal')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all duration-150 cursor-pointer ${
              activeTab === 'blueocean_portal'
                ? 'bg-[#002244] text-[#f5d77f] border border-[#d4af37]/60 shadow-md ring-1 ring-[#d4af37]/50'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Sparkles className={`w-4 h-4 ${activeTab === 'blueocean_portal' ? 'text-[#f5d77f]' : 'text-zinc-400'}`} />
            <span>Tarifa Dinámica & Reservas en Vivo</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-sans font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
              Captación
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
