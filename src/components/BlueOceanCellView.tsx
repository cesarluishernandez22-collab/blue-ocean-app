import { useState } from 'react';
import { Building2, TrendingUp, DollarSign, Percent, Sparkles, Copy, Check, Calculator, ChevronRight, UserCheck } from 'lucide-react';
import { BlueOceanDiagnosticResult } from '../types';

export function BlueOceanCellView() {
  const [propertyName, setPropertyName] = useState<string>('Hotel Boutique & Suites Alameda');
  const [totalUnits, setTotalUnits] = useState<number>(26);
  const [currentOccupancy, setCurrentOccupancy] = useState<number>(45);
  const [currentADR, setCurrentADR] = useState<number>(85);
  const [otaCommissionRate, setOtaCommissionRate] = useState<number>(20);
  const [hourlyRentalPotential, setHourlyRentalPotential] = useState<boolean>(true);

  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [diagnostic, setDiagnostic] = useState<BlueOceanDiagnosticResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleRunDiagnosis = async () => {
    setIsCalculating(true);
    try {
      const response = await fetch('/api/blueocean/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyName,
          totalUnits,
          currentOccupancy,
          currentADR,
          otaCommissionRate,
          hourlyRentalPotential,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setDiagnostic(data.propertyMetrics);
      }
    } catch (e) {
      console.error('Error running Blue Ocean diagnosis:', e);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleCopyProposal = () => {
    if (!diagnostic) return;
    const proposalText = `PROPUESTA COMERCIAL BLUE OCEAN: REVENUE MANAGEMENT A RESULTADOS
Propiedad: ${diagnostic.propertyName}
Unidades en Operación: ${diagnostic.totalUnits}
-----------------------------------------------------------
DIAGNÓSTICO ACTUAL:
• Ocupación Promedio: ${diagnostic.current.occupancy}%
• ADR (Tarifa Promedio Diaria): $${diagnostic.current.adr} USD
• RevPAR Actual: $${diagnostic.current.revPar} USD
• Ingreso Neto Mensual Actual: $${diagnostic.current.netRevenue.toLocaleString()} USD
• Fuga Estimada en Comisiones OTAs: $${diagnostic.current.otaCommissions.toLocaleString()} USD / mes

PROYECCIÓN OPTIMIZADA CON BLUE OCEAN:
• Ocupación Proyectada: ${diagnostic.blueOceanOptimized.occupancy}%
• RevPAR Proyectado: $${diagnostic.blueOceanOptimized.revPar} USD
• Nuevo Ingreso Neto Mensual: $${diagnostic.blueOceanOptimized.netRevenue.toLocaleString()} USD
• Incremento Neto Adicional: +$${diagnostic.commercialProposal.netIncrementalLift.toLocaleString()} USD (+${diagnostic.commercialProposal.percentageLift}%)

PROMESA COMERCIAL A RESULTADOS:
• Costo Fijo Inicial: $0 USD
• Costo Mensual Recurrente de Software: $0 USD
• Retribución Blue Ocean: 15% sobre el incremento neto generado ($${diagnostic.commercialProposal.blueOceanSuccessFee.toLocaleString()} USD)
• Ganancia Neta Líquida para el Propietario: +$${diagnostic.commercialProposal.ownerRetainedGain.toLocaleString()} USD / mes`;

    navigator.clipboard.writeText(proposalText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-zinc-900">
                  Célula Operativa Blue Ocean
                </h2>
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800">
                  ESTANCIA CORTA & RENTA POR TIEMPO
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                Diagnóstico automatizado de hoteles, Revenue Management y modelo de resultados sin costo fijo inicial.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
              0 Costo Fijo Inicial
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Parameters & Interactive Diagnostic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Diagnostic Input parameters */}
        <div className="lg:col-span-5 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm space-y-5">
          <div className="border-b border-zinc-100 pb-3">
            <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-700" />
              <span>Parámetros del Hotel / Propiedad</span>
            </h3>
            <p className="text-xs text-zinc-500">
              Datos recolectados por el agente de prospección en campo
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-zinc-700">Nombre del Hotel o Complejo:</label>
              <input
                id="input-bo-prop-name"
                type="text"
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                className="w-full rounded-md border border-zinc-300 p-2 text-zinc-900 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-semibold text-zinc-700">Habitaciones / Unidades:</label>
                <input
                  id="input-bo-units"
                  type="number"
                  value={totalUnits}
                  onChange={(e) => setTotalUnits(Number(e.target.value))}
                  className="w-full rounded-md border border-zinc-300 p-2 text-zinc-900 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-zinc-700">Ocupación Actual (%):</label>
                <input
                  id="input-bo-occupancy"
                  type="number"
                  value={currentOccupancy}
                  onChange={(e) => setCurrentOccupancy(Number(e.target.value))}
                  className="w-full rounded-md border border-zinc-300 p-2 text-zinc-900 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-semibold text-zinc-700">ADR Actual (USD):</label>
                <input
                  id="input-bo-adr"
                  type="number"
                  value={currentADR}
                  onChange={(e) => setCurrentADR(Number(e.target.value))}
                  className="w-full rounded-md border border-zinc-300 p-2 text-zinc-900 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-zinc-700">Comisión OTAs (%):</label>
                <input
                  id="input-bo-commission"
                  type="number"
                  value={otaCommissionRate}
                  onChange={(e) => setOtaCommissionRate(Number(e.target.value))}
                  className="w-full rounded-md border border-zinc-300 p-2 text-zinc-900 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-lg border border-amber-200 bg-amber-50/50 hover:bg-amber-50">
                <input
                  id="checkbox-bo-hourly"
                  type="checkbox"
                  checked={hourlyRentalPotential}
                  onChange={(e) => setHourlyRentalPotential(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <div>
                  <span className="text-zinc-900 font-semibold block">Habilitar Renta por Franjas Horarias (Day-Use)</span>
                  <span className="text-[11px] text-zinc-600">Monetiza habitaciones entre 10:00 y 17:00 para estancias cortas.</span>
                </div>
              </label>
            </div>

            <button
              id="btn-run-blueocean-diagnosis"
              onClick={handleRunDiagnosis}
              disabled={isCalculating}
              className="w-full py-2.5 rounded-lg bg-zinc-900 text-white font-semibold text-xs hover:bg-zinc-800 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isCalculating ? 'Calculando Optimización...' : 'Generar Diagnóstico de Revenue'}</span>
            </button>
          </div>
        </div>

        {/* Diagnostic Output & Commercial Proposal */}
        <div className="lg:col-span-7 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-700" />
                  <span>Diagnóstico Financiero & Comparativa de Yield</span>
                </h3>
                <p className="text-xs text-zinc-500">
                  Modelo predictivo de recaptura de margen y tarifación dinámica
                </p>
              </div>

              {diagnostic && (
                <button
                  id="btn-copy-bo-proposal"
                  onClick={handleCopyProposal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-zinc-100 text-zinc-800 hover:bg-zinc-200 transition-colors border border-zinc-200"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copiada!' : 'Copiar Propuesta'}</span>
                </button>
              )}
            </div>

            {diagnostic ? (
              <div className="space-y-6 mt-4">
                {/* Metric comparisons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Current baseline */}
                  <div className="rounded-lg border border-zinc-200 bg-zinc-50/70 p-4 space-y-2 text-xs">
                    <span className="font-bold text-zinc-700 block uppercase tracking-wider text-[10px]">
                      Estado Actual (Sin Optimizar)
                    </span>
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Ocupación / ADR:</span>
                        <span className="font-mono font-medium text-zinc-800">
                          {diagnostic.current.occupancy}% / ${diagnostic.current.adr} USD
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">RevPAR Actual:</span>
                        <span className="font-mono font-bold text-zinc-900">
                          ${diagnostic.current.revPar} USD
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Fuga Comisiones OTAs:</span>
                        <span className="font-mono text-red-600 font-semibold">
                          -${diagnostic.current.otaCommissions.toLocaleString()} USD
                        </span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-zinc-200">
                        <span className="font-semibold text-zinc-800">Ingreso Neto Actual:</span>
                        <span className="font-mono font-bold text-zinc-950">
                          ${diagnostic.current.netRevenue.toLocaleString()} USD / mes
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Blue ocean optimized */}
                  <div className="rounded-lg border border-amber-300 bg-amber-50/40 p-4 space-y-2 text-xs">
                    <span className="font-bold text-amber-900 block uppercase tracking-wider text-[10px]">
                      Optimizado con Blue Ocean
                    </span>
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between">
                        <span className="text-amber-800">Ocupación / ADR:</span>
                        <span className="font-mono font-semibold text-amber-950">
                          {diagnostic.blueOceanOptimized.occupancy}% / ${diagnostic.blueOceanOptimized.adr} USD
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-amber-800">RevPAR Optimizado:</span>
                        <span className="font-mono font-bold text-emerald-700">
                          ${diagnostic.blueOceanOptimized.revPar} USD
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-amber-800">Plus Franja Diurna:</span>
                        <span className="font-mono text-emerald-700 font-semibold">
                          +${diagnostic.blueOceanOptimized.ancillaryHourlyRevenue.toLocaleString()} USD
                        </span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-amber-200">
                        <span className="font-semibold text-amber-950">Nuevo Ingreso Neto:</span>
                        <span className="font-mono font-bold text-emerald-800 text-sm">
                          ${diagnostic.blueOceanOptimized.netRevenue.toLocaleString()} USD / mes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* The Commercial Promise Banner */}
                <div className="rounded-xl border border-zinc-950 bg-zinc-950 text-white p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
                      La Promesa Comercial a Resultados
                    </span>
                    <span className="text-xs font-mono bg-zinc-800 px-2 py-0.5 rounded text-zinc-300">
                      Costo Fijo: $0 USD
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                    <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
                      <span className="text-zinc-400 block text-[11px]">Incremento Neto Total</span>
                      <span className="text-lg font-bold text-emerald-400 font-mono">
                        +${diagnostic.commercialProposal.netIncrementalLift.toLocaleString()} USD
                      </span>
                      <span className="text-[10px] text-zinc-500 block">
                        (+{diagnostic.commercialProposal.percentageLift}% sobre base)
                      </span>
                    </div>

                    <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
                      <span className="text-zinc-400 block text-[11px]">Fee Blue Ocean (15% éxito)</span>
                      <span className="text-lg font-bold text-amber-400 font-mono">
                        ${diagnostic.commercialProposal.blueOceanSuccessFee.toLocaleString()} USD
                      </span>
                      <span className="text-[10px] text-zinc-500 block">Solo si se genera el incremento</span>
                    </div>

                    <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
                      <span className="text-zinc-400 block text-[11px]">Ganancia Propietario</span>
                      <span className="text-lg font-bold text-white font-mono">
                        +${diagnostic.commercialProposal.ownerRetainedGain.toLocaleString()} USD
                      </span>
                      <span className="text-[10px] text-emerald-400 font-medium block">
                        Flujo de caja libre 100% puro
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed border-zinc-200 rounded-lg text-zinc-500 text-xs">
                Ajusta los parámetros a la izquierda y presiona <strong>"Generar Diagnóstico de Revenue"</strong> para proyectar la optimización.
              </div>
            )}
          </div>

          {/* Prospección funnel stages */}
          <div className="border-t border-zinc-100 pt-4">
            <h4 className="text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
              Embudo de Prospección Inbound / Outbound
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="p-2 rounded bg-zinc-50 border border-zinc-200">
                <span className="text-zinc-400 block">Fase 1</span>
                <span className="font-semibold text-zinc-900">1. Diagnóstico OTA</span>
              </div>
              <div className="p-2 rounded bg-zinc-50 border border-zinc-200">
                <span className="text-zinc-400 block">Fase 2</span>
                <span className="font-semibold text-zinc-900">2. Pitch $0 Riesgo</span>
              </div>
              <div className="p-2 rounded bg-zinc-50 border border-zinc-200">
                <span className="text-zinc-400 block">Fase 3</span>
                <span className="font-semibold text-zinc-900">3. Tarifa Dinámica</span>
              </div>
              <div className="p-2 rounded bg-zinc-50 border border-zinc-200">
                <span className="text-zinc-400 block">Fase 4</span>
                <span className="font-semibold text-zinc-900">4. Recaptura Margen</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
