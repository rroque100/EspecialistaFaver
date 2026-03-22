'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Sparkles, Camera, CheckCircle2, Loader2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { GoogleGenAI, Type } from '@google/genai';

const getAI = () => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('NEXT_PUBLIC_GEMINI_API_KEY is missing. AI features will be disabled.');
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

const CATALOG = [
  'Seccional Aluminio',
  'Levadizo PVC Blanco',
  'Batiente Madera Rústica',
  'Seccional Doble Cristal',
  'Corredizo Industrial'
];

export default function FacadeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingText, setLoadingText] = useState('Analizando Arquitectura...');
  const [result, setResult] = useState<{ modelo: string; color: string; justificacion: string; generatedImage?: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setResult(null);
    }
  };

  const analyzeFacade = async () => {
    if (!file || !preview) return;
    
    const ai = getAI();
    if (!ai) {
      alert('Error: La clave de API de Gemini no está configurada en el servidor. Por favor, contacte con el administrador.');
      return;
    }

    setIsAnalyzing(true);
    setLoadingText('Analizando Arquitectura...');
    setResult(null);

    try {
      // Extraer datos base64 sin el prefijo data:image/...;base64,
      const base64Data = preview.split(',')[1];
      const mimeType = file.type;

      const prompt = `Actúa como un experto de Especialista Faver en diseño y automatización de portones.
Analiza la fachada de esta casa y recomienda el mejor portón de nuestro catálogo para mejorar la estética y seguridad.
Catálogo disponible: ${CATALOG.join(', ')}.
Selecciona el modelo que mejor se adapte, sugiere un color específico que complemente la casa, y justifica tu decisión brevemente basándote en la arquitectura, materiales y colores de la fachada.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType } },
            { text: prompt }
          ]
        },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              modelo: { type: Type.STRING, description: 'El modelo seleccionado del catálogo' },
              color: { type: Type.STRING, description: 'El color sugerido' },
              justificacion: { type: Type.STRING, description: 'Breve justificación arquitectónica' }
            },
            required: ['modelo', 'color', 'justificacion']
          }
        }
      });

      const jsonStr = response.text?.trim();
      if (jsonStr) {
        const parsed = JSON.parse(jsonStr);
        
        setLoadingText('Generando visualización IA...');
        
        let generatedImageUrl = undefined;
        try {
          const imgPrompt = `Edit image: replace the garage door with a ${parsed.modelo} garage door in ${parsed.color} color.`;
          
          const imgResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
              parts: [
                { inlineData: { data: base64Data, mimeType } },
                { text: imgPrompt }
              ]
            }
          });

          if (imgResponse.candidates?.[0]?.content?.parts) {
            for (const part of imgResponse.candidates[0].content.parts) {
              if (part.inlineData) {
                generatedImageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
                break;
              }
            }
          }
        } catch (imgError: any) {
          console.error('Error generating preview image:', imgError);
          // We don't throw here, we just continue without the image
        }

        setResult({ ...parsed, generatedImage: generatedImageUrl });
      }
    } catch (error: any) {
      console.error('Error analyzing facade:', error);
      
      let errorMessage = '';
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === 'object') {
        errorMessage = JSON.stringify(error);
      }

      if (errorMessage.includes('429') || errorMessage.includes('quota') || errorMessage.includes('RESOURCE_EXHAUSTED')) {
        alert('Se ha excedido el límite de peticiones a la Inteligencia Artificial (Cuota excedida). Mostrando un resultado de demostración.');
        
        // Fallback mock result so the UI doesn't break
        const randomModel = CATALOG[Math.floor(Math.random() * CATALOG.length)];
        setResult({
          modelo: randomModel,
          color: 'Gris Antracita',
          justificacion: 'Este es un resultado de demostración porque la cuota de la IA se ha agotado temporalmente. En un escenario real, la IA analizaría su fachada y le daría una recomendación personalizada basada en la arquitectura y los colores de su casa.',
          generatedImage: preview // Fallback to the original image
        });
      } else {
        alert('Hubo un error al analizar la fachada. Por favor, inténtelo de nuevo.');
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="visualizador" className="py-24 relative z-10 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
          >
            <Sparkles className="w-3 h-3" />
            IA Integrada
          </motion.div>
          <motion.h2
            className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Visualizador de <span className="text-amber-400">Estilos</span>
          </motion.h2>
          <motion.p
            className="text-slate-400 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Suba una foto de su fachada y nuestra Inteligencia Artificial analizará la arquitectura para recomendarle el portón perfecto.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Zona de Subida */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-sm flex flex-col"
          >
            <div 
              className="flex-1 border-2 border-dashed border-amber-500/20 rounded-[2rem] p-8 text-center hover:bg-amber-500/5 transition-colors cursor-pointer relative overflow-hidden group flex flex-col items-center justify-center"
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  fileInputRef.current?.click();
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Subir foto de la fachada"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
              
              {preview ? (
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl min-h-[200px]">
                  <Image 
                    src={preview} 
                    alt="Vista previa de la fachada subida" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw" 
                    className="object-cover" 
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white font-medium flex items-center gap-2 bg-black/60 px-4 py-2 rounded-full backdrop-blur-md">
                      <Camera className="w-5 h-5" /> Cambiar foto
                    </p>
                  </div>
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-amber-500/20">
                    <Upload className="w-10 h-10 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Subir foto de la fachada</h3>
                  <p className="text-slate-400 text-sm max-w-xs mx-auto">Arrastre una imagen o haga clic para explorar (JPG, PNG)</p>
                </div>
              )}
            </div>

            <button
              onClick={analyzeFacade}
              disabled={!file || isAnalyzing}
              className="w-full mt-8 bg-amber-500 text-black font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-amber-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed box-glow text-lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Analizando Arquitectura...
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6" />
                  Analizar Fachada con IA
                </>
              )}
            </button>
          </motion.div>

          {/* Resultados */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <AnimatePresence mode="wait">
              {!result && !isAnalyzing && (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center p-12 border border-white/5 rounded-[2.5rem] bg-zinc-900/20"
                >
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <ImageIcon className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Esperando Imagen</h3>
                  <p className="text-slate-400 max-w-xs">El resultado del análisis aparecerá aquí una vez que subas una foto.</p>
                </motion.div>
              )}

              {isAnalyzing && (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center p-12 border border-amber-500/20 rounded-[2.5rem] bg-amber-500/5 box-glow"
                >
                  <div className="relative w-28 h-28 mb-8">
                    <div className="absolute inset-0 border-4 border-amber-500/10 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-amber-500 rounded-full border-t-transparent animate-spin"></div>
                    <Sparkles className="absolute inset-0 m-auto w-10 h-10 text-amber-400 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-3">Procesando Imagen</h3>
                  <p className="text-amber-400/70 font-mono text-sm tracking-widest uppercase">{loadingText}</p>
                </motion.div>
              )}

              {result && !isAnalyzing && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-zinc-900/40 border border-amber-500/20 rounded-[2.5rem] p-10 box-glow relative overflow-hidden flex-1 flex flex-col"
                >
                  <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                    <Sparkles className="w-48 h-48 text-amber-400" />
                  </div>
                  
                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 border border-amber-500/30">
                        <CheckCircle2 className="w-7 h-7 text-amber-400" />
                      </div>
                      <h3 className="text-3xl font-display font-bold text-white">Recomendación IA</h3>
                    </div>

                    {result.generatedImage && (
                      <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-8 border border-white/5 shadow-2xl min-h-[200px]">
                        <Image 
                          src={result.generatedImage} 
                          alt={`Visualización generada del portón ${result.modelo}`} 
                          fill 
                          sizes="(max-width: 768px) 100vw, 50vw" 
                          className="object-cover" 
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold text-amber-400 border border-amber-500/30 flex items-center gap-2 uppercase tracking-widest">
                          <Sparkles className="w-3.5 h-3.5" /> IA Preview
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-black/40 border border-white/5 rounded-2xl p-6">
                        <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">Modelo</p>
                        <p className="text-xl font-bold text-amber-400">{result.modelo}</p>
                      </div>

                      <div className="bg-black/40 border border-white/5 rounded-2xl p-6">
                        <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">Color</p>
                        <p className="text-xl font-bold text-white">{result.color}</p>
                      </div>
                    </div>

                    <div className="bg-black/40 border border-white/5 rounded-2xl p-6 flex-1">
                      <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-3">Justificación</p>
                      <p className="text-slate-300 text-base leading-relaxed">{result.justificacion}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
