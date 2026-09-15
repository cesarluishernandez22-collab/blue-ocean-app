import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  ArrowRight, 
  Sparkles,
  Calculator,
  Layers,
  ChevronRight,
  BarChart3,
  Percent,
  HelpCircle,
  FileCheck2,
  Users
} from 'lucide-react';
import { LCMLogo } from './LCMLogo';

interface CommercialModelSectionProps {
  onOpenAffiliationModal: () => void;
}

export function CommercialModelSection({ onOpenAffiliationModal }: CommercialModelSectionProps) {
  // Interactive Revenue & ROI Calculator for Hotel Owners
  const [habitacionesDisponibles, setHabitacionesDisponibles] = useState<number>(10);
  const [tarifaPromedio4Hrs, setTarifaPromedio4Hrs] = useState<number>(650);
  const [rotacionesDia, setRotacionesDia] = useState<number>(1.5);
  const [diasMes, setDiasMes] = useState<number>(30);

  // Math Calculations:
  // Ingreso Bruto Mensual Generado de Habitaciones que estaban vacías de 10:00 a 18:00
  const estanciasMes = Math.round(habitacionesDisponibles * rotacionesDia * diasMes);
  const ingresoBrutoMensual = estanciasMes * tarifaPromedio4Hrs;
  // Comisión Blue Ocean (15%)
  const comisionBlueOcean = Math.round(ingresoBrutoMensual * 0.15);
  // Ingreso Neto Extra para el Hotelero (85%)
  const ingresoNetoHotelero = ingresoBrutoMensual - comisionBlueOcean;

  return (
    <section id="modelo-hoteleros" className="border-t border-zinc-800 pt-14 space-y-12">
      {/* 1. Header de la Sección con Identidad LCM */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40">
              <Sparkles className="w-3 h-3" />
              METODOLOGÍA DE REVENUE MANAGEMENT
            </span>
            <span className="text-[11px] text-zinc-500 font-mono">
              Autoría: Luis César Monroy
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Modelo Comercial: <span className="text-[#e07a9e]">15% Comisión a Resultados</span> • $0 Inversión Inicial
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed">
            Eliminamos las barreras de entrada tradicionales del software hotelero. No cobramos mensualidades, no exigimos exclusividad ni costos de integración. Únicamente ganamos si tu hotel genera nuevos ingresos en horarios diurnos desaprovechados.
          </p>
        </div>

        <button
          onClick={onOpenAffiliationModal}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa7c11] hover:from-[#f3e5ab] hover:to-[#d4af37] text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition shrink-0"
        >
          <Building2 className="w-4 h-4" />
          <span>Afiliar Propiedad sin Riesgo</span>
        </button>
      </div>

      {/* 2. Comparativa: Modelo Tradicional vs. Metodología Blue Ocean LCM */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card: Modelo Tradicional (Océano Rojo) */}
        <div className="bg-[#18181b]/60 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-red-400 font-bold tracking-wider block">
                Mercado Saturado (Océano Rojo)
              </span>
              <h3 className="text-base font-bold text-white">El Modelo Hotelero Tradicional</h3>
            </div>
            <span className="px-2.5 py-1 rounded text-[10px] font-mono bg-red-950/40 text-red-300 border border-red-800/60">
              Inflexibilidad
            </span>
          </div>

          <ul className="space-y-3 text-xs text-zinc-400">
            <li className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full bg-red-950/80 text-red-400 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-mono">✕</span>
              <span><strong>Activos Ociosos:</strong> Más del 45% del inventario permanece desocupado entre las 10:00 y las 18:00 hrs mientras se espera el check-in de la tarde.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full bg-red-950/80 text-red-400 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-mono">✕</span>
              <span><strong>Costos Fijos Elevados:</strong> Proveedores de software cobran fees mensuales fijos o licencias costosas independientemente de si el hotel vende o no.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full bg-red-950/80 text-red-400 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-mono">✕</span>
              <span><strong>Comisiones Excesivas de OTAs:</strong> Plataformas como Booking y Expedia retienen entre 18% y 25% únicamente por pernoctas rígidas.</span>
            </li>
          </ul>
        </div>

        {/* Card: Metodología Blue Ocean LCM */}
        <div className="bg-[#18181b] border-2 border-[#e07a9e]/40 rounded-2xl p-6 space-y-4 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#e07a9e]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#e07a9e] font-bold tracking-wider block">
                Metodología Innovadora (Océano Azul)
              </span>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Estrategia Blue Ocean & Autoría LCM</span>
                <span className="text-[#d4af37] text-xs">★</span>
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded text-[10px] font-mono bg-[#e07a9e]/20 text-[#e07a9e] border border-[#e07a9e]/40 font-bold">
              15% a Éxito
            </span>
          </div>

          <ul className="space-y-3 text-xs text-zinc-300">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Monetización de Tiempo Muerto:</strong> Habilitación de estancias de 4, 6 y 12 horas en habitaciones preparadas, generando doble ingreso en un solo día.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#38a3a5] shrink-0 mt-0.5" />
              <span><strong>Cero Inversión de Arranque:</strong> El hotel no paga nada por darse de alta, listarse en el catálogo ni conectar su inventario en Airtable.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <span><strong>Alineación Total de Intereses:</strong> Cobramos el 15% solo tras la confirmación de la reserva. El hotel conserva el 85% neto del valor generado.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. Simulador Interactivo de Ingresos Diurnos Adicionales (ROI Calculator) */}
      <div className="bg-[#18181b] border border-zinc-700/80 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-[#d4af37]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Simulador de Ingresos Adicionales por Renta de Tiempo
              </h3>
              <p className="text-xs text-zinc-400">
                Calcula cuánto flujo neto adicional puede generar tu propiedad al mes activando solo una fracción de habitaciones vacías.
              </p>
            </div>
          </div>

          <span className="text-[11px] font-mono text-[#38a3a5] bg-[#38a3a5]/10 border border-[#38a3a5]/30 px-3 py-1 rounded-lg">
            Cálculo en tiempo real
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controles del Simulador */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-mono">
                <span className="text-zinc-300">Habitaciones destinadas a Renta por Tiempo:</span>
                <span className="text-[#e07a9e] font-bold">{habitacionesDisponibles} habitaciones</span>
              </div>
              <input
                type="range"
                min="3"
                max="40"
                step="1"
                value={habitacionesDisponibles}
                onChange={(e) => setHabitacionesDisponibles(parseInt(e.target.value, 10))}
                className="w-full accent-[#e07a9e] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                <span>3 habs (Piloto)</span>
                <span>20 habs</span>
                <span>40 habs (Hotel completo)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5 font-mono">
                <span className="text-zinc-300">Tarifa Promedio por Estancia (4 a 6 horas):</span>
                <span className="text-[#38a3a5] font-bold">${tarifaPromedio4Hrs} MXN</span>
              </div>
              <input
                type="range"
                min="450"
                max="1200"
                step="50"
                value={tarifaPromedio4Hrs}
                onChange={(e) => setTarifaPromedio4Hrs(parseInt(e.target.value, 10))}
                className="w-full accent-[#38a3a5] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                <span>$450 MXN (Express)</span>
                <span>$750 MXN (Confort)</span>
                <span>$1,200 MXN (Suite Jacuzzi)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5 font-mono">
                <span className="text-zinc-300">Rotación promedio estimada por día:</span>
                <span className="text-[#d4af37] font-bold">{rotacionesDia} turnos / día</span>
              </div>
              <input
                type="range"
                min="0.8"
                max="2.5"
                step="0.1"
                value={rotacionesDia}
                onChange={(e) => setRotacionesDia(parseFloat(e.target.value))}
                className="w-full accent-[#d4af37] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                <span>0.8 (Moderada)</span>
                <span>1.5 (Típica fin de semana)</span>
                <span>2.5 (Alta rotación)</span>
              </div>
            </div>
          </div>

          {/* Tarjeta de Resultados del Simulador */}
          <div className="lg:col-span-6 bg-[#121214] border border-zinc-700/90 rounded-xl p-5 space-y-4">
            <div className="text-center pb-3 border-b border-zinc-800">
              <span className="text-[10px] uppercase font-mono text-zinc-400 tracking-wider">
                Ingreso Neto Adicional Estimado para el Propietario (85%)
              </span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono mt-1">
                ${ingresoNetoHotelero.toLocaleString()} <span className="text-xs text-zinc-400 font-normal">MXN / mes</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1">
                Generado a partir de aproximadamente <strong className="text-white font-mono">{estanciasMes}</strong> reservas diurnas mensuales.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-zinc-900/90 p-3 rounded-lg border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Facturación Bruta</span>
                <span className="text-sm font-bold text-white">${ingresoBrutoMensual.toLocaleString()} MXN</span>
              </div>

              <div className="bg-zinc-900/90 p-3 rounded-lg border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Comisión Blue Ocean (15%)</span>
                <span className="text-sm font-bold text-[#e07a9e]">${comisionBlueOcean.toLocaleString()} MXN</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAffiliationModal}
                className="w-full py-3 px-4 rounded-xl bg-[#e07a9e] hover:bg-[#c05c80] text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 transition shadow-md"
              >
                <span>Afiliar mi propiedad para captar estos ingresos</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Los 4 Pilares Operativos de la Metodología LCM */}
      <div className="space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-[11px] font-mono uppercase text-[#38a3a5] font-bold">
            Garantías de Ejecución
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            ¿Cómo protegemos la reputación y operación de tu hotel?
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-[#18181b] p-4 rounded-xl border border-zinc-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-[#e07a9e] border border-zinc-800">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-white">Discreción y Control de Acceso</h4>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Mantenemos altos estándares de privacidad: opciones de cochera privada, entrada directa sin pasar por lobby público cuando la propiedad lo permite.
            </p>
          </div>

          <div className="bg-[#18181b] p-4 rounded-xl border border-zinc-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-[#38a3a5] border border-zinc-800">
              <Clock className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-white">Rotación Dinámica y Limpieza</h4>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Protocolos rápidos de camaristas entre turnos de 4 y 6 horas para garantizar que cada habitación esté impecable para el siguiente huésped.
            </p>
          </div>

          <div className="bg-[#18181b] p-4 rounded-xl border border-zinc-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-[#d4af37] border border-zinc-800">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-white">Seguridad Financiera y Cero Pagos Web No Controlados</h4>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Cero dispersiones web opacas. La regla comercial es estricta: <strong>Pago directo en recepción del hotel</strong> (tarjeta o efectivo en mostrador) o <strong>pasarela enlazada de garantía Ocean Blue</strong> con retención blindada del 15% de comisión antes de confirmar.
            </p>
          </div>

          <div className="bg-[#18181b] p-4 rounded-xl border border-zinc-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-emerald-400 border border-zinc-800">
              <Users className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-white">Acompañamiento Estratégico</h4>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Auditoría mensual de tarifas dirigida por el equipo de Luis César Monroy para ajustar precios según demanda local y temporalidad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
