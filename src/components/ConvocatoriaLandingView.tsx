import React, { useState } from 'react';
import { 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Layers, 
  Building2, 
  Mail, 
  MessageSquare,
  DollarSign,
  AlertTriangle,
  ChevronDown,
  Quote,
  ShieldCheck,
  Zap,
  Phone,
  BarChart3
} from 'lucide-react';
import { LCMLogo } from './LCMLogo';

interface ConvocatoriaLandingViewProps {
  onGoToHotels?: () => void;
  onGoToPortal?: () => void;
  onGoToSql?: () => void;
}

export function ConvocatoriaLandingView({ onGoToHotels, onGoToPortal }: ConvocatoriaLandingViewProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombreHotel: '',
    contacto: '',
    telefono: '',
    correo: '',
    habitaciones: '20',
    ubicacion: 'Ecatepec / Estado de México'
  });
  const [sentSuccess, setSentSuccess] = useState(false);

  // Galería de Renders de la Convocatoria
  const rendersFila1 = [
    { title: 'Blue Ocean Hotel & Suites', image: '/renders/Polish_20260822_225309771.jpg' },
    { title: 'Blue Ocean Insurgentes Norte', image: '/renders/Polish_20260822_230305219.jpg' },
    { title: 'Blue Ocean Boutique & Spa', image: '/renders/Polish_20260822_230710090.jpg' },
  ];

  const rendersFila2 = [
    { title: 'Motel & Villas Privadas', image: '/renders/image~10.jpg' },
    { title: 'Blue Ocean Luxury Palace', image: '/renders/image~11.jpg' },
    { title: 'Blue Ocean Hotels Estancia Corta', image: '/renders/image~12.jpg' },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setIsContactOpen(false);
    }, 3000);
  };

  return (
    <div className="w-full bg-[#070e1b] text-white selection:bg-[#d4af37]/30 font-sans">

      {/* ========================================================================= */}
      {/* LÁMINA 1: CONVOCATORIA DIRIGIDA A HOTELES Y MOTELES DE ESTANCIA POR HORA */}
      {/* ========================================================================= */}
      <section className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col justify-between border-b border-zinc-800/80">
        <div className="space-y-6 text-center">
          
          {/* Titular Oro Superior */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#f5d77f] uppercase font-serif">
              CONVOCATORIA DIRIGIDA A Hoteles y Moteles de
            </h1>
            <p className="text-2xl sm:text-4xl md:text-5xl font-black text-[#f5d77f] uppercase font-serif">
              estancia por hora.
            </p>
          </div>

          {/* Logotipo Central LCM Oficial */}
          <div className="flex justify-center py-2">
            <LCMLogo size="lg" className="drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]" />
          </div>

          {/* Subtítulo Dorado */}
          <h2 className="text-xl sm:text-3xl font-black text-[#f5d77f]">
            Convertimos habitaciones vacías en ingresos.
          </h2>

          {/* Bloque Superior: Dos Columnas de Texto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto pt-2">
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                Integración Tecnológica y Estrategia de Rentabilidad
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                El objetivo es medir el impacto real en el flujo de caja y consolidar los expedientes de prueba.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-medium">
                Buscamos propiedades de renta por hora para ser hotel modelo de una metodología en etapa de validación diseñada exclusivamente para este sector.
              </p>
            </div>
          </div>

          {/* Destacado Oro: ¿Qué buscamos probar? */}
          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border border-[#d4af37]/40 max-w-4xl mx-auto text-center shadow-lg">
            <p className="text-sm sm:text-base font-bold text-[#f5d77f] leading-relaxed">
              ¿Que buscamos probar? Un modelo de inteligencia artificial, integración de APIS y estratégias de gestión de ingresos, diseñado para captar reservas a través de distintos canales de conversión.
            </p>
          </div>

          {/* Dos Columnas: No inventa herramientas vs Integramos analítica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto pt-2">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-sm sm:text-base font-semibold text-zinc-200 leading-snug">
                No inventa herramientas; articula las que existen en una cadena de valor indivisible
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-sm sm:text-base font-semibold text-zinc-200 leading-snug">
                Integramos la analítica, la estrategia de precios para horas muertas y la captación en línea.
              </p>
            </div>
          </div>

          {/* Frase Azul / Oro Central */}
          <div className="py-2">
            <h3 className="text-lg sm:text-2xl font-black text-cyan-300 tracking-wide">
              BLUE OCEAN aporta la tecnología, la integración analítica, la estrategia y el trabajo operativo.
            </h3>
          </div>

          {/* Frase del 15% Compartido */}
          <div className="p-4 rounded-xl bg-black/40 border border-zinc-700 max-w-4xl mx-auto">
            <p className="text-sm sm:text-base text-zinc-200 font-medium">
              Lo que capte de ingreso este piloto, <strong className="text-white">Participamos únicamente en un esquema por resultados compartidos con el 15%</strong>. Tu éxito es nuestro éxito.
            </p>
          </div>

          {/* Galería de Búsqueda de Hoteles (Exacta al PDF) */}
          <div className="pt-6 space-y-4">
            <div className="p-3 bg-zinc-900/90 rounded-xl border border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
              <span className="font-bold text-zinc-200">Destino: Ecatepec / CDMX</span>
              <span>Fechas: Hoy</span>
              <span>Huéspedes: 2 Adultos</span>
              <span>Modalidad: Por Horas</span>
            </div>

            {/* Fila 1 de Renders */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {rendersFila1.map((item, idx) => (
                <div key={idx} className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 flex flex-col">
                  <div className="aspect-video w-full bg-zinc-950 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover" 
                      onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&auto=format&fit=crop&q=80"; }}
                    />
                  </div>
                  <div className="p-3 text-left flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate mr-2">{item.title}</span>
                    <button 
                      onClick={onGoToHotels}
                      className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[10px] whitespace-nowrap"
                    >
                      Ver Hotel
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Fila 2 de Renders */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {rendersFila2.map((item, idx) => (
                <div key={idx} className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 flex flex-col">
                  <div className="aspect-video w-full bg-zinc-950 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&auto=format&fit=crop&q=80"; }}
                    />
                  </div>
                  <div className="p-3 text-left flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate mr-2">{item.title}</span>
                    <button 
                      onClick={onGoToHotels}
                      className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[10px] whitespace-nowrap"
                    >
                      Ver Hotel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botón ¿Te gustaría participar? Contáctanos */}
          <div className="pt-6">
            <button
              onClick={() => setIsContactOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#d4af37] hover:bg-[#c49f27] text-zinc-950 font-black text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)] transition"
            >
              <MessageSquare className="w-4 h-4 text-zinc-950" />
              <span>¿Te gustaría participar? Contáctanos</span>
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* LÁMINA 2: NUESTRA HISTORIA Y FUNDADOR */}
      {/* ========================================================================= */}
      <section className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col justify-between border-b border-zinc-800/80">
        <div className="space-y-8">
          
          <h2 className="text-3xl sm:text-5xl font-black text-[#f5d77f] font-serif text-center sm:text-left">
            Nuestra Historia y Fundador
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Texto de Trayectoria */}
            <div className="lg:col-span-8 space-y-4 text-zinc-200 text-sm sm:text-base leading-relaxed">
              <p>
                Durante más de tres décadas dentro de la industria hotelera, he vivido diferentes etapas de transformación del sector. Una constante se mantiene hasta hoy: <strong className="text-white">la forma en que los clientes buscan, comparan y reservan define el rumbo de la rentabilidad de cada propiedad.</strong>
              </p>

              <h3 className="text-2xl font-black text-[#f5d77f] pt-2">
                Luis César Monroy
              </h3>

              <p>
                He desarrollado mi trayectoria en el área comercial, Revenue Management y estrategia de negocios en cadenas como <strong className="text-white">Meliá Hotels, Barceló Hotel Group, Vidanta y Grupo Posadas.</strong> Mi formación abarca:
              </p>

              <ul className="space-y-1.5 pl-4 text-sm text-zinc-300 font-medium">
                <li>• Especialidad en Revenue Management y Gestión de Demanda (ESSEC Business School).</li>
                <li>• Máster en Finanzas Hoteleras (Starweaver).</li>
                <li>• Certificación en Hospitalidad Operativa (Dubai College of Tourism).</li>
                <li>• Certificaciones en Análisis de Negocios y Datos (Microsoft y Google).</li>
              </ul>
            </div>

            {/* Insignia Oficial del Fundador */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-zinc-800">
              <LCMLogo size="lg" className="drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]" />
              <span className="text-xs font-mono font-bold text-[#f5d77f] mt-3">Luis César Monroy</span>
              <span className="text-[11px] text-zinc-400 text-center mt-1">Autoría & Metodología Total Revenue</span>
            </div>

          </div>

          {/* La Lección de 1996 */}
          <div className="p-6 rounded-2xl bg-white/5 border border-zinc-800 space-y-3">
            <h3 className="text-lg sm:text-2xl font-black text-[#f5d77f]">
              La Lección de 1996: El Nacimiento del Pago por Resultados
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Antes de 1996, crecer dependía de tu presupuesto: el hotelero invertía su propio dinero en publicidad y comisiones a ciegas, rezando para que llegaran los clientes. Si no llegaban, el dinero se había perdido.
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed">
              En 1996, las OTAs cambiaron las reglas con una pregunta muy simple: <strong className="text-white">"¿Por qué el hotelero debe arriesgar su dinero antes de vender?"</strong>. Crearon el modelo por resultados: primero te consiguen al huésped y, solo cuando cobras, ellos ganan una comisión. Fue entonces que me hice una pregunta: <strong className="text-[#f5d77f]">¿Por qué solo las propiedades con grandes recursos se beneficiarían de este cambio y las pequeñas propiedades no?</strong>
            </p>
          </div>

          {/* Insignias de Formación */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 pt-2">
            <div className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-bold text-zinc-300 font-serif">
              ESSEC BUSINESS SCHOOL
            </div>
            <div className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-bold text-emerald-400 font-mono">
              STARWEAVER FINANCE
            </div>
            <div className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-bold text-cyan-400 font-sans">
              DUBAI College of Tourism
            </div>
          </div>

          <div className="text-center pt-4">
            <a href="mailto:direccion@oceanrevenue-management.com" className="text-xs font-mono text-[#f5d77f] hover:underline">
              direccion@oceanrevenue-management.com
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* LÁMINA 3: ¿QUÉ ES EL SISTEMA INTEGRAL BLUE OCEAN? */}
      {/* ========================================================================= */}
      <section className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col justify-between border-b border-zinc-800/80">
        <div className="space-y-8">
          
          <h2 className="text-3xl sm:text-5xl font-black text-[#f5d77f] font-serif text-center sm:text-left">
            ¿Qué es el Sistema Integral BLUE OCEAN?
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-zinc-200 leading-relaxed">
              <p className="font-semibold text-white">
                No inventamos herramientas tecnológicas; articulamos las que ya existen en una cadena de valor indivisible.
              </p>
              <p>
                Es un enfoque estratégico en el diagnóstico individual de cada propiedad.
              </p>
              <p>
                Integramos la analítica, la gestión de precios para horas muertas y la captación en línea.
              </p>
              <p>
                Blue Ocean es una compilación de herramientas de Inteligencia Artificial que potencia tu negocio, incluyendo:
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-zinc-700 shadow-xl">
                <img 
                  src="/renders/image~10.jpg" 
                  alt="Habitación Blue Ocean" 
                  className="w-full h-56 object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&auto=format&fit=crop&q=80"; }}
                />
              </div>
            </div>
          </div>

          {/* Flecha de Proceso Horizontal (Exacto al PDF) */}
          <div className="pt-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {[
                { title: 'Inteligencia Artificial', color: 'bg-[#d4af37] text-zinc-950 font-black' },
                { title: 'APIS Automatización', color: 'bg-zinc-800 text-zinc-200' },
                { title: 'Agentes de IA Generativa', color: 'bg-zinc-800 text-zinc-200' },
                { title: 'Pasarelas de pago', color: 'bg-zinc-800 text-zinc-200' },
                { title: 'Visibilidad en línea', color: 'bg-[#d4af37] text-zinc-950 font-black' },
                { title: 'Nuevos canales', color: 'bg-zinc-800 text-zinc-200' },
                { title: 'Pricing dinámico', color: 'bg-[#d4af37] text-zinc-950 font-black' },
                { title: 'Estrategias Revenue', color: 'bg-zinc-800 text-zinc-200' }
              ].map((step, i) => (
                <div key={i} className={`p-2.5 rounded-lg text-center text-[10px] leading-tight flex items-center justify-center font-bold border border-zinc-700 ${step.color}`}>
                  {step.title}
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-zinc-800 space-y-3">
            <p className="text-sm sm:text-base font-semibold text-zinc-200">
              Estrategias que, juntas, se traducen en un solo objetivo: <strong className="text-[#f5d77f]">gestionar habitaciones vacías.</strong>
            </p>
            <h4 className="text-base font-black text-white uppercase tracking-wide">
              Nuestra Propuesta de Valor
            </h4>
            <p className="text-sm text-zinc-300">
              Blue Ocean aporta la tecnología, la integración analítica, la estrategia y el trabajo operativo.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* LÁMINA 4: TE LLEVAMOS AL MERCADO DIGITAL PARA CAPTAR RESERVACIONES EN LÍNEA */}
      {/* ========================================================================= */}
      <section className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col justify-between border-b border-zinc-800/80">
        <div className="space-y-8">
          
          <h2 className="text-3xl sm:text-5xl font-black text-[#f5d77f] font-serif text-center">
            Te llevamos al mercado digital para captar reservaciones en línea.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-white/5 border border-zinc-800">
                <p className="text-sm font-bold text-zinc-200">
                  "Visualización intuitiva: Diseñada para maximizar la captación."
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-zinc-800">
                <p className="text-sm font-bold text-zinc-200">
                  "Interfaces de alto impacto diseñadas para convertir visitas en reservas, integrando gestión de inventario y visibilidad en tiempo real."
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-[#d4af37]/40">
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                  "Nuestra interfaz transforma la búsqueda de tus huéspedes en una experiencia fluida. Optimizada para destacar atributos clave de cada propiedad, facilitando la toma de decisiones y acelerando la conversión en reservas directas."
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-zinc-800">
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  "Más que una galería, es un motor de ventas. Cada elemento visual está integrado con nuestro sistema de pricing dinámico y segmentación, asegurando que la propiedad correcta llegue al cliente adecuado en el momento justo."
                </p>
              </div>
            </div>

            {/* Mockup de Galería */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <img src="/renders/Polish_20260822_225309771.jpg" alt="Render 1" className="rounded-xl aspect-video object-cover border border-zinc-700" />
                <img src="/renders/Polish_20260822_230305219.jpg" alt="Render 2" className="rounded-xl aspect-video object-cover border border-zinc-700" />
                <img src="/renders/image~10.jpg" alt="Render 3" className="rounded-xl aspect-video object-cover border border-zinc-700" />
                <img src="/renders/image~12.jpg" alt="Render 4" className="rounded-xl aspect-video object-cover border border-zinc-700" />
              </div>
              <button
                onClick={onGoToHotels}
                className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider"
              >
                Abrir Catálogo de Propiedades y Renders
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* LÁMINA 5: MUCHOS CONFUNDEN EL REVENUE MANAGEMENT CON EL TOTAL REVENUE MANAGEMENT */}
      {/* ========================================================================= */}
      <section className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col justify-between border-b border-zinc-800/80">
        <div className="space-y-8">
          
          <h2 className="text-3xl sm:text-5xl font-black text-[#f5d77f] font-serif text-center">
            Muchos confunden el Revenue Management con el Total Revenue Management
          </h2>

          <div className="p-4 rounded-xl bg-white/5 border border-zinc-800 max-w-4xl mx-auto text-center">
            <p className="text-sm sm:text-base font-semibold text-zinc-200">
              El Revenue Management se enfoca principalmente en maximizar los ingresos por la venta de habitaciones mediante estrategias de precios, pronósticos de demanda y control del inventario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Gráfica de Barras Amarillas Crecientes con Monedas */}
            <div className="md:col-span-5 p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
              <div className="flex items-end justify-center gap-4 h-64 pt-6 px-2">
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full bg-[#d4af37]/60 rounded-t-lg h-24 flex items-center justify-center text-xs font-bold text-zinc-950">10</div>
                  <span className="text-[10px] font-mono text-zinc-400">AGOSTO</span>
                </div>
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full bg-[#d4af37]/80 rounded-t-lg h-36 flex items-center justify-center text-xs font-bold text-zinc-950">15</div>
                  <span className="text-[10px] font-mono text-zinc-400">SEPTIEMBRE</span>
                </div>
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full bg-[#d4af37] rounded-t-lg h-48 flex items-center justify-center text-xs font-bold text-zinc-950">20</div>
                  <span className="text-[10px] font-mono text-zinc-400">OCTUBRE</span>
                </div>
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full bg-gradient-to-t from-[#d4af37] to-[#fbe89d] rounded-t-lg h-60 flex items-center justify-center text-xs font-black text-zinc-950 shadow-lg">30+</div>
                  <span className="text-[10px] font-mono font-bold text-[#f5d77f]">NOVIEMBRE</span>
                </div>
              </div>
            </div>

            {/* Texto de Total Revenue Management */}
            <div className="md:col-span-7 space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              <p>
                El <strong className="text-[#f5d77f]">Total Revenue Management</strong> amplía ese enfoque y busca incrementar la rentabilidad del hotel aprovechando todas las oportunidades de generación de ingresos. Además de la estrategia tarifaria, incorpora la optimización de canales de distribución, venta directa, marketing, automatización, segmentación de clientes, análisis de datos y otras estrategias comerciales que permiten vender más y mejor.
              </p>

              <p>
                En <strong className="text-white">Blue Ocean Revenue Management</strong> aplicamos un enfoque de Total Revenue Management, porque creemos que aumentar la rentabilidad de un hotel no depende únicamente del precio de una habitación, sino de una estrategia integral que maximice cada oportunidad de venta.
              </p>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-[#d4af37]/40 text-[#f5d77f] font-bold">
                Los hoteles que implementan una estrategia integral de Total Revenue Management pueden incrementar sus ingresos entre un 10% y un 25%, dependiendo de su nivel de digitalización, estrategia comercial y ejecución.
              </div>
            </div>

          </div>

          <div className="text-center pt-2">
            <span className="text-xs font-mono text-[#f5d77f]">direccion@oceanrevenue-management.com</span>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* LÁMINA 6: TARIFA DINÁMICA */}
      {/* ========================================================================= */}
      <section className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col justify-between border-b border-zinc-800/80">
        <div className="space-y-8">
          
          <h2 className="text-3xl sm:text-5xl font-black text-[#f5d77f] font-serif text-center">
            TARIFA DINÁMICA
          </h2>

          <div className="p-4 rounded-xl bg-white/5 border border-zinc-800 max-w-4xl mx-auto text-center">
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
              Parte fundamental del Revenue Management es utilizar de manera adecuada la tarifa dinámica. <strong className="text-white">No cambia el valor de la habitación; cambia la forma de aprovechar cada oportunidad de venta.</strong> Ajusta el precio de acuerdo con la demanda, la disponibilidad y el momento de compra para obtener el mejor ingreso posible de cada habitación.
            </p>
          </div>

          {/* Dos Cuadros Comparativos: Tarifa Dinámica vs Tarifa Plana */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
              <span className="text-xs font-mono font-bold text-[#f5d77f] uppercase block">TARIFA DINÁMICA</span>
              <div className="h-32 flex items-end justify-center gap-2">
                <div className="w-10 bg-[#d4af37] h-32 rounded-t"></div>
                <div className="w-10 bg-[#d4af37] h-20 rounded-t"></div>
                <div className="w-10 bg-[#d4af37] h-12 rounded-t"></div>
                <div className="w-10 bg-[#d4af37] h-8 rounded-t"></div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                La gráfica muestra como se logra captar mayor ingreso utilizando tarifas dinámicas adaptadas al momento de compra y horas diurnas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase block">TARIFA PLANA</span>
              <div className="h-32 flex items-end justify-center gap-2">
                <div className="w-10 bg-zinc-600 h-16 rounded-t"></div>
                <div className="w-10 bg-zinc-600 h-16 rounded-t"></div>
                <div className="w-10 bg-zinc-600 h-16 rounded-t"></div>
                <div className="w-10 bg-zinc-600 h-16 rounded-t"></div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                La tarifa plana logra capturar recursos base a través de la tarifa BAR (mejor tarifa disponible), dejando dinero sobre la mesa.
              </p>
            </div>

          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-zinc-800 space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white">
              Las habitaciones tienen un valor. La estrategia determina cuánto de ese valor puede convertirse en ingresos.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300">
              No se trata solamente de subir o bajar tarifas. Se trata de entender:
            </p>
            <ul className="text-xs sm:text-sm text-[#f5d77f] font-semibold space-y-1">
              <li>• Cuándo existe mayor oportunidad de venta.</li>
              <li>• Qué comportamiento tiene la demanda.</li>
              <li>• Cómo aprovechar mejor cada habitación disponible.</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* LÁMINA 7: ¿QUÉ ES EL PRICING? */}
      {/* ========================================================================= */}
      <section className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col justify-between border-b border-zinc-800/80">
        <div className="space-y-8">
          
          <h2 className="text-3xl sm:text-5xl font-black text-[#f5d77f] font-serif text-center">
            ¿Qué es el Pricing?
          </h2>

          <div className="p-4 rounded-xl bg-white/5 border border-zinc-800 max-w-4xl mx-auto text-center">
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
              Pricing es el proceso de definir la estrategia de precios de un hotel. No consiste en asignar una tarifa al azar, sino en establecer el precio adecuado considerando los costos, la competencia, la demanda, el tipo de cliente y los objetivos de rentabilidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-[#d4af37]/40 font-semibold text-white">
                El precio correcto no es el más bajo ni el más alto; es el que genera el mayor valor para cada oportunidad de venta.
              </div>

              <p>
                Analizamos la información de tu hotel para construir una estrategia de precios basada en datos, identificando el rango de tarifas más conveniente para cada escenario de demanda, con el objetivo de incrementar la rentabilidad sin perder competitividad.
              </p>

              <p className="font-bold text-white">
                Un buen pricing permite vender más habitaciones cuando la demanda es baja y maximizar los ingresos cuando la demanda aumenta.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center mx-auto text-[#f5d77f]">
                <DollarSign className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#f5d77f]">
                Te ayudamos a calcular tu Pricing.
              </h3>
              <p className="text-xs text-zinc-400">
                Sin costo ni compromiso en el diagnóstico inicial de tu hotel o motel.
              </p>
              <button
                onClick={() => setIsContactOpen(true)}
                className="px-6 py-3 rounded-xl bg-[#d4af37] hover:bg-[#c49f27] text-zinc-950 font-black text-xs uppercase tracking-wider shadow-lg transition"
              >
                Solicitar Cálculo de Pricing
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* LÁMINA 8: EL FORECASTING */}
      {/* ========================================================================= */}
      <section className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col justify-between border-b border-zinc-800/80">
        <div className="space-y-8">
          
          <div className="p-4 rounded-xl bg-amber-500/15 border border-[#d4af37]/50 max-w-4xl mx-auto text-center">
            <h2 className="text-lg sm:text-2xl font-black text-[#f5d77f] font-serif">
              "El Forecasting no intenta adivinar lo que ocurrirá. Nos permite tomar decisiones antes de que SUCEDAN LAS COSAS."
            </h2>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-4xl mx-auto">
            <p>
              <strong className="text-white">El corazón del Total Revenue Management es el Forecasting.</strong> Sin Forecasting, el Revenue Management deja de ser una estrategia y se convierte en una reacción.
            </p>
            <p>
              El Forecasting permite anticipar el comportamiento de la demanda mediante el análisis de datos, tendencias, estacionalidad, comportamiento de clientes, ritmo de reservaciones y condiciones del mercado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            <div className="p-6 rounded-2xl bg-white/5 border border-zinc-800 space-y-3 text-xs sm:text-sm text-zinc-200">
              <p className="font-bold text-white">
                No busca adivinar el futuro. Busca preparar al hotel para tomar mejores decisiones antes de que cambien las condiciones del mercado.
              </p>
              <p>
                Gracias al Forecasting, un hotel puede definir mejores precios, administrar su disponibilidad, activar promociones en el momento adecuado y aprovechar nuevas oportunidades de ingreso.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 text-xs sm:text-sm text-zinc-300">
              <p>
                En <strong className="text-white">Blue Ocean</strong> utilizamos Forecasting como el punto de partida para construir estrategias comerciales más inteligentes y ayudar a los hoteles independientes a tomar decisiones basadas en información, no en intuición.
              </p>
              
              <div className="pt-2 space-y-1 font-mono text-xs">
                <p className="text-[#f5d77f] font-bold">• El Pricing responde cuánto cobrar.</p>
                <p className="text-cyan-400 font-bold">• El Revenue Management responde cómo maximizar.</p>
                <p className="text-emerald-400 font-bold">• El Forecasting responde cuándo actuar.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* LÁMINA 9: CANALES DE DISTRIBUCIÓN */}
      {/* ========================================================================= */}
      <section className="min-h-[70vh] py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col justify-center items-center text-center border-b border-zinc-800/80">
        <div className="space-y-6">
          <h2 className="text-4xl sm:text-6xl font-black text-white font-serif tracking-wide">
            Canales de distribución
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
            Apertura de demanda directa: clientes de paso, parejas por horas y convenios de descanso con transportistas de carga en corredores logísticos.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <span className="px-4 py-2 rounded-full bg-white/10 text-xs font-bold text-cyan-300 border border-cyan-500/30">
              Canal Parejas / Microestancia
            </span>
            <span className="px-4 py-2 rounded-full bg-white/10 text-xs font-bold text-amber-300 border border-amber-500/30">
              Canal B2B Transportistas (CFDI SAT)
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* LÁMINA 10: PROYECCIÓN DE IMPACTO Y RENDIMIENTO */}
      {/* ========================================================================= */}
      <section className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col justify-between border-b border-zinc-800/80">
        <div className="space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-5xl font-black text-[#f5d77f] font-serif">
              Proyección de Impacto y Rendimiento en Habitaciones de Estancia Corta.
            </h2>
            <p className="text-sm sm:text-base text-zinc-200">
              Medimos la eficiencia operativa para transformar horas muertas en flujo de caja real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Gráfica de Barras Azules con Fondo de Habitación */}
            <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-center space-y-4 relative overflow-hidden">
              <div className="flex items-end justify-center gap-3 h-56 pt-6 px-2">
                <div className="w-8 bg-cyan-700 h-16 rounded-t"></div>
                <div className="w-8 bg-cyan-600 h-24 rounded-t"></div>
                <div className="w-8 bg-cyan-500 h-32 rounded-t"></div>
                <div className="w-8 bg-cyan-400 h-44 rounded-t"></div>
                <div className="w-8 bg-cyan-300 h-52 rounded-t"></div>
              </div>
              <span className="text-[10px] font-mono text-zinc-400">Semana 1 ➔ Semana 6 de Implementación</span>
            </div>

            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-white/5 border border-zinc-800">
                <h3 className="text-base sm:text-lg font-bold text-[#f5d77f] leading-snug">
                  "Proyección estimada de incremento en ingresos por optimización de tarifas y horas muertas: 15% a 35%."
                </h3>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-zinc-800">
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  <strong className="text-white">Modelo Basado en Datos impulsado por IA</strong> y automatización de canales de conversión para garantizar que cada hora disponible del día genere facturación.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* LÁMINA 11: DISEÑAMOS UN PLAN A LA MEDIDA DE TU PROPIEDAD */}
      {/* ========================================================================= */}
      <section className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col justify-between">
        <div className="space-y-8 text-center">
          
          <h2 className="text-3xl sm:text-5xl font-black text-[#f5d77f] font-serif">
            Diseñamos un plan a la medida de tu propiedad
          </h2>

          <div className="max-w-3xl mx-auto space-y-3 text-xs sm:text-sm text-zinc-200 leading-relaxed">
            <p>
              Blue Ocean nace impulsado para romper esa barrera en el hotel y motel de estancia corta.
            </p>
            <p>
              Aportamos la experiencia, la tecnología y el trabajo operativo. <strong className="text-white">No cobramos consultorías fijas: solo participamos sobre el incremento real de tus ingresos.</strong>
            </p>
          </div>

          {/* Gran Emblema Dorado LCM Oficial */}
          <div className="flex justify-center py-4">
            <LCMLogo size="xl" className="drop-shadow-[0_0_35px_rgba(212,175,55,0.5)]" />
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-zinc-800 max-w-2xl mx-auto">
            <p className="text-sm sm:text-base font-bold text-white">
              Nosotros ponemos la experiencia, la tecnología y el trabajo operativo. Si tu hotel no gana más, nosotros no cobramos.
            </p>
          </div>

          <div className="py-2 space-y-2">
            <h3 className="text-xl sm:text-3xl font-black text-[#f5d77f] font-serif">
              Vender tiempo y espacio al precio correcto en el momento exacto es nuestra misión
            </h3>
          </div>

          {/* Botón WhatsApp / Contáctanos */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsContactOpen(true)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#d4af37] hover:bg-[#c49f27] text-zinc-950 font-black text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(212,175,55,0.5)] transition"
            >
              <MessageSquare className="w-5 h-5 text-zinc-950" />
              <span>Contactanos</span>
            </button>

            <a
              href="mailto:direccion@oceanrevenue-management.com"
              className="text-xs font-mono text-zinc-300 hover:text-[#f5d77f] underline"
            >
              direccion@oceanrevenue-management.com
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* MODAL DE POSTULACIÓN HOTEL MODELO */}
      {/* ========================================================================= */}
      {isContactOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b1424] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#d4af37]/40 relative text-left">
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 font-bold"
            >
              ✕
            </button>

            <div className="space-y-2 mb-6">
              <span className="text-[11px] font-mono font-bold text-[#f5d77f] uppercase block">
                Postulación de Propiedad
              </span>
              <h3 className="text-xl font-bold text-white font-serif">
                Participar como Hotel Modelo en el Piloto
              </h3>
              <p className="text-xs text-zinc-400">
                100% a resultados con el 15%. Tú no inviertes nada.
              </p>
            </div>

            {sentSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-emerald-200">¡Postulación Recibida!</h4>
                <p className="text-xs text-emerald-300">
                  Luis César Monroy revisará los datos de tu hotel y te contactará en breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">Nombre del Hotel o Motel *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Motel Insurgentes Suites"
                    value={formData.nombreHotel}
                    onChange={(e) => setFormData({ ...formData, nombreHotel: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl bg-black/40 border border-zinc-700 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Contacto / Propietario *</label>
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre"
                      value={formData.contacto}
                      onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl bg-black/40 border border-zinc-700 text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Teléfono / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+52 55..."
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl bg-black/40 border border-zinc-700 text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">Ubicación / Municipio</label>
                  <input
                    type="text"
                    placeholder="Ecatepec, Tlalnepantla, CDMX..."
                    value={formData.ubicacion}
                    onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl bg-black/40 border border-zinc-700 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#d4af37] hover:bg-[#c49f27] text-zinc-950 font-black text-xs uppercase tracking-wider shadow-lg transition"
                >
                  Enviar Postulación Sin Costo
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
