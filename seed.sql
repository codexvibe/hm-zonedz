-- ==========================================
-- SCRIPT DE REMPLISSAGE (SEEDING) DES PRODUITS
-- ==========================================
-- Ce script insère 16 produits haute qualité pour remplir votre boutique immédiatement.

-- On vide d'abord la table pour éviter les doublons (Optionnel : commentez si vous voulez garder vos produits actuels)
-- TRUNCATE products RESTART IDENTITY CASCADE;

INSERT INTO products (name, category, price, old_price, image_url, description, badge, badge_color, glow_color, flavors, images)
VALUES
-- SNUS
('PABLO ICE COLD', 'Snus', '1 200 DZD', '1 500 DZD', '/assets/snus_pablo.png', 'Le snus le plus puissant du marché avec un goût menthe glaciale intense.', 'TOP VENTE 🔥', 'bg-[#ef4444]', 'box-glow-green-hover', '["Menthe Extra Strong", "Spearmint", "Ice Cold"]'::jsonb, '[]'::jsonb),
('KILLA COLD MINT', 'Snus', '1 100 DZD', NULL, '/assets/snus_pablo.png', 'Un classique indémodable. Équilibre parfait entre force et fraîcheur.', 'FORT 💪', 'bg-[#ff00ff]', 'hover:shadow-[0_0_25px_rgba(255,0,255,0.6)]', '["Cold Mint", "Watermelon", "Blueberry"]'::jsonb, '[]'::jsonb),
('RABBIT BLUE ICE', 'Snus', '1 300 DZD', NULL, '/assets/snus_pablo.png', 'Nouvelle marque premium. Force extrême et design élégant.', 'NEW BRAND', 'bg-blue-400 text-black', 'box-glow-green-hover', '["Blue Ice", "Pepper Mint"]'::jsonb, '[]'::jsonb),
('VELO FREEZE MAX', 'Snus', '1 000 DZD', NULL, '/assets/snus_pablo.png', 'Format slim, discret et puissant. Idéal pour un usage quotidien.', 'DISCRET', 'bg-white text-black border', 'box-glow-green-hover', '["Freeze", "Ice Cool"]'::jsonb, '[]'::jsonb),

-- PUFFS / VAPE JETABLE
('TORNADO 9000 PRO', 'Puff 9k', '3 500 DZD', NULL, '/assets/vape_tornado.png', '9000 bouffées de pur plaisir. Batterie rechargeable et goût constant.', '9000 PUFFS ⚡', 'bg-[#facc15] text-black', 'hover:shadow-[0_0_25px_rgba(250,204,21,0.6)]', '["Blue Razz", "Strawberry Ice", "Watermelon Bubblegum"]'::jsonb, '[]'::jsonb),
('TORNADO 12000 PRO', 'Puff 12k', '4 200 DZD', NULL, '/assets/vape_tornado.png', 'Le monstre de l''autonomie. Design futuriste et écran LED.', '12000 PUFFS 🚀', 'bg-orange-600', 'hover:shadow-[0_0_25px_rgba(249,115,22,0.6)]', '["Peach Ice", "Grape", "Double Apple"]'::jsonb, '[]'::jsonb),
('JNR ROCKET 25K', 'Puff 25k', '4 500 DZD', '5 000 DZD', '/assets/vape_tornado.png', 'Puissance maximale. Double mesh coil pour une vapeur dense.', 'MAX PUFFS 🌪️', 'bg-blue-600', 'hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]', '["Blueberry", "Mango Ice"]'::jsonb, '[]'::jsonb),
('JNR ALIEN 10K', 'Puff 10k', '4 000 DZD', NULL, '/assets/vape_tornado.png', 'Un design venu d''ailleurs. Très ergonomique et saveurs intenses.', 'PROMO 🎁', 'bg-[#39ff14] text-black', 'box-glow-green-hover', '["Lemon Mint", "Cherry"]'::jsonb, '[]'::jsonb),

-- E-LIQUIDES
('SALT E-LIQUID MENTHE', 'E-Liquides', '1 500 DZD', NULL, '/assets/vape_tornado.png', 'Sels de nicotine pour un hit doux et une satisfaction rapide.', 'NIC SALT', 'bg-indigo-600', 'box-glow-green-hover', '["20mg", "30mg", "50mg"]'::jsonb, '[]'::jsonb),
('BIG BOY 100ML', 'E-Liquides', '2 500 DZD', '3 000 DZD', '/assets/vape_tornado.png', 'Grand format pour les gros vapoteurs. Saveurs fruitées incroyables.', 'FORMAT XL', 'bg-green-600', 'box-glow-green-hover', '["Fraise Kiwi", "Ananas Mango"]'::jsonb, '[]'::jsonb),

-- GROS (WHOLSEALE)
('PACK SNUS 10 PCS', 'Gros', '10 000 DZD', '12 000 DZD', '/assets/snus_pablo.png', 'Prix spécial pour revendeurs. Mix de saveurs possible.', 'VENTE EN GROS', 'bg-black text-yellow-400', 'box-glow-green-hover', '["Assortiment"]'::jsonb, '[]'::jsonb),
('PACK PUFF 5 PCS', 'Gros', '15 000 DZD', NULL, '/assets/vape_tornado.png', 'Pack idéal pour tester plusieurs saveurs à prix réduit.', 'PRIX DE GROS', 'bg-black text-blue-400', 'box-glow-green-hover', '["Mix Tornado", "Mix Alien"]'::jsonb, '[]'::jsonb),

-- ACCESSOIRES
('RÉSISTANCE TORNADO', 'Accessoires', '800 DZD', NULL, '/assets/vape_tornado.png', 'Résistance de remplacement pour votre vape Tornado.', 'PIÈCE ORIGINALE', 'bg-slate-500', 'box-glow-green-hover', '["0.8 Ohm", "1.2 Ohm"]'::jsonb, '[]'::jsonb),
('CHARGEUR USB-C RAPIDE', 'Accessoires', '1 200 DZD', NULL, '/assets/vape_tornado.png', 'Chargeur haute performance pour vos pods et puffs rechargeables.', 'ESSENTIEL', 'bg-slate-800', 'box-glow-green-hover', '[]'::jsonb, '[]'::jsonb),
('BATTERIE 18650', 'Accessoires', '1 500 DZD', NULL, '/assets/vape_tornado.png', 'Batterie haute capacité pour vos mods et kits vapes.', 'PUISSANCE', 'bg-red-800', 'box-glow-green-hover', '["3000mAh", "3500mAh"]'::jsonb, '[]'::jsonb),
('ÉTUI DE TRANSPORT', 'Accessoires', '900 DZD', NULL, '/assets/vape_tornado.png', 'Protégez votre matériel avec cet étui rigide et compact.', 'PROTECTION', 'bg-gray-700', 'box-glow-green-hover', '["Noir", "Camouflage"]'::jsonb, '[]'::jsonb);
