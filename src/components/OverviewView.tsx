import { Shield, BrainCircuit, Plane, Building2, Terminal, ArrowRight, BookOpen, AlertTriangle, FileCode } from 'lucide-react';
import { ActiveTab, SystemStatus } from '../types';

interface OverviewViewProps {
  systemStatus: SystemStatus | null;
  setActiveTab: (tab: ActiveTab) => void;
}

export function OverviewView({ systemStatus, setActiveTab }: OverviewViewProps) {
  return (
    <div className="space-y-8">
      {/* Hero Manifesto from Prompt Maestro */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 md:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-800 border border-zinc-200">
              <Terminal className="w-3.5 h-3.5 text-zinc-900" />
              <span>NÚCLEO DE INGENIERÍA Y ARQUITECTO MAESTRO</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
              Gobierno Central, Células Operativas y Literatura Especializada
            </h2>
            <p className="text-zinc-600 text-base leading-relaxed">
              No solo dictamos teoría: construimos, estructuramos y generamos procesos deterministas,
              reglas inviolables, flujos de automatización y código de producción. Con memoria adaptativa
              implacable, cada error detectado se convierte en una directriz cerrada e inmutable.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[240px]">
            <button
              id="btn-quick-zero-assumptions"
              onClick={() => setActiveTab('zero_assumptions')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 text-white font-medium text-sm hover:bg-zinc-800 transition-colors shadow-sm"
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Auditar Cero Suposiciones</span>
            </button>
            <button
              id="btn-quick-generate-doc"
              onClick={() => setActiveTab('literature')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-100 text-zinc-900 font-medium text-sm hover:bg-zinc-200 transition-colors border border-zinc-200"
            >
              <BookOpen className="w-4 h-4 text-zinc-600" />
              <span>Generar Literatura</span>
            </button>
          </div>
        </div>

        {/* 3 Core Pillars from Prompt Maestro */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-zinc-100">
          <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200/80 space-y-2">
            <div className="flex items-center gap-2 text-zinc-900 font-semibold text-sm">
              <BrainCircuit className="w-4 h-4 text-purple-600" />
              <span>1. Memoria Adaptativa Implacable</span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Aprendizaje de cada desvío o error. Lo que se equivoca una vez se analiza a nivel estructural
              y se transforma en código cerrado para garantizar que no se repita jamás.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200/80 space-y-2">
            <div className="flex items-center gap-2 text-zinc-900 font-semibold text-sm">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>2. Cero Suposiciones y Ambigüedad</span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Si un requerimiento carece de datos cuantitativos o centros de costos, el agente detiene el diseño
              y exige la definición humana exacta antes de generar compromisos.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200/80 space-y-2">
            <div className="flex items-center gap-2 text-zinc-900 font-semibold text-sm">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>3. Literatura Pedagógica de Grado</span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Redacción de manuales, tratados de Revenue Management y especificaciones técnicas que
              traducen sistemas complejos a lenguaje accesible, profundo y ejecutable.
            </p>
          </div>
        </div>
      </div>

      {/* Células Operativas Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 tracking-tight">
              Fábrica de Agentes & Células Operativas Desplegadas
            </h3>
            <p className="text-xs text-zinc-500">
              Estructuras vivas gobernadas por el Core de Decisión del Arquitecto Maestro
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Célula Tradytec Card */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm flex flex-col justify-between hover:border-zinc-300 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 text-base">Célula Operativa Tradytec</h4>
                    <span className="text-xs text-sky-700 font-medium">Corporativo / TMC / MICE / Leisure</span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ACTIVA
                </span>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed">
                Gobierna estructuras de perfiles de viajeros, convenios aerocomerciales, validación de políticas de viaje
                y el <strong>Core de Decisión del Valor Económico Esperado (VEE)</strong>. Supervisa líneas de crédito,
                antigüedad de saldos y trazabilidad contable sin desvíos.
              </p>

              <div className="space-y-2 pt-2 border-t border-zinc-100 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Core de Decisión:</span>
                  <span className="font-semibold text-zinc-900">VEE + Matriz de Políticas</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Control Financiero:</span>
                  <span className="font-semibold text-zinc-900">Línea de Crédito & Saldo Comprometido</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Modo de Emisión:</span>
                  <span className="font-semibold text-emerald-700">Auditado por Máquina de Estados</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-zinc-100 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">ID: CELL-TRADYTEC-V4</span>
              <button
                id="btn-open-tradytec"
                onClick={() => setActiveTab('tradytec')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-900 hover:underline"
              >
                <span>Acceder al Simulador y Core</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Célula Blue Ocean Card */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm flex flex-col justify-between hover:border-zinc-300 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 text-base">Célula Operativa Blue Ocean</h4>
                    <span className="text-xs text-amber-700 font-medium">Estancia Corta / Renta por Tiempo</span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ACTIVA
                </span>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed">
                Flujos de prospección inbound/outbound y motor de <strong>Diagnóstico Automatizado de Hoteles</strong>.
                Calcula la fuga de comisiones en OTAs (18-25%), optimización de RevPAR y despliega la
                <strong> Promesa Comercial a Resultados sin Costo Fijo</strong> para hoteleros y agentes de campo.
              </p>

              <div className="space-y-2 pt-2 border-t border-zinc-100 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Algoritmo Central:</span>
                  <span className="font-semibold text-zinc-900">Yield Management + Franjas Diurnas</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Modelo de Negocio:</span>
                  <span className="font-semibold text-zinc-900">100% a Éxito (0 Inversión Inicial)</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Herramienta de Campo:</span>
                  <span className="font-semibold text-amber-700">Diagnóstico Instantáneo de Rendimiento</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-zinc-100 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">ID: CELL-BLUEOCEAN-V3</span>
              <button
                id="btn-open-blueocean"
                onClick={() => setActiveTab('blueocean')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-900 hover:underline"
              >
                <span>Acceder al Diagnóstico y Tarifación</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Real-Time Governance Status Bar */}
      <div className="rounded-xl border border-zinc-200 bg-zinc-950 text-white p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <h4 className="font-bold text-sm tracking-wide uppercase text-zinc-200">
                Reglas de Ejecución y Cero Tolerancia al Error
              </h4>
            </div>
            <p className="text-xs text-zinc-400">
              Todos los flujos mantienen estados explícitos, auditables y libres de bucles.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-mono">
            <div className="bg-zinc-900 px-3 py-2 rounded border border-zinc-800">
              <span className="text-zinc-500 block">CERO SUPOSICIONES</span>
              <span className="text-emerald-400 font-bold">ESTRICTO / 100%</span>
            </div>
            <div className="bg-zinc-900 px-3 py-2 rounded border border-zinc-800">
              <span className="text-zinc-500 block">LÍMITES DE AUTORIDAD</span>
              <span className="text-emerald-400 font-bold">ACTIVO CON TOKEN</span>
            </div>
            <div className="bg-zinc-900 px-3 py-2 rounded border border-zinc-800">
              <span className="text-zinc-500 block">TRAZABILIDAD</span>
              <span className="text-emerald-400 font-bold">HASH INDELEBLE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
