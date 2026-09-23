import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Sparkles, 
  Eye, 
  Clock, 
  DollarSign, 
  X, 
  Search, 
  SlidersHorizontal, 
  Car, 
  Droplets, 
  ShieldCheck, 
  Check, 
  RotateCcw, 
  Maximize2,
  Phone,
  Flame,
  Tv,
  ChevronLeft,
  ChevronRight,
  Grid,
  Image as ImageIcon
} from 'lucide-react';
import { LCMLogo } from './LCMLogo';

export interface ModelHotel {
  id: number;
  codigo: string;
  nombreSugerido: string;
  direccionZona: string;
  tarifa4h: number;
  tarifa6h: number;
  tarifaNoche: number;
  tags: string[];
  renderFachada: {
    url: string;
    archivo: string;
    descripcion: string;
  };
  renderHabitacion: {
    url: string;
    archivo: string;
    descripcion: string;
  };
  descripcionComercial: string;
}

// 6 Propiedades Modelo con sus renders reales emparejados (Fachada + Habitación)
const PROPIEDADES_MODELO: ModelHotel[] = [
  {
    id: 1,
    codigo: 'HOTEL-01',
    nombreSugerido: 'Blue Ocean Hotel & Suites',
    direccionZona: 'Insurgentes Norte / Gustavo A. Madero',
    tarifa4h: 480,
    tarifa6h: 620,
    tarifaNoche: 850,
    tags: ['Cochera Privada', 'Jacuzzi Doble', 'Luz Neón'],
    renderFachada: {
      url: '/renders/Polish_20260822_225309771.jpg',
      archivo: 'Polish_20260822_225309771.jpg',
      descripcion: 'Fachada Principal Blue Ocean Hotel & Suites con marquesina y acceso iluminado'
    },
    renderHabitacion: {
      url: '/renders/image~10.jpg',
      archivo: 'image~10.jpg',
      descripcion: 'Master Suite con iluminación atmosférica LED y acabados de lujo'
    },
    descripcionComercial: 'Concepto insignia de alta rotación. Habitaciones acondicionadas con tina de hidromasaje y acceso automatizado directo.'
  },
  {
    id: 2,
    codigo: 'HOTEL-02',
    nombreSugerido: 'Blue Ocean Insurgentes Norte',
    direccionZona: 'Tlalnepantla / Periférico Norte',
    tarifa4h: 420,
    tarifa6h: 560,
    tarifaNoche: 780,
    tags: ['Sillón Tántrico', 'Habitación Torre', 'Discreción Total'],
    renderFachada: {
      url: '/renders/Polish_20260822_230305219.jpg',
      archivo: 'Polish_20260822_230305219.jpg',
      descripcion: 'Fachada Moderna Insurgentes Norte con señalización digital Blue Ocean'
    },
    renderHabitacion: {
      url: '/renders/image~11.jpg',
      archivo: 'image~11.jpg',
      descripcion: 'Suite con tina de hidromasaje integrada y luz ambiental regulable'
    },
    descripcionComercial: 'Diseñado para parejas y estancias exprés. Optimización de horas valle de lunes a jueves con pricing dinámico.'
  },
  {
    id: 3,
    codigo: 'HOTEL-03',
    nombreSugerido: 'Blue Ocean Boutique & Spa',
    direccionZona: 'Calzada de Tlalpan / Sur',
    tarifa4h: 550,
    tarifa6h: 720,
    tarifaNoche: 990,
    tags: ['Pole Dance', 'Pista Iluminada', 'Jacuzzi Doble'],
    renderFachada: {
      url: '/renders/Polish_20260822_230710090.jpg',
      archivo: 'Polish_20260822_230710090.jpg',
      descripcion: 'Fachada Exclusiva Boutique & Spa con arquitectura contemporánea'
    },
    renderHabitacion: {
      url: '/renders/image~12.jpg',
      archivo: 'image~12.jpg',
      descripcion: 'Habitación temática con plataforma de pole dance iluminada y acabados de diseño'
    },
    descripcionComercial: 'Máximo ticket promedio de estancia corta. Suites temáticas y de experiencia orientadas a fechas especiales y fines de semana.'
  },
  {
    id: 4,
    codigo: 'HOTEL-04',
    nombreSugerido: 'Villas & Suites Blue Ocean',
    direccionZona: 'Ecatepec / Vía Morelos',
    tarifa4h: 380,
    tarifa6h: 490,
    tarifaNoche: 680,
    tags: ['Portón Automático', 'Fácil Acceso', '4 Horas'],
    renderFachada: {
      url: '/renders/IMG-20260822-WA0018.jpg',
      archivo: 'IMG-20260822-WA0018.jpg',
      descripcion: 'Villas con cochera individual automatizada y privacidad garantizada'
    },
    renderHabitacion: {
      url: '/renders/image~13.jpg',
      archivo: 'image~13.jpg',
      descripcion: 'Suite con baño de vapor, tina y área de descanso privado'
    },
    descripcionComercial: 'Enfoque de máxima rotación en corredor metropolitano. Check-in vehicular rápido sin contacto con recepción.'
  },
  {
    id: 5,
    codigo: 'HOTEL-05',
    nombreSugerido: 'Blue Ocean Luxury Palace',
    direccionZona: 'Zona Oriente / Calzada Ignacio Zaragoza',
    tarifa4h: 520,
    tarifa6h: 680,
    tarifaNoche: 920,
    tags: ['Vapor Húmedo', 'Jacuzzi', 'Cama King Size'],
    renderFachada: {
      url: '/renders/image~2.jpg',
      archivo: 'image~2.jpg',
      descripcion: 'Acceso vehicular discreto y fachada moderna con iluminación perimetral'
    },
    renderHabitacion: {
      url: '/renders/image~14.jpg',
      archivo: 'image~14.jpg',
      descripcion: 'Habitación ejecutiva y romance con domótica y control táctil de luces'
    },
    descripcionComercial: 'Propiedad con áreas amplias, sistema de sonido ambiental por bluetooth y acabados en madera y cantera.'
  },
  {
    id: 6,
    codigo: 'HOTEL-06',
    nombreSugerido: 'Blue Ocean Express Toreo',
    direccionZona: 'Naucalpan / Periférico Toreo',
    tarifa4h: 450,
    tarifa6h: 590,
    tarifaNoche: 800,
    tags: ['Cochera Techada', 'Sillón Curvo', 'Smart TV 55"'],
    renderFachada: {
      url: '/renders/image~4.jpg',
      archivo: 'image~4.jpg',
      descripcion: 'Fachada corporativa y de estancia corta en corredor comercial'
    },
    renderHabitacion: {
      url: '/renders/image~15.jpg',
      archivo: 'image~15.jpg',
      descripcion: 'Suite ejecutiva de paso con cama king, sillón ergonómico y conectividad'
    },
    descripcionComercial: 'Ubicación clave para ejecutivos, viajeros y parejas. Ocupación balanceada entre semana y alta demanda nocturna.'
  }
];

