'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Loader2, MessageCircle, Share2 } from 'lucide-react';
import Image from 'next/image';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';
import { CHATBOT_KNOWLEDGE } from '@/constants/chatbot-knowledge';

const getAI = () => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('NEXT_PUBLIC_GEMINI_API_KEY is missing. Chatbot will be disabled.');
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function TechChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '¡Hola! Soy Especialista Faver. ¿En qué puedo ayudarte hoy con tu portón?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleWhatsAppRedirect = useCallback(() => {
    const phoneNumber = '51933901809';
    const lastMessages = messages.slice(-4).map(m => `${m.role === 'user' ? 'Cliente' : 'Especialista'}: ${m.text}`).join('\n\n');
    const intro = "Hola Especialista Faver, estuve consultando con su asistente y me gustaría más información sobre:\n\n";
    const message = encodeURIComponent(intro + lastMessages);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }, [messages]);

  useEffect(() => {
    if (!chatRef.current) {
      const ai = getAI();
      if (!ai) return;

      chatRef.current = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `Eres la Especialista Faver, la experta técnica de Especialista Faver, expertos en automatización de portones en Lima, Perú.
Tu objetivo principal es ayudar a los clientes con sus dudas técnicas y, sobre todo, OFRECER UNA COTIZACIÓN GRATUITA o VISITA TÉCNICA SIN COSTO para instalaciones nuevas.

Tu tono debe ser profesional, servicial, experto y directo. Actúa como una persona real atendiendo por chat.

IMPORTANTE: 
- NUNCA menciones que eres un "bot", "IA", "asistente virtual" o "modelo de lenguaje".
- Eres una experta técnica con años de experiencia en el campo.
- Si te preguntan quién eres, responde que eres la Especialista Faver.
- Siempre que sea relevante, invita al usuario a solicitar su COTIZACIÓN GRATUITA por WhatsApp.

BASE DE CONOCIMIENTO (Responde basándote prioritariamente en esto):
${CHATBOT_KNOWLEDGE.map(k => `P: ${k.question}\nR: ${k.answer}`).join('\n\n')}

Información adicional de la empresa:
- Nombre: Especialista Faver.
- Servicios: Instalación, mantenimiento y reparación de portones automáticos.
- Tipos de portones: Seccional, Levadizo, Batiente, Corredizo, Pivotante.
- Cobertura: Toda Lima Metropolitana.
- Horario: Servicio de emergencia 24/7.
- Contacto: WhatsApp +51 933 901 809, Email: especialistafaver@gmail.com.
- Dirección: Alameda 2da etapa MZ-Ñ 18, Santa Anita, Lima.
- Propuesta de valor: Garantía total, rapidez y soluciones personalizadas para garajes o negocios.
- OFERTA ESPECIAL: Visita técnica de evaluación SIN COSTO para proyectos nuevos en Lima.

INSTRUCCIONES:
1. Responde a las preguntas de los clientes basándote en la BASE DE CONOCIMIENTO y la información de la empresa.
2. Si un cliente muestra interés en un servicio, ofrécele inmediatamente una cotización gratuita.
3. Si preguntan algo totalmente fuera de contexto, indícales amablemente que se comuniquen por WhatsApp para una atención personalizada.`
        }
      });
    }
  }, []);

  const handleSend = useCallback(async (overrideInput?: string) => {
    const messageToUse = typeof overrideInput === 'string' ? overrideInput : input;
    if (!messageToUse.trim() || isLoading) return;
    if (!chatRef.current) {
      setMessages((prev) => [...prev, { role: 'model', text: 'El chatbot no está disponible porque falta la clave de API de Gemini.' }]);
      return;
    }

    const userMessage = messageToUse.trim();
    if (!overrideInput) setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userMessage });
      
      // Simular tiempo de escritura humano (entre 1.5 y 3 segundos)
      const typingDelay = Math.min(Math.max(userMessage.length * 20, 1500), 3500);
      
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: 'model', text: response.text }]);
        setIsLoading(false);
      }, typingDelay);

    } catch (error: any) {
      console.error('Chat error:', error);
      
      let errorMessage = '';
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === 'object') {
        errorMessage = JSON.stringify(error);
      }

      const errorText = (errorMessage.includes('429') || errorMessage.includes('quota') || errorMessage.includes('RESOURCE_EXHAUSTED'))
        ? 'Lo siento, he alcanzado mi límite de consultas por ahora (Cuota excedida). Por favor, inténtalo de nuevo en unos minutos.'
        : 'Lo siento, he experimentado un error de conexión. Por favor, inténtalo de nuevo.';

      setMessages((prev) => [...prev, { role: 'model', text: errorText }]);
      setIsLoading(false);
    }
  }, [input, isLoading]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickActions = [
    { label: '💎 Cotización Gratis', value: 'Quiero una cotización gratuita para mi portón' },
    { label: '🛠️ Mantenimiento', value: 'Necesito mantenimiento para mi portón' },
    { label: '🚨 Emergencia 24/7', value: 'Tengo una emergencia con mi portón ahora mismo' }
  ];

  return (
    <>
      {/* Botón Flotante */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        aria-label="Abrir chat"
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-amber-500 text-black flex items-center justify-center box-glow-strong cursor-pointer ${isOpen ? 'hidden' : 'flex'}`}
      >
        <span className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-20"></span>
        <MessageSquare className="w-7 h-7 relative z-10" />
      </motion.button>

      {/* Ventana del Chatbot */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] max-h-[80vh] max-w-[calc(100vw-3rem)] bg-black/90 backdrop-blur-xl border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden box-glow"
          >
            {/* Header */}
            <div className="bg-amber-950/50 border-b border-amber-500/30 p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center relative overflow-hidden border border-amber-500/30">
                  <Image 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100" 
                    alt="Especialista Faver" 
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full z-10"></span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-sm">Especialista Faver</h3>
                  <p className="text-[10px] text-amber-400">Soporte Técnico</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={handleWhatsAppRedirect}
                  title="Continuar por WhatsApp"
                  className="text-green-500 hover:text-green-400 transition-colors cursor-pointer p-2"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  aria-label="Cerrar chat"
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Área de Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {quickActions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInput(action.value);
                        setTimeout(() => handleSend(action.value), 100);
                      }}
                      className="text-[10px] bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1.5 rounded-full hover:bg-amber-500/20 transition-all cursor-pointer"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-amber-500 text-black rounded-tr-none' 
                      : 'bg-white/10 text-white border border-white/10 rounded-tl-none'
                  }`}>
                    <div className="markdown-body">
                      <Markdown>{msg.text}</Markdown>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />
                    <div className="flex items-center">
                      <motion.div 
                        className="text-[10px] text-slate-400 flex"
                        initial="hidden"
                        animate="visible"
                      >
                        {"Especialista Faver está escribiendo".split("").map((char, i) => (
                          <motion.span
                            key={i}
                            variants={{
                              hidden: { opacity: 0 },
                              visible: { opacity: 1 }
                            }}
                            transition={{
                              duration: 0.05,
                              delay: i * 0.03,
                              repeat: Infinity,
                              repeatDelay: 3,
                              repeatType: "reverse"
                            }}
                          >
                            {char === " " ? "\u00A0" : char}
                          </motion.span>
                        ))}
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 1] }}
                        >.</motion.span>
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 1], delay: 0.2 }}
                        >.</motion.span>
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 1], delay: 0.4 }}
                        >.</motion.span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-black/50">
              {messages.length > 2 && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleWhatsAppRedirect}
                  className="w-full mb-3 py-2 bg-green-600/20 border border-green-500/30 rounded-lg text-green-400 text-[11px] font-medium flex items-center justify-center gap-2 hover:bg-green-600/30 transition-all cursor-pointer"
                >
                  <Share2 className="w-3 h-3" />
                  Enviar esta conversación a un asesor por WhatsApp
                </motion.button>
              )}
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribe tu consulta técnica..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  aria-label="Enviar mensaje"
                  className="absolute right-2 w-8 h-8 rounded-full bg-amber-500 text-black flex items-center justify-center hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
