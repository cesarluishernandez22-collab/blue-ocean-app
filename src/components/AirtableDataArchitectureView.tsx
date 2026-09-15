import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Table, 
  Layers, 
  ShieldCheck, 
  Key, 
  RefreshCw, 
  CheckCircle2, 
  ExternalLink, 
  Plus, 
  Eye, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  User, 
  Clock, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { 
  AirtableContactoRecord, 
  AirtableInventarioPropiedadesRecord, 
  BlueOceanHotel 
} from '../types/airtable';
import { airtableClient, AirtableConfigStatus } from '../services/airtableClient';

export function AirtableDataArchitectureView() {
  const [activeSubTab, setActiveSubTab] = useState<'inventario' | 'contacto' | 'unificado' | 'configuracion'>('inventario');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [configStatus, setConfigStatus] = useState<AirtableConfigStatus | null>(null);
  const [inventarioRecords, setInventarioRecords] = useState<AirtableInventarioPropiedadesRecord[]>([]);
  const [contactoRecords, setContactoRecords] = useState<AirtableContactoRecord[]>([]);
  const [unifiedHotels, setUnifiedHotels] = useState<BlueOceanHotel[]>([]);
  const [selectedRecordJson, setSelectedRecordJson] = useState<any | null>(null);

  // Form for testing new contact record insertion
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [newHotelName, setNewHotelName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newContactPerson, setNewContactPerson] = useState('');
  const [newWebsite, setNewWebsite] = useState('');
  const [newSocials, setNewSocials] = useState('');
  const [nextFollowUp, setNextFollowUp] = useState('2026-04-15');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<string | null>(null);

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const [status, inv, con, uni] = await Promise.all([
        airtableClient.getConfigStatus(),
        airtableClient.getInventarioRecords(),
        airtableClient.getContactoRecords(),
        airtableClient.getUnifiedHotels()
      ]);

      setConfigStatus(status);
      setInventarioRecords(inv.records || []);
      setContactoRecords(con.records || []);
      setUnifiedHotels(uni.hotels || []);
    } catch (err) {
      console.error('Error fetching Airtable architecture data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHotelName.trim() || !newEmail.trim()) return;

    setIsSubmitting(true);
    setSubmitFeedback(null);

    try {
      const result = await airtableClient.createContactoRecord({
        'Nombre del Hotel': newHotelName,
        'Correo': newEmail,
        'Teléfono': newPhone || '+52 55 0000 0000',
        'Dirección': newAddress || 'Ciudad de México',
        'Contacto': newContactPerson || 'Gerencia General',
        'Web': newWebsite || 'https://oceanrevenue-management.com',
        'Redes Sociales': newSocials || 'https://instagram.com/blueocean_hotel',
        'Fecha': new Date().toISOString().split('T')[0],
        'Próximo seguimiento': nextFollowUp
      });

      if (result.success) {
        setSubmitFeedback('¡Registro agregado exitosamente a la tabla "Contacto"!');
        setNewHotelName('');
        setNewEmail('');
        setNewPhone('');
        setNewAddress('');
        setNewContactPerson('');
        setNewWebsite('');
        setNewSocials('');
        setShowAddContactModal(false);
        await fetchData();
      } else {
        setSubmitFeedback(`Error al agregar: ${result.error}`);
      }
    } catch (err: any) {
      setSubmitFeedback(`Error inesperado: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner - Identity & Architecture Status */}
      <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 text-zinc-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-[#c05c80]/20 text-[#e07a9e] border border-[#c05c80]/30">
                FASE 1 • BLOQUE 1
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#38a3a5]/20 text-[#4ba3a3] border border-[#38a3a5]/30">
                ESTRUCTURA DE DATOS AIRTABLE
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono text-[#d4af37] border border-[#d4af37]/40 bg-[#d4af37]/10">
                LCM ARCHITECTURE
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-2">
              Base de Datos "Hoteles" & Mapeo de Tablas
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-3xl">
              Arquitectura de datos para el motor de reservas Blue Ocean. Operando exclusivamente sobre las dos tablas autorizadas: 
              <strong className="text-zinc-200 font-mono"> "Inventario de propiedades"</strong> y 
              <strong className="text-zinc-200 font-mono"> "Contacto"</strong>, sin dependencias de servicios de pago y bajo el principio de cero suposiciones.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition"
              title="Recargar datos de Airtable"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#38a3a5] ${refreshing ? 'animate-spin' : ''}`} />
              Sincronizar
            </button>
            <div className="text-right pl-3 border-l border-zinc-800">
              <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-mono">Estado API</div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {configStatus?.mode === 'LIVE_AIRTABLE_API' ? 'Airtable Live API' : 'Modo Espejo Activo'}
              </div>
            </div>
          </div>
        </div>

        {/* Status Indicators Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-zinc-800/80">
          <div className="bg-[#121214] p-3 rounded-lg border border-zinc-800/80">
            <span className="text-[11px] text-zinc-500 block">Base de Airtable</span>
            <span className="text-sm font-semibold text-white font-mono flex items-center gap-1.5 mt-0.5">
              <Database className="w-3.5 h-3.5 text-[#e07a9e]" /> Hoteles
            </span>
          </div>
          <div className="bg-[#121214] p-3 rounded-lg border border-zinc-800/80">
            <span className="text-[11px] text-zinc-500 block">Tabla 1: Inventario</span>
            <span className="text-sm font-semibold text-zinc-200 font-mono flex items-center gap-1.5 mt-0.5">
              <Table className="w-3.5 h-3.5 text-[#38a3a5]" /> {inventarioRecords.length} Propiedades
            </span>
          </div>
          <div className="bg-[#121214] p-3 rounded-lg border border-zinc-800/80">
            <span className="text-[11px] text-zinc-500 block">Tabla 2: Contacto</span>
            <span className="text-sm font-semibold text-zinc-200 font-mono flex items-center gap-1.5 mt-0.5">
              <User className="w-3.5 h-3.5 text-[#d4af37]" /> {contactoRecords.length} Contactos
            </span>
          </div>
          <div className="bg-[#121214] p-3 rounded-lg border border-zinc-800/80">
            <span className="text-[11px] text-zinc-500 block">Catálogo Unificado</span>
            <span className="text-sm font-semibold text-white font-mono flex items-center gap-1.5 mt-0.5">
              <Layers className="w-3.5 h-3.5 text-[#e07a9e]" /> {unifiedHotels.length} Disponibles
            </span>
          </div>
        </div>
      </div>

      {/* Subtabs Navigation */}
      <div className="flex border-b border-zinc-800 space-x-1 sm:space-x-4 overflow-x-auto pb-1 text-sm font-medium">
        <button
          onClick={() => setActiveSubTab('inventario')}
          className={`px-4 py-2 rounded-t-lg transition flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeSubTab === 'inventario'
              ? 'border-[#e07a9e] text-white bg-zinc-900/60'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Table className="w-4 h-4 text-[#e07a9e]" />
          Tabla: Inventario de propiedades ({inventarioRecords.length})
        </button>

        <button
          onClick={() => setActiveSubTab('contacto')}
          className={`px-4 py-2 rounded-t-lg transition flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeSubTab === 'contacto'
              ? 'border-[#38a3a5] text-white bg-zinc-900/60'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <User className="w-4 h-4 text-[#38a3a5]" />
          Tabla: Contacto ({contactoRecords.length})
        </button>

        <button
          onClick={() => setActiveSubTab('unificado')}
          className={`px-4 py-2 rounded-t-lg transition flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeSubTab === 'unificado'
              ? 'border-[#d4af37] text-white bg-zinc-900/60'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Layers className="w-4 h-4 text-[#d4af37]" />
          Modelo Unificado (Fase 1 Reservas)
        </button>

        <button
          onClick={() => setActiveSubTab('configuracion')}
          className={`px-4 py-2 rounded-t-lg transition flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeSubTab === 'configuracion'
              ? 'border-zinc-400 text-white bg-zinc-900/60'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Key className="w-4 h-4 text-zinc-400" />
          Configuración API & Credenciales
        </button>
      </div>

      {/* Content for TAB 1: Inventario de propiedades */}
      {activeSubTab === 'inventario' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Inventario de propiedades</span>
                <span className="text-xs font-normal text-zinc-400 font-mono">(8 campos exactos)</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Campos: Nombre, Correo, Teléfono, Dirección, Render Fachada, Render Habitaciones, Descripción del hotel, Nombre del contacto.
              </p>
            </div>
            <span className="text-xs text-zinc-400 font-mono bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800">
              {inventarioRecords.length} registros cargados
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {inventarioRecords.map((record) => {
              const fachadaUrl = Array.isArray(record.fields['Render Fachada']) && record.fields['Render Fachada'][0]
                ? (typeof record.fields['Render Fachada'][0] === 'string' 
                    ? record.fields['Render Fachada'][0] 
                    : (record.fields['Render Fachada'][0] as any).url)
                : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';

              const habitaciones = Array.isArray(record.fields['Render Habitaciones'])
                ? record.fields['Render Habitaciones'].map((h: any) => typeof h === 'string' ? h : h.url)
                : [];

              return (
                <div 
                  key={record.id}
                  className="bg-[#18181b] border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition flex flex-col"
                >
                  <div className="relative h-48 w-full bg-zinc-900 overflow-hidden">
                    <img 
                      src={fachadaUrl} 
                      alt={record.fields['Nombre']}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-transparent to-transparent"></div>
                    <div className="absolute top-3 left-3 bg-[#121214]/80 backdrop-blur-sm border border-zinc-700/60 px-2.5 py-1 rounded-md text-[11px] font-mono text-zinc-300">
                      ID: {record.id}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <h4 className="text-base font-bold text-white drop-shadow-md">
                        {record.fields['Nombre']}
                      </h4>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                      {record.fields['Descripción del hotel']}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400 pt-2 border-t border-zinc-800/80">
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-[#e07a9e] shrink-0" />
                        <span className="truncate">{record.fields['Dirección']}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <User className="w-3.5 h-3.5 text-[#38a3a5] shrink-0" />
                        <span className="truncate">{record.fields['Nombre del contacto']}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span className="truncate font-mono text-[11px]">{record.fields['Correo']}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span className="font-mono text-[11px]">{record.fields['Teléfono']}</span>
                      </div>
                    </div>

                    {/* Room renders previews */}
                    {habitaciones.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[11px] font-medium text-zinc-400 block mb-1.5">
                          Render Habitaciones ({habitaciones.length} fotos registradas)
                        </span>
                        <div className="grid grid-cols-3 gap-1.5">
                          {habitaciones.slice(0, 3).map((imgUrl, i) => (
                            <div key={i} className="h-16 rounded overflow-hidden bg-zinc-900 border border-zinc-800">
                              <img 
                                src={imgUrl} 
                                alt={`Habitación ${i + 1}`} 
                                className="w-full h-full object-cover hover:scale-105 transition"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-between border-t border-zinc-800/80 text-[11px]">
                      <button
                        onClick={() => setSelectedRecordJson(record)}
                        className="inline-flex items-center gap-1 text-[#e07a9e] hover:text-[#c05c80] transition font-mono"
                      >
                        <FileText className="w-3 h-3" /> Ver JSON de Airtable
                      </button>
                      <span className="text-zinc-500 font-mono">Tabla: Inventario de propiedades</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Content for TAB 2: Contacto */}
      {activeSubTab === 'contacto' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Tabla: Contacto</span>
                <span className="text-xs font-normal text-zinc-400 font-mono">(9 campos exactos)</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Campos: Nombre del Hotel, Correo, Teléfono, Dirección, Contacto, Web, Redes Sociales, Fecha, Próximo seguimiento.
              </p>
            </div>
            <button
              onClick={() => setShowAddContactModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#e07a9e] hover:bg-[#c05c80] text-zinc-950 transition self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              Nuevo Contacto de Hotel
            </button>
          </div>

          {submitFeedback && (
            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {submitFeedback}
              </span>
              <button onClick={() => setSubmitFeedback(null)} className="text-emerald-400 hover:underline">
                Cerrar
              </button>
            </div>
          )}

          {/* Table representation */}
          <div className="bg-[#18181b] border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="bg-[#121214] text-zinc-400 uppercase tracking-wider font-mono text-[11px] border-b border-zinc-800">
                  <tr>
                    <th className="px-4 py-3">Nombre del Hotel</th>
                    <th className="px-4 py-3">Contacto</th>
                    <th className="px-4 py-3">Teléfono / Correo</th>
                    <th className="px-4 py-3">Dirección</th>
                    <th className="px-4 py-3">Web / Redes</th>
                    <th className="px-4 py-3">Seguimiento</th>
                    <th className="px-4 py-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {contactoRecords.map((c) => (
                    <tr key={c.id} className="hover:bg-zinc-900/40 transition">
                      <td className="px-4 py-3 font-semibold text-white">
                        <div>{c.fields['Nombre del Hotel']}</div>
                        <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{c.id}</div>
                      </td>
                      <td className="px-4 py-3 text-zinc-300">
                        {c.fields['Contacto']}
                      </td>
                      <td className="px-4 py-3 space-y-0.5">
                        <div className="font-mono text-zinc-400">{c.fields['Teléfono']}</div>
                        <div className="text-zinc-500 truncate max-w-[160px]">{c.fields['Correo']}</div>
                      </td>
                      <td className="px-4 py-3 text-zinc-400 max-w-[200px] truncate" title={c.fields['Dirección']}>
                        {c.fields['Dirección']}
                      </td>
                      <td className="px-4 py-3 space-y-0.5">
                        {c.fields['Web'] && (
                          <a 
                            href={c.fields['Web']} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-1 text-[#38a3a5] hover:underline"
                          >
                            Web <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                        {c.fields['Redes Sociales'] && (
                          <div className="text-[10px] text-zinc-500 truncate max-w-[130px]" title={c.fields['Redes Sociales']}>
                            {c.fields['Redes Sociales']}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-zinc-400">
                          <Calendar className="w-3 h-3 text-[#d4af37]" />
                          <span>{c.fields['Próximo seguimiento'] || 'N/A'}</span>
                        </div>
                        <div className="text-[10px] text-zinc-500 mt-0.5">
                          Reg: {c.fields['Fecha']}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setSelectedRecordJson(c)}
                          className="px-2 py-1 text-[11px] rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono transition"
                        >
                          Ver JSON
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Content for TAB 3: Modelo Unificado */}
      {activeSubTab === 'unificado' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Modelo Unificado: BlueOceanHotel</span>
                <span className="text-xs font-normal text-[#d4af37] font-mono">(Fusión de Inventario + Contacto)</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Estructura preparada para el Catálogo y Buscador de Reservas tipo Booking de la Fase 1.
              </p>
            </div>
            <span className="text-xs text-[#38a3a5] font-mono bg-[#38a3a5]/10 px-2.5 py-1 rounded border border-[#38a3a5]/30">
              {unifiedHotels.length} hoteles listos para reserva
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unifiedHotels.map((hotel) => (
              <div 
                key={hotel.id}
                className="bg-[#18181b] border border-zinc-800 rounded-xl overflow-hidden hover:border-[#e07a9e]/40 transition flex flex-col"
              >
                <div className="relative h-44 w-full bg-zinc-900">
                  <img 
                    src={hotel.renderFachada} 
                    alt={hotel.nombre} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-zinc-950/80 backdrop-blur-sm border border-zinc-700/60 px-2 py-0.5 rounded text-[11px] font-mono text-[#d4af37]">
                    ★ {hotel.puntuacion} ({hotel.totalResenas})
                  </div>
                  <div className="absolute top-2.5 right-2.5 bg-[#e07a9e]/90 text-zinc-950 font-bold px-2 py-0.5 rounded text-[11px] font-mono">
                    {hotel.tipoPropiedad}
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white line-clamp-1">{hotel.nombre}</h4>
                    <p className="text-[11px] text-[#38a3a5] font-medium mt-0.5">{hotel.zona} • {hotel.ciudad}</p>
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                      {hotel.descripcion}
                    </p>
                  </div>

                  {/* Pricing Matrix */}
                  <div className="bg-[#121214] p-3 rounded-lg border border-zinc-800/80 space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono block">
                      Tarifas por estancia (Fase 1)
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-zinc-900/80 px-2 py-1.5 rounded border border-zinc-800">
                        <span className="text-zinc-500 block text-[10px]">4 Horas</span>
                        <span className="font-bold text-white font-mono">${hotel.tarifas.estancia4Horas} MXN</span>
                      </div>
                      <div className="bg-zinc-900/80 px-2 py-1.5 rounded border border-zinc-800">
                        <span className="text-zinc-500 block text-[10px]">6 Horas</span>
                        <span className="font-bold text-white font-mono">${hotel.tarifas.estancia6Horas} MXN</span>
                      </div>
                      <div className="bg-zinc-900/80 px-2 py-1.5 rounded border border-zinc-800">
                        <span className="text-zinc-500 block text-[10px]">12 Horas</span>
                        <span className="font-bold text-white font-mono">${hotel.tarifas.estancia12Horas} MXN</span>
                      </div>
                      <div className="bg-zinc-900/80 px-2 py-1.5 rounded border border-zinc-800">
                        <span className="text-zinc-500 block text-[10px]">Noche Completa</span>
                        <span className="font-bold text-[#e07a9e] font-mono">${hotel.tarifas.nocheCompleta} MXN</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-zinc-800/80 text-[11px] text-zinc-400">
                    <span>Contacto: {hotel.nombreContacto}</span>
                    <button
                      onClick={() => setSelectedRecordJson(hotel)}
                      className="text-[#38a3a5] hover:underline font-mono"
                    >
                      Ver Objeto Completo
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content for TAB 4: Configuración API & Credenciales */}
      {activeSubTab === 'configuracion' && (
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 text-zinc-200 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Key className="w-5 h-5 text-[#d4af37]" />
              Conexión Directa con Airtable (API REST)
            </h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
              Para enlazar este sitio de reservas con tu base real de Airtable, basta con registrar las credenciales en las variables de entorno del sistema.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#121214] p-4 rounded-lg border border-zinc-800 space-y-3">
              <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono block">
                1. Token de Acceso Personal (PAT)
              </span>
              <div className="space-y-1 text-xs text-zinc-400">
                <p>Variable requerida: <code className="text-[#e07a9e] font-mono bg-zinc-900 px-1.5 py-0.5 rounded">AIRTABLE_API_KEY</code></p>
                <p>Se genera en <a href="https://airtable.com/create/tokens" target="_blank" rel="noopener noreferrer" className="text-[#38a3a5] underline">airtable.com/create/tokens</a> con los permisos:</p>
                <ul className="list-disc pl-5 space-y-0.5 text-zinc-400 mt-1 font-mono text-[11px]">
                  <li><code>data.records:read</code> (Lectura de tablas)</li>
                  <li><code>data.records:write</code> (Creación de registros)</li>
                  <li><code>schema.bases:read</code> (Opcional)</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#121214] p-4 rounded-lg border border-zinc-800 space-y-3">
              <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono block">
                2. Identificador de Base (Base ID)
              </span>
              <div className="space-y-1 text-xs text-zinc-400">
                <p>Variable requerida: <code className="text-[#e07a9e] font-mono bg-zinc-900 px-1.5 py-0.5 rounded">AIRTABLE_BASE_ID</code></p>
                <p>Es el identificador que inicia con <code className="text-white font-mono">app...</code> visible en la URL de tu base "Hoteles" en el navegador:</p>
                <p className="font-mono text-[11px] bg-zinc-900 p-2 rounded text-zinc-300">
                  https://airtable.com/<span className="text-[#d4af37] font-bold">appXXXXXXXXXXXXXX</span>/tbl...
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1 text-zinc-300">
              <span className="font-bold text-white block">Apego estricto a las reglas de no invasión:</span>
              <p>
                El backend solo accede a <strong className="text-white">"Contacto"</strong> e <strong className="text-white">"Inventario de propiedades"</strong>. 
                Las demás bases del ecosistema (Gestión de Tarifas, Reservas, Limpieza) no son tocadas ni consultadas de acuerdo con la directriz de Cero Suposiciones.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* JSON Modal Viewer */}
      {selectedRecordJson && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#18181b] border border-zinc-800 rounded-xl max-w-2xl w-full max-h-[80vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-[#121214]">
              <span className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#e07a9e]" />
                Inspección de Registro / Payload
              </span>
              <button 
                onClick={() => setSelectedRecordJson(null)}
                className="text-zinc-400 hover:text-white text-xs px-2 py-1 rounded bg-zinc-800"
              >
                Cerrar
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1 bg-[#121214] font-mono text-xs text-zinc-300">
              <pre className="whitespace-pre-wrap">{JSON.stringify(selectedRecordJson, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}

      {/* Add Contact Modal */}
      {showAddContactModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#18181b] border border-zinc-800 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <User className="w-4 h-4 text-[#38a3a5]" />
                Nuevo Registro en Tabla "Contacto"
              </h3>
              <button 
                onClick={() => setShowAddContactModal(false)}
                className="text-zinc-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateContact} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1">Nombre del Hotel *</label>
                <input
                  type="text"
                  required
                  value={newHotelName}
                  onChange={(e) => setNewHotelName(e.target.value)}
                  placeholder="Ej. Hotel Blue Ocean Alameda"
                  className="w-full bg-[#121214] border border-zinc-700 rounded px-3 py-2 text-white focus:border-[#e07a9e] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-zinc-400 mb-1">Correo *</label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="gerencia@hotel.com"
                    className="w-full bg-[#121214] border border-zinc-700 rounded px-3 py-2 text-white focus:border-[#e07a9e] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+52 55 1234 5678"
                    className="w-full bg-[#121214] border border-zinc-700 rounded px-3 py-2 text-white focus:border-[#e07a9e] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Dirección</label>
                <input
                  type="text"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="Calle, Colonia, Alcaldía, Ciudad"
                  className="w-full bg-[#121214] border border-zinc-700 rounded px-3 py-2 text-white focus:border-[#e07a9e] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-zinc-400 mb-1">Nombre de Contacto</label>
                  <input
                    type="text"
                    value={newContactPerson}
                    onChange={(e) => setNewContactPerson(e.target.value)}
                    placeholder="Lic. Martín Rivas"
                    className="w-full bg-[#121214] border border-zinc-700 rounded px-3 py-2 text-white focus:border-[#e07a9e] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Próximo seguimiento</label>
                  <input
                    type="date"
                    value={nextFollowUp}
                    onChange={(e) => setNextFollowUp(e.target.value)}
                    className="w-full bg-[#121214] border border-zinc-700 rounded px-3 py-2 text-white focus:border-[#e07a9e] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-zinc-400 mb-1">Sitio Web</label>
                  <input
                    type="url"
                    value={newWebsite}
                    onChange={(e) => setNewWebsite(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-[#121214] border border-zinc-700 rounded px-3 py-2 text-white focus:border-[#e07a9e] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Redes Sociales</label>
                  <input
                    type="text"
                    value={newSocials}
                    onChange={(e) => setNewSocials(e.target.value)}
                    placeholder="https://instagram.com/..."
                    className="w-full bg-[#121214] border border-zinc-700 rounded px-3 py-2 text-white focus:border-[#e07a9e] outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddContactModal(false)}
                  className="px-3 py-1.5 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-1.5 rounded bg-[#38a3a5] hover:bg-[#4ba3a3] text-zinc-950 font-bold text-xs flex items-center gap-1.5"
                >
                  {isSubmitting ? 'Guardando...' : 'Guardar en Airtable'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
