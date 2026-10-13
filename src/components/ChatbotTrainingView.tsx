import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Sliders, 
  BookOpen, 
  CheckCircle2, 
  RefreshCw, 
  Plus, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  HelpCircle,
  BrainCircuit,
  Settings,
  ChevronRight
} from 'lucide-react';
import { LCMLogo } from './LCMLogo';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

interface TrainingRule {
  id: string;
  categoria: string;
  regla: string;
  ejemploRespuesta: string;
}

const DEFAULT_TRAINING_RULES: TrainingRule[] = [
  {
    id: 'TR-01',
    categoria: 'Discreción y Privacidad',
    regla: 'Nunca solicitar datos personales innecesarios. Resaltar check-in vehicular directo y confidencialidad absoluta.',
    ejemploRespuesta: 'Tu llegada es 100% privada con acceso vehicular directo sin pasar por mostrador si pagas en línea.'
  },
  {
    id: 'TR-02',
    categoria: 'Tarifa Dinámica por Tiempo',
    regla: 'Ofrecer modalidades de 4 horas, 6 horas y noche completa adaptadas al momento del día.',
    ejemploRespuesta: 'Contamos con estancias de 4 horas desde $320 MXN, 6 horas y noche completa según la propiedad seleccionada.'
  },
  {
    id: 'TR-03',
    categoria: 'Prospección Hoteleros (LCM)',
    regla: 'Si el usuario es dueño o administrador de un hotel, explicar el esquema 100% a resultados con el 15% sobre el incremento real.',
    ejemploRespuesta: 'Para propietarios y hoteleros trabajamos con Total Revenue Management sin costos fijos: solo cobramos el 15% sobre el nuevo ingreso que generemos.'
  },
  {
    id: 'TR-04',
    categoria: 'Métodos de Pago',
    regla: 'Aclarar que se aceptan pagos en línea por SPEI inmediato, tarjeta bancaria, OXXO Pay y efectivo al llegar.',
    ejemploRespuesta: 'Puedes pagar en línea con tarjeta o SPEI para tener tu suite apartada, o liquidar al llegar en caseta vehicular.'
  }
];

