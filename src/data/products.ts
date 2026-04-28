export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  oldPrice: string | null;
  image: string;
  badge: string;
  badgeColor: string;
  glowColor: string;
  flavors?: (string | { name: string; detail: string })[];
}

export const FALLBACK_PRODUCTS: Product[] = [
  { id: 1, name: 'PABLO ICE COLD', category: 'Snus', price: '1 200 DZD', oldPrice: '1 500 DZD', image: '/assets/snus_pablo.png', badge: 'TOP VENTE 🔥', badgeColor: 'bg-neon-red', glowColor: 'box-glow-green-hover' },
  { id: 2, name: 'KILLA COLD MINT', category: 'Snus', price: '1 100 DZD', oldPrice: null, image: '/assets/snus_pablo.png', badge: 'FORT 💪', badgeColor: 'bg-neon-pink', glowColor: 'hover:shadow-[0_0_25px_rgba(255,0,255,0.6)]' },
  { id: 3, name: 'RABBIT BLUE ICE', category: 'Snus', price: '1 300 DZD', oldPrice: null, image: '/assets/snus_pablo.png', badge: 'NEW BRAND', badgeColor: 'bg-blue-400 text-black', glowColor: 'box-glow-green-hover' },
  { id: 4, name: 'VELO FREEZE MAX', category: 'Snus', price: '1 000 DZD', oldPrice: null, image: '/assets/snus_pablo.png', badge: 'DISCRET', badgeColor: 'bg-white text-black border', glowColor: 'box-glow-green-hover' },
  { id: 5, name: 'TORNADO 9000 PRO', category: 'Puff 9k', price: '3 500 DZD', oldPrice: null, image: '/assets/vape_tornado.png', badge: '9000 PUFFS ⚡', badgeColor: 'bg-neon-yellow text-black', glowColor: 'hover:shadow-[0_0_25px_rgba(250,204,21,0.6)]' },
  { id: 6, name: 'TORNADO 12000 PRO', category: 'Puff 12k', price: '4 200 DZD', oldPrice: null, image: '/assets/vape_tornado.png', badge: '12000 PUFFS 🚀', badgeColor: 'bg-orange-600', glowColor: 'hover:shadow-[0_0_25px_rgba(249,115,22,0.6)]' },
  { id: 7, name: 'JNR ROCKET 25K', category: 'Puff 25k', price: '4 500 DZD', oldPrice: '5 000 DZD', image: '/assets/vape_tornado.png', badge: 'MAX PUFFS 🌪️', badgeColor: 'bg-blue-600', glowColor: 'hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]' },
  { id: 8, name: 'JNR ALIEN 10K', category: 'Puff 10k', price: '4 000 DZD', oldPrice: null, image: '/assets/vape_tornado.png', badge: 'PROMO 🎁', badgeColor: 'bg-neon-green text-black', glowColor: 'box-glow-green-hover' },
  { id: 9, name: 'SALT E-LIQUID MENTHE', category: 'E-Liquides', price: '1 500 DZD', oldPrice: null, image: '/assets/vape_tornado.png', badge: 'NIC SALT', badgeColor: 'bg-indigo-600', glowColor: 'box-glow-green-hover' },
  { id: 10, name: 'BIG BOY 100ML', category: 'E-Liquides', price: '2 500 DZD', oldPrice: '3 000 DZD', image: '/assets/vape_tornado.png', badge: 'FORMAT XL', badgeColor: 'bg-green-600', glowColor: 'box-glow-green-hover' },
  { id: 11, name: 'PACK SNUS 10 PCS', category: 'Gros', price: '10 000 DZD', oldPrice: '12 000 DZD', image: '/assets/snus_pablo.png', badge: 'VENTE EN GROS', badgeColor: 'bg-black text-yellow-400', glowColor: 'box-glow-green-hover' },
  { id: 12, name: 'PACK PUFF 5 PCS', category: 'Gros', price: '15 000 DZD', oldPrice: null, image: '/assets/vape_tornado.png', badge: 'PRIX DE GROS', badgeColor: 'bg-black text-blue-400', glowColor: 'box-glow-green-hover' },
  { id: 13, name: 'RÉSISTANCE TORNADO', category: 'Accessoires', price: '800 DZD', oldPrice: null, image: '/assets/vape_tornado.png', badge: 'PIÈCE ORIGINALE', badgeColor: 'bg-slate-500', glowColor: 'box-glow-green-hover' },
  { id: 14, name: 'CHARGEUR USB-C RAPIDE', category: 'Accessoires', price: '1 200 DZD', oldPrice: null, image: '/assets/vape_tornado.png', badge: 'ESSENTIEL', badgeColor: 'bg-slate-800', glowColor: 'box-glow-green-hover' },
  { id: 15, name: 'BATTERIE 18650', category: 'Accessoires', price: '1 500 DZD', oldPrice: null, image: '/assets/vape_tornado.png', badge: 'PUISSANCE', badgeColor: 'bg-red-800', glowColor: 'box-glow-green-hover' },
  { id: 16, name: 'ÉTUI DE TRANSPORT', category: 'Accessoires', price: '900 DZD', oldPrice: null, image: '/assets/vape_tornado.png', badge: 'PROTECTION', badgeColor: 'bg-gray-700', glowColor: 'box-glow-green-hover' }
];

export const DEFAULT_CATEGORIES = [
  'Toutes', 
  'Promotions', 
  'Snus', 
  'Vape Jetable', 
  'Puff', 
  'Puff 9k', 
  'Puff 12k', 
  'Puff 15k', 
  'Puff 25k', 
  'E-Liquides', 
  'Gros', 
  'Accessoires'
];
