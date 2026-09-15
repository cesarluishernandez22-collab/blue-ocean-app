import React, { useState } from 'react';
import { 
  ShieldCheck, 
  DollarSign, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Globe, 
  Database, 
  Rocket, 
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';

export function RescueRoadmapView() {
  const [completedSteps, setCompletedSteps] = useState<{ [key: string]: boolean }>({
    step1: false,
    step2: true, // Ya completado por el usuario en Supabase
    step3: false,
    step4: false
  });

  const toggleStep = (step: string) => {
    setCompletedSteps(prev => ({ ...prev, [step]: !prev[step] }));
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Rescate */}
      <div className="bg-gradient-to-r from-blue-900/40 via-zinc-900 to-indigo-950/40 border border-blue-500/30 rounded-2xl p-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Plan de Recuperación y Optimización de Costos</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Hoja de Ruta: De Canva a Vercel + Supabase a Costo $0/mes
          </h2>
          <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
            Aquí tienes la guía paso a paso, sin tecnicismos confusos ni falsas promesas. 
            Vamos a detener las fugas de dinero mensual y dejar tu plataforma montada en la infraestructura estándar que usan las mejores empresas de tecnología.
          </p>
        </div>
      </div>

      {/* Comparativa de Costos Mensuales */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-400" />
          Ahorro Financiero Inmediato
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-red-950/15 border border-red-500/20 space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-red-400">
              <span>Ruta Anterior (Mala Asesoría)</span>
              <span className="text-sm font-bold text-red-300">~$40 - $60 USD / mes</span>
            </div>
            <ul className="text-xs text-zinc-400 space-y-1.5 list-disc list-inside">
              <li>Canva Hosting: Cobro recurrente inútil para webs con reservas.</li>
              <li>Airtable: Cobro por usuario + límites de peticiones.</li>
              <li>Google Sites: Estático, incapaz de procesar pagos o lógica hotelera.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2 shadow-sm">
            <div className="flex justify-between items-center text-xs font-semibold text-emerald-400">
              <span>Nueva Ruta Profesional (Nuestra Propuesta)</span>
              <span className="text-sm font-bold text-emerald-300">$0 USD / mes</span>
            </div>
            <ul className="text-xs text-zinc-300 space-y-1.5 list-disc list-inside">
              <li><strong>Vercel:</strong> Hosting global ultrarrápido con SSL gratis ($0).</li>
              <li><strong>Supabase:</strong> PostgreSQL + Fotos + Autenticación ($0).</li>
              <li><strong>Dominio:</strong> Solo tu renovación anual de ~$12 USD/año con tu registrador.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Los 4 Pasos de Acción */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Los 4 Pasos para Dejar Todo Listo</h3>

        {/* Paso 1: Salir de Canva */}
        <div className={`p-6 rounded-2xl border transition ${
          completedSteps.step1 ? 'bg-zinc-900/40 border-emerald-500/40' : 'bg-zinc-900/80 border-zinc-800'
        }`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5 text-amber-400 font-bold text-sm">
                1
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-white">Cancelar Canva Hosting y Proteger tu Dominio</h4>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Ahorro Inmediato
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Tu dominio te pertenece a ti (lo compraste en GoDaddy, Namecheap, Google Domains u otro registrador). 
                  En Canva simplemente te cobraron por "publicar" un diseño.
                </p>
                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800/80 text-xs text-zinc-400 space-y-1 mt-2">
                  <p className="font-semibold text-zinc-200">Acción recomendada:</p>
                  <p>1. Entra a tu cuenta de Canva → Configuración de cuenta → Facturación y suscripciones.</p>
                  <p>2. Cancela la suscripción de hosting web o publicación de dominio.</p>
                  <p>3. <strong>Tranquilo:</strong> No vas a perder tu dominio porque el dominio vive en el registrador donde pusiste tu tarjeta por primera vez.</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleStep('step1')}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                completedSteps.step1 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
              }`}
            >
              {completedSteps.step1 ? <CheckCircle2 className="w-4 h-4" /> : null}
              <span>{completedSteps.step1 ? 'Completado' : 'Marcar como hecho'}</span>
            </button>
          </div>
        </div>

        {/* Paso 2: Crear Supabase */}
        <div className={`p-6 rounded-2xl border transition ${
          completedSteps.step2 ? 'bg-zinc-900/40 border-emerald-500/40' : 'bg-zinc-900/80 border-zinc-800'
        }`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400 font-bold text-sm">
                2
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-white">Crear tu Base de Datos en Supabase (Gratis)</h4>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    5 Minutos
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Supabase te da una base de datos PostgreSQL real con panel visual para administrar tus hoteles sin tocar la terminal.
                </p>
                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800/80 text-xs text-zinc-400 space-y-1 mt-2">
                  <p className="font-semibold text-zinc-200">Acción recomendada:</p>
                  <p>1. Ve a <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-emerald-400 underline">supabase.com</a> y crea una cuenta gratuita (puedes entrar con Google o GitHub).</p>
                  <p>2. Haz clic en <strong>"New Project"</strong>, nómbralo <code>blue-ocean</code> y elige una contraseña segura.</p>
                  <p>3. En el menú de la izquierda, entra a <strong>"SQL Editor"</strong>, pega el script de la pestaña anterior y dale clic a <strong>"Run"</strong>.</p>
                  <p className="text-emerald-400 font-semibold">¡Listo! En ese instante tendrás tus tablas de hoteles, reservas y comisiones creadas.</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleStep('step2')}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                completedSteps.step2 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
              }`}
            >
              {completedSteps.step2 ? <CheckCircle2 className="w-4 h-4" /> : null}
              <span>{completedSteps.step2 ? 'Completado' : 'Marcar como hecho'}</span>
            </button>
          </div>
        </div>

        {/* Paso 3: Validar en este Workbench */}
        <div className={`p-6 rounded-2xl border transition ${
          completedSteps.step3 ? 'bg-zinc-900/40 border-emerald-500/40' : 'bg-zinc-900/80 border-zinc-800'
        }`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400 font-bold text-sm">
                3
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-white">Validar el Diseño y Flujo en esta Aplicación</h4>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    En Vivo Aquí
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Usa esta misma plataforma en la que estamos para probar las pantallas: 
                  el buscador por horas, el catálogo de fotos, la reserva paso a paso y la propuesta para afiliar hoteles.
                </p>
                <p className="text-xs text-zinc-400">
                  En la pestaña <strong>"Lo que Sí y Lo que No"</strong> me puedes anotar qué te gusta y qué cambiamos antes de publicarlo.
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleStep('step3')}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                completedSteps.step3 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
              }`}
            >
              {completedSteps.step3 ? <CheckCircle2 className="w-4 h-4" /> : null}
              <span>{completedSteps.step3 ? 'Completado' : 'Marcar como hecho'}</span>
            </button>
          </div>
        </div>

        {/* Paso 4: Desplegar en Vercel con tu Dominio */}
        <div className={`p-6 rounded-2xl border transition ${
          completedSteps.step4 ? 'bg-zinc-900/40 border-emerald-500/40' : 'bg-zinc-900/80 border-zinc-800'
        }`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0 mt-0.5 text-purple-400 font-bold text-sm">
                4
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-white">Publicar en Vercel y Vincular tu Dominio</h4>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    Paso Final
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Cuando la web esté tal como la quieres, la subimos a Vercel con 1 clic y apuntamos las DNS de tu dominio para que funcione en <code>www.tudominio.com</code> con certificado de seguridad SSL gratis.
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleStep('step4')}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                completedSteps.step4 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
              }`}
            >
              {completedSteps.step4 ? <CheckCircle2 className="w-4 h-4" /> : null}
              <span>{completedSteps.step4 ? 'Completado' : 'Marcar como hecho'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
