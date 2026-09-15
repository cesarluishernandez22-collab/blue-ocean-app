import { useState } from 'react';
import { BookOpen, Sparkles, Copy, Check, FileText, Bookmark, Clock, ArrowRight, Download } from 'lucide-react';
import { LiteratureItem } from '../types';
import { INITIAL_LITERATURE } from '../data/initialData';

export function SpecializedLiteratureView() {
  const [literatureList, setLiteratureList] = useState<LiteratureItem[]>(INITIAL_LITERATURE);
  const [selectedItem, setSelectedItem] = useState<LiteratureItem>(literatureList[0]);

  // Generator form
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [genCategory, setGenCategory] = useState<string>('Revenue Management');
  const [genTopic, setGenTopic] = useState<string>('Diseño de Tarifas Dinámicas en Temporada Baja para Hoteles Boutique');
  const [genAudience, setGenAudience] = useState<string>('Propietarios de Hoteles y Agentes de Campo');
  const [genFormat, setGenFormat] = useState<string>('Manual Estructurado con Casos Prácticos y Fórmulas');
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerateDocument = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-literature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: genCategory,
          topic: genTopic,
          audience: genAudience,
          targetFormat: genFormat,
        }),
      });
      const data = await response.json();
      if (data.success && data.document) {
        const newItem: LiteratureItem = {
          id: `LIT-${Date.now()}`,
          title: genTopic,
          category: genCategory as any,
          author: 'Arquitecto Maestro y Núcleo de Ingeniería',
          readingTime: '9 min de lectura especializada',
          summary: `Tratado técnico y pedagógico generado sobre ${genTopic} enfocado en ${genAudience}.`,
          tags: [genCategory, 'Pedagogía', 'Especialidad', 'Arquitecto'],
          fullContent: data.document,
        };
        setLiteratureList([newItem, ...literatureList]);
        setSelectedItem(newItem);
      }
    } catch (e) {
      console.error('Error generating specialized literature:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyContent = () => {
    if (!selectedItem) return;
    navigator.clipboard.writeText(selectedItem.fullContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-zinc-900">
                  Literatura Especializada & Capacidad Pedagógica
                </h2>
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-purple-100 text-purple-800">
                  NIVEL MAESTRÍA
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                Redacción de tratados, manuales operativos, modelos de Revenue Management y especificaciones que traducen la complejidad a claridad absoluta.
              </p>
            </div>
          </div>

          <div className="text-xs font-medium text-zinc-500">
            Tratados Publicados: <strong className="text-zinc-900">{literatureList.length}</strong>
          </div>
        </div>
      </div>

      {/* Generator Accordion / Form */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Redactor Maestro: Generar Nuevo Tratado o Manual Técnico</span>
          </h3>
          <span className="text-xs text-zinc-400">Gemini 3.8 Flash / Motor Determinista</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-zinc-700">Categoría Especializada:</label>
            <select
              id="select-lit-category"
              value={genCategory}
              onChange={(e) => setGenCategory(e.target.value)}
              className="w-full rounded-md border border-zinc-300 p-2 text-zinc-900 bg-white focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="Revenue Management">Revenue Management</option>
              <option value="Políticas Corporativas TMC">Políticas Corporativas TMC</option>
              <option value="Arquitectura Agéntica">Arquitectura Agéntica</option>
              <option value="Operaciones y Finanzas">Operaciones y Finanzas</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-zinc-700">Tema Central / Título:</label>
            <input
              id="input-lit-topic"
              type="text"
              value={genTopic}
              onChange={(e) => setGenTopic(e.target.value)}
              className="w-full rounded-md border border-zinc-300 p-2 text-zinc-900 bg-white focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-zinc-700">Audiencia Objetivo:</label>
            <input
              id="input-lit-audience"
              type="text"
              value={genAudience}
              onChange={(e) => setGenAudience(e.target.value)}
              className="w-full rounded-md border border-zinc-300 p-2 text-zinc-900 bg-white focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-1.5 flex flex-col justify-end">
            <button
              id="btn-generate-lit-doc"
              onClick={handleGenerateDocument}
              disabled={isGenerating || !genTopic.trim()}
              className="w-full py-2.5 rounded-md bg-purple-700 text-white font-semibold text-xs hover:bg-purple-800 transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Redactando Tratado...' : 'Redactar Documento'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Document List on Left, Document Reader on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: List */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">
            Índice de Tratados y Guías Rectoras:
          </span>
          <div className="space-y-2">
            {literatureList.map((item) => {
              const isSelected = selectedItem.id === item.id;
              return (
                <button
                  key={item.id}
                  id={`btn-doc-${item.id}`}
                  onClick={() => setSelectedItem(item)}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-xs space-y-2 ${
                    isSelected
                      ? 'bg-white border-purple-500 ring-1 ring-purple-500 shadow-sm'
                      : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-100">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.readingTime}</span>
                    </span>
                  </div>

                  <h4 className="font-bold text-zinc-900 text-sm line-clamp-2">
                    {item.title}
                  </h4>

                  <p className="text-zinc-500 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column: Document Viewer */}
        <div className="lg:col-span-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-purple-100 text-purple-800">
                  {selectedItem.category}
                </span>
                <span className="text-xs text-zinc-400 font-mono">ID: {selectedItem.id}</span>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 leading-tight">
                {selectedItem.title}
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                Autor: {selectedItem.author} • {selectedItem.readingTime}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="btn-copy-literature"
                onClick={handleCopyContent}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 text-zinc-800 hover:bg-zinc-200 transition-colors border border-zinc-200"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
              </button>
            </div>
          </div>

          {/* Document Content Display */}
          <div className="prose prose-zinc max-w-none text-zinc-800 text-sm leading-relaxed space-y-4 font-normal">
            <pre className="whitespace-pre-wrap font-sans bg-zinc-50 p-6 rounded-lg border border-zinc-200 text-xs sm:text-sm leading-relaxed text-zinc-900 overflow-x-auto">
              {selectedItem.fullContent}
            </pre>
          </div>

          <div className="pt-4 border-t border-zinc-100 flex flex-wrap gap-1.5">
            {selectedItem.tags.map((tag, i) => (
              <span key={i} className="px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-100 text-zinc-600">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
