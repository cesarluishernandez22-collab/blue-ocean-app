import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BlueOceanHotel } from '../src/types/airtable';
import { 
  DEMO_AIRTABLE_CONTACTO, 
  DEMO_AIRTABLE_INVENTARIO, 
  buildUnifiedHotelsList 
} from '../src/data/airtableData';

const DEFAULT_DEMO_HOTELS = buildUnifiedHotelsList(DEMO_AIRTABLE_INVENTARIO, DEMO_AIRTABLE_CONTACTO);

const DEFAULT_SUPABASE_URL = 'https://ktphxnyadhlcwfspmxns.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_PxLEboKeuup2x-DjJzS5tQ_-JAWjVM5';

function sanitizeSupabaseUrl(rawUrl: string | undefined): string {
  if (!rawUrl) return DEFAULT_SUPABASE_URL;
  let str = rawUrl.trim();
  // Strip surrounding quotes
  str = str.replace(/^["']|["']$/g, '').trim();
  // Extract URL if wrapped in markdown link [text](https://...) or [https://...](https://...)
  const markdownMatch = str.match(/\((https?:\/\/[^\s)]+)\)/);
  if (markdownMatch) {
    str = markdownMatch[1].trim();
  } else {
    // Extract http(s) URL pattern
    const urlMatch = str.match(/https?:\/\/[^\s\]\)"']+/);
    if (urlMatch) {
      str = urlMatch[0].trim();
    }
  }
  try {
    const parsed = new URL(str);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.origin;
    }
  } catch {
    return DEFAULT_SUPABASE_URL;
  }
  return DEFAULT_SUPABASE_URL;
}

function sanitizeSupabaseKey(rawKey: string | undefined): string {
  if (!rawKey) return DEFAULT_SUPABASE_ANON_KEY;
  let str = rawKey.trim();
  str = str.replace(/^["']|["']$/g, '').trim();
  const tokenMatch = str.match(/([a-zA-Z0-9_\-\.]{20,})/);
  if (tokenMatch) {
    return tokenMatch[1].trim();
  }
  return str.length > 0 ? str : DEFAULT_SUPABASE_ANON_KEY;
}

function withTimeout<T>(promise: PromiseLike<T>, ms = 2500, timeoutErrorMsg = 'Timeout'): Promise<T> {
  return Promise.race([
    Promise.resolve(promise),
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error(timeoutErrorMsg)), ms))
  ]);
}

let supabaseClient: SupabaseClient | null = null;

export class SupabaseService {
  private url: string;
  private anonKey: string;

  constructor() {
    this.url = sanitizeSupabaseUrl(process.env.SUPABASE_URL);
    this.anonKey = sanitizeSupabaseKey(process.env.SUPABASE_ANON_KEY);
  }

  public isConfigured(): boolean {
    return !!(this.url && this.anonKey && this.url.trim() !== '' && this.anonKey.trim() !== '');
  }

  public getClient(): SupabaseClient | null {
    if (!this.isConfigured()) {
      return null;
    }
    if (!supabaseClient) {
      try {
        supabaseClient = createClient(this.url, this.anonKey, {
          auth: { persistSession: false }
        });
      } catch (err: any) {
        console.warn('[Supabase] Aviso al inicializar cliente:', err?.message || err);
        return null;
      }
    }
    return supabaseClient;
  }

  public async getStatus() {
    const configured = this.isConfigured();
    if (!configured) {
      return {
        configured: false,
        connected: false,
        urlProvided: !!this.url,
        keyProvided: !!this.anonKey,
        maskedUrl: this.url ? `${this.url.substring(0, 15)}...` : null,
        message: 'Credenciales de Supabase pendientes en variables de entorno (SUPABASE_URL y SUPABASE_ANON_KEY).'
      };
    }

    try {
      const client = this.getClient();
      if (!client) {
        return {
          configured: true,
          connected: false,
          message: 'Error al instanciar el cliente Supabase.'
        };
      }

      // Check connection and table existence
      const { data, count, error } = await withTimeout(
        client
          .from('hoteles')
          .select('id, nombre, ciudad', { count: 'exact' })
          .limit(5),
        2000,
        'Tiempo de espera agotado al consultar Supabase'
      );

      if (error) {
        return {
          configured: true,
          connected: false,
          error: error.message,
          message: 'Host no disponible o la tabla "hoteles" aún no existe en el proyecto Supabase.'
        };
      }

      return {
        configured: true,
        connected: true,
        hotelCount: count ?? data?.length ?? 0,
        sampleHotels: data?.map(h => h.nombre) || [],
        message: '¡Conexión exitosa a Supabase (PostgreSQL)! Base de datos activa y en vivo.'
      };
    } catch (err: any) {
      return {
        configured: true,
        connected: false,
        error: err.message,
        message: 'Servicio Supabase en modo local/fallback (catálogo predeterminado activo y seguro).'
      };
    }
  }

