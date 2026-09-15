import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Phone, 
  Mail, 
  X,
  TrendingUp,
  Award,
  DollarSign,
  Clock
} from 'lucide-react';
import { LCMLogo } from './LCMLogo';
import { airtableClient } from '../services/airtableClient';

interface HotelerosAffiliationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmittedSuccess?: () => void;
}

export function HotelerosAffiliationModal({
  isOpen,
  onClose,
  onSubmittedSuccess
}: HotelerosAffiliationModalProps) {
  const [nombreHotel, setNombreHotel] = useState('');
  const [contacto, setContacto] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [web, setWeb] = useState('');
  const [redesSociales, setRedesSociales] = useState('');
  const [habitacionesDisponibles, setHabitacionesDisponibles] = useState('10');
  const [modalidadInteres, setModalidadInteres] = useState('Ambas (Renta por tiempo + Pernocta)');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreHotel.trim() || !correo.trim() || !contacto.trim()) {
      setFeedbackMsg('Por favor completa el nombre del hotel, tu nombre y correo.');
      return;
    }

    setIsSubmitting(true);
    setFeedbackMsg('');

    try {
      // Direct insertion to Airtable Table "Contacto" (all 9 fields compliant)
      const res = await airtableClient.createContactoRecord({
        'Nombre del Hotel': nombreHotel,
        'Correo': correo,
        'Teléfono': telefono,
        'Dirección': direccion,
        'Contacto': `${contacto} (${modalidadInteres} - ${habitacionesDisponibles} habs)`,
        'Web': web || 'https://oceanrevenue-management.com',
        'Redes Sociales': redesSociales || 'Pendiente',
        'Fecha': new Date().toISOString().split('T')[0],
        'Próximo seguimiento': new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0] // 48 hrs SLA
      });

      if (res.success) {
        setIsSuccess(true);
        onSubmittedSuccess?.();
      } else {
        setFeedbackMsg(res.error || 'Error al enviar la solicitud. Intenta nuevamente.');
      }
    } catch (err: any) {
      setFeedbackMsg(err.message || 'Error de comunicación con el servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setFeedbackMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#18181b] border border-zinc-700/80 rounded-2xl max-w-2xl w-full flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-4 border-b border-zinc-800 bg-[#121214] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LCMLogo size="sm" />
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Afiliación de Propiedad Hotelera</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40">
                  Modelo 15% Comisión
                </span>
              </h3>
              <p className="text-[11px] text-zinc-400">
                Ocean Revenue Management • Metodología LCM de Luis César Monroy
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[80vh] space-y-6 text-zinc-300 text-xs">
          {/* Commercial Promise Card */}
          <div className="bg-[#121214] p-4 rounded-xl border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-[#e07a9e] font-bold text-xs uppercase font-mono">
              <DollarSign className="w-4 h-4 text-[#e07a9e]" />
              <span>Condiciones del Modelo de Afiliación Fase 1</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-zinc-300">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong>$0 Inversión inicial</strong> por afiliarse</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#38a3a5] shrink-0" />
                <span>Comisión fija del <strong>15% a resultados</strong></span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>Monetización de <strong>habitaciones vacías de día</strong></span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Registro directo en base de datos <strong>Airtable</strong></span>
              </li>
            </ul>
          </div>

          {isSuccess ? (
            <div className="bg-emerald-950/30 border border-emerald-800/60 rounded-xl p-6 text-center space-y-3 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">¡Solicitud de Afiliación Registrada!</h4>
              <p className="text-xs text-zinc-300 max-w-md mx-auto">
                Los datos de <strong className="text-white">{nombreHotel}</strong> se han almacenado exitosamente en la tabla <strong>"Contacto"</strong> de Airtable.
              </p>
              <div className="p-3 bg-zinc-900 rounded-lg text-[11px] text-zinc-400 border border-zinc-800 font-mono">
                SLA de Respuesta: Dentro de las próximas 24-48 hrs hábiles el equipo de Luis César Monroy se pondrá en contacto para la auditoría de inventario.
              </div>
              <button
                onClick={handleResetAndClose}
                className="px-6 py-2 rounded-lg bg-[#e07a9e] text-zinc-950 font-bold text-xs"
              >
                Cerrar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {feedbackMsg && (
                <div className="p-3 bg-red-950/40 border border-red-800 rounded-lg text-red-300 text-xs font-mono">
                  {feedbackMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 text-xs mb-1">Nombre del Hotel / Motel *</label>
                  <input
                    type="text"
                    required
                    value={nombreHotel}
                    onChange={(e) => setNombreHotel(e.target.value)}
                    placeholder="Ej. Hotel Posada Real Roma"
                    className="w-full bg-[#121214] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-[#e07a9e] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 text-xs mb-1">Nombre del Contacto / Cargo *</label>
                  <input
                    type="text"
                    required
                    value={contacto}
                    onChange={(e) => setContacto(e.target.value)}
                    placeholder="Ej. Ing. Carlos Soto - Director General"
                    className="w-full bg-[#121214] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-[#e07a9e] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 text-xs mb-1">Correo Electrónico Oficial *</label>
                  <input
                    type="email"
                    required
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="gerencia@hotelposada.com"
                    className="w-full bg-[#121214] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-[#e07a9e] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 text-xs mb-1">Teléfono Directo o WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="+52 55 4123 9870"
                    className="w-full bg-[#121214] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-[#e07a9e] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs mb-1">Dirección Física de la Propiedad</label>
                <input
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Calle, Número, Colonia, Alcaldía (CDMX)"
                  className="w-full bg-[#121214] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-[#e07a9e] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 text-xs mb-1">Sitio Web (si dispone)</label>
                  <input
                    type="url"
                    value={web}
                    onChange={(e) => setWeb(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-[#121214] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-[#e07a9e] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 text-xs mb-1">Redes Sociales (Instagram / Facebook)</label>
                  <input
                    type="text"
                    value={redesSociales}
                    onChange={(e) => setRedesSociales(e.target.value)}
                    placeholder="@hotel_posadacdmx"
                    className="w-full bg-[#121214] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-[#e07a9e] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 text-xs mb-1">Habitaciones a incorporar</label>
                  <select
                    value={habitacionesDisponibles}
                    onChange={(e) => setHabitacionesDisponibles(e.target.value)}
                    className="w-full bg-[#121214] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-[#e07a9e] outline-none"
                  >
                    <option value="5">5 habitaciones (Prueba piloto)</option>
                    <option value="10">10 habitaciones</option>
                    <option value="20">20 habitaciones</option>
                    <option value="30+">Más de 30 habitaciones</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 text-xs mb-1">Modalidad de Interés</label>
                  <select
                    value={modalidadInteres}
                    onChange={(e) => setModalidadInteres(e.target.value)}
                    className="w-full bg-[#121214] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-[#e07a9e] outline-none"
                  >
                    <option value="Ambas (Renta por tiempo + Pernocta)">Ambas (Renta por tiempo + Pernocta)</option>
                    <option value="Solo Renta por Tiempo (4, 6 y 12 hrs)">Solo Renta por Tiempo (4, 6 y 12 hrs)</option>
                    <option value="Solo Pernocta y Suites">Solo Pernocta y Suites</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-xs font-semibold"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-[#e07a9e] hover:bg-[#c05c80] text-zinc-950 font-bold text-xs flex items-center gap-2 transition shadow-lg"
                >
                  {isSubmitting ? (
                    <span>Registrando en Airtable...</span>
                  ) : (
                    <>
                      <span>Enviar Solicitud de Afiliación</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
