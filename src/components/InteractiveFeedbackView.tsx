import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  MessageSquare, 
  Copy, 
  Check, 
  Save, 
  Sparkles, 
  Plus, 
  Trash2,
  Sliders,
  Palette,
  CreditCard,
  Clock,
  Shield
} from 'lucide-react';

interface FeedbackItem {
  id: string;
  category: 'Diseño & Marca' | 'Reservas & Tarifas' | 'Pagos & Finanzas' | 'Hoteleros & Afiliación';
  title: string;
  description: string;
  status: 'SI' | 'NO' | 'EN_REVISION';
  userNotes: string;
}

const DEFAULT_ITEMS: FeedbackItem[] = [
  {
    id: 'f1',
    category: 'Reservas & Tarifas',
    title: 'Microestancias y Reservas por Horas (4h, 6h, 12h)',
    description: 'Permitir al usuario reservar habitaciones por bloques de tiempo además de noche completa.',
    status: 'SI',
    userNotes: 'Fundamental para maximizar ocupación durante horas diurnas.'
  },
  {
    id: 'f2',
    category: 'Pagos & Finanzas',
    title: 'Comisión del 15% para Blue Ocean',
    description: 'El desglose retiene automáticamente el 15% para la plataforma y el 85% para el dueño del hotel.',
    status: 'SI',
    userNotes: 'Es un porcentaje atractivo frente al 20-25% que cobra Booking o Expedia.'
  },
  {
    id: 'f3',
    category: 'Pagos & Finanzas',
    title: 'Modalidad de Pago en Recepción',
    description: 'El cliente reserva en línea y paga el total directamente en el mostrador al llegar.',
    status: 'SI',
    userNotes: 'Genera confianza para clientes que no quieren poner tarjeta de crédito de inmediato.'
  },
  {
    id: 'f4',
    category: 'Diseño & Marca',
    title: 'Paleta de Colores Oscura Elegante vs Clara',
    description: 'Tema oscuro con tonos marinos profundos y acentos en dorado/esmeralda o tema claro boutique.',
    status: 'EN_REVISION',
    userNotes: 'Quiero definir la paleta con base en el logotipo que tengo en mente.'
  },
  {
    id: 'f5',
    category: 'Reservas & Tarifas',
    title: 'Filtros de Amenidades Críticas (Jacuzzi y Cochera)',
    description: 'Buscador rápido con botones para mostrar solo suites con tina de hidromasaje o garaje privado.',
    status: 'SI',
    userNotes: 'Indispensable para el perfil de parejas y huéspedes discretos.'
  },
  {
    id: 'f6',
    category: 'Hoteleros & Afiliación',
    title: 'Página de Captación y Registro de Hoteleros',
    description: 'Sección donde los propietarios leen las ventajas de Blue Ocean y envían sus datos para unirse.',
    status: 'SI',
    userNotes: 'Nos servirá para prospección comercial directa.'
  }
];

