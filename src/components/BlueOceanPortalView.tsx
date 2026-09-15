import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Phone, 
  Clock, 
  DollarSign, 
  FileText,
  HelpCircle
} from 'lucide-react';
import { BlueOceanNavbar, BookingSearchBar, SearchFilters } from './BlueOceanNavbar';
import { HotelCatalogAndBookingFlow } from './HotelCatalogAndBookingFlow';
import { HotelerosAffiliationModal } from './HotelerosAffiliationModal';
import { CommercialModelSection } from './CommercialModelSection';
import { UseCasesSection } from './UseCasesSection';
import { FounderAndMethodologySection } from './FounderAndMethodologySection';
import { LCMLogo } from './LCMLogo';
import { BlueOceanHotel } from '../types/airtable';
import { airtableClient } from '../services/airtableClient';

export function BlueOceanPortalView() {
  const [hotels, setHotels] = useState<BlueOceanHotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAffiliationModalOpen, setIsAffiliationModalOpen] = useState(false);

  // Search and Filter State
  const [filters, setFilters] = useState<SearchFilters>({
    destino: 'todos',
    fechaLlegada: new Date().toISOString().split('T')[0],
    modalidadHoras: 'todas',
    huespedes: 2,
    estrellas: 'todas',
    rangoPrecioMax: 3000,
    soloConJacuzzi: false,
    soloConCochera: false
  });

  const loadHotels = async () => {
    setLoading(true);
    try {
      const data = await airtableClient.getUnifiedHotels();
      // data contains { success: boolean, hotels: BlueOceanHotel[], ... }
      const hotelsList = Array.isArray(data?.hotels) 
        ? data.hotels 
        : (Array.isArray(data) ? data : []);
      setHotels(hotelsList);
    } catch (err) {
      console.error('Error al cargar hoteles:', err);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHotels();
  }, []);

  // Filter Logic with safe array guard
  const safeHotels = Array.isArray(hotels) ? hotels : [];
  const filteredHotels = safeHotels.filter((h) => {
    // Filter Destino / Zona
    if (filters.destino !== 'todos') {
      const destLower = filters.destino.toLowerCase();
      const matchZone = h.zona.toLowerCase().includes(destLower) || 
                        h.direccion.toLowerCase().includes(destLower) || 
                        h.nombre.toLowerCase().includes(destLower);
      if (!matchZone) return false;
    }

    // Filter Estrellas
    if (filters.estrellas !== 'todas') {
      if (h.estrellas !== filters.estrellas) return false;
    }

    // Filter Jacuzzi
    if (filters.soloConJacuzzi) {
      const hasJacuzzi = h.servicios.some((s) => s.toLowerCase().includes('jacuzzi') || s.toLowerCase().includes('hidromasaje'));
      if (!hasJacuzzi) return false;
    }

    // Filter Cochera
    if (filters.soloConCochera) {
      const hasCochera = h.servicios.some((s) => s.toLowerCase().includes('cochera') || s.toLowerCase().includes('estacionamiento'));
      if (!hasCochera) return false;
    }

    return true;
  });

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#121214] text-zinc-100 flex flex-col font-sans selection:bg-[#e07a9e] selection:text-zinc-950">
      {/* 1. Header con Identidad Visual (Paleta Charcoal, Rose, Cyan & LCM Gold) */}
      <BlueOceanNavbar 
        onOpenConsultoriaModal={() => setIsAffiliationModalOpen(true)}
        onNavigateSection={handleScrollToSection}
      />

      {/* Hero Header Area */}
      <div className="relative border-b border-zinc-800 bg-gradient-to-b from-[#18181b] to-[#121214] pt-8 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181b] border border-zinc-700 text-xs text-zinc-300 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#e07a9e] animate-ping" />
              <span>Plataforma de Renta por Tiempo & Pernocta • CDMX</span>
              <span className="text-zinc-500">•</span>
              <span className="text-[#d4af37] font-mono font-bold">Autoría LCM</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Habitaciones & Suites con Renta por Tiempo:{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e07a9e] via-[#38a3a5] to-[#d4af37]">
                4, 6 o 12 Horas
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Encuentra la máxima privacidad, cochera discreta y confort de primer nivel en los mejores hoteles y moteles de la Ciudad de México.
            </p>
          </div>

          {/* 2. Buscador de Reservas tipo Booking (Destino, Fechas, Horas de estancia, Huéspedes) */}
          <div className="pt-2">
            <BookingSearchBar
              filters={filters}
              onFilterChange={setFilters}
              onSearch={() => handleScrollToSection('catalogo')}
              totalResults={filteredHotels.length}
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-16">
        {/* Catálogo de Propiedades y Flujo de Reserva */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-10 h-10 border-2 border-[#e07a9e] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-zinc-400 font-mono">Cargando inventario de Airtable...</p>
          </div>
        ) : (
          <HotelCatalogAndBookingFlow
            hotels={filteredHotels}
            selectedModalidad={filters.modalidadHoras}
            onRefreshData={loadHotels}
          />
        )}

        {/* Sección: Casos de Uso y Segmentación de Mercado LCM */}
        <UseCasesSection 
          onSelectDuration={(dur) => {
            setFilters(prev => ({ ...prev, modalidadHoras: dur }));
            handleScrollToSection('catalogo');
          }} 
        />

        {/* Sección: Modelo Comercial & Simulador Interactivo LCM (15% Comisión / $0 Inversión) */}
        <CommercialModelSection onOpenAffiliationModal={() => setIsAffiliationModalOpen(true)} />

        {/* Sección: Historia del Fundador y Metodología LCM */}
        <FounderAndMethodologySection />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-[#121214] py-8 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LCMLogo size="sm" />
            <div>
              <span className="text-white font-bold block">Blue Ocean Hotels • Fase 1</span>
              <span className="text-[11px] text-zinc-500">
                Base Airtable "Hoteles" • Tablas "Contacto" e "Inventario de propiedades"
              </span>
            </div>
          </div>

          <div className="text-center md:text-right text-[11px] text-zinc-500">
            <p>Diseño y Consultoría por <strong>Luis César Monroy</strong> • Todos los derechos reservados</p>
            <p className="font-mono mt-0.5 text-zinc-400">direccion@oceanrevenue-management.com</p>
          </div>
        </div>
      </footer>

      {/* Modal de Afiliación para Hoteleros */}
      <HotelerosAffiliationModal
        isOpen={isAffiliationModalOpen}
        onClose={() => setIsAffiliationModalOpen(false)}
        onSubmittedSuccess={() => {
          loadHotels();
        }}
      />
    </div>
  );
}
