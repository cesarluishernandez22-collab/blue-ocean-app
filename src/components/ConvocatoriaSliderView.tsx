import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  DollarSign,
  Building2,
  Sparkles,
  Clock,
  MapPin,
  TrendingUp,
  BarChart3,
  Maximize2,
  X,
  CheckCircle2,
  Quote,
  ShieldCheck,
  Compass,
  Truck,
  ArrowUpRight,
  Sliders,
  Send,
  Calendar,
  Layers,
  ArrowRight,
  Eye,
  Check,
  Percent,
  CreditCard,
  MessageCircle
} from 'lucide-react';
import { LCMLogo } from './LCMLogo';
import { OnlinePaymentModal } from './OnlinePaymentModal';
import { SlideMediaBox } from './SlideMediaBox';
import { SlideImagesBatchModal } from './SlideImagesBatchModal';

interface ConvocatoriaSliderViewProps {
  onGoToHotels?: () => void;
  onGoToPortal?: () => void;
  externalContactOpen?: boolean;
  setExternalContactOpen?: (open: boolean) => void;
  targetSlide?: number | null;
  onResetTargetSlide?: () => void;
  onOpenChatbot?: () => void;
}

interface Slide1Hotel {
  id: number;
  codigo: string;
  nombre: string;
  zona: string;
  tarifa4h: number;
  tarifa6h: number;
  tarifaNoche: number;
  categoria: 'Insignia' | 'Express' | 'Jacuzzi & Spa' | 'Villas';
  tag: string;
  imgFachada: string;
  imgHabitacion: string;
  demanda: string;
  descripcion: string;
}

// 6 Hoteles Reales de la Red Modelo (Luis César Monroy)
const SLIDE1_PROPIEDADES: Slide1Hotel[] = [
  {
    id: 1,
    codigo: 'HOTEL EXCALIBUR',
    nombre: 'HOTEL EXCALIBUR',
    zona: 'Londres 117 Col. Juárez (Zona Rosa / Reforma)',
    tarifa4h: 480,
    tarifa6h: 620,
    tarifaNoche: 850,
    categoria: 'Insignia',
    tag: 'Jacuzzi Doble • Luz Neón',
    imgFachada: '/renders/hotel-01-insurgentes/fachada/Polish_20260822_225309771.jpg',
    imgHabitacion: '/renders/hotel-01-insurgentes/habitacion/image~7.jpg',
    demanda: 'Alta Rotación',
    descripcion: 'Excelente ubicación a solo unos pasos de Av. Reforma. Servicio de alimentos, tina de hidromasaje y acceso automatizado.'
  },
  {
    id: 2,
    codigo: 'HOTEL NOVOA',
    nombre: 'HOTEL NOVOA',
    zona: 'Virginia Fábregas 14 Col. San Rafael',
    tarifa4h: 320,
    tarifa6h: 360,
    tarifaNoche: 780,
    categoria: 'Express',
    tag: 'Sillón Tántrico • Torre',
    imgFachada: '/renders/hotel-02-periferico/fachada/Polish_20260822_230305219.jpg',
    imgHabitacion: '/renders/hotel-02-periferico/habitacion/image~12.jpg',
    demanda: 'Optimizado IA',
    descripcion: 'Fachada e interiores de reciente remodelación. Diseñado para parejas y estancias exprés con pricing dinámico en horas valle.'
  },
  {
    id: 3,
    codigo: 'HOTEL 3 CULTURAS',
    nombre: 'HOTEL 3 CULTURAS',
    zona: 'Mina 168 Colonia Guerrero',
    tarifa4h: 350,
    tarifa6h: 390,
    tarifaNoche: 500,
    categoria: 'Jacuzzi & Spa',
    tag: 'Restaurante Bar 24h • Pole Dance',
    imgFachada: '/renders/hotel-03-tlalpan/fachada/Polish_20260822_230710090.jpg',
    imgHabitacion: '/renders/hotel-03-tlalpan/habitacion/image~17.jpg',
    demanda: 'Mayor Ticket',
    descripcion: 'La propiedad cuenta con hermoso restaurante bar con servicio las 24 horas a la habitación y suites temáticas de experiencia.'
  },
  {
    id: 4,
    codigo: 'HOTEL SAN FRANCISCO',
    nombre: 'HOTEL SAN FRANCISCO',
    zona: 'Colonia Centro, Luis Moya 24',
    tarifa4h: 380,
    tarifa6h: 490,
    tarifaNoche: 610,
    categoria: 'Villas',
    tag: 'Exclusivo Adultos • Lujo',
    imgFachada: '/renders/hotel-04-villas/fachada/IMG-20260822-WA0018.jpg',
    imgHabitacion: '/renders/hotel-04-villas/habitacion/image~22.jpg',
    demanda: 'Rotación 24/7',
    descripcion: 'Hermosa propiedad exclusiva para adultos, combinamos el lujo y la aventura en un mismo lugar con check-in vehicular privado.'
  },
  {
    id: 5,
    codigo: 'HOTEL SAVOY',
    nombre: 'HOTEL SAVOY',
    zona: 'Calle Zarco 145 Col. Guerrero',
    tarifa4h: 340,
    tarifa6h: 390,
    tarifaNoche: 510,
    categoria: 'Insignia',
    tag: 'Vapor Húmedo • Jacuzzi',
    imgFachada: '/renders/hotel-05-polanco/fachada/IMG-20260530-WA0001.jpg',
    imgHabitacion: '/renders/hotel-05-polanco/habitacion/image~29.jpg',
    demanda: 'Alta Demanda',
    descripcion: 'Acceso discreto, vapor húmedo, jacuzzi y cama King Size con domótica e iluminación ambiental.'
  },
  {
    id: 6,
    codigo: 'HOTEL ARIZONA',
    nombre: 'HOTEL ARIZONA',
    zona: 'Gómez Farías 986 Col. Tabacalera',
    tarifa4h: 350,
    tarifa6h: 420,
    tarifaNoche: 520,
    categoria: 'Express',
    tag: 'Cochera Techada • Smart TV 55"',
    imgFachada: '/renders/hotel-06-santafe/fachada/image~4.jpg',
    imgHabitacion: '/renders/hotel-06-santafe/habitacion/image~36.jpg',
    demanda: 'Corredor Clave',
    descripcion: 'Ubicación clave para ejecutivos, viajeros y parejas. Ocupación balanceada entre semana y alta demanda nocturna.'
  }
];

const SECCIONES_TITULOS = [
  { num: '01', title: 'Portada & Hoteles', icon: '🏢' },
  { num: '02', title: '¿Qué es Blue Ocean?', icon: '🌊' },
  { num: '03', title: 'Sistema Blue Ocean', icon: '⚙️' },
  { num: '04', title: 'Captación en Línea', icon: '💻' },
  { num: '05', title: 'TRM vs RM (Gráfica)', icon: '📊', isGraph: true },
  { num: '06', title: 'TARIFA DINÁMICA (Gráfica)', icon: '📈', isGraph: true },
  { num: '07', title: '¿Qué es el Pricing?', icon: '💡', isGraph: true },
  { num: '08', title: 'El Forecasting', icon: '⏱️' },
  { num: '09', title: 'Canales Distribución', icon: '🛣️' },
  { num: '10', title: 'PROYECCIÓN IMPACTO (Gráfica)', icon: '📊', isGraph: true },
  { num: '11', title: 'Cierre Institucional', icon: '🤝' }
];

