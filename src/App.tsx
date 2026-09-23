import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab, SystemStatus } from './types';
import { Header } from './components/Header';
import { OverviewView } from './components/OverviewView';
import { TradytecCellView } from './components/TradytecCellView';
import { BlueOceanCellView } from './components/BlueOceanCellView';
import { ZeroAssumptionsView } from './components/ZeroAssumptionsView';
import { SpecializedLiteratureView } from './components/SpecializedLiteratureView';
import { AdaptiveMemoryView } from './components/AdaptiveMemoryView';
import { GovernanceView } from './components/GovernanceView';
import { AirtableDataArchitectureView } from './components/AirtableDataArchitectureView';
import { BlueOceanPortalView } from './components/BlueOceanPortalView';
import { HotelDirectoryShowcaseView } from './components/HotelDirectoryShowcaseView';
import { SupabaseDataArchitectureView } from './components/SupabaseDataArchitectureView';
import { RescueRoadmapView } from './components/RescueRoadmapView';
import { InteractiveFeedbackView } from './components/InteractiveFeedbackView';
import { LCMRevenueMasteryView } from './components/LCMRevenueMasteryView';
import { ConvocatoriaSliderView } from './components/ConvocatoriaSliderView';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('hotel_directory');
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);

  useEffect(() => {
    fetch('/api/system-status')
      .then((res) => res.json())
      .then((data) => setSystemStatus(data))
      .catch((err) => console.error('Failed to load system status:', err));
  }, []);

  return (
    <div className="min-h-screen bg-[#0e0f12] text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-zinc-950">
      {/* Header Unificado de Trabajo */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        systemStatus={systemStatus}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="w-full"
          >
            {activeTab === 'convocatoria' && (
              <div className="w-full h-full">
                <ConvocatoriaSliderView 
                  onGoToHotels={() => setActiveTab('hotel_directory')}
                  onGoToPortal={() => setActiveTab('blueocean_portal')}
                />
              </div>
            )}

            {activeTab === 'hotel_directory' && (
              <div className="w-full">
                <HotelDirectoryShowcaseView 
                  onSelectHotelForBooking={() => setActiveTab('blueocean_portal')} 
                  onGoToMethodology={() => setActiveTab('metodologia_lcm')}
                />
              </div>
            )}

            {activeTab === 'metodologia_lcm' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <LCMRevenueMasteryView 
                  onGoToHotels={() => setActiveTab('hotel_directory')} 
                />
              </div>
            )}

            {activeTab === 'blueocean_portal' && <BlueOceanPortalView />}
            
            {activeTab === 'supabase_sql' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <SupabaseDataArchitectureView />
              </div>
            )}

            {activeTab === 'roadmap_costos' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <RescueRoadmapView />
              </div>
            )}

            {activeTab === 'feedback' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <InteractiveFeedbackView />
              </div>
            )}

            {activeTab === 'blueocean_data' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <AirtableDataArchitectureView />
              </div>
            )}

            {activeTab === 'overview' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <OverviewView
                  systemStatus={systemStatus}
                  setActiveTab={setActiveTab}
                />
              </div>
            )}

            {activeTab === 'blueocean' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <BlueOceanCellView />
              </div>
            )}

            {activeTab === 'tradytec' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <TradytecCellView />
              </div>
            )}

            {activeTab === 'zero_assumptions' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ZeroAssumptionsView />
              </div>
            )}

            {activeTab === 'literature' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <SpecializedLiteratureView />
              </div>
            )}

            {activeTab === 'adaptive_memory' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <AdaptiveMemoryView />
              </div>
            )}

            {activeTab === 'governance' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <GovernanceView />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Ejecutivo */}
      <footer className="border-t border-zinc-800 bg-[#090a0c] py-6 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wide">BLUE OCEAN</span>
            <span>•</span>
            <span>Hoteles Boutique, Villas & Microestancias</span>
            <span>•</span>
            <span className="text-[#f5d77f]">Dirección General: Luis César Monroy</span>
          </div>
          <div className="text-zinc-400 text-xs">
            © 2026 Blue Ocean • Total Revenue Management
          </div>
        </div>
      </footer>
    </div>
  );
}
