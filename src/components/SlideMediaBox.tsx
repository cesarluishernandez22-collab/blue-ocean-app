import React, { useState, useEffect, useRef } from 'react';
import { Upload, Image as ImageIcon, CheckCircle, RefreshCw } from 'lucide-react';

interface SlideMediaBoxProps {
  fileName: string;
  alt: string;
  className?: string;
  caption?: string;
  aspectClass?: string;
}

export function SlideMediaBox({
  fileName,
  alt,
  className = '',
  caption,
  aspectClass = 'h-52 sm:h-72 w-full'
}: SlideMediaBoxProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const storageKey = `slide_img_${fileName.trim()}`;

  useEffect(() => {
    // 1. Revisar si ya está guardada localmente en base64
    const cached = localStorage.getItem(storageKey);
    if (cached) {
      setImgSrc(cached);
      setLoadError(false);
      return;
    }

    // 2. Intentar cargar desde el endpoint estático del servidor
    const serverPath = `/images/slides/${encodeURIComponent(fileName.trim())}`;
    setImgSrc(serverPath);
    setLoadError(false);
  }, [fileName]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setImgSrc(dataUrl);
      setLoadError(false);
      localStorage.setItem(storageKey, dataUrl);

      // Enviar al servidor para persistirlo en /public/images/slides/
      try {
        await fetch('/api/upload-slide-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: fileName.trim(),
            dataUrl: dataUrl
          })
        });
      } catch (err) {
        console.warn('No se pudo guardar en disco del servidor, se mantiene en memoria local:', err);
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden border-2 border-[#d4af37]/70 shadow-md bg-zinc-900 ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {imgSrc && !loadError ? (
        <div className="relative group">
          <img
            src={imgSrc}
            alt={alt}
            onError={() => {
              // Si falla la ruta del servidor, mostrar el contenedor de asignación oficial
              setLoadError(true);
            }}
            className={`${aspectClass} object-cover w-full bg-zinc-950`}
          />
          {caption && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-950/95 via-blue-950/70 to-transparent p-3 sm:p-4 flex items-end justify-between gap-2">
              <div className="text-[11px] sm:text-xs font-sans font-bold text-[#f5d77f]">
                {caption}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="opacity-0 group-hover:opacity-100 transition px-2 py-1 rounded bg-black/70 hover:bg-black text-[#d4af37] text-[10px] font-sans border border-[#d4af37]/40 cursor-pointer"
                title="Cambiar o actualizar imagen"
              >
                Reemplazar
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className={`${aspectClass} flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#00172e] to-[#002244] border border-blue-900/60`}>
          <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#f5d77f] mb-3">
            <ImageIcon className="w-6 h-6" />
          </div>

          <span className="text-[10px] font-sans uppercase text-[#d4af37] font-bold tracking-wider mb-1">
            Espacio Oficial Designado
          </span>
          <h4 className="text-sm font-bold text-white mb-1">
            {fileName}
          </h4>
          {caption && (
            <p className="text-xs text-zinc-300 max-w-md mb-3 leading-relaxed">
              {caption}
            </p>
          )}

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d4af37] hover:bg-[#c49f27] text-zinc-950 font-bold text-xs uppercase tracking-wide shadow-lg transition cursor-pointer active:scale-95"
          >
            {isUploading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Cargando...</span>
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5" />
                <span>Cargar "{fileName}"</span>
              </>
            )}
          </button>
          <span className="text-[10px] text-blue-200/80 mt-2 font-sans">
            Selecciona el archivo para incrustarlo de inmediato
          </span>
        </div>
      )}
    </div>
  );
}
