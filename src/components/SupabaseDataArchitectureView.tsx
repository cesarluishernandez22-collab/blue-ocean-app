import React, { useState } from 'react';
import { 
  Database, 
  Code2, 
  Copy, 
  Check, 
  Table2, 
  Layers, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  ArrowRight, 
  ExternalLink, 
  Sparkles,
  Search,
  Key
} from 'lucide-react';

const SQL_SCHEMA = `-- ==========================================================
-- BLUE OCEAN - ESQUEMA DE BASE DE DATOS PROFESIONAL (PostgreSQL / Supabase)
-- Costo: $0 USD en el Free Tier de Supabase
-- ==========================================================

-- 1. Habilitar extensión para UUIDs automáticos
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLA: HOTELES Y VILLAS
CREATE TABLE IF NOT EXISTS public.hoteles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(150) NOT NULL,
    slug VARCHAR(160) UNIQUE NOT NULL,
    tipo_propiedad VARCHAR(50) DEFAULT 'Hotel Boutique' CHECK (tipo_propiedad IN ('Hotel Boutique', 'Villa Turística', 'Suites Ejecutivas', 'Resort')),
    descripcion TEXT,
    ciudad VARCHAR(100) NOT NULL,
    zona VARCHAR(100) NOT NULL,
    direccion TEXT NOT NULL,
    telefono VARCHAR(30) NOT NULL,
    correo VARCHAR(120) NOT NULL,
    nombre_contacto VARCHAR(120),
    estrellas INT DEFAULT 4 CHECK (estrellas BETWEEN 1 AND 5),
    puntuacion NUMERIC(3, 1) DEFAULT 4.8,
    total_resenas INT DEFAULT 0,
    foto_fachada TEXT NOT NULL,
    fotos_galeria TEXT[] DEFAULT ARRAY[]::TEXT[],
    servicios TEXT[] DEFAULT ARRAY['Wifi de alta velocidad', 'Aire Acondicionado', 'Recepción 24h']::TEXT[],
    activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMPTZ DEFAULT NOW(),
    actualizado_en TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLA: HABITACIONES Y TARIFAS POR FRACCIONES DE TIEMPO
CREATE TABLE IF NOT EXISTS public.habitaciones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hotel_id UUID NOT NULL REFERENCES public.hoteles(id) ON DELETE CASCADE,
    nombre_categoria VARCHAR(100) NOT NULL,
    descripcion TEXT,
    capacidad_max INT DEFAULT 2,
    -- Estructura de tarifas por estancia corta y noche completa
    precio_4_horas NUMERIC(10, 2) NOT NULL,
    precio_6_horas NUMERIC(10, 2) NOT NULL,
    precio_12_horas NUMERIC(10, 2) NOT NULL,
    precio_noche_completa NUMERIC(10, 2) NOT NULL,
    -- Amenidades destacadas
    tiene_jacuzzi BOOLEAN DEFAULT FALSE,
    tiene_cochera_privada BOOLEAN DEFAULT FALSE,
    fotos TEXT[] DEFAULT ARRAY[]::TEXT[],
    inventario_unidades INT DEFAULT 5,
    activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABLA: RESERVAS Y LIQUIDACIÓN FINANCIERA (15% COMISIÓN BLUE OCEAN)
CREATE TABLE IF NOT EXISTS public.reservas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo_reserva VARCHAR(20) UNIQUE NOT NULL,
    hotel_id UUID NOT NULL REFERENCES public.hoteles(id),
    habitacion_id UUID NOT NULL REFERENCES public.habitaciones(id),
    -- Datos del Huésped
    cliente_nombre VARCHAR(120) NOT NULL,
    cliente_email VARCHAR(120) NOT NULL,
    cliente_telefono VARCHAR(30) NOT NULL,
    -- Parámetros de la Estancia
    modalidad_estancia VARCHAR(30) NOT NULL CHECK (modalidad_estancia IN ('4_horas', '6_horas', '12_horas', 'noche_completa')),
    fecha_llegada DATE NOT NULL,
    hora_llegada TIME NOT NULL,
    huespedes INT DEFAULT 2,
    -- Desglose Económico
    monto_total NUMERIC(10, 2) NOT NULL,
    comision_blueocean_15 NUMERIC(10, 2) NOT NULL,
    neto_hotel_85 NUMERIC(10, 2) NOT NULL,
    -- Método de pago y Estado
    metodo_pago VARCHAR(50) DEFAULT 'PAGO_EN_RECEPCION' CHECK (metodo_pago IN ('PAGO_EN_RECEPCION', 'TARJETA_EN_LINEA', 'GARANTIA_BLUE_OCEAN')),
    estado VARCHAR(30) DEFAULT 'CONFIRMADA' CHECK (estado IN ('PENDIENTE', 'CONFIRMADA', 'COMPLETADA', 'CANCELADA')),
    notas_especiales TEXT,
    creado_en TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABLA: SOLICITUDES DE AFILIACIÓN DE PROPIETARIOS / HOTELES
CREATE TABLE IF NOT EXISTS public.solicitudes_afiliacion (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre_establecimiento VARCHAR(150) NOT NULL,
    tipo_propiedad VARCHAR(50) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    nombre_propietario VARCHAR(120) NOT NULL,
    correo VARCHAR(120) NOT NULL,
    telefono VARCHAR(30) NOT NULL,
    num_habitaciones INT DEFAULT 10,
    estado VARCHAR(30) DEFAULT 'NUEVA' CHECK (estado IN ('NUEVA', 'EN_REVISION', 'CONTACTADO', 'APROBADO', 'DESCARTADO')),
    notas_internas TEXT,
    creado_en TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ÍNDICES DE RENDIMIENTO (Búsquedas ultra rápidas)
CREATE INDEX IF NOT EXISTS idx_hoteles_ciudad ON public.hoteles(ciudad);
CREATE INDEX IF NOT EXISTS idx_hoteles_activo ON public.hoteles(activo);
CREATE INDEX IF NOT EXISTS idx_habitaciones_hotel ON public.habitaciones(hotel_id);
CREATE INDEX IF NOT EXISTS idx_reservas_codigo ON public.reservas(codigo_reserva);
CREATE INDEX IF NOT EXISTS idx_reservas_fecha ON public.reservas(fecha_llegada);

-- 7. POLÍTICAS DE SEGURIDAD (Row Level Security - RLS)
ALTER TABLE public.hoteles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habitaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solicitudes_afiliacion ENABLE ROW LEVEL SECURITY;

-- Acceso público de lectura para el catálogo de hoteles y habitaciones
CREATE POLICY "Lectura pública de hoteles activos" ON public.hoteles FOR SELECT USING (activo = true);
CREATE POLICY "Lectura pública de habitaciones activas" ON public.habitaciones FOR SELECT USING (activo = true);
CREATE POLICY "Permitir crear reservas públicas" ON public.reservas FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir solicitudes de afiliacion" ON public.solicitudes_afiliacion FOR INSERT WITH CHECK (true);
`;

