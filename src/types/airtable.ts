/**
 * BLUE OCEAN REVENUE MANAGEMENT - FASE 1
 * Estructuras de datos para Airtable: Base "Hoteles"
 * Tablas autorizadas: "Contacto" e "Inventario de propiedades"
 */

export interface AirtableAttachment {
  id?: string;
  url: string;
  filename?: string;
  size?: number;
  type?: string;
  thumbnails?: {
    small?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
    full?: { url: string; width: number; height: number };
  };
}

/**
 * Tabla: "Contacto" (Campos exactos de Airtable)
 */
export interface AirtableContactoRecord {
  id: string;
  fields: {
    'Nombre del Hotel': string;
    'Correo': string;
    'Teléfono': string;
    'Dirección': string;
    'Contacto': string;
    'Web': string;
    'Redes Sociales': string;
    'Fecha': string;
    'Próximo seguimiento': string;
  };
  createdTime?: string;
}

/**
 * Tabla: "Inventario de propiedades" (Campos exactos de Airtable)
 */
export interface AirtableInventarioPropiedadesRecord {
  id: string;
  fields: {
    'Nombre': string;
    'Correo': string;
    'Teléfono': string;
    'Dirección': string;
    'Render Fachada': AirtableAttachment[] | string[];
    'Render Habitaciones': AirtableAttachment[] | string[];
    'Descripción del hotel': string;
    'Nombre del contacto': string;
  };
  createdTime?: string;
}

/**
 * Entidad Unificada de Hotel para el Sitio de Reservas Blue Ocean
 * Combina la información de "Inventario de propiedades" con "Contacto",
 * e incorpora las tarifas por franjas de tiempo para el flujo de reserva de Fase 1.
 */
export interface BlueOceanHotel {
  id: string;
  airtableRecordId?: string;
  nombre: string;
  correo: string;
  telefono: string;
  direccion: string;
  nombreContacto: string;
  descripcion: string;
  renderFachada: string;
  renderHabitaciones: string[];
  
  // Datos de contacto complementarios (de tabla "Contacto")
  web?: string;
  redesSociales?: string;
  fechaRegistro?: string;
  proximoSeguimiento?: string;

  // Parámetros de Reserva por Tiempo (Fase 1)
  ciudad: string;
  zona: string;
  estrellas: number;
  puntuacion: number;
  totalResenas: number;
  
  // Estructura de tarifas por estancia corta (por tiempo)
  tarifas: {
    estancia4Horas: number;
    estancia6Horas: number;
    estancia12Horas: number;
    nocheCompleta: number;
  };
  
  // Disponibilidad de franjas horarias inmediatas
  disponibilidad: {
    habitacionesDisponibles: number;
    tiposDisponibles: string[];
    horariosInmediatos: string[];
  };

  servicios: string[];
  tipoPropiedad: 'Hotel' | 'Motel & Villas' | 'Boutique Suites';

  // Segmentación Estratégica Dual: Parejas vs. Transportistas / Choferes B2B
  descripcionParejas?: string;
  descripcionTransportistas?: string;
  beneficiosTransportistas?: string[];
  aptoParaCarga?: boolean; // Para camiones, camionetas o unidades de transporte con cochera segura
  facturacionDisponible?: boolean;
}

/**
 * Solicitud de Reserva Funcional (Paso a paso sin pasarela de pago en Fase 1)
 */
export interface ReservaRequest {
  id?: string;
  hotelId: string;
  hotelNombre: string;
  tipoHabitacion: string;
  modalidadEstancia: '4_horas' | '6_horas' | '12_horas' | 'noche_completa';
  fechaLlegada: string;
  horaLlegada: string;
  huespedes: number;
  precioTotal: number;
  
  // Datos del cliente para la reserva
  nombreCliente: string;
  correoCliente: string;
  telefonoCliente: string;
  notasEspeciales?: string;
  
  estado: 'PENDIENTE_CONFIRMACION' | 'CONFIRMADA' | 'CANCELADA';
  codigoReserva: string;
  fechaCreacion: string;

  // MODALIDADES DE PAGO Y SEGURIDAD FINANCIERA:
  // 1. PAGO_EN_RECEPCION: Pago directo en mostrador al llegar (efectivo o tarjeta en recepción).
  // 2. PAGO_TARJETA_EN_LINEA: Pago con tarjeta en el portal al momento de ver el hotel y disponibilidad (conexión con pasarela).
  // 3. PASARELA_GARANTIA_OCEAN_BLUE: Pasarela enlazada de garantía Ocean Blue (retención segura del 15% de comisión).
  metodoPago: 'PAGO_EN_RECEPCION' | 'PAGO_TARJETA_EN_LINEA' | 'PASARELA_GARANTIA_OCEAN_BLUE';
  datosPasarela?: {
    ultimosCuatroDigitos?: string;
    titularTarjeta?: string;
    autorizacionId?: string;
    estadoTransaccion?: 'APROBADA' | 'PROCESANDO' | 'PENDIENTE';
    marcaTarjeta?: string;
  };
  desgloseFinanciero?: {
    tarifaTotal: number;
    comisionOceanBlue15: number;
    netoHotel85: number;
    montoRetencionGarantia: number;
    saldoLiquidableEnHotel: number;
  };
}
