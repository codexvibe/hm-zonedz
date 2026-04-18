"use client";

import React, { useState } from 'react';
import { X, Send, CheckCircle, Loader2, MapPin, Phone, User } from 'lucide-react';
import { WILAYAS } from '../data/wilayas';
import { createClient } from '../utils/supabase/client';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productPrice: string;
}

export const OrderModal = ({ isOpen, onClose, productName, productPrice }: OrderModalProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [wilaya, setWilaya] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const resetForm = () => {
    setName('');
    setPhone('');
    setWilaya('');
    setAddress('');
    setIsSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleOrder = async () => {
    if (!name || !phone || !wilaya) return;
    
    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('orders')
        .insert({
          customer_name: name,
          customer_phone: phone,
          customer_wilaya: wilaya,
          customer_address: address || 'Non précisée',
          items_list: productName,
          total_price: productPrice,
          status: 'Nouveau'
        });

      if (error) throw error;
      setIsSuccess(true);
    } catch (err) {
      console.error('Erreur lors de la commande:', err);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = name.trim() && phone.trim() && wilaya;

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300" />
      
      {/* Modal - Slide up on mobile, centered on desktop */}
      <div
        className="relative w-full sm:max-w-md bg-[#0a0a0a] border border-white/10 overflow-y-auto max-h-[90vh] sm:max-h-[85vh] rounded-t-2xl sm:rounded-none animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Poignée mobile */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-white/20 rounded-full" />
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#39ff14]/10 to-transparent border-b border-[#39ff14]/20 px-5 py-4 flex justify-between items-center sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-sm z-10">
          <div>
            <h2 className="font-heading text-xl sm:text-2xl text-white uppercase">Commander</h2>
            <p className="text-[#39ff14] text-xs sm:text-sm font-bold truncate max-w-[250px]">{productName} — {productPrice}</p>
          </div>
          <button onClick={handleClose} className="text-white/40 hover:text-white p-2 -mr-2 transition-colors">
            <X size={22} />
          </button>
        </div>

        {/* Contenu */}
        {isSuccess ? (
          <div className="p-6 sm:p-8 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#39ff14]/10 flex items-center justify-center">
              <CheckCircle size={40} className="text-[#39ff14]" />
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl text-white uppercase">Commande Reçue !</h3>
            <p className="text-[#a1a1aa] font-sans text-sm sm:text-base">
              Merci <span className="text-white font-bold">{name}</span> ! Nous allons vous contacter au <span className="text-[#39ff14] font-bold">{phone}</span> pour confirmer.
            </p>
            <p className="text-xs text-[#a1a1aa]">📍 Livraison vers {wilaya}</p>
            <button
              onClick={handleClose}
              className="mt-2 w-full bg-[#39ff14] text-black font-heading text-lg sm:text-xl py-3 sm:py-4 uppercase active:scale-95 transition-transform"
            >
              Fermer
            </button>
          </div>
        ) : (
          <div className="p-5 sm:p-6 flex flex-col gap-3 sm:gap-4">
            {/* Nom */}
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
              <input
                type="text"
                placeholder="Votre nom complet *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#111] border border-white/10 text-white placeholder-[#555] pl-10 pr-4 py-3 text-sm sm:text-base font-sans focus:border-[#39ff14] focus:outline-none transition-colors rounded-sm"
              />
            </div>

            {/* Téléphone */}
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
              <input
                type="tel"
                placeholder="Numéro de téléphone * (ex: 0550123456)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#111] border border-white/10 text-white placeholder-[#555] pl-10 pr-4 py-3 text-sm sm:text-base font-sans focus:border-[#39ff14] focus:outline-none transition-colors rounded-sm"
              />
            </div>

            {/* Wilaya */}
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
              <select
                value={wilaya}
                onChange={(e) => setWilaya(e.target.value)}
                className="w-full bg-[#111] border border-white/10 text-white pl-10 pr-4 py-3 text-sm sm:text-base font-sans focus:border-[#39ff14] focus:outline-none transition-colors appearance-none cursor-pointer rounded-sm"
              >
                <option value="" className="text-[#555]">Sélectionnez votre Wilaya *</option>
                {WILAYAS.map((w) => (
                  <option key={w} value={w} className="bg-[#111] text-white">{w}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] pointer-events-none">▼</div>
            </div>

            {/* Adresse */}
            <input
              type="text"
              placeholder="Adresse de livraison (optionnel)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-[#111] border border-white/10 text-white placeholder-[#555] px-4 py-3 text-sm sm:text-base font-sans focus:border-[#39ff14] focus:outline-none transition-colors rounded-sm"
            />

            {/* Bouton Commander */}
            <button
              onClick={handleOrder}
              disabled={!isFormValid || isSubmitting}
              className={`w-full py-3.5 sm:py-4 font-heading text-lg sm:text-xl uppercase flex items-center justify-center gap-3 transition-all duration-200 mt-1 rounded-sm active:scale-95 ${
                isFormValid
                  ? 'bg-[#39ff14] text-black cursor-pointer'
                  : 'bg-[#1a1a1a] text-[#555] cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
              {isSubmitting ? 'Envoi...' : 'Confirmer la commande'}
            </button>

            <p className="text-center text-[#555] text-[10px] sm:text-xs font-sans pb-2">
              💳 Paiement à la livraison — 🚚 Livraison 58 Wilayas
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
