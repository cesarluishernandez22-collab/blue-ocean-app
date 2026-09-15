import { 
  AirtableContactoRecord, 
  AirtableInventarioPropiedadesRecord, 
  BlueOceanHotel,
  ReservaRequest
} from '../types/airtable';

export interface AirtableConfigStatus {
  success: boolean;
  isConfigured: boolean;
  baseName: string;
  tablesConfigured: string[];
  hasApiKey: boolean;
  baseIdMasked: string | null;
  mode: 'LIVE_AIRTABLE_API' | 'LOCAL_MIRROR_FALLBACK';
  timestamp: string;
}

export const airtableClient = {
  /**
   * Consulta el estado de conexión con Airtable
   */
  async getConfigStatus(): Promise<AirtableConfigStatus> {
    try {
      const res = await fetch('/api/airtable/config-status');
      return await res.json();
    } catch (e: any) {
      return {
        success: false,
        isConfigured: false,
        baseName: 'Hoteles',
        tablesConfigured: ['Contacto', 'Inventario de propiedades'],
        hasApiKey: false,
        baseIdMasked: null,
        mode: 'LOCAL_MIRROR_FALLBACK',
        timestamp: new Date().toISOString()
      };
    }
  },

  /**
   * Consulta los registros de la tabla "Contacto"
   */
  async getContactoRecords(): Promise<{
    success: boolean;
    tableName: string;
    source: string;
    count: number;
    records: AirtableContactoRecord[];
  }> {
    const res = await fetch('/api/airtable/contacto');
    return await res.json();
  },

  /**
   * Registra un nuevo contacto en la tabla "Contacto"
   */
  async createContactoRecord(fields: AirtableContactoRecord['fields']): Promise<{
    success: boolean;
    record?: AirtableContactoRecord;
    error?: string;
  }> {
    const res = await fetch('/api/airtable/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    });
    return await res.json();
  },

  /**
   * Consulta los registros de la tabla "Inventario de propiedades"
   */
  async getInventarioRecords(): Promise<{
    success: boolean;
    tableName: string;
    source: string;
    count: number;
    records: AirtableInventarioPropiedadesRecord[];
  }> {
    const res = await fetch('/api/airtable/inventario-propiedades');
    return await res.json();
  },

  /**
   * Consulta el catálogo unificado de hoteles para el sitio de reservas
   */
  async getUnifiedHotels(): Promise<{
    success: boolean;
    source: string;
    totalHotels: number;
    rawCounts: { inventario: number; contacto: number };
    hotels: BlueOceanHotel[];
  }> {
    try {
      const res = await fetch('/api/airtable/hotels');
      const data = await res.json();
      return {
        success: data?.success ?? true,
        source: data?.source ?? 'local_mirror_schema',
        totalHotels: Array.isArray(data?.hotels) ? data.hotels.length : 0,
        rawCounts: data?.rawCounts ?? { inventario: 0, contacto: 0 },
        hotels: Array.isArray(data?.hotels) ? data.hotels : []
      };
    } catch (err) {
      console.error('[airtableClient] Error fetching unified hotels:', err);
      return {
        success: false,
        source: 'local_mirror_fallback',
        totalHotels: 0,
        rawCounts: { inventario: 0, contacto: 0 },
        hotels: []
      };
    }
  },

  /**
   * Envía una solicitud de reserva
   */
  async submitReserva(reserva: Omit<ReservaRequest, 'id' | 'codigoReserva' | 'fechaCreacion' | 'estado'>): Promise<{
    success: boolean;
    reserva: ReservaRequest;
  }> {
    const res = await fetch('/api/reservas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reserva)
    });
    return await res.json();
  },

  /**
   * Lista las reservas registradas
   */
  async getReservas(): Promise<{
    success: boolean;
    count: number;
    reservas: ReservaRequest[];
  }> {
    const res = await fetch('/api/reservas');
    return await res.json();
  }
};
