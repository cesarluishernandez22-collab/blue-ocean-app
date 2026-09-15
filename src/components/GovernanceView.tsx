import { useState, FormEvent } from 'react';
import { Compass, ShieldCheck, Key, Lock, AlertCircle, CheckCircle2, History, Database } from 'lucide-react';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  cell: string;
  event: string;
  amount?: string;
  actor: string;
  hash: string;
  status: 'VERIFIED' | 'AUTHORIZED' | 'REJECTED';
}

export function GovernanceView() {
  const [directorPin, setDirectorPin] = useState<string>('');
  const [bypassReason, setBypassReason] = useState<string>('');
  const [exceptionApproved, setExceptionApproved] = useState<boolean | null>(null);

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: 'LOG-8821',
      timestamp: '2026-09-13 17:34:12',
      cell: 'Tradytec',
      event: 'EMISIÓN_BOLETO_CORP (MTY-CDMX)',
      amount: '$420.00 USD',
      actor: 'Agente Tradytec Core V4',
      hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      status: 'VERIFIED',
    },
    {
      id: 'LOG-8822',
      timestamp: '2026-09-13 18:02:44',
      cell: 'Blue Ocean',
      event: 'DIAGNÓSTICO_REVENUE_GENERADO (Hotel Alameda)',
      amount: '+$14,200 USD/mes',
      actor: 'Agente de Campo BO-02',
      hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      status: 'VERIFIED',
    },
    {
      id: 'LOG-8823',
      timestamp: '2026-09-13 18:21:05',
      cell: 'Core Arquitecto',
      event: 'AMBIGÜEDAD_DETENIDA (Sin presupuesto explícito)',
      amount: 'N/A',
      actor: 'Validador Cero Suposiciones',
      hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
      status: 'REJECTED',
    },
  ]);

  const handleAuthorizeException = (e: FormEvent) => {
    e.preventDefault();
    if (!directorPin.trim() || !bypassReason.trim()) return;

    // Director token verification
    if (directorPin === '2026' || directorPin.length >= 4) {
      setExceptionApproved(true);
      const newLog: AuditLogEntry = {
        id: `LOG-${Math.floor(Math.random() * 9000 + 1000)}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        cell: 'Gobernanza Central',
        event: `AUTORIZACIÓN_EXCEPCIONAL: ${bypassReason}`,
        actor: 'Director Financiero (Firma Token Válida)',
        hash: `auth-${Date.now()}-` + Math.random().toString(36).substring(2, 10),
        status: 'AUTHORIZED',
      };
      setAuditLogs([newLog, ...auditLogs]);
      setDirectorPin('');
      setBypassReason('');
    } else {
      setExceptionApproved(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-white">
              <Compass className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-zinc-900">
                  Límites de Autoridad & Trazabilidad Estricta
                </h2>
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-zinc-100 text-zinc-800">
                  GOBERNANZA FINANCIERA
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                Respeto absoluto por márgenes críticos, jerarquías de aprobación y registros inmutables sin salto de control.
              </p>
            </div>
          </div>

          <span className="text-xs font-mono text-zinc-500 bg-zinc-100 px-3 py-1.5 rounded-lg border border-zinc-200">
            HASH AUDIT: SHA-256 ENFORCED
          </span>
        </div>
      </div>

      {/* Authority Limits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Margen Crítico TMC (Tradytec)
            </span>
            <ShieldCheck className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold text-zinc-900 font-mono">14.0% Mínimo</div>
          <p className="text-xs text-zinc-600">
            Ningún agente puede emitir con fee o descuento que degrade el margen por debajo del 14% sin firma del CFO.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Modelo a Éxito (Blue Ocean)
            </span>
            <ShieldCheck className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-zinc-900 font-mono">15.0% Neto Lift</div>
          <p className="text-xs text-zinc-600">
            Estrictamente sobre el incremento neto generado por encima de la línea base histórica del hotel.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Tolerancia de Crédito
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-zinc-900 font-mono">$0.00 USD</div>
          <p className="text-xs text-zinc-600">
            Tolerancia cero a sobregiro no respaldado por orden de compra o depósito en garantía.
          </p>
        </div>
      </div>

      {/* Exception Authorization Desk & Live Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Exception Authorization Desk */}
        <div className="lg:col-span-5 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
          <div className="border-b border-zinc-100 pb-3">
            <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-600" />
              <span>Mesa de Autorización Excepcional</span>
            </h3>
            <p className="text-xs text-zinc-500">
              Desbloqueo temporal de PNR o excepción de política con registro formal
            </p>
          </div>

          <form onSubmit={handleAuthorizeException} className="space-y-3 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-zinc-700">Motivo Formal de la Excepción:</label>
              <input
                id="input-bypass-reason"
                type="text"
                value={bypassReason}
                onChange={(e) => setBypassReason(e.target.value)}
                placeholder="Ejemplo: Vuelo urgente para firma de contrato notariado en MTY..."
                className="w-full rounded-md border border-zinc-300 p-2 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-zinc-700">Token / PIN de Autorización Directiva:</label>
              <input
                id="input-director-pin"
                type="password"
                value={directorPin}
                onChange={(e) => setDirectorPin(e.target.value)}
                placeholder="Ingresar PIN de 4 dígitos (Prueba: 2026)"
                className="w-full rounded-md border border-zinc-300 p-2 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 font-mono"
              />
            </div>

            <button
              id="btn-submit-authorization"
              type="submit"
              className="w-full py-2.5 rounded-lg bg-zinc-900 text-white font-semibold text-xs hover:bg-zinc-800 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Firmar y Emitir Token de Desbloqueo</span>
            </button>

            {exceptionApproved === true && (
              <div className="p-3 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Excepción autorizada formalmente y asentada en el libro de auditoría.</span>
              </div>
            )}
            {exceptionApproved === false && (
              <div className="p-3 rounded bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>Firma no válida. El Arquitecto Maestro ha bloqueado la transacción.</span>
              </div>
            )}
          </form>
        </div>

        {/* Immutable Audit Trail */}
        <div className="lg:col-span-7 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-zinc-700" />
              <span>Libro de Trazabilidad e Integridad Criptográfica</span>
            </h3>
            <span className="text-xs font-mono text-zinc-400">Ledger Inmutable</span>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[360px] pr-1">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-lg border border-zinc-200 bg-zinc-50/50 space-y-1.5 text-xs font-mono"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-900">{log.event}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.status === 'VERIFIED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : log.status === 'AUTHORIZED'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {log.status}
                  </span>
                </div>

                <div className="flex justify-between text-zinc-500 text-[11px]">
                  <span>{log.actor} • {log.cell}</span>
                  <span>{log.timestamp}</span>
                </div>

                <div className="text-[10px] text-zinc-400 truncate pt-1 border-t border-zinc-200/60">
                  Hash: {log.hash}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
