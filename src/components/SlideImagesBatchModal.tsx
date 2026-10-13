import React, { useState, useEffect } from 'react';
import { X, Upload, CheckCircle2, Image as ImageIcon, FolderArchive, ArrowRight } from 'lucide-react';

export interface AssignedImageDef {
  fileName: string;
  slideNumber: number;
  slideName: string;
  description: string;
  aliases: string[];
}

export const OFFICIAL_SLIDE_IMAGES: AssignedImageDef[] = [
  {
    fileName: 'Imagen que es Blue Ocean.jpg',
    slideNumber: 2,
    slideName: 'Lámina 2: ¿Qué es Blue Ocean?',
    description: 'Trazo de curva azul ascendente sobre gráficos bursátiles de crecimiento exponencial.',
    aliases: ['imagen que es blue ocean.jpg', 'blue ocean.jpg', 'imagen que es blue ocean']
  },
  {
    fileName: 'como trabajamos.jpg',
    slideNumber: 3,
    slideName: 'Lámina 3: Sistema Blue Ocean',
    description: 'Especialistas analizando métricas en pantallas de monitoreo de mercado.',
    aliases: ['como trabajamos.jpg', 'como trabajamos']
  },
  {
    fileName: 'tecnología.jpg',
    slideNumber: 4,
    slideName: 'Lámina 4: Captación en Línea y Conectividad',
    description: 'Nube central interconectada a bases de datos, móviles y servidores de reservas.',
    aliases: ['tecnologia.jpg', 'tecnología.jpg', 'tecnologia']
  },
  {
    fileName: 'imagen Revenue Manager.jpg',
    slideNumber: 5,
    slideName: 'Lámina 5: TRM vs RM (Revenue Manager)',
    description: 'Especialista en laptop frente a pantallas de monitoreo bursátil y hotelero.',
    aliases: ['imagen revenue manager.jpg', 'revenue manager.jpg', 'imagen revenue manager']
  },
  {
    fileName: 'datos analisis.jpg',
    slideNumber: 5,
    slideName: 'Lámina 5: Datos y Análisis de Rendimiento',
    description: 'Lupa sobre documentos financieros con gráficos de barras ascendentes.',
    aliases: ['datos analisis.jpg', 'datos análisis.jpg', 'datos analisis']
  },
  {
    fileName: 'pricing.jpg',
    slideNumber: 7,
    slideName: 'Lámina 7: ¿Qué es el Pricing?',
    description: 'Ejecutivo frente a interfaz holográfica con la palabra PRICING y calculadora.',
    aliases: ['pricing.jpg', 'pricing']
  },
  {
    fileName: 'segmentación de precio',
    slideNumber: 7,
    slideName: 'Lámina 7: Segmentación de Precio',
    description: 'Infografía de Fijación Estática, Precios por Segmentación y Paquetes.',
    aliases: ['segmentacion de precio', 'segmentación de precio', 'segmentacion de precio.jpg', 'segmentación de precio.jpg']
  },
  {
    fileName: 'analisis.jpg',
    slideNumber: 8,
    slideName: 'Lámina 8: El Forecasting',
    description: 'Portátil y móvil con métricas financieras y curvas analíticas de tendencia.',
    aliases: ['analisis.jpg', 'análisis.jpg', 'analisis']
  },
  {
    fileName: 'incremento$.jpg',
    slideNumber: 10,
    slideName: 'Lámina 10: Retorno e Incremento de Rentabilidad',
    description: 'Columnas de monedas en escala ascendente sobre gráficas financieras.',
    aliases: ['incremento$.jpg', 'incremento.jpg', 'incremento$']
  }
];

interface SlideImagesBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh?: () => void;
}