export function ChatbotTrainingView() {
  const [activeTab, setActiveTab] = useState<'chat' | 'entrenamiento'>('chat');
  
  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-01',
      sender: 'bot',
      text: '¡Hola! Soy el Asistente Virtual Blue Ocean Concierge & Revenue. ¿Buscas reservar una suite para estancia de 4h/6h o deseas información para implementar Pricing Dinámico en tu hotel?',
      timestamp: 'Ahora'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Training State
  const [trainingRules, setTrainingRules] = useState<TrainingRule[]>(DEFAULT_TRAINING_RULES);
  const [newCategory, setNewCategory] = useState('');
  const [newRule, setNewRule] = useState('');
  const [newExample, setNewExample] = useState('');
  const [trainingSavedAlert, setTrainingSavedAlert] = useState(false);

  // Auto-scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chatbot/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, history: messages.slice(-4) })
      });

      if (res.ok) {
        const data = await res.json();
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: data.reply || 'Entendido. Con gusto te atiendo con la disponibilidad de las propiedades.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        throw new Error('Fallback rule engine');
      }
    } catch {
      // Motor de fallback inteligente basado en reglas entrenadas
      setTimeout(() => {
        let reply = 'Con gusto te asesoro. Contamos con 6 propiedades modelo en CDMX (Excalibur, Novoa, 3 Culturas, San Francisco, Savoy y Arizona) con tarifas desde $320 por 4 horas y check-in vehicular.';
        
        const lower = userText.toLowerCase();
        if (lower.includes('precio') || lower.includes('costo') || lower.includes('tarifa') || lower.includes('cuanto')) {
          reply = 'Nuestras tarifas de estancia corta van desde $320 MXN por 4 horas (Hotel Novoa) hasta $480 MXN (Hotel Excalibur con jacuzzi doble). También contamos con estancia nocturna desde $500 MXN.';
        } else if (lower.includes('hotelero') || lower.includes('dueño') || lower.includes('comision') || lower.includes('propiedad')) {
          reply = 'Para dueños de hoteles y moteles, Luis César Monroy y Blue Ocean aplican Total Revenue Management con un esquema 100% a resultados: el hotel retiene el 85% y nosotros el 15% sobre el incremento real medible.';
        } else if (lower.includes('jacuzzi') || lower.includes('vapor') || lower.includes('amenidades')) {
          reply = 'El Hotel Excalibur y Hotel Savoy cuentan con jacuzzi doble y tina de hidromasaje. Además el Hotel 3 Culturas ofrece suites temáticas con restaurante bar las 24 horas.';
        } else if (lower.includes('pago') || lower.includes('pagar') || lower.includes('tarjeta') || lower.includes('spei')) {
          reply = 'Puedes pagar en línea mediante tarjeta de crédito/débito, transferencia SPEI automatizada 24/7, OXXO Pay o pagar en caseta vehicular al llegar con total discreción.';
        }

        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      }, 700);
    } finally {
      setIsTyping(false);
    }
  };

  const handleAddTrainingRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim() || !newRule.trim()) return;

    const added: TrainingRule = {
      id: `TR-${trainingRules.length + 1}`,
      categoria: newCategory,
      regla: newRule,
      ejemploRespuesta: newExample || 'Respuesta generada según la directriz.'
    };

    setTrainingRules(prev => [added, ...prev]);
    setNewCategory('');
    setNewRule('');
    setNewExample('');
    setTrainingSavedAlert(true);
    setTimeout(() => setTrainingSavedAlert(false), 3000);
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-[#00172e] text-white p-3 sm:p-6 flex flex-col justify-between font-sans">
      <div className="max-w-6xl mx-auto w-full space-y-4">
        
        {/* Cabecera */}
        <div className="bg-[#002244] border-2 border-[#d4af37]/60 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 text-left">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#f5d77f] font-sans text-[10px] font-bold uppercase">
                Módulo IA • Blue Ocean Concierge
              </span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Agente en Entrenamiento
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-serif tracking-tight">
              Chatbot & Centro de Entrenamiento de Agente
            </h2>
            <p className="text-xs text-blue-200">
              Entrena y calibra las respuestas del bot para captar huéspedes de microestancia y atender propietarios hoteleros.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-[#d4af37] text-black font-black shadow-md'
                  : 'bg-black/40 text-blue-200 border border-blue-700/60 hover:text-white'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>Simulador de Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('entrenamiento')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'entrenamiento'
                  ? 'bg-[#d4af37] text-black font-black shadow-md'
                  : 'bg-black/40 text-blue-200 border border-blue-700/60 hover:text-white'
              }`}
            >
              <BrainCircuit className="w-4 h-4" />
              <span>Retomar Entrenamiento</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* VISTA 1: SIMULADOR DE CHAT EN VIVO */}
        {/* ========================================================= */}
        {activeTab === 'chat' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Ventana de Chat */}
            <div className="lg:col-span-8 bg-[#001f3f] border border-blue-800/60 rounded-2xl p-4 flex flex-col justify-between h-[520px] shadow-xl text-left">
              
              {/* Barra del Chat */}
              <div className="border-b border-blue-900/60 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#d4af37] text-black flex items-center justify-center font-bold">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">Blue Ocean Concierge AI</h4>
                    <span className="text-[10px] text-zinc-400">Modelo entrenado para estancia corta y TRM</span>
                  </div>
                </div>

                <button
                  onClick={() => setMessages([
                    {
                      id: 'msg-init',
                      sender: 'bot',
                      text: '¡Hola! ¿En qué puedo ayudarte hoy? ¿Deseas cotizar una estancia por horas o conocer la metodología de Revenue Management para tu hotel?',
                      timestamp: 'Ahora'
                    }
                  ])}
                  className="text-zinc-400 hover:text-white text-xs flex items-center gap-1 cursor-pointer"
                  title="Reiniciar conversación"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reiniciar</span>
                </button>
              </div>

              {/* Mensajes */}
              <div className="flex-1 overflow-y-auto space-y-3 py-3 pr-1">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] p-3 rounded-2xl text-xs leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-[#d4af37] text-black font-semibold rounded-tr-none'
                          : 'bg-black/50 border border-blue-700/50 text-white rounded-tl-none'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[9px] text-zinc-400 mt-1 px-1">{m.timestamp}</span>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-black/40 text-blue-200 text-xs w-28">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-ping" />
                    <span className="text-[11px]">Escribiendo...</span>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Input y Envío */}
              <div className="pt-2 border-t border-blue-900/60 flex gap-2">
                <input
                  type="text"
                  placeholder="Pregunta sobre tarifas, jacuzzi, acceso vehicular o comisiones..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                  className="flex-1 text-xs p-3 rounded-xl bg-black/50 border border-blue-600/40 text-white focus:outline-none focus:border-[#d4af37]"
                />
                <button
                  onClick={() => handleSendMessage(inputMessage)}
                  className="px-4 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#c49f27] text-black font-bold text-xs transition cursor-pointer flex items-center gap-1 shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Enviar</span>
                </button>
              </div>

            </div>

            {/* Atajos Rápidos de Prueba */}
            <div className="lg:col-span-4 space-y-3 text-left">
              <div className="p-4 rounded-2xl bg-[#002244] border border-blue-800/60 space-y-3">
                <div className="flex items-center gap-1.5 text-[#f5d77f]">
                  <HelpCircle className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Preguntas de Prueba Rápida:
                  </span>
                </div>
                <p className="text-[11px] text-zinc-300">
                  Haz clic en cualquiera para probar cómo responde el bot a las dudas más comunes de tus huéspedes y clientes:
                </p>

                <div className="space-y-1.5">
                  {[
                    '¿Cuánto cuesta una suite con jacuzzi por 4 horas?',
                    '¿Cómo es el check-in vehicular discreto?',
                    '¿Aceptan pago por transferencia SPEI o tarjeta?',
                    'Soy dueño de un hotel, ¿cómo funciona su comisión a resultados?',
                    '¿Tienen servicio de comida o bar a la habitación?'
                  ].map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="w-full p-2.5 rounded-xl bg-black/40 hover:bg-[#d4af37]/20 border border-blue-700/40 hover:border-[#d4af37] text-left text-xs text-blue-100 transition cursor-pointer flex items-center justify-between group"
                    >
                      <span className="line-clamp-1">{q}</span>
                      <ChevronRight className="w-3 h-3 text-[#d4af37] shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Tarjeta Informativa de Estado */}
              <div className="p-4 rounded-2xl bg-black/40 border border-[#d4af37]/40 space-y-2">
                <span className="text-xs font-sans font-bold text-[#f5d77f] uppercase">
                  Parámetros de Entrenamiento
                </span>
                <div className="text-[11px] text-zinc-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Motor:</span>
                    <span className="font-bold text-white">Gemini + Core TRM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tono:</span>
                    <span className="font-bold text-white">Discreto, Ejecutivo, Directo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reglas Activas:</span>
                    <span className="font-bold text-emerald-400">{trainingRules.length} Directrices</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* VISTA 2: CENTRO DE ENTRENAMIENTO (RETOMAR ENTRENAMIENTO) */}
        {/* ========================================================= */}
        {activeTab === 'entrenamiento' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 text-left">
            
            {/* Formulario para Agregar Nuevas Reglas */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-[#001f3f] border border-blue-800/60 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-[#f5d77f] border-b border-blue-900 pb-2">
                <BrainCircuit className="w-5 h-5 text-[#d4af37]" />
                <h3 className="text-sm sm:text-base font-bold text-white font-serif">
                  Agregar Nueva Directriz de Entrenamiento
                </h3>
              </div>

              {trainingSavedAlert && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>¡Directriz aprendida e incorporada al modelo con éxito!</span>
                </div>
              )}

              <form onSubmit={handleAddTrainingRule} className="space-y-3">
                <div>
                  <label className="text-xs text-zinc-300 font-bold block mb-1">
                    Categoría o Tema:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Facturación, Estacionamiento, Horas Valle..."
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg bg-black/60 border border-blue-500/40 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-300 font-bold block mb-1">
                    Instrucción / Regla de Comportamiento:
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Ej: Si el cliente pregunta por facturación para transportistas, especificar que expedimos CFDI 4.0 con IVA desglosado para deducir viáticos."
                    value={newRule}
                    onChange={(e) => setNewRule(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg bg-black/60 border border-blue-500/40 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-300 font-bold block mb-1">
                    Ejemplo de Respuesta Ideal (Opcional):
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ej: Sí, emitimos factura fiscal CFDI 4.0 de forma inmediata con IVA desglosado."
                    value={newExample}
                    onChange={(e) => setNewExample(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg bg-black/60 border border-blue-500/40 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#c49f27] text-black font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-lg flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Guardar e Incorporar al Chatbot</span>
                </button>
              </form>
            </div>

            {/* Listado de Directrices Activas Entrenadas */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#f5d77f]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    Base de Conocimiento Actual ({trainingRules.length} Reglas Entrenadas):
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                {trainingRules.map((rule) => (
                  <div
                    key={rule.id}
                    className="p-3.5 rounded-xl bg-black/40 border border-blue-800/60 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f5d77f] font-sans text-[9px] font-bold">
                        {rule.categoria}
                      </span>
                      <span className="text-[9px] font-sans text-zinc-400">{rule.id}</span>
                    </div>

                    <p className="text-xs text-white leading-relaxed font-medium">
                      {rule.regla}
                    </p>

                    <div className="p-2 rounded-lg bg-blue-950/80 border border-blue-700/40 text-[11px] text-cyan-200">
                      <span className="font-bold text-zinc-400 block text-[9px]">Respuesta Aprendida:</span>
                      "{rule.ejemploRespuesta}"
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
