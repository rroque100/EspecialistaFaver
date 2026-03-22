'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { X, Maximize2, Cpu, Settings2, Play, Film } from 'lucide-react';

// Componente optimizado: Solo carga el video cuando el usuario interactúa (hover)
const VideoItem = ({ src, model }: { src: string; model: string }) => {
  const [isInteracted, setIsInteracted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div 
      className="absolute inset-0 bg-zinc-800 flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsInteracted(true)}
    >
      {isInteracted ? (
        <motion.video
          ref={videoRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          src={src}
          muted
          loop
          playsInline
          autoPlay
          className="w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-20"
        />
      ) : (
        <div className="flex flex-col items-center gap-3 opacity-20 group-hover:opacity-40 transition-opacity">
          <Film className="w-12 h-12 text-white" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-white">Cargar Vista Previa</span>
        </div>
      )}
      
      <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity z-10">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
          <Play className="w-8 h-8 text-white fill-white/20" />
        </div>
      </div>
    </div>
  );
};

// Datos de la galería (Imágenes y Videos)
const projects = [
  {
    id: 1,
    type: 'image',
    src: '/images/instalacion_porton.webp',
    model: 'Seccional Premium',
    motor: 'LiftMaster 8550W',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 6,
    type: 'image',
    src: '/images/garage_tech1.webp',
    model: 'Instalación Residencial',
    motor: 'Sistema Seccional',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 7,
    type: 'image',
    src: '/images/mantenimiento_porton.webp',
    model: 'Mantenimiento Experto',
    motor: 'Ajuste de Precisión',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 8,
    type: 'video',
    src: '/videos/prueba_horizontal_1.mp4',
    model: 'Prueba de Apertura H1',
    motor: 'Motor Industrial',
    span: 'md:col-span-2 md:row-span-1',
  },
  {
    id: 11,
    type: 'video',
    src: '/videos/prueba_vertical_1.mp4',
    model: 'Prueba Móvil V1',
    motor: 'Control Remoto',
    span: 'md:col-span-1 md:row-span-2',
  },
  {
    id: 2,
    type: 'image',
    src: '/images/garage_tech2.webp',
    model: 'Mantenimiento Preventivo',
    motor: 'Sommer evo+',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 9,
    type: 'video',
    src: '/videos/prueba_horizontal_2.mp4',
    model: 'Prueba de Cierre H2',
    motor: 'Sensor de Seguridad',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 12,
    type: 'video',
    src: '/videos/prueba_vertical_2.mp4',
    model: 'Prueba Móvil V2',
    motor: 'App Smartphone',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 3,
    type: 'image',
    src: '/images/garage_tech3.webp',
    model: 'Instalación Industrial',
    motor: 'BFT Deimos Ultra',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 10,
    type: 'video',
    src: '/videos/prueba_horizontal_3.mp4',
    model: 'Prueba Final H3',
    motor: 'Sistema Silencioso',
    span: 'md:col-span-2 md:row-span-1',
  },
  {
    id: 13,
    type: 'video',
    src: '/videos/prueba_vertical_3.mp4',
    model: 'Prueba Móvil V3',
    motor: 'Batería de Respaldo',
    span: 'md:col-span-1 md:row-span-1',
  },
];

export default function Gallery() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Bloquear el scroll cuando el lightbox está abierto
  useEffect(() => {
    if (selectedId !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedId]);

  const selectedProject = projects.find((p) => p.id === selectedId);

  return (
    <section id="galeria" className="py-24 relative z-10 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
          >
            Portafolio
          </motion.div>
          <motion.h2
            className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Instalaciones <span className="text-amber-400">Reales</span>
          </motion.h2>
          <motion.p
            className="text-slate-400 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Explore nuestra galería de proyectos recientes. Instalaciones de alta precisión y automatización avanzada en toda Lima.
          </motion.p>
        </div>

        {/* Grid Asimétrico */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[350px]">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              layoutId={`card-container-${project.id}`}
              className={`relative group overflow-hidden rounded-[2.5rem] cursor-pointer bg-zinc-900/40 border border-white/5 w-full h-full min-h-[350px] ${project.span}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedId(project.id)}
              role="button"
              tabIndex={0}
              aria-label={`Ver detalles de ${project.model}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedId(project.id);
                }
              }}
            >
              {/* Imagen o Video de fondo */}
              {project.type === 'image' ? (
                <Image
                  src={project.src}
                  alt={project.model}
                  fill
                  sizes={project.span.includes('col-span-2') 
                    ? "(max-width: 768px) 100vw, 66vw" 
                    : "(max-width: 768px) 100vw, 33vw"}
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-30"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <VideoItem src={project.src} model={project.model} />
              )}

              {/* Efecto de Escaneo Neón (Hover) */}
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-amber-400/0 via-amber-400/10 to-amber-400/0 opacity-0 group-hover:opacity-100 group-hover:animate-scan pointer-events-none z-10">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-amber-400/50 box-glow"></div>
              </div>

              {/* Overlay Oscuro */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Contenido Superpuesto (Datos Técnicos) */}
              <div className="absolute inset-0 p-10 flex flex-col justify-end z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white mb-2 flex items-center gap-2">
                      {project.model}
                    </h3>
                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-widest">
                        <Cpu className="w-3 h-3" />
                        <span>SISTEMA {project.model}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-mono uppercase tracking-widest">
                        <Settings2 className="w-3 h-3" />
                        <span>MOTOR {project.motor}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:box-glow">
                    <Maximize2 className="w-5 h-5 text-amber-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal a Pantalla Completa */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-xl"
            onClick={() => setSelectedId(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-amber-500/20 hover:text-amber-400 hover:border-amber-500/50 transition-all cursor-pointer z-[110]"
              aria-label="Cerrar galería"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedId(null);
              }}
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              layoutId={`card-container-${selectedProject.id}`}
              className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 box-glow-strong"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedProject.type === 'image' ? (
                <Image
                  src={selectedProject.src}
                  alt={selectedProject.model}
                  fill
                  sizes="100vw"
                  className="object-contain md:object-cover"
                  referrerPolicy="no-referrer"
                  priority
                  unoptimized={false}
                />
              ) : (
                <video
                  src={selectedProject.src}
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  className="w-full h-full object-contain"
                />
              )}
              
              {/* Datos en el Lightbox */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8"
              >
                <h3 className="text-3xl font-display font-bold text-white mb-4">
                  {selectedProject.model}
                </h3>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2 text-amber-400 font-mono">
                    <Cpu className="w-5 h-5" />
                    <span>Sistema: {selectedProject.model}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 font-mono">
                    <Settings2 className="w-5 h-5" />
                    <span>Motorización: {selectedProject.motor}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