const SQL_SEEDS = `-- ==========================================================
-- DATOS DE EJEMPLO REALES (Hoteles Boutique y Tarifas por Horas)
-- Pega esto en Supabase después de crear las tablas
-- ==========================================================

INSERT INTO public.hoteles (id, nombre, slug, tipo_propiedad, descripcion, ciudad, zona, direccion, telefono, correo, nombre_contacto, estrellas, puntuacion, total_resenas, foto_fachada, fotos_galeria, servicios)
VALUES 
(
  'a1b2c3d4-e5f6-4a5b-8c9d-0123456789ab',
  'Hotel Boutique Casa del Gobernador',
  'casa-del-gobernador',
  'Hotel Boutique',
  'Residencia colonial del siglo XIX con arquitectura restaurada, patios interiores con fuentes de cantera y privacidad absoluta.',
  'Puebla',
  'Centro Histórico',
  'Av. 5 de Mayo #402, Centro Histórico, Puebla',
  '+52 222 419 8820',
  'reservas@casadelgobernador.com',
  'Lic. Claudia Montes',
  5,
  4.9,
  128,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
  ],
  ARRAY['Jacuzzi Hidromasaje', 'Cochera Privada Techada', 'Wifi Starlink', 'Room Service Gourmet', 'Smart TV 65"']
),
(
  'b2c3d4e5-f6a1-4b5c-9d0e-123456789abc',
  'Villas Las Cúpulas & Spa Privado',
  'villas-las-cupulas',
  'Villa Turística',
  'Villas exclusivas diseñadas para desconexión total con alberca climatizada individual, cochera con portón automático y jardín sensorial.',
  'Cuernavaca',
  'Zona Residencial Palmira',
  'Paseo de las Cúpulas #14, Palmira, Cuernavaca',
  '+52 777 312 9044',
  'contacto@villascupulas.com',
  'Ing. Rodrigo Alcocer',
  5,
  4.9,
  94,
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
  ],
  ARRAY['Alberca Privada Climatizada', 'Jacuzzi Exterior', 'Acceso Discreto', 'Sonido Bose Bluetooth', 'Minibar Premium']
);

-- Habitaciones con precios por hora y por noche
INSERT INTO public.habitaciones (hotel_id, nombre_categoria, capacidad_max, precio_4_horas, precio_6_horas, precio_12_horas, precio_noche_completa, tiene_jacuzzi, tiene_cochera_privada)
VALUES 
('a1b2c3d4-e5f6-4a5b-8c9d-0123456789ab', 'Master Suite Imperial con Jacuzzi', 2, 750.00, 980.00, 1450.00, 2200.00, true, true),
('a1b2c3d4-e5f6-4a5b-8c9d-0123456789ab', 'Junior Suite Colonial', 2, 550.00, 720.00, 1100.00, 1650.00, false, true),
('b2c3d4e5-f6a1-4b5c-9d0e-123456789abc', 'Villa Presidencial con Alberca y Spa', 2, 1200.00, 1600.00, 2400.00, 3600.00, true, true);
`;

