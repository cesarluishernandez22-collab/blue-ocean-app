import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  QrCode, 
  Building2, 
  Clock, 
  ArrowRight,
  FileText,
  Smartphone,
  Check,
  Download,
  AlertCircle
} from 'lucide-react';

interface OnlinePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotelData?: {
    nombre: string;
    zona: string;
    tarifa4h: number;
    tarifa6h: number;
    tarifaNoche: number;
    codigo: string;
    imgFachada?: string;
  };
}

export function OnlinePaymentModal({ isOpen, onClose, hotelData }: OnlinePaymentModalProps) {
  const [selectedDuration, setSelectedDuration] = useState<'4h' | '6h' | 'noche'>('4h');
  const [paymentMethod, setPaymentMethod] = useState<'tarjeta' | 'spei' | 'oxxo' | 'wallet'>('tarjeta');
  
  // Card Form
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  
  // CFDI Invoice
  const [requiresInvoice, setRequiresInvoice] = useState(false);
  const [rfc, setRfc] = useState('');
  const [razonSocial, setRazonSocial] = useState('');

  // Processing & Success State
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [folioReserva, setFolioReserva] = useState('');

  if (!isOpen) return null;

  const currentHotel = hotelData || {
    nombre: 'HOTEL EXCALIBUR',
    zona: 'Londres 117 Col. Juárez (Zona Rosa / Reforma)',
    tarifa4h: 480,
    tarifa6h: 620,
    tarifaNoche: 850,
    codigo: 'HOTEL EXCALIBUR',
    imgFachada: '/renders/hotel-01-insurgentes/fachada/Polish_20260822_225309771.jpg'
  };

  const getAmount = () => {
    if (selectedDuration === '4h') return currentHotel.tarifa4h;
    if (selectedDuration === '6h') return currentHotel.tarifa6h;
    return currentHotel.tarifaNoche;
  };

  const amount = getAmount();
  const iva = Math.round(amount * 0.16);
  const total = amount;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setFolioReserva(`BO-${currentHotel.codigo.slice(0, 3)}-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1800);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#00172e] border-2 border-[#d4af37]/60 text-white rounded-3xl max-w-xl w-full shadow-2xl relative overflow-hidden text-left my-8">
        
        {/* Encabezado */}
        <div className="bg-[#002244] border-b border-blue-900/80 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#d4af37] text-black flex items-center justify-center font-bold">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white font-serif tracking-wide">
                Pasarela de Pago en Línea Segura
              </h3>
              <p className="text-[11px] text-blue-200">
                Blue Ocean Express Checkout • Cifrado SSL 256 bits
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="text-zinc-400 hover:text-white p-1 rounded-full bg-black/40 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          /* PANTALLA DE CONFIRMACIÓN EXITOSA */
          <div className="p-6 space-y-5 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-lg animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-sans uppercase text-[#f5d77f] font-bold tracking-widest">
                ¡Pago Procesado Exitosamente!
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-white font-serif">
                Reservación Confirmada
              </h4>
              <p className="text-xs text-blue-200 max-w-sm mx-auto">
                Tu acceso vehicular y suite están garantizados. Solo presenta este código al llegar a recepción o caseta vehicular.
              </p>
            </div>

            {/* Recibo Digital con QR */}
            <div className="p-4 rounded-2xl bg-black/50 border border-blue-700/60 max-w-sm mx-auto text-left space-y-3">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-xs text-zinc-400">Folio de Acceso:</span>
                <span className="text-sm font-sans font-black text-[#f5d77f]">{folioReserva}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Propiedad:</span>
                <span className="font-bold text-white truncate max-w-[200px]">{currentHotel.nombre}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Modalidad:</span>
                <span className="font-bold text-cyan-300">
                  {selectedDuration === '4h' ? 'Estancia 4 Horas' : selectedDuration === '6h' ? 'Estancia 6 Horas' : 'Noche Completa'}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Monto Total Pagado:</span>
                <span className="font-sans font-black text-emerald-400 text-sm">${total} MXN</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Método:</span>
                <span className="font-bold text-zinc-200 uppercase">{paymentMethod}</span>
              </div>

              {/* QR Mockup */}
              <div className="pt-2 flex flex-col items-center justify-center gap-1 border-t border-white/10">
                <div className="p-2 bg-white rounded-lg">
                  <QrCode className="w-20 h-20 text-black" />
                </div>
                <span className="text-[10px] font-sans text-zinc-400">Escanea en caseta o recepción</span>
              </div>
            </div>

            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#c49f27] text-black font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-lg"
              >
                Aceptar y Finalizar
              </button>
            </div>
          </div>
        ) : (
          /* FORMULARIO DE PAGO EN LÍNEA */
          <form onSubmit={handlePay} className="p-5 sm:p-6 space-y-4">
            
            {/* Detalle del Hotel y Duración */}
            <div className="p-3.5 rounded-2xl bg-black/40 border border-blue-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-sans uppercase text-[#d4af37] font-bold">
                  {currentHotel.codigo}
                </span>
                <h4 className="text-sm font-bold text-white font-serif leading-tight">
                  {currentHotel.nombre}
                </h4>
                <p className="text-[11px] text-zinc-400">{currentHotel.zona}</p>
              </div>

              {/* Selector de Tarifa */}
              <div className="flex gap-1.5 shrink-0 bg-blue-950 p-1 rounded-xl border border-blue-700/60">
                <button
                  type="button"
                  onClick={() => setSelectedDuration('4h')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    selectedDuration === '4h' ? 'bg-[#d4af37] text-black font-black' : 'text-blue-200 hover:text-white'
                  }`}
                >
                  4h (${currentHotel.tarifa4h})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDuration('6h')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    selectedDuration === '6h' ? 'bg-[#d4af37] text-black font-black' : 'text-blue-200 hover:text-white'
                  }`}
                >
                  6h (${currentHotel.tarifa6h})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDuration('noche')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    selectedDuration === 'noche' ? 'bg-[#d4af37] text-black font-black' : 'text-blue-200 hover:text-white'
                  }`}
                >
                  Noche (${currentHotel.tarifaNoche})
                </button>
              </div>
            </div>

            {/* Selector de Métodos de Pago */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wide block">
                Selecciona Método de Pago en Línea:
              </label>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'tarjeta', label: 'Tarjeta Bancaria', icon: CreditCard, badge: 'Crédito / Débito' },
                  { id: 'spei', label: 'SPEI Inmediato', icon: Smartphone, badge: 'Sin Comisión' },
                  { id: 'oxxo', label: 'OXXO Pay', icon: FileText, badge: 'Efectivo 24h' },
                  { id: 'wallet', label: 'Apple / Google', icon: ShieldCheck, badge: '1-Click' }
                ].map((m) => {
                  const Icon = m.icon;
                  const active = paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition cursor-pointer ${
                        active 
                          ? 'bg-[#d4af37]/20 border-[#d4af37] text-white ring-1 ring-[#d4af37]' 
                          : 'bg-black/30 border-blue-900/60 text-zinc-400 hover:bg-black/50 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Icon className={`w-4 h-4 ${active ? 'text-[#f5d77f]' : 'text-zinc-400'}`} />
                        {active && <span className="w-2 h-2 rounded-full bg-[#d4af37]" />}
                      </div>
                      <span className="text-xs font-bold text-white block">{m.label}</span>
                      <span className="text-[9px] text-zinc-400">{m.badge}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Formulario según Método */}
            {paymentMethod === 'tarjeta' && (
              <div className="space-y-2.5 bg-black/30 p-3.5 rounded-xl border border-blue-800/40">
                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Número de Tarjeta (16 dígitos):</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="4532 •••• •••• 8921"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg bg-black/60 border border-blue-500/40 text-white font-sans focus:outline-none focus:border-[#d4af37]"
                    />
                    <CreditCard className="w-4 h-4 text-zinc-400 absolute right-3 top-2.5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-[11px] text-zinc-400 block mb-1">Titular:</label>
                    <input
                      type="text"
                      required
                      placeholder="Nombre como en tarjeta"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg bg-black/60 border border-blue-500/40 text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">Expira (MM/AA):</label>
                    <input
                      type="text"
                      required
                      placeholder="12/28"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg bg-black/60 border border-blue-500/40 text-white font-sans focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">CVV:</label>
                    <input
                      type="password"
                      required
                      placeholder="•••"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg bg-black/60 border border-blue-500/40 text-white font-sans focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'spei' && (
              <div className="p-3.5 rounded-xl bg-black/40 border border-cyan-500/40 text-xs space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 font-bold">
                  <Smartphone className="w-4 h-4" />
                  <span>Transferencia SPEI Automatizada 24/7</span>
                </div>
                <p className="text-zinc-300 text-[11px] leading-relaxed">
                  Al confirmar, se genera tu CLABE STP única. Tu pago se valida en menos de 10 segundos y te arroja tu código de acceso.
                </p>
                <div className="p-2 rounded bg-black/60 font-sans text-[11px] text-[#f5d77f]">
                  Banco: STP • Beneficiario: Blue Ocean Hoteles • Referencia automática
                </div>
              </div>
            )}

            {paymentMethod === 'oxxo' && (
              <div className="p-3.5 rounded-xl bg-black/40 border border-amber-500/40 text-xs space-y-2">
                <div className="flex items-center gap-2 text-[#f5d77f] font-bold">
                  <FileText className="w-4 h-4" />
                  <span>Código OXXO Pay con Liquidación en Tienda</span>
                </div>
                <p className="text-zinc-300 text-[11px] leading-relaxed">
                  Genera una referencia de 14 dígitos para pagar en efectivo en cualquier tienda OXXO del país con confirmación inmediata.
                </p>
              </div>
            )}

            {paymentMethod === 'wallet' && (
              <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/40 text-xs space-y-2 text-center">
                <span className="font-bold text-white block">Pago Rápido Biométrico (Touch ID / Face ID)</span>
                <p className="text-zinc-400 text-[11px]">
                  Paga seguro desde tu dispositivo móvil con tu tarjeta guardada en Apple Pay o Google Wallet.
                </p>
              </div>
            )}

            {/* Datos de Contacto para Confirmación */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Correo para comprobante:</label>
                <input
                  type="email"
                  required
                  placeholder="ejemplo@correo.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg bg-black/50 border border-blue-500/40 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">WhatsApp / Teléfono móvil:</label>
                <input
                  type="tel"
                  required
                  placeholder="+52 55 •••• ••••"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg bg-black/50 border border-blue-500/40 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            {/* Facturación CFDI */}
            <div className="pt-1">
              <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={requiresInvoice}
                  onChange={(e) => setRequiresInvoice(e.target.checked)}
                  className="rounded text-[#d4af37] focus:ring-0"
                />
                <span>Requiere Factura Fiscal (CFDI 4.0 con IVA Desglosado)</span>
              </label>

              {requiresInvoice && (
                <div className="grid grid-cols-2 gap-2 mt-2 p-2.5 rounded-lg bg-black/40 border border-blue-800/40">
                  <input
                    type="text"
                    placeholder="RFC (ej: MOT220815XXX)"
                    value={rfc}
                    onChange={(e) => setRfc(e.target.value)}
                    className="text-xs p-2 rounded bg-black border border-zinc-700 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Razón Social Completa"
                    value={razonSocial}
                    onChange={(e) => setRazonSocial(e.target.value)}
                    className="text-xs p-2 rounded bg-black border border-zinc-700 text-white"
                  />
                </div>
              )}
            </div>

            {/* Resumen Total y Botón de Pago */}
            <div className="pt-2 border-t border-blue-900/60 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-zinc-400 block">Total a Pagar en Línea:</span>
                <span className="text-lg font-black text-[#f5d77f] font-sans">${total} MXN</span>
                <span className="text-[9px] text-emerald-400 block">✓ Cero comisiones añadidas</span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-[#d4af37] hover:from-amber-400 hover:to-amber-300 text-black font-black text-xs uppercase tracking-wider shadow-lg transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Procesando Pago Seguro...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Pagar en Línea (${total} MXN)</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
