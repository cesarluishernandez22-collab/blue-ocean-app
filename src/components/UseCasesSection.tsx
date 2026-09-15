import React from 'react';
import { 
  Heart, 
  Briefcase, 
  Plane, 
  Sparkles, 
  RefreshCw, 
  Clock, 
  Car, 
  ShieldCheck, 
  ArrowUpRight,
  UserCheck,
  Check
} from 'lucide-react';
import { LCMLogo } from './LCMLogo';

interface UseCasesSectionProps {
  onSelectDuration?: (duration: '4' | '6' | '12' | 'noche') => void;
}

export function UseCasesSection({ onSelectDuration }: UseCasesSectionProps) {
  const cases = [
    {
      id: 'romance',
      icon: Heart,
      accentColor: 'text-[#e07a9e]',
      borderColor: 'border-[#e07a9e]/30',
      badgeBg: 'bg-[#e07a9e]/15 text-[#e07a9e]',
      tag: 'Parejas & Celebración',
      title: 'Escapadas Íntimas & Suites con Jacuzzi',
      horasRecomendadas: '4 a 6 Horas',
      duracionKey: '4' as const,
      description: 'El caso de mayor demanda y rentabilidad. Parejas que buscan privacidad absoluta, diseño de iluminación ambiental, hidromasaje y cochera privada sin necesidad de pernoctar.',
      beneficios: [
        'Acceso discreto sin pasar por recepción principal',
        'Suites equipadas con tina de hidromasaje y room service',
        'Rotación alta los fines de semana y tardes entre semana'
      ],
      ticketPromedio: '$650 - $1,100 MXN'
    },
    {
      id: 'business',
      icon: Briefcase,
      accentColor: 'text-[#38a3a5]',
      borderColor: 'border-[#38a3a5]/30',
      badgeBg: 'bg-[#38a3a5]/15 text-[#38a3a5]',
      tag: 'Ejecutivos & Workation',
      title: 'Day-Use Oficina & Videollamadas Privadas',
      horasRecomendadas: '6 a 12 Horas',
      duracionKey: '6' as const,
      description: 'Profesionales, consultores o nómadas digitales que requieren un espacio silencioso, WiFi de alta velocidad, escritorio ergonómico y baño completo entre reuniones o viajes de trabajo.',
      beneficios: [
        'WiFi dedicado simétrico de alta velocidad',
        'Ambiente libre de ruido para conferencias confidenciales',
        'Cafetería y servicio a la habitación en horario laboral'
      ],
      ticketPromedio: '$550 - $900 MXN'
    },
    {
      id: 'travel',
      icon: Plane,
      accentColor: 'text-[#d4af37]',
      borderColor: 'border-[#d4af37]/30',
      badgeBg: 'bg-[#d4af37]/15 text-[#d4af37]',
      tag: 'Escalas & Conexiones',
      title: 'Descanso en Tránsito & Ducha Reparadora',
      horasRecomendadas: '4 a 12 Horas',
      duracionKey: '12' as const,
      description: 'Viajeros con escalas largas en el aeropuerto o llegadas matutinas en terminales terrestres antes de su check-in habitual. Les permite dormir 4 horas, ducharse y continuar.',
      beneficios: [
        'Cama confortable y ducha de alta presión',
        'Guardaequipaje seguro y estacionamiento vigilado',
        'Check-in flexible a cualquier hora del día'
      ],
      ticketPromedio: '$500 - $850 MXN'
    },
    {
      id: 'wellness',
      icon: Sparkles,
      accentColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      badgeBg: 'bg-emerald-500/15 text-emerald-400',
      tag: 'Relax & Desconexión',
      title: 'Micro-Vacaciones Urbanas & Spa Day',
      horasRecomendadas: '6 a 12 Horas',
      duracionKey: '6' as const,
      description: 'Habitantes de la misma ciudad que buscan desconectarse del estrés urbano durante una tarde, disfrutar de tina caliente, lectura o siesta prolongada en un entorno premium.',
      beneficios: [
        'Amenidades premium y confort acústico',
        'Posibilidad de pedir masajes o alimentos a la suite',
        'Una alternativa accesible y cercana a un resort de fin de semana'
      ],
      ticketPromedio: '$700 - $1,250 MXN'
    }
  ];

  return (
    <section id="como-funciona" className="border-t border-zinc-800 pt-14 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#38a3a5]/15 text-[#38a3a5] border border-[#38a3a5]/30">
              SEGMENTACIÓN DE MERCADO
            </span>
            <span className="text-[11px] text-zinc-500 font-mono">
              Estrategia Blue Ocean
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Casos de Uso de la Metodología LCM: <span className="text-[#38a3a5]">¿Quién renta por horas?</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mt-1">
            Diversificamos la demanda para captar nichos de alto valor que no compiten con la pernocta nocturna, maximizando el factor de ocupación diario.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-[#18181b] px-3.5 py-2 rounded-xl border border-zinc-800 shrink-0">
          <Clock className="w-4 h-4 text-[#d4af37]" />
          <span>Modalidades: <strong>4h, 6h, 12h y Noche</strong></span>
        </div>
      </div>

      {/* Grid de 4 Casos de Uso */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cases.map((c) => {
          const Icon = c.icon;
          return (
            <div 
              key={c.id}
              className={`bg-[#18181b] border ${c.borderColor} rounded-2xl p-6 space-y-4 hover:border-zinc-500 transition shadow-lg flex flex-col justify-between`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold ${c.badgeBg}`}>
                    {c.tag}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-2.5 py-0.5 rounded border border-zinc-800">
                    Estancia: <strong className="text-white">{c.horasRecomendadas}</strong>
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 ${c.accentColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">
                      {c.title}
                    </h3>
                    <span className="text-[11px] font-mono text-zinc-400">
                      Ticket estimado: <strong className="text-white">{c.ticketPromedio}</strong>
                    </span>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {c.description}
                </p>

                <div className="border-t border-zinc-800/80 pt-3 space-y-1.5">
                  {c.beneficios.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-zinc-400">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-500">
                  Reserva sin tarjeta de crédito previa
                </span>
                {onSelectDuration && (
                  <button
                    onClick={() => onSelectDuration(c.duracionKey)}
                    className="text-xs font-bold text-white hover:text-[#e07a9e] inline-flex items-center gap-1 transition font-mono"
                  >
                    <span>Ver Hoteles Disponibles</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
