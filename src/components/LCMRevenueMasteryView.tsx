import React, { useState } from 'react';
import { 
  Award, 
  TrendingUp, 
  Clock, 
  Layers, 
  CheckCircle2, 
  Quote, 
  Compass, 
  Target, 
  Sparkles, 
  Building2, 
  DollarSign, 
  Truck, 
  Heart, 
  ShieldAlert, 
  ShieldCheck, 
  Receipt, 
  FileText, 
  ChevronRight, 
  Sliders, 
  BarChart3, 
  ArrowUpRight, 
  Calendar, 
  MapPin, 
  HelpCircle,
  Zap
} from 'lucide-react';
import { LCMLogo } from './LCMLogo';

export function LCMRevenueMasteryView({ onGoToHotels }: { onGoToHotels?: () => void } = {}) {
  const [activeTab, setActiveTab] = useState<
    'origen_respaldo' | 'trm_vs_rm' | 'tarifa_dinamica' | 'pricing_forecasting' | 'canal_transportistas' | 'convocatoria_hotelero'
  >('origen_respaldo');

  // Estado del simulador interactivo de Tarifa Plana vs. Tarifa Dinámica
  const [simulatedDemand, setSimulatedDemand] = useState<number>(75); // 0% a 100% demanda
  const [roomCount, setRoomCount] = useState<number>(30); // habitaciones del hotel
  const flatRate = 450; // Tarifa plana típica

  // Cálculo de tarifa dinámica según demanda:
  // Si demanda baja (<=40%), tarifa de estímulo $380 (para choferes y descanso express)
  // Si demanda media (41-70%), tarifa base $480-$550
  // Si demanda alta (71-100%), tarifa optimizada $680-$790 (parejas en fin de semana / noche)
  const dynamicRate = Math.round(350 + (simulatedDemand / 100) * 440);
  
  // Ocupación estimada:
  // Tarifa plana: si demanda es baja se queda muy vacía; si es alta se llena al 100% pero regalando el precio
  const flatOccupancyRate = Math.min(100, Math.max(15, simulatedDemand * 0.85));
  // Tarifa dinámica: ajusta precio para maximizar RevPAR y rotación
  const dynamicOccupancyRate = Math.min(100, Math.max(35, simulatedDemand * 1.05));

  const flatRoomsSold = Math.round((roomCount * flatOccupancyRate) / 100);
  const dynamicRoomsSold = Math.round((roomCount * dynamicOccupancyRate) / 100);

  // Con TRM hay rotación (un mismo cuarto se vende 1.8 veces en 24h gracias a choferes de día + parejas de noche)
  const rotationMultiplier = simulatedDemand > 50 ? 1.6 : 1.2;
  const dynamicTotalStays = Math.round(dynamicRoomsSold * rotationMultiplier);

  const flatDailyRevenue = flatRoomsSold * flatRate;
  const dynamicDailyRevenue = dynamicTotalStays * dynamicRate;
  const dailyGain = dynamicDailyRevenue - flatDailyRevenue;
  const monthlyGain = dailyGain * 30;

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-16">
      {/* Hero Header de Identidad y Respaldo LCM */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-950 via-[#131417] to-[#1a1508] border border-[#d4af37]/30 p-6 sm:p-10 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-zinc-800/80 pb-8">
          <div className="flex items-start sm:items-center gap-5">
            <LCMLogo size="lg" className="shrink-0" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono uppercase text-[#d4af37] font-bold tracking-widest">
                  Autoría Intelectual & Dirección
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#d4af37]/20 text-[#f5d77f] border border-[#d4af37]/40 font-semibold">
                  LCM Total Revenue Framework
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  Modelo por Resultados 15%
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-1 tracking-tight">
                Blue Ocean Revenue Management
              </h1>
              <p className="text-sm sm:text-base text-zinc-300 mt-1 max-w-3xl leading-relaxed">
                Especialistas en hoteles y moteles de renta por tiempo. Adaptamos la ciencia comercial de la gran hotelería tradicional para transformar habitaciones vacías y horas muertas en flujo de caja real.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-[#18181b]/90 border border-[#d4af37]/40 text-center">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">Esquema Aliado</span>
              <span className="text-xl font-black text-[#d4af37] font-mono">85% Neto Hotel</span>
              <span className="text-[10px] text-zinc-500 block">15% a éxito • $0 fijos</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-cyan-500/30 text-center">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">Impacto TRM</span>
              <span className="text-xl font-black text-cyan-400 font-mono">+15% a +35%</span>
              <span className="text-[10px] text-zinc-500 block">En ingresos totales</span>
            </div>
          </div>
        </div>

        {/* Cita del Fundador */}
        <div className="mt-6 flex items-center gap-3 text-xs sm:text-sm text-zinc-300 italic bg-black/40 p-3.5 rounded-2xl border border-zinc-800/80">
          <Quote className="w-5 h-5 text-[#d4af37] shrink-0" />
          <span>
            "Tu inventario ya existe. Nuestra función no es venderte un software ni cobrarte consultorías a ciegas; nosotros invertimos la tecnología, la estrategia y el trabajo operativo. Solo participamos si tu hotel gana más." — <strong>Luis César Monroy</strong>
          </span>
        </div>
      </div>

      {/* Navegación Modular de la Metodología */}
      <div className="bg-[#121316] p-2 rounded-2xl border border-zinc-800 flex flex-wrap gap-1.5 shadow-lg">
        {[
          { id: 'origen_respaldo', label: '1. Respaldo & La Lección de 1996', icon: Award },
          { id: 'trm_vs_rm', label: '2. RM vs. Total Revenue Management', icon: TrendingUp },
          { id: 'tarifa_dinamica', label: '3. Tarifa Plana vs. Dinámica (Simulador)', icon: BarChart3 },
          { id: 'pricing_forecasting', label: '4. Pricing & Forecasting', icon: Compass },
          { id: 'canal_transportistas', label: '5. Doble Canal: Parejas + Transportistas B2B', icon: Truck },
          { id: 'convocatoria_hotelero', label: '6. Convocatoria & Alianza Hotelera', icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#d4af37]/20 text-[#f5d77f] border border-[#d4af37]/50 shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#d4af37]' : 'text-zinc-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* 1. RESPALDO PROFESIONAL & LA LECCIÓN DE 1996 */}
      {/* ======================================================== */}
      {activeTab === 'origen_respaldo' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Tarjeta de Trayectoria y Confianza */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-[#d4af37] font-bold">Autoridad & Experiencia Real</span>
                <h2 className="text-2xl font-bold text-white">¿Quién respalda a Blue Ocean? Luis César Monroy</h2>
              </div>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">
              "No comparto mi trayectoria profesional para presumir credenciales, sino para dar <strong>absoluta certeza y confianza</strong> al hotelero independiente. Saber que quien está gestionando su estrategia tarifaria no es un aficionado digital, sino un directivo con más de tres décadas diseñando y liderando modelos comerciales en las cadenas hoteleras más exigentes del mundo."
            </p>

            {/* Grid de Cadenas & Certificaciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-xs font-mono text-zinc-400 uppercase block font-bold">Cadenas Dirigidas</span>
                <div className="mt-2 space-y-1.5 text-xs text-zinc-200">
                  <p className="font-semibold text-white">• Meliá Hotels International</p>
                  <p className="font-semibold text-white">• Barceló Hotel Group</p>
                  <p className="font-semibold text-white">• Grupo Vidanta</p>
                  <p className="font-semibold text-white">• Grupo Posadas (Fiesta Americana)</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-xs font-mono text-zinc-400 uppercase block font-bold">Revenue & Demanda</span>
                <p className="mt-2 text-xs text-zinc-200 font-semibold">
                  Especialidad en Revenue Management y Gestión de Demanda
                </p>
                <span className="text-[11px] text-[#d4af37] font-mono mt-1 block">ESSEC Business School</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-xs font-mono text-zinc-400 uppercase block font-bold">Finanzas Hoteleras</span>
                <p className="mt-2 text-xs text-zinc-200 font-semibold">
                  Máster en Finanzas Hoteleras y Modelos de Flujo de Caja
                </p>
                <span className="text-[11px] text-[#d4af37] font-mono mt-1 block">Starweaver</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-xs font-mono text-zinc-400 uppercase block font-bold">Hospitalidad & Datos</span>
                <p className="mt-2 text-xs text-zinc-200 font-semibold">
                  Hospitalidad Operativa (Dubai College of Tourism)
                </p>
                <span className="text-[11px] text-cyan-400 font-mono mt-1 block">Google & Microsoft Data Analysis</span>
              </div>
            </div>
          </div>

          {/* La Lección de 1996 y el Nacimiento de las OTAs */}
          <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-[#141208] border border-[#d4af37]/30 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-300">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400 font-bold">Evolución Histórica</span>
                <h3 className="text-2xl font-bold text-white">La Lección de 1996: El Nacimiento del Pago por Resultados</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed">
              <div className="p-5 rounded-2xl bg-zinc-950/80 border border-red-500/20 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-bold font-mono text-xs uppercase">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Antes de 1996: El Modelo a Ciegas</span>
                </div>
                <p className="text-zinc-300 text-xs sm:text-sm">
                  Crecer dependía de tu presupuesto: el hotelero invertía su propio dinero en publicidad a ciegas rezando para que llegaran reservaciones. Pagaba a las Agencias de Viajes y TourOperadores cantidades fijas para pertenecer a sus catálogos, vendieran o no. Si no llegaban clientes, <strong>el dinero se había perdido</strong>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950/80 border border-emerald-500/30 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono text-xs uppercase">
                  <Zap className="w-4 h-4" />
                  <span>1996: La Revolución de las OTAs</span>
                </div>
                <p className="text-zinc-300 text-xs sm:text-sm">
                  Las OTAs cambiaron las reglas con una pregunta disruptiva: <em>"¿Por qué el hotelero debe arriesgar su dinero antes de vender?"</em>. Crearon el modelo por resultados: primero captaron al huésped y solo cuando lograban la venta, ganaban comisión. A partir de ese modelo la industria turística despegó.
                </p>
              </div>
            </div>

            {/* La Injusticia y el Nacimiento de Blue Ocean */}
            <div className="p-6 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 space-y-3">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                ¿Por qué los moteles y hoteles de renta por tiempo se quedaron fuera?
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Durante décadas, solo los grandes resorts de playa y cadenas ejecutivas se beneficiaron del Revenue Management y las OTAs. Los hoteles y moteles independientes de renta por hora quedaron olvidados: operando a ciegas con <strong>tarifas planas</strong>, esperando a pie de carretera sin presencia digital ni reservas previas.
              </p>
              <p className="text-xs sm:text-sm text-[#f5d77f] font-semibold">
                Blue Ocean nace con una idea muy simple: nosotros ponemos la experiencia, la tecnología, la analítica y el trabajo operativo. No cobramos honorarios fijos ni consultorías a ciegas: <strong>solo participamos si tu hotel o motel genera más ingresos (15% de comisión, tú conservas el 85% neto)</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. TOTAL REVENUE MANAGEMENT VS REVENUE MANAGEMENT */}
      {/* ======================================================== */}
      {activeTab === 'trm_vs_rm' && (
        <div className="space-y-8 animate-in fade-in">
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-300">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400 font-bold">Diferenciador Técnico Fundamental</span>
                <h2 className="text-2xl font-bold text-white">Revenue Management vs. Total Revenue Management (TRM)</h2>
              </div>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">
              Muchos hoteleros confunden ambos términos creyendo que son lo mismo. Entender esta diferencia es lo que separa a un motel estancado de uno con <strong>alta rentabilidad y rotación constante</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* RM Tradicional */}
              <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-zinc-200">Revenue Management Tradicional</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-400">Enfoque Limitado</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Se enfoca <strong>únicamente en maximizar el ingreso por la venta de habitaciones</strong> mediante estrategias de precios, pronósticos de demanda y control básico de inventario. Piensa solo en la tarifa de la noche o la habitación individual.
                </p>
                <div className="pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-500 space-y-1">
                  <p>• Mide principalmente RevPAR de habitación</p>
                  <p>• Ignora las horas muertas diurnas</p>
                  <p>• No integra consumos adicionales ni rotación</p>
                </div>
              </div>

              {/* TOTAL Revenue Management */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#d4af37]/15 to-zinc-950 border border-[#d4af37]/40 space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#f5d77f]">Total Revenue Management (Blue Ocean)</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#d4af37]/20 text-[#f5d77f] font-bold border border-[#d4af37]/50">
                    +10% a +35% Ingresos
                  </span>
                </div>
                <p className="text-xs text-zinc-200 leading-relaxed">
                  Amplía ese enfoque y busca <strong>incrementar la rentabilidad total del hotel</strong> aprovechando todas las oportunidades de generación de ingresos: optimización de canales de distribución, venta directa, marketing de microestancia, automatización, segmentación por nicho y rotación acelerada.
                </p>
                <div className="pt-2 border-t border-[#d4af37]/20 text-xs text-zinc-300 space-y-1.5 font-medium">
                  <p className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <strong>Rotación por hora:</strong> Vender la misma habitación 2 a 3 veces al día.
                  </p>
                  <p className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <strong>Consumos adicionales:</strong> Alimentos, minibar, amenidades de confort.
                  </p>
                  <p className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <strong>Segmentación dual:</strong> Parejas (noche) + Transportistas (día).
                  </p>
                </div>
              </div>
            </div>

            {/* Banner de Impacto */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-4">
              <div className="text-xs text-zinc-300">
                <strong className="text-white block sm:inline">Resultado Comprobado:</strong> Los hoteles que implementan una estrategia integral de Total Revenue Management incrementan sus ingresos entre un <strong>10% y un 25% (pudiendo llegar al 35%)</strong> dependiendo de su nivel de digitalización.
              </div>
              <span className="px-3 py-1 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold shrink-0">
                TRevPAR Optimizado
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. TARIFA PLANA VS TARIFA DINÁMICA (CON SIMULADOR) */}
      {/* ======================================================== */}
      {activeTab === 'tarifa_dinamica' && (
        <div className="space-y-8 animate-in fade-in">
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-amber-400 font-bold">Ciencia Tarifaria</span>
                <h2 className="text-2xl font-bold text-white">Tarifa Plana vs. Tarifa Dinámica</h2>
              </div>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">
              La inmensa mayoría de los moteles e independientes operan con <strong>tarifas planas</strong>: cobran exactamente lo mismo un lunes a las 11:00 AM que un viernes de quincena a las 10:00 PM. 
              Esto provoca dos pérdidas masivas:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <span className="font-bold text-rose-300 uppercase font-mono block">1. En Alta Demanda (Pérdida de Excedente):</span>
                <p className="text-zinc-300">
                  Un viernes en la noche tienes 10 personas esperando habitación. Al cobrar tu tarifa plana de $450, <strong>dejas dinero sobre la mesa</strong> cuando el huésped pagaría $650 o $750 felizmente.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                <span className="font-bold text-amber-300 uppercase font-mono block">2. En Baja Demanda (Habitación Vacía):</span>
                <p className="text-zinc-300">
                  Un martes a las 10:00 AM tienes 25 habitaciones vacías. Mantener la tarifa fija de $450 ahuyenta a transportistas y trabajadores que pagarían $350 por dormir 4 horas. <strong>Habitación que no se vende hoy, es ingreso perdido para siempre</strong>.
                </p>
              </div>
            </div>

            {/* Simulador Interactivo */}
            <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-cyan-500/30 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                <div>
                  <span className="text-xs font-mono uppercase text-cyan-400 font-bold flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" />
                    Simulador Interactivo de Captura de Ingresos
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    Comprueba cuánto dinero deja sobre la mesa tu hotel con tarifa plana
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-zinc-400 block">Habitaciones:</span>
                    <select
                      value={roomCount}
                      onChange={(e) => setRoomCount(Number(e.target.value))}
                      className="bg-zinc-900 border border-zinc-700 text-xs font-mono text-white rounded-lg px-2.5 py-1"
                    >
                      <option value={15}>15 habitaciones</option>
                      <option value={25}>25 habitaciones</option>
                      <option value={35}>35 habitaciones</option>
                      <option value={50}>50 habitaciones</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Control Deslizante de Demanda */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-300">Nivel de Demanda del Mercado / Momento:</span>
                  <strong className="text-cyan-400 font-bold text-sm">
                    {simulatedDemand}% {simulatedDemand < 40 ? '(Horas Muertas / Martes 11 AM)' : simulatedDemand < 75 ? '(Demanda Moderada / Jueves)' : '(Alta Demanda / Fin de Semana)'}
                  </strong>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={simulatedDemand}
                  onChange={(e) => setSimulatedDemand(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-2 bg-zinc-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>10% (Poca afluencia)</span>
                  <span>50% (Día normal)</span>
                  <span>100% (Viernes/Sábado Noche)</span>
                </div>
              </div>

              {/* Comparativa Visual de Resultados */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Caja Tarifa Plana */}
                <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold">OPERACIÓN TRADICIONAL (Plana)</span>
                    <span className="text-zinc-300">${flatRate} fijo</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-zinc-300 font-mono">
                    <p className="flex justify-between">
                      <span>Habitaciones vendidas:</span>
                      <strong>{flatRoomsSold} de {roomCount}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span>Rotación diaria:</span>
                      <strong className="text-zinc-500">1.0x (Sin rotación)</strong>
                    </p>
                    <p className="flex justify-between pt-2 border-t border-zinc-800 text-sm">
                      <span>Ingreso Diario:</span>
                      <strong className="text-white font-black">${flatDailyRevenue.toLocaleString()} MXN</strong>
                    </p>
                  </div>
                </div>

                {/* Caja Tarifa Dinámica Blue Ocean */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/30 via-zinc-900/90 to-zinc-900 border border-cyan-500/40 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-cyan-400 font-bold">BLUE OCEAN (Dinámica + TRM)</span>
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                      ${dynamicRate} optimizado
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs text-zinc-300 font-mono">
                    <p className="flex justify-between">
                      <span>Estancias totales (con rotación):</span>
                      <strong className="text-cyan-300">{dynamicTotalStays} estancias</strong>
                    </p>
                    <p className="flex justify-between">
                      <span>Factor de rotación:</span>
                      <strong className="text-emerald-400 font-bold">{rotationMultiplier}x (Choferes + Parejas)</strong>
                    </p>
                    <p className="flex justify-between pt-2 border-t border-cyan-500/20 text-sm">
                      <span>Ingreso Diario Optimizado:</span>
                      <strong className="text-emerald-400 font-black">${dynamicDailyRevenue.toLocaleString()} MXN</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Beneficio Neto Extra para el Hotel */}
              <div className="p-4 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
                <div>
                  <span className="text-zinc-400 uppercase text-[10px] block">Incremento Neto Mensual Estimado:</span>
                  <span className="text-xl sm:text-2xl font-black text-[#f5d77f]">
                    +${monthlyGain.toLocaleString()} MXN / mes adicionales
                  </span>
                </div>
                <div className="text-right sm:text-right text-[11px] text-zinc-300">
                  <span className="text-emerald-400 font-bold block">+${dailyGain.toLocaleString()} MXN más por día</span>
                  <span className="text-zinc-400">85% directo a las arcas del hotel</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. PRICING & FORECASTING */}
      {/* ======================================================== */}
      {activeTab === 'pricing_forecasting' && (
        <div className="space-y-8 animate-in fade-in">
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-purple-400 font-bold">Las Tres Preguntas Clave</span>
                <h2 className="text-2xl font-bold text-white">Pricing & Forecasting: El Corazón de la Estrategia</h2>
              </div>
            </div>

            {/* El Axioma LCM */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-2">
              <span className="text-xs font-mono text-[#d4af37] uppercase font-bold tracking-wider">
                La Regla de Oro de Luis César Monroy
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-sm font-mono">
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-700/60">
                  <span className="text-zinc-400 text-xs block">El Pricing</span>
                  <strong className="text-white text-base">Responde cuánto cobrar</strong>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-700/60">
                  <span className="text-zinc-400 text-xs block">El Revenue Management</span>
                  <strong className="text-[#d4af37] text-base">Responde cómo maximizar</strong>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-700/60">
                  <span className="text-zinc-400 text-xs block">El Forecasting</span>
                  <strong className="text-cyan-400 text-base">Responde cuándo actuar</strong>
                </div>
              </div>
            </div>

            {/* Detalle de Pricing y Forecasting */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Target className="w-4 h-4 text-purple-400" />
                  ¿Qué es el Pricing?
                </h3>
                <p className="text-zinc-300 leading-relaxed text-xs">
                  Pricing es el proceso de definir la estrategia de precios de un hotel. No consiste en asignar una tarifa al azar ni en copiar al motel de enfrente, sino en establecer el precio adecuado considerando costos, competencia, comportamiento de la demanda y el tipo de cliente.
                </p>
                <p className="text-zinc-400 text-xs italic">
                  "El precio correcto no es el más bajo ni el más alto; es el que genera el mayor valor para cada oportunidad de venta."
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  ¿Qué es el Forecasting?
                </h3>
                <p className="text-zinc-300 leading-relaxed text-xs">
                  Sin Forecasting, el Revenue Management deja de ser una estrategia y se convierte en una simple reacción tardía. El Forecasting analiza datos históricos, tendencias, ritmo de reservaciones (pick-up) y estacionalidad.
                </p>
                <p className="text-zinc-400 text-xs italic">
                  "El Forecasting no intenta adivinar lo que ocurrirá. Nos permite tomar decisiones antes de que sucedan las cosas."
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. DOBLE CANAL: PAREJAS + TRANSPORTISTAS B2B (ECATEPEC) */}
      {/* ======================================================== */}
      {activeTab === 'canal_transportistas' && (
        <div className="space-y-8 animate-in fade-in">
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-amber-400 font-bold">Estrategia de Nicho B2B</span>
                <h2 className="text-2xl font-bold text-white">El Doble Canal: Parejas & Romance + Transportistas B2B</h2>
              </div>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">
              El gran error de los moteles tradicionales es depender 100% de la pareja casual de fin de semana. Nuestra estrategia de distribución en <strong>Ecatepec y el Corredor Industrial Central de Abastos</strong> desbloquea un segundo canal masivo y de alto volumen:
            </p>

            {/* Comparativa de los Dos Canales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Canal 1: Parejas */}
              <div className="p-6 rounded-2xl bg-zinc-950 border border-rose-500/30 space-y-4">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <Heart className="w-5 h-5" />
                  <span>Canal 1: Parejas & Corta Estancia</span>
                </div>
                <div className="space-y-2 text-xs text-zinc-300 leading-relaxed">
                  <p><strong>Horarios pico:</strong> Viernes a domingo, tardes y noches (7:00 PM a 4:00 AM).</p>
                  <p><strong>Propuesta de valor:</strong> Discreción absoluta, jacuzzi, tubo, camas suspendidas, ambientación LED íntima, anonimato total desde el coche.</p>
                  <p><strong>Comportamiento:</strong> Alta sensibilidad emocional, pagan tarifas premium en picos de demanda.</p>
                </div>
                <span className="inline-block px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-300 text-[11px] font-mono">
                  Genera el 60% del RevPAR nocturno
                </span>
              </div>

              {/* Canal 2: Transportistas B2B */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-950/20 to-zinc-950 border border-amber-500/40 space-y-4 shadow-xl">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Truck className="w-5 h-5" />
                  <span>Canal 2: Transportistas & Logística B2B</span>
                </div>
                <div className="space-y-2 text-xs text-zinc-300 leading-relaxed">
                  <p><strong>Horarios pico:</strong> Lunes a viernes, <strong>horas muertas diurnas (8:00 AM a 6:00 PM)</strong> y esperas de descarga de madrugada.</p>
                  <p><strong>Propuesta de valor:</strong> Resguardo de unidad en cochera techada con portón cerrado, regadera con agua caliente 24h, cama limpia para sueño reparador y <strong>100% Factura CFDI deducible de viáticos</strong>.</p>
                  <p><strong>Comportamiento:</strong> Empresas pagan viáticos que hoy el chofer pierde durmiendo en el camarote por falta de opciones seguras.</p>
                </div>
                <span className="inline-block px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-[11px] font-mono font-bold">
                  Llena el 100% de las horas muertas diurnas
                </span>
              </div>
            </div>

            {/* El Diagnóstico Humano y Empresarial del Transporte */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                La Realidad del Transportista en Ecatepec y Central de Abastos
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Ecatepec alberga uno de los corredores logísticos e industriales más densos de América Latina (Central de Abastos, Vía Morelos, Autopista México-Pachuca, Lechería). A los choferes de carga pesada las empresas les asignan viáticos; sin embargo, muchos choferes:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300 font-mono">
                <li className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  ❌ <strong>Prefieren dormir en la cabina o el acotamiento</strong> para quedarse con una parte del dinero o porque no conocen moteles con factura.
                </li>
                <li className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  ❌ <strong>Arriesgan su vida y la carga millonaria</strong> ante el crimen carretero al quedarse parados en la orilla de la autopista.
                </li>
                <li className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  ❌ <strong>Sufren accidentes mortales por fatiga</strong> y microsueño al no tener un baño digno ni descanso horizontal adecuado.
                </li>
                <li className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  ❌ <strong>Las empresas no pueden deducir impuestos</strong> si el chofer no presenta un Comprobante Fiscal Digital (CFDI).
                </li>
              </ul>

              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs text-emerald-200">
                <strong>La Solución Blue Ocean B2B:</strong> Negociamos convenios corporativos con líneas de transporte y fleteros de la Central de Abastos. El chofer entra a una villa con cochera segura, duerme 4 o 6 horas en cama de hotel con regadera caliente, y <strong>la empresa recibe su factura deducible al 100%</strong>. El hotel gana ocupación diurna en cuartos que antes estaban vacíos.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. CONVOCATORIA & ALIANZA COMERCIAL HOTELERA */}
      {/* ======================================================== */}
      {activeTab === 'convocatoria_hotelero' && (
        <div className="space-y-8 animate-in fade-in">
          <div className="bg-gradient-to-br from-zinc-900 via-[#14151a] to-zinc-900 border border-[#d4af37]/30 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
              <div>
                <span className="text-xs font-mono uppercase text-[#d4af37] font-bold">
                  Convocatoria Oficial a Hoteles y Moteles de Estancia Corta
                </span>
                <h2 className="text-3xl font-black text-white mt-1">
                  Sé Parte del Hotel Modelo Blue Ocean
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1">
                  Buscamos propiedades en Ecatepec y Estado de México para validar la metodología y consolidar expedientes de rentabilidad.
                </p>
              </div>

              <div className="px-4 py-2 rounded-2xl bg-[#d4af37]/20 border border-[#d4af37]/50 text-center self-start sm:self-auto">
                <span className="text-[10px] font-mono uppercase text-zinc-300 block">Esquema Compartido</span>
                <span className="text-2xl font-black text-[#f5d77f] font-mono">15% a Éxito</span>
              </div>
            </div>

            {/* Los Compromisos Mutuos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Lo que aporta Blue Ocean */}
              <div className="p-6 rounded-2xl bg-zinc-950/80 border border-cyan-500/30 space-y-4">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                  BLUE OCEAN APORTA EL 100%:
                </span>
                <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-200">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Motor de Reservas Web y Móvil:</strong> Plataforma moderna optimizada para reservar habitaciones por horas sin llamadas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Pasarelas de Pago Integradas:</strong> Tarjetas, transferencias y pagos en línea para asegurar reservaciones.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Estrategia de Pricing Dinámico y Forecasting:</strong> Ajuste diario de precios para maximizar RevPAR y horas muertas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Captación y Convenios B2B:</strong> Acuerdos corporativos con empresas de transporte y posicionamiento en Google Maps.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Gestión Operativa de Datos:</strong> Tableros de control en tiempo real para medir ingresos y comisiones.</span>
                  </li>
                </ul>
              </div>

              {/* Lo que hace el Hotel */}
              <div className="p-6 rounded-2xl bg-zinc-950/80 border border-emerald-500/30 space-y-4">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                  TU PROPIEDAD HOTELERA:
                </span>
                <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-200">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>$0 Inversión Inicial:</strong> No pagas cuotas de alta, mensualidades de software ni licencias.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Retén el 85% de cada reserva:</strong> Conservas la inmensa mayoría de los ingresos generados por la plataforma.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Sólo participamos si ganas:</strong> Si una habitación no se vende a través del sistema, no pagas un solo peso.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Emisión de Factura CFDI:</strong> Facilidad de facturación para recibir empresas de transporte y deducir viáticos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Tu inventario ya existe:</strong> No tienes que construir más cuartos; solo poner a trabajar los que hoy están vacíos.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Canal de Contacto Directo */}
            <div className="p-6 rounded-2xl bg-black/60 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-base font-bold text-white">¿Deseas afiliar tu hotel o solicitar un diagnóstico de rentabilidad?</h4>
                <p className="text-xs text-zinc-400">
                  Atención directa de Luis César Monroy • Dirección General Blue Ocean
                </p>
                <p className="text-xs font-mono text-[#d4af37]">
                  direccion@oceanrevenue-management.com • www.oceanrevenue-management.com
                </p>
              </div>

              <a
                href="mailto:direccion@oceanrevenue-management.com?subject=Solicitud%20de%20Afiliacion%20Blue%20Ocean%20-%20Hotel%20Piloto"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-amber-500 hover:from-[#f5d77f] hover:to-amber-400 text-zinc-950 font-extrabold text-xs transition shadow-xl shadow-amber-500/20 shrink-0 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Solicitar Diagnóstico Sin Costo</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
