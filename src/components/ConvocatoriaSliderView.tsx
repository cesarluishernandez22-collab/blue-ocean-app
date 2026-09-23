import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  DollarSign
} from 'lucide-react';
import { LCMLogo } from './LCMLogo';

interface ConvocatoriaSliderViewProps {
  onGoToHotels?: () => void;
  onGoToPortal?: () => void;
}

export function ConvocatoriaSliderView({ onGoToHotels }: ConvocatoriaSliderViewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombreHotel: '',
    contacto: '',
    telefono: '',
    correo: '',
    ubicacion: 'Ecatepec / Estado de México'
  });
  const [sentSuccess, setSentSuccess] = useState(false);

  const totalSlides = 11;

  // Manejo de teclas Flecha Izquierda / Flecha Derecha
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
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
    }, 3000);
  };

  // Regla de fondos estricta:
  // Diapositiva 1 (índice 0) = AZUL
  // Diapositiva 11 (índice 10) = AZUL
  // Diapositivas 2 a 10 (índices 1 a 9) = BLANCO
  const isBlueSlide = currentSlide === 0 || currentSlide === 10;
  const containerBg = isBlueSlide ? 'bg-[#002244]' : 'bg-[#fcfbf9]';
  const mainTextColor = isBlueSlide ? 'text-white' : 'text-zinc-900';

  return (
    <div className={`relative w-full h-[calc(100vh-65px)] ${containerBg} ${mainTextColor} flex flex-col justify-between overflow-hidden select-none font-sans transition-colors duration-300`}>

      {/* Contenedor de la Diapositiva Activa (Ajuste a pantalla sin scroll) */}
      <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 py-4 flex flex-col justify-center items-center overflow-hidden">

        {/* ========================================================= */}
        {/* DIAPOSITIVA 1: CONVOCATORIA OFICIAL CON IMPACTO VISUAL (AZUL) */}
        {/* ========================================================= */}
        {currentSlide === 0 && (
          <div className="w-full flex flex-col justify-between h-full py-1 space-y-3">
            {/* Encabezado Superior */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-blue-800/40 pb-2">
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#f5d77f] font-bold">
                  Convocatoria Exclusiva • Hotel Modelo
                </span>
                <h1 className="text-lg sm:text-2xl font-black text-white font-serif tracking-tight">
                  Hoteles y Moteles de Estancia por Hora
                </h1>
              </div>
              <LCMLogo size="sm" className="drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
            </div>

            {/* Cuerpo en 2 Columnas: Propuesta + Render del Hotel */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center flex-1">
              
              {/* Columna Izquierda: Estrategia y Números */}
              <div className="md:col-span-6 space-y-3 text-left">
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-3xl font-black text-[#f5d77f] font-serif leading-tight">
                    Convertimos habitaciones vacías en ingresos.
                  </h2>
                  <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                    Buscamos propiedades para ser el <strong>Hotel Modelo</strong> de nuestra metodología en validación. No cobramos consultoría: vamos <strong>100% a resultados (15%)</strong> sobre el incremento real de tus ingresos.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/10 border border-white/20 space-y-1 text-xs">
                  <p className="font-bold text-white">¿Qué aportamos a tu propiedad?</p>
                  <p className="text-blue-100">
                    Tecnología de Inteligencia Artificial, pricing dinámico para horas muertas, integración directa con clientes y estrategia de Total Revenue Management (TRM).
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-black/40 border border-[#d4af37]/40 text-xs text-[#f5d77f] font-semibold">
                  Si tu hotel no gana más, nosotros no cobramos.
                </div>

                <div>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="px-6 py-2.5 rounded-full bg-[#d4af37] hover:bg-[#c49f27] text-zinc-950 font-black text-xs uppercase tracking-wider shadow-lg transition"
                  >
                    ¿Te gustaría participar? Contáctanos
                  </button>
                </div>
              </div>

              {/* Columna Derecha: Render de Transformación del Hotel */}
              <div className="md:col-span-6 flex flex-col space-y-2">
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#d4af37]/60 shadow-2xl group">
                  <img 
                    src="/renders/Polish_20260822_225309771.jpg" 
                    alt="Blue Ocean Hotel & Suites - Fachada Modelo" 
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded-full bg-[#d4af37] text-black font-black text-[10px] uppercase mb-1">
                        Render de Transformación
                      </span>
                      <p className="text-white text-xs font-bold font-serif">
                        Así proyectamos la imagen y captación de tu hotel bajo el concepto Blue Ocean
                      </p>
                    </div>
                  </div>
                </div>

                {/* Vistas en Miniatura de Habitaciones y Fachadas */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-lg overflow-hidden border border-blue-400/30 aspect-video relative">
                    <img src="/renders/image~10.jpg" alt="Villas & Suites" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-1 text-[9px] bg-black/70 px-1 rounded text-white font-mono">Suites</span>
                  </div>
                  <div className="rounded-lg overflow-hidden border border-blue-400/30 aspect-video relative">
                    <img src="/renders/Polish_20260822_230305219.jpg" alt="Insurgentes Norte" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-1 text-[9px] bg-black/70 px-1 rounded text-white font-mono">Fachada</span>
                  </div>
                  <div className="rounded-lg overflow-hidden border border-blue-400/30 aspect-video relative">
                    <img src="/renders/image~12.jpg" alt="Estancia Corta" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-1 text-[9px] bg-black/70 px-1 rounded text-white font-mono">Habitación</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* DIAPOSITIVA 2: NUESTRA HISTORIA Y FUNDADOR (FONDO BLANCO) */}
        {/* ========================================================= */}
        {currentSlide === 1 && (
          <div className="w-full flex flex-col justify-between h-full py-2 space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black text-blue-950 font-serif text-center sm:text-left">
              Nuestra Historia y Fundador
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3 text-xs sm:text-sm text-zinc-700 leading-relaxed">
                <p>
                  Durante más de tres décadas dentro de la industria hotelera, he vivido diferentes etapas de transformación. La forma en que los clientes buscan, comparan y reservan define el rumbo de la rentabilidad de cada propiedad.
                </p>
                <h3 className="text-xl font-black text-blue-900">Luis César Monroy</h3>
                <p>
                  Trayectoria en el área comercial, Revenue Management y estrategia en cadenas como <strong className="text-blue-950">Meliá Hotels, Barceló Hotel Group, Vidanta y Grupo Posadas.</strong>
                </p>
                <ul className="space-y-1.5 text-zinc-800 text-xs sm:text-sm font-sans">
                  <li className="flex items-start gap-2">
                    <span className="text-[#d4af37] font-bold">✓</span>
                    <span><strong>Especialidad en Revenue Management y Demanda</strong> — ESSEC Business School</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#d4af37] font-bold">✓</span>
                    <span><strong>Máster en Finanzas Hoteleras</strong> — Starweaver</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#d4af37] font-bold">✓</span>
                    <span><strong>Hospitalidad Operativa</strong> — Dubai College of Tourism</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#d4af37] font-bold">✓</span>
                    <span><strong>Análisis de Negocios y Datos</strong> — Microsoft & Google</span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm">
                <LCMLogo size="lg" className="drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]" />
                <span className="text-xs font-bold text-blue-950 mt-3">Luis César Monroy</span>
                <span className="text-[11px] text-zinc-500 text-center mt-1">Autoría & Metodología Total Revenue</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-sm space-y-2">
              <h4 className="text-sm font-bold text-blue-950">La Lección de 1996: El Nacimiento del Pago por Resultados</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                En 1996 las OTAs crearon el modelo por resultados: primero consiguen al huésped y solo cuando cobras ganan comisión. Fue entonces que me pregunté: <strong className="text-blue-900">¿Por qué solo las grandes cadenas se beneficiarían y los hoteles independientes de estancia por hora no?</strong>
              </p>
            </div>

            <div className="flex justify-between items-center text-xs text-zinc-600">
              <div className="flex gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 font-bold text-[11px]">ESSEC</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-[11px]">STARWEAVER</span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-bold text-[11px]">DUBAI COLLEGE</span>
              </div>
              <a href="mailto:direccion@oceanrevenue-management.com" className="text-blue-900 font-bold underline">
                direccion@oceanrevenue-management.com
              </a>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* DIAPOSITIVA 3: ¿QUÉ ES EL SISTEMA INTEGRAL BLUE OCEAN? (BLANCO) */}
        {/* ========================================================= */}
        {currentSlide === 2 && (
          <div className="w-full flex flex-col justify-between h-full py-2 space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black text-blue-950 font-serif text-center sm:text-left">
              ¿Qué es el Sistema Integral BLUE OCEAN?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-zinc-700 leading-relaxed">
                <p className="font-bold text-blue-950">
                  No inventamos herramientas tecnológicas; articulamos las que ya existen en una cadena de valor indivisible.
                </p>
                <p>
                  Es un enfoque estratégico en el diagnóstico individual de cada propiedad. Integramos analítica, gestión de precios para horas muertas y captación en línea.
                </p>
                <p className="text-xs text-zinc-600">
                  Blue Ocean compila herramientas de Inteligencia Artificial que potencian tu negocio.
                </p>
              </div>

              <div className="md:col-span-5">
                <div className="rounded-xl overflow-hidden border border-zinc-300 shadow-md">
                  <img src="/renders/image~10.jpg" alt="Habitación Blue Ocean" className="w-full h-44 object-cover" />
                </div>
              </div>
            </div>

            {/* Proceso Horizontal 8 Pasos */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 w-full">
              {[
                { title: 'Inteligencia Artificial', gold: true },
                { title: 'APIS Automatización', gold: false },
                { title: 'Agentes de IA', gold: false },
                { title: 'Pasarelas Pago', gold: false },
                { title: 'Visibilidad en línea', gold: true },
                { title: 'Nuevos Canales', gold: false },
                { title: 'Pricing Dinámico', gold: true },
                { title: 'Estrategias TRM', gold: false }
              ].map((s, i) => (
                <div 
                  key={i} 
                  className={`p-2 rounded text-center text-[10px] font-bold border ${s.gold ? 'bg-[#d4af37] text-zinc-950 border-[#d4af37]' : 'bg-white text-blue-950 border-zinc-300 shadow-sm'}`}
                >
                  {s.title}
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-sm space-y-1.5 text-xs text-zinc-700">
              <p className="font-bold text-blue-900">Estrategias que juntas gestionan habitaciones vacías.</p>
              <p>Nuestra Propuesta de Valor: Blue Ocean aporta la tecnología, la integración analítica, la estrategia y el trabajo operativo.</p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* DIAPOSITIVA 4: CAPTACIÓN EN LÍNEA (BLANCO) */}
        {/* ========================================================= */}
        {currentSlide === 3 && (
          <div className="w-full flex flex-col justify-between h-full py-2 space-y-3">
            <h2 className="text-xl sm:text-3xl font-black text-blue-950 font-serif text-center">
              Te llevamos al mercado digital para captar reservaciones en línea.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center flex-1">
              <div className="space-y-3 text-xs sm:text-sm text-zinc-700">
                <div className="p-3 rounded-xl bg-white border border-zinc-200 shadow-sm font-bold text-blue-950">
                  "Visualización intuitiva: Diseñada para maximizar la captación."
                </div>
                <div className="p-3 rounded-xl bg-white border border-zinc-200 shadow-sm">
                  "Interfaces de alto impacto diseñadas para convertir visitas en reservas, integrando gestión de inventario y visibilidad en tiempo real."
                </div>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-[#d4af37] text-xs text-blue-950 font-semibold">
                  "Nuestra interfaz transforma la búsqueda de tus huéspedes en una experiencia fluida, optimizada para destacar atributos clave de cada propiedad."
                </div>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <img src="/renders/Polish_20260822_225309771.jpg" alt="Render 1" className="rounded-lg aspect-video object-cover border border-zinc-300 shadow-sm" />
                  <img src="/renders/Polish_20260822_230305219.jpg" alt="Render 2" className="rounded-lg aspect-video object-cover border border-zinc-300 shadow-sm" />
                  <img src="/renders/image~10.jpg" alt="Render 3" className="rounded-lg aspect-video object-cover border border-zinc-300 shadow-sm" />
                  <img src="/renders/image~12.jpg" alt="Render 4" className="rounded-lg aspect-video object-cover border border-zinc-300 shadow-sm" />
                </div>
                <button
                  onClick={onGoToHotels}
                  className="w-full py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs uppercase shadow"
                >
                  Abrir Catálogo de Propiedades y Renders
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* DIAPOSITIVA 5: REVENUE MANAGEMENT VS TRM (BLANCO) */}
        {/* ========================================================= */}
        {currentSlide === 4 && (
          <div className="w-full flex flex-col justify-between h-full py-2 space-y-4">
            <h2 className="text-xl sm:text-3xl font-black text-blue-950 font-serif text-center">
              Muchos confunden el Revenue Management con el Total Revenue Management
            </h2>

            <div className="p-3 rounded-xl bg-white border border-zinc-200 shadow-sm text-center text-xs sm:text-sm text-zinc-700">
              El Revenue Management tradicional solo maximiza venta de habitaciones. El <strong className="text-blue-950">Total Revenue Management (TRM)</strong> optimiza toda la operación integral.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Gráfica Barras Crecientes */}
              <div className="md:col-span-5 p-4 rounded-xl bg-white border border-zinc-200 shadow-md text-center">
                <div className="flex items-end justify-center gap-3 h-44 pt-4 px-2">
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-[#d4af37]/60 h-16 rounded-t flex items-center justify-center text-[11px] font-bold text-black">10</div>
                    <span className="text-[9px] text-zinc-500 font-bold">AGOSTO</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-[#d4af37]/80 h-24 rounded-t flex items-center justify-center text-[11px] font-bold text-black">15</div>
                    <span className="text-[9px] text-zinc-500 font-bold">SEPTIEMBRE</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-[#d4af37] h-32 rounded-t flex items-center justify-center text-[11px] font-bold text-black">20</div>
                    <span className="text-[9px] text-zinc-500 font-bold">OCTUBRE</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-gradient-to-t from-[#d4af37] to-[#fbe89d] h-40 rounded-t flex items-center justify-center text-[11px] font-black text-black shadow">30+</div>
                    <span className="text-[9px] text-blue-900 font-black">NOVIEMBRE</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 space-y-3 text-xs text-zinc-700 leading-relaxed">
                <p>
                  El <strong>Total Revenue Management</strong> amplía el enfoque incorporando optimización de canales, venta directa, marketing, automatización, segmentación y análisis de datos para vender más y mejor.
                </p>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-[#d4af37] text-blue-950 font-bold text-xs">
                  Los hoteles que implementan TRM incrementan ingresos entre un 10% y un 25%.
                </div>
              </div>
            </div>

            <div className="text-center text-[11px] font-mono text-blue-900 font-bold">
              direccion@oceanrevenue-management.com
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* DIAPOSITIVA 6: TARIFA DINÁMICA (BLANCO) */}
        {/* ========================================================= */}
        {currentSlide === 5 && (
          <div className="w-full flex flex-col justify-between h-full py-2 space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black text-blue-950 font-serif text-center">
              TARIFA DINÁMICA
            </h2>

            <div className="p-3 rounded-xl bg-white border border-zinc-200 shadow-sm text-center text-xs sm:text-sm text-zinc-700">
              No cambia el valor de la habitación; cambia la forma de aprovechar cada oportunidad de venta según demanda, disponibilidad y momento de compra.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-md space-y-2">
                <span className="text-xs font-bold text-blue-900 uppercase">TARIFA DINÁMICA</span>
                <div className="h-28 flex items-end justify-center gap-2">
                  <div className="w-8 bg-[#d4af37] h-28 rounded-t"></div>
                  <div className="w-8 bg-[#d4af37] h-18 rounded-t"></div>
                  <div className="w-8 bg-[#d4af37] h-12 rounded-t"></div>
                  <div className="w-8 bg-[#d4af37] h-7 rounded-t"></div>
                </div>
                <p className="text-[11px] text-zinc-600">Capta mayor ingreso adaptado a horas diurnas y picos de demanda.</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-md space-y-2">
                <span className="text-xs font-bold text-zinc-500 uppercase">TARIFA PLANA</span>
                <div className="h-28 flex items-end justify-center gap-2">
                  <div className="w-8 bg-zinc-300 h-14 rounded-t"></div>
                  <div className="w-8 bg-zinc-300 h-14 rounded-t"></div>
                  <div className="w-8 bg-zinc-300 h-14 rounded-t"></div>
                  <div className="w-8 bg-zinc-300 h-14 rounded-t"></div>
                </div>
                <p className="text-[11px] text-zinc-500">Tarifa fija que deja dinero sobre la mesa en fines de semana y ahuyenta clientes en horas valle.</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-zinc-200 shadow-sm text-xs text-zinc-700">
              <p className="font-bold text-blue-950">Las habitaciones tienen un valor; la estrategia determina cuánto se convierte en ingresos.</p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* DIAPOSITIVA 7: ¿QUÉ ES EL PRICING? (BLANCO) */}
        {/* ========================================================= */}
        {currentSlide === 6 && (
          <div className="w-full flex flex-col justify-between h-full py-2 space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black text-blue-950 font-serif text-center">
              ¿Qué es el Pricing?
            </h2>

            <div className="p-3 rounded-xl bg-white border border-zinc-200 shadow-sm text-center text-xs sm:text-sm text-zinc-700">
              El proceso de definir la estrategia de precios considerando costos, competencia, demanda y objetivos de rentabilidad.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3 text-xs sm:text-sm text-zinc-700">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-[#d4af37] font-bold text-blue-950">
                  "El precio correcto no es el más bajo ni el más alto; es el que genera el mayor valor para cada oportunidad."
                </div>
                <p>
                  Un buen pricing permite vender más habitaciones en demanda baja y maximizar ingresos en demanda alta.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-md text-center space-y-3">
                <DollarSign className="w-10 h-10 text-[#d4af37] mx-auto" />
                <h3 className="text-lg font-black text-blue-950">Te ayudamos a calcular tu Pricing</h3>
                <p className="text-xs text-zinc-500">Diagnóstico inicial sin costo para tu propiedad.</p>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-[#d4af37] text-zinc-950 font-bold text-xs uppercase shadow"
                >
                  Solicitar Cálculo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* DIAPOSITIVA 8: EL FORECASTING (BLANCO) */}
        {/* ========================================================= */}
        {currentSlide === 7 && (
          <div className="w-full flex flex-col justify-between h-full py-2 space-y-4">
            <div className="p-4 rounded-xl bg-amber-500/15 border border-[#d4af37] text-center">
              <h2 className="text-base sm:text-2xl font-black text-blue-950 font-serif">
                "El Forecasting no intenta adivinar lo que ocurrirá. Nos permite tomar decisiones antes de que SUCEDAN LAS COSAS."
              </h2>
            </div>

            <div className="text-xs sm:text-sm text-zinc-700 space-y-2 text-center max-w-3xl mx-auto">
              <p>El corazón del Total Revenue Management es el Forecasting. Sin él, la estrategia se convierte en una simple reacción.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-sm text-xs text-zinc-700 space-y-2">
                <p className="font-bold text-blue-950">Anticipar la demanda antes de que cambie el mercado.</p>
                <p>Permite administrar disponibilidad, activar promociones a tiempo y capturar mejores ingresos.</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 font-mono text-xs space-y-2">
                <p className="text-blue-950 font-bold">• El Pricing responde cuánto cobrar.</p>
                <p className="text-cyan-800 font-bold">• El Revenue Management responde cómo maximizar.</p>
                <p className="text-emerald-800 font-bold">• El Forecasting responde cuándo actuar.</p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* DIAPOSITIVA 9: CANALES DE DISTRIBUCIÓN (BLANCO) */}
        {/* ========================================================= */}
        {currentSlide === 8 && (
          <div className="w-full flex flex-col justify-center items-center text-center h-full py-2 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-black text-blue-950 font-serif">
              Canales de distribución
            </h2>
            <p className="text-sm text-zinc-600 max-w-lg">
              Apertura de demanda directa: clientes de microestancia, parejas por horas y convenios de descanso para transportistas de carga en corredores logísticos.
            </p>
            <div className="flex gap-4">
              <span className="px-4 py-2 rounded-full bg-cyan-100 text-cyan-900 border border-cyan-300 text-xs font-bold">
                Canal Parejas / Microestancia
              </span>
              <span className="px-4 py-2 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
                Convenios B2B Logística y Carga
              </span>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* DIAPOSITIVA 10: PROYECCIÓN DE RENDIMIENTO (BLANCO) */}
        {/* ========================================================= */}
        {currentSlide === 9 && (
          <div className="w-full flex flex-col justify-between h-full py-2 space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-xl sm:text-3xl font-black text-blue-950 font-serif">
                Proyección de Impacto y Rendimiento
              </h2>
              <p className="text-xs text-zinc-600">Medimos la eficiencia operativa para transformar horas muertas en flujo de caja real.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-md text-center">
                <div className="flex items-end justify-center gap-2.5 h-36 pt-4">
                  <div className="w-7 bg-blue-400 h-10 rounded-t"></div>
                  <div className="w-7 bg-blue-500 h-16 rounded-t"></div>
                  <div className="w-7 bg-blue-600 h-22 rounded-t"></div>
                  <div className="w-7 bg-blue-700 h-28 rounded-t"></div>
                  <div className="w-7 bg-blue-900 h-34 rounded-t"></div>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 mt-2 block font-bold">Semana 1 ➔ Semana 6 de Implementación</span>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-sm">
                  <h3 className="text-sm sm:text-base font-bold text-blue-950">
                    "Incremento proyectado en ingresos por optimización de tarifas y horas muertas: 15% a 35%."
                  </h3>
                </div>
                <div className="p-3 rounded-xl bg-white border border-zinc-200 shadow-sm text-xs text-zinc-600">
                  Modelo basado en datos impulsado por IA para garantizar facturación constante durante el día.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* DIAPOSITIVA 11: CIERRE Y CONTACTO (AZUL) */}
        {/* ========================================================= */}
        {currentSlide === 10 && (
          <div className="w-full flex flex-col justify-between items-center text-center h-full py-2 space-y-4">
            <h2 className="text-xl sm:text-3xl font-black text-[#f5d77f] font-serif">
              Diseñamos un plan a la medida de tu propiedad
            </h2>

            <p className="text-xs text-blue-100 max-w-xl">
              Blue Ocean nace para romper esa barrera en el hotel y motel de estancia corta. Aportamos experiencia, tecnología y trabajo operativo.
            </p>

            <div className="flex justify-center my-1">
              <LCMLogo size="xl" className="drop-shadow-[0_0_35px_rgba(212,175,55,0.5)]" />
            </div>

            <div className="p-4 rounded-xl bg-white/10 border border-white/20 max-w-xl">
              <p className="text-xs sm:text-sm font-bold text-white">
                Si tu hotel no gana más, nosotros no cobramos.
              </p>
            </div>

            <h3 className="text-sm sm:text-lg font-black text-[#f5d77f] font-serif">
              Vender tiempo y espacio al precio correcto en el momento exacto es nuestra misión
            </h3>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsContactOpen(true)}
                className="px-8 py-3 rounded-full bg-[#d4af37] text-zinc-950 font-black text-xs uppercase shadow-lg hover:bg-[#c49f27] transition"
              >
                Contáctanos
              </button>
              <a href="mailto:direccion@oceanrevenue-management.com" className="text-xs font-mono text-blue-200 underline">
                direccion@oceanrevenue-management.com
              </a>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* BARRA INFERIOR DE CONTROLES: DIAPOSITIVAS (SIN SCROLL) */}
      {/* ========================================================= */}
      <div className={`w-full ${isBlueSlide ? 'bg-[#00172e] border-blue-900/60' : 'bg-zinc-100 border-zinc-200'} border-t px-4 py-2.5 flex items-center justify-between z-40 transition-colors`}>
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            currentSlide === 0 
              ? 'opacity-30 cursor-not-allowed bg-zinc-300/30 text-zinc-400' 
              : isBlueSlide ? 'bg-blue-900 text-white hover:bg-blue-800' : 'bg-white border border-zinc-300 text-zinc-800 hover:bg-zinc-50'
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
              className={`transition-all rounded-full ${
                currentSlide === i 
                  ? 'w-6 h-2 bg-[#d4af37]' 
                  : isBlueSlide ? 'w-2 h-2 bg-blue-800 hover:bg-blue-700' : 'w-2 h-2 bg-zinc-300 hover:bg-zinc-400'
              }`}
              title={`Lámina ${i + 1}`}
            />
          ))}
          <span className={`text-[11px] font-mono font-bold ml-2 ${isBlueSlide ? 'text-[#f5d77f]' : 'text-blue-950'}`}>
            {currentSlide + 1} / {totalSlides}
          </span>
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            currentSlide === totalSlides - 1 
              ? 'opacity-30 cursor-not-allowed bg-zinc-300/30 text-zinc-400' 
              : 'bg-[#d4af37] text-zinc-950 hover:bg-[#c49f27]'
          }`}
        >
          <span className="hidden sm:inline">Siguiente</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* MODAL DE CONTACTO */}
      {isContactOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#002244] text-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#d4af37]/40 relative text-left">
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-4 right-4 text-zinc-300 hover:text-white font-bold"
            >
              ✕
            </button>

            <h3 className="text-lg font-bold text-white font-serif mb-1">Postular Hotel Modelo</h3>
            <p className="text-xs text-blue-200 mb-4">100% a resultados con el 15%. Tú no inviertes nada.</p>

            {sentSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-center text-xs text-emerald-300">
                ¡Recibido! Luis César Monroy se comunicará contigo.
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
                  placeholder="Tu Nombre"
                  value={formData.contacto}
                  onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg bg-black/40 border border-blue-400/40 text-white focus:outline-none focus:border-[#d4af37]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Teléfono / WhatsApp"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg bg-black/40 border border-blue-400/40 text-white focus:outline-none focus:border-[#d4af37]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#d4af37] text-zinc-950 font-black text-xs uppercase"
                >
                  Enviar Postulación
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
