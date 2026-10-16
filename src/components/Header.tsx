import React from 'react';
import { 
  PhoneCall,
  CreditCard
} from 'lucide-react';
import { ActiveTab, SystemStatus } from '../types';
import { LCMLogo } from './LCMLogo';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  systemStatus: SystemStatus | null;
  onOpenContact?: () => void;
  onGoToGraphs?: () => void;
  onOpenOnlinePayment?: () => void;
}

export function Header({ setActiveTab, onOpenOnlinePayment }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#002244]/95 backdrop-blur border-b border-[#d4af37]/40 text-white">
      {/* Barra Principal con Ancho Completo */}
      <div className="w-full max-w-[1680px] mx-auto px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3">
        
        {/* Identidad y Logotipo Oficial LCM */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('convocatoria')}
            className="flex items-center gap-2.5 cursor-pointer text-left group"
            title="Ir a Convocatoria"
          >
            <LCMLogo size="sm" className="hover:scale-105 transition-transform" />
            <div className="border-l border-blue-700/60 pl-2.5">
              <h1 className="text-base sm:text-lg font-black text-[#f5d77f] tracking-tight font-serif leading-tight group-hover:text-amber-300 transition">
                Blue Ocean
              </h1>
              <p className="text-xs text-blue-100 font-sans tracking-wide font-medium">
                Hoteles y Moteles de renta por hora
              </p>
            </div>
          </button>
        </div>

        {/* Acciones Superiores Discretas y Compactas (Regla Estricta: Fondo Oscuro y Logo de Pago) */}
        <div className="flex items-center gap-2">
          {onOpenOnlinePayment && (
            <button
              onClick={onOpenOnlinePayment}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition cursor-pointer bg-[#12284c] hover:bg-[#18325a] text-[#F0F2F7] border border-[#D7B158]/40 shadow-sm active:scale-95"
              title="Pasarela de Pago Seguro Mercado Pago"
            >
              {/* Logo Sutil Azul Mercado Pago */}
              <svg className="w-3.5 h-3.5 text-[#009EE3]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
              </svg>
              <span>Pagar en Línea</span>
            </button>
          )}

          <a
            href="https://wa.me/525512305860?text=Hola%2C%20deseo%20hacer%20una%20reservaci%C3%B3n%20en%20Blue%20Ocean."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#12284c] hover:bg-[#18325a] text-[#F0F2F7] border border-emerald-500/40 text-xs font-bold transition shadow-sm active:scale-95"
            title="Reservaciones directas vía WhatsApp"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">WhatsApp:</span>
            <span>+52 55 1230 5860</span>
          </a>
        </div>
      </div>
    </header>
  );
}
