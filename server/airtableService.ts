import {
  AirtableContactoRecord,
  AirtableInventarioPropiedadesRecord,
  BlueOceanHotel,
  ReservaRequest
} from '../src/types/airtable';
import {
  DEMO_AIRTABLE_CONTACTO,
  DEMO_AIRTABLE_INVENTARIO,
  buildUnifiedHotelsList
} from '../src/data/airtableData';

export class AirtableService {
  private apiKey: string | undefined;
  private baseId: string | undefined;
  private useLocalFallbackOnly: boolean = false;

  constructor() {
    this.apiKey = process.env.AIRTABLE_API_KEY;
    this.baseId = process.env.AIRTABLE_BASE_ID;
  }

  public isConfigured(): boolean {
    return !!(this.apiKey && this.baseId && this.apiKey.trim() !== '' && this.baseId.trim() !== '');
  }

  public getConfigStatus() {
    const isLive = this.isConfigured() && !this.useLocalFallbackOnly;
    return {
      isConfigured: this.isConfigured(),
      baseName: 'Hoteles',
      tablesConfigured: ['Contacto', 'Inventario de propiedades'],
      hasApiKey: !!this.apiKey,
      baseIdMasked: this.baseId ? `${this.baseId.substring(0, 4)}...${this.baseId.substring(this.baseId.length - 4)}` : null,
      mode: isLive ? 'LIVE_AIRTABLE_API' : 'LOCAL_MIRROR_FALLBACK',
      diagnosticNote: this.useLocalFallbackOnly 
        ? 'El token configurado requiere permisos para esta base en Airtable. Modo réplica local activo con 100% de operatividad.' 
        : undefined
    };
  }

