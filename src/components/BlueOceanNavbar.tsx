import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  SlidersHorizontal, 
  Compass, 
  Sparkles,
  Phone,
  ShieldCheck,
  ChevronDown,
  Info
} from 'lucide-react';
import { LCMLogo } from './LCMLogo';

export interface SearchFilters {
  destino: string;
  fechaLlegada: string;
  modalidadHoras: string;
  huespedes: number;
  estrellas: number | 'todas';
  rangoPrecioMax: number;
  soloConJacuzzi: boolean;
  soloConCochera: boolean;
}

interface BlueOceanNavbarProps {
  onOpenConsultoriaModal?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export function BlueOceanNavbar({ onOpenConsultoriaModal, onNavigateSection }: BlueOceanNavbarProps) {
  return (
    <header className="bg-[#121214] border-b border-zinc-800 sticky top-0 z-50 shadow-md">
      {/* Top Banner: Promesa comercial y modelo a resultados */}
      <div className="bg-[#18181b] border-b border-zinc-800/80 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#c05c80]/20 text-[#e07a9e] border border-[#c05c80]/30 uppercase tracking-wider font-mono">
              Fase 1 • Validación
            </span>
            <span className="text-zinc-300 font-medium">
              Convertimos habitaciones vacías en ingresos • Renta por tiempo y pernocta
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden md:inline-flex items-center gap-1 text-[#d4af37]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
              Modelo por resultados compartidos (15%) • $0 Inversión inicial
            </span>
            <a 
              href="mailto:direccion@oceanrevenue-management.com" 
              className="hover:text-white transition font-mono text-zinc-400"
            >
              direccion@oceanrevenue-management.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand: Blue Ocean Hotels + LCM signature */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#1c1c20] to-[#121214] border border-zinc-700 flex items-center justify-center text-[#e07a9e] shadow-sm">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight text-white font-sans">
                  Blue Ocean <span className="text-[#38a3a5] font-light">Hotels</span>
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  MX
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-medium tracking-wide">
                Hoteles & Moteles de Renta por Tiempo
              </p>
            </div>
          </div>

          {/* LCM Author / Consultoría badge */}
          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-zinc-800">
            <LCMLogo size="sm" />
            <div className="leading-tight">
              <span className="text-[11px] font-bold text-[#d4af37] block font-mono">
                LCM METODOLOGÍA
              </span>
              <span className="text-[9px] text-zinc-500">
                Luis César Monroy • Revenue Management
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-300">
          <button 
            onClick={() => onNavigateSection?.('catalogo')}
            className="hover:text-[#e07a9e] transition flex items-center gap-1"
          >
            <span>Catálogo de Hoteles</span>
          </button>
          <button 
            onClick={() => onNavigateSection?.('como-funciona')}
            className="hover:text-[#38a3a5] transition flex items-center gap-1"
          >
            <span>Renta por Tiempo</span>
          </button>
          <button 
            onClick={() => onNavigateSection?.('fundador')}
            className="hover:text-[#d4af37] transition flex items-center gap-1"
          >
            <span>Historia & Metodología</span>
          </button>
          <button 
            onClick={() => onNavigateSection?.('modelo-hoteleros')}
            className="hover:text-white transition flex items-center gap-1 text-[#e07a9e]"
          >
            <Sparkles className="w-3 h-3 text-[#e07a9e]" />
            <span>Para Propietarios ($0 Inversión)</span>
          </button>
        </nav>

        {/* Contact CTA */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenConsultoriaModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-[#e07a9e] to-[#c05c80] hover:from-[#e58aab] hover:to-[#cb688c] text-zinc-950 shadow-sm transition"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Afiliar mi Hotel</span>
            <span className="sm:hidden">Afiliar</span>
          </button>
        </div>
      </div>
    </header>
  );
}

interface BookingSearchBarProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  onSearch: () => void;
  totalResults: number;
}

export function BookingSearchBar({
  filters,
  onFilterChange,
  onSearch,
  totalResults
}: BookingSearchBarProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleInputChange = (field: keyof SearchFilters, value: any) => {
    onFilterChange({
      ...filters,
      [field]: value
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="w-full relative z-20">
      {/* Booking.com styled search container with Charcoal + Rose & Cyan subtle accents */}
      <form 
        onSubmit={handleFormSubmit}
        className="bg-[#18181b] border-2 border-zinc-700/80 rounded-2xl shadow-2xl p-2.5 lg:p-3 text-zinc-200 backdrop-blur-md"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {/* FIELD 1: DESTINO / ZONA */}
          <div className="bg-[#121214] border border-zinc-800 hover:border-zinc-600 rounded-xl p-2.5 flex items-center gap-3 transition">
            <div className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center text-[#e07a9e] shrink-0 border border-zinc-800">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] uppercase font-mono tracking-wider text-zinc-400">
                Destino o Zona (CDMX)
              </label>
              <select
                value={filters.destino}
                onChange={(e) => handleInputChange('destino', e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer truncate"
              >
                <option value="todos" className="bg-[#18181b] text-white">Todas las zonas (CDMX)</option>
                <option value="Del Valle / Insurgentes" className="bg-[#18181b] text-white">Insurgentes Sur / Del Valle</option>
                <option value="Pedregal / Perisur" className="bg-[#18181b] text-white">Periférico Sur / Pedregal</option>
                <option value="Polanco / Anzures" className="bg-[#18181b] text-white">Polanco / Anzures</option>
                <option value="Coyoacán / Tlalpan" className="bg-[#18181b] text-white">Calzada de Tlalpan / Coyoacán</option>
                <option value="Roma Sur / Viaducto" className="bg-[#18181b] text-white">Viaducto / Roma Sur</option>
                <option value="Santa Fe" className="bg-[#18181b] text-white">Santa Fe / Cuajimalpa</option>
              </select>
            </div>
          </div>

          {/* FIELD 2: FECHA DE LLEGADA */}
          <div className="bg-[#121214] border border-zinc-800 hover:border-zinc-600 rounded-xl p-2.5 flex items-center gap-3 transition">
            <div className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center text-[#38a3a5] shrink-0 border border-zinc-800">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] uppercase font-mono tracking-wider text-zinc-400">
                Fecha de Reserva
              </label>
              <input
                type="date"
                value={filters.fechaLlegada}
                onChange={(e) => handleInputChange('fechaLlegada', e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* FIELD 3: MODALIDAD DE TIEMPO (ESTANCIA CORTA VS PERNOCTA) */}
          <div className="bg-[#121214] border border-zinc-800 hover:border-zinc-600 rounded-xl p-2.5 flex items-center gap-3 transition">
            <div className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center text-[#d4af37] shrink-0 border border-zinc-800">
              <Clock className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] uppercase font-mono tracking-wider text-zinc-400">
                Tiempo de Estancia
              </label>
              <select
                value={filters.modalidadHoras}
                onChange={(e) => handleInputChange('modalidadHoras', e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer truncate"
              >
                <option value="todas" className="bg-[#18181b] text-white">Cualquier duración</option>
                <option value="4_horas" className="bg-[#18181b] text-white">4 Horas (Estancia Express)</option>
                <option value="6_horas" className="bg-[#18181b] text-white">6 Horas (Estancia Confort)</option>
                <option value="12_horas" className="bg-[#18181b] text-white">12 Horas (Día / Tarde)</option>
                <option value="noche_completa" className="bg-[#18181b] text-white">Noche Completa (Pernocta)</option>
              </select>
            </div>
          </div>

          {/* FIELD 4: HUÉSPEDES & BOTÓN DE BÚSQUEDA */}
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-[#121214] border border-zinc-800 hover:border-zinc-600 rounded-xl p-2.5 flex items-center gap-2.5 transition">
              <div className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-300 shrink-0 border border-zinc-800">
                <Users className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] uppercase font-mono tracking-wider text-zinc-400">
                  Huéspedes
                </label>
                <select
                  value={filters.huespedes}
                  onChange={(e) => handleInputChange('huespedes', parseInt(e.target.value, 10))}
                  className="w-full bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
                >
                  <option value={1} className="bg-[#18181b] text-white">1 Huésped</option>
                  <option value={2} className="bg-[#18181b] text-white">2 Huéspedes (Pareja)</option>
                  <option value={3} className="bg-[#18181b] text-white">3 Huéspedes</option>
                  <option value={4} className="bg-[#18181b] text-white">4 Huéspedes (Suite Villa)</option>
                </select>
              </div>
            </div>

            {/* Submit Search Button */}
            <button
              type="submit"
              className="h-full px-5 py-3 rounded-xl bg-[#e07a9e] hover:bg-[#c05c80] text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shrink-0"
              title="Buscar disponibilidad"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Buscar</span>
            </button>
          </div>
        </div>

        {/* Filters Toggle and Quick Tags */}
        <div className="mt-2.5 pt-2.5 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-zinc-500 font-mono">Filtros rápidos:</span>
            
            <button
              type="button"
              onClick={() => handleInputChange('soloConJacuzzi', !filters.soloConJacuzzi)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition ${
                filters.soloConJacuzzi
                  ? 'bg-[#38a3a5]/20 text-[#4ba3a3] border-[#38a3a5]/50'
                  : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              Con Jacuzzi / Hidromasaje
            </button>

            <button
              type="button"
              onClick={() => handleInputChange('soloConCochera', !filters.soloConCochera)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition ${
                filters.soloConCochera
                  ? 'bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/50'
                  : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              Cochera Privada / Discreta
            </button>

            {/* Selector de Estrellas */}
            <div className="flex items-center gap-1 ml-1 text-zinc-400">
              <span className="text-[11px] text-zinc-500 font-mono">Categoría:</span>
              {(['todas', 4, 5] as const).map((stars) => (
                <button
                  key={stars}
                  type="button"
                  onClick={() => handleInputChange('estrellas', stars)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono border transition ${
                    filters.estrellas === stars
                      ? 'bg-[#e07a9e]/20 text-[#e07a9e] border-[#e07a9e]/40 font-bold'
                      : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-zinc-300'
                  }`}
                >
                  {stars === 'todas' ? 'Todas' : `${stars}★`}
                </button>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-zinc-400 font-mono flex items-center gap-1.5">
            <span className="text-[#38a3a5] font-bold">{totalResults}</span> propiedades disponibles con confirmación inmediata
          </div>
        </div>
      </form>
    </div>
  );
}
