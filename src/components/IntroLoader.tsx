"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type Phase = 'trunk' | 'blackout' | 'branding' | 'exit';

export const IntroLoader = () => {
  const [phase, setPhase] = useState<Phase>('trunk');
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Vérifier si l'animation a déjà été jouée dans cette session
    const hasSeenIntro = sessionStorage.getItem('hm_intro_seen');
    
    if (hasSeenIntro) {
      setLoading(false);
      return;
    }

    setShow(true);

    // Séquence temporelle
    const timer1 = setTimeout(() => setPhase('blackout'), 2500); // 2.5s de zoom malle
    const timer2 = setTimeout(() => setPhase('branding'), 3300); // Transition vers noir
    
    // Simulation d'une progression fluide qui démarre avec le branding
    let interval: NodeJS.Timeout;
    const timer3 = setTimeout(() => {
      interval = setInterval(() => {
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
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      if (interval) clearInterval(interval);
    };
  }, []);

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
        {/* PHASE 1: LA MALLE QUI S'OUVRE ET ZOOM */}
        <AnimatePresence>
          {(phase === 'trunk' || phase === 'blackout') && (
            <motion.div 
              className="absolute inset-0 z-10"
              initial={{ scale: 1 }}
              animate={{ 
                scale: phase === 'blackout' ? 2.5 : 1.3,
                opacity: phase === 'blackout' ? 0 : 1
              }}
              transition={{ 
                scale: { duration: 3, ease: "easeInOut" },
                opacity: { duration: 0.8 }
              }}
            >
              <Image 
                src="/assets/hero_bg.png" 
                alt="Trunk Opening" 
                fill 
                className="object-cover"
                priority
              />
              
              {/* Volets "Malle" qui s'ouvrent au début */}
              <motion.div 
                className="absolute inset-0 bg-black z-20 origin-top"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{ duration: 1.5, ease: [0.45, 0, 0.55, 1] }}
              />
              <motion.div 
                className="absolute inset-0 bg-black z-20 origin-bottom"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{ duration: 1.5, ease: [0.45, 0, 0.55, 1] }}
              />
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
            {/* Cercles de fond neon subtils */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#39ff14]/5 rounded-full blur-[120px]" />
            
            <div className="relative flex flex-col items-center">
              {/* Logo animé */}
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
                  className="rounded-2xl relative z-10 border border-[#39ff14]/30"
                />
              </motion.div>

              {/* Texte de marque */}
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

              {/* Barre de progression futuriste */}
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

            {/* Lignes de scan futuristes */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