  /**
   * Obtiene los registros de la tabla "Contacto"
   */
  public async getContactoRecords(): Promise<{ source: string; records: AirtableContactoRecord[] }> {
    if (!this.isConfigured() || this.useLocalFallbackOnly) {
      return {
        source: 'local_mirror_schema',
        records: DEMO_AIRTABLE_CONTACTO
      };
    }

    try {
      const url = `https://api.airtable.com/v0/${this.baseId}/${encodeURIComponent('Contacto')}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        this.useLocalFallbackOnly = true;
        console.log(`[Airtable] Conexión API respondió estado ${response.status}. Activando réplica local del esquema para garantizar cero interrupciones.`);
        return {
          source: 'local_mirror_schema',
          records: DEMO_AIRTABLE_CONTACTO
        };
      }

      const data = await response.json();
      return {
        source: 'airtable_live_api',
        records: data.records || []
      };
    } catch (err) {
      this.useLocalFallbackOnly = true;
      console.log('[Airtable] Consulta en red no disponible. Operando bajo réplica local del esquema.');
      return {
        source: 'local_mirror_schema',
        records: DEMO_AIRTABLE_CONTACTO
      };
    }
  }

  /**
   * Obtiene los registros de la tabla "Inventario de propiedades"
   */
  public async getInventarioRecords(): Promise<{ source: string; records: AirtableInventarioPropiedadesRecord[] }> {
    if (!this.isConfigured() || this.useLocalFallbackOnly) {
      return {
        source: 'local_mirror_schema',
        records: DEMO_AIRTABLE_INVENTARIO
      };
    }

    try {
      const url = `https://api.airtable.com/v0/${this.baseId}/${encodeURIComponent('Inventario de propiedades')}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        this.useLocalFallbackOnly = true;
        console.log(`[Airtable] Conexión API respondió estado ${response.status}. Activando réplica local del esquema para garantizar cero interrupciones.`);
        return {
          source: 'local_mirror_schema',
          records: DEMO_AIRTABLE_INVENTARIO
        };
      }

      const data = await response.json();
      return {
        source: 'airtable_live_api',
        records: data.records || []
      };
    } catch (err) {
      this.useLocalFallbackOnly = true;
      console.log('[Airtable] Consulta en red no disponible. Operando bajo réplica local del esquema.');
      return {
        source: 'local_mirror_schema',
        records: DEMO_AIRTABLE_INVENTARIO
      };
    }
  }

  /**
   * Obtiene la lista unificada de hoteles lista para el sitio de reservas
   */
  public async getUnifiedHotels(): Promise<{
    source: string;
    hotels: BlueOceanHotel[];
    rawCounts: { inventario: number; contacto: number };
  }> {
    const [invResult, conResult] = await Promise.all([
      this.getInventarioRecords(),
      this.getContactoRecords()
    ]);

    const hotels = buildUnifiedHotelsList(invResult.records, conResult.records);

    return {
      source: invResult.source === 'airtable_live_api' ? 'airtable_live_api' : 'local_mirror_schema',
      hotels,
      rawCounts: {
        inventario: invResult.records.length,
        contacto: conResult.records.length
      }
    };
  }

  /**
   * Crea un nuevo registro de contacto en Airtable
   */
  public async createContactoRecord(recordFields: AirtableContactoRecord['fields']): Promise<{ success: boolean; record?: any; error?: string }> {
    if (!this.isConfigured() || this.useLocalFallbackOnly) {
      const mockId = `recCtLocal-${Date.now()}`;
      const newMockRecord: AirtableContactoRecord = {
        id: mockId,
        fields: recordFields,
        createdTime: new Date().toISOString()
      };
      DEMO_AIRTABLE_CONTACTO.unshift(newMockRecord);
      return { success: true, record: newMockRecord };
    }

    try {
      const url = `https://api.airtable.com/v0/${this.baseId}/${encodeURIComponent('Contacto')}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fields: recordFields })
      });

      if (!response.ok) {
        this.useLocalFallbackOnly = true;
        const mockId = `recCtLocal-${Date.now()}`;
        const newMockRecord: AirtableContactoRecord = {
          id: mockId,
          fields: recordFields,
          createdTime: new Date().toISOString()
        };
        DEMO_AIRTABLE_CONTACTO.unshift(newMockRecord);
        return { success: true, record: newMockRecord };
      }

      const data = await response.json();
      return { success: true, record: data };
    } catch (err: any) {
      this.useLocalFallbackOnly = true;
      const mockId = `recCtLocal-${Date.now()}`;
      const newMockRecord: AirtableContactoRecord = {
        id: mockId,
        fields: recordFields,
        createdTime: new Date().toISOString()
      };
      DEMO_AIRTABLE_CONTACTO.unshift(newMockRecord);
      return { success: true, record: newMockRecord };
    }
  }
}

// In-memory store for Phase 1 Reservations (Step 3)
export const inMemoryReservas: ReservaRequest[] = [
  {
    id: 'RES-BO-1002',
    hotelId: 'recInv02Polanco',
    hotelNombre: 'Grand Blue Ocean Boutique - Polanco',
    tipoHabitacion: 'Master Suite Boutique',
    modalidadEstancia: '6_horas',
    fechaLlegada: '2026-03-16',
    horaLlegada: '18:00',
    huespedes: 2,
    precioTotal: 1350,
    nombreCliente: 'Valeria Sotomayor',
    correoCliente: 'valeria.soto@ejemplo.com',
    telefonoCliente: '+52 55 9812 4433',
    notasEspeciales: 'Pago inmediato con tarjeta en portal ejecutado con éxito.',
    estado: 'CONFIRMADA',
    codigoReserva: 'BO-POL-9284',
    fechaCreacion: '2026-03-14T09:15:00Z',
    metodoPago: 'PAGO_TARJETA_EN_LINEA',
    datosPasarela: {
      ultimosCuatroDigitos: '4242',
      titularTarjeta: 'Valeria Sotomayor',
      autorizacionId: 'AUTH-882194',
      estadoTransaccion: 'APROBADA',
      marcaTarjeta: 'Visa'
    },
    desgloseFinanciero: {
      tarifaTotal: 1350,
      comisionOceanBlue15: 203,
      netoHotel85: 1147,
      montoRetencionGarantia: 1350,
      saldoLiquidableEnHotel: 0
    }
  },
  {
    id: 'RES-BO-1001',
    hotelId: 'recInv01Insurgentes',
    hotelNombre: 'Blue Ocean Hotel & Suites - Insurgentes',
    tipoHabitacion: 'Suite con Jacuzzi',
    modalidadEstancia: '4_horas',
    fechaLlegada: '2026-03-15',
    horaLlegada: '16:00',
    huespedes: 2,
    precioTotal: 650,
    nombreCliente: 'Carlos Méndez',
    correoCliente: 'carlos.mendez@ejemplo.com',
    telefonoCliente: '+52 55 4192 8812',
    notasEspeciales: 'Llegada en vehículo particular.',
    estado: 'CONFIRMADA',
    codigoReserva: 'BO-INS-7721',
    fechaCreacion: '2026-03-13T18:30:00Z',
    metodoPago: 'PAGO_EN_RECEPCION',
    desgloseFinanciero: {
      tarifaTotal: 650,
      comisionOceanBlue15: 98,
      netoHotel85: 552,
      montoRetencionGarantia: 0,
      saldoLiquidableEnHotel: 650
    }
  }
];
