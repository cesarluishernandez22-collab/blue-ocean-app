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

        {/* Acciones Obligatorias: Únicamente Pagar en Línea y Teléfono de Reservas */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {onOpenOnlinePayment && (
            <button
              onClick={onOpenOnlinePayment}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition cursor-pointer bg-gradient-to-r from-amber-500 to-[#d4af37] text-zinc-950 hover:from-amber-400 hover:to-amber-300 shadow-md ring-1 ring-[#d4af37]/60 active:scale-95"
              title="Abrir Pasarela de Pago en Línea"
            >
              <CreditCard className="w-3.5 h-3.5 text-zinc-950" />
              <span>💳 Pagar en Línea</span>
            </button>
          )}

          <a
            href="https://wa.me/525512305860?text=Hola%2C%20deseo%20hacer%20una%20reservaci%C3%B3n%20en%20Blue%20Ocean."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md active:scale-95"
            title="Teléfono y WhatsApp de Reservas"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Tel: +52 55 1230 5860</span>
          </a>
        </div>
      </div>
    </header>
  );
}
