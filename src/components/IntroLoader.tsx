"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export const IntroLoader = () => {
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

    // Simulation d'une progression fluide
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem('hm_intro_seen', 'true');
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20); // Vitesse globale environ 2 secondes

    return () => clearInterval(interval);
  }, []);

  if (!loading || !show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0, 
          scale: 1.1,
          filter: "blur(20px)",
          transition: { duration: 0.8, ease: "easeInOut" }
        }}
        className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Cercles de fond neon subtils */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#39ff14]/5 rounded-full blur-[120px]" />
        
        <div className="relative z-10 flex flex-col items-center">
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
              width={120} 
              height={120} 
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
            <h1 className="font-heading text-4xl md:text-6xl text-white tracking-widest uppercase">
              HM.ZONE<span className="text-[#39ff14]">DZ</span>
            </h1>
            <p className="text-[#a1a1aa] text-[10px] md:text-xs tracking-[0.4em] font-bold mt-2 uppercase">
              L'expérience Premium Vaping & Snus
            </p>
          </motion.div>

          {/* Barre de progression futuriste */}
          <div className="w-64 h-[2px] bg-white/5 relative overflow-hidden rounded-full">
            <motion.div 
              className="absolute left-0 top-0 h-full bg-[#39ff14] shadow-[0_0_15px_#39ff14]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          
          <motion.span 
            className="text-[10px] font-mono text-[#39ff14] mt-4 tracking-widest"
          >
            {Math.round(progress)}%
          </motion.span>
        </div>

        {/* Lignes de scan futuristes */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
