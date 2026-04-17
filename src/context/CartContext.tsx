"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  quantity: number;
  flavor?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any, flavor?: string) => void;
  removeFromCart: (productId: number, flavor?: string) => void;
  updateQuantity: (productId: number, quantity: number, flavor?: string) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Charger le panier depuis localStorage au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem('hm_zonedz_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Sauvegarder le panier dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('hm_zonedz_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any, flavor?: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id && item.flavor === flavor);
      if (existingItem) {
        return prevCart.map(item => 
          (item.id === product.id && item.flavor === flavor) ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        image: product.image || product.image_url,
        category: product.category,
        quantity: 1,
        flavor
      }];
    });
    setIsSidebarOpen(true);
  };

  const removeFromCart = (productId: number, flavor?: string) => {
    setCart(prevCart => prevCart.filter(item => !(item.id === productId && item.flavor === flavor)));
  };

  const updateQuantity = (productId: number, quantity: number, flavor?: string) => {
    if (quantity < 1) {
      removeFromCart(productId, flavor);
      return;
    }
    setCart(prevCart => 
      prevCart.map(item => (item.id === productId && item.flavor === flavor) ? { ...item, quantity } : item)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const parsePrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
  };

  const subtotal = cart.reduce((acc, item) => acc + (parsePrice(item.price) * item.quantity), 0);
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, clearCart, 
      subtotal, itemCount, isSidebarOpen, setIsSidebarOpen 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
