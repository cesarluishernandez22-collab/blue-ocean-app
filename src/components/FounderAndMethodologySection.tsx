import React, { useState } from 'react';
import { 
  Award, 
  TrendingUp, 
  Clock, 
  Lightbulb, 
  Layers, 
  CheckCircle2, 
  Quote, 
  FileSpreadsheet, 
  Compass, 
  Target, 
  ChevronRight,
  Sparkles,
  Building2,
  Calendar,
  DollarSign
} from 'lucide-react';
import { LCMLogo } from './LCMLogo';

export function FounderAndMethodologySection() {
  const [activeTab, setActiveTab] = useState<'origen' | 'metodologia' | 'resultados'>('metodologia');

  return (
    <section id="fundador" className="border-t border-zinc-800 pt-14 space-y-10">
      {/* Header con Sello y Distintivo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-4">
          <LCMLogo size="lg" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-[#d4af37] font-bold tracking-wider">
                Autoría Intelectual & Consultoría
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40">
                LCM Framework
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Luis César Monroy • Metodología Blue Ocean
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Especialista en Revenue Management, optimización de ocupación ociosa y transformación de modelos hoteleros en México.
            </p>
          </div>
        </div>

        {/* Selector de Pestañas de la Metodología */}
        <div className="flex items-center gap-1 bg-[#18181b] p-1 rounded-xl border border-zinc-800 self-start sm:self-auto font-mono text-xs">
          <button
            onClick={() => setActiveTab('origen')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'origen'
                ? 'bg-zinc-800 text-white font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            1. El Origen
          </button>
          <button
            onClick={() => setActiveTab('metodologia')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'metodologia'
                ? 'bg-[#d4af37]/20 text-[#d4af37] font-bold border border-[#d4af37]/40'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            2. Metodología LCM
          </button>
          <button
            onClick={() => setActiveTab('resultados')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'resultados'
                ? 'bg-zinc-800 text-white font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            3. Resultados Compartidos
          </button>
        </div>
      </div>

      {/* Contenido Condicional de las Pestañas */}
      {activeTab === 'origen' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs text-zinc-300 leading-relaxed">
          <div className="bg-[#18181b] p-6 rounded-2xl border border-zinc-800 space-y-3">
            <div className="flex items-center gap-2 text-[#e07a9e]">
              <Target className="w-4 h-4" />
              <h4 className="text-sm font-bold text-white uppercase font-mono">El Diagnóstico</h4>
            </div>
            <p>
              Durante años de análisis operativo en hotelería urbana, Luis César Monroy identificó una contradicción crítica: <strong>los hoteles invierten millones en infraestructura que permanece apagada durante 8 horas diarias</strong> entre la salida de un huésped y la llegada del siguiente.
            </p>
            <p className="text-zinc-400 text-[11px]">
              La mentalidad tradicional de "vender sólo la noche completa" condena a los hoteles a competir en un Océano Rojo de guerra de precios en Booking o Expedia.
            </p>
          </div>

          <div className="bg-[#18181b] p-6 rounded-2xl border border-zinc-800 space-y-3">
            <div className="flex items-center gap-2 text-[#38a3a5]">
              <Lightbulb className="w-4 h-4" />
              <h4 className="text-sm font-bold text-white uppercase font-mono">El Quiebre de Paradigma</h4>
            </div>
            <p>
              Inspirado en la teoría del <em>Blue Ocean Strategy</em>, Luis César Monroy formuló una premisa audaz: <strong>"No vendas una habitación por 24 horas a una sola persona si puedes vender valor específico en bloques de 4 a 12 horas a dos o tres usuarios diferentes"</strong>.
            </p>
            <p className="text-zinc-400 text-[11px]">
              Esto desbloquea una demanda reprimida de usuarios locales, profesionistas, parejas y viajeros en escala que no tienen interés en pagar una noche completa.
            </p>
          </div>

          <div className="bg-[#18181b] p-6 rounded-2xl border border-[#d4af37]/40 rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <Quote className="w-4 h-4" />
              <h4 className="text-sm font-bold text-white uppercase font-mono">La Visión del Fundador</h4>
            </div>
            <blockquote className="italic text-zinc-300 text-xs border-l-2 border-[#d4af37] pl-3 py-1">
              "El metro cuadrado más costoso en hotelería es la habitación vacía. La renta por tiempo no denigra la propiedad: la vuelve financieramente eficiente e inteligente."
            </blockquote>
            <p className="font-mono text-[10px] text-zinc-500 pt-2">
              — Luis César Monroy, Creador de la metodología
            </p>
          </div>
        </div>
      )}

      {activeTab === 'metodologia' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 space-y-2.5">
            <span className="text-[10px] font-mono text-[#e07a9e] font-bold uppercase block">
              Paso 1: Segmentación de Activo
            </span>
            <h4 className="text-sm font-bold text-white">Inventario Asignado</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              No es necesario abrir todo el hotel. Se inicia con un bloque piloto de 5 a 15 suites de rápida limpieza y acceso cómodo.
            </p>
          </div>

          <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 space-y-2.5">
            <span className="text-[10px] font-mono text-[#38a3a5] font-bold uppercase block">
              Paso 2: Bloques Flexibles
            </span>
            <h4 className="text-sm font-bold text-white">4, 6 y 12 Horas</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Estructura tarifaria matemática donde una estancia de 4 horas cuesta entre el 45% y 55% de la pernocta, produciendo un margen bruto superior.
            </p>
          </div>

          <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 space-y-2.5">
            <span className="text-[10px] font-mono text-[#d4af37] font-bold uppercase block">
              Paso 3: Rotación Ágil
            </span>
            <h4 className="text-sm font-bold text-white">Limpieza Express</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Protocolo estandarizado de cambio de blancos y sanitización en menos de 25 minutos para admitir el siguiente turno sin fricción.
            </p>
          </div>

          <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 space-y-2.5">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">
              Paso 4: Captación Digital
            </span>
            <h4 className="text-sm font-bold text-white">Portal Blue Ocean</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Tráfico segmentado de búsqueda local, geolocalización por zonas metropolitanas y confirmación instantánea sin trámites engorrosos.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'resultados' && (
        <div className="bg-[#18181b] border border-[#d4af37]/30 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <Award className="w-5 h-5" />
              <h3 className="text-lg font-bold text-white">
                Por Qué los Hoteleros Prefieren el Modelo 15% / $0 Inversión
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Eliminamos cualquier conflicto de intereses. No somos una agencia tradicional que te vende campañas de marketing sin garantía de ventas. Si tu hotel no recibe reservaciones verificadas en recepción, no nos pagas ni un solo peso.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="bg-zinc-900/90 p-4 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase block">Cobro en Recepción</span>
              <span className="text-base font-bold text-white">100% Control del Hotel</span>
              <p className="text-[11px] text-zinc-400 font-sans font-normal pt-1">
                El huésped paga en la ventanilla del hotel (efectivo o terminal propia). Cero retenciones intermedias.
              </p>
            </div>

            <div className="bg-zinc-900/90 p-4 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase block">Cero Cuotas Fijas</span>
              <span className="text-base font-bold text-emerald-400">$0 Costo Mensual</span>
              <p className="text-[11px] text-zinc-400 font-sans font-normal pt-1">
                Sin licencias de software, sin costos de setup ni penalizaciones por cancelación o pausa de inventario.
              </p>
            </div>

            <div className="bg-zinc-900/90 p-4 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase block">Auditoría & RevPAR</span>
              <span className="text-base font-bold text-[#d4af37]">+30% a +55% Ingreso</span>
              <p className="text-[11px] text-zinc-400 font-sans font-normal pt-1">
                Acompañamiento continuo de Luis César Monroy para optimizar precios según fines de semana y festivos.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
