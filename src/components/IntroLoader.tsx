"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type Phase = 'trunk' | 'blackout' | 'branding' | 'exit';

export const IntroLoader = () => {
  const [phase, setPhase] = useState<Phase>('trunk');
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Vérifier si l'animation a déjà été jouée dans cette session
    const hasSeenIntro = sessionStorage.getItem('hm_intro_seen');
    
    if (hasSeenIntro) {
      setLoading(false);
      return;
    }

    setShow(true);

    // Sécurité: Si la vidéo met trop de temps à charger ou n'existe pas, on passe au branding après 4s
    const fallbackTimer = setTimeout(() => {
      if (phase === 'trunk') setPhase('branding');
    }, 4500);

    return () => clearTimeout(fallbackTimer);
  }, [phase]);

  // Démarrer le chargement une fois arrivé au branding
  useEffect(() => {
    if (phase === 'branding') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setPhase('exit');
              setTimeout(() => {
                setLoading(false);
                sessionStorage.setItem('hm_intro_seen', 'true');
              }, 800);
            }, 500);
            return 100;
          }
          return prev + 1;
        });
      }, 15);
      return () => clearInterval(interval);
    }
  }, [phase]);

  if (!loading || !show) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        exit={{ 
          opacity: 0, 
          scale: 1.1,
          filter: "blur(20px)",
          transition: { duration: 0.8, ease: "easeInOut" }
        }}
      >
        {/* PHASE 1: VIDÉO DE LA MALLE QUI S'OUVRE */}
        <AnimatePresence>
          {(phase === 'trunk' || phase === 'blackout') && (
            <motion.div 
              className="absolute inset-0 z-10"
              initial={{ opacity: 1 }}
              animate={{ 
                opacity: phase === 'blackout' ? 0 : 1,
                scale: phase === 'blackout' ? 1.2 : 1
              }}
              transition={{ duration: 0.8 }}
            >
              {/* On charge la vidéo spécifique fournie par l'utilisateur */}
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                onEnded={() => setPhase('branding')}
                className="w-full h-full object-cover"
              >
                <source src="/assets/PixVerse_V6_Image_Text_720P_je_veux_quand_il_o - Trim.mp4" type="video/mp4" />
                {/* Fallback image */}
                <img src="/assets/hero_bg.png" alt="Fallback" className="w-full h-full object-cover" />
              </video>

              {/* Overlay de fondu pour la fin de vidéo */}
              {phase === 'blackout' && (
                <div className="absolute inset-0 bg-black z-20" />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* PHASE 2 & 3: BRANDING ET LOADING */}
        {(phase === 'branding' || phase === 'exit') && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-30 flex flex-col items-center"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#39ff14]/5 rounded-full blur-[120px]" />
            
            <div className="relative flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mb-8 relative"
              >
                <div className="absolute inset-0 bg-[#39ff14]/20 blur-2xl rounded-full animate-pulse" />
                <Image 
                  src="/assets/logo.jpg" 
                  alt="HM.ZONEDZ Logo" 
                  width={140} 
                  height={140} 
                  className="rounded-2xl relative z-10 border border-[#39ff14]/30 shadow-2xl shadow-[#39ff14]/10"
                />
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-center mb-12"
              >
                <h1 className="font-heading text-5xl md:text-7xl text-white tracking-widest uppercase mb-2">
                  HM.ZONE<span className="text-[#39ff14]">DZ</span>
                </h1>
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px w-8 bg-[#39ff14]/30" />
                  <p className="text-[#a1a1aa] text-[10px] md:text-xs tracking-[0.4em] font-bold uppercase">
                    Premium Quality
                  </p>
                  <div className="h-px w-8 bg-[#39ff14]/30" />
                </div>
              </motion.div>

              <div className="w-72 h-[1px] bg-white/10 relative overflow-hidden rounded-full">
                <motion.div 
                  className="absolute left-0 top-0 h-full bg-[#39ff14] shadow-[0_0_15px_#39ff14]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
              
              <div className="mt-4 flex flex-col items-center">
                <motion.span className="text-[12px] font-mono text-[#39ff14] tracking-[0.2em] font-bold">
                  {Math.round(progress)}%
                </motion.span>
                <motion.span 
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-[8px] text-[#a1a1aa] uppercase tracking-[0.3em] mt-2"
                >
                  Chargement de l'inventaire...
                </motion.span>
              </div>
            </div>

            <div className="absolute inset-0 pointer-events-none opacity-10">
              <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
