"use client";

import React, { useState, useEffect } from 'react';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { 
  ShoppingCart, Star, ArrowLeft, Heart, Share2, 
  ShieldCheck, Truck, RefreshCw, Play, Zap, CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { createClient } from '../../../utils/supabase/client';
import { useCart } from '../../../context/CartContext';

const supabase = createClient();

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  old_price: string | null;
  image_url: string | null;
  description: string | null;
  badge: string | null;
  badge_color: string | null;
  glow_color: string | null;
  images: string[];
  video_url: string | null;
  stock_quantity: number;
  flavors: { name: string; detail?: string }[];
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFlavor, setSelectedFlavor] = useState<string>('STRAWBERRY WATERMELON');
  const [activeThumb, setActiveThumb] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (data) {
        let parsedFlavors: { name: string; detail?: string }[] = [];

        if (typeof data.flavors === 'string') {
          try {
            const raw = JSON.parse(data.flavors);
            // Handle both [{ name: "X" }] and ["X", "Y"] formats
            parsedFlavors = Array.isArray(raw)
              ? raw.map((f: any) => typeof f === 'string' ? { name: f } : f)
              : [];
          } catch {
            parsedFlavors = [];
          }
        } else if (Array.isArray(data.flavors)) {
          parsedFlavors = data.flavors.map((f: any) => typeof f === 'string' ? { name: f } : f);
        }
        
        setProduct({ ...data, flavors: parsedFlavors });
        if (parsedFlavors.length > 0) {
          setSelectedFlavor(parsedFlavors[0].name);
        }
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#000000] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#39ff14] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#000000] flex flex-col items-center justify-center text-black dark:text-white">
        <h1 className="text-4xl font-heading mb-4 uppercase">Produit non trouvé</h1>
        <Link href="/shop" className="text-[#39ff14] hover:underline flex items-center gap-2 uppercase tracking-widest font-bold">
          <ArrowLeft size={16} /> Retour à la boutique
        </Link>
      </div>
    );
  }

  // Dynamic Gallery items from database
  const galleryItems = [
    ...(product.images || []).map((url, i) => ({ type: 'image', url, label: `Photo ${i + 1}` })),
    ...(product.video_url ? [{ type: 'video', url: product.video_url, label: 'Vidéo démo' }] : [])
  ];

  // Fallback if no media from Supabase
  if (galleryItems.length === 0) {
    const fallbackUrl = (product as any).image_url;
    if (fallbackUrl) {
      galleryItems.push({ type: 'image', url: fallbackUrl, label: 'Image principale' });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#000000] text-black dark:text-white font-sans selection:bg-[#39ff14] selection:text-black">
      <Header />
      
      <main className="pt-32 pb-20 overflow-x-hidden">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1600px]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 1. Colonne de galerie (Extrême gauche) */}
            <div className="lg:col-span-1 border-r border-black/10 dark:border-white/5 pr-4 hidden lg:flex flex-col gap-4">
              {galleryItems.map((item, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveThumb(i)}
                  className={`relative aspect-square w-full border transition-all duration-300 bg-white dark:bg-[#0a0a0a] p-2 group overflow-hidden ${activeThumb === i ? 'border-[#ff00ff] shadow-[0_0_15px_rgba(255,0,255,0.2)]' : 'border-black/10 hover:border-black/30 dark:border-white/10 dark:hover:border-white/30'}`}
                >
                  <Image src={item.url} alt={item.label} fill className="object-contain p-1 opacity-70 group-hover:opacity-100 transition-opacity" />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                        <Play size={16} className="text-white fill-white ml-0.5" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* 2. Zone de l'image principale (Centre) */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/5] bg-gradient-to-b from-gray-100 to-white dark:from-[#0a0a0a] dark:to-[#000000] border border-black/10 dark:border-white/5 overflow-hidden flex items-center justify-center p-12 lg:p-20">
                {/* Neon Background Lines */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-[20%] left-[-10%] w-[120%] h-px bg-[#ff00ff]/20 -rotate-12 blur-sm"></div>
                  <div className="absolute bottom-[30%] left-[-10%] w-[120%] h-px bg-[#ff00ff]/30 rotate-12 blur-sm"></div>
                  <div className="absolute top-[10%] left-[20%] w-px h-full bg-[#ff00ff]/10 rotate-45 blur-md"></div>
                </div>

                {/* Main Product Hero */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeThumb}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative w-full h-full drop-shadow-[0_20px_50px_rgba(255,0,255,0.15)]"
                  >
                    <Image 
                      src={galleryItems[activeThumb].url} 
                      alt={product.name} 
                      fill 
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Badge Dynamique */}
                {product.badge && (
                  <div className="absolute top-8 left-8 z-10">
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className={`flex items-center gap-2 bg-black border border-white/20 px-4 py-2 shadow-lg`}
                      style={{ borderColor: product.badge_color || '#ff00ff' }}
                    >
                      <Zap size={14} className="text-[#39ff14] fill-[#39ff14]" />
                      <span className="text-xs font-bold uppercase tracking-widest text-white">{product.badge}</span>
                    </motion.div>
                  </div>
                )}

                {/* Bottom Reflective Surface effect */}
                <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-gray-50 to-transparent dark:from-black dark:to-transparent opacity-80 pointer-events-none"></div>
              </div>

              {/* Mobile Gallery (Horizontal) */}
              <div className="lg:hidden flex gap-4 overflow-x-auto py-6 no-scrollbar">
                {galleryItems.map((item, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveThumb(i)}
                    className={`relative aspect-square w-20 shrink-0 border bg-white dark:bg-[#0a0a0a] p-2 ${activeThumb === i ? 'border-[#ff00ff]' : 'border-black/10 dark:border-white/10'}`}
                  >
                    <Image src={item.url} alt={item.label} fill className="object-contain p-1" />
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Panneau de détails (Droite) */}
            <div className="lg:col-span-5 flex flex-col pt-4">
              <div className="mb-10">
                <span className="text-[10px] font-bold text-[#39ff14] uppercase tracking-[0.4em] mb-3 block border-l-2 border-[#39ff14] pl-3">
                  {product.category}
                </span>
                <h1 className="text-5xl lg:text-8xl font-heading text-black dark:text-white uppercase leading-none mb-4">
                  {product.name.split(' ').slice(0, 2).join(' ')} <br />
                  <span className="text-[#39ff14] drop-shadow-[0_0_20px_rgba(57,255,20,0.5)]">{product.name.split(' ').slice(2).join(' ')}</span>
                </h1>
                
                <div className="flex items-center gap-4 mb-10">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} size={14} className={s <= 4 ? "fill-[#39ff14] text-[#39ff14]" : "text-black/10 fill-black/10 dark:text-white/10 dark:fill-white/10"} />
                    ))}
                  </div>
                  <span className="text-xs text-black dark:text-white uppercase tracking-widest font-bold">
                    (4.8) <span className="text-gray-500 ml-2">1 571 AVIS</span>
                  </span>
                </div>

                {/* Price and Loyalty */}
                <div className="space-y-2 mb-10">
                  <div className="flex items-baseline gap-6">
                    <span className="text-5xl lg:text-7xl font-bold font-sans text-[#39ff14] tracking-tighter">
                      {product.price}
                    </span>
                    {product.old_price && (
                      <span className="text-2xl font-bold font-sans text-[#ef4444] line-through">
                        {product.old_price}
                      </span>
                    )}
                  </div>
                  <div className="inline-flex items-center gap-2 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest bg-black/5 border border-black/10 dark:bg-white/5 dark:border-white/10 px-3 py-1.5">
                    <CheckCircle2 size={12} className="text-[#39ff14]" />
                    + 350 POINTS DE FIDÉLITÉ
                  </div>
                </div>

                {/* Specific French Description */}
                <div className="mb-8 p-6 bg-black/[0.02] dark:bg-white/[0.02] border-l-2 border-black/10 dark:border-white/10">
                  <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base leading-relaxed font-sans">
                    {product.description || "Aucune description disponible pour ce produit."}
                  </p>
                </div>

                {/* Magenta Special Message */}
                {product.old_price && (
                  <div className="mb-10">
                    <p className="text-[#ff00ff] text-xs lg:text-sm font-bold uppercase tracking-widest leading-relaxed">
                      Prix réduit ! Nos nouvelles acquisitions de saveurs et d’emballages nous permettent de vous proposer ce modèle haut de gamme à un prix plus accessible.
                    </p>
                  </div>
                )}
              </div>

              {/* 4. Section de sélection du goût (Goût) */}
              <div className="mb-12">
                <div className="flex flex-col gap-1 mb-6">
                  <h3 className="text-2xl font-heading text-black dark:text-white uppercase tracking-widest">GOÛT</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">SÉLECTIONNER LE GOÛT:</span>
                    <span className="text-[10px] font-bold text-[#ff00ff] uppercase tracking-[0.2em]">{selectedFlavor} <span className="text-gray-600">(Sélectionné)</span></span>
                  </div>
                </div>
                
                {/* Redundant proeminent selected box */}
                <div className="mb-6 p-4 border border-[#ff00ff] bg-[#ff00ff]/5 flex items-center justify-between group cursor-default">
                  <span className="text-sm font-bold uppercase tracking-widest text-[#ff00ff]">{selectedFlavor}</span>
                  <CheckCircle2 size={18} className="text-[#ff00ff]" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {product.flavors.map((flavor) => (
                    <button
                      key={flavor.name}
                      onClick={() => setSelectedFlavor(flavor.name)}
                      className={`relative p-4 border text-left transition-all duration-300 ${selectedFlavor === flavor.name ? 'border-[#ff00ff] bg-[#ff00ff]/10 text-[#ff00ff] shadow-[0_0_15px_rgba(255,0,255,0.1)]' : 'border-black/10 hover:border-black/30 text-black/60 hover:text-black bg-black/[0.02] dark:border-white/10 dark:hover:border-white/30 dark:text-white/60 dark:hover:text-white dark:bg-white/[0.02]'}`}
                    >
                      <span className="text-sm font-bold uppercase tracking-widest block text-inherit">{flavor.name}</span>
                      {flavor.detail && <span className="text-xs text-gray-400 block mt-1">{flavor.detail}</span>}
                    </button>
                  ))}
                </div>
              </div>


              {/* 6. Bouton d'appel à l'action final */}
              <div className="sticky bottom-0 lg:relative pt-8 bg-gray-50/80 dark:bg-black/80 backdrop-blur-md lg:bg-transparent z-40">
                <button 
                  onClick={() => addToCart(product as any, selectedFlavor)}
                  className="w-full bg-[#39ff14] hover:bg-[#32e612] active:scale-[0.98] text-black font-heading text-xl py-6 flex items-center justify-center gap-4 uppercase tracking-[0.2em] font-bold transition-all shadow-[0_0_40px_rgba(57,255,20,0.15)] group"
                >
                  <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
                  <span>AJOUTER AU PANIER | {product.price}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
