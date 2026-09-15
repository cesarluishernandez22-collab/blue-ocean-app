import { useState } from 'react';
import { ShieldAlert, CheckCircle2, XCircle, AlertTriangle, ArrowRight, HelpCircle, FileCheck, Terminal, Play } from 'lucide-react';
import { AmbiguityAuditResult } from '../types';

export function ZeroAssumptionsView() {
  const [requirementText, setRequirementText] = useState<string>(
    'Cotizar viaje urgente para el director general para asistir a una reunión la próxima semana, conseguir el vuelo más económico posible.'
  );
  const [cellType, setCellType] = useState<'Tradytec' | 'Blue Ocean' | 'General'>('Tradytec');
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<AmbiguityAuditResult | null>(null);

  const presets = [
    {
      title: 'Caso Ambigüedad Extrema (Términos Subjetivos)',
      cell: 'Tradytec' as const,
      text: 'Cotizar viaje urgente para el director general para asistir a una reunión la próxima semana, conseguir el vuelo más económico posible.',
    },
    {
      title: 'Caso Hotel Sin Parámetros Financieros',
      cell: 'Blue Ocean' as const,
      text: 'Queremos optimizar las tarifas de nuestro hotel en la playa para la temporada alta y cobrar por horas.',
    },
    {
      title: 'Caso Determinista 100% Válido',
      cell: 'Tradytec' as const,
      text: 'Emitir vuelo MTY-MEX para Lic. Fernando Monroy con CC-OP-MICE-88, salida 2026-10-15 regreso 2026-10-18, tarifa cotizada $420 USD en Aeroméxico, convenio corporativo activo.',
    },
  ];

  const handleAudit = async (customText?: string, customCell?: 'Tradytec' | 'Blue Ocean' | 'General') => {
    const textToAudit = customText || requirementText;
    const cellToAudit = customCell || cellType;

    setIsAuditing(true);
    try {
      const response = await fetch('/api/audit-ambiguity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requirementText: textToAudit,
          cellType: cellToAudit,
        }),
      });
      const data = await response.json();
      setAuditResult(data);
    } catch (e) {
      console.error('Error auditing ambiguity:', e);
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-700">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-zinc-900">
                  Protocolo Cero Suposiciones
                </h2>
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-800">
                  AUDITORÍA INQUEBRANTABLE
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                Prohibido rellenar vacíos o inventar datos. Todo requerimiento con ambigüedades es detenido de inmediato para validación humana.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 text-emerald-400 text-xs font-mono">
            <span>CERO ALUCINACIÓN OPERATIVA</span>
          </div>
        </div>
      </div>

      {/* Preset Scenarios */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
          Probar Escenarios Pre-configurados:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              id={`btn-preset-${idx}`}
              onClick={() => {
                setRequirementText(preset.text);
                setCellType(preset.cell);
                handleAudit(preset.text, preset.cell);
              }}
              className="text-left p-3 rounded-lg border border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 transition-colors space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-900">{preset.title}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600">
                  {preset.cell}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 line-clamp-2">{preset.text}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Audit Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input box */}
        <div className="lg:col-span-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-zinc-700" />
              <span>Consola de Ingreso de Requerimiento</span>
            </h3>
            <select
              id="select-audit-cell"
              value={cellType}
              onChange={(e) => setCellType(e.target.value as any)}
              className="text-xs font-medium rounded border border-zinc-300 px-2 py-1 bg-zinc-50 text-zinc-800"
            >
              <option value="Tradytec">Célula Tradytec</option>
              <option value="Blue Ocean">Célula Blue Ocean</option>
              <option value="General">Reglas Generales</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-700 block">
              Texto o Especificación a Auditar:
            </label>
            <textarea
              id="textarea-audit-requirement"
              rows={6}
              value={requirementText}
              onChange={(e) => setRequirementText(e.target.value)}
              placeholder="Introduce aquí la instrucción, solicitud de viaje o requerimiento de hotelería..."
              className="w-full text-xs font-mono p-3 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-zinc-900 focus:outline-none bg-zinc-50 text-zinc-900"
            />
          </div>

          <button
            id="btn-run-ambiguity-audit"
            onClick={() => handleAudit()}
            disabled={isAuditing || !requirementText.trim()}
            className="w-full py-2.5 rounded-lg bg-zinc-950 text-white font-semibold text-xs hover:bg-zinc-800 transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
            <span>{isAuditing ? 'Analizando Sintáctica y Métricas...' : 'Ejecutar Auditoría Cero Suposiciones'}</span>
          </button>
        </div>

        {/* Audit Verdict Box */}
        <div className="lg:col-span-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-zinc-700" />
                <span>Dictamen del Arquitecto Maestro</span>
              </h3>
              {auditResult && (
                <span className="text-[11px] font-mono text-zinc-500">
                  Confianza: {auditResult.confidenceScore}%
                </span>
              )}
            </div>

            {auditResult ? (
              <div className="space-y-4 mt-3">
                {/* Verdict Badge */}
                <div
                  className={`p-4 rounded-lg border flex items-start gap-3 ${
                    auditResult.verdict === 'APROBADO'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-red-50 border-red-300 text-red-950'
                  }`}
                >
                  {auditResult.verdict === 'APROBADO' ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                  )}
                  <div>
                    <h4 className="font-bold text-sm tracking-wide">
                      ESTADO: {auditResult.verdict}
                    </h4>
                    <p className="text-xs mt-1 text-zinc-700 leading-relaxed">
                      {auditResult.draftResolution}
                    </p>
                  </div>
                </div>

                {/* Technical Reasoning */}
                <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 text-xs space-y-1">
                  <span className="font-semibold text-zinc-700 block">Razonamiento Técnico:</span>
                  <p className="text-zinc-600">{auditResult.technicalReasoning}</p>
                </div>

                {/* Critical Gaps & Required Definitions if Halted */}
                {auditResult.verdict === 'DETENIDO_POR_AMBIGUEDAD' && (
                  <div className="space-y-3">
                    {auditResult.criticalGaps?.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-red-800 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Vacíos Críticos Detectados:</span>
                        </span>
                        <ul className="list-disc list-inside text-xs text-red-700 space-y-0.5 bg-red-50/50 p-2 rounded border border-red-200">
                          {auditResult.criticalGaps.map((gap, i) => (
                            <li key={i}>{gap}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {auditResult.requiredDefinitions?.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-zinc-700" />
                          <span>Definiciones Requeridas para Validación Humana:</span>
                        </span>
                        <ul className="list-decimal list-inside text-xs text-zinc-700 space-y-1 bg-zinc-50 p-2.5 rounded border border-zinc-200">
                          {auditResult.requiredDefinitions.map((def, i) => (
                            <li key={i} className="font-medium">{def}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-zinc-400 text-xs border border-dashed border-zinc-200 rounded-lg">
                Introduce un texto y haz clic en <strong>"Ejecutar Auditoría Cero Suposiciones"</strong> para ver el veredicto formal.
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
            <span>NORMA: ISO-AGNT-2026-ZERO-ASSUME</span>
            <span>AUTORIDAD: ARQUITECTO MAESTRO</span>
          </div>
        </div>
      </div>

      {/* State Traceability Diagram (Graph) */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-zinc-900">
          Grafo de Estados Explícitos (Trazabilidad Estricta sin Bucles)
        </h3>
        <p className="text-xs text-zinc-500">
          Cada agente se mueve exclusivamente a lo largo de este árbol de estados auditables:
        </p>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs pt-2">
          <div className="w-full p-3 rounded-lg border border-zinc-300 bg-zinc-50 text-center font-mono font-medium text-zinc-800">
            [1. ENTRADA_BRUTA]
          </div>
          <ArrowRight className="w-4 h-4 text-zinc-400 transform md:rotate-0 rotate-90 flex-shrink-0" />
          <div className="w-full p-3 rounded-lg border border-red-200 bg-red-50 text-center font-mono font-bold text-red-800">
            [2. AUDITORÍA_CERO_SUP]
          </div>
          <ArrowRight className="w-4 h-4 text-zinc-400 transform md:rotate-0 rotate-90 flex-shrink-0" />
          <div className="w-full p-3 rounded-lg border border-sky-200 bg-sky-50 text-center font-mono font-bold text-sky-800">
            [3. EVALUACIÓN_POLÍTICA]
          </div>
          <ArrowRight className="w-4 h-4 text-zinc-400 transform md:rotate-0 rotate-90 flex-shrink-0" />
          <div className="w-full p-3 rounded-lg border border-emerald-200 bg-emerald-50 text-center font-mono font-bold text-emerald-800">
            [4. EMISIÓN_AUDITADA]
          </div>
        </div>
      </div>
    </div>
  );
}
