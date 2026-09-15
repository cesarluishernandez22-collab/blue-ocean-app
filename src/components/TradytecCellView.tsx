import { useState } from 'react';
import { Plane, CheckCircle2, AlertTriangle, ShieldCheck, CreditCard, User, Layers, RefreshCw, FileText, ArrowRight } from 'lucide-react';
import { TradytecProfile, TradytecEvaluationResult } from '../types';
import { INITIAL_TRADYTEC_PROFILES } from '../data/initialData';

export function TradytecCellView() {
  const [profiles] = useState<TradytecProfile[]>(INITIAL_TRADYTEC_PROFILES);
  const [selectedProfileId, setSelectedProfileId] = useState<string>(profiles[0].id);

  const activeProfile = profiles.find(p => p.id === selectedProfileId) || profiles[0];

  // Simulation inputs
  const [routeType, setRouteType] = useState<'Nacional' | 'Internacional'>('Nacional');
  const [quotedAmount, setQuotedAmount] = useState<number>(540);
  const [advanceDays, setAdvanceDays] = useState<number>(10);
  const [hasAgreement, setHasAgreement] = useState<boolean>(true);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<TradytecEvaluationResult | null>(null);

  const handleEvaluate = async () => {
    setIsEvaluating(true);
    try {
      const response = await fetch('/api/tradytec/evaluate-decision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          travelerLevel: activeProfile.hierarchyLevel,
          routeType,
          quotedAmount,
          advanceDays,
          corporateAgreement: hasAgreement,
          creditLineTotal: activeProfile.authorizedCreditLimit,
          creditLineUsed: activeProfile.currentCreditUsed,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setEvaluationResult(data.evaluation);
      }
    } catch (e) {
      console.error('Error evaluating Tradytec decision:', e);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
              <Plane className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-zinc-900">
                  Célula Operativa Tradytec
                </h2>
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-sky-100 text-sky-800">
                  TMC & MICE CORE
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                Core de Decisión del Valor Económico Esperado (VEE), validación de convenios y control de crédito corporativo.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-500">Reglas Activas: 24</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              Trazabilidad 100%
            </span>
          </div>
        </div>
      </div>

      {/* Profile selector & Corporate Account Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
              <User className="w-4 h-4 text-sky-700" />
              <span>Perfil Corporativo Activo</span>
            </h3>
            <span className="text-xs font-mono text-zinc-400">ID: {activeProfile.id}</span>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-medium text-zinc-600 block">
              Seleccionar Colaborador / Viajero:
            </label>
            <select
              id="select-tradytec-profile"
              value={selectedProfileId}
              onChange={(e) => {
                setSelectedProfileId(e.target.value);
                setEvaluationResult(null);
              }}
              className="w-full text-xs font-medium rounded-lg border border-zinc-300 p-2.5 bg-zinc-50 text-zinc-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              {profiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.travelerName} ({p.hierarchyLevel} - {p.costCenter})
                </option>
              ))}
            </select>
          </div>

          {/* Profile Details Card */}
          <div className="rounded-lg bg-zinc-50 p-3.5 space-y-2.5 border border-zinc-200 text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-500">Jerarquía / Rol:</span>
              <span className="font-semibold text-zinc-900">{activeProfile.hierarchyLevel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Centro de Costos:</span>
              <span className="font-mono text-zinc-800">{activeProfile.costCenter}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Tope Hotel / Noche:</span>
              <span className="font-semibold text-zinc-900">${activeProfile.hotelMaxRatePerNight} USD</span>
            </div>
            <div className="pt-2 border-t border-zinc-200/60">
              <span className="text-zinc-500 block mb-1">Convenio Preferente:</span>
              <span className="font-medium text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-100 block truncate">
                {activeProfile.preferredAirlineAgreement}
              </span>
            </div>
          </div>

          {/* Credit status gauge */}
          <div className="rounded-lg border border-zinc-200 p-3.5 space-y-2 bg-white text-xs">
            <div className="flex items-center justify-between">
              <span className="font-medium text-zinc-700 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-zinc-500" />
                <span>Línea de Crédito</span>
              </span>
              <span className="font-bold text-zinc-900">
                ${activeProfile.authorizedCreditLimit.toLocaleString()} USD
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-100 overflow-hidden">
              <div
                className="h-full bg-sky-600 rounded-full"
                style={{
                  width: `${Math.min(100, (activeProfile.currentCreditUsed / activeProfile.authorizedCreditLimit) * 100)}%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between text-[11px] text-zinc-500">
              <span>Utilizado: ${activeProfile.currentCreditUsed.toLocaleString()} USD</span>
              <span className="font-semibold text-emerald-700">
                Disp: ${(activeProfile.authorizedCreditLimit - activeProfile.currentCreditUsed).toLocaleString()} USD
              </span>
            </div>
          </div>
        </div>

        {/* Live Decision Core Simulator */}
        <div className="lg:col-span-2 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-700" />
                <span>Simulador del Core de Decisión (Algoritmo VEE)</span>
              </h3>
              <p className="text-xs text-zinc-500">
                Somete una cotización de viaje corporativo a validación en tiempo real.
              </p>
            </div>
            <button
              id="btn-run-tradytec-evaluation"
              onClick={handleEvaluate}
              disabled={isEvaluating}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-700 text-white font-medium text-xs hover:bg-sky-800 transition-colors shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isEvaluating ? 'animate-spin' : ''}`} />
              <span>{isEvaluating ? 'Evaluando...' : 'Evaluar Solicitud'}</span>
            </button>
          </div>

          {/* Form inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-zinc-700">Tipo de Ruta:</label>
              <select
                id="select-tradytec-route"
                value={routeType}
                onChange={(e) => setRouteType(e.target.value as 'Nacional' | 'Internacional')}
                className="w-full rounded-md border border-zinc-300 p-2 text-zinc-900 bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
              >
                <option value="Nacional">Ruta Nacional (Vuelo doméstico)</option>
                <option value="Internacional">Ruta Internacional (Intercontinental)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-zinc-700">Monto Cotizado (USD):</label>
              <input
                id="input-tradytec-amount"
                type="number"
                value={quotedAmount}
                onChange={(e) => setQuotedAmount(Number(e.target.value))}
                className="w-full rounded-md border border-zinc-300 p-2 text-zinc-900 bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-zinc-700">Días de Anticipación a la Salida:</label>
              <input
                id="input-tradytec-advance"
                type="number"
                value={advanceDays}
                onChange={(e) => setAdvanceDays(Number(e.target.value))}
                className="w-full rounded-md border border-zinc-300 p-2 text-zinc-900 bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 font-mono"
              />
            </div>

            <div className="space-y-1.5 flex flex-col justify-end">
              <label className="flex items-center gap-2 cursor-pointer p-2 rounded-md border border-zinc-200 hover:bg-zinc-50">
                <input
                  id="checkbox-tradytec-agreement"
                  type="checkbox"
                  checked={hasAgreement}
                  onChange={(e) => setHasAgreement(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500"
                />
                <span className="text-zinc-800 font-medium">Aplicar Convenio Corporativo (Descuento 12%)</span>
              </label>
            </div>
          </div>

          {/* Results Box */}
          {evaluationResult && (
            <div
              className={`rounded-xl p-5 border transition-all ${
                evaluationResult.isApproved
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50/70 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  {evaluationResult.isApproved ? (
                    <CheckCircle2 className="w-7 h-7 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-7 h-7 text-amber-600 flex-shrink-0" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base">
                        Estado de Máquina: {evaluationResult.machineState}
                      </h4>
                      <span className="text-xs px-2 py-0.5 rounded font-mono font-semibold bg-white border border-zinc-200">
                        VEE: {evaluationResult.veeScore}/100
                      </span>
                    </div>
                    <p className="text-xs mt-0.5">
                      {evaluationResult.isApproved
                        ? 'La cotización cumple estrictamente con el techo de tarifa, anticipación mínima y margen de crédito.'
                        : evaluationResult.holdReason}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-zinc-500 whitespace-nowrap">
                  {evaluationResult.auditLogId}
                </span>
              </div>

              {/* Detailed Evaluation Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-zinc-200/60 text-xs">
                <div>
                  <span className="text-zinc-500 block">Techo Máximo:</span>
                  <span className="font-mono font-bold">${evaluationResult.maxAllowedFare} USD</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Anticipación Mínima:</span>
                  <span className="font-mono font-bold">{evaluationResult.minRequiredAdvance} días</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Ahorro Convenio:</span>
                  <span className="font-mono font-bold text-emerald-700">
                    +${evaluationResult.agreementDiscountApplied.toFixed(2)} USD
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Autorización Directiva:</span>
                  <span className={`font-semibold ${evaluationResult.requiresDirectorAuthorization ? 'text-amber-700' : 'text-emerald-700'}`}>
                    {evaluationResult.requiresDirectorAuthorization ? 'REQUERIDA' : 'NO REQUERIDA'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {!evaluationResult && (
            <div className="text-center py-6 border border-dashed border-zinc-200 rounded-lg text-zinc-500 text-xs">
              Presiona <strong>"Evaluar Solicitud"</strong> para someter los parámetros al Core de Decisión de Tradytec.
            </div>
          )}
        </div>
      </div>

      {/* Corporate Travel Policies Matrix */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Matriz Rectoral de Políticas Corporativas Tradytec</span>
            </h3>
            <p className="text-xs text-zinc-500">
              Reglas duras inmutables aplicadas por el agente ejecutor en cada emisión
            </p>
          </div>
          <span className="text-xs font-mono text-zinc-400">Versión: POL-TMC-2026.4</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 text-zinc-600 font-semibold border-b border-zinc-200">
              <tr>
                <th className="p-3">Nivel Jerárquico</th>
                <th className="p-3">Anticipación Nac.</th>
                <th className="p-3">Anticipación Int.</th>
                <th className="p-3">Techo Vuelo Nac.</th>
                <th className="p-3">Techo Vuelo Int.</th>
                <th className="p-3">Hotel Máx / Noche</th>
                <th className="p-3">Cabina Autorizada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-800">
              <tr className="hover:bg-zinc-50/50">
                <td className="p-3 font-semibold text-zinc-900">Directivo (C-Level / VP)</td>
                <td className="p-3">7 días</td>
                <td className="p-3">14 días</td>
                <td className="p-3 font-mono">$800 USD</td>
                <td className="p-3 font-mono">$2,200 USD</td>
                <td className="p-3 font-mono">$280 USD</td>
                <td className="p-3 text-sky-700 font-medium">Ejecutiva (Vuelos &gt;6h)</td>
              </tr>
              <tr className="hover:bg-zinc-50/50">
                <td className="p-3 font-semibold text-zinc-900">Gerencial (Gerentes / Heads)</td>
                <td className="p-3">14 días</td>
                <td className="p-3">21 días</td>
                <td className="p-3 font-mono">$450 USD</td>
                <td className="p-3 font-mono">$1,500 USD</td>
                <td className="p-3 font-mono">$160 USD</td>
                <td className="p-3 text-zinc-600">Turista Premium</td>
              </tr>
              <tr className="hover:bg-zinc-50/50">
                <td className="p-3 font-semibold text-zinc-900">Operativo (Especialistas / Campo)</td>
                <td className="p-3">21 días</td>
                <td className="p-3">30 días</td>
                <td className="p-3 font-mono">$280 USD</td>
                <td className="p-3 font-mono">$950 USD</td>
                <td className="p-3 font-mono">$95 USD</td>
                <td className="p-3 text-zinc-600">Turista Básica</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