export function ConvocatoriaSliderView({ 
  onGoToHotels, 
  onGoToPortal,
  externalContactOpen,
  setExternalContactOpen,
  targetSlide,
  onResetTargetSlide,
  onOpenChatbot
}: ConvocatoriaSliderViewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [internalContactOpen, setInternalContactOpen] = useState(false);
  const [activeHotelDetail, setActiveHotelDetail] = useState<Slide1Hotel | null>(null);
  const [activePhotoTab, setActivePhotoTab] = useState<'fachada' | 'habitacion'>('fachada');
  const [kanbanFilter, setKanbanFilter] = useState<string>('TODAS');
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedHotelForPayment, setSelectedHotelForPayment] = useState<Slide1Hotel | null>(null);
  
  // Controles de fecha y estancia para reservación directa
  const [bookingDate, setBookingDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [bookingStayHours, setBookingStayHours] = useState<'TODAS' | '4h' | '6h' | 'noche'>('TODAS');
  const [cardPhotoView, setCardPhotoView] = useState<Record<number, 'fachada' | 'habitacion'>>({});
  // Control para ocultar temas/barras superiores que roban espacio vertical
  const [showTopNav, setShowTopNav] = useState(false);
  
  // Si viene una orden externa de salto a lámina (ej: abrir gráficas)
  useEffect(() => {
    if (targetSlide !== null && targetSlide !== undefined) {
      setCurrentSlide(targetSlide);
      if (onResetTargetSlide) onResetTargetSlide();
    }
  }, [targetSlide]);

  const isContactOpen = externalContactOpen !== undefined ? externalContactOpen : internalContactOpen;
  const setIsContactOpen = (open: boolean) => {
    if (setExternalContactOpen) {
      setExternalContactOpen(open);
    }
    setInternalContactOpen(open);
  };

  const [formData, setFormData] = useState({
    nombreHotel: '',
    contacto: '',
    telefono: '',
    correo: '',
    ubicacion: 'Ciudad de México'
  });
  const [sentSuccess, setSentSuccess] = useState(false);
  const [isBatchImageModalOpen, setIsBatchImageModalOpen] = useState(false);

  const totalSlides = 11;

  // Manejo de teclas Flecha Izquierda / Flecha Derecha
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  const prevSlide = () => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setIsContactOpen(false);
    }, 2800);
  };

  // Regla de fondos estricta (AGENTS.md):
  // Lámina 1 (índice 0) = AZUL MARINO (#002244)
  // Lámina 11 (índice 10) = AZUL MARINO (#002244)
  // Láminas 2 a 10 (índices 1 a 9) = BLANCO (#fcfbf9)
  const isBlueSlide = currentSlide === 0 || currentSlide === 10;
  const containerBg = isBlueSlide ? 'bg-[#002244]' : 'bg-[#fcfbf9]';
  const mainTextColor = isBlueSlide ? 'text-white' : 'text-zinc-900';

  const filteredHotels = SLIDE1_PROPIEDADES.filter(h => {
    if (kanbanFilter === 'TODAS') return true;
    return h.categoria === kanbanFilter;
  });

  return (
    <div className={`relative w-full min-h-[calc(100vh-64px)] ${containerBg} ${mainTextColor} flex flex-col justify-start overflow-x-hidden overflow-y-auto select-none font-sans transition-colors duration-300 pb-28 sm:pb-24`}>

      {/* ========================================================= */}
      {/* 1. BARRA SUPERIOR DE APARTADOS (OCULTABLE PARA GANAR ESPACIO) */}
      {/* ========================================================= */}
      {currentSlide > 0 && (
        <>
          {showTopNav ? (
            <>
              <div className={`w-full ${isBlueSlide ? 'bg-[#00172e] border-blue-900/60' : 'bg-white border-zinc-200'} border-b px-3 sm:px-6 py-2 shrink-0 z-20 shadow-sm`}>
                <div className="max-w-[1680px] mx-auto flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
                  
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`text-[11px] font-sans uppercase tracking-wider font-bold ${isBlueSlide ? 'text-[#f5d77f]' : 'text-blue-950'}`}>
                      Láminas & Apartados:
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto py-0.5">
                    {SECCIONES_TITULOS.map((sec, idx) => {
                      const active = currentSlide === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                            active
                              ? isBlueSlide 
                                ? 'bg-[#d4af37] text-zinc-950 shadow-md font-black ring-2 ring-white/30' 
                                : 'bg-blue-950 text-[#f5d77f] shadow-md font-black ring-2 ring-blue-900/20'
                              : sec.isGraph
                                ? isBlueSlide
                                  ? 'bg-amber-500/20 text-[#f5d77f] border border-[#d4af37]/40 hover:bg-amber-500/30'
                                  : 'bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100'
                                : isBlueSlide
                                  ? 'text-blue-200 hover:text-white hover:bg-white/10'
                                  : 'text-zinc-600 hover:text-blue-950 hover:bg-zinc-100'
                          }`}
                          title={`Ir a ${sec.num}. ${sec.title}`}
                        >
                          <span>{sec.icon}</span>
                          <span>{sec.num}. {sec.title}</span>
                          {sec.isGraph && (
                            <span className="text-[9px] px-1 py-0.2 rounded bg-amber-400 text-black font-extrabold uppercase">
                              Gráfica
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setIsBatchImageModalOpen(true)}
                      className={`text-[11px] font-sans font-bold px-2.5 py-1 rounded border transition cursor-pointer flex items-center gap-1 ${
                        isBlueSlide ? 'bg-[#d4af37]/20 text-[#f5d77f] border-[#d4af37]/50 hover:bg-[#d4af37]/30' : 'bg-amber-100 text-blue-950 border-amber-300 hover:bg-amber-200'
                      }`}
                      title="Gestionar las 9 imágenes oficiales"
                    >
                      <span>🖼️ 9 Imágenes Oficiales</span>
                    </button>
                    <button
                      onClick={() => setShowTopNav(false)}
                      className={`text-[11px] font-sans font-bold px-2.5 py-1 rounded border transition cursor-pointer ${
                        isBlueSlide ? 'text-amber-300 border-amber-400/40 hover:bg-white/10' : 'text-blue-950 border-zinc-300 hover:bg-zinc-100'
                      }`}
                      title="Ocultar para ganar espacio vertical"
                    >
                      ▲ Ocultar Menú
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. CINTILLO RÁPIDO DE ACCESO DIRECTO A GRÁFICAS */}
              <div className="w-full bg-[#d4af37]/15 border-b border-[#d4af37]/30 py-1 px-3 sm:px-6">
                <div className="max-w-[1680px] mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 font-bold">
                    <span className="text-amber-500 animate-pulse">●</span>
                    <span className={isBlueSlide ? 'text-[#f5d77f]' : 'text-blue-950'}>
                      Acceso Directo a Gráficas:
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      onClick={() => setCurrentSlide(5)}
                      className={`px-2 py-0.5 rounded-md font-bold text-[11px] transition flex items-center gap-1 cursor-pointer ${
                        currentSlide === 5 
                          ? 'bg-[#d4af37] text-black shadow' 
                          : isBlueSlide ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-white text-blue-950 border border-zinc-300 hover:bg-zinc-50'
                      }`}
                    >
                      <span>📈 1. Tarifa Dinámica</span>
                    </button>

                    <button
                      onClick={() => setCurrentSlide(9)}
                      className={`px-2 py-0.5 rounded-md font-bold text-[11px] transition flex items-center gap-1 cursor-pointer ${
                        currentSlide === 9 
                          ? 'bg-[#d4af37] text-black shadow' 
                          : isBlueSlide ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-white text-blue-950 border border-zinc-300 hover:bg-zinc-50'
                      }`}
                    >
                      <span>📊 2. Rendimiento (+35%)</span>
                    </button>

                    <button
                      onClick={() => setCurrentSlide(4)}
                      className={`px-2 py-0.5 rounded-md font-bold text-[11px] transition flex items-center gap-1 cursor-pointer ${
                        currentSlide === 4 
                          ? 'bg-[#d4af37] text-black shadow' 
                          : isBlueSlide ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-white text-blue-950 border border-zinc-300 hover:bg-zinc-50'
                      }`}
                    >
                      <span>📊 3. TRM vs RM</span>
                    </button>

                    <button
                      onClick={() => setCurrentSlide(6)}
                      className={`px-2 py-0.5 rounded-md font-bold text-[11px] transition flex items-center gap-1 cursor-pointer ${
                        currentSlide === 6 
                          ? 'bg-[#d4af37] text-black shadow' 
                          : isBlueSlide ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-white text-blue-950 border border-zinc-300 hover:bg-zinc-50'
                      }`}
                    >
                      <span>💡 4. Pricing</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full flex justify-end px-4 py-1 z-20">
              <button
                onClick={() => setShowTopNav(true)}
                className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded-full border transition opacity-60 hover:opacity-100 cursor-pointer ${
                  isBlueSlide ? 'text-amber-300 border-amber-400/40 bg-blue-950/80' : 'text-zinc-600 border-zinc-300 bg-white/80 shadow-sm'
                }`}
                title="Mostrar temas de navegación superior"
              >
                ▼ Mostrar Temas & Gráficas
              </button>
            </div>
          )}
        </>
      )}

      {/* ========================================================= */}
      {/* 3. CONTENEDOR PRINCIPAL DE LA SECCIÓN ACTIVA */}
      {/* ========================================================= */}
      <div className={`w-full ${currentSlide === 0 ? 'max-w-[1680px]' : 'max-w-6xl'} mx-auto px-3 sm:px-6 py-4 flex flex-col items-stretch space-y-6 h-auto`}>

        {/* ========================================================= */}
        {/* SECCIÓN 1: HERO COMPACTO + GALERÍA DE HOTELES MODELO */}
        {/* ========================================================= */}
        {/* ========================================================= */}
        {/* SECCIÓN 1: MOTOR DE RESERVACIÓN DIRECTA - BLUE OCEAN */}
        {/* ========================================================= */}
        {currentSlide === 0 && (
          <div className="w-full flex flex-col space-y-4 h-auto text-left">
            
            {/* HERO PRINCIPAL DE RESERVACIÓN */}
            <div className="bg-[#1E3A66] border border-[#D7B158]/50 rounded-2xl p-3 sm:p-4 shadow-xl relative overflow-hidden">
              {/* CHAT CON MAX EN ESQUINA SUPERIOR DERECHA */}
              <div className="absolute top-2.5 right-3 z-20">
                <button
                  onClick={() => {
                    if (onOpenChatbot) {
                      onOpenChatbot();
                    } else if (typeof (window as any).toggleChatbot === 'function') {
                      (window as any).toggleChatbot();
                    }
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#D7B158]/20 hover:bg-[#D7B158]/30 text-[#D7B158] border border-[#D7B158]/40 text-[10px] sm:text-xs font-bold transition cursor-pointer flex items-center gap-1 shadow-sm active:scale-95"
                  title="Abrir Chat con Max"
                >
                  <span>💬 CHAT CON MAX</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 sm:pt-0">
                
                {/* Título de Marca y Subtítulo */}
                <div className="text-left space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] uppercase font-sans tracking-widest text-[#D7B158] font-bold">
                      Disponibilidad Inmediata
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-3xl font-black text-[#F0F2F7] font-['Trebuchet_MS'] tracking-tight leading-tight">
                    HOTELES Y SUITES ON LINE
                  </h1>
                  <p className="text-xs text-[#D7B158] font-sans tracking-wide font-bold">
                    BLUE OCEAN
                  </p>
                </div>

                {/* Botones de Acción Superiores (Compactos y Discretos) */}
                <div className="shrink-0 flex items-center gap-2 mt-1 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => {
                      setSelectedHotelForPayment(SLIDE1_PROPIEDADES[0]);
                      setPaymentModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#12284c] hover:bg-[#18325a] text-[#F0F2F7] border border-[#D7B158]/60 font-bold text-xs shadow-sm transition cursor-pointer active:scale-95"
                    title="Pasarela de Pago Seguro Mercado Pago"
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    <CreditCard className="w-3.5 h-3.5 text-[#D7B158]" />
                    <span>Pagar en Línea</span>
                  </button>

                  <a
                    href="https://wa.me/525512305860?text=Hola%2C%20deseo%20hacer%20una%20reservaci%C3%B3n%20en%20Blue%20Ocean."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#12284c] hover:bg-[#18325a] text-[#F0F2F7] border border-emerald-500/50 font-bold text-xs shadow-sm transition active:scale-95"
                    title="Reservar directamente por WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Tel: +52 55 1230 5860</span>
                  </a>
                </div>

              </div>

              {/* BARRA DE RESERVACIÓN: SELECCIÓN DE FECHA, TIEMPO DE ESTANCIA Y CATEGORÍA */}
              <div className="mt-3 pt-2.5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-2">
                
                {/* Filtro 1: Fecha de Reservación */}
                <div className="bg-[#12284c] border border-[#D7B158]/30 rounded-xl p-2 text-left">
                  <label className="text-[10px] font-sans uppercase text-[#D7B158] font-bold flex items-center gap-1 mb-1">
                    <Calendar className="w-3 h-3 text-[#D7B158]" />
                    <span>Fecha de Reservación</span>
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-black/30 text-[#F0F2F7] text-xs font-semibold rounded-lg p-1.5 border border-white/10 focus:outline-none focus:border-[#D7B158] cursor-pointer"
                  />
                </div>

                {/* Filtro 2: Modalidad de Estancia por Hora */}
                <div className="bg-[#12284c] border border-[#D7B158]/30 rounded-xl p-2 text-left">
                  <label className="text-[10px] font-sans uppercase text-[#D7B158] font-bold flex items-center gap-1 mb-1">
                    <Clock className="w-3 h-3 text-[#D7B158]" />
                    <span>Modalidad de Renta por Tiempo</span>
                  </label>
                  <select
                    value={bookingStayHours}
                    onChange={(e) => setBookingStayHours(e.target.value as any)}
                    className="w-full bg-black/30 text-[#F0F2F7] text-xs font-semibold rounded-lg p-1.5 border border-white/10 focus:outline-none focus:border-[#D7B158] cursor-pointer"
                  >
                    <option value="TODAS">⏱️ Todas las modalidades (4h, 6h o Noche)</option>
                    <option value="4h">⏱️ 4 Horas (Estancia Corta Express)</option>
                    <option value="6h">⏱️ 6 Horas (Estancia Confort)</option>
                    <option value="noche">🌙 Noche Completa (Pernocta)</option>
                  </select>
                </div>

                {/* Filtro 3: Tipo de Habitación / Amenidad */}
                <div className="bg-[#12284c] border border-[#D7B158]/30 rounded-xl p-2 text-left">
                  <label className="text-[10px] font-sans uppercase text-[#D7B158] font-bold flex items-center gap-1 mb-1">
                    <Sparkles className="w-3 h-3 text-[#D7B158]" />
                    <span>Tipo de Habitación</span>
                  </label>
                  <select
                    value={kanbanFilter}
                    onChange={(e) => setKanbanFilter(e.target.value)}
                    className="w-full bg-black/30 text-[#F0F2F7] text-xs font-semibold rounded-lg p-1.5 border border-white/10 focus:outline-none focus:border-[#D7B158] cursor-pointer"
                  >
                    <option value="TODAS">✨ Todas las Suites y Habitaciones</option>
                    <option value="Insignia">✨ Suite Insignia (Vapor / Jacuzzi Doble)</option>
                    <option value="Express">✨ Suite Express (Renta por Hora Rápida)</option>
                    <option value="Jacuzzi & Spa">✨ Jacuzzi & Spa (Tina Hidromasaje)</option>
                    <option value="Villas">✨ Villas Privadas (Cochera Cerrada)</option>
                  </select>
                </div>

              </div>
            </div>

            {/* CATÁLOGO DE HOTELES CON RENDERS REALES PARA RESERVACIÓN */}
            <div className="w-full space-y-2">
              
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#D7B158]" />
                  <span className="text-xs sm:text-sm font-bold text-[#F0F2F7] uppercase tracking-wider font-['Trebuchet_MS']">
                    Selecciona tu Hotel para Reservar
                  </span>
                </div>
                <span className="text-xs text-[#D7B158] font-sans">
                  Fecha: {bookingDate ? bookingDate.split('-').reverse().join('/') : '15/10/2026'}
                </span>
              </div>

              {/* Grid de Tarjetas estrictamente en 2 Columnas (grid-cols-1 sm:grid-cols-2) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredHotels.map((hotel) => {
                  const currentPhotoType = cardPhotoView[hotel.id] || 'fachada';
                  const currentImg = currentPhotoType === 'fachada' ? hotel.imgFachada : hotel.imgHabitacion;

                  return (
                    <div 
                      key={hotel.id}
                      className="bg-[#1E3A66] border border-[#D7B158]/40 hover:border-[#D7B158] rounded-xl overflow-hidden shadow-lg transition-all duration-200 flex flex-col justify-between group text-left"
                    >
                      {/* Imagen Renderizada (Fachada / Habitación) */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-black">
                        <img 
                          src={currentImg} 
                          alt={hotel.nombre} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                        
                        {/* Selector de Renders: Fachada vs Habitación */}
                        <div className="absolute top-1.5 right-1.5 flex gap-1 z-10">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCardPhotoView(prev => ({ ...prev, [hotel.id]: 'fachada' }));
                            }}
                            className={`px-1.5 py-0.5 rounded text-[8px] font-bold transition cursor-pointer ${
                              currentPhotoType === 'fachada'
                                ? 'bg-[#D7B158] text-black font-black shadow'
                                : 'bg-black/70 text-zinc-300 hover:bg-black/90'
                            }`}
                            title="Render: Fachada Principal"
                          >
                            Fachada
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCardPhotoView(prev => ({ ...prev, [hotel.id]: 'habitacion' }));
                            }}
                            className={`px-1.5 py-0.5 rounded text-[8px] font-bold transition cursor-pointer ${
                              currentPhotoType === 'habitacion'
                                ? 'bg-[#D7B158] text-black font-black shadow'
                                : 'bg-black/70 text-zinc-300 hover:bg-black/90'
                            }`}
                            title="Render: Habitación & Suite"
                          >
                            Habitación
                          </button>
                        </div>

                      </div>

                      {/* Datos de Reservación y Tarifas (Cero elementos encimados sobre la imagen) */}
                      <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-[#F0F2F7] text-sm font-['Trebuchet_MS'] leading-snug line-clamp-1">
                            {hotel.nombre}
                          </h4>
                          <p className="text-[10px] text-zinc-300 flex items-center gap-1 truncate mt-0.5">
                            <MapPin className="w-3 h-3 text-[#D7B158] shrink-0" />
                            <span className="truncate">{hotel.zona}</span>
                          </p>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#12284c] border border-[#D7B158]/30 text-[#D7B158] inline-block truncate mt-1">
                            {hotel.tag}
                          </span>
                        </div>

                        {/* Tarifas Flexibles por Tiempo */}
                        <div className="bg-black/40 rounded-lg p-1.5 border border-white/5 space-y-0.5 text-xs">
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-zinc-400">⏱️ 4h:</span>
                            <span className="font-bold text-[#D7B158] font-sans">${hotel.tarifa4h}</span>
                          </div>
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-zinc-400">⏱️ 6h:</span>
                            <span className="font-bold text-[#F0F2F7] font-sans">${hotel.tarifa6h}</span>
                          </div>
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-zinc-400">🌙 Noche:</span>
                            <span className="font-bold text-emerald-400 font-sans">${hotel.tarifaNoche}</span>
                          </div>
                        </div>

                        {/* Botón Único de Reservación Directa y "Ver fotos y detalles" */}
                        <div className="space-y-1 pt-0.5">
                          <button
                            onClick={() => {
                              setSelectedHotelForPayment(hotel);
                              setPaymentModalOpen(true);
                            }}
                            className="w-full py-1.5 px-2 rounded-lg bg-[#D7B158] hover:bg-[#c59f45] text-zinc-950 text-xs font-black transition flex items-center justify-center gap-1 cursor-pointer shadow-md active:scale-95"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Reservar Ahora</span>
                          </button>

                          <button
                            onClick={() => {
                              setActiveHotelDetail(hotel);
                              setActivePhotoTab(currentPhotoType);
                            }}
                            className="w-full py-1 px-2 rounded-lg bg-[#12284c] hover:bg-[#18325a] text-[#F0F2F7] hover:text-white text-[10px] font-semibold transition flex items-center justify-center gap-1 cursor-pointer border border-[#D7B158]/30"
                          >
                            <Maximize2 className="w-3 h-3 text-[#D7B158]" />
                            <span>Ver fotos y detalles</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* SECCIÓN 2: ¿QUÉ ES BLUE OCEAN? (APARTADO INDEPENDIENTE - FONDO #fcfbf9) */}
        {/* ========================================================= */}
        {/* ========================================================= */}
        {/* SECCIÓN 2: ¿QUÉ ES BLUE OCEAN? Y SISTEMA INTEGRAL (UNIFICADO CON SCROLL - FONDO #fcfbf9) */}
        {/* ========================================================= */}
        {currentSlide === 1 && (
          <div className="w-full bg-[#fcfbf9] border-2 border-[#d4af37]/60 rounded-3xl p-5 sm:p-7 shadow-xl text-left max-h-[calc(100vh-130px)] overflow-y-auto pr-2 sm:pr-4 space-y-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#d4af37]/50 [&::-webkit-scrollbar-track]:bg-amber-50/50">
            {/* Encabezado Institucional de la Lámina Unificada */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b-2 border-amber-200/90 pb-4 sticky top-0 bg-[#fcfbf9]/95 backdrop-blur-sm z-10">
              <div>
                <span className="text-xs font-sans uppercase text-[#b89028] font-bold tracking-widest block">
                  Apartado 02 • Modelo, Fundamentos & Sistema Integral
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-blue-950 font-serif tracking-tight">
                  BLUE OCEAN
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-blue-900/90 pt-0.5">
                  Estrategia, Tecnología y Rentabilidad para la Hotelería de Renta por Hora
                </p>
              </div>
              <LCMLogo size="sm" />
            </div>

            {/* BLOQUE 1: PROPÓSITO CENTRAL Y DEFINICIÓN DEL MODELO */}
            <div className="bg-white border-2 border-amber-300/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase font-sans font-bold text-amber-900 bg-amber-100/90 px-3 py-1 rounded border border-amber-300">
                  Definición & Propósito
                </span>
                <span className="text-xs font-black text-blue-950 uppercase tracking-wide">
                  Modelo de Rentabilidad Especializado
                </span>
              </div>
              <p className="text-sm sm:text-base text-zinc-800 leading-relaxed">
                <strong className="text-blue-950 font-black">Blue Ocean</strong> es un <strong className="text-blue-950 font-bold">modelo de rentabilidad diseñado específicamente para hoteles de renta por hora</strong>. Integra una <strong className="text-blue-950 font-bold">plataforma tecnológica</strong>, <strong className="text-blue-950 font-bold">estrategias comerciales</strong>, <strong className="text-blue-950 font-bold">Revenue Management</strong> e <strong className="text-blue-950 font-bold">inteligencia de datos</strong> para identificar oportunidades, generar nuevas reservas y <strong className="text-emerald-800 font-bold">aprovechar al máximo el potencial de cada propiedad</strong>.
              </p>

              {/* IMAGEN OFICIAL: PROYECCIÓN DE RENTABILIDAD & CRECIMIENTO */}
              <SlideMediaBox
                fileName="Imagen que es Blue Ocean.jpg"
                alt="¿Qué es Blue Ocean? - Proyección de Rentabilidad y Crecimiento"
                caption="📈 Gráfica de Proyección y Rentabilidad Dinámica • Medición de Desempeño y Crecimiento"
                aspectClass="h-56 sm:h-72 w-full"
                className="my-3"
              />

              <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 text-xs sm:text-sm text-blue-950 leading-relaxed">
                <strong className="font-bold text-blue-900">El propósito principal es claro:</strong> generar más reservas en un mercado que ya está digitalizado. Centraliza la operación comercial y conecta a tu establecimiento con nuevas oportunidades de negocio, ofreciendo herramientas profesionales para mejorar la ocupación y la rentabilidad.
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed italic border-l-4 border-[#d4af37] pl-3 py-1">
                <strong>Simplicidad para el hotelero:</strong> no necesita convertirse en un experto en tecnología ni en Revenue Management, ni requiere desarrollar sistemas propios o complejos. Blue Ocean proporciona toda la infraestructura, gestiona la complejidad técnica y acompaña la implementación en todo momento.
              </p>
            </div>

            {/* BLOQUE 2: BASES ESTRATÉGICAS Y RESPALDO DEL CREADOR (CREDENCIALES COMPLETAS) */}
            <div className="bg-white border-2 border-[#d4af37]/60 rounded-2xl p-5 sm:p-6 shadow-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase font-sans font-bold text-blue-950 bg-blue-100/90 px-3 py-1 rounded border border-blue-200">
                    Bases Estratégicas & Credenciales
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-blue-950 font-serif">
                    Respaldo del Creador: Confianza y Fundamento Profesional
                  </h3>
                </div>
                <span className="text-xs font-sans font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                  30+ Años de Experiencia
                </span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed">
                Blue Ocean <strong className="text-blue-950 font-bold">no es una propuesta teórica ni un experimento improvisado</strong>; es un proyecto concebido, diseñado y construido desde el conocimiento profundo de la industria hotelera y la aplicación práctica de herramientas de gestión de demanda de nivel internacional.
              </p>

              {/* Trayectoria Corporativa con Cadenas de Alto Nivel */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/90 space-y-2">
                <span className="text-xs font-sans uppercase tracking-wider text-amber-900 font-bold block">
                  Trayectoria en Cadenas Hoteleras Corporativas
                </span>
                <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed">
                  El desarrollo del modelo está respaldado por <strong className="text-blue-950 font-bold">más de 30 años de experiencia comercial y estratégica</strong> dentro del sector hotelero corporativo y de gestión de viajes, colaborando con marcas de alto nivel y liderando proyectos en:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
                  <div className="p-2 bg-white rounded-lg border border-amber-300 font-bold text-xs text-blue-950 shadow-sm">
                    🏨 Meliá Hotels
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-amber-300 font-bold text-xs text-blue-950 shadow-sm">
                    🏨 Barceló Hotel Group
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-amber-300 font-bold text-xs text-blue-950 shadow-sm">
                    🏨 Grupo Vidanta
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-amber-300 font-bold text-xs text-blue-950 shadow-sm">
                    🏨 Grupo Posadas
                  </div>
                </div>
              </div>

              {/* Credenciales Académicas Oficiales y Especializadas */}
              <div className="space-y-2">
                <span className="text-xs font-sans uppercase tracking-wider text-blue-950 font-bold block">
                  Preparación Académica Especializada & Certificaciones de Autoridad:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200 space-y-1">
                    <span className="text-xs font-black text-blue-950 block">
                      🎓 ESSEC Business School
                    </span>
                    <p className="text-xs text-zinc-700">
                      <strong>Especialidad en Revenue Management y Gestión de Demanda:</strong> Técnicas avanzadas de optimización de capacidad y yield management de clase mundial.
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200 space-y-1">
                    <span className="text-xs font-black text-blue-950 block">
                      🎓 Starweaver
                    </span>
                    <p className="text-xs text-zinc-700">
                      <strong>Máster en Finanzas Hoteleras:</strong> Análisis de rentabilidad de activos inmobiliarios, estructura de costos y retorno sobre inversión operativa.
                    </p>
                  </div>

                  <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 space-y-1">
                    <span className="text-xs font-black text-amber-950 block">
                      🇦🇪 Dubai College of Tourism
                    </span>
                    <p className="text-xs text-zinc-700">
                      <strong>Certificación en Hospitalidad Operativa:</strong> Avalada por el Gobierno de los Emiratos Árabes Unidos en estándares de excelencia de servicio.
                    </p>
                  </div>

                  <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 space-y-1">
                    <span className="text-xs font-black text-amber-950 block">
                      📊 Microsoft & Google
                    </span>
                    <p className="text-xs text-zinc-700">
                      <strong>Certificaciones en Análisis de Datos y Negocios:</strong> Arquitectura de bases de datos, analítica predictiva y automatización comercial.
                    </p>
                  </div>
                </div>
              </div>

              {/* Dos Años de Investigación Inmersiva en Campo */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950 to-[#00172e] text-white space-y-2 border border-[#d4af37]/60 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans uppercase tracking-wider text-[#f5d77f] font-bold">
                    Origen del Modelo • 2 Años de Investigación Inmersiva
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded font-sans font-bold">
                    Investigación en Campo
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                  Blue Ocean es el resultado de <strong className="text-white">dos años de investigación inmersiva profesional</strong> dedicados a conocer, estudiar y documentar el funcionamiento real y operativo de los hoteles de renta por hora.
                </p>
                <p className="text-xs text-blue-200/90 leading-relaxed">
                  Este sector posee una <strong className="text-[#f5d77f]">naturaleza única que lo distingue por completo de la hotelería convencional</strong>: rotación constante por hora, microestancias, picos abruptos de demanda y retos cotidianos de control operativo. Por ello, no se trata de trasladar a ciegas fórmulas de cadenas, sino de adaptar las mejores metodologías a su realidad concreta.
                </p>
              </div>
            </div>



            {/* BLOQUE 3: MÉTRICA ESPECIALIZADA (RevPASH) Y ENFOQUE OPERATIVO */}
            <div className="bg-white border border-amber-200/90 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase font-sans font-bold text-amber-900 bg-amber-100/90 px-3 py-1 rounded border border-amber-300">
                  Métrica Exclusiva
                </span>
                <h3 className="text-sm sm:text-base font-black text-blue-950 font-serif">
                  Estrategias Comerciales, Revenue Management y Medición (RevPASH)
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5">
                  <span className="text-xs font-bold text-blue-950 block">
                    🧠 Inteligencia de Datos para Decisiones Certeras
                  </span>
                  <p className="text-xs text-zinc-700 leading-relaxed">
                    Convierte los datos en información útil. Analiza la información propia del hotel junto con variables externas del entorno y del mercado para detectar patrones de demanda. Las decisiones comerciales dejan de depender de la intuición y se apoyan en datos claros.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1.5">
                  <span className="text-xs font-bold text-amber-950 block">
                    ⏱️ Métrica Especializada (RevPASH)
                  </span>
                  <p className="text-xs text-zinc-700 leading-relaxed">
                    Cada hora disponible en una habitación representa una oportunidad de ingreso. El uso del <strong>RevPASH (Revenue Per Available Space Hour)</strong> permite evaluar el rendimiento real de la capacidad en relación con el tiempo, detectar horas de oportunidad a lo largo del día y mejorar el aprovechamiento de cada habitación.
                  </p>
                </div>
              </div>
            </div>

            {/* BLOQUE 4: QUÉ ES EL SISTEMA INTEGRAL BLUE OCEAN Y CADENA DE VALOR (8 MÓDULOS) */}
            <div className="bg-white border border-amber-200/90 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
              <div className="border-b border-amber-100 pb-3">
                <span className="text-[11px] uppercase font-sans font-bold text-[#b89028] tracking-widest block">
                  Arquitectura Operativa
                </span>
                <h3 className="text-lg sm:text-xl font-black text-blue-950 font-serif">
                  ¿Qué es el Sistema Integral BLUE OCEAN?
                </h3>
                <p className="text-xs sm:text-sm text-zinc-700 pt-1 italic font-semibold">
                  "No inventamos herramientas tecnológicas; articulamos las que ya existen en una cadena de valor indivisible."
                </p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                Es un enfoque estratégico basado en el diagnóstico individual de cada propiedad. Integramos analítica, gestión de precios dinámicos para horas de baja demanda y captación digital en línea para maximizar la ocupación de microestancias.
              </p>

              <div className="space-y-2 pt-1">
                <span className="text-xs font-bold text-zinc-700 uppercase font-sans block">
                  Cadena de Valor Articulada (8 Módulos de Conversión Indivisibles):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 w-full">
                  {[
                    { title: 'Inteligencia Artificial', desc: 'Diagnóstico y patrones' },
                    { title: 'APIs Automatización', desc: 'Conexión en tiempo real' },
                    { title: 'Agentes de IA', desc: 'Atención 24/7' },
                    { title: 'Pasarelas Pago', desc: 'Mercado Pago seguro' },
                    { title: 'Visibilidad en Línea', desc: 'Captación digital' },
                    { title: 'Nuevos Canales', desc: 'Demanda extendida' },
                    { title: 'Pricing Dinámico', desc: 'Horas valle y pico' },
                    { title: 'Estrategias TRM', desc: 'Monetización constante' }
                  ].map((s, i) => (
                    <div 
                      key={i} 
                      className="p-2.5 rounded-xl text-center text-xs font-bold border bg-gradient-to-b from-white to-amber-50/40 border-amber-300/80 shadow-sm hover:border-[#d4af37] transition"
                    >
                      <span className="block text-[10px] text-amber-700 font-sans">0{i + 1}</span>
                      <span className="text-blue-950 block text-[11px] leading-tight font-black">{s.title}</span>
                      <span className="text-[9px] text-zinc-500 font-normal block pt-1">{s.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BLOQUE 5: EL COMPROMISO BLUE OCEAN (INVERSIÓN, CAPACITACIÓN Y VALIDACIÓN) */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 border-2 border-amber-300/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans uppercase tracking-wider text-amber-900 font-black">
                  Compromiso Central Blue Ocean
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded border border-emerald-300">
                  Sin Cobros Fijos Ni Costos de Desarrollo
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-black text-blue-950 font-serif">
                Inversión, Acompañamiento y Validación en Condiciones Reales
              </h4>
              <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed">
                Blue Ocean asume el esfuerzo financiero para desarrollar y validar el modelo en condiciones reales. La incorporación del hotelero al proceso de validación no implica costos por desarrollo tecnológico ni cobros fijos de ninguna índole.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-zinc-800">
                <div className="flex items-start gap-2 bg-white/90 p-2.5 rounded-lg border border-amber-200">
                  <span className="text-amber-700 font-bold">✓</span>
                  <span><strong>Capacitación continua y sin costo:</strong> Para el personal y equipo directivo en servicio, comercialización y rentabilidad.</span>
                </div>
                <div className="flex items-start gap-2 bg-white/90 p-2.5 rounded-lg border border-amber-200">
                  <span className="text-amber-700 font-bold">✓</span>
                  <span><strong>Acompañamiento cercano:</strong> Para la puesta en marcha de las estrategias operativas día con día.</span>
                </div>
                <div className="flex items-start gap-2 bg-white/90 p-2.5 rounded-lg border border-amber-200">
                  <span className="text-amber-700 font-bold">✓</span>
                  <span><strong>Infraestructura Global y Pagos Transparentes:</strong> Plataforma en la nube segura (SOC 2, ISO 27001) y liquidaciones directas vía Mercado Pago.</span>
                </div>
                <div className="flex items-start gap-2 bg-white/90 p-2.5 rounded-lg border border-amber-200">
                  <span className="text-amber-700 font-bold">✓</span>
                  <span><strong>Resultados Verificables en Campo:</strong> Demostración de valor medible a través del aumento de ingresos por hora disponible.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SECCIÓN 3: ¿QUÉ ES EL SISTEMA INTEGRAL BLUE OCEAN? (BLANCO) */}
        {/* ========================================================= */}
                {/* ========================================================= */}
        {/* SECCIÓN 3: ¿QUÉ ES EL SISTEMA INTEGRAL BLUE OCEAN? (BLANCO) */}
        {/* ========================================================= */}
        {currentSlide === 2 && (
          <div className="w-full bg-[#fcfbf9] border-2 border-[#d4af37]/50 rounded-3xl p-5 sm:p-7 shadow-xl flex flex-col justify-between space-y-4 text-left">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-200/80 pb-3">
              <div>
                <span className="text-xs font-sans uppercase text-[#b89028] font-bold tracking-widest block">
                  Apartado 03 • Arquitectura Operativa
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-blue-950 font-serif">
                  ¿Qué es el Sistema Integral BLUE OCEAN?
                </h2>
              </div>
              <LCMLogo size="sm" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              <div className="md:col-span-7 space-y-2 text-xs sm:text-sm text-zinc-700 leading-relaxed">
                <p className="font-bold text-blue-950 text-sm sm:text-base">
                  "No inventamos herramientas tecnológicas; articulamos las que ya existen en una cadena de valor indivisible."
                </p>
                <p>
                  Es un enfoque estratégico en el diagnóstico individual de cada propiedad. Integramos analítica, gestión de precios para horas muertas y captación en línea.
                </p>
                <p className="text-xs text-zinc-600">
                  Blue Ocean compila herramientas de Inteligencia Artificial que potencian tu negocio para captar microestancias y maximizar ocupación.
                </p>
              </div>

              <div className="md:col-span-5">
                <SlideMediaBox
                  fileName="como trabajamos.jpg"
                  alt="Cómo trabajamos - Sistema Integral Blue Ocean"
                  caption="Especialistas analizando métricas y monitoreo en tiempo real"
                  aspectClass="h-40 sm:h-48 w-full"
                />
              </div>
            </div>

            {/* Cadena de Valor Indivisible 8 Pasos */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-zinc-500 uppercase font-sans block">
                Cadena de Valor Articulada (8 Módulos de Conversión):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 w-full">
                {[
                  { title: 'Inteligencia Artificial', gold: true },
                  { title: 'APIs Automatización', gold: false },
                  { title: 'Agentes de IA', gold: false },
                  { title: 'Pasarelas Pago', gold: false },
                  { title: 'Visibilidad en Línea', gold: true },
                  { title: 'Nuevos Canales', gold: false },
                  { title: 'Pricing Dinámico', gold: true },
                  { title: 'Estrategias TRM', gold: false }
                ].map((s, i) => (
                  <div 
                    key={i} 
                    className={`p-2 rounded-lg text-center text-xs font-bold border transition ${
                      s.gold 
                        ? 'bg-[#d4af37] text-zinc-950 border-[#d4af37] shadow-sm' 
                        : 'bg-zinc-50 text-blue-950 border-zinc-300 shadow-sm'
                    }`}
                  >
                    <span className="block text-[10px] opacity-60 font-sans">0{i + 1}</span>
                    {s.title}
                  </div>
                ))}
              </div>
            </div>

            {/* NUEVO BLOQUE: CAPACITACIÓN PROFESIONAL SOLICITADO */}
            <div className="bg-amber-50/70 border-2 border-amber-300/80 rounded-2xl p-4 sm:p-5 shadow-sm space-y-2.5">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-7 space-y-2 text-xs sm:text-sm text-zinc-800 leading-relaxed">
                  <span className="text-[10px] font-sans uppercase font-bold text-amber-900 bg-amber-200/90 px-2.5 py-0.5 rounded border border-amber-300 inline-block">
                    Compromiso Central • Educación Continua
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-blue-950 font-serif">
                    Capacitación Profesional: Motor de Transformación del Sector
                  </h3>
                  <p className="text-zinc-700 text-xs sm:text-sm">
                    La verdadera transformación requiere conocimiento. Por ello, la educación y capacitación profesional sin costo para el personal y directivos del hotel forma parte del compromiso central de Blue Ocean.
                  </p>
                  <p className="text-zinc-700 text-xs sm:text-sm font-medium">
                    No se ofrece como un producto adicional ni como un beneficio condicionado a resultados; es una contribución directa a la profesionalización del sector asumida económicamente por Blue Ocean.
                  </p>
                </div>
                <div className="md:col-span-5">
                  <SlideMediaBox
                    fileName="capacitacion_profesional.jpg"
                    alt="Capacitación Profesional y Desarrollo del Personal"
                    caption="Capacitación profesional sin costo para directivos y personal del hotel"
                    aspectClass="h-36 sm:h-44 w-full"
                  />
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm space-y-0.5 text-xs text-zinc-700">
              <p className="font-bold text-blue-900 text-xs sm:text-sm">Estrategias que juntas gestionan habitaciones vacías.</p>
              <p>Nuestra Propuesta de Valor: Blue Ocean aporta la tecnología, la integración analítica, la estrategia y el trabajo operativo sin cobros fijos.</p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SECCIÓN 4: CAPTACIÓN EN LÍNEA (BLANCO - FIEL A 4 BO.JPG) */}
        {/* ========================================================= */}
        {currentSlide === 3 && (
          <div className="w-full bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6 text-left">
            <div>
              <span className="text-xs font-sans uppercase text-[#d4af37] font-bold tracking-widest block">
                Apartado 04 • Conversión Digital
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-blue-950 font-serif">
                Te llevamos al mercado digital para captar reservaciones en línea.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center flex-1">
              <div className="space-y-3 text-xs sm:text-sm text-zinc-700">
                <div className="p-3.5 rounded-xl bg-white border border-zinc-200 shadow-sm font-bold text-blue-950">
                  "Visualización intuitiva: Diseñada para maximizar la captación."
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-zinc-200 shadow-sm leading-relaxed">
                  "Interfaces de alto impacto diseñadas para convertir visitas en reservas, integrando gestión de inventario y visibilidad en tiempo real."
                </div>
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-[#d4af37] text-xs text-blue-950 font-semibold leading-relaxed">
                  "Nuestra interfaz transforma la búsqueda de tus huéspedes en una experiencia fluida, optimizada para destacar atributos clave de cada propiedad."
                </div>
              </div>

              <div className="space-y-3">
                <SlideMediaBox
                  fileName="reserva_hotel.jpg"
                  alt="Reservación Hotel en Línea"
                  caption="📱 Sistema de reservación móvil y conversión digital en tiempo real"
                  aspectClass="h-40 sm:h-48 w-full"
                />
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="relative rounded-lg overflow-hidden border border-zinc-300 shadow-sm">
                    <img src="/renders/hotel-01-insurgentes/fachada/Polish_20260822_225309771.jpg" alt="Excalibur" className="aspect-video object-cover w-full" />
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-sans text-[#f5d77f]">HOTEL EXCALIBUR</span>
                  </div>
                  <div className="relative rounded-lg overflow-hidden border border-zinc-300 shadow-sm">
                    <img src="/renders/hotel-02-periferico/fachada/Polish_20260822_230305219.jpg" alt="Novoa" className="aspect-video object-cover w-full" />
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-sans text-[#f5d77f]">HOTEL NOVOA</span>
                  </div>
                  <div className="relative rounded-lg overflow-hidden border border-zinc-300 shadow-sm">
                    <img src="/renders/hotel-03-tlalpan/fachada/Polish_20260822_230710090.jpg" alt="3 Culturas" className="aspect-video object-cover w-full" />
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-sans text-[#f5d77f]">HOTEL 3 CULTURAS</span>
                  </div>
                  <div className="relative rounded-lg overflow-hidden border border-zinc-300 shadow-sm">
                    <img src="/renders/hotel-04-villas/fachada/IMG-20260822-WA0018.jpg" alt="San Francisco" className="aspect-video object-cover w-full" />
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-sans text-[#f5d77f]">HOTEL SAN FRANCISCO</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => setCurrentSlide(0)}
                    className="flex-1 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs uppercase shadow transition cursor-pointer"
                  >
                    Ver Propiedades Modelo
                  </button>
                  <button
                    onClick={() => {
                      if (typeof (window as any).toggleChatbot === 'function') {
                        (window as any).toggleChatbot();
                      }
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-[#003366] hover:bg-[#002244] text-white font-bold text-xs uppercase shadow transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4 text-[#f5d77f]" />
                    <span>Consultar con Max</span>
                  </button>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="flex-1 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#c49f27] text-zinc-950 font-black text-xs uppercase shadow transition cursor-pointer"
                  >
                    Postular Mi Hotel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SECCIÓN 5: REVENUE MANAGEMENT VS TRM (GRÁFICA MES A MES) */}
        {/* ========================================================= */}
        {currentSlide === 4 && (
          <div className="w-full bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6 text-left">
            <div>
              <span className="text-xs font-sans uppercase text-[#d4af37] font-bold tracking-widest block">
                Apartado 05 • Metodología Comparada & Gráfica
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-blue-950 font-serif">
                Muchos confunden el Revenue Management con el Total Revenue Management
              </h2>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm text-xs sm:text-sm text-zinc-700">
              El Revenue Management tradicional solo maximiza venta de habitaciones. El <strong className="text-blue-950">Total Revenue Management (TRM)</strong> optimiza toda la operación integral: rotación, horas valle, consumo adicional y canales directos.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1">
              
              {/* Gráfica de Barras Crecientes de Alto Contraste */}
              <div className="md:col-span-6 p-5 rounded-2xl bg-zinc-50 border-2 border-blue-900/30 shadow-lg text-center">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-black text-blue-950 uppercase tracking-wide">
                    Crecimiento de Ingresos Mes a Mes
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    +10% a +25% TRM
                  </span>
                </div>

                <div className="flex items-end justify-center gap-4 h-48 pt-4 px-3 border-b-2 border-zinc-300 pb-3">
                  <div className="flex-1 flex flex-col items-center gap-1.5">
                    <span className="text-xs font-black text-blue-950">10%</span>
                    <div className="w-full bg-[#d4af37]/60 h-16 rounded-t-lg shadow flex items-center justify-center text-xs font-bold text-black" />
                    <span className="text-[10px] text-zinc-600 font-bold uppercase">AGOSTO</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1.5">
                    <span className="text-xs font-black text-blue-950">15%</span>
                    <div className="w-full bg-[#d4af37]/80 h-24 rounded-t-lg shadow flex items-center justify-center text-xs font-bold text-black" />
                    <span className="text-[10px] text-zinc-600 font-bold uppercase">SEPTIEMBRE</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1.5">
                    <span className="text-xs font-black text-blue-950">20%</span>
                    <div className="w-full bg-[#d4af37] h-32 rounded-t-lg shadow flex items-center justify-center text-xs font-bold text-black" />
                    <span className="text-[10px] text-zinc-600 font-bold uppercase">OCTUBRE</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1.5">
                    <span className="text-sm font-black text-amber-600">30%+</span>
                    <div className="w-full bg-gradient-to-t from-[#d4af37] to-amber-300 h-40 rounded-t-lg shadow-lg flex items-center justify-center text-xs font-black text-black" />
                    <span className="text-[10px] text-blue-950 font-black uppercase">NOVIEMBRE</span>
                  </div>
                </div>

                <span className="text-[11px] font-sans text-zinc-500 mt-2 block font-semibold">
                  Incremento sostenido por captación digital y rotación en horas valle
                </span>
              </div>

              <div className="md:col-span-6 space-y-3 text-xs sm:text-sm text-zinc-700 leading-relaxed">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <SlideMediaBox
                    fileName="imagen Revenue Manager.jpg"
                    alt="Perfil del Revenue Manager Dedicado"
                    caption="Especialista TRM"
                    aspectClass="h-32 sm:h-36 w-full"
                  />
                  <SlideMediaBox
                    fileName="datos analisis.jpg"
                    alt="Datos y Análisis de Desempeño"
                    caption="Analítica de Rendimiento"
                    aspectClass="h-32 sm:h-36 w-full"
                  />
                </div>
                <p>
                  El <strong>Total Revenue Management</strong> amplía el enfoque incorporando optimización de canales, venta directa, marketing, automatización, segmentación y análisis de datos para vender más y mejor.
                </p>
                <div className="p-4 rounded-xl bg-amber-500/10 border border-[#d4af37] text-blue-950 font-bold text-sm">
                  Los hoteles que implementan TRM incrementan sus ingresos globales entre un <strong>10% y un 25%</strong> sostenido.
                </div>
                <div className="text-right text-xs font-sans text-blue-900 font-bold pt-1">
                  direccion@oceanrevenue-management.com
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SECCIÓN 6: TARIFA DINÁMICA (GRÁFICA COMPLETA DE TARIFA DINAMICA.JPG) */}
        {/* ========================================================= */}
        {currentSlide === 5 && (
          <div className="w-full bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6 text-left">
            <div className="border-b border-zinc-200 pb-2">
              <span className="text-xs font-sans uppercase text-[#d4af37] font-bold tracking-widest block">
                Apartado 06 • Gráfica Comparativa Oficial
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-blue-950 font-serif">
                TARIFA DINÁMICA
              </h2>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm text-center text-xs sm:text-sm text-zinc-700">
              No cambia el valor de la habitación; cambia la forma de aprovechar cada oportunidad de venta según <strong>demanda, disponibilidad y momento de compra</strong>.
            </div>

            {/* Comparativa Visual de Gráficas: Dinámica vs Plana (Fiel a tarifa dinamica.jpg) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
              
              {/* TARIFA DINÁMICA (MODELO LCM) */}
              <div className="p-5 rounded-2xl bg-zinc-50 border-2 border-[#d4af37] shadow-xl flex flex-col justify-between space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#d4af37]" />
                    <span className="text-xs sm:text-sm font-black text-blue-950 uppercase tracking-wide">
                      TARIFA DINÁMICA (MODELO LCM)
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                    +35% RevPAR
                  </span>
                </div>

                {/* Gráfica Visual de Barras con Eje de Precios */}
                <div className="relative h-44 flex items-end justify-around gap-2 px-2 border-b-2 border-zinc-300 pb-2 bg-gradient-to-b from-amber-500/5 to-transparent rounded-lg">
                  
                  {/* Barra 1: Madrugada */}
                  <div className="flex flex-col items-center gap-1.5 z-10">
                    <span className="text-[11px] font-sans font-bold text-blue-900">$380</span>
                    <div className="w-12 bg-[#d4af37] h-14 rounded-t-lg shadow" />
                    <span className="text-[10px] text-zinc-600 font-bold">Madrugada</span>
                    <span className="text-[9px] text-zinc-400">02:00 - 08:00</span>
                  </div>

                  {/* Barra 2: Horas Valle Diurnas */}
                  <div className="flex flex-col items-center gap-1.5 z-10">
                    <span className="text-[11px] font-sans font-bold text-blue-900">$480</span>
                    <div className="w-12 bg-[#d4af37] h-22 rounded-t-lg shadow" />
                    <span className="text-[10px] text-zinc-600 font-bold">Horas Valle</span>
                    <span className="text-[9px] text-zinc-400">11:00 - 16:00</span>
                  </div>

                  {/* Barra 3: Tarde / Noche */}
                  <div className="flex flex-col items-center gap-1.5 z-10">
                    <span className="text-[11px] font-sans font-bold text-blue-900">$650</span>
                    <div className="w-12 bg-[#d4af37] h-30 rounded-t-lg shadow" />
                    <span className="text-[10px] text-zinc-600 font-bold">Tarde-Noche</span>
                    <span className="text-[9px] text-zinc-400">17:00 - 22:00</span>
                  </div>

                  {/* Barra 4: Pico Fin de Semana */}
                  <div className="flex flex-col items-center gap-1.5 z-10">
                    <span className="text-xs font-sans font-black text-amber-700">$850</span>
                    <div className="w-12 bg-gradient-to-t from-[#d4af37] to-amber-300 h-38 rounded-t-lg shadow-lg" />
                    <span className="text-[10px] text-blue-950 font-black">Pico Sábado</span>
                    <span className="text-[9px] text-amber-700 font-bold">Alta Demanda</span>
                  </div>

                  {/* Línea de tendencia visual */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" preserveAspectRatio="none">
                    <path d="M 40,110 Q 110,80 180,50 T 260,20" fill="none" stroke="#d4af37" strokeWidth="3" strokeDasharray="4 4" />
                  </svg>
                </div>

                <ul className="text-xs text-zinc-700 space-y-1.5 pt-1">
                  <li className="flex items-center gap-2 text-emerald-800 font-bold">
                    <span>✓</span> Sube en alta demanda para no regalar valor.
                  </li>
                  <li className="flex items-center gap-2 text-emerald-800 font-bold">
                    <span>✓</span> Se ajusta en horas valle para garantizar ocupación y rotación.
                  </li>
                  <li className="flex items-center gap-2 text-blue-950 font-black">
                    <span>✓</span> Capta mayor ingreso adaptado a horas diurnas y picos de demanda.
                  </li>
                </ul>
              </div>

              {/* TARIFA PLANA (TRADICIONAL) */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-300 shadow-sm flex flex-col justify-between space-y-3 opacity-90">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-zinc-400" />
                    <span className="text-xs sm:text-sm font-bold text-zinc-600 uppercase tracking-wide">
                      TARIFA PLANA (TRADICIONAL)
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-black">
                    Dinero Perdido
                  </span>
                </div>

                {/* Gráfica Rígida y Plana */}
                <div className="h-44 flex items-end justify-around gap-2 px-2 border-b-2 border-zinc-300 pb-2">
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="text-[11px] font-sans text-zinc-500">$450</span>
                    <div className="w-12 bg-zinc-300 h-20 rounded-t-lg" />
                    <span className="text-[10px] text-zinc-500">Madrugada</span>
                    <span className="text-[9px] text-zinc-400">02:00 - 08:00</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="text-[11px] font-sans text-zinc-500">$450</span>
                    <div className="w-12 bg-zinc-300 h-20 rounded-t-lg" />
                    <span className="text-[10px] text-zinc-500">Horas Valle</span>
                    <span className="text-[9px] text-zinc-400">11:00 - 16:00</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="text-[11px] font-sans text-zinc-500">$450</span>
                    <div className="w-12 bg-zinc-300 h-20 rounded-t-lg" />
                    <span className="text-[10px] text-zinc-500">Tarde-Noche</span>
                    <span className="text-[9px] text-zinc-400">17:00 - 22:00</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="text-[11px] font-sans text-rose-600 font-bold">$450</span>
                    <div className="w-12 bg-rose-200 border-2 border-dashed border-rose-400 h-20 rounded-t-lg" />
                    <span className="text-[10px] text-rose-700 font-bold">Pico Sábado</span>
                    <span className="text-[9px] text-rose-600">Regala $400</span>
                  </div>
                </div>

                <ul className="text-xs text-zinc-600 space-y-1.5 pt-1">
                  <li className="flex items-center gap-2 text-rose-700 font-semibold">
                    <span>✗</span> Tarifa fija que regala dinero sobre la mesa en fin de semana.
                  </li>
                  <li className="flex items-center gap-2 text-rose-700 font-semibold">
                    <span>✗</span> Ahuyenta clientes y deja habitaciones vacías en horas bajas.
                  </li>
                  <li className="flex items-center gap-2 text-zinc-500">
                    <span>✗</span> Rígida e indiferente ante la demanda real del mercado.
                  </li>
                </ul>
              </div>

            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border-2 border-[#d4af37] text-xs sm:text-sm text-blue-950 font-black text-center shadow-sm">
              "Las habitaciones tienen un valor; la estrategia determina cuánto se convierte en ingresos."
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SECCIÓN 7: ¿QUÉ ES EL PRICING? (FIEL A QUE ES EL PRICING.JPG) */}
        {/* ========================================================= */}
        {currentSlide === 6 && (
          <div className="w-full bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6 text-left">
            <div className="border-b border-zinc-200 pb-2">
              <span className="text-xs font-sans uppercase text-[#d4af37] font-bold tracking-widest block">
                Apartado 07 • Estrategia Comercial Oficial
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-blue-950 font-serif">
                ¿Qué es el Pricing?
              </h2>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm text-center text-xs sm:text-sm text-zinc-700">
              El proceso de definir la estrategia de precios considerando <strong>costos, competencia, demanda y objetivos de rentabilidad</strong>.
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border-2 border-[#d4af37] text-center font-black text-xs sm:text-sm text-blue-950 shadow-sm">
              "El precio correcto no es el más bajo ni el más alto; es el que genera el mayor valor para cada oportunidad."
            </div>

            {/* Imágenes Oficiales de Pricing y Segmentación */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SlideMediaBox
                fileName="pricing.jpg"
                alt="¿Qué es el Pricing?"
                caption="Fijación táctica de tarifas y objetivos de rentabilidad"
                aspectClass="h-40 sm:h-48 w-full"
              />
              <SlideMediaBox
                fileName="segmentación de precio"
                alt="Segmentación de Precio"
                caption="Infografía: Precios por Segmentación y Paquetes"
                aspectClass="h-40 sm:h-48 w-full"
              />
            </div>

            {/* 4 Pilares del Pricing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 flex-1">
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 shadow-md space-y-2">
                <span className="text-xs font-sans uppercase text-[#d4af37] font-bold block">Pilar 01</span>
                <span className="text-sm font-bold text-blue-950 block">Costos Operativos</span>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Cálculo del costo marginal por habitación, lavandería y personal de limpieza en cada rotación.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 shadow-md space-y-2">
                <span className="text-xs font-sans uppercase text-[#d4af37] font-bold block">Pilar 02</span>
                <span className="text-sm font-bold text-blue-950 block">Demanda en Tiempo Real</span>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Detección de horas muertas (11:00 AM a 5:00 PM) para activar tarifas de estímulo inmediato.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 shadow-md space-y-2">
                <span className="text-xs font-sans uppercase text-[#d4af37] font-bold block">Pilar 03</span>
                <span className="text-sm font-bold text-blue-950 block">Competencia Local</span>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Monitoreo de tarifas de moteles y hoteles del mismo corredor para capturar clientes en ruta.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 shadow-md space-y-2">
                <span className="text-xs font-sans uppercase text-[#d4af37] font-bold block">Pilar 04</span>
                <span className="text-sm font-bold text-blue-950 block">Momento de Compra</span>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Diferenciación entre reserva anticipada digital y llegada directa espontánea a recepción.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="text-left space-y-1">
                <h4 className="text-sm sm:text-base font-bold text-[#f5d77f]">Te ayudamos a calcular tu Pricing</h4>
                <p className="text-xs text-blue-200">Diagnóstico inicial sin costo para tu propiedad y análisis de horas valle.</p>
              </div>
              <button
                onClick={() => setIsContactOpen(true)}
                className="px-6 py-3 rounded-xl bg-[#d4af37] text-zinc-950 font-black text-xs uppercase tracking-wider shadow-lg transition cursor-pointer shrink-0 hover:bg-[#c49f27]"
              >
                Solicitar Cálculo de Pricing
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SECCIÓN 8: EL FORECASTING (BLANCO) */}
        {/* ========================================================= */}
        {currentSlide === 7 && (
          <div className="w-full bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6 text-left">
            <div>
              <span className="text-xs font-sans uppercase text-[#d4af37] font-bold tracking-widest block">
                Apartado 08 • Anticipación Estratégica
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-blue-950 font-serif">
                El Pronóstico y su Importancia
              </h2>
            </div>

            {/* Texto solicitado como primera línea con ortografía revisada */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border-2 border-amber-300 shadow-sm space-y-2 text-xs sm:text-sm text-zinc-800 leading-relaxed">
              <p className="font-semibold text-zinc-800">
                El pronóstico es la estimación anticipada de la demanda futura. Es la base del Revenue Management y permite tomar decisiones de precio, inventario y estrategia basadas en datos y métodos analíticos.
              </p>
              <blockquote className="font-bold text-blue-950 italic border-l-4 border-[#d4af37] pl-3 py-0.5">
                "No bastaba con pronosticar cuántos huéspedes habrá".
              </blockquote>
              <p className="text-zinc-800">
                Un forecast bien estructurado con datos sólidos, nos anticipa además de cuánto podemos vender a saber cuándo reservarán y cuánto están dispuestos a pagar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center flex-1">
              <div className="md:col-span-5">
                <SlideMediaBox
                  fileName="Forecasting.jpg"
                  alt="El Pronóstico y su Importancia - Forecasting"
                  caption="Gráficas de pronóstico y estimación anticipada de demanda"
                  aspectClass="h-48 sm:h-56 w-full"
                />
              </div>

              <div className="md:col-span-7 space-y-3">
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm text-xs sm:text-sm text-zinc-700 space-y-2">
                  <p className="font-bold text-blue-950 text-base">Anticipar la demanda antes de que cambie el mercado:</p>
                  <p className="leading-relaxed">
                    Permite administrar disponibilidad, activar promociones a tiempo, coordinar personal de limpieza y capturar mejores ingresos sin sacrificar tarifa media.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-blue-950 border border-blue-900 text-white font-sans text-xs sm:text-sm space-y-2 shadow-md">
                  <p className="text-[#f5d77f] font-bold">• El Pricing responde cuánto cobrar.</p>
                  <p className="text-cyan-300 font-bold">• El Revenue Management responde cómo maximizar.</p>
                  <p className="text-emerald-400 font-bold">• El Forecasting responde cuándo actuar.</p>
                </div>
              </div>
            </div>

            <div className="text-center text-xs font-sans text-blue-900 font-bold">
              Metodología Total Revenue Management • L.C. Monroy
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SECCIÓN 9: SEGMENTACIÓN Y CANALES DE DISTRIBUCIÓN (BLANCO) */}
        {/* ========================================================= */}
        {currentSlide === 8 && (
          <div className="w-full bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6 text-left">
            <div>
              <span className="text-xs font-sans uppercase text-[#d4af37] font-bold tracking-widest block">
                Apartado 09 • Segmentación y Canales
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-blue-950 font-serif">
                Segmentación y Canales de Distribución
              </h2>
            </div>

            {/* Imagen 1: Al inicio del bloque antes del texto */}
            <SlideMediaBox
              fileName="omnicanalidad.jpg"
              alt="Omnicanalidad y Canales de Distribución"
              caption="Conectividad omnicanal: Canales digitales, móviles y de atención directa"
              aspectClass="h-40 sm:h-52 w-full"
            />

            {/* Párrafo 1 */}
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm text-xs sm:text-sm text-zinc-700 leading-relaxed">
              <p>
                El objetivo principal de la gestión de ingresos es vender el producto correcto al cliente correcto, en el momento correcto, por el precio correcto. Es alinear los precios de tus productos y luego distribuirlos estratégicamente en los canales adecuados a los clientes adecuados.
              </p>
            </div>

            {/* Imagen 2: En medio de los textos */}
            <SlideMediaBox
              fileName="canales_distribucion.jpg"
              alt="Canales de Distribución y Segmentación"
              caption="Red global de distribución y segmentación de mercado"
              aspectClass="h-40 sm:h-52 w-full"
            />

            {/* Párrafo 2 */}
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm text-xs sm:text-sm text-zinc-700 leading-relaxed">
              <p>
                La segmentación es un medio para dividir el mercado en segmentos que son definibles, accesibles, accionables y rentables, y que tienen potencial de crecimiento.
              </p>
              <p className="mt-2 font-medium text-blue-950">
                El objetivo con la segmentación es mostrar una comprensión de cómo agrupar a los tipos de clientes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950">
                <strong>Canal B2C Directo:</strong> Parejas y microestancias con reserva sin fricción y acceso vehicular directo.
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                <strong>Canal B2B Convenios:</strong> Llenado de horas muertas con operadores de carga y paquetería en horarios valle.
              </div>
            </div>

            <div className="text-center text-xs font-sans text-blue-900 font-bold">
              Metodología Total Revenue Management • L.C. Monroy
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SECCIÓN 10: PROYECCIÓN DE RENDIMIENTO (GRÁFICA SEMANA 1 A 6) */}
        {/* ========================================================= */}
        {currentSlide === 9 && (
          <div className="w-full bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6 text-left">
            <div className="border-b border-zinc-200 pb-2">
              <span className="text-xs font-sans uppercase text-[#d4af37] font-bold tracking-widest block">
                Apartado 10 • Gráfica de Retorno Oficial
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-blue-950 font-serif">
                PROYECCIÓN DE IMPACTO Y RENDIMIENTO
              </h2>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm text-xs sm:text-sm text-zinc-700">
              Medimos la eficiencia operativa para transformar horas muertas en flujo de caja real.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center flex-1">
              
              {/* Gráfica Evolutiva de Semanas de Implementación (Fiel a proyección de impacto.jpg) */}
              <div className="md:col-span-6 p-5 rounded-2xl bg-zinc-50 border-2 border-blue-900/30 shadow-xl text-center">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-black text-blue-950 uppercase tracking-wide">
                    Evolución de Ingresos (Semana 1 a Semana 6)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    +35% Sostenido
                  </span>
                </div>
                
                <div className="relative h-44 flex items-end justify-around gap-2 px-2 border-b-2 border-zinc-300 pb-3 bg-gradient-to-b from-blue-500/5 to-transparent rounded-lg">
                  
                  {/* Sem 1 */}
                  <div className="flex flex-col items-center gap-1.5 z-10">
                    <span className="text-[10px] font-sans font-bold text-zinc-500">Base</span>
                    <div className="w-8 bg-blue-300 h-10 rounded-t-lg shadow" />
                    <span className="text-[9px] font-bold text-zinc-500">SEM 1</span>
                    <span className="text-[8px] text-zinc-400">Diagnóstico</span>
                  </div>

                  {/* Sem 2 */}
                  <div className="flex flex-col items-center gap-1.5 z-10">
                    <span className="text-[10px] font-sans font-bold text-blue-700">+10%</span>
                    <div className="w-8 bg-blue-400 h-16 rounded-t-lg shadow" />
                    <span className="text-[9px] font-bold text-zinc-500">SEM 2</span>
                    <span className="text-[8px] text-zinc-400">Tarifa Valle</span>
                  </div>

                  {/* Sem 3 */}
                  <div className="flex flex-col items-center gap-1.5 z-10">
                    <span className="text-[10px] font-sans font-bold text-blue-800">+18%</span>
                    <div className="w-8 bg-blue-500 h-22 rounded-t-lg shadow" />
                    <span className="text-[9px] font-bold text-zinc-500">SEM 3</span>
                    <span className="text-[8px] text-zinc-400">Reservas</span>
                  </div>

                  {/* Sem 4 */}
                  <div className="flex flex-col items-center gap-1.5 z-10">
                    <span className="text-[10px] font-sans font-bold text-blue-900">+25%</span>
                    <div className="w-8 bg-blue-700 h-28 rounded-t-lg shadow" />
                    <span className="text-[9px] font-bold text-zinc-500">SEM 4</span>
                    <span className="text-[8px] text-zinc-400">Picos Vie-Sáb</span>
                  </div>

                  {/* Sem 5 */}
                  <div className="flex flex-col items-center gap-1.5 z-10">
                    <span className="text-[10px] font-sans font-bold text-amber-600">+30%</span>
                    <div className="w-8 bg-[#d4af37] h-34 rounded-t-lg shadow" />
                    <span className="text-[9px] font-bold text-zinc-500">SEM 5</span>
                    <span className="text-[8px] text-zinc-400">Rotación 24/7</span>
                  </div>

                  {/* Sem 6 */}
                  <div className="flex flex-col items-center gap-1.5 z-10">
                    <span className="text-xs font-sans font-black text-amber-700">+35%</span>
                    <div className="w-8 bg-gradient-to-t from-[#d4af37] to-amber-300 h-40 rounded-t-lg shadow-lg" />
                    <span className="text-[9px] font-black text-blue-950">SEM 6</span>
                    <span className="text-[8px] text-amber-700 font-bold">TRM Pleno</span>
                  </div>

                  {/* Línea curva conectando las semanas */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" preserveAspectRatio="none">
                    <path d="M 25,120 Q 90,95 150,70 T 260,20" fill="none" stroke="#002244" strokeWidth="3" strokeDasharray="3 3" />
                  </svg>
                </div>

                <span className="text-[11px] font-sans text-zinc-500 mt-2 block font-semibold">
                  Metodología validada con IA y optimización de rotación 24/7
                </span>
              </div>

              {/* Indicadores de Impacto */}
              <div className="md:col-span-6 space-y-3">
                <SlideMediaBox
                  fileName="incremento$.jpg"
                  alt="Incremento Real de Rentabilidad"
                  caption="Crecimiento neto de ingresos y flujo de caja para el hotelero"
                  aspectClass="h-36 sm:h-44 w-full"
                />
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm">
                  <h3 className="text-xs sm:text-sm font-bold text-blue-950 leading-relaxed">
                    "Incremento proyectado en ingresos por optimización de tarifas y horas muertas: 15% a 35%."
                  </h3>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-[#d4af37] text-xs text-blue-950 space-y-1">
                  <span className="font-bold text-sm block">Modelo basado en datos impulsado por IA:</span>
                  <p className="text-xs text-zinc-700 leading-relaxed">
                    Garantiza facturación constante durante el día reduciendo habitaciones vacías en horarios valle hasta un <strong>45%</strong>.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-blue-950 text-white flex justify-between items-center text-xs shadow">
                  <span className="text-blue-200">Esquema Aliado:</span>
                  <span className="font-black text-[#f5d77f] font-sans text-sm">85% Neto Hotel / 15% a Resultados</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SECCIÓN 11: CIERRE INSTITUCIONAL Y ALIANZA (AZUL MARINO) */}
        {/* ========================================================= */}
        {currentSlide === 10 && (
          <div className="w-full bg-[#00172e] border-2 border-[#d4af37]/60 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between items-center text-center space-y-5">
            <div>
              <span className="text-xs font-sans uppercase text-[#d4af37] font-bold tracking-widest block">
                Apartado 11 • Convocatoria Abierta
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-[#f5d77f] font-serif mt-1">
                Diseñamos un plan a la medida de tu propiedad
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
              Blue Ocean nace para romper esa barrera en el hotel y motel de estancia corta. Aportamos experiencia, tecnología y trabajo operativo.
            </p>

            <div className="flex justify-center my-2">
              <LCMLogo size="xl" className="drop-shadow-[0_0_35px_rgba(212,175,55,0.5)]" />
            </div>

            <div className="p-4 rounded-xl bg-white/10 border border-[#d4af37]/60 max-w-xl w-full">
              <p className="text-sm sm:text-base font-bold text-white font-serif">
                Si tu hotel no gana más, nosotros no cobramos.
              </p>
              <span className="text-xs text-amber-200/90 block mt-1">
                Vamos 100% a resultados con el 15% sobre el incremento real de ingresos.
              </span>
            </div>

            <h3 className="text-xs sm:text-base font-black text-[#f5d77f] font-serif max-w-xl">
              "Vender tiempo y espacio al precio correcto en el momento exacto es nuestra misión"
            </h3>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsContactOpen(true)}
                className="px-8 py-3 rounded-full bg-[#d4af37] text-zinc-950 font-black text-xs uppercase shadow-lg hover:bg-[#c49f27] transition cursor-pointer"
              >
                Postular Mi Propiedad
              </button>
              <a 
                href="mailto:direccion@oceanrevenue-management.com" 
                className="text-xs font-sans text-blue-200 underline hover:text-white"
              >
                direccion@oceanrevenue-management.com
              </a>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* 4. BARRA INFERIOR DE CONTROLES: NAVEGACIÓN LIMPIA */}
      {/* ========================================================= */}
      <div className={`w-full fixed bottom-0 left-0 right-0 ${isBlueSlide ? 'bg-[#00172e] border-blue-900/80 text-white' : 'bg-white border-zinc-200 text-zinc-900'} border-t px-4 py-2.5 flex items-center justify-between z-40 shadow-2xl`}>
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
            currentSlide === 0 
              ? 'opacity-30 cursor-not-allowed bg-zinc-300/30 text-zinc-400' 
              : isBlueSlide ? 'bg-blue-900 text-white hover:bg-blue-800' : 'bg-zinc-100 border border-zinc-300 text-zinc-800 hover:bg-zinc-200'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        {/* Indicadores de Puntos / Láminas */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`transition-all rounded-full cursor-pointer ${
                currentSlide === i 
                  ? 'w-6 h-2.5 bg-[#d4af37]' 
                  : isBlueSlide ? 'w-2 h-2 bg-blue-800 hover:bg-blue-700' : 'w-2 h-2 bg-zinc-300 hover:bg-zinc-400'
              }`}
              title={SECCIONES_TITULOS[i].title}
            />
          ))}
          <span className={`text-xs font-sans font-bold ml-2 ${isBlueSlide ? 'text-[#f5d77f]' : 'text-blue-950'}`}>
            {currentSlide + 1} / {totalSlides}
          </span>
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
            currentSlide === totalSlides - 1 
              ? 'opacity-30 cursor-not-allowed bg-zinc-300/30 text-zinc-400' 
              : 'bg-[#d4af37] text-zinc-950 hover:bg-[#c49f27]'
          }`}
        >
          <span className="hidden sm:inline">Siguiente</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* ========================================================= */}
      {/* 5. MODAL DE DETALLE RÁPIDO DE HOTEL (FACHADA + SUITE) */}
      {/* ========================================================= */}
      {activeHotelDetail && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#002244] text-white rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-[#d4af37]/60 relative text-left">
            <button
              onClick={() => setActiveHotelDetail(null)}
              className="absolute top-4 right-4 text-zinc-300 hover:text-white font-bold p-1 bg-black/40 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded bg-[#d4af37] text-black font-sans font-bold text-xs">
                {activeHotelDetail.codigo}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white font-serif">
                {activeHotelDetail.nombre}
              </h3>
            </div>

            {/* Selector de Pestaña de Render */}
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setActivePhotoTab('fachada')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activePhotoTab === 'fachada'
                    ? 'bg-[#d4af37] text-black'
                    : 'bg-white/10 text-blue-200 hover:bg-white/20'
                }`}
              >
                🏢 Render de Fachada
              </button>
              <button
                onClick={() => setActivePhotoTab('habitacion')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activePhotoTab === 'habitacion'
                    ? 'bg-[#d4af37] text-black'
                    : 'bg-white/10 text-blue-200 hover:bg-white/20'
                }`}
              >
                🛏️ Suite Temática & Amenidades
              </button>
            </div>

            {/* Imagen en Grande */}
            <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-black border border-blue-700/60 mb-3">
              <img 
                src={activePhotoTab === 'fachada' ? activeHotelDetail.imgFachada : activeHotelDetail.imgHabitacion} 
                alt={activeHotelDetail.nombre} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur px-3 py-1.5 rounded-lg text-xs text-white flex justify-between items-center">
                <span className="truncate">{activeHotelDetail.zona}</span>
                <span className="font-bold text-[#f5d77f] shrink-0">✨ {activeHotelDetail.tag}</span>
              </div>
            </div>

            <p className="text-xs text-blue-100 mb-3 leading-relaxed">
              {activeHotelDetail.descripcion}
            </p>

            {/* Tarifas y CTA */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-blue-800/60">
              <div className="flex items-center gap-3 text-xs">
                <div>
                  <span className="text-zinc-400 block text-[10px]">Tarifa 4 Horas:</span>
                  <span className="font-bold text-[#f5d77f] font-sans text-sm">${activeHotelDetail.tarifa4h} MXN</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">Tarifa 6 Horas:</span>
                  <span className="font-bold text-white font-sans text-sm">${activeHotelDetail.tarifa6h} MXN</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">Noche Completa:</span>
                  <span className="font-bold text-emerald-400 font-sans text-sm">${activeHotelDetail.tarifaNoche} MXN</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    const hotel = activeHotelDetail;
                    setActiveHotelDetail(null);
                    setSelectedHotelForPayment(hotel);
                    setPaymentModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#d4af37] hover:bg-[#c49f27] text-zinc-950 font-black text-xs uppercase shadow transition cursor-pointer flex items-center gap-1.5"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Reservar Esta Habitación</span>
                </button>

                <a
                  href={`https://wa.me/525512305860?text=${encodeURIComponent(`Hola, deseo reservar en ${activeHotelDetail.nombre} para ${bookingDate}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase shadow transition cursor-pointer flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4 text-[#f5d77f]" />
                  <span>Reservar por WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. MODAL DE CONTACTO / POSTULACIÓN */}
      {/* ========================================================= */}
      {isContactOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#002244] text-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#d4af37]/40 relative text-left">
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-4 right-4 text-zinc-300 hover:text-white font-bold p-1 cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-lg font-bold text-white font-serif mb-1">Postular Hotel Modelo</h3>
            <p className="text-xs text-blue-200 mb-4">100% a resultados con el 15%. Tú no inviertes nada.</p>

            {sentSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-center text-xs text-emerald-300">
                ¡Recibido! La Dirección de Total Revenue Management se comunicará contigo hoy mismo.
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Nombre del Hotel o Motel"
                  value={formData.nombreHotel}
                  onChange={(e) => setFormData({ ...formData, nombreHotel: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg bg-black/40 border border-blue-400/40 text-white focus:outline-none focus:border-[#d4af37]"
                />
                <input
                  type="text"
                  required
                  placeholder="Nombre del Propietario / Gerente"
                  value={formData.contacto}
                  onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg bg-black/40 border border-blue-400/40 text-white focus:outline-none focus:border-[#d4af37]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Teléfono / WhatsApp de Contacto"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg bg-black/40 border border-blue-400/40 text-white focus:outline-none focus:border-[#d4af37]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#d4af37] hover:bg-[#c49f27] text-zinc-950 font-black text-xs uppercase transition cursor-pointer"
                >
                  Enviar Postulación
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. PASARELA DE PAGO EN LÍNEA */}
      {/* ========================================================= */}
      <OnlinePaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        hotelData={selectedHotelForPayment ? {
          nombre: selectedHotelForPayment.nombre,
          zona: selectedHotelForPayment.zona,
          tarifa4h: selectedHotelForPayment.tarifa4h,
          tarifa6h: selectedHotelForPayment.tarifa6h,
          tarifaNoche: selectedHotelForPayment.tarifaNoche,
          codigo: selectedHotelForPayment.codigo,
          imgFachada: selectedHotelForPayment.imgFachada
        } : undefined}
      />

      {/* 8. GESTOR DE 9 IMÁGENES OFICIALES */}
      <SlideImagesBatchModal
        isOpen={isBatchImageModalOpen}
        onClose={() => setIsBatchImageModalOpen(false)}
      />

    </div>
  );
}