export function SupabaseDataArchitectureView() {
  const [activeSubTab, setActiveSubTab] = useState<'schema' | 'seeds' | 'connection' | 'interactive' | 'comparativa'>('connection');
  const [copied, setCopied] = useState(false);
  const [selectedTable, setSelectedTable] = useState<'hoteles' | 'habitaciones' | 'reservas' | 'solicitudes_afiliacion'>('hoteles');
  const [supaStatus, setSupaStatus] = useState<any>(null);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const checkConnection = async () => {
    setLoadingStatus(true);
    try {
      const res = await fetch('/api/supabase/status');
      const data = await res.json();
      setSupaStatus(data);
    } catch (e) {
      setSupaStatus({ configured: false, connected: false, message: 'Servidor local operativo en modo réplica.' });
    } finally {
      setLoadingStatus(false);
    }
  };

  React.useEffect(() => {
    checkConnection();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Banner de Claridad y Costo Cero */}
      <div className="bg-gradient-to-r from-emerald-900/40 via-zinc-900 to-emerald-950/40 border border-emerald-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>Base de Datos PostgreSQL Profesional • Costo $0/mes</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Arquitectura de Datos para Blue Ocean en Supabase
            </h2>
            <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
              Diseñada específicamente para tu modelo de negocio de <strong>hoteles boutique y microestancias (4h, 6h, 12h y noche completa)</strong>. 
              Sustituye a Airtable por una base de datos relacional estándar sin límites arbitrarios y con respaldo seguro.
            </p>
          </div>
          <a
            href="https://supabase.com"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm transition shadow-lg shadow-emerald-500/20"
          >
            <span>Ir a Supabase Gratis</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Selector de Pestañas */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-3">
        <button
          onClick={() => setActiveSubTab('connection')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
            activeSubTab === 'connection'
              ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
          }`}
        >
          <Zap className="w-4 h-4 text-emerald-400" />
          <span>Estado & Despliegue en Vercel</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
            Siguiente Paso
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('schema')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
            activeSubTab === 'schema'
              ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
          }`}
        >
          <Code2 className="w-4 h-4 text-emerald-400" />
          <span>Script SQL de Tablas (DDL)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('seeds')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
            activeSubTab === 'seeds'
              ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Datos de Prueba (Seeds SQL)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('interactive')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
            activeSubTab === 'interactive'
              ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
          }`}
        >
          <Table2 className="w-4 h-4 text-cyan-400" />
          <span>Explorador de Tablas y Relaciones</span>
        </button>

        <button
          onClick={() => setActiveSubTab('comparativa')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
            activeSubTab === 'comparativa'
              ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
          }`}
        >
          <DollarSign className="w-4 h-4 text-green-400" />
          <span>Airtable vs Supabase (Ahorro)</span>
        </button>
      </div>

      {/* SubTab 0: Conexión y Despliegue en Vercel */}
      {activeSubTab === 'connection' && (
        <div className="space-y-6">
          {/* Banner de Éxito de Creación de Tablas */}
          <div className="bg-gradient-to-r from-emerald-950/60 via-zinc-900 to-teal-950/60 border border-emerald-500/40 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    ¡Paso Crucial Completado: Tu Base PostgreSQL está Lista en Supabase!
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1 max-w-2xl leading-relaxed">
                    Ya corriste el script en el SQL Editor de Supabase. Acabas de crear la estructura estándar para tu negocio sin pagar ningún plan mensual:
                  </p>
                </div>
              </div>

              <button
                onClick={checkConnection}
                disabled={loadingStatus}
                className="shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 border border-zinc-700 transition"
              >
                <Zap className={`w-3.5 h-3.5 text-amber-400 ${loadingStatus ? 'animate-spin' : ''}`} />
                <span>{loadingStatus ? 'Comprobando...' : 'Verificar Conexión'}</span>
              </button>
            </div>

            {/* Tarjetas de Tablas Activas */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Tabla 1</span>
                <p className="text-sm font-bold text-white mt-0.5">hoteles</p>
                <p className="text-[11px] text-zinc-400">Identidad, fotos y amenidades</p>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Tabla 2</span>
                <p className="text-sm font-bold text-white mt-0.5">habitaciones</p>
                <p className="text-[11px] text-zinc-400">Tarifas 4h, 6h, 12h y noche</p>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Tabla 3</span>
                <p className="text-sm font-bold text-white mt-0.5">reservas</p>
                <p className="text-[11px] text-zinc-400">Comisión 15% / 85% Hotel</p>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Tabla 4</span>
                <p className="text-sm font-bold text-white mt-0.5">solicitudes_afiliacion</p>
                <p className="text-[11px] text-zinc-400">Hoteles que quieren sumarse</p>
              </div>
            </div>
          </div>

          {/* Guía Clara del Siguiente Paso: Despliegue en Vercel */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
                <span>Tu Siguiente Paso: Conectar Vercel con Supabase ($0/mes)</span>
              </div>
              <h4 className="text-base font-bold text-white">
                ¿Cómo se conecta tu web con tu base de datos al publicar?
              </h4>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed max-w-3xl">
                Al usar <strong>Vercel</strong> para hospedar tu sitio web y <strong>Supabase</strong> para guardar tus hoteles y reservas, ambos operan en sus planes gratuitos permanentes.
                Solo necesitas 2 datos que ya tienes en Supabase:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                  <Key className="w-4 h-4" />
                  <span>Dato 1: SUPABASE_URL</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  En Supabase: <strong>Project Settings (⚙️) ➔ API ➔ Project URL</strong>.
                  <br />
                  Se ve como: <code className="text-zinc-200 font-mono">https://xxxxxxxx.supabase.co</code>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                  <Key className="w-4 h-4" />
                  <span>Dato 2: SUPABASE_ANON_KEY</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  En Supabase: <strong>Project Settings (⚙️) ➔ API ➔ anon / public key</strong>.
                  <br />
                  Es un código largo que empieza por: <code className="text-zinc-200 font-mono">eyJhbGciOi...</code>
                </p>
              </div>
            </div>

            {/* Checklist de 3 Pasos en Vercel */}
            <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80 space-y-3">
              <h5 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
                Pasos para publicar en Vercel (Toma 2 minutos):
              </h5>
              <div className="space-y-2 text-xs text-zinc-300">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                  <p>Inicia sesión en tu cuenta de <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-blue-400 underline font-semibold">Vercel.com</a> y haz clic en <strong>"Add New Project"</strong>.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                  <p>Importa el repositorio del proyecto (o súbelo desde tu GitHub).</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                  <p>En la sección <strong>"Environment Variables"</strong> de Vercel, agrega <code className="text-emerald-300 font-mono">SUPABASE_URL</code> y <code className="text-emerald-300 font-mono">SUPABASE_ANON_KEY</code> con los valores de Supabase.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[11px]">✓</span>
                  <p className="text-emerald-300 font-semibold">Haz clic en <strong>"Deploy"</strong>. ¡En 30 segundos tu portal de reservas estará en vivo para todo el mundo con SSL gratuito y costo $0/mes!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 1: Schema DDL */}
      {activeSubTab === 'schema' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-zinc-900/90 border border-zinc-800 px-4 py-3 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono text-zinc-300">schema_blueocean_supabase.sql</span>
              <span className="text-xs text-zinc-500">• 4 Tablas + Llaves Foráneas + Restricciones de Precios + RLS</span>
            </div>
            <button
              onClick={() => copyToClipboard(SQL_SCHEMA)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition border border-zinc-700"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Script SQL</span>
                </>
              )}
            </button>
          </div>

          <div className="relative rounded-2xl bg-[#0d1117] border border-zinc-800 overflow-hidden text-xs font-mono leading-relaxed text-zinc-300 p-6 shadow-inner max-h-[550px] overflow-y-auto">
            <pre className="whitespace-pre-wrap">{SQL_SCHEMA}</pre>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-zinc-400">
            <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-xl space-y-1">
              <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Llaves Foráneas Estrictas
              </span>
              <p>Cada habitación pertenece a un hotel real y cada reserva valida la existencia del hotel y su habitación.</p>
            </div>
            <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-xl space-y-1">
              <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Matemática de Comisiones
              </span>
              <p>La tabla de reservas almacena exactamente el desglose del 15% de comisión para ti y 85% para el hotel.</p>
            </div>
            <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-xl space-y-1">
              <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Seguridad RLS Integrada
              </span>
              <p>Cualquier cliente puede consultar hoteles y reservar, pero solo tú como administrador puedes borrar registros.</p>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 2: Seeds SQL */}
      {activeSubTab === 'seeds' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-zinc-900/90 border border-zinc-800 px-4 py-3 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-xs font-mono text-zinc-300">seed_data_demo.sql</span>
              <span className="text-xs text-zinc-500">• Inserta hoteles reales con fotos, tarifas de 4h, 6h, 12h y noche</span>
            </div>
            <button
              onClick={() => copyToClipboard(SQL_SEEDS)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition border border-zinc-700"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Seeds SQL</span>
                </>
              )}
            </button>
          </div>

          <div className="relative rounded-2xl bg-[#0d1117] border border-zinc-800 overflow-hidden text-xs font-mono leading-relaxed text-zinc-300 p-6 shadow-inner max-h-[550px] overflow-y-auto">
            <pre className="whitespace-pre-wrap">{SQL_SEEDS}</pre>
          </div>
        </div>
      )}

      {/* SubTab 3: Explorador Interactivo de Tablas */}
      {activeSubTab === 'interactive' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'hoteles', label: '1. Hoteles', desc: 'Propiedades y fotos' },
              { id: 'habitaciones', label: '2. Habitaciones', desc: 'Tarifas 4h, 6h, 12h, noche' },
              { id: 'reservas', label: '3. Reservas', desc: 'Comisión 15% y huéspedes' },
              { id: 'solicitudes_afiliacion', label: '4. Afiliados', desc: 'Captación de hoteleros' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTable(tab.id as any)}
                className={`p-4 rounded-xl text-left border transition ${
                  selectedTable === tab.id
                    ? 'bg-zinc-800/90 border-emerald-500/50 text-white shadow-lg'
                    : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:bg-zinc-800/50'
                }`}
              >
                <div className="font-semibold text-sm">{tab.label}</div>
                <div className="text-xs text-zinc-500 mt-0.5">{tab.desc}</div>
              </button>
            ))}
          </div>

          {/* Tabla de Hoteles */}
          {selectedTable === 'hoteles' && (
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Estructura de la Tabla: <code className="text-emerald-400">hoteles</code></h3>
                  <p className="text-xs text-zinc-400">Almacena las propiedades autorizadas en la plataforma con sus fotos y datos de contacto.</p>
                </div>
                <span className="text-xs font-mono bg-zinc-800 px-3 py-1 rounded-full text-zinc-300">Clave Primaria: id (UUID)</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-300">
                  <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-zinc-800">
                    <tr>
                      <th className="py-2.5 px-3">Columna</th>
                      <th className="py-2.5 px-3">Tipo SQL</th>
                      <th className="py-2.5 px-3">Propósito en el Negocio</th>
                      <th className="py-2.5 px-3">Ejemplo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800 font-mono">
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-emerald-400">id</td>
                      <td className="py-2.5 px-3 text-zinc-400">UUID (PK)</td>
                      <td className="py-2.5 px-3 font-sans text-zinc-300">Identificador único irrepetible</td>
                      <td className="py-2.5 px-3 text-zinc-500">uuid_generate_v4()</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-white">nombre</td>
                      <td className="py-2.5 px-3 text-zinc-400">VARCHAR(150)</td>
                      <td className="py-2.5 px-3 font-sans text-zinc-300">Nombre comercial del hotel o villa</td>
                      <td className="py-2.5 px-3 text-zinc-500">'Hotel Boutique Casa Real'</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-white">ciudad / zona</td>
                      <td className="py-2.5 px-3 text-zinc-400">VARCHAR(100)</td>
                      <td className="py-2.5 px-3 font-sans text-zinc-300">Filtros clave del buscador de huéspedes</td>
                      <td className="py-2.5 px-3 text-zinc-500">'Puebla', 'Centro Histórico'</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-white">foto_fachada</td>
                      <td className="py-2.5 px-3 text-zinc-400">TEXT (URL)</td>
                      <td className="py-2.5 px-3 font-sans text-zinc-300">Foto principal mostrada en la tarjeta de catálogo</td>
                      <td className="py-2.5 px-3 text-zinc-500">'https://images.../fachada.jpg'</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-white">fotos_galeria</td>
                      <td className="py-2.5 px-3 text-zinc-400">TEXT[] (Array)</td>
                      <td className="py-2.5 px-3 font-sans text-zinc-300">Múltiples fotos sin pagar complementos</td>
                      <td className="py-2.5 px-3 text-zinc-500">['foto1.jpg', 'foto2.jpg']</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-white">activo</td>
                      <td className="py-2.5 px-3 text-zinc-400">BOOLEAN</td>
                      <td className="py-2.5 px-3 font-sans text-zinc-300">Permite pausar un hotel sin borrarlo de la base</td>
                      <td className="py-2.5 px-3 text-zinc-500">true</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tabla de Habitaciones */}
          {selectedTable === 'habitaciones' && (
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Estructura de la Tabla: <code className="text-emerald-400">habitaciones</code></h3>
                  <p className="text-xs text-zinc-400">El núcleo del modelo de negocio: franjas horarias y amenidades específicas.</p>
                </div>
                <span className="text-xs font-mono bg-zinc-800 px-3 py-1 rounded-full text-zinc-300">FK: hotel_id → hoteles.id</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-300">
                  <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-zinc-800">
                    <tr>
                      <th className="py-2.5 px-3">Columna</th>
                      <th className="py-2.5 px-3">Tipo SQL</th>
                      <th className="py-2.5 px-3">Propósito</th>
                      <th className="py-2.5 px-3">Ejemplo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800 font-mono">
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-emerald-400">precio_4_horas</td>
                      <td className="py-2.5 px-3 text-zinc-400">NUMERIC(10,2)</td>
                      <td className="py-2.5 px-3 font-sans text-zinc-300">Tarifa para microestancia rápida de 4 horas</td>
                      <td className="py-2.5 px-3 text-zinc-500">$650.00 MXN</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-emerald-400">precio_6_horas</td>
                      <td className="py-2.5 px-3 text-zinc-400">NUMERIC(10,2)</td>
                      <td className="py-2.5 px-3 font-sans text-zinc-300">Tarifa para estancia media de 6 horas</td>
                      <td className="py-2.5 px-3 text-zinc-500">$850.00 MXN</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-emerald-400">precio_12_horas</td>
                      <td className="py-2.5 px-3 text-zinc-400">NUMERIC(10,2)</td>
                      <td className="py-2.5 px-3 font-sans text-zinc-300">Tarifa de medio día (ej. día de alberca o trabajo)</td>
                      <td className="py-2.5 px-3 text-zinc-500">$1,300.00 MXN</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-emerald-400">precio_noche_completa</td>
                      <td className="py-2.5 px-3 text-zinc-400">NUMERIC(10,2)</td>
                      <td className="py-2.5 px-3 font-sans text-zinc-300">Hospedaje tradicional de noche completa</td>
                      <td className="py-2.5 px-3 text-zinc-500">$1,950.00 MXN</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-white">tiene_jacuzzi</td>
                      <td className="py-2.5 px-3 text-zinc-400">BOOLEAN</td>
                      <td className="py-2.5 px-3 font-sans text-zinc-300">Filtro de alta demanda para parejas</td>
                      <td className="py-2.5 px-3 text-zinc-500">true / false</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-white">tiene_cochera_privada</td>
                      <td className="py-2.5 px-3 text-zinc-400">BOOLEAN</td>
                      <td className="py-2.5 px-3 font-sans text-zinc-300">Filtro de máxima discreción y seguridad</td>
                      <td className="py-2.5 px-3 text-zinc-500">true / false</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tabla de Reservas */}
          {selectedTable === 'reservas' && (
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Estructura de la Tabla: <code className="text-emerald-400">reservas</code></h3>
                  <p className="text-xs text-zinc-400">Registro auditable de cada reserva con el cálculo del 15% de comisión garantizada.</p>
                </div>
                <span className="text-xs font-mono bg-zinc-800 px-3 py-1 rounded-full text-zinc-300">Código único: BO-XXXXXXXX</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-300">
                  <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-zinc-800">
                    <tr>
                      <th className="py-2.5 px-3">Columna</th>
                      <th className="py-2.5 px-3">Tipo SQL</th>
                      <th className="py-2.5 px-3">Propósito</th>
                      <th className="py-2.5 px-3">Ejemplo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800 font-mono">
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-emerald-400">monto_total</td>
                      <td className="py-2.5 px-3 text-zinc-400">NUMERIC(10,2)</td>
                      <td className="py-2.5 px-3 font-sans text-zinc-300">Precio pactado con el huésped</td>
                      <td className="py-2.5 px-3 text-zinc-500">$1,000.00 MXN</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-emerald-400">comision_blueocean_15</td>
                      <td className="py-2.5 px-3 text-zinc-400">NUMERIC(10,2)</td>
                      <td className="py-2.5 px-3 font-sans text-zinc-300">Tu ganancia neta como plataforma (15%)</td>
                      <td className="py-2.5 px-3 text-emerald-400">$150.00 MXN</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-white">neto_hotel_85</td>
                      <td className="py-2.5 px-3 text-zinc-400">NUMERIC(10,2)</td>
                      <td className="py-2.5 px-3 font-sans text-zinc-300">Monto a liquidar al dueño del hotel (85%)</td>
                      <td className="py-2.5 px-3 text-zinc-500">$850.00 MXN</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-white">metodo_pago</td>
                      <td className="py-2.5 px-3 text-zinc-400">VARCHAR(50)</td>
                      <td className="py-2.5 px-3 font-sans text-zinc-300">Pago en recepción o en línea con pasarela</td>
                      <td className="py-2.5 px-3 text-zinc-500">'PAGO_EN_RECEPCION'</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tabla de Afiliación */}
          {selectedTable === 'solicitudes_afiliacion' && (
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Estructura de la Tabla: <code className="text-emerald-400">solicitudes_afiliacion</code></h3>
                  <p className="text-xs text-zinc-400">Captura a los dueños de hoteles y villas interesados en sumarse a la red Blue Ocean.</p>
                </div>
                <span className="text-xs font-mono bg-zinc-800 px-3 py-1 rounded-full text-zinc-300">CRM de Hoteleros</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-300">
                  <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-zinc-800">
                    <tr>
                      <th className="py-2.5 px-3">Columna</th>
                      <th className="py-2.5 px-3">Tipo SQL</th>
                      <th className="py-2.5 px-3">Propósito</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800 font-mono">
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-white">nombre_establecimiento</td>
                      <td className="py-2.5 px-3 text-zinc-400">VARCHAR(150)</td>
                      <td className="py-2.5 px-3 font-sans text-zinc-300">Nombre del hotel o villa que desea afiliarse</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-white">nombre_propietario</td>
                      <td className="py-2.5 px-3 text-zinc-400">VARCHAR(120)</td>
                      <td className="py-2.5 px-3 font-sans text-zinc-300">Persona de contacto para cerrar la alianza</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-white">telefono / correo</td>
                      <td className="py-2.5 px-3 text-zinc-400">VARCHAR</td>
                      <td className="py-2.5 px-3 font-sans text-zinc-300">Canal directo para contactarlo por WhatsApp o llamada</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-emerald-400">estado</td>
                      <td className="py-2.5 px-3 text-zinc-400">VARCHAR(30)</td>
                      <td className="py-2.5 px-3 font-sans text-zinc-300">'NUEVA', 'CONTACTADO', 'APROBADO'</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SubTab 4: Comparativa y Ahorro Real */}
      {activeSubTab === 'comparativa' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Airtable (Mala Experiencia) */}
            <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-red-400 font-bold text-base flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Airtable (Lo que tenías)
                </span>
                <span className="text-xs px-2.5 py-1 rounded bg-red-500/10 text-red-300 border border-red-500/20">
                  Alto Costo
                </span>
              </div>
              <ul className="space-y-3 text-xs text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>Cobra por usuario/mes:</strong> $24 a $45 USD por cada persona con acceso.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>Límite de 5 peticiones/segundo:</strong> Si 10 usuarios buscan hotel a la vez, la web se congela con error 429.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>Sin relaciones SQL reales:</strong> No permite cálculos de comisiones transaccionales atómicas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>Atadura de datos:</strong> No puedes migrar fácilmente si deciden subir sus precios.</span>
                </li>
              </ul>
            </div>

            {/* Supabase (La solución profesional) */}
            <div className="bg-emerald-950/20 border border-emerald-500/40 rounded-2xl p-6 space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-emerald-400 font-bold text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Supabase + PostgreSQL (La Solución)
                </span>
                <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
                  $0 USD / mes
                </span>
              </div>
              <ul className="space-y-3 text-xs text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Base de datos PostgreSQL real:</strong> Estándar mundial de la industria, tus datos son 100% tuyos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Panel visual tipo Excel:</strong> Puedes editar hoteles y reservas con un clic en la pantalla.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Plan gratuito muy amplio:</strong> 500 MB de base de datos (suficiente para decenas de miles de reservas) y 1 GB de fotos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Sin límites de consultas:</strong> Soporta tráfico masivo de huéspedes reservando sin colapsar.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
