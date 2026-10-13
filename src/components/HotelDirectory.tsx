'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Moon, 
  Sparkles, 
  PhoneCall, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  ChevronRight, 
  X,
  Car,
  Tv,
  Flame,
  KeyRound,
  MessageCircle
} from 'lucide-react';

const MOTELES_DATA = [
  {
    id: 1,
    nombre: 'Blue Ocean Hotel & Suites',
    zona: 'Insurgentes Norte / Gustavo A. Madero',
    tarifa4h: 480,
    tarifaNoche: 850,
    tags: ['Cochera Privada', 'Jacuzzi', 'Luz Neón'],
    imgFachada: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    descripcion: 'Villas privadas con acceso directo en vehículo y habitaciones remodeladas con tina de hidromasaje.'
  },
  {
    id: 2,
    nombre: 'Blue Ocean Insurgentes Norte',
    zona: 'Tlalnepantla / Periférico Norte',
    tarifa4h: 420,
    tarifaNoche: 780,
    tags: ['Sillón Tántrico', 'Habitación Torre', 'Discreción Total'],
    imgFachada: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    descripcion: 'Concepto moderno con ambientación LED purple night y servicio exprés a la habitación.'
  },
  {
    id: 3,
    nombre: 'Blue Ocean Boutique & Spa',
    zona: 'Calzada de Tlalpan / Sur',
    tarifa4h: 550,
    tarifaNoche: 990,
    tags: ['Pole Dance', 'Pista Iluminada', 'Jacuzzi Doble'],
    imgFachada: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    descripcion: 'Suites con barra de pole dance sobre plataforma iluminada y acabados de lujo diseñados para estancia corta.'
  },
  {
    id: 4,
    nombre: 'Motel & Villas Privadas',
    zona: 'Ecatepec / Vía Morelos',
    tarifa4h: 380,
    tarifaNoche: 680,
    tags: ['Portón Automático', 'Fácil Acceso', '4 Horas'],
    imgFachada: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    descripcion: 'Máxima privacidad con cochera individual automatizada y check-in sin bajarte del coche.'
  },
  {
    id: 5,
    nombre: 'Blue Ocean Luxury Palace',
    zona: 'Zona Oriente / Ignacio Zaragoza',
    tarifa4h: 520,
    tarifaNoche: 920,
    tags: ['Vapor', 'Jacuzzi', 'Cama King Size'],
    imgFachada: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    descripcion: 'Espacios amplios con domótica, control de luces por panel táctil y sistema de audio bluetooth.'
  },
  {
    id: 6,
    nombre: 'Blue Ocean Hotels Estancia Corta',
    zona: 'Naucalpan / Toreo',
    tarifa4h: 450,
    tarifaNoche: 800,
    tags: ['Cochera Techada', 'Sillón Curvo', 'Smart TV'],
    imgFachada: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    descripcion: 'Ubicación estratégica de alta rotación para horas valle entre semana con ocupación dinámica.'
  }
];

export default function HotelDirectory() {
  const [selectedHotel, setSelectedHotel] = useState<typeof MOTELES_DATA[0] | null>(null);

  return (
    <div className="bg-[#0b101b] text-slate-100 min-h-screen font-sans border-b border-slate-800">
      {/* 1. TOP HEADER DE SISTEMA */}
      <header className="border-b border-slate-800/80 bg-[#070b14] px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-400 text-black font-black flex items-center justify-center text-sm shadow-md">
              LCM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base tracking-wider" style={{ fontFamily: 'Montserrat, sans-serif' }}>BLUE OCEAN</span>
                <span className="text-[10px] bg-amber-400/25 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#f5d77f]" />
                  Total Revenue Management
                </span>
              </div>
              <p className="text-[11px] text-slate-400" style={{ fontFamily: 'Inter, Calibri, sans-serif' }}>
                Metodología de Maximización de Ingresos para Hoteles y Moteles • Dirección: Luis César Monroy
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1.5 rounded-full text-xs text-emerald-300 font-sans">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Hosting & Base: $0 USD / mes
            </div>
          </div>
        </div>
      </header>

      {/* 2. CONTENEDOR DE DIRECTORIO */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white tracking-wide mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Directorio de Propiedades
            </h2>
            <p className="text-xs text-slate-400" style={{ fontFamily: 'Inter, Calibri, sans-serif' }}>
              Selecciona una propiedad para gestionar reservas y análisis de tarifas dinámicas.
            </p>
          </div>
        </div>

        {/* 3. GRID DE HOTELES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOTELES_DATA.map((motel) => (
            <div 
              key={motel.id}
              className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-amber-400/50 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={motel.imgFachada}
                    alt={motel.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] text-[#f5d77f] border border-white/10 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#f5d77f]" />
                    {motel.zona}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-cyan-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-bold text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    Desde ${motel.tarifa4h} MXN / 4h
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#f5d77f] transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {motel.nombre}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {motel.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 flex items-center gap-1"
                      >
                        <Sparkles className="w-2.5 h-2.5 text-[#f5d77f]" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed" style={{ fontFamily: 'Inter, Calibri, sans-serif' }}>
                    {motel.descripcion}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => setSelectedHotel(motel)}
                  className="w-full bg-[#00bcd4] hover:bg-[#26c6da] text-black font-extrabold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <span>Ver Hotel</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 4. MODAL INTERACTIVO */}
      {selectedHotel && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedHotel(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[10px] font-sans text-cyan-400 uppercase tracking-widest block mb-1">
              Ficha Técnica del Hotel Modelo
            </span>
            <h3 className="text-xl font-black text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {selectedHotel.nombre}
            </h3>
            <p className="text-xs text-slate-400 mb-4 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#f5d77f]" />
              {selectedHotel.zona}
            </p>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 mb-5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#f5d77f]" />
                  Estancia 4 Horas (Horario Valle):
                </span>
                <span className="font-bold font-sans text-[#f5d77f] text-sm">${selectedHotel.tarifa4h} MXN</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Moon className="w-4 h-4 text-cyan-400" />
                  Noche Completa (Tarifa Dinámica):
                </span>
                <span className="font-bold font-sans text-white text-sm">${selectedHotel.tarifaNoche} MXN</span>
              </div>
              <div className="flex justify-between items-center text-xs text-emerald-400 pt-2 border-t border-slate-800">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Reservación Discreta:
                </span>
                <span className="font-sans text-[11px]">Código QR de Acceso</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-xs text-amber-200 leading-relaxed mb-5" style={{ fontFamily: 'Inter, Calibri, sans-serif' }}>
              <strong className="text-[#f5d77f] block mb-1">Para el Propietario del Hotel:</strong>
              Esta misma vitrina digital se monta para tu propiedad sin pagar software ni mensualidades. Solo comisionamos el 15% sobre las reservas que ingresen por aquí.
            </div>

            <a
              href={`https://wa.me/5210000000000?text=${encodeURIComponent(
                `Hola Luis César, vi el demo de reservas de ${selectedHotel.nombre}. Me interesa montar mi motel en este sistema a resultados.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#f5d77f] hover:bg-[#f3ce63] text-black font-extrabold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-zinc-950" />
              <span>Contactar por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