export function SlideImagesBatchModal({
  isOpen,
  onClose,
  onRefresh
}: SlideImagesBatchModalProps) {
  const [statuses, setStatuses] = useState<Record<string, boolean>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const checkAllStatuses = () => {
    const nextStatus: Record<string, boolean> = {};
    OFFICIAL_SLIDE_IMAGES.forEach((item) => {
      const cached = localStorage.getItem(`slide_img_${item.fileName.trim()}`);
      nextStatus[item.fileName] = Boolean(cached);
    });
    setStatuses(nextStatus);
  };

  useEffect(() => {
    if (isOpen) {
      checkAllStatuses();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMultipleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsProcessing(true);
    setMessage('Procesando archivos...');

    let matchedCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const lowerName = file.name.toLowerCase().trim();

      // Buscar a qué imagen oficial corresponde
      const matchedDef = OFFICIAL_SLIDE_IMAGES.find((def) => {
        if (def.fileName.toLowerCase() === lowerName) return true;
        return def.aliases.some((alias) => lowerName.includes(alias.toLowerCase()) || alias.toLowerCase().includes(lowerName));
      });

      if (matchedDef) {
        matchedCount++;
        await new Promise<void>((resolve) => {
          const reader = new FileReader();
          reader.onload = async () => {
            const dataUrl = reader.result as string;
            const key = `slide_img_${matchedDef.fileName.trim()}`;
            localStorage.setItem(key, dataUrl);

            try {
              await fetch('/api/upload-slide-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  fileName: matchedDef.fileName.trim(),
                  dataUrl
                })
              });
            } catch (err) {
              console.warn('Error al guardar en el servidor:', err);
            }
            resolve();
          };
          reader.readAsDataURL(file);
        });
      }
    }

    checkAllStatuses();
    setIsProcessing(false);
    setMessage(`Se vincularon exitosamente ${matchedCount} de ${files.length} archivo(s).`);
    if (onRefresh) onRefresh();
  };

  const handleSingleUpload = (def: AssignedImageDef, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      const key = `slide_img_${def.fileName.trim()}`;
      localStorage.setItem(key, dataUrl);

      try {
        await fetch('/api/upload-slide-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: def.fileName.trim(),
            dataUrl
          })
        });
      } catch (err) {
        console.warn('Error al guardar en servidor:', err);
      }

      checkAllStatuses();
      if (onRefresh) onRefresh();
    };
    reader.readAsDataURL(file);
  };

  const completedCount = Object.values(statuses).filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in text-left">
      <div className="bg-[#00172e] border-2 border-[#d4af37] w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Cabecera */}
        <div className="p-4 sm:p-5 border-b border-blue-900/80 bg-blue-950/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#d4af37] font-bold tracking-widest block">
              Gestor de Imágenes Oficiales • Blue Ocean
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white font-serif">
              9 Imágenes Oficiales de las Láminas
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-blue-900/50 hover:bg-blue-800 text-zinc-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Zona de Arrastre / Selección Múltiple */}
        <div className="p-4 bg-[#001224] border-b border-blue-900/60">
          <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-[#d4af37]/60 hover:border-[#d4af37] rounded-2xl bg-blue-950/40 hover:bg-blue-950/70 transition cursor-pointer text-center group">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleMultipleFiles(e.target.files)}
              className="hidden"
            />
            <FolderArchive className="w-8 h-8 text-[#f5d77f] mb-2 group-hover:scale-110 transition" />
            <span className="text-sm font-bold text-white">
              Haz clic aquí para seleccionar tus 9 imágenes juntas
            </span>
            <span className="text-xs text-blue-200/80 mt-1">
              El sistema reconoce automáticamente cada nombre de archivo y lo asigna a su lámina.
            </span>
          </label>

          {message && (
            <div className="mt-3 p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-semibold text-center">
              {message}
            </div>
          )}

          <div className="flex justify-between items-center mt-3 text-xs">
            <span className="text-zinc-300">
              Imágenes activas en la presentación: <strong className="text-[#f5d77f]">{completedCount} de 9</strong>
            </span>
            {completedCount === 9 && (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Todas las imágenes sincronizadas
              </span>
            )}
          </div>
        </div>

        {/* Lista de las 9 imágenes */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2.5">
          {OFFICIAL_SLIDE_IMAGES.map((def, idx) => {
            const isLoaded = Boolean(statuses[def.fileName]);

            return (
              <div
                key={idx}
                className={`p-3 rounded-2xl border transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  isLoaded
                    ? 'bg-blue-950/40 border-emerald-500/60'
                    : 'bg-zinc-900/80 border-blue-900/60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isLoaded
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                        : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {isLoaded ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <ImageIcon className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900/80 text-[#f5d77f] font-bold">
                        {def.slideName}
                      </span>
                      <span className="text-xs font-bold text-white font-mono">
                        "{def.fileName}"
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-300 mt-0.5">
                      {def.description}
                    </p>
                  </div>
                </div>

                <div className="self-end sm:self-center shrink-0">
                  <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-900/70 hover:bg-blue-800 text-xs font-bold text-white cursor-pointer transition border border-blue-700/50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSingleUpload(def, e)}
                      className="hidden"
                    />
                    <Upload className="w-3.5 h-3.5 text-[#f5d77f]" />
                    <span>{isLoaded ? 'Reemplazar' : 'Cargar'}</span>
                  </label>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pie */}
        <div className="p-4 border-t border-blue-900/80 bg-blue-950/90 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#c49f27] text-zinc-950 font-black text-xs uppercase tracking-wider transition cursor-pointer shadow"
          >
            Aceptar y Volver a la Convocatoria
          </button>
        </div>
      </div>
    </div>
  );
}