export function InteractiveFeedbackView() {
  const [items, setItems] = useState<FeedbackItem[]>(() => {
    try {
      const saved = localStorage.getItem('blueocean_user_feedback');
      return saved ? JSON.parse(saved) : DEFAULT_ITEMS;
    } catch {
      return DEFAULT_ITEMS;
    }
  });

  const [generalComment, setGeneralComment] = useState<string>(() => {
    return localStorage.getItem('blueocean_general_comments') || '';
  });

  const [copied, setCopied] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('blueocean_user_feedback', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem('blueocean_general_comments', generalComment);
    } catch (e) {
      console.error(e);
    }
  }, [generalComment]);

  const updateStatus = (id: string, newStatus: 'SI' | 'NO' | 'EN_REVISION') => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
    showSaveNotification();
  };

  const updateNotes = (id: string, notes: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, userNotes: notes } : item));
  };

  const showSaveNotification = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const copyFeedbackSummary = () => {
    const siItems = items.filter(i => i.status === 'SI').map(i => `✓ SÍ: ${i.title}${i.userNotes ? ` (Nota: ${i.userNotes})` : ''}`).join('\n');
    const noItems = items.filter(i => i.status === 'NO').map(i => `✗ NO: ${i.title}${i.userNotes ? ` (Nota: ${i.userNotes})` : ''}`).join('\n');
    const revItems = items.filter(i => i.status === 'EN_REVISION').map(i => `? REVISAR: ${i.title}${i.userNotes ? ` (Nota: ${i.userNotes})` : ''}`).join('\n');

    const summaryText = `DECISIONES DEL PROYECTO BLUE OCEAN:

${siItems ? `--- LO QUE SÍ VA ---\n${siItems}\n` : ''}
${noItems ? `--- LO QUE NO VA / DESCARTAR ---\n${noItems}\n` : ''}
${revItems ? `--- EN REVISIÓN / POR DEFINIR ---\n${revItems}\n` : ''}
${generalComment ? `--- COMENTARIOS GENERALES ---\n${generalComment}\n` : ''}`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Banner Principal */}
      <div className="bg-gradient-to-r from-purple-900/40 via-zinc-900 to-indigo-950/40 border border-purple-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tu Cuaderno de Decisiones Directas</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Tablero: Lo que Sí y Lo que No
            </h2>
            <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
              Tú mandas en tu proyecto. Marca con un clic qué elementos te gustan, cuáles descartamos y escribe tus observaciones. 
              Todo se guarda automáticamente y puedes enviármelo con un solo clic.
            </p>
          </div>

          <button
            onClick={copyFeedbackSummary}
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition shadow-lg shadow-purple-600/20"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>¡Copiado para el Chat!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Decisiones para el Chat</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Lista de Decisiones */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
          <span className="font-semibold text-zinc-300">Elementos Clave del Negocio ({items.length})</span>
          {saveSuccess && (
            <span className="text-emerald-400 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Cambio guardado
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4">
          {items.map((item) => (
            <div 
              key={item.id}
              className={`p-5 rounded-2xl border transition ${
                item.status === 'SI' 
                  ? 'bg-zinc-900/90 border-emerald-500/40 shadow-sm'
                  : item.status === 'NO'
                  ? 'bg-zinc-950/80 border-red-500/30 opacity-75'
                  : 'bg-zinc-900/60 border-amber-500/30'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                    {item.category}
                  </span>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-400">
                    {item.description}
                  </p>
                </div>

                {/* Botones de Selección */}
                <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800 shrink-0">
                  <button
                    onClick={() => updateStatus(item.id, 'SI')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      item.status === 'SI'
                        ? 'bg-emerald-500 text-zinc-950 shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Sí me gusta</span>
                  </button>

                  <button
                    onClick={() => updateStatus(item.id, 'EN_REVISION')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      item.status === 'EN_REVISION'
                        ? 'bg-amber-500 text-zinc-950 shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Duda / Ajustar</span>
                  </button>

                  <button
                    onClick={() => updateStatus(item.id, 'NO')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      item.status === 'NO'
                        ? 'bg-red-500 text-white shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>No me gusta</span>
                  </button>
                </div>
              </div>

              {/* Campo para Notas Personales */}
              <div className="pt-3">
                <label className="block text-[11px] font-medium text-zinc-400 mb-1">
                  Tu nota u observación sobre este punto:
                </label>
                <input
                  type="text"
                  value={item.userNotes}
                  onChange={(e) => updateNotes(item.id, e.target.value)}
                  placeholder="Escribe lo que piensas de este punto..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Caja de Comentarios Generales */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-purple-400" />
          Notas Generales y Cambios que Desees
        </h3>
        <p className="text-xs text-zinc-400">
          Cualquier idea, color o instrucción que quieras dejar asentada. La leeré y la aplicaré directamente en el código.
        </p>
        <textarea
          rows={4}
          value={generalComment}
          onChange={(e) => setGeneralComment(e.target.value)}
          placeholder="Ejemplo: 'Quiero que el logo tenga una ola azul con dorado', 'El hotel Alameda debería tener cochera para dos autos', etc."
          className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition"
        />
        <div className="flex justify-between items-center pt-2">
          <span className="text-[11px] text-zinc-500">Guardado automáticamente en tu navegador</span>
          <button
            onClick={copyFeedbackSummary}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition border border-zinc-700 flex items-center gap-1.5"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copiar todo al portapapeles</span>
          </button>
        </div>
      </div>
    </div>
  );
}