  public async getHotels(): Promise<{ source: string; hotels: BlueOceanHotel[]; count: number }> {
    const client = this.getClient();
    if (!client) {
      return {
        source: 'local_catalogue_demo',
        hotels: DEFAULT_DEMO_HOTELS,
        count: DEFAULT_DEMO_HOTELS.length
      };
    }

    try {
      const { data, error } = await withTimeout(
        client
          .from('hoteles')
          .select(`
            *,
            habitaciones (*)
          `)
          .eq('activo', true),
        2000,
        'Tiempo de espera de Supabase agotado'
      );

      if (error || !data || data.length === 0) {
        // Redirección silenciosa a catálogo local de respaldo
        return {
          source: 'local_catalogue_demo',
          hotels: DEFAULT_DEMO_HOTELS,
          count: DEFAULT_DEMO_HOTELS.length
        };
      }

      // Transform Supabase rows into BlueOceanHotel format
      const formattedHotels: BlueOceanHotel[] = data.map((h: any) => {
        const habs = h.habitaciones || [];
        const primeraHab = habs[0] || {};
        const fachada = h.foto_fachada || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
        const galeria = h.fotos_galeria && h.fotos_galeria.length > 0 ? h.fotos_galeria : [fachada];

        const tarifas = {
          estancia4Horas: Number(primeraHab.precio_4_horas) || 450,
          estancia6Horas: Number(primeraHab.precio_6_horas) || 600,
          estancia12Horas: Number(primeraHab.precio_12_horas) || 850,
          nocheCompleta: Number(primeraHab.precio_noche_completa) || 1200,
        };

        const tipoPropiedad: 'Hotel' | 'Motel & Villas' | 'Boutique Suites' = 
          h.tipo_propiedad === 'Villa Turística' ? 'Motel & Villas' :
          h.tipo_propiedad === 'Suites Ejecutivas' ? 'Boutique Suites' : 'Hotel';

        return {
          id: h.id,
          nombre: h.nombre,
          ciudad: h.ciudad || 'México',
          zona: h.zona || 'Centro',
          direccion: h.direccion || '',
          telefono: h.telefono || '',
          correo: h.correo || '',
          nombreContacto: h.nombre_contacto || '',
          descripcion: h.descripcion || '',
          renderFachada: fachada,
          renderHabitaciones: galeria,
          web: `https://blueoceanhotels.com/h/${h.slug || h.id}`,
          estrellas: h.estrellas || 4,
          puntuacion: Number(h.puntuacion) || 4.8,
          totalResenas: h.total_resenas || 12,
          servicios: h.servicios || ['Wifi', 'A/C', 'Recepción 24h'],
          tipoPropiedad,
          tarifas,
          disponibilidad: {
            habitacionesDisponibles: habs.length || 3,
            tiposDisponibles: habs.map((hab: any) => hab.nombre_categoria) || ['Habitación Estándar'],
            horariosInmediatos: ['Entrada Inmediata', '14:00 hrs', '16:00 hrs', '18:00 hrs', '20:00 hrs']
          }
        };
      });

      return {
        source: 'supabase_live_database',
        hotels: formattedHotels,
        count: formattedHotels.length
      };
    } catch {
      // Si la conexión a Supabase tiene timeout o la red no responde, retornamos catálogo de respaldo sin emitir error fatal
      return {
        source: 'local_catalogue_demo',
        hotels: DEFAULT_DEMO_HOTELS,
        count: DEFAULT_DEMO_HOTELS.length
      };
    }
  }

  public async createReserva(reservaData: any): Promise<{ success: boolean; data?: any; error?: string }> {
    const client = this.getClient();
    if (!client) {
      return { success: false, error: 'Supabase no configurado en entorno' };
    }

    try {
      const payload = {
        codigo_reserva: reservaData.codigoReserva || `BO-${Date.now().toString().slice(-6)}`,
        hotel_id: reservaData.hotelId || null,
        habitacion_id: reservaData.habitacionId || null,
        cliente_nombre: reservaData.nombreCliente || reservaData.cliente_nombre,
        cliente_email: reservaData.emailCliente || reservaData.cliente_email,
        cliente_telefono: reservaData.telefonoCliente || reservaData.cliente_telefono,
        modalidad_estancia: reservaData.modalidadEstancia || '4_horas',
        fecha_llegada: reservaData.fechaLlegada || new Date().toISOString().split('T')[0],
        hora_llegada: reservaData.horaLlegada || '14:00',
        huespedes: reservaData.huespedes || 2,
        monto_total: reservaData.desgloseFinanciero?.tarifaTotal || reservaData.precioTotal || 0,
        comision_blueocean_15: reservaData.desgloseFinanciero?.comisionOceanBlue15 || 0,
        neto_hotel_85: reservaData.desgloseFinanciero?.netoHotel85 || 0,
        metodo_pago: reservaData.metodoPago || 'PAGO_EN_RECEPCION',
        estado: 'CONFIRMADA',
        notas_especiales: reservaData.notasEspeciales || null
      };

      const { data, error } = await client
        .from('reservas')
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.error('[Supabase] Error al guardar reserva:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }
}

export const supabaseService = new SupabaseService();
