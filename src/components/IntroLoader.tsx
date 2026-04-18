"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export const IntroLoader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hm_intro_seen');
    if (hasSeenIntro) {
      setLoading(false);
      return;
    }

    setShow(true);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem('hm_intro_seen', 'true');
          }, 600);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  if (!loading || !show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)", transition: { duration: 0.6 } }}
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      >
        {/* Background photo de la malle */}
        <div className="absolute inset-0">
          <Image
            src="/assets/hero_bg.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay sombre pour que le logo soit lisible */}
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Contenu central */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Halo vert derrière le logo */}
          <div className="absolute -inset-20 bg-[#39ff14]/10 rounded-full blur-[100px]" />

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8 relative"
          >
            <div className="absolute inset-0 bg-[#39ff14]/20 blur-2xl rounded-full animate-pulse" />
            <Image
              src="/assets/logo.jpg"
              alt="HM.ZONEDZ Logo"
              width={150}
              height={150}
              className="rounded-2xl relative z-10 border border-[#39ff14]/40 shadow-[0_0_40px_rgba(57,255,20,0.2)]"
            />
          </motion.div>

          {/* Nom de la marque */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-5xl md:text-7xl text-white tracking-widest uppercase">
              HM.ZONE<span className="text-[#39ff14]">DZ</span>
            </h1>
            <p className="text-white/50 text-[10px] md:text-xs tracking-[0.5em] font-bold mt-3 uppercase">
              N°1 EN ALGÉRIE
            </p>
          </motion.div>

          {/* Barre de progression verte */}
          <div className="w-72 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute left-0 top-0 h-full bg-[#39ff14] shadow-[0_0_20px_#39ff14,0_0_40px_rgba(57,255,20,0.5)]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          <div className="mt-4 flex flex-col items-center gap-1">
            <span className="text-[13px] font-mono font-bold text-[#39ff14] tracking-[0.2em]">
              {Math.round(progress)}%
            </span>
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-[9px] text-white/40 uppercase tracking-[0.3em]"
            >
              Chargement...
            </motion.span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
