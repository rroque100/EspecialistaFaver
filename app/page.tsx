'use client';

import { motion } from 'motion/react';
import { 
  Wrench, 
  Zap, 
  Shield, 
  ChevronRight, 
  Phone, 
  Menu, 
  X, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Award,
  MessageSquare,
  Mail,
  ExternalLink,
  Settings,
  CheckCircle,
  Star,
  HelpCircle,
  Play
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Gallery from '@/components/Gallery';
import FacadeAnalyzer from '@/components/FacadeAnalyzer';
import TechChatbot from '@/components/TechChatbot';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black overflow-hidden flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/5" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 md:w-14 md:h-14">
                <Image 
                  src="/logo.png" 
                  alt="Especialista Faver Logo" 
                  fill 
                  sizes="(max-width: 768px) 48px, 56px"
                  className="object-contain"
                  priority
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-lg md:text-xl tracking-wider text-white">
                  FAVER
                </span>
                <span className="text-amber-400 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
                  ESPECIALISTA
                </span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8" role="navigation">
              <a href="#inicio" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm">Inicio</a>
              <a href="#servicios" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm">Servicios</a>
              <a href="#galeria" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm">Galería</a>
              <a href="#contacto" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm">Contacto</a>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex">
              <a 
                href="https://wa.me/51933901809" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Llamar a Especialista Faver"
                className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/50 text-amber-400 px-5 py-2.5 rounded-full font-medium hover:bg-amber-500/20 hover:box-glow transition-all duration-300 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>+51 933 901 809</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-slate-300 hover:text-white cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24 px-4 md:hidden"
        >
            <div className="flex flex-col gap-6 items-center" role="navigation">
              <a href="#inicio" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-300 hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm">Inicio</a>
              <a href="#servicios" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-300 hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm">Servicios</a>
              <a href="#galeria" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-300 hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm">Galería</a>
              <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-300 hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm">Contacto</a>
              <button 
                className="flex items-center gap-2 bg-amber-500 text-black px-6 py-3 rounded-full font-bold mt-4 w-full justify-center box-glow-strong cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                onClick={() => window.open('https://wa.me/51933901809', '_blank', 'noopener,noreferrer')}
                aria-label="Contactar por WhatsApp Directo"
              >
                <Phone className="w-5 h-5" />
                <span>WhatsApp Directo</span>
              </button>
            </div>
        </motion.div>
      )}

      <main className="flex-1">
        {/* Hero Section - Bento Style */}
      <section id="inicio" className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Main Hero Tile */}
            <motion.div 
              className="lg:col-span-8 bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden min-h-[500px] flex flex-col justify-end"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/modern-gate.webp"
                  alt="Portón moderno"
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="w-16 h-16 relative bg-black/40 rounded-full border border-white/10 p-1 backdrop-blur-sm"
                  >
                    <Image 
                      src="/logo.png" 
                      alt="Logo Faver" 
                      fill 
                      sizes="64px"
                      className="object-contain p-1"
                      priority
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold tracking-[0.2em] uppercase"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                    Líderes en Lima
                  </motion.div>
                </div>
                
                <h1 className="text-5xl md:text-8xl font-display font-bold text-white leading-[0.9] tracking-tighter mb-6">
                  Portones <br/>
                  <span className="text-amber-500">Inteligentes.</span>
                </h1>
                
                <p className="text-slate-400 text-lg max-w-md leading-relaxed mb-8">
                  Seguridad de alto nivel y automatización fluida para residencias que exigen lo mejor.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://wa.me/51933901809"
                    target="_blank"
                    className="bg-amber-500 text-black px-8 py-4 rounded-2xl font-bold hover:bg-amber-400 transition-all box-glow-strong flex items-center gap-2"
                  >
                    <span>Cotizar Proyecto</span>
                    <ChevronRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Side Tiles */}
            <div className="lg:col-span-4 grid grid-cols-1 gap-4">
              {/* Trust Tile */}
              <motion.div 
                className="bg-zinc-900/60 border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between group hover:border-amber-500/30 transition-all"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                role="article"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Garantía Real</h2>
                  <p className="text-slate-400 text-sm">Respaldamos cada instalación con soporte técnico certificado de por vida.</p>
                </div>
              </motion.div>

              {/* Emergency Tile */}
              <motion.div 
                className="bg-amber-500 rounded-[2.5rem] p-8 flex flex-col justify-between group cursor-pointer hover:scale-[1.02] transition-all"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => window.location.href = 'tel:+51933901809'}
                role="button"
                tabIndex={0}
                aria-label="Llamar a emergencias 24/7"
                onKeyDown={(e) => e.key === 'Enter' && (window.location.href = 'tel:+51933901809')}
              >
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-black/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-black" />
                  </div>
                  <div className="text-[10px] font-bold text-black/60 uppercase tracking-widest border border-black/20 px-2 py-1 rounded-md">
                    Urgente
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black mb-1">Reparación 24/7</h2>
                  <p className="text-black/70 text-sm font-medium">¿Portón trabado? Llegamos en menos de 60 minutos.</p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Section - Bento Layout */}
      <section id="servicios" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-none mb-4">
                Soluciones <br/>
                <span className="text-amber-500">Sin Fricción.</span>
              </h2>
            </div>
            <p className="text-slate-400 max-w-xs text-sm">
              Desde la primera piedra hasta el último bit de configuración. Ingeniería aplicada a tu comodidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Service 1 - Large */}
            <motion.div 
              className="md:col-span-2 bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between min-h-[400px] group hover:border-amber-500/30 transition-all relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-amber-500" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Instalación de Sistemas</h3>
                <p className="text-slate-400 max-w-md leading-relaxed">
                  Seccionales, levadizos y corredizos con motores de alto tráfico. Diseñamos la entrada perfecta para tu arquitectura.
                </p>
              </div>
              <div className="relative z-10 mt-8">
                <a href="https://wa.me/51933901809" target="_blank" className="inline-flex items-center gap-2 text-amber-500 font-bold hover:gap-4 transition-all">
                  Ver opciones de diseño <ChevronRight className="w-5 h-5" />
                </a>
              </div>
              {/* Abstract decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
            </motion.div>

            {/* Service 2 */}
            <motion.div 
              className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between group hover:border-amber-500/30 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
                  <Wrench className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Mantenimiento</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Prevención inteligente. Ajustes de precisión para que tu portón nunca sea una preocupación.
                </p>
              </div>
              <div className="mt-8">
                <div className="text-xs font-bold text-amber-500/50 uppercase tracking-widest">Plan Trimestral Disponible</div>
              </div>
            </motion.div>

            {/* Service 3 */}
            <motion.div 
              className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between group hover:border-amber-500/30 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
                  <Zap className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Electrónica</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Reparación de tarjetas, controles y sensores. Devolvemos la inteligencia a tu sistema.
                </p>
              </div>
              <div className="mt-8">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-zinc-800"></div>
                  ))}
                  <div className="flex items-center ml-4 text-[10px] text-slate-500 font-bold uppercase tracking-tighter">+500 Reparaciones</div>
                </div>
              </div>
            </motion.div>

            {/* Service 4 - Wide */}
            <motion.div 
              className="md:col-span-2 bg-gradient-to-r from-amber-500/10 to-transparent border border-white/5 rounded-[2.5rem] p-10 flex items-center justify-between group hover:border-amber-500/30 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="max-w-md">
                <h3 className="text-2xl font-bold text-white mb-2">Modernización de Portones</h3>
                <p className="text-slate-500 text-sm">Convertimos tu antiguo portón manual en un sistema automático de última generación.</p>
              </div>
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-all">
                <ChevronRight className="w-6 h-6" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery />

      {/* Process Section - Bento Style */}
      <section className="py-24 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 w-fit"
              >
                Metodología
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">
                Tu nuevo portón en <span className="text-amber-400">3 pasos</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                Simplificamos el proceso para que disfrutes de seguridad y comodidad sin complicaciones.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Cotización",
                  desc: "Evaluamos tu espacio y necesidades para darte un presupuesto exacto.",
                  icon: <MessageSquare className="w-6 h-6" />
                },
                {
                  step: "02",
                  title: "Diseño",
                  desc: "Seleccionamos los materiales y el sistema de automatización ideal.",
                  icon: <Settings className="w-6 h-6" />
                },
                {
                  step: "03",
                  title: "Instalación",
                  desc: "Nuestro equipo experto realiza el montaje y pruebas de seguridad.",
                  icon: <CheckCircle className="w-6 h-6" />
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden group hover:border-amber-500/20 transition-all"
                >
                  <div className="text-5xl font-display font-black text-white/5 absolute top-4 right-6 group-hover:text-amber-500/10 transition-colors">
                    {item.step}
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Facade Analyzer Section */}
      <FacadeAnalyzer />

      {/* Testimonials Section - Bento Style */}
      <section className="py-24 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
            >
              <Star className="w-3 h-3 fill-amber-400" />
              Casos de Éxito
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
              Lo que dicen <span className="text-amber-400">nuestros clientes</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Video Testimonial - Vertical Mobile Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:row-span-2 bg-zinc-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden relative group cursor-pointer min-h-[400px] lg:min-h-0"
              role="button"
              tabIndex={0}
              aria-label="Reproducir video testimonio de Carlos V."
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  const video = document.getElementById('testimonial-video') as HTMLVideoElement;
                  if (video) {
                    if (video.paused) video.play();
                    else video.pause();
                  }
                }
              }}
              onClick={() => {
                const video = document.getElementById('testimonial-video') as HTMLVideoElement;
                if (video) {
                  if (video.paused) video.play();
                  else video.pause();
                }
              }}
            >
              <div className="absolute inset-0 z-0">
                <video 
                  id="testimonial-video"
                  src="/videos/testimonio_cliente.mp4" 
                  poster="/images/mantenimiento_porton.webp"
                  loop
                  muted
                  playsInline
                  preload="none"
                  title="Video testimonio de Carlos V."
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="w-20 h-20 rounded-full bg-amber-500/20 border border-amber-500/50 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform box-glow">
                  <Play className="w-8 h-8 text-amber-400 fill-amber-400" />
                </div>
              </div>

              {/* Label */}
              <div className="absolute top-6 left-6 z-20">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Video Real</span>
                </div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-10 flex flex-col justify-end z-20">
                <h3 className="text-2xl font-display font-bold text-white mb-2">Carlos V.</h3>
                <p className="text-amber-400 text-sm font-mono uppercase tracking-widest mb-4">Instalación Seccional</p>
                <p className="text-slate-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  &quot;Increíble cómo cambió la fachada de mi casa. El portón es silencioso y muy seguro.&quot;
                </p>
              </div>
            </motion.div>

            {[
              {
                name: "Ricardo M.",
                role: "Residente en La Molina",
                text: "Excelente servicio. Mi portón seccional quedó como nuevo y el sistema de apertura por celular es una maravilla.",
                rating: 5
              },
              {
                name: "Empresa Inmobiliaria",
                role: "Administración de Condominios",
                text: "Confiamos en Faver para el mantenimiento de 12 portones industriales. Su respuesta 24/7 es vital para nosotros.",
                rating: 5
              },
              {
                name: "Sandra P.",
                role: "Propietaria en Surco",
                text: "Muy profesionales y puntuales. Me explicaron todo el proceso y el precio fue justo. Recomendados 100%.",
                rating: 5
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-zinc-900/40 border border-white/5 rounded-3xl p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 italic mb-6">&quot;{item.text}&quot;</p>
                </div>
                <div>
                  <p className="text-white font-bold">{item.name}</p>
                  <p className="text-slate-500 text-xs">{item.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Bento Style */}
      <section className="py-24 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
            >
              <HelpCircle className="w-3 h-3" />
              Dudas Frecuentes
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
              Preguntas <span className="text-amber-400">Comunes</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                q: "¿Cuánto tiempo toma la instalación?",
                a: "Una instalación estándar se completa en 1 a 2 días hábiles, dependiendo de la complejidad del sistema seleccionado."
              },
              {
                q: "¿Qué garantía ofrecen?",
                a: "Ofrecemos 1 año de garantía total en la instalación y hasta 5 años en motores seleccionados de marcas líderes."
              },
              {
                q: "¿Atienden emergencias?",
                a: "Sí, contamos con un equipo técnico disponible 24/7 para reparaciones urgentes en todo Lima y Callao."
              },
              {
                q: "¿Puedo automatizar mi portón actual?",
                a: "En la mayoría de los casos sí. Evaluamos la estructura actual para recomendar el motor más eficiente."
              },
              {
                q: "¿Cuáles son los métodos de pago?",
                a: "Aceptamos transferencias bancarias, tarjetas de crédito/débito y pagos vía Yape o Plin."
              },
              {
                q: "¿Realizan visitas técnicas?",
                a: "Realizamos visitas de evaluación técnica sin costo para proyectos de instalación nueva en Lima Metropolitana."
              }
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-zinc-900/40 border border-white/5 rounded-3xl p-8 hover:border-amber-500/20 transition-all group"
              >
                <h3 className="text-lg font-bold text-white mb-4 group-hover:text-amber-400 transition-colors">{faq.q}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Redesigned Bento Layout */}
      <section id="contacto" className="py-24 relative z-10 bg-black overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 text-amber-500 text-xs font-bold tracking-[0.2em] uppercase mb-4"
              >
                <span className="w-8 h-[1px] bg-amber-500"></span>
                Canales de Respuesta
              </motion.div>
              <motion.h2 
                className="text-4xl md:text-6xl font-display font-bold text-white leading-none"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                ¿Hablamos <br/>
                <span className="text-amber-400">ahora mismo?</span>
              </motion.h2>
            </div>
            <motion.p 
              className="text-slate-400 max-w-xs text-sm leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Sin formularios eternos. Acceso directo a técnicos especialistas para soluciones reales en tiempo récord.
            </motion.p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-full md:h-[600px]">
            
            {/* WhatsApp - Main Action */}
            <motion.div 
              className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-green-600/20 to-green-900/10 border border-green-500/20 rounded-3xl p-8 flex flex-col justify-between group hover:border-green-500/50 transition-all cursor-pointer relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              role="button"
              tabIndex={0}
              aria-label="Contactar por WhatsApp"
              onClick={() => window.open('https://wa.me/51933901809', '_blank')}
              onKeyDown={(e) => e.key === 'Enter' && window.open('https://wa.me/51933901809', '_blank')}
            >
              <div className="absolute top-0 right-0 p-6">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
                  <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">En Línea</span>
                </div>
              </div>
              
              <MessageSquare className="w-12 h-12 text-green-500 mb-8 group-hover:scale-110 transition-transform" />
              
              <div>
                <h3 className="text-3xl font-display font-bold text-white mb-2">WhatsApp Directo</h3>
                <p className="text-slate-400 text-sm mb-6 max-w-xs">Cotizaciones instantáneas y envío de fotos/videos para diagnósticos remotos.</p>
                <div className="inline-flex items-center gap-2 text-green-400 font-bold group-hover:gap-4 transition-all">
                  Chatear con un técnico <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>

            {/* Emergency Phone */}
            <motion.div 
              className="md:col-span-2 bg-amber-500/5 border border-amber-500/20 rounded-3xl p-8 flex items-center justify-between group hover:bg-amber-500/10 transition-all cursor-pointer"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              role="button"
              tabIndex={0}
              aria-label="Llamar a emergencias"
              onClick={() => window.location.href = 'tel:+51933901809'}
              onKeyDown={(e) => e.key === 'Enter' && (window.location.href = 'tel:+51933901809')}
            >
              <div className="flex gap-6 items-center">
                <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center box-glow">
                  <Phone className="w-7 h-7 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Emergencias 24/7</h3>
                  <p className="text-amber-500/70 text-sm font-mono">+51 933 901 809</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full border border-amber-500/30 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-all">
                <ChevronRight className="w-5 h-5" />
              </div>
            </motion.div>

            {/* Location Tile */}
            <motion.div 
              className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 flex flex-col justify-between group hover:border-white/20 transition-all cursor-pointer overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              role="button"
              tabIndex={0}
              aria-label="Ver ubicación en Google Maps"
              onClick={() => window.open('https://maps.google.com/?q=Alameda+2da+etapa+MZ-Ñ+18,+Santa+Anita,+Lima', '_blank')}
              onKeyDown={(e) => e.key === 'Enter' && window.open('https://maps.google.com/?q=Alameda+2da+etapa+MZ-Ñ+18,+Santa+Anita,+Lima', '_blank')}
            >
              <MapPin className="w-8 h-8 text-slate-400 mb-4 group-hover:text-amber-500 transition-colors" />
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Santa Anita</h3>
                <p className="text-slate-500 text-xs leading-tight">Alameda 2da etapa MZ-Ñ 18, Lima</p>
              </div>
              <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <MapPin className="w-24 h-24 text-white" />
              </div>
            </motion.div>

            {/* Email Tile */}
            <motion.div 
              className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 flex flex-col justify-between group hover:border-white/20 transition-all cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              role="button"
              tabIndex={0}
              aria-label="Enviar correo electrónico"
              onClick={() => window.location.href = 'mailto:especialistafaver@gmail.com'}
              onKeyDown={(e) => e.key === 'Enter' && (window.location.href = 'mailto:especialistafaver@gmail.com')}
            >
              <Mail className="w-8 h-8 text-slate-400 mb-4 group-hover:text-amber-500 transition-colors" />
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Escríbenos</h3>
                <p className="text-slate-500 text-xs truncate">especialistafaver@gmail.com</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
      
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black py-12 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-12 h-12">
                  <Image 
                    src="/logo.png" 
                    alt="Especialista Faver Logo" 
                    fill 
                    sizes="48px"
                    className="object-contain"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-display font-bold text-lg text-white">FAVER</span>
                  <span className="text-amber-400 text-[10px] font-bold tracking-widest uppercase">ESPECIALISTA</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Transformamos la seguridad y comodidad de tu hogar o negocio con tecnología de punta en automatización de accesos.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Contacto Directo</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-500" />
                  <a href="tel:+51933901809" className="hover:text-amber-400 transition-colors">+51 933 901 809</a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-4 h-4 flex items-center justify-center text-amber-500 font-bold">@</span>
                  <a href="mailto:especialistafaver@gmail.com" className="hover:text-amber-400 transition-colors">especialistafaver@gmail.com</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Ubicación</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Alameda 2da etapa MZ-Ñ 18,<br/>
                Santa Anita, Lima 15011 - Perú
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-xs">© 2026 Especialista Faver. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-500 hover:text-amber-400 text-xs transition-colors" aria-label="Términos y condiciones">Términos</a>
              <a href="#" className="text-slate-500 hover:text-amber-400 text-xs transition-colors" aria-label="Política de privacidad">Privacidad</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating CTA for Mobile */}
      <div className="fixed bottom-6 right-6 z-[60] md:hidden">
        <motion.a
          href="https://wa.me/51933901809"
          target="_blank"
          aria-label="Contactar por WhatsApp"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.5)] border border-white/20"
        >
          <MessageSquare className="w-8 h-8 text-white fill-white" />
        </motion.a>
      </div>

      {/* AI Tech Chatbot */}
      <TechChatbot />

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-zinc-900/80 border border-white/10 text-white flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all cursor-pointer backdrop-blur-md"
        aria-label="Volver arriba"
      >
        <ChevronRight className="w-6 h-6 -rotate-90" />
      </motion.button>
    </div>
  );
}
