import { useState, FormEvent } from 'react';
import { BrainCircuit, ShieldAlert, Plus, CheckCircle2, Lock, History, AlertCircle, ArrowRight } from 'lucide-react';
import { AdaptiveMemoryRecord } from '../types';
import { INITIAL_ADAPTIVE_MEMORY } from '../data/initialData';

export function AdaptiveMemoryView() {
  const [memoryRecords, setMemoryRecords] = useState<AdaptiveMemoryRecord[]>(INITIAL_ADAPTIVE_MEMORY);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // New incident fields
  const [sourceCell, setSourceCell] = useState<'Tradytec' | 'Blue Ocean' | 'Core Arquitecto'>('Tradytec');
  const [failureDescription, setFailureDescription] = useState<string>('');
  const [rootCause, setRootCause] = useState<string>('');
  const [newRule, setNewRule] = useState<string>('');
  const [enforcement, setEnforcement] = useState<'CRITICAL_HALT' | 'STRICT_AUDIT' | 'CODE_MUTATION'>('CRITICAL_HALT');

  const handleRegisterCorrection = (e: FormEvent) => {
    e.preventDefault();
    if (!failureDescription.trim() || !newRule.trim()) return;

    const newRecord: AdaptiveMemoryRecord = {
      id: `MEM-${String(memoryRecords.length + 1).padStart(3, '0')}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      incidentCode: `FAIL-${sourceCell.substring(0, 4).toUpperCase()}-${Math.floor(Math.random() * 800 + 100)}`,
      sourceCell,
      originalFailure: failureDescription,
      structuralRootCause: rootCause || 'Ausencia de validación preventiva en la interfaz de entrada.',
      immutableRuleCreated: newRule,
      enforcementLevel: enforcement,
      status: 'CLOSED_AND_ENFORCED',
    };

    setMemoryRecords([newRecord, ...memoryRecords]);
    setFailureDescription('');
    setRootCause('');
    setNewRule('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-zinc-900">
                  Memoria Adaptativa Implacable
                </h2>
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-purple-100 text-purple-800">
                  LEY DE NO REPETICIÓN
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                Lo que se equivoca una vez se analiza a nivel estructural y se convierte en directriz cerrada inmutable.
              </p>
            </div>
          </div>

          <button
            id="btn-toggle-add-memory"
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 text-white font-medium text-xs hover:bg-zinc-800 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>{showAddForm ? 'Cerrar Formulario' : 'Registrar Corrección Estructural'}</span>
          </button>
        </div>
      </div>

      {/* New Correction Form (Accordion) */}
      {showAddForm && (
        <form
          onSubmit={handleRegisterCorrection}
          className="rounded-xl border border-purple-200 bg-purple-50/40 p-6 shadow-sm space-y-4"
        >
          <div className="border-b border-purple-200 pb-3">
            <h3 className="text-sm font-bold text-purple-950 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-purple-700" />
              <span>Deconstrucción Mecánica de Fallo y Creación de Regla Inmutable</span>
            </h3>
            <p className="text-xs text-purple-800">
              Convierte un desvío o error en una regla booleana cerrada para el código agéntico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-zinc-700">Célula de Origen:</label>
              <select
                id="select-mem-cell"
                value={sourceCell}
                onChange={(e) => setSourceCell(e.target.value as any)}
                className="w-full rounded-md border border-zinc-300 p-2 text-zinc-900 bg-white focus:ring-1 focus:ring-purple-500"
              >
                <option value="Tradytec">Célula Tradytec (Corporativo / TMC)</option>
                <option value="Blue Ocean">Célula Blue Ocean (Hoteles / Renta Corta)</option>
                <option value="Core Arquitecto">Core del Arquitecto Maestro</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-zinc-700">Nivel de Forzamiento:</label>
              <select
                id="select-mem-enforce"
                value={enforcement}
                onChange={(e) => setEnforcement(e.target.value as any)}
                className="w-full rounded-md border border-zinc-300 p-2 text-zinc-900 bg-white focus:ring-1 focus:ring-purple-500"
              >
                <option value="CRITICAL_HALT">CRITICAL_HALT (Detención Absoluta en tiempo de ejecución)</option>
                <option value="CODE_MUTATION">CODE_MUTATION (Regla codificada inmutable en backend)</option>
                <option value="STRICT_AUDIT">STRICT_AUDIT (Validación criptográfica previa a emisión)</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="font-semibold text-zinc-700">Descripción del Fallo Observado:</label>
              <input
                id="input-mem-failure"
                type="text"
                value={failureDescription}
                onChange={(e) => setFailureDescription(e.target.value)}
                placeholder="Ejemplo: Se permitió una cotización sin validar el saldo de crédito del centro de costo..."
                className="w-full rounded-md border border-zinc-300 p-2 text-zinc-900 bg-white focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="font-semibold text-zinc-700">Causa Raíz Estructural:</label>
              <input
                id="input-mem-root-cause"
                type="text"
                value={rootCause}
                onChange={(e) => setRootCause(e.target.value)}
                placeholder="Ejemplo: El endpoint permitía parámetro nulo en creditLineAvailable..."
                className="w-full rounded-md border border-zinc-300 p-2 text-zinc-900 bg-white focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="font-semibold text-zinc-700">Directriz Cerrada / Regla Creada para No Repetición:</label>
              <textarea
                id="input-mem-rule"
                rows={2}
                value={newRule}
                onChange={(e) => setNewRule(e.target.value)}
                placeholder="Ejemplo: Regla 29-X: Todo payload sin hash de firma financiera es rechazado con código ERR_CREDIT_UNVERIFIED."
                className="w-full rounded-md border border-zinc-300 p-2 text-zinc-900 bg-white focus:ring-1 focus:ring-purple-500 font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-md text-xs font-semibold text-zinc-600 hover:bg-zinc-100"
            >
              Cancelar
            </button>
            <button
              id="btn-submit-memory-record"
              type="submit"
              className="px-4 py-2 rounded-md text-xs font-semibold bg-purple-700 text-white hover:bg-purple-800 shadow-sm"
            >
              Sellar Directriz Inmutable
            </button>
          </div>
        </form>
      )}

      {/* Memory Ledger Table */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-zinc-900">
              Libro Mayor de Reglas Inmutables y Post-Mortems Estructurales
            </h3>
          </div>
          <span className="text-xs font-mono text-zinc-500">Total selladas: {memoryRecords.length}</span>
        </div>

        <div className="space-y-4">
          {memoryRecords.map((record) => (
            <div
              key={record.id}
              className="rounded-lg border border-zinc-200 bg-zinc-50/60 p-4 space-y-3 hover:border-zinc-300 transition-colors text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200/60 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-zinc-900 bg-white px-2 py-0.5 rounded border border-zinc-200">
                    {record.incidentCode}
                  </span>
                  <span className="text-zinc-500">Origen: <strong className="text-zinc-800">{record.sourceCell}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-zinc-400">{record.timestamp}</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>ENFORCED</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase font-semibold">Fallo Analizado:</span>
                  <p className="text-zinc-700 mt-0.5">{record.originalFailure}</p>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase font-semibold">Causa Raíz Estructural:</span>
                  <p className="text-zinc-700 mt-0.5">{record.structuralRootCause}</p>
                </div>
              </div>

              <div className="bg-white p-3 rounded border border-purple-200/80 text-purple-950 font-mono text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-purple-700">
                    Directriz Cerrada e Inmutable (Código Resultante):
                  </span>
                  <span className="text-[10px] font-semibold bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded">
                    {record.enforcementLevel}
                  </span>
                </div>
                <p className="text-zinc-900 font-medium">{record.immutableRuleCreated}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