export interface RenderItem {
  id: number;
  archivo: string;
  url: string;
  tituloSugerido: string;
  categoria: 'Fachada / Acceso' | 'Suite Jacuzzi' | 'Suite Cama & Espejos' | 'Suite Temática / Neón' | 'Villas / General';
  usoActual?: string;
}

export const TODOS_LOS_35_RENDERS: RenderItem[] = [
  { id: 1, archivo: 'Polish_20260822_225309771.jpg', url: '/renders/Polish_20260822_225309771.jpg', tituloSugerido: 'Fachada Principal Insignia (Blue Ocean Iluminado)', categoria: 'Fachada / Acceso', usoActual: 'Hotel 01 (Fachada)' },
  { id: 2, archivo: 'Polish_20260822_230305219.jpg', url: '/renders/Polish_20260822_230305219.jpg', tituloSugerido: 'Fachada Cristal & Luz Nocturna Blue Ocean', categoria: 'Fachada / Acceso', usoActual: 'Hotel 02 (Fachada)' },
  { id: 3, archivo: 'Polish_20260822_230710090.jpg', url: '/renders/Polish_20260822_230710090.jpg', tituloSugerido: 'Fachada Perspectiva Acceso Moderno', categoria: 'Fachada / Acceso', usoActual: 'Hotel 03 (Fachada)' },
  { id: 4, archivo: 'IMG-20260822-WA0018.jpg', url: '/renders/IMG-20260822-WA0018.jpg', tituloSugerido: 'Fachada Villas y Acceso Vehicular Privado', categoria: 'Fachada / Acceso', usoActual: 'Hotel 04 (Fachada)' },
  { id: 5, archivo: 'image~2.jpg', url: '/renders/image~2.jpg', tituloSugerido: 'Fachada / Entrada Discreta Perimetral', categoria: 'Fachada / Acceso', usoActual: 'Hotel 05 (Fachada)' },
  { id: 6, archivo: 'image~4.jpg', url: '/renders/image~4.jpg', tituloSugerido: 'Fachada Urbana / Corredor Comercial', categoria: 'Fachada / Acceso', usoActual: 'Hotel 06 (Fachada)' },
  { id: 7, archivo: 'image~3.jpg', url: '/renders/image~3.jpg', tituloSugerido: 'Suite de Diseño Elegante 03', categoria: 'Suite Cama & Espejos' },
  { id: 8, archivo: 'image~7.jpg', url: '/renders/image~7.jpg', tituloSugerido: 'Suite Iluminación Cálida y Confort 07', categoria: 'Suite Cama & Espejos' },
  { id: 9, archivo: 'image~8.jpg', url: '/renders/image~8.jpg', tituloSugerido: 'Suite Amplia con Detalles en Madera 08', categoria: 'Suite Cama & Espejos' },
  { id: 10, archivo: 'image~9.jpg', url: '/renders/image~9.jpg', tituloSugerido: 'Suite Estilo Nórdico Contemporáneo 09', categoria: 'Suite Cama & Espejos' },
  { id: 11, archivo: 'image~10.jpg', url: '/renders/image~10.jpg', tituloSugerido: 'Master Suite Jacuzzi & Luces Neón 10', categoria: 'Suite Jacuzzi', usoActual: 'Hotel 01 (Habitación)' },
  { id: 12, archivo: 'image~11.jpg', url: '/renders/image~11.jpg', tituloSugerido: 'Suite Tina de Hidromasaje & Espejos 11', categoria: 'Suite Jacuzzi', usoActual: 'Hotel 02 (Habitación)' },
  { id: 13, archivo: 'image~12.jpg', url: '/renders/image~12.jpg', tituloSugerido: 'Suite Temática & Barra Pole Dance 12', categoria: 'Suite Temática / Neón', usoActual: 'Hotel 03 (Habitación)' },
  { id: 14, archivo: 'image~13.jpg', url: '/renders/image~13.jpg', tituloSugerido: 'Suite Baño de Vapor & Confort 13', categoria: 'Suite Jacuzzi', usoActual: 'Hotel 04 (Habitación)' },
  { id: 15, archivo: 'image~14.jpg', url: '/renders/image~14.jpg', tituloSugerido: 'Suite Domótica & Sonido Bluetooth 14', categoria: 'Suite Temática / Neón', usoActual: 'Hotel 05 (Habitación)' },
  { id: 16, archivo: 'image~15.jpg', url: '/renders/image~15.jpg', tituloSugerido: 'Suite Ejecutiva Cama King & Sillón 15', categoria: 'Suite Cama & Espejos', usoActual: 'Hotel 06 (Habitación)' },
  { id: 17, archivo: 'image~16.jpg', url: '/renders/image~16.jpg', tituloSugerido: 'Suite Torre con Vista Panorámica 16', categoria: 'Suite Cama & Espejos' },
  { id: 18, archivo: 'image~17.jpg', url: '/renders/image~17.jpg', tituloSugerido: 'Suite Romance & Acento Íntimo 17', categoria: 'Suite Temática / Neón' },
  { id: 19, archivo: 'image~18.jpg', url: '/renders/image~18.jpg', tituloSugerido: 'Suite con Iluminación Rasante 18', categoria: 'Suite Cama & Espejos' },
  { id: 20, archivo: 'image~19.jpg', url: '/renders/image~19.jpg', tituloSugerido: 'Suite Cabecera Acolchada de Lujo 19', categoria: 'Suite Cama & Espejos' },
  { id: 21, archivo: 'image~20.jpg', url: '/renders/image~20.jpg', tituloSugerido: 'Villa con Cochera Techada Integrada 20', categoria: 'Villas / General' },
  { id: 22, archivo: 'image~21.jpg', url: '/renders/image~21.jpg', tituloSugerido: 'Suite Ejecutiva Minimalista 21', categoria: 'Suite Cama & Espejos' },
  { id: 23, archivo: 'image~22.jpg', url: '/renders/image~22.jpg', tituloSugerido: 'Suite con Barra de Cortesía 22', categoria: 'Suite Temática / Neón' },
  { id: 24, archivo: 'image~25.jpg', url: '/renders/image~25.jpg', tituloSugerido: 'Suite Contraste Urbano & Confort 25', categoria: 'Suite Cama & Espejos' },
  { id: 25, archivo: 'image~26.jpg', url: '/renders/image~26.jpg', tituloSugerido: 'Suite Spa & Tina Integrada 26', categoria: 'Suite Jacuzzi' },
  { id: 26, archivo: 'image~27.jpg', url: '/renders/image~27.jpg', tituloSugerido: 'Suite Espejos & Perspectiva Visual 27', categoria: 'Suite Temática / Neón' },
  { id: 27, archivo: 'image~28.jpg', url: '/renders/image~28.jpg', tituloSugerido: 'Suite Geometría y Luz Suave 28', categoria: 'Suite Cama & Espejos' },
  { id: 28, archivo: 'image~29.jpg', url: '/renders/image~29.jpg', tituloSugerido: 'Suite Detalle de Cabecera Acentuada 29', categoria: 'Suite Temática / Neón' },
  { id: 29, archivo: 'image~30.jpg', url: '/renders/image~30.jpg', tituloSugerido: 'Suite Ambiente Cálido y Privacidad 30', categoria: 'Suite Cama & Espejos' },
  { id: 30, archivo: 'image~33.jpg', url: '/renders/image~33.jpg', tituloSugerido: 'Suite Living & Cama King 33', categoria: 'Suite Cama & Espejos' },
  { id: 31, archivo: 'image~34.jpg', url: '/renders/image~34.jpg', tituloSugerido: 'Suite Confort & Espacio Amplio 34', categoria: 'Suite Cama & Espejos' },
  { id: 32, archivo: 'image~36.jpg', url: '/renders/image~36.jpg', tituloSugerido: 'Suite Jacuzzi Doble Nivel 36', categoria: 'Suite Jacuzzi' },
  { id: 33, archivo: 'image~37.jpg', url: '/renders/image~37.jpg', tituloSugerido: 'Suite Espejo Cenital & Luz Neón 37', categoria: 'Suite Temática / Neón' },
  { id: 34, archivo: 'image~38.jpg', url: '/renders/image~38.jpg', tituloSugerido: 'Suite Acabados en Mármol & Granito 38', categoria: 'Suite Cama & Espejos' },
  { id: 35, archivo: 'IMG-20260530-WA0001.jpg', url: '/renders/IMG-20260530-WA0001.jpg', tituloSugerido: 'Render Fachada / Acceso Pórtico Adicional', categoria: 'Fachada / Acceso' }
];

