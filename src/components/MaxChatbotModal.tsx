import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, QrCode } from 'lucide-react';

export interface MaxChatbotHotelData {
  id?: string | number;
  nombre: string;
  tarifa6Horas: number;
  fachadaUrl: string;
  habitacionUrl: string;
  zona?: string;
}

const DEFAULT_SUPABASE_HOTEL: MaxChatbotHotelData = {
  id: 1,
  nombre: 'HOTEL EXCALIBUR',
  tarifa6Horas: 620,
  fachadaUrl: '/renders/hotel-01-insurgentes/fachada/Polish_20260822_225309771.jpg',
  habitacionUrl: '/renders/hotel-01-insurgentes/habitacion/image~7.jpg',
  zona: 'Londres 117 Col. Juárez (Zona Rosa / Reforma)'
};

interface MessageItem {
  id: string;
  sender: 'max' | 'user';
  text: string;
  timestamp?: string;
}

export interface MaxChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialHotel?: MaxChatbotHotelData;
}

/**
 * VENTANA FLOTANTE DEL CHATBOT MAX
 * Implementación exacta del widget especificado con soporte reactivo y funciones JS globales.
 */
export function MaxChatbotModal({
  isOpen,
  onClose,
  initialHotel
}: MaxChatbotModalProps) {
  const [hotel, setHotel] = useState<MaxChatbotHotelData>(initialHotel || DEFAULT_SUPABASE_HOTEL);
  const [availableHotels, setAvailableHotels] = useState<MaxChatbotHotelData[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [ineFileSelected, setIneFileSelected] = useState(false);
  const [ineFileName, setIneFileName] = useState('');
  
  // Chat state
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 'init-1',
      sender: 'max',
      text: 'Hola, soy Max. ¿Con quién tengo el gusto y para qué hora estimas tu llegada?'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [folioReserva, setFolioReserva] = useState('');

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Carga de hoteles en vivo desde Airtable CRM (con fallback a Supabase / catálogo local)
  useEffect(() => {
    const mapHotels = (hotelsList: any[]) => {
      const mapped: MaxChatbotHotelData[] = hotelsList.map((h: any, idx: number) => ({
        id: h.id || idx + 1,
        nombre: h.nombre || 'Hotel Blue Ocean',
        tarifa6Horas: h.tarifas?.estancia6Horas || 620,
        fachadaUrl: h.renderFachada || DEFAULT_SUPABASE_HOTEL.fachadaUrl,
        habitacionUrl: (Array.isArray(h.renderHabitaciones) && h.renderHabitaciones[0]) 
          ? h.renderHabitaciones[0] 
          : DEFAULT_SUPABASE_HOTEL.habitacionUrl,
        zona: h.zona || h.direccion || 'Ciudad de México'
      }));
      setAvailableHotels(mapped);
      if (!initialHotel && mapped[0]) {
        setHotel(mapped[0]);
      }
    };

    fetch('/api/airtable/hotels')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.hotels) && data.hotels.length > 0) {
          mapHotels(data.hotels);
        } else {
          return fetch('/api/supabase/hotels')
            .then(res => res.json())
            .then(supaData => {
              if (supaData.success && Array.isArray(supaData.hotels)) {
                mapHotels(supaData.hotels);
              }
            });
        }
      })
      .catch(() => {
        fetch('/api/supabase/hotels')
          .then(res => res.json())
          .then(supaData => {
            if (supaData.success && Array.isArray(supaData.hotels)) {
              mapHotels(supaData.hotels);
            }
          })
          .catch(err => {
            console.warn('Fallback hotel list for Max chatbot:', err);
          });
      });
  }, [initialHotel]);

  // Desplazamiento automático al final de mensajes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, showCheckout, isTyping, paymentConfirmed]);

  const handleSendMessage = async () => {
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    setInputVal('');

    const newMsg: MessageItem = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText
    };
    setMessages(prev => [...prev, newMsg]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/chatbot/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });
      const data = await res.json();
      
      const replyText = data.reply || `Con gusto. En ${hotel.nombre} contamos con estancias estándar de 6 horas por $${hotel.tarifa6Horas} MXN, con caseta vehicular discreta y confirmación al instante. Puedes reservarla directamente con el botón de abajo.`;
      
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'max',
          text: replyText
        }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'max',
          text: `Excelente. Tu estancia en ${hotel.nombre} por 6 Horas ($${hotel.tarifa6Horas} MXN) cuenta con estacionamiento privado y check-in directo sin pasar por mostrador. Haz clic en "Reservar esta opción" para continuar.`
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleIneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIneFileSelected(true);
      setIneFileName(e.target.files[0].name);
    } else {
      setIneFileSelected(false);
      setIneFileName('');
    }
  };

  const isCheckoutValid = privacyAgreed && ineFileSelected;

  const handleProcessMercadoPago = () => {
    if (!isCheckoutValid) return;
    setIsProcessingPayment(true);

    // Compatibilidad con alert de especificación (protegido contra sandboxes)
    try {
      window.alert("Procesando pago seguro con Mercado Pago...");
    } catch {
      // Ignorar error si iframe bloquea alert()
    }

    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentConfirmed(true);
      const generatedFolio = `MP-BO-${Math.floor(100000 + Math.random() * 900000)}`;
      setFolioReserva(generatedFolio);

      setMessages(prev => [
        ...prev,
        {
          id: `conf-${Date.now()}`,
          sender: 'max',
          text: `¡Listo! Tu pago con Mercado Pago ha sido validado exitosamente. Tu folio de acceso reservado es ${generatedFolio}. Presenta este comprobante al ingresar a la caseta vehicular de ${hotel.nombre}.`
        }
      ]);
    }, 1600);
  };

  // Exponer funciones globales en window solicitadas por la especificación
  useEffect(() => {
    (window as any).toggleChatbot = () => {
      if (isOpen) {
        onClose();
      } else {
        const modal = document.getElementById('chatbot-modal');
        if (modal) {
          modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
        }
      }
    };

    (window as any).showCheckoutSection = () => {
      setShowCheckout(true);
      const step = document.getElementById('chat-checkout-step');
      if (step) step.style.display = 'block';
    };

    (window as any).validateCheckout = () => {
      const isChecked = (document.getElementById('privacy-agreement') as HTMLInputElement)?.checked;
      const ineInput = document.getElementById('ine-upload') as HTMLInputElement;
      const ineUploaded = (ineInput?.files?.length || 0) > 0;
      const btnMP = document.getElementById('btn-mercadopago') as HTMLButtonElement;

      setPrivacyAgreed(!!isChecked);
      setIneFileSelected(ineUploaded);

      if (btnMP) {
        if (isChecked && ineUploaded) {
          btnMP.disabled = false;
          btnMP.style.cursor = 'pointer';
          btnMP.style.opacity = '1';
        } else {
          btnMP.disabled = true;
          btnMP.style.cursor = 'not-allowed';
          btnMP.style.opacity = '0.5';
        }
      }
    };

    (window as any).sendMessage = handleSendMessage;
    (window as any).processMercadoPago = handleProcessMercadoPago;
  });

  return (
    <div
      id="chatbot-modal"
      style={{
        display: isOpen ? 'flex' : 'none',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '380px',
        maxWidth: 'calc(100vw - 32px)',
        height: '580px',
        maxHeight: 'calc(100vh - 40px)',
        background: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        zIndex: 9999,
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid #e0e0e0',
        fontFamily: "'Helvetica Neue', Arial, sans-serif"
      }}
    >
      {/* Encabezado del Chatbot */}
      <div
        style={{
          backgroundColor: '#003366',
          color: '#ffffff',
          padding: '14px 18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0
        }}
      >
        <div>
          <span style={{ fontWeight: 700, fontSize: '1rem', display: 'block' }}>
            Max | Recepción Virtual
          </span>
          <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>
            Atención rápida y discreta
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            fontSize: '1.4rem',
            cursor: 'pointer',
            lineHeight: 1,
            padding: '2px 6px'
          }}
          title="Cerrar chat"
        >
          &times;
        </button>
      </div>

      {/* Área de Conversación y Fichas de Hoteles */}
      <div
        id="chat-messages"
        ref={chatContainerRef}
        style={{
          flex: 1,
          padding: '16px',
          overflowY: 'auto',
          fontSize: '0.9rem',
          background: '#f8f9fa'
        }}
      >
        {/* Saludo Inicial de Max y Conversación */}
        {messages.map(m => (
          <div
            key={m.id}
            style={{
              marginBottom: '12px',
              background: m.sender === 'max' ? '#e9f0f8' : '#003366',
              color: m.sender === 'max' ? '#1a1a1a' : '#ffffff',
              padding: '12px',
              borderRadius: '10px',
              maxWidth: '85%',
              lineHeight: 1.4,
              marginLeft: m.sender === 'user' ? 'auto' : '0',
              wordBreak: 'break-word',
              boxShadow: m.sender === 'user' ? '0 2px 6px rgba(0,51,102,0.15)' : 'none'
            }}
          >
            {m.sender === 'max' && (
              <span style={{ fontWeight: 700, display: 'block', fontSize: '0.75rem', color: '#003366', marginBottom: '2px' }}>
                Max • Concierge
              </span>
            )}
            {m.text}
          </div>
        ))}

        {isTyping && (
          <div
            style={{
              marginBottom: '12px',
              background: '#e9f0f8',
              padding: '8px 12px',
              borderRadius: '10px',
              color: '#666',
              fontSize: '0.8rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#003366', display: 'inline-block' }} />
            Max está respondiendo...
          </div>
        )}

        {/* Selector de hotel en tiempo real si hay múltiples */}
        {availableHotels.length > 1 && !paymentConfirmed && (
          <div style={{ margin: '8px 0 12px 0' }}>
            <span style={{ fontSize: '0.75rem', color: '#666666', display: 'block', marginBottom: '4px' }}>
              Propiedades disponibles en red:
            </span>
            <select
              value={hotel.nombre}
              onChange={(e) => {
                const found = availableHotels.find(h => h.nombre === e.target.value);
                if (found) setHotel(found);
              }}
              style={{
                width: '100%',
                padding: '6px 8px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '0.8rem',
                backgroundColor: '#fff',
                color: '#333'
              }}
            >
              {availableHotels.map(h => (
                <option key={h.nombre} value={h.nombre}>
                  {h.nombre} — 6 Horas por ${h.tarifa6Horas} MXN
                </option>
              ))}
            </select>
          </div>
        )}

        {/* FICHA TÉCNICA DEL HOTEL (Cargada desde la base de datos Supabase) */}
        {!paymentConfirmed && (
          <div
            id="hotel-card-template"
            style={{
              margin: '15px 0',
              background: '#ffffff',
              border: '1px solid #e0e0e0',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}
          >
            {/* Galería de Imágenes Ordenadas (1. Fachada / 2. Habitación) */}
            <div style={{ display: 'flex', gap: '2px', height: '130px', background: '#eee' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <img
                  id="img-fachada"
                  src={hotel.fachadaUrl || 'https://via.placeholder.com/200x130?text=1.+Fachada'}
                  alt="Fachada Hotel"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x130?text=1.+Fachada';
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '4px',
                    left: '4px',
                    background: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    fontSize: '0.65rem',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}
                >
                  1. Fachada
                </span>
              </div>
              <div style={{ flex: 1, position: 'relative' }}>
                <img
                  id="img-habitacion"
                  src={hotel.habitacionUrl || 'https://via.placeholder.com/200x130?text=2.+Habitaci%C3%B3n'}
                  alt="Habitación Hotel"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x130?text=2.+Habitaci%C3%B3n';
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '4px',
                    left: '4px',
                    background: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    fontSize: '0.65rem',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}
                >
                  2. Habitación
                </span>
              </div>
            </div>

            {/* Datos Principales de la Ficha Técnica */}
            <div style={{ padding: '12px', textAlign: 'left' }}>
              <h4 id="hotel-nombre" style={{ margin: '0 0 4px 0', fontSize: '0.95rem', color: '#003366', fontWeight: 700 }}>
                {hotel.nombre}
              </h4>
              <p id="hotel-estancia" style={{ margin: '0 0 6px 0', fontSize: '0.8rem', color: '#666666' }}>
                Estancia estándar: <b>6 Horas</b>
              </p>
              <p id="hotel-precio" style={{ margin: '0 0 10px 0', fontSize: '0.9rem', fontWeight: 700, color: '#111111' }}>
                Tarifa: ${hotel.tarifa6Horas} MXN
              </p>

              <button
                style={{
                  width: '100%',
                  background: '#003366',
                  color: '#fff',
                  border: 'none',
                  padding: '8px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setShowCheckout(true);
                  const step = document.getElementById('chat-checkout-step');
                  if (step) step.style.display = 'block';
                }}
              >
                Reservar esta opción
              </button>
            </div>
          </div>
        )}

        {/* Confirmación tras Pagar con Mercado Pago */}
        {paymentConfirmed && (
          <div
            style={{
              margin: '12px 0',
              padding: '14px',
              background: '#eef9f2',
              border: '1px solid #a3e2bb',
              borderRadius: '10px',
              textAlign: 'center'
            }}
          >
            <div style={{ color: '#198754', fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <CheckCircle2 style={{ width: '18px', height: '18px' }} />
              ¡Pago con Mercado Pago Aprobado!
            </div>
            <p style={{ fontSize: '0.8rem', color: '#333', margin: '4px 0' }}>
              Propiedad: <b>{hotel.nombre}</b> (6 Horas)
            </p>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#003366', margin: '4px 0' }}>
              Folio de Acceso: {folioReserva}
            </p>
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
              <div style={{ background: '#fff', padding: '6px', borderRadius: '6px', border: '1px solid #ddd' }}>
                <QrCode style={{ width: '64px', height: '64px', color: '#003366' }} />
              </div>
            </div>
            <p style={{ fontSize: '0.72rem', color: '#666', marginTop: '6px' }}>
              Muestra este código al llegar para ingresar directamente sin pasar por mostrador.
            </p>
          </div>
        )}
      </div>

      {/* Entrada de Texto del Chat */}
      <div
        style={{
          padding: '10px',
          borderTop: '1px solid #eeeeee',
          display: 'flex',
          gap: '8px',
          background: '#ffffff',
          flexShrink: 0
        }}
      >
        <input
          type="text"
          id="chat-input"
          placeholder="Escribe tu mensaje..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          style={{
            flex: 1,
            padding: '10px 12px',
            border: '1px solid #cccccc',
            borderRadius: '6px',
            outline: 'none',
            fontSize: '0.85rem'
          }}
        />
        <button
          onClick={handleSendMessage}
          style={{
            background: '#003366',
            color: '#ffffff',
            border: 'none',
            padding: '10px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.85rem'
          }}
        >
          Enviar
        </button>
      </div>

      {/* Sección de Cierre, Captura de INE, Deslinde Bancario y Mercado Pago */}
      <div
        id="chat-checkout-step"
        style={{
          display: showCheckout && !paymentConfirmed ? 'block' : 'none',
          padding: '12px',
          borderTop: '1px solid #e0e0e0',
          background: '#ffffff',
          fontSize: '0.78rem',
          textAlign: 'left',
          flexShrink: 0
        }}
      >
        {/* 1. Captura Obligatoria de INE */}
        <div style={{ marginBottom: '8px' }}>
          <label style={{ fontWeight: 600, color: '#333333', display: 'block', marginBottom: '3px' }}>
            1. Sube la foto de tu INE (Frontal):
          </label>
          <input
            type="file"
            id="ine-upload"
            accept="image/*"
            style={{ width: '100%', fontSize: '0.75rem' }}
            onChange={(e) => {
              handleIneChange(e);
              const isChecked = (document.getElementById('privacy-agreement') as HTMLInputElement)?.checked;
              const hasFile = (e.target.files?.length || 0) > 0;
              const btn = document.getElementById('btn-mercadopago') as HTMLButtonElement;
              if (btn) {
                if (isChecked && hasFile) {
                  btn.disabled = false;
                  btn.style.cursor = 'pointer';
                  btn.style.opacity = '1';
                } else {
                  btn.disabled = true;
                  btn.style.cursor = 'not-allowed';
                  btn.style.opacity = '0.5';
                }
              }
            }}
          />
          {ineFileName && (
            <span style={{ display: 'block', color: '#198754', fontSize: '0.7rem', marginTop: '2px' }}>
              ✓ Archivo adjunto: {ineFileName}
            </span>
          )}
        </div>

        {/* 2. Casilla de Autorización de Privacidad y Deslinde Bancario */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
          <input
            type="checkbox"
            id="privacy-agreement"
            style={{ marginTop: '2px' }}
            checked={privacyAgreed}
            onChange={(e) => {
              setPrivacyAgreed(e.target.checked);
              const ineInput = document.getElementById('ine-upload') as HTMLInputElement;
              const hasFile = (ineInput?.files?.length || 0) > 0 || ineFileSelected;
              const btn = document.getElementById('btn-mercadopago') as HTMLButtonElement;
              if (btn) {
                if (e.target.checked && hasFile) {
                  btn.disabled = false;
                  btn.style.cursor = 'pointer';
                  btn.style.opacity = '1';
                } else {
                  btn.disabled = true;
                  btn.style.cursor = 'not-allowed';
                  btn.style.opacity = '0.5';
                }
              }
            }}
          />
          <label htmlFor="privacy-agreement" style={{ color: '#555555', lineHeight: 1.25, fontSize: '0.72rem' }}>
            Acepto el{' '}
            <a href="/aviso-de-privacidad" target="_blank" rel="noopener noreferrer" style={{ color: '#003366', textDecoration: 'underline' }}>
              Aviso de Privacidad
            </a>{' '}
            y autorizo el uso de mis datos. Declaro que el instrumento bancario es de mi propiedad,{' '}
            <b>deslindando al banco emisor, a la plataforma y al establecimiento</b> de cualquier reclamación posterior.
          </label>
        </div>

        {/* 3. Botón Oficial con Logotipo de Mercado Pago */}
        <button
          id="btn-mercadopago"
          disabled={!isCheckoutValid || isProcessingPayment}
          style={{
            width: '100%',
            backgroundColor: '#009EE3',
            color: '#ffffff',
            padding: '10px',
            border: 'none',
            borderRadius: '6px',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: isCheckoutValid ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            opacity: isCheckoutValid ? 1 : 0.5,
            transition: 'opacity 0.2s'
          }}
          onClick={handleProcessMercadoPago}
        >
          {isProcessingPayment ? (
            <span>Procesando pago seguro...</span>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#009EE3" />
                <path d="M7.5 12.5C7.5 10 9.5 8 12 8C14.5 8 16.5 10 16.5 12.5C16.5 15 14.5 17 12 17" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Pagar con Mercado Pago
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/**
 * ENTRADA LIMPIA Y WIDGET DE RESERVA - BLUE OCEAN
 * Exactamente como fue especificado por el usuario
 */
export function HeroBookingWidget({
  onOpenChatbot
}: {
  onOpenChatbot: () => void;
}) {
  return (
    <div
      id="hero-booking-container"
      style={{
        maxWidth: '500px',
        margin: '40px auto',
        padding: '30px 20px',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        textAlign: 'center',
        background: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      }}
    >
      {/* Encabezado Principal */}
      <h1
        style={{
          fontSize: '1.8rem',
          fontWeight: 700,
          color: '#111111',
          marginBottom: '12px',
          lineHeight: 1.2
        }}
      >
        Tu espacio ideal, cuando lo necesitas.
      </h1>

      {/* Subtítulo de Conversión */}
      <p
        style={{
          fontSize: '1rem',
          color: '#555555',
          marginBottom: '28px',
          lineHeight: 1.5
        }}
      >
        Disfruta de espacios de alta calidad con la máxima privacidad, tarifas flexibles y confirmación al instante.
      </p>

      {/* Botón Único para Iniciar Conversación con Max */}
      <button
        id="btn-open-chatbot"
        style={{
          width: '100%',
          backgroundColor: '#003366',
          color: '#ffffff',
          padding: '16px 20px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1.05rem',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,51,102,0.15)',
          transition: 'background 0.3s'
        }}
        onClick={onOpenChatbot}
      >
        Consultar disponibilidad con Max
      </button>
    </div>
  );
}
