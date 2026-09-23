import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  X, 
  Check, 
  Layers, 
  Trash2, 
  Building2, 
  Eye, 
  Sparkles, 
  ChevronRight, 
  HelpCircle,
  Maximize2,
  FolderGit2,
  RefreshCw
} from 'lucide-react';
import { BlueOceanHotel } from '../types/airtable';
import { GITHUB_RENDER_FILENAMES } from '../data/githubRenders';

interface UnassignedImage {
  id: string;
  url: string;
  fileName: string;
  selectedHotelId: string;
  targetRole: 'fachada' | 'habitacion';
  tag: string;
}

interface RenderOrganizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotels: BlueOceanHotel[];
  onUpdateHotels: (updater: (prev: BlueOceanHotel[]) => BlueOceanHotel[]) => void;
  onNotify: (msg: string) => void;
}

export function RenderOrganizerModal({
  isOpen,
  onClose,
  hotels,
  onUpdateHotels,
  onNotify
}: RenderOrganizerModalProps) {
  const [unassignedImages, setUnassignedImages] = useState<UnassignedImage[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'bandeja' | 'resumen'>('bandeja');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Cargar fotos de GitHub al montar si la bandeja está vacía
  useEffect(() => {
    if (isOpen && unassignedImages.length === 0) {
      loadGithubImages();
    }
  }, [isOpen]);

  const loadGithubImages = () => {
    const defaultHotelId = hotels[0]?.id || '';
    const initialItems: UnassignedImage[] = GITHUB_RENDER_FILENAMES.map((fileName, index) => {
      // Distribuir sugerencias lógicas según el hotel
      const hotelIndex = index % (hotels.length || 1);
      const suggestedHotel = hotels[hotelIndex]?.id || defaultHotelId;
      const isFachada = index < 6;

      return {
        id: `gh_${fileName}_${index}`,
        url: `/renders/${fileName}`,
        fileName: fileName,
        selectedHotelId: suggestedHotel,
        targetRole: isFachada ? 'fachada' : 'habitacion',
        tag: isFachada ? 'Fachada' : 'Suite'
      };
    });

    setUnassignedImages(initialItems);
    onNotify(`Se cargaron ${initialItems.length} renders directamente desde tu repositorio GitHub.`);
  };

  if (!isOpen) return null;

  // Procesar archivos subidos (selección múltiple o drag & drop)
  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const defaultHotelId = hotels[0]?.id || '';
    const newItems: UnassignedImage[] = [];

    Array.from(files).forEach((file, index) => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const resultUrl = e.target?.result as string;
        if (!resultUrl) return;

        setUnassignedImages((prev) => [
          ...prev,
          {
            id: `upload_${Date.now()}_${index}_${Math.random().toString(36).substring(2, 7)}`,
            url: resultUrl,
            fileName: file.name,
            selectedHotelId: defaultHotelId,
            targetRole: index === 0 ? 'fachada' : 'habitacion',
            tag: 'Suite'
          }
        ]);
      };
      reader.readAsDataURL(file);
    });

    onNotify(`Se cargaron ${files.length} imágenes a la bandeja para clasificar.`);
  };

  // Asignar una imagen individual
  const assignSingleImage = (item: UnassignedImage) => {
    onUpdateHotels((prevHotels) => {
      const nextHotels = prevHotels.map((h) => {
        if (h.id === item.selectedHotelId) {
          if (item.targetRole === 'fachada') {
            return { ...h, renderFachada: item.url };
          } else {
            return { ...h, renderHabitaciones: [item.url, ...h.renderHabitaciones] };
          }
        }
        return h;
      });

      // Persistir en localStorage
      try {
        const stored = localStorage.getItem('blueocean_custom_hotel_images') || '{}';
        const parsed = JSON.parse(stored);
        const currentTarget = parsed[item.selectedHotelId] || {};
        if (item.targetRole === 'fachada') {
          currentTarget.renderFachada = item.url;
        } else {
          currentTarget.renderHabitaciones = [item.url, ...(currentTarget.renderHabitaciones || [])];
        }
        parsed[item.selectedHotelId] = currentTarget;
        localStorage.setItem('blueocean_custom_hotel_images', JSON.stringify(parsed));
      } catch (err) {
        console.warn('Error al guardar en localStorage:', err);
      }

      return nextHotels;
    });

    // Quitar de la bandeja
    setUnassignedImages((prev) => prev.filter((img) => img.id !== item.id));
    const targetHotel = hotels.find((h) => h.id === item.selectedHotelId);
    onNotify(`Foto asignada a ${targetHotel?.nombre || 'hotel'} como ${item.targetRole === 'fachada' ? 'Fachada Principal' : 'Habitación'}.`);
  };

  // Asignar TODAS las imágenes de la bandeja en bloque
  const assignAllImages = () => {
    if (unassignedImages.length === 0) return;

    unassignedImages.forEach((item) => {
      assignSingleImage(item);
    });

    setUnassignedImages([]);
    onNotify('¡Todas las fotos de la bandeja fueron asignadas exitosamente!');
  };

  // Descartar imagen de la bandeja
  const removeUnassigned = (id: string) => {
    setUnassignedImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-zinc-950 border border-zinc-800 w-full max-w-6xl max-h-[92vh] rounded-3xl flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header del Organizador */}
        <div className="p-5 sm:p-6 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Organizador Inteligente de Renders
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                {unassignedImages.length} fotos por clasificar
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              Mesa de Trabajo: Sube tus Renders y Acomódalos
            </h2>
            <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
              No te preocupes por los nombres de los archivos. Sube todas tus fotos de una sola vez, míralas en grande y decide con un clic a qué hotel y habitación pertenecen.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pestañas & Acciones Rápidas */}
        <div className="px-6 py-3 border-b border-zinc-800/80 bg-zinc-950/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('bandeja')}
              className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
                activeTab === 'bandeja'
                  ? 'bg-cyan-500 text-zinc-950 shadow-md shadow-cyan-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span>1. Bandeja de Renders ({unassignedImages.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('resumen')}
              className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
                activeTab === 'resumen'
                  ? 'bg-cyan-500 text-zinc-950 shadow-md shadow-cyan-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span>2. Resumen por Hotel</span>
            </button>

            <button
              onClick={loadGithubImages}
              className="px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-cyan-300 border border-cyan-500/30"
              title="Recargar los 35 renders jalados desde GitHub"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>📥 Recargar 35 Fotos de GitHub</span>
            </button>
          </div>

          {unassignedImages.length > 0 && activeTab === 'bandeja' && (
            <div className="flex items-center gap-2">
              <button
                onClick={assignAllImages}
                className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition flex items-center gap-1.5 shadow-lg"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Asignar Todas ({unassignedImages.length})</span>
              </button>
              <button
                onClick={() => setUnassignedImages([])}
                className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-rose-950/40 hover:text-rose-400 text-zinc-400 font-mono transition"
              >
                Limpiar bandeja
              </button>
            </div>
          )}
        </div>

        {/* Contenido Principal */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'bandeja' ? (
            <>
              {/* Zona de Arrastre Masivo (Drag & Drop) */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  handleFiles(e.dataTransfer.files);
                }}
                className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all ${
                  isDragging
                    ? 'border-cyan-400 bg-cyan-950/20 scale-[0.99]'
                    : 'border-zinc-700/80 hover:border-cyan-500/50 bg-zinc-900/40 hover:bg-zinc-900/60'
                }`}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  id="bulk-render-uploader"
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
                <label
                  htmlFor="bulk-render-uploader"
                  className="cursor-pointer flex flex-col items-center justify-center space-y-3"
                >
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-base font-bold text-white block">
                      Arrastra aquí todas tus imágenes o haz clic para seleccionarlas
                    </span>
                    <span className="text-xs text-zinc-400 mt-1 block">
                      Puedes seleccionar 5, 10 o 50 imágenes a la vez. No importa el nombre ni el orden.
                    </span>
                  </div>
                  <span className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs shadow-md">
                    Seleccionar Fotos desde mi Computadora
                  </span>
                </label>
              </div>

              {/* Lista de Fotos Pendientes por Clasificar */}
              {unassignedImages.length === 0 ? (
                <div className="p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 text-center space-y-2">
                  <Sparkles className="w-8 h-8 text-zinc-600 mx-auto" />
                  <h3 className="text-sm font-bold text-zinc-300">
                    Bandeja limpia: No hay fotos pendientes
                  </h3>
                  <p className="text-xs text-zinc-500 max-w-md mx-auto">
                    Usa el botón de arriba para subir tu lote de fotos. Una vez que las cargues, aquí podrás verlas en miniatura y elegir a qué motel o habitación va cada una.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-mono uppercase font-bold text-zinc-300 flex items-center gap-2">
                      <Eye className="w-4 h-4 text-cyan-400" />
                      Fotos en la Bandeja ({unassignedImages.length}):
                    </h3>
                    <span className="text-xs text-zinc-400 font-mono">
                      Selecciona el hotel y haz clic en "Asignar"
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {unassignedImages.map((item, idx) => (
                      <div
                        key={item.id}
                        className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col p-3 space-y-3 group hover:border-cyan-500/60 transition shadow-lg"
                      >
                        {/* Vista previa de imagen */}
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
                          <img
                            src={item.url}
                            alt={`Render ${idx}`}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <button
                            onClick={() => setPreviewImage(item.url)}
                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-black text-white text-xs backdrop-blur border border-zinc-700 transition"
                            title="Ver en grande"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                          </button>
                          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 text-zinc-300 border border-zinc-700">
                            #{idx + 1}
                          </span>
                        </div>

                        {/* Controles de Clasificación */}
                        <div className="space-y-2 text-xs flex-1 flex flex-col justify-between">
                          <div className="space-y-2">
                            {/* Selector de Hotel */}
                            <div>
                              <label className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
                                ¿A qué Hotel pertenece?
                              </label>
                              <select
                                value={item.selectedHotelId}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setUnassignedImages((prev) =>
                                    prev.map((img) =>
                                      img.id === item.id ? { ...img, selectedHotelId: val } : img
                                    )
                                  );
                                }}
                                className="w-full bg-zinc-950 text-zinc-200 border border-zinc-700 rounded-xl px-2.5 py-1.5 text-xs focus:outline-none focus:border-cyan-500"
                              >
                                {hotels.map((h) => (
                                  <option key={h.id} value={h.id}>
                                    {h.nombre} ({h.zona})
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Selector de Rol (Fachada o Habitación) */}
                            <div>
                              <label className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
                                ¿Qué tipo de render es?
                              </label>
                              <div className="grid grid-cols-2 gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setUnassignedImages((prev) =>
                                      prev.map((img) =>
                                        img.id === item.id ? { ...img, targetRole: 'fachada' } : img
                                      )
                                    );
                                  }}
                                  className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border transition ${
                                    item.targetRole === 'fachada'
                                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                                  }`}
                                >
                                  🏢 Fachada
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setUnassignedImages((prev) =>
                                      prev.map((img) =>
                                        img.id === item.id ? { ...img, targetRole: 'habitacion' } : img
                                      )
                                    );
                                  }}
                                  className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border transition ${
                                    item.targetRole === 'habitacion'
                                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                                  }`}
                                >
                                  🛏️ Habitación
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Botón de Asignación Directa */}
                          <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
                            <button
                              onClick={() => assignSingleImage(item)}
                              className="flex-1 py-2 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow transition"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Asignar</span>
                            </button>
                            <button
                              onClick={() => removeUnassigned(item.id)}
                              className="p-2 rounded-xl bg-zinc-950 hover:bg-rose-950/40 text-zinc-400 hover:text-rose-400 border border-zinc-800 transition"
                              title="Descartar de la bandeja"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Vista 2: Resumen de Renders por Hotel */
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300">
                Aquí puedes ver todas las fotos que tiene asignadas cada hotel actualmente (fachada y habitaciones).
              </div>

              <div className="space-y-6">
                {hotels.map((h) => (
                  <div key={h.id} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <div>
                        <h4 className="text-base font-bold text-white flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-cyan-400" />
                          {h.nombre}
                        </h4>
                        <span className="text-xs text-zinc-400 font-mono">{h.zona} • {h.tipoPropiedad}</span>
                      </div>
                      <span className="text-xs font-mono text-zinc-400">
                        {h.renderHabitaciones.length + 1} fotos totales
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {/* Fachada */}
                      <div className="space-y-1">
                        <div className="aspect-video rounded-xl overflow-hidden border border-cyan-500/50 bg-zinc-950 relative">
                          <img src={h.renderFachada} alt="Fachada" className="w-full h-full object-cover" />
                          <span className="absolute bottom-1 left-1 bg-black/80 text-[8px] font-mono text-cyan-300 px-1 rounded">
                            Fachada
                          </span>
                        </div>
                      </div>

                      {/* Habitaciones */}
                      {h.renderHabitaciones.map((habImg, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 relative">
                            <img src={habImg} alt={`Hab ${idx}`} className="w-full h-full object-cover" />
                            <span className="absolute bottom-1 left-1 bg-black/80 text-[8px] font-mono text-zinc-300 px-1 rounded">
                              Hab #{idx + 1}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Las fotos que asignes se guardan en tu navegador y se reflejan en el catálogo y en el portal de huéspedes.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold transition"
          >
            Listo / Ver Directorio
          </button>
        </div>
      </div>

      {/* Modal Pantalla Completa para ver foto grande */}
      {previewImage && (
        <div
          className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-10 right-0 p-2 rounded-full bg-zinc-800 text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={previewImage}
              alt="Vista previa"
              className="max-w-full max-h-[80vh] object-contain rounded-2xl border border-zinc-800 shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