export function HotelDirectoryShowcaseView({ 
  onSelectHotelForBooking,
  onGoToMethodology 
}: { 
  onSelectHotelForBooking?: () => void;
  onGoToMethodology?: () => void;
}) {
  // Modo de visualización: catálogo por hotel o inventario de todos los renders
  const [viewMode, setViewMode] = useState<'hoteles' | 'galeria35'>('galeria35');
  
  // Estado de los hoteles (para que el usuario pueda cambiar nombres si lo desea)
  const [hotelsList, setHotelsList] = useState<ModelHotel[]>(PROPIEDADES_MODELO);
  const [selectedHotel, setSelectedHotel] = useState<ModelHotel | null>(null);
  const [modalActivePhoto, setModalActivePhoto] = useState<'fachada' | 'habitacion'>('fachada');
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  // Filtro de categoría dentro de la galería de 35 renders
  const [filtroCategoriaRender, setFiltroCategoriaRender] = useState<string>('TODAS');

  // Filtros dinámicos del Buscador de Hoteles
  const [filterZona, setFilterZona] = useState<string>('TODAS');
  const [filterModalidad, setFilterModalidad] = useState<string>('TODAS');
  const [filterAmenidad, setFilterAmenidad] = useState<string>('TODAS');
  const [filterMaxPrecio, setFilterMaxPrecio] = useState<number>(1000);

  // Lógica de filtrado en tiempo real
  const filteredHotels = hotelsList.filter(hotel => {
    // Filtro por Zona
    if (filterZona !== 'TODAS' && !hotel.direccionZona.toLowerCase().includes(filterZona.toLowerCase())) {
      return false;
    }

    // Filtro por Modalidad (4 horas, 6 horas, 8 horas, 12 horas o Noche completa)
    if (filterModalidad === '4H' && hotel.tarifa4h > filterMaxPrecio) return false;
    if (filterModalidad === '6H' && hotel.tarifa6h > filterMaxPrecio) return false;
    if (filterModalidad === '8H' && hotel.tarifa8h > filterMaxPrecio) return false;
    if (filterModalidad === '12H' && hotel.tarifa12h > filterMaxPrecio) return false;
    if (filterModalidad === 'NOCHE' && hotel.tarifaNoche > filterMaxPrecio) return false;

    // Filtro por Amenidad
    if (filterAmenidad === 'JACUZZI' && !hotel.tags.some(t => t.toLowerCase().includes('jacuzzi'))) {
      return false;
    }
    if (filterAmenidad === 'COCHERA' && !hotel.tags.some(t => t.toLowerCase().includes('cochera') || t.toLowerCase().includes('portón'))) {
      return false;
    }
    if (filterAmenidad === 'TANTRICO' && !hotel.tags.some(t => t.toLowerCase().includes('tántrico') || t.toLowerCase().includes('curvo') || t.toLowerCase().includes('pole'))) {
      return false;
    }

    // Filtro por Precio Máximo
    const referencePrice = filterModalidad === '6H' ? hotel.tarifa6h
      : filterModalidad === '8H' ? hotel.tarifa8h
      : filterModalidad === '12H' ? hotel.tarifa12h
      : filterModalidad === 'NOCHE' ? hotel.tarifaNoche
      : hotel.tarifa4h;

    if (referencePrice > filterMaxPrecio) {
      return false;
    }

    return true;
  });

  const resetFilters = () => {
    setFilterZona('TODAS');
    setFilterModalidad('TODAS');
    setFilterAmenidad('TODAS');
    setFilterMaxPrecio(1000);
  };

  // Navegación en el visor de pantalla completa
  const nextImage = () => {
    if (fullscreenIndex !== null) {
      setFullscreenIndex((fullscreenIndex + 1) % TODOS_LOS_35_RENDERS.length);
    }
  };

  const prevImage = () => {
    if (fullscreenIndex !== null) {
      setFullscreenIndex((fullscreenIndex - 1 + TODOS_LOS_35_RENDERS.length) % TODOS_LOS_35_RENDERS.length);
    }
  };

  // Soporte para navegar con teclado (flechas y escape)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (fullscreenIndex === null) return;
      if (e.key === 'ArrowRight') {
        setFullscreenIndex((prev) => (prev !== null ? (prev + 1) % TODOS_LOS_35_RENDERS.length : null));
      } else if (e.key === 'ArrowLeft') {
        setFullscreenIndex((prev) => (prev !== null ? (prev - 1 + TODOS_LOS_35_RENDERS.length) % TODOS_LOS_35_RENDERS.length : null));
      } else if (e.key === 'Escape') {
        setFullscreenIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenIndex]);

  // Filtrado de renders en la galería de 35
  const rendersFiltrados = TODOS_LOS_35_RENDERS.filter(r => {
    if (filtroCategoriaRender === 'TODAS') return true;
    return r.categoria === filtroCategoriaRender;
  });


  return (
    <div className="min-h-screen bg-[#edf1f6] text-slate-800 font-sans pb-16">

      {/* ========================================================= */}
      {/* 1. HERO EN AZUL MARINO EXCLUSIVO (#002244) CON BUSCADOR TIPO BOOKING */}
      {/* ========================================================= */}
      <section className="bg-[#002244] text-white border-b-4 border-[#d4af37] shadow-xl relative overflow-hidden">
        {/* Fondo decorativo sutil */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 relative z-10">
          
          {/* Encabezado del Hero */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-blue-800/40">
            <div className="text-center md:text-left space-y-1">
              <span className="inline-block px-3 py-0.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f5d77f] text-xs font-mono font-bold tracking-widest uppercase">
                Metodología Total Revenue Management • L.C. Monroy
              </span>
              <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight text-white">
                Buscador de Hoteles y Villas de Estancia Corta
              </h1>
              <p className="text-xs sm:text-sm text-blue-100 max-w-2xl">
                Plataforma oficial de reserva directa y captación de demanda de alta rentabilidad en tiempo real.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <LCMLogo size="md" className="drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]" />
            </div>
          </div>

          {/* ======================================================= */}
          {/* BARRA DE BÚSQUEDA DINÁMICA (TIPO BOOKING PENSADA PARA EL NEGOCIO) */}
          {/* ======================================================= */}
          <div className="mt-6 bg-[#00172e] border-2 border-[#d4af37]/70 rounded-2xl p-4 sm:p-5 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              
              {/* Filtro 1: Destino / Zona */}
              <div className="bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl p-3 transition flex flex-col justify-between">
                <label className="text-[10px] font-mono uppercase text-[#f5d77f] font-bold flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Destino / Zona</span>
                </label>
                <select
                  value={filterZona}
                  onChange={(e) => setFilterZona(e.target.value)}
                  className="bg-slate-900 text-white text-xs font-semibold rounded-lg p-2 border border-blue-400/40 focus:outline-none focus:ring-2 focus:ring-[#d4af37] w-full"
                >
                  <option value="TODAS">📍 Todas las Zonas (CDMX y Edo. Méx.)</option>
                  <option value="Insurgentes">📍 Insurgentes Norte / GAM</option>
                  <option value="Tlalnepantla">📍 Tlalnepantla / Periférico Norte</option>
                  <option value="Tlalpan">📍 Calzada de Tlalpan / Sur</option>
                  <option value="Ecatepec">📍 Ecatepec / Vía Morelos</option>
                  <option value="Oriente">📍 Zona Oriente / Zaragoza</option>
                  <option value="Naucalpan">📍 Naucalpan / Toreo</option>
                </select>
              </div>

              {/* Filtro 2: Modalidad de Tiempo */}
              <div className="bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl p-3 transition flex flex-col justify-between">
                <label className="text-[10px] uppercase text-[#f5d77f] font-bold flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Modalidad de Estancia</span>
                </label>
                <select
                  value={filterModalidad}
                  onChange={(e) => setFilterModalidad(e.target.value)}
                  className="bg-slate-900 text-white text-xs font-semibold rounded-lg p-2 border border-blue-400/40 focus:outline-none focus:ring-2 focus:ring-[#d4af37] w-full"
                >
                  <option value="TODAS">⏱️ Cualquier Modalidad</option>
                  <option value="4H">⏱️ 4 Horas</option>
                  <option value="6H">⏱️ 6 Horas</option>
                  <option value="8H">⏱️ 8 Horas</option>
                  <option value="12H">⏱️ 12 Horas</option>
                  <option value="NOCHE">🌙 Noche Completa</option>
                </select>
              </div>

              {/* Filtro 3: Amenidad Clave */}
              <div className="bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl p-3 transition flex flex-col justify-between">
                <label className="text-[10px] uppercase text-[#f5d77f] font-bold flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Amenidad / Tipo</span>
                </label>
                <select
                  value={filterAmenidad}
                  onChange={(e) => setFilterAmenidad(e.target.value)}
                  className="bg-slate-900 text-white text-xs font-semibold rounded-lg p-2 border border-blue-400/40 focus:outline-none focus:ring-2 focus:ring-[#d4af37] w-full"
                >
                  <option value="TODAS">✨ Todas las Amenidades</option>
                  <option value="JACUZZI">🛁 Con Jacuzzi / Hidromasaje</option>
                  <option value="COCHERA">🚗 Villa con Cochera Privada</option>
                  <option value="TANTRICO">🛋️ Sillón Tántrico / Pole Dance</option>
                </select>
              </div>

              {/* Filtro 4: Rango de Tarifa */}
              <div className="bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl p-3 transition flex flex-col justify-between">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] uppercase text-[#f5d77f] font-bold flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Presupuesto:</span>
                  </label>
                  <span className="text-xs font-bold text-white">Hasta ${filterMaxPrecio}</span>
                </div>
                <input 
                  type="range"
                  min={280}
                  max={1000}
                  step={20}
                  value={filterMaxPrecio}
                  onChange={(e) => setFilterMaxPrecio(Number(e.target.value))}
                  className="w-full accent-[#d4af37] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-blue-200 mt-1 font-semibold">
                  <span>Desde $280</span>
                  <span>Hasta $1,000 MXN</span>
                </div>
              </div>

            </div>

            {/* Fila Inferior del Buscador: Resumen y Botón de Reset */}
            <div className="mt-4 pt-3 border-t border-blue-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-blue-100">
                  Mostrando <strong className="text-white font-mono text-sm">{filteredHotels.length}</strong> de {hotelsList.length} propiedades con disponibilidad inmediata
                </span>
              </div>

              {(filterZona !== 'TODAS' || filterModalidad !== 'TODAS' || filterAmenidad !== 'TODAS' || filterMaxPrecio < 1000) && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 text-[#f5d77f] hover:text-white transition font-mono text-xs underline cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Limpiar Filtros</span>
                </button>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. CUERPO EN FONDO CLARO (#fcfbf9) CON LAS TARJETAS DE PROPIEDADES */}
      {/* ========================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* ======================================================= */}
        {/* SELECTOR MAESTRO DE VISTA: GALERÍA DE 35 RENDERS vs CATÁLOGO DE HOTELES */}
        {/* ======================================================= */}
        <div className="mb-8 p-3 rounded-3xl bg-white border border-slate-300 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setViewMode('galeria35')}
              className={`py-3 px-5 rounded-2xl font-black text-xs transition-all flex items-center gap-2.5 cursor-pointer shadow-sm ${
                viewMode === 'galeria35'
                  ? 'bg-[#002244] text-[#f5d77f] ring-2 ring-[#d4af37]'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Grid className="w-4 h-4 text-[#d4af37]" />
              <span>🖼️ Galería Visual de TODOS los 35 Renders (Ver fotos en grande)</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#d4af37]/30 text-[#f5d77f] font-mono font-bold">
                35 Fotos
              </span>
            </button>

            <button
              onClick={() => setViewMode('hoteles')}
              className={`py-3 px-5 rounded-2xl font-black text-xs transition-all flex items-center gap-2.5 cursor-pointer shadow-sm ${
                viewMode === 'hoteles'
                  ? 'bg-[#002244] text-[#f5d77f] ring-2 ring-[#d4af37]'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#d4af37]" />
              <span>🏨 Catálogo de 6 Hoteles Modelo (Fachada + Suite)</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#002244]/10 text-slate-800 font-mono font-bold">
                6 Hoteles
              </span>
            </button>
          </div>

          <div className="text-xs text-slate-600 font-mono text-center md:text-right">
            <span>✨ Haz clic en cualquier imagen para abrirla en <strong>Pantalla Completa con Flechas</strong></span>
          </div>
        </div>

        {/* ======================================================= */}
        {/* MODO 1: GALERÍA VISUAL DE TODOS LOS 35 RENDERS CON ZOOM */}
        {/* ======================================================= */}
        {viewMode === 'galeria35' && (
          <div className="space-y-6">
            {/* Barra de Filtros por Categoría */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-700 mr-1 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-blue-900" />
                  Filtrar por Tipo:
                </span>
                {[
                  { key: 'TODAS', label: 'Todas las Fotos (35)' },
                  { key: 'Fachada / Acceso', label: 'Fachadas y Accesos (7)' },
                  { key: 'Suite Jacuzzi', label: 'Suites con Jacuzzi (5)' },
                  { key: 'Suite Cama & Espejos', label: 'Suites Cama & Espejos (14)' },
                  { key: 'Suite Temática / Neón', label: 'Suites Temáticas / Neón (8)' },
                  { key: 'Villas / General', label: 'Villas con Cochera (1)' }
                ].map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setFiltroCategoriaRender(cat.key)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      filtroCategoriaRender === cat.key
                        ? 'bg-[#002244] text-[#f5d77f] shadow'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="text-xs font-mono text-slate-500">
                Mostrando <strong className="text-slate-900 font-bold">{rendersFiltrados.length}</strong> de {TODOS_LOS_35_RENDERS.length} fotos reales
              </div>
            </div>

            {/* Cuadrícula Visual de los 35 Renders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {rendersFiltrados.map((render, idx) => {
                const globalIndex = TODOS_LOS_35_RENDERS.findIndex(r => r.id === render.id);
                return (
                  <div
                    key={render.id}
                    onClick={() => setFullscreenIndex(globalIndex !== -1 ? globalIndex : idx)}
                    className="group bg-white rounded-2xl border border-slate-200 hover:border-[#d4af37] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      {/* Imagen con zoom y badges */}
                      <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                        <img 
                          src={render.url} 
                          alt={render.tituloSugerido}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Número de Foto */}
                        <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-sm text-[#f5d77f] font-mono text-xs font-bold border border-white/10 shadow">
                          #{String(render.id).padStart(2, '0')}
                        </div>

                        {/* Botón de Zoom Flotante */}
                        <div className="absolute bottom-2 right-2 p-2 rounded-xl bg-black/75 hover:bg-black text-white text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition shadow backdrop-blur-sm">
                          <Maximize2 className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span className="font-semibold text-[11px]">Ver Grande</span>
                        </div>

                        {/* Etiqueta de uso en Hotel si aplica */}
                        {render.usoActual && (
                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-emerald-700/90 text-white font-mono text-[10px] font-bold shadow">
                            ✓ {render.usoActual}
                          </div>
                        )}
                      </div>

                      {/* Información Detallada */}
                      <div className="p-3.5">
                        <span className="inline-block text-[10px] font-mono uppercase text-[#002244] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-bold mb-1.5">
                          {render.categoria}
                        </span>

                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-900 transition leading-snug line-clamp-2">
                          {render.tituloSugerido}
                        </h4>

                        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                          <span className="truncate max-w-[170px]" title={render.archivo}>📁 {render.archivo}</span>
                          <span className="text-[#002244] font-bold group-hover:translate-x-0.5 transition-transform">Ver en HD →</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* MODO 2: CATÁLOGO DE LOS 6 HOTELES MODELO (FACHADA + HABITACIÓN) */}
        {/* ======================================================= */}
        {viewMode === 'hoteles' && (
          <div>
            {/* Barra de Notificación y Aclaración sobre Nombres y Direcciones */}
            <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-amber-900">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-amber-200/80 text-amber-900 font-bold">
                  📸 Catálogo por Propiedad
                </span>
                <div>
                  <p className="font-bold text-slate-900">
                    Cada tarjeta muestra 2 Renders Reales: [1 Fachada Oficial] y [1 Habitación / Suite]
                  </p>
                  <p className="text-amber-800">
                    Los nombres y direcciones actuales son de referencia visual para que me indiques los definitivos.
                  </p>
                </div>
              </div>

              {onGoToMethodology && (
                <button
                  onClick={onGoToMethodology}
                  className="px-4 py-2 rounded-xl bg-[#002244] hover:bg-blue-900 text-[#f5d77f] font-bold text-xs transition shrink-0 shadow"
                >
                  Ver Metodología Total Revenue →
                </button>
              )}
            </div>

            {/* GRID DE HOTELES (2 RENDERS POR TARJETA: FACHADA + HABITACIÓN) */}
            {filteredHotels.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No encontramos propiedades con esos filtros</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Prueba ampliando la zona o el presupuesto.</p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-full bg-[#002244] text-[#f5d77f] text-xs font-bold shadow hover:bg-blue-900 transition"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Encabezado de la Tarjeta con Código y Nombre */}
                  <div className="p-5 pb-3 border-b border-slate-100 flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-[#002244] font-mono text-[10px] font-bold border border-blue-100">
                          {hotel.codigo}
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 font-serif">
                          {hotel.nombreSugerido}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                        <span>{hotel.direccionZona}</span>
                      </p>
                    </div>

                    <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-1 rounded font-bold shrink-0">
                      Hotel Activo
                    </span>
                  </div>

                  {/* PAR DE RENDERS: [1 FACHADA] Y [1 HABITACIÓN] */}
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 border-b border-slate-100">
                    
                    {/* 1. RENDER DE FACHADA */}
                    <div 
                      onClick={() => {
                        setSelectedHotel(hotel);
                        setModalActivePhoto('fachada');
                      }}
                      className="group cursor-pointer relative rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-[#d4af37] aspect-[4/3] bg-slate-900 transition-all shadow-sm"
                    >
                      <img 
                        src={hotel.renderFachada.url} 
                        alt={`Fachada - ${hotel.nombreSugerido}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm text-[#f5d77f] font-mono text-[10px] font-bold border border-white/20">
                        1. FACHADA
                      </div>
                      <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-2">
                        <p className="text-[10px] font-mono text-zinc-300 truncate">
                          📁 {hotel.renderFachada.archivo}
                        </p>
                      </div>
                    </div>

                    {/* 2. RENDER DE HABITACIÓN / SUITE */}
                    <div 
                      onClick={() => {
                        setSelectedHotel(hotel);
                        setModalActivePhoto('habitacion');
                      }}
                      className="group cursor-pointer relative rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-[#d4af37] aspect-[4/3] bg-slate-900 transition-all shadow-sm"
                    >
                      <img 
                        src={hotel.renderHabitacion.url} 
                        alt={`Habitación - ${hotel.nombreSugerido}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-blue-950/85 backdrop-blur-sm text-cyan-300 font-mono text-[10px] font-bold border border-white/20">
                        2. HABITACIÓN
                      </div>
                      <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-2">
                        <p className="text-[10px] font-mono text-zinc-300 truncate">
                          📁 {hotel.renderHabitacion.archivo}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Detalle y Etiquetas de Amenidades */}
                  <div className="p-5 space-y-4">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {hotel.descripcionComercial}
                    </p>

                    {/* Tags de Amenidades sin estrellas */}
                    <div className="flex flex-wrap gap-1.5">
                      {hotel.tags.map((tag, idx) => (
                        <span 
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold border border-slate-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bloque de Tarifas Dinámicas (Por Hora vs Noche) */}
                    <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono uppercase text-blue-900 font-bold block">
                          ⏱️ Renta 4 Horas
                        </span>
                        <div className="text-base sm:text-lg font-black font-mono text-blue-950">
                          ${hotel.tarifa4h} <span className="text-xs font-normal text-slate-500">MXN</span>
                        </div>
                        <span className="text-[10px] text-slate-500 block">Horas muertas / Alta rotación</span>
                      </div>

                      <div className="space-y-0.5 border-l border-blue-200 pl-3">
                        <span className="text-[10px] font-mono uppercase text-slate-600 font-bold block">
                          🌙 Noche Completa
                        </span>
                        <div className="text-base sm:text-lg font-black font-mono text-slate-900">
                          ${hotel.tarifaNoche} <span className="text-xs font-normal text-slate-500">MXN</span>
                        </div>
                        <span className="text-[10px] text-slate-500 block">Check-in nocturno</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pie de Tarjeta: Botón de Acción */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => {
                      setSelectedHotel(hotel);
                      setModalActivePhoto('fachada');
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-[#002244] hover:bg-blue-900 text-[#f5d77f] font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Ver Ficha Técnica y Renders en Grande</span>
                    <span>→</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
          </div>
        )}

        {/* ========================================================= */}
        {/* BARRA DE PROCESOS Y FILOSOFÍA BLUE OCEAN */}
        {/* ========================================================= */}
        <section className="mt-16 pt-12 border-t border-slate-300">
          <div className="text-center mb-8">
            <span className="text-[#002244] font-mono text-xs uppercase tracking-widest font-bold block mb-1">
              Arquitectura de Conversión • L.C. Monroy
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
              ¿Qué es el Sistema Integral BLUE OCEAN?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto mt-2 leading-relaxed">
              No inventamos herramientas tecnológicas; articulamos las que ya existen en una cadena de valor indivisible para gestionar y rentabilizar tus habitaciones vacías.
            </p>
          </div>

          {/* Pastillas de procesos estilizadas en paleta sobria */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto mb-10">
            <span className="px-3.5 py-2 rounded-xl bg-[#002244] text-[#f5d77f] font-bold text-xs shadow-sm">
              Inteligencia Artificial
            </span>
            <span className="px-3.5 py-2 rounded-xl bg-white text-slate-700 border border-slate-300 text-xs font-semibold shadow-sm">
              APIs Automatización
            </span>
            <span className="px-3.5 py-2 rounded-xl bg-white text-slate-700 border border-slate-300 text-xs font-semibold shadow-sm">
              Agentes de IA Generativa
            </span>
            <span className="px-3.5 py-2 rounded-xl bg-white text-slate-700 border border-slate-300 text-xs font-semibold shadow-sm">
              Pasarelas de Pago
            </span>
            <span className="px-3.5 py-2 rounded-xl bg-[#002244] text-[#f5d77f] font-bold text-xs shadow-sm">
              Visibilidad en Línea
            </span>
            <span className="px-3.5 py-2 rounded-xl bg-white text-slate-700 border border-slate-300 text-xs font-semibold shadow-sm">
              Nuevos Canales
            </span>
            <span className="px-3.5 py-2 rounded-xl bg-[#002244] text-[#f5d77f] font-bold text-xs shadow-sm">
              Pricing Dinámico
            </span>
            <span className="px-3.5 py-2 rounded-xl bg-white text-slate-700 border border-slate-300 text-xs font-semibold shadow-sm">
              Estrategias Revenue TRM
            </span>
          </div>

          {/* Tarjeta de Contacto Directo con Luis César Monroy */}
          <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-white border border-slate-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-[10px] font-mono uppercase text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                Línea Directa Oficial
              </span>
              <h4 className="text-base font-black text-slate-900 mt-1 font-serif">
                Atención para Propietarios y Hoteleros
              </h4>
              <p className="text-xs text-slate-500 font-mono">
                WhatsApp Business: +52 55 1230 5860
              </p>
            </div>
            <a
              href={`https://wa.me/525512305860?text=${encodeURIComponent(
                'Hola Luis César, vi el Directorio de Hoteles y Renders de Blue Ocean. Me interesa evaluar la afiliación de mi propiedad.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow flex items-center gap-2 shrink-0"
            >
              <span>Conversar por WhatsApp</span>
              <span>→</span>
            </a>
          </div>
        </section>

      </main>

      {/* ========================================================= */}
      {/* 3. MODAL INTERACTIVO CON DETALLES COMPLETOS (AL DAR CLIC EN "VER FICHA") */}
      {/* ========================================================= */}
      {selectedHotel && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8 border border-slate-200">
            
            {/* Botón Cerrar */}
            <button
              onClick={() => setSelectedHotel(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition"
            >
              ✕
            </button>

            {/* Encabezado del Modal */}
            <div className="mb-4">
              <span className="text-xs font-mono font-bold text-[#002244] uppercase tracking-wider">
                Ficha de Propiedad Modelo • {selectedHotel.codigo}
              </span>
              <h2 className="text-2xl font-black text-slate-900 font-serif">
                {selectedHotel.nombreSugerido}
              </h2>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-blue-900" />
                <span>{selectedHotel.direccionZona}</span>
              </p>
            </div>

            {/* Selector de Foto Activa (Fachada o Habitación) */}
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setModalActivePhoto('fachada')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                  modalActivePhoto === 'fachada'
                    ? 'bg-[#002244] text-[#f5d77f] shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>🏢 1. Fachada</span>
                <span className="text-[10px] font-mono opacity-80">({selectedHotel.renderFachada.archivo})</span>
              </button>

              <button
                onClick={() => setModalActivePhoto('habitacion')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                  modalActivePhoto === 'habitacion'
                    ? 'bg-[#002244] text-[#f5d77f] shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>🛏️ 2. Habitación / Suite</span>
                <span className="text-[10px] font-mono opacity-80">({selectedHotel.renderHabitacion.archivo})</span>
              </button>
            </div>

            {/* Visualizador de la Foto Seleccionada en Grande */}
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black shadow-md mb-4 border border-slate-200">
              <img 
                src={modalActivePhoto === 'fachada' ? selectedHotel.renderFachada.url : selectedHotel.renderHabitacion.url} 
                alt={selectedHotel.nombreSugerido}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => {
                  const activeUrl = modalActivePhoto === 'fachada' ? selectedHotel.renderFachada.url : selectedHotel.renderHabitacion.url;
                  const idx = TODOS_LOS_35_RENDERS.findIndex(r => r.url === activeUrl);
                  setFullscreenIndex(idx !== -1 ? idx : 0);
                }}
                className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/75 hover:bg-black text-white text-xs flex items-center gap-1.5 transition backdrop-blur-sm cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Pantalla Completa</span>
              </button>
              <div className="absolute top-3 left-3 bg-black/75 px-3 py-1 rounded-lg text-xs font-mono text-[#f5d77f]">
                {modalActivePhoto === 'fachada' ? selectedHotel.renderFachada.descripcion : selectedHotel.renderHabitacion.descripcion}
              </div>
            </div>

            {/* Tarifas y Propuesta para el Dueño */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">
                  Estructura Tarifaria Sugerida
                </span>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">⏱️ Estancia 4 Horas:</span>
                  <span className="font-mono font-bold text-slate-900">${selectedHotel.tarifa4h} MXN</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">⏱️ Estancia 6 Horas:</span>
                  <span className="font-mono font-bold text-slate-900">${selectedHotel.tarifa6h} MXN</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">🌙 Noche Completa:</span>
                  <span className="font-mono font-bold text-slate-900">${selectedHotel.tarifaNoche} MXN</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1.5 text-xs text-amber-950">
                <strong className="text-amber-900 block font-bold">Para el Propietario del Hotel:</strong>
                <p>
                  Esta vitrina comercial digital se monta para tu propiedad sin pagar software, licencias ni mensualidades fijas.
                </p>
                <p className="font-semibold text-blue-950 pt-1">
                  Esquema 100% a resultados con el 15% sobre ingresos adicionales comprobados.
                </p>
              </div>
            </div>

            {/* Botón de Contacto por WhatsApp */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/525512305860?text=${encodeURIComponent(
                  `Hola Luis César, vi la ficha y los renders de ${selectedHotel.nombreSugerido} (${selectedHotel.codigo}). Me interesa validar mi hotel bajo este modelo.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-4 rounded-xl bg-[#002244] hover:bg-blue-900 text-[#f5d77f] font-black text-xs uppercase tracking-wider transition-all text-center shadow-lg"
              >
                ¿Quieres que este sea tu hotel? Contáctanos por WhatsApp →
              </a>

              <button
                onClick={() => setSelectedHotel(null)}
                className="py-3.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
              >
                Cerrar Ficha
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. MODAL DE PANTALLA COMPLETA INTERACTIVO (SLIDER 35 RENDERS) */}
      {/* ========================================================= */}
      {fullscreenIndex !== null && TODOS_LOS_35_RENDERS[fullscreenIndex] && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-3 sm:p-6 backdrop-blur-md"
        >
          {/* Header Superior del Visor */}
          <div className="w-full max-w-6xl flex items-center justify-between text-white pb-3 border-b border-white/10 z-10">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#d4af37] text-black font-bold text-xs shadow">
                Render {fullscreenIndex + 1} de {TODOS_LOS_35_RENDERS.length}
              </span>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <span>{TODOS_LOS_35_RENDERS[fullscreenIndex].tituloSugerido}</span>
                  <span className="text-[11px] font-semibold text-[#f5d77f] px-2 py-0.5 rounded bg-white/10 hidden sm:inline-block">
                    {TODOS_LOS_35_RENDERS[fullscreenIndex].categoria}
                  </span>
                </h4>
                <p className="text-xs text-zinc-300 font-medium">
                  {TODOS_LOS_35_RENDERS[fullscreenIndex].usoActual ? (
                    <span className="text-emerald-400 font-bold">
                      ✓ {TODOS_LOS_35_RENDERS[fullscreenIndex].usoActual}
                    </span>
                  ) : (
                    <span>Render Arquitectónico Oficial Blue Ocean</span>
                  )}
                </p>
              </div>
            </div>

            <button 
              onClick={() => setFullscreenIndex(null)}
              className="text-white hover:text-[#f5d77f] bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition cursor-pointer"
              title="Cerrar visor (Esc)"
            >
              ✕
            </button>
          </div>

          {/* Imagen Central con Flechas Laterales */}
          <div className="relative w-full max-w-6xl flex-1 flex items-center justify-center my-2 sm:my-4 overflow-hidden">
            {/* Flecha Anterior */}
            <button
              onClick={prevImage}
              className="absolute left-1 sm:left-4 z-20 p-2.5 sm:p-4 rounded-full bg-black/70 hover:bg-[#002244] text-[#f5d77f] hover:text-white border border-white/20 transition cursor-pointer shadow-xl active:scale-95"
              title="Foto anterior (←)"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Imagen Principal en Alta Resolución */}
            <img 
              src={TODOS_LOS_35_RENDERS[fullscreenIndex].url} 
              alt={TODOS_LOS_35_RENDERS[fullscreenIndex].tituloSugerido} 
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl transition-all"
            />

            {/* Flecha Siguiente */}
            <button
              onClick={nextImage}
              className="absolute right-1 sm:right-4 z-20 p-2.5 sm:p-4 rounded-full bg-black/70 hover:bg-[#002244] text-[#f5d77f] hover:text-white border border-white/20 transition cursor-pointer shadow-xl active:scale-95"
              title="Foto siguiente (→)"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>

          {/* Barra Inferior del Visor con Controles */}
          <div className="w-full max-w-6xl flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs text-zinc-400 font-mono z-10">
            <div className="flex items-center gap-2">
              <span className="hidden md:inline">Tip: Usa las flechas de tu teclado <strong>(← / →)</strong> para pasar las fotos rápidamente.</span>
            </div>

            <div className="flex items-center gap-2 ml-auto sm:ml-0">
              <button
                onClick={prevImage}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center gap-1 cursor-pointer transition"
              >
                <ChevronLeft className="w-4 h-4" /> Anterior
              </button>
              <button
                onClick={nextImage}
                className="px-3.5 py-1.5 rounded-xl bg-[#d4af37] hover:bg-amber-300 text-black font-bold flex items-center gap-1 cursor-pointer transition shadow"
              >
                Siguiente <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setFullscreenIndex(null)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-zinc-300 font-bold cursor-pointer transition"
              >
                Cerrar (Esc)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
