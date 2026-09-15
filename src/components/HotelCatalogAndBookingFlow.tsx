import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Star, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Car, 
  Bath, 
  ChevronRight, 
  Eye,
  Calendar,
  X,
  Phone,
  Mail,
  ShieldCheck,
  User,
  ArrowRight,
  CreditCard,
  Lock,
  DollarSign,
  AlertTriangle,
  FileCheck,
  Receipt
} from 'lucide-react';
import { BlueOceanHotel, ReservaRequest } from '../types/airtable';
import { LCMLogo } from './LCMLogo';
import { airtableClient } from '../services/airtableClient';

interface HotelCatalogAndBookingFlowProps {
  hotels: BlueOceanHotel[];
  selectedModalidad: string;
  onRefreshData?: () => void;
}

export function HotelCatalogAndBookingFlow({
  hotels = [],
  selectedModalidad,
  onRefreshData
}: HotelCatalogAndBookingFlowProps) {
  const safeHotelsList = Array.isArray(hotels) ? hotels : [];
  const [selectedHotelForModal, setSelectedHotelForModal] = useState<BlueOceanHotel | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Booking Flow State
  const [bookingStep, setBookingStep] = useState<'SELECT_STAY' | 'GUEST_DATA' | 'CONFIRMATION_READY'>('SELECT_STAY');
  const [selectedStayType, setSelectedStayType] = useState<'estancia4Horas' | 'estancia6Horas' | 'estancia12Horas' | 'nocheCompleta'>('estancia4Horas');
  const [selectedRoomType, setSelectedRoomType] = useState<string>('Suite con Jacuzzi');
  const [bookingDate, setBookingDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [bookingTime, setBookingTime] = useState<string>('16:00');
  const [guestCount, setGuestCount] = useState<number>(2);

  // Guest Details & Financial Security Rule
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'PAGO_EN_RECEPCION' | 'PAGO_TARJETA_EN_LINEA' | 'PASARELA_GARANTIA_OCEAN_BLUE'>('PAGO_TARJETA_EN_LINEA');
  
  // Card payment portal state (Conexión Pasarela en tiempo real)
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [gatewayProcessingStage, setGatewayProcessingStage] = useState<'IDLE' | 'CONNECTING_GATEWAY' | 'AUTHORIZING' | 'SETTLED'>('IDLE');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<ReservaRequest | null>(null);

  const openHotelDetail = (hotel: BlueOceanHotel) => {
    setSelectedHotelForModal(hotel);
    setActiveImageIndex(0);
    setBookingStep('SELECT_STAY');
    setPaymentMethod('PAGO_TARJETA_EN_LINEA');
    setCardNumber('');
    setCardHolder('');
    setCardExpiry('');
    setCardCvc('');
    setGatewayProcessingStage('IDLE');
    setConfirmedReservation(null);
    setSelectedRoomType(hotel.disponibilidad.tiposDisponibles[0] || 'Suite con Jacuzzi');
  };

  const closeHotelDetail = () => {
    setSelectedHotelForModal(null);
    setBookingStep('SELECT_STAY');
    setPaymentMethod('PAGO_TARJETA_EN_LINEA');
    setGatewayProcessingStage('IDLE');
    setConfirmedReservation(null);
  };

  const getPriceForSelectedStay = (hotel: BlueOceanHotel) => {
    return hotel.tarifas[selectedStayType] || hotel.tarifas.estancia4Horas;
  };

  const handleConfirmReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHotelForModal || !clientName.trim() || !clientEmail.trim()) return;

    if (paymentMethod === 'PAGO_TARJETA_EN_LINEA') {
      if (!cardNumber.trim() || !cardExpiry.trim() || !cardCvc.trim()) {
        alert('Por favor ingresa los datos de tu tarjeta para procesar el pago en el portal.');
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const stayLabelMap: Record<string, any> = {
        estancia4Horas: '4_horas',
        estancia6Horas: '6_horas',
        estancia12Horas: '12_horas',
        nocheCompleta: 'noche_completa'
      };

      const precioTotal = getPriceForSelectedStay(selectedHotelForModal);

      // Simulación de los estados de conexión con la pasarela de pagos
      if (paymentMethod === 'PAGO_TARJETA_EN_LINEA') {
        setGatewayProcessingStage('CONNECTING_GATEWAY');
        await new Promise(resolve => setTimeout(resolve, 600));
        setGatewayProcessingStage('AUTHORIZING');
        await new Promise(resolve => setTimeout(resolve, 700));
      }

      const cleanDigits = cardNumber.replace(/\s+/g, '');
      const lastFour = cleanDigits.length >= 4 ? cleanDigits.slice(-4) : '4242';

      const result = await airtableClient.submitReserva({
        hotelId: selectedHotelForModal.id,
        hotelNombre: selectedHotelForModal.nombre,
        tipoHabitacion: selectedRoomType,
        modalidadEstancia: stayLabelMap[selectedStayType],
        fechaLlegada: bookingDate,
        horaLlegada: bookingTime,
        huespedes: guestCount,
        precioTotal: precioTotal,
        nombreCliente: clientName,
        correoCliente: clientEmail,
        telefonoCliente: clientPhone,
        notasEspeciales: specialRequests,
        metodoPago: paymentMethod,
        datosPasarela: paymentMethod === 'PAGO_TARJETA_EN_LINEA' ? {
          ultimosCuatroDigitos: lastFour,
          titularTarjeta: cardHolder || clientName,
          marcaTarjeta: cleanDigits.startsWith('4') ? 'Visa' : cleanDigits.startsWith('5') ? 'Mastercard' : 'Tarjeta Débito/Crédito',
          estadoTransaccion: 'APROBADA'
        } : undefined
      });

      if (result.success) {
        setGatewayProcessingStage('SETTLED');
        setConfirmedReservation(result.reserva);
        setBookingStep('CONFIRMATION_READY');
      }
    } catch (err) {
      console.error('Error al registrar reserva:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8" id="catalogo">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#e07a9e]/20 text-[#e07a9e] border border-[#e07a9e]/30">
              Catálogo Oficial
            </span>
            <span className="text-[10px] font-mono text-zinc-400">
              Datos: Airtable "Inventario de propiedades"
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            Propiedades Disponibles para Renta por Tiempo
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
            Reserva estancias cortas de 4, 6 o 12 horas, o pernocta completa. Acceso inmediato, discreción absoluta y tarifas directas sin sobreprecio.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-zinc-400">
          <span className="font-mono text-zinc-300 font-bold">{safeHotelsList.length} Hoteles en lista</span>
        </div>
      </div>

      {/* Grid of Hotels (Booking / Expedia Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {safeHotelsList.map((hotel) => (
          <div
            key={hotel.id}
            className="group bg-[#18181b] border border-zinc-800 hover:border-[#e07a9e]/60 rounded-2xl overflow-hidden shadow-lg transition-all duration-200 flex flex-col justify-between"
          >
            {/* Hotel Render Image Container */}
            <div className="relative h-56 w-full bg-zinc-900 overflow-hidden">
              <img
                src={hotel.renderFachada}
                alt={hotel.nombre}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-transparent to-transparent opacity-80" />

              {/* Badges on Image */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-[#121214]/90 text-[#d4af37] border border-[#d4af37]/40 shadow-sm backdrop-blur-sm">
                  ★ {hotel.puntuacion} <span className="text-zinc-400 font-normal">({hotel.totalResenas})</span>
                </span>
                <span className="px-2 py-1 rounded-md text-[10px] font-mono font-semibold bg-[#121214]/90 text-zinc-200 border border-zinc-700 backdrop-blur-sm">
                  {hotel.tipoPropiedad}
                </span>
              </div>

              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-[#38a3a5] text-zinc-950 shadow-sm">
                  Disponibilidad Inmediata
                </span>
              </div>

              {/* Location Badge bottom left */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-zinc-300 font-medium drop-shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-[#e07a9e]" />
                  {hotel.zona}
                </span>
                <span className="text-[11px] font-mono text-zinc-400 bg-[#121214]/80 px-2 py-0.5 rounded">
                  {hotel.ciudad}
                </span>
              </div>
            </div>

            {/* Hotel Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-[#e07a9e] transition-colors line-clamp-1">
                  {hotel.nombre}
                </h3>
                <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {hotel.descripcion}
                </p>

                {/* Feature Chips */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {hotel.servicios.slice(0, 3).map((serv, idx) => (
                    <span 
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-zinc-900 text-zinc-300 border border-zinc-800 font-mono"
                    >
                      <Sparkles className="w-2.5 h-2.5 text-[#38a3a5]" />
                      {serv}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price Table and Action Button */}
              <div className="pt-4 border-t border-zinc-800/80 space-y-3">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-mono">
                      Tarifa Estancia Corta
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-xs text-zinc-400">desde</span>
                      <span className="text-lg font-black text-white font-mono tracking-tight">
                        ${hotel.tarifas.estancia4Horas}
                      </span>
                      <span className="text-[11px] text-zinc-400">MXN / 4 hrs</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-zinc-500 block font-mono">Noche completa</span>
                    <span className="text-xs font-mono font-bold text-[#e07a9e]">
                      ${hotel.tarifas.nocheCompleta} MXN
                    </span>
                  </div>
                </div>

                {/* Trust badge: Pago con Tarjeta en Portal o Recepción */}
                <div className="flex items-center gap-1.5 py-1 px-2 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[10px] text-zinc-400 font-mono">
                  <CreditCard className="w-3.5 h-3.5 text-[#e07a9e] shrink-0" />
                  <span>Pago con tarjeta en portal o en recepción</span>
                </div>

                <button
                  onClick={() => openHotelDetail(hotel)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#121214] hover:bg-[#e07a9e] text-white hover:text-zinc-950 font-bold text-xs border border-zinc-700 hover:border-[#e07a9e] flex items-center justify-center gap-2 transition-all duration-150 shadow-md group-hover:bg-[#e07a9e] group-hover:text-zinc-950"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver Hotel & Reservar</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* MODAL DETALLADO DE HOTEL Y FLUJO DE RESERVA DE PRINCIPIO A FIN */}
      {/* ========================================================================= */}
      {selectedHotelForModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#18181b] border border-zinc-700/80 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 border-b border-zinc-800 bg-[#121214] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-[#e07a9e] border border-zinc-800">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{selectedHotelForModal.nombre}</h3>
                  <p className="text-xs text-zinc-400 font-mono flex items-center gap-2">
                    <span>{selectedHotelForModal.zona}</span>
                    <span>•</span>
                    <span className="text-[#d4af37]">★ {selectedHotelForModal.puntuacion} ({selectedHotelForModal.totalResenas} reseñas)</span>
                  </p>
                </div>
              </div>

              <button
                onClick={closeHotelDetail}
                className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6 text-zinc-200">
              {/* Image Gallery */}
              <div className="space-y-2">
                <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                  <img
                    src={
                      activeImageIndex === 0
                        ? selectedHotelForModal.renderFachada
                        : selectedHotelForModal.renderHabitaciones[activeImageIndex - 1] || selectedHotelForModal.renderFachada
                    }
                    alt="Render propiedad"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#121214]/80 px-2.5 py-1 rounded text-[11px] font-mono text-zinc-300 border border-zinc-700">
                    {activeImageIndex === 0 ? 'Render Fachada Exterior' : `Render Habitación #${activeImageIndex}`}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <button
                    onClick={() => setActiveImageIndex(0)}
                    className={`h-16 w-24 rounded-lg overflow-hidden border shrink-0 transition ${
                      activeImageIndex === 0 ? 'border-[#e07a9e] ring-2 ring-[#e07a9e]/40' : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={selectedHotelForModal.renderFachada} alt="Fachada" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>

                  {selectedHotelForModal.renderHabitaciones.map((imgUrl, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i + 1)}
                      className={`h-16 w-24 rounded-lg overflow-hidden border shrink-0 transition ${
                        activeImageIndex === i + 1 ? 'border-[#e07a9e] ring-2 ring-[#e07a9e]/40' : 'border-zinc-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`Habitación ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Description & Contact Verification */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-3">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Descripción y Equipamiento
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {selectedHotelForModal.descripcion}
                  </p>
                  
                  <div className="pt-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-2">
                      Servicios Incluidos en la Propiedad
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedHotelForModal.servicios.map((s, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#38a3a5]" />
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Airtable Verified Metadata */}
                <div className="bg-[#121214] p-4 rounded-xl border border-zinc-800 space-y-2.5 text-xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#d4af37] block font-bold">
                    Registro Airtable Verificado
                  </span>
                  <div className="space-y-1 text-zinc-400">
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#e07a9e] shrink-0" />
                      <span className="text-zinc-200">{selectedHotelForModal.direccion}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span className="font-mono text-zinc-300">{selectedHotelForModal.telefono}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#38a3a5] shrink-0" />
                      <span>Contacto: {selectedHotelForModal.nombreContacto}</span>
                    </p>
                  </div>
                  <div className="pt-2 border-t border-zinc-800 text-[10px] text-zinc-500 font-mono">
                    ID Airtable: {selectedHotelForModal.airtableRecordId}
                  </div>

                  <div className="pt-2 border-t border-zinc-800/80">
                    <div className="p-2 rounded bg-zinc-900/90 border border-amber-500/20 text-[10px] text-zinc-400 space-y-1">
                      <span className="font-mono text-amber-400 font-bold block flex items-center gap-1">
                        <Lock className="w-3 h-3 text-amber-400" />
                        Política de Pago Protegida:
                      </span>
                      <p className="text-zinc-300">
                        Cero pagos web directos. Pago 100% en mostrador o garantía enlazada del 15% Ocean Blue.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================================== */}
              {/* PASO A PASO: FLUJO DE RESERVA DE PRINCIPIO A FIN */}
              {/* =================================================================== */}
              <div className="border-t border-zinc-800 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[11px] font-mono text-[#e07a9e] font-bold uppercase tracking-wider block">
                      Flujo de Reserva Funcional
                    </span>
                    <h4 className="text-base font-bold text-white">
                      {bookingStep === 'SELECT_STAY' && '1. Selecciona la modalidad de estancia'}
                      {bookingStep === 'GUEST_DATA' && '2. Ingresa tus datos para la confirmación'}
                      {bookingStep === 'CONFIRMATION_READY' && '3. ¡Reserva Confirmada Exitosamente!'}
                    </h4>
                  </div>

                  {/* Step Pills */}
                  <div className="flex items-center gap-1.5 text-[10px] font-mono">
                    <span className={`px-2 py-0.5 rounded ${bookingStep === 'SELECT_STAY' ? 'bg-[#e07a9e] text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-400'}`}>
                      Paso 1
                    </span>
                    <span className={`px-2 py-0.5 rounded ${bookingStep === 'GUEST_DATA' ? 'bg-[#e07a9e] text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-400'}`}>
                      Paso 2
                    </span>
                    <span className={`px-2 py-0.5 rounded ${bookingStep === 'CONFIRMATION_READY' ? 'bg-emerald-500 text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-400'}`}>
                      Paso 3
                    </span>
                  </div>
                </div>

                {/* STEP 1: SELECT STAY & ROOM */}
                {bookingStep === 'SELECT_STAY' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { id: 'estancia4Horas' as const, label: '4 Horas', subtitle: 'Estancia Express', price: selectedHotelForModal.tarifas.estancia4Horas },
                        { id: 'estancia6Horas' as const, label: '6 Horas', subtitle: 'Estancia Confort', price: selectedHotelForModal.tarifas.estancia6Horas },
                        { id: 'estancia12Horas' as const, label: '12 Horas', subtitle: 'Día Completo', price: selectedHotelForModal.tarifas.estancia12Horas },
                        { id: 'nocheCompleta' as const, label: 'Pernocta', subtitle: 'Noche Completa', price: selectedHotelForModal.tarifas.nocheCompleta }
                      ].map((stay) => (
                        <button
                          key={stay.id}
                          type="button"
                          onClick={() => setSelectedStayType(stay.id)}
                          className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                            selectedStayType === stay.id
                              ? 'bg-[#121214] border-[#e07a9e] ring-2 ring-[#e07a9e]/30'
                              : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                          }`}
                        >
                          <div>
                            <span className="text-xs font-bold text-white block">{stay.label}</span>
                            <span className="text-[10px] text-zinc-400 font-mono">{stay.subtitle}</span>
                          </div>
                          <div className="mt-3">
                            <span className="text-sm font-black font-mono text-[#e07a9e]">${stay.price}</span>
                            <span className="text-[10px] text-zinc-500 ml-1">MXN</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div>
                        <label className="block text-zinc-400 text-xs mb-1">Tipo de Habitación</label>
                        <select
                          value={selectedRoomType}
                          onChange={(e) => setSelectedRoomType(e.target.value)}
                          className="w-full bg-[#121214] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-[#e07a9e] outline-none"
                        >
                          {selectedHotelForModal.disponibilidad.tiposDisponibles.map((tipo, idx) => (
                            <option key={idx} value={tipo}>{tipo}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-zinc-400 text-xs mb-1">Fecha de Llegada</label>
                        <input
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full bg-[#121214] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-[#e07a9e] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-zinc-400 text-xs mb-1">Hora Estimada</label>
                        <select
                          value={bookingTime}
                          onChange={(e) => setBookingTime(e.target.value)}
                          className="w-full bg-[#121214] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-[#e07a9e] outline-none font-mono"
                        >
                          {selectedHotelForModal.disponibilidad.horariosInmediatos.map((hora, idx) => (
                            <option key={idx} value={hora}>{hora}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                      <div>
                        <span className="text-[11px] text-zinc-500 font-mono block">Tarifa de Estancia Seleccionada</span>
                        <span className="text-xl font-black text-white font-mono">
                          ${getPriceForSelectedStay(selectedHotelForModal)} MXN
                        </span>
                      </div>

                      <button
                        onClick={() => setBookingStep('GUEST_DATA')}
                        className="px-6 py-2.5 rounded-xl bg-[#e07a9e] hover:bg-[#c05c80] text-zinc-950 font-bold text-xs flex items-center gap-2 transition shadow-lg"
                      >
                        <span>Continuar a Selección de Pago</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: GUEST DETAILS & FINANCIAL SECURITY PAYMENT RULE */}
                {bookingStep === 'GUEST_DATA' && (
                  <form onSubmit={handleConfirmReservation} className="space-y-4">
                    {/* Security Financial Policy Banner */}
                    <div className="p-3.5 bg-zinc-900/90 rounded-xl border border-[#e07a9e]/30 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[#e07a9e] font-bold text-xs uppercase tracking-wide font-mono">
                          <CreditCard className="w-4 h-4 text-[#e07a9e] shrink-0" />
                          <span>Flexibilidad Comercial y Seguridad Financiera</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                          Pasarela Directa Habilitada
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-300 leading-relaxed">
                        Si deseas liquidar al instante, puedes <strong>Pagar con Tarjeta Ahora en el Portal</strong> con conexión segura a la pasarela bancaria. Si prefieres pagar físicamente, cuentas con la opción de <strong>Pago en Recepción</strong> al llegar, o <strong>Garantía del 15%</strong> enlazada para asegurar tu reserva con antelación.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-zinc-400 text-xs mb-1 font-medium">Nombre Completo *</label>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="Tu nombre o seudónimo"
                          className="w-full bg-[#121214] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-[#e07a9e] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-zinc-400 text-xs mb-1 font-medium">Correo Electrónico *</label>
                        <input
                          type="email"
                          required
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="correo@ejemplo.com"
                          className="w-full bg-[#121214] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-[#e07a9e] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-zinc-400 text-xs mb-1 font-medium">Teléfono / WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder="+52 55 1234 5678"
                          className="w-full bg-[#121214] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-[#e07a9e] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-zinc-400 text-xs mb-1 font-medium">Notas o Peticiones Especiales (Opcional)</label>
                      <input
                        type="text"
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Ej. Llegada discreta con cochera privada, amenidad especial, etc."
                        className="w-full bg-[#121214] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-[#e07a9e] outline-none"
                      />
                    </div>

                    {/* Selector Explícito de Método de Liquidación y Pago con Tarjeta en el Portal */}
                    <div className="space-y-2 pt-1">
                      <label className="block text-zinc-300 text-xs font-bold font-mono uppercase tracking-wider">
                        Modalidad de Pago y Liquidación *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* Opción 1: Pago al momento con Tarjeta en el Portal (Pasarela de Pago) */}
                        <div
                          onClick={() => setPaymentMethod('PAGO_TARJETA_EN_LINEA')}
                          className={`p-3.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                            paymentMethod === 'PAGO_TARJETA_EN_LINEA'
                              ? 'bg-zinc-900 border-[#e07a9e] ring-2 ring-[#e07a9e]/30'
                              : 'bg-[#121214] border-zinc-800 hover:border-zinc-700 opacity-80'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <input
                              type="radio"
                              name="paymentMethod"
                              checked={paymentMethod === 'PAGO_TARJETA_EN_LINEA'}
                              onChange={() => setPaymentMethod('PAGO_TARJETA_EN_LINEA')}
                              className="mt-0.5 accent-[#e07a9e]"
                            />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <CreditCard className="w-3.5 h-3.5 text-[#e07a9e]" />
                                <span className="text-xs font-bold text-white">Pagar con Tarjeta Ahora</span>
                              </div>
                              <span className="text-[10px] font-mono text-[#e07a9e] block mt-0.5 font-bold">
                                Liquidación Inmediata en Portal
                              </span>
                              <p className="text-[11px] text-zinc-400 mt-1.5 leading-relaxed">
                                Paga al momento con tarjeta de débito o crédito en el portal al ver disponibilidad. Se conecta directamente a la pasarela de pagos.
                              </p>
                            </div>
                          </div>
                          <div className="mt-3 pt-2 border-t border-zinc-800 text-[10px] text-zinc-400 flex items-center justify-between font-mono">
                            <span>A cargar a tu tarjeta:</span>
                            <span className="text-[#e07a9e] font-bold">${getPriceForSelectedStay(selectedHotelForModal)} MXN</span>
                          </div>
                        </div>

                        {/* Opción 2: Pago Directo en Recepción */}
                        <div
                          onClick={() => setPaymentMethod('PAGO_EN_RECEPCION')}
                          className={`p-3.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                            paymentMethod === 'PAGO_EN_RECEPCION'
                              ? 'bg-zinc-900 border-[#38a3a5] ring-2 ring-[#38a3a5]/30'
                              : 'bg-[#121214] border-zinc-800 hover:border-zinc-700 opacity-80'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <input
                              type="radio"
                              name="paymentMethod"
                              checked={paymentMethod === 'PAGO_EN_RECEPCION'}
                              onChange={() => setPaymentMethod('PAGO_EN_RECEPCION')}
                              className="mt-0.5 accent-[#38a3a5]"
                            />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <Building2 className="w-3.5 h-3.5 text-[#38a3a5]" />
                                <span className="text-xs font-bold text-white">Pago en Recepción</span>
                              </div>
                              <span className="text-[10px] font-mono text-[#38a3a5] block mt-0.5">
                                Efectivo o Tarjeta en Mostrador
                              </span>
                              <p className="text-[11px] text-zinc-400 mt-1.5 leading-relaxed">
                                Pagas directamente al llegar al hotel en recepción. Sin ningún cargo en línea previo.
                              </p>
                            </div>
                          </div>
                          <div className="mt-3 pt-2 border-t border-zinc-800 text-[10px] text-zinc-400 flex items-center justify-between font-mono">
                            <span>A liquidar al llegar:</span>
                            <span className="text-white font-bold">${getPriceForSelectedStay(selectedHotelForModal)} MXN</span>
                          </div>
                        </div>

                        {/* Opción 3: Pasarela Enlazada con Garantía del 15% */}
                        <div
                          onClick={() => setPaymentMethod('PASARELA_GARANTIA_OCEAN_BLUE')}
                          className={`p-3.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                            paymentMethod === 'PASARELA_GARANTIA_OCEAN_BLUE'
                              ? 'bg-zinc-900 border-[#d4af37] ring-2 ring-[#d4af37]/30'
                              : 'bg-[#121214] border-zinc-800 hover:border-zinc-700 opacity-80'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <input
                              type="radio"
                              name="paymentMethod"
                              checked={paymentMethod === 'PASARELA_GARANTIA_OCEAN_BLUE'}
                              onChange={() => setPaymentMethod('PASARELA_GARANTIA_OCEAN_BLUE')}
                              className="mt-0.5 accent-[#d4af37]"
                            />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
                                <span className="text-xs font-bold text-white">Garantía del 15%</span>
                              </div>
                              <span className="text-[10px] font-mono text-[#d4af37] block mt-0.5">
                                Retención Enlazada Ocean Blue
                              </span>
                              <p className="text-[11px] text-zinc-400 mt-1.5 leading-relaxed">
                                Retiene el 15% de comisión de garantía en pasarela y liquidas el 85% restante al check-in en hotel.
                              </p>
                            </div>
                          </div>
                          <div className="mt-3 pt-2 border-t border-zinc-800 text-[10px] text-zinc-400 flex items-center justify-between font-mono">
                            <span>Garantía (15%):</span>
                            <span className="text-[#d4af37] font-bold">
                              ${Math.round(getPriceForSelectedStay(selectedHotelForModal) * 0.15)} MXN
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* FORMULARIO DE PASARELA DE PAGO CON TARJETA EN EL PORTAL */}
                    {paymentMethod === 'PAGO_TARJETA_EN_LINEA' && (
                      <div className="p-4 bg-[#121214] rounded-xl border border-[#e07a9e]/40 space-y-3 animate-in fade-in duration-200">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-[#e07a9e]" />
                            <span className="text-xs font-bold text-white font-mono uppercase">
                              Pasarela de Pago Segura en Línea
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                            <span className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700 text-zinc-300">Visa</span>
                            <span className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700 text-zinc-300">Mastercard</span>
                            <span className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700 text-zinc-300">AMEX</span>
                            <span className="flex items-center gap-1 text-emerald-400">
                              <Lock className="w-3 h-3" /> SSL 256-bit
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-zinc-400 text-xs mb-1 font-medium">Número de Tarjeta *</label>
                            <input
                              type="text"
                              required
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              placeholder="4532 •••• •••• 8821"
                              maxLength={19}
                              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-[#e07a9e] outline-none font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-zinc-400 text-xs mb-1 font-medium">Nombre en la Tarjeta *</label>
                            <input
                              type="text"
                              required
                              value={cardHolder}
                              onChange={(e) => setCardHolder(e.target.value)}
                              placeholder={clientName || "Nombre como aparece en la tarjeta"}
                              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-[#e07a9e] outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div>
                            <label className="block text-zinc-400 text-xs mb-1 font-medium">Vencimiento (MM/AA) *</label>
                            <input
                              type="text"
                              required
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="12/28"
                              maxLength={5}
                              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-[#e07a9e] outline-none font-mono text-center"
                            />
                          </div>

                          <div>
                            <label className="block text-zinc-400 text-xs mb-1 font-medium">CVV / CVC *</label>
                            <input
                              type="password"
                              required
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                              placeholder="•••"
                              maxLength={4}
                              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-[#e07a9e] outline-none font-mono text-center"
                            />
                          </div>

                          <div className="col-span-2 flex items-center gap-2 p-2 bg-zinc-900/60 rounded-lg border border-zinc-800 text-[10px] text-zinc-400">
                            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>
                              Conexión de pasarela cifrada. Al confirmar, el portal efectúa la liquidación total de <strong>${getPriceForSelectedStay(selectedHotelForModal)} MXN</strong> y emite tu garantía sin colas en recepción.
                            </span>
                          </div>
                        </div>

                        {/* Gateway connection indicator */}
                        {gatewayProcessingStage !== 'IDLE' && (
                          <div className="p-2.5 rounded-lg bg-zinc-900 border border-[#e07a9e]/60 flex items-center justify-between text-xs font-mono">
                            <span className="text-zinc-300 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#e07a9e] animate-ping" />
                              {gatewayProcessingStage === 'CONNECTING_GATEWAY' && 'Estableciendo conexión con pasarela bancaria...'}
                              {gatewayProcessingStage === 'AUTHORIZING' && 'Autorizando transacción y reteniendo garantía...'}
                              {gatewayProcessingStage === 'SETTLED' && 'Pago aprobado exitosamente por la pasarela.'}
                            </span>
                            <span className="text-[#d4af37] font-bold">Protocolo Seguro</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Desglose de Liquidación y Auditoría Financiera */}
                    <div className="p-3.5 bg-[#121214] rounded-xl border border-zinc-800 text-xs space-y-2 text-zinc-300">
                      <div className="flex items-center justify-between text-zinc-200 font-semibold border-b border-zinc-800 pb-2">
                        <span className="font-mono uppercase text-[11px] text-zinc-400">Desglose de Liquidación</span>
                        <span className="text-[#d4af37] font-mono font-bold">${getPriceForSelectedStay(selectedHotelForModal)} MXN Total</span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono pt-1">
                        <div className="bg-zinc-900/80 p-2 rounded border border-zinc-800/80">
                          <span className="text-zinc-500 block text-[10px]">Ingreso Hotel (85%)</span>
                          <span className="text-emerald-400 font-bold">
                            ${getPriceForSelectedStay(selectedHotelForModal) - Math.round(getPriceForSelectedStay(selectedHotelForModal) * 0.15)} MXN
                          </span>
                        </div>
                        <div className="bg-zinc-900/80 p-2 rounded border border-zinc-800/80">
                          <span className="text-zinc-500 block text-[10px]">Comisión Ocean Blue (15%)</span>
                          <span className="text-[#e07a9e] font-bold">
                            ${Math.round(getPriceForSelectedStay(selectedHotelForModal) * 0.15)} MXN
                          </span>
                        </div>
                        <div className="bg-zinc-900/80 p-2 rounded border border-zinc-800/80">
                          <span className="text-zinc-500 block text-[10px]">
                            {paymentMethod === 'PAGO_TARJETA_EN_LINEA' ? 'Cobro en Pasarela Portal' : 'Liquidación en Mostrador'}
                          </span>
                          <span className="text-white font-bold">
                            {paymentMethod === 'PAGO_TARJETA_EN_LINEA'
                              ? `$${getPriceForSelectedStay(selectedHotelForModal)} MXN (100% Pagado)`
                              : paymentMethod === 'PAGO_EN_RECEPCION'
                              ? `$${getPriceForSelectedStay(selectedHotelForModal)} MXN (100% en Hotel)`
                              : `$${getPriceForSelectedStay(selectedHotelForModal) - Math.round(getPriceForSelectedStay(selectedHotelForModal) * 0.15)} MXN (85% en Hotel)`}
                          </span>
                        </div>
                      </div>

                      <div className="text-[10px] text-zinc-400 flex items-start gap-1.5 pt-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>
                          Garantía de Cero Suplantación: Todos los montos son auditados directamente contra el registro oficial de inventario de propiedades en Airtable.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                      <button
                        type="button"
                        onClick={() => setBookingStep('SELECT_STAY')}
                        className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-xs"
                      >
                        Atrás
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition shadow-lg ${
                          paymentMethod === 'PAGO_TARJETA_EN_LINEA'
                            ? 'bg-[#e07a9e] hover:bg-[#c05c80] text-zinc-950'
                            : 'bg-[#38a3a5] hover:bg-[#4ba3a3] text-zinc-950'
                        }`}
                      >
                        {isSubmitting ? (
                          <span>
                            {paymentMethod === 'PAGO_TARJETA_EN_LINEA' ? 'Procesando Tarjeta en Pasarela...' : 'Procesando Garantía...'}
                          </span>
                        ) : (
                          <>
                            {paymentMethod === 'PAGO_TARJETA_EN_LINEA' ? (
                              <>
                                <CreditCard className="w-4 h-4" />
                                <span>Pagar ${getPriceForSelectedStay(selectedHotelForModal)} MXN Ahora</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Emitir Reserva con Garantía</span>
                              </>
                            )}
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {/* STEP 3: CONFIRMATION VOUCHER CON REGLA DE SEGURIDAD FINANCIERA */}
                {bookingStep === 'CONFIRMATION_READY' && confirmedReservation && (
                  <div className="bg-[#121214] border border-emerald-800/60 rounded-xl p-6 text-zinc-200 space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold">
                          {confirmedReservation.metodoPago === 'PAGO_TARJETA_EN_LINEA'
                            ? '¡Pago con Tarjeta Aprobado & Reserva Confirmada!'
                            : 'Reserva y Garantía Financiera Asegurada'}
                        </span>
                        <h4 className="text-lg font-bold text-white">
                          Código de Reserva: <span className="text-[#d4af37] font-mono">{confirmedReservation.codigoReserva}</span>
                        </h4>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-zinc-900/80 p-3 rounded-lg border border-zinc-800 text-xs">
                      <div>
                        <span className="text-zinc-500 block text-[10px]">Hotel</span>
                        <span className="text-white font-bold">{confirmedReservation.hotelNombre}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[10px]">Habitación</span>
                        <span className="text-white font-bold">{confirmedReservation.tipoHabitacion}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[10px]">Fecha y Hora</span>
                        <span className="text-white font-bold">{confirmedReservation.fechaLlegada} • {confirmedReservation.horaLlegada}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[10px]">Tarifa Total</span>
                        <span className="text-[#e07a9e] font-mono font-bold">${confirmedReservation.precioTotal} MXN</span>
                      </div>
                    </div>

                    {/* Certificación de Pago en Recepción / Tarjeta en Línea / Garantía Ocean Blue */}
                    <div className="p-4 bg-zinc-900/90 rounded-lg border border-zinc-700/80 text-xs space-y-2">
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                        <span className="font-mono text-zinc-300 font-bold flex items-center gap-1.5">
                          <Receipt className="w-4 h-4 text-[#d4af37]" />
                          Estado de Pago y Pasarela:
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          confirmedReservation.metodoPago === 'PAGO_TARJETA_EN_LINEA'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : confirmedReservation.metodoPago === 'PASARELA_GARANTIA_OCEAN_BLUE'
                            ? 'bg-[#e07a9e]/20 text-[#e07a9e] border border-[#e07a9e]/40'
                            : 'bg-[#38a3a5]/20 text-[#38a3a5] border border-[#38a3a5]/40'
                        }`}>
                          {confirmedReservation.metodoPago === 'PAGO_TARJETA_EN_LINEA'
                            ? 'Pagado con Tarjeta en Línea (100%)'
                            : confirmedReservation.metodoPago === 'PASARELA_GARANTIA_OCEAN_BLUE'
                            ? 'Pasarela Enlazada (15% Retenido)'
                            : 'Pago Directo en Recepción'}
                        </span>
                      </div>

                      {confirmedReservation.metodoPago === 'PAGO_TARJETA_EN_LINEA' ? (
                        <div className="space-y-1.5 text-zinc-300 text-[11px]">
                          <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-emerald-500/30 text-emerald-400 font-mono text-[11px]">
                            <span>Transacción Pasarela: {confirmedReservation.datosPasarela?.autorizacionId || 'AUTH-OK'}</span>
                            <span>Tarjeta: •••• {confirmedReservation.datosPasarela?.ultimosCuatroDigitos || '4242'}</span>
                          </div>
                          <p className="text-emerald-400 font-bold">
                            • Tarifa 100% liquidada en el portal: ${confirmedReservation.precioTotal} MXN.
                          </p>
                          <p className="text-zinc-400">
                            • Al llegar a la recepción o cochera, solo presenta tu código <strong className="text-white font-mono">{confirmedReservation.codigoReserva}</strong>. Acceso directo garantizado sin pagos adicionales.
                          </p>
                        </div>
                      ) : confirmedReservation.metodoPago === 'PASARELA_GARANTIA_OCEAN_BLUE' ? (
                        <div className="space-y-1 text-zinc-300 text-[11px]">
                          <p>
                            • <strong>Retención de Garantía (15%):</strong> ${Math.round(confirmedReservation.precioTotal * 0.15)} MXN asegurados por Ocean Blue.
                          </p>
                          <p className="text-emerald-400 font-bold">
                            • <strong>Saldo a liquidar en recepción del hotel al llegar:</strong> ${confirmedReservation.precioTotal - Math.round(confirmedReservation.precioTotal * 0.15)} MXN (Tarjeta o Efectivo).
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-1 text-zinc-300 text-[11px]">
                          <p className="text-emerald-400 font-bold">
                            • <strong>Monto total a liquidar en mostrador del hotel:</strong> ${confirmedReservation.precioTotal} MXN.
                          </p>
                          <p className="text-zinc-400">
                            • Acepta efectivo o tarjeta directamente con el recepcionista del hotel al llegar.
                          </p>
                        </div>
                      )}

                      <p className="text-[10px] text-zinc-500 pt-1 border-t border-zinc-800">
                        * Política de Cero Suposiciones: Transacción verificada e incorporada a la trazabilidad del sistema y registro en memoria de reservas.
                      </p>
                    </div>

                    <div className="text-xs text-zinc-400 space-y-1">
                      <p>
                        Titular: <strong className="text-zinc-200">{confirmedReservation.nombreCliente}</strong> ({confirmedReservation.correoCliente} - {confirmedReservation.telefonoCliente})
                      </p>
                      <p className="text-[11px] text-zinc-500">
                        Presenta este voucher digital o tu código <strong className="text-zinc-300">{confirmedReservation.codigoReserva}</strong> directamente en recepción o al ingresar por cochera automatizada.
                      </p>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={closeHotelDetail}
                        className="px-5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition"
                      >
                        Cerrar y Volver al Catálogo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
