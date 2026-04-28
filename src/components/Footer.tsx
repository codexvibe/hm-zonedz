import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-black border-t border-black/10 dark:border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <h2 className="font-heading text-3xl text-black dark:text-white mb-4">HM.ZONE<span className="text-neon-green">DZ</span></h2>
            <p className="text-text-muted text-sm mb-6 uppercase tracking-widest font-bold">
              N°1 EN ALGÉRIE<br/>SNUS & VAPES
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl text-black dark:text-white mb-6 uppercase">Navigation</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/" className="text-text-muted hover:text-neon-green transition-colors">Accueil</Link></li>
              <li><Link href="#shop" className="text-text-muted hover:text-neon-green transition-colors">Boutique</Link></li>
              <li><Link href="#vapes" className="text-text-muted hover:text-neon-green transition-colors">Vapes Jetables</Link></li>
              <li><Link href="/gros" className="text-text-muted hover:text-neon-green transition-colors border-b border-neon-green inline-block">Acheter en Gros</Link></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="font-heading text-xl text-black dark:text-white mb-6 uppercase">Contact</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-neon-green mt-1 shrink-0" size={18} />
                <span className="text-text-muted">Livraison disponible dans les 58 wilayas d'Algérie.</span>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <div className="bg-white dark:bg-surface border border-neon-red/30 p-4 rounded-sm">
              <h3 className="font-heading text-lg text-neon-red mb-2 uppercase">⚠️ Avertissement</h3>
              <p className="text-xs text-text-muted">
                Ce site vend des produits contenant de la nicotine ou dérivés. Produit interdit aux mineurs. 
                <br/><br/>
                <span className="font-bold text-black dark:text-white">Nous ne vendons AUCUNE contrefaçon.</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-black/10 dark:border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm font-sans font-medium">
            © {new Date().getFullYear()} HM.ZONEDZ. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};
