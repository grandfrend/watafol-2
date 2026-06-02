/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Merchant, ProductMaster, MerchantInventory } from './types';

// Pre-seeded Master Catalog items (curated automatically)
export const masterProducts: ProductMaster[] = [
  {
    id: 'p1',
    name: 'Leche Pascual Entera 1L',
    category: 'alimentacion',
    image_url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=200',
    description: 'Leche entera de alta rotación importada. Rica en calcio, ideal para el desayuno.'
  },
  {
    id: 'p2',
    name: 'Aceite de Girasol Coosol 1L',
    category: 'alimentacion',
    image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=200',
    description: 'Aceite vegetal de girasol refinado de alta calidad, óptimo para freír o cocinar.'
  },
  {
    id: 'p3',
    name: 'Arroz Corona Grano Largo 1Kg',
    category: 'alimentacion',
    image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=200',
    description: 'Arroz blanco super extra, grano largo y suelto. Producto de la canasta básica.'
  },
  {
    id: 'p4',
    name: 'Paracetamol Calox 500mg (10 tabs)',
    category: 'medicamentos',
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200',
    description: 'Analgésico y antipirético para el alivio del dolor y la fiebre.'
  },
  {
    id: 'p5',
    name: 'Ibuprofeno Normon 400mg (10 tabs)',
    category: 'medicamentos',
    image_url: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&q=80&w=200',
    description: 'Antiinflamatorio no esteroideo indicado para dolores musculares y de cabeza.'
  },
  {
    id: 'p6',
    name: 'Amoxicilina Clavulánico 875/125mg',
    category: 'medicamentos',
    image_url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=200',
    description: 'Antibiótico de amplio espectro. Requiere prescripción médica formal.'
  },
  {
    id: 'p7',
    name: 'Jabón Corporal Palmolive Natura 120g',
    category: 'higiene',
    image_url: 'https://images.unsplash.com/photo-1607006342411-1a2f1f55a1d1?auto=format&fit=crop&q=80&w=200',
    description: 'Jabón de tocador perfumado con extractos naturales para la higiene diaria.'
  },
  {
    id: 'p8',
    name: 'Dentífrico Colgate Triple Acción 75ml',
    category: 'higiene',
    image_url: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&q=80&w=200',
    description: 'Pasta dental con protección anticaries, aliento fresco y dientes más blancos.'
  }
];

// Prefilled local merchants list (including unclaimed ones from initial web crawler)
export const initialMerchants: Merchant[] = [
  {
    id: 'm1',
    name: 'Abacería Don Manuel',
    slug: 'abaceria-don-manuel',
    type: 'abaceria',
    whatsapp_number: '+240222000001',
    lat: 3.7525,
    lng: 8.7815,
    is_verified: true,
    visibility_rank: 95,
    barrio: 'Los Ángeles',
    dip: 'DIP-9842512-GE',
    local_photos: [
      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=600'
    ],
    is_claimed: true,
    is_sponsored: false,
    rating: 4.8
  },
  {
    id: 'm2',
    name: 'Farmacia Ela Nguema',
    slug: 'farmacia-ela-nguema',
    type: 'farmacia',
    whatsapp_number: '+240222000002',
    lat: 3.7540,
    lng: 8.7940,
    is_verified: true,
    visibility_rank: 98,
    barrio: 'Ela Nguema',
    dip: 'DIP-1029472-GE',
    local_photos: [
      'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=600'
    ],
    is_claimed: true,
    is_sponsored: true, // Sponsored search positioning
    rating: 4.9
  },
  {
    id: 'm3',
    name: 'Mini-Super Buena Esperanza',
    slug: 'mini-super-buena-esperanza',
    type: 'abaceria',
    whatsapp_number: '+240222000003',
    lat: 3.7380,
    lng: 8.7900,
    is_verified: false,
    visibility_rank: 82,
    barrio: 'Buena Esperanza',
    is_claimed: true,
    rating: 4.1
  },
  // Unclaimed merchant profiles detected by crawler (Hidden to users until claimed as per guidelines: "Fase 0 (Oculta)")
  {
    id: 'm4_unclaimed',
    name: 'Farmacia Central Malabo',
    slug: 'farmacia-central-malabo',
    type: 'farmacia',
    whatsapp_number: '',
    lat: 3.7504,
    lng: 8.7831,
    is_verified: false,
    visibility_rank: 50,
    barrio: 'Plaza de España',
    is_claimed: false
  },
  {
    id: 'm5_unclaimed',
    name: 'Abacería La Amistad - Caracolas',
    slug: 'abaceria-la-amistad-caracolas',
    type: 'abaceria',
    whatsapp_number: '',
    lat: 3.7565,
    lng: 8.7692,
    is_verified: false,
    visibility_rank: 45,
    barrio: 'Caracolas',
    is_claimed: false
  },
  {
    id: 'm6_unclaimed',
    name: 'Farmacia El Paraíso',
    slug: 'farmacia-el-paraiso',
    type: 'farmacia',
    whatsapp_number: '',
    lat: 3.7420,
    lng: 8.7750,
    is_verified: false,
    visibility_rank: 40,
    barrio: 'El Paraíso',
    is_claimed: false
  }
];

// Seed inventory data with price differences to enable Price Parity Filter & Barrio Price Comparator
export const initialInventory: MerchantInventory[] = [
  // Merchant 1 inventory
  { merchant_id: 'm1', product_id: 'p1', price: 1100, is_available: true }, // Leche Pascual
  { merchant_id: 'm1', product_id: 'p2', price: 1850, is_available: true }, // Aceite Coosol
  { merchant_id: 'm1', product_id: 'p3', price: 800, is_available: true },  // Arroz Corona
  { merchant_id: 'm1', product_id: 'p7', price: 450, is_available: true },  // Jabon Palmolive
  { merchant_id: 'm1', product_id: 'p8', price: 750, is_available: true },  // Colgate

  // Merchant 2 inventory (Farmacia Ela Nguema)
  { merchant_id: 'm2', product_id: 'p4', price: 600, is_available: true },  // Paracetamol
  { merchant_id: 'm2', product_id: 'p5', price: 900, is_available: true },  // Ibuprofeno
  { merchant_id: 'm2', product_id: 'p6', price: 3200, is_available: true }, // Amoxicilina
  { merchant_id: 'm2', product_id: 'p7', price: 500, is_available: true },  // Jabon Palmolive

  // Merchant 3 inventory
  { merchant_id: 'm3', product_id: 'p1', price: 1250, is_available: true }, // Leche Pascual (more expensive)
  { merchant_id: 'm3', product_id: 'p2', price: 1800, is_available: true }, // Aceite (cheaper)
  { merchant_id: 'm3', product_id: 'p3', price: 850, is_available: true },  // Arroz Corona
  { merchant_id: 'm3', product_id: 'p8', price: 700, is_available: true }   // Colgate (cheaper)
];

// Pre-packaged base64 placeholders mimicking handwritten prescription recipes to support camera mock flow
export const samplePrescriptions = [
  {
    name: 'Receta para Gripe (Ibuprofeno + Paracetamol)',
    medicines: ['Paracetamol Calox 500mg (10 tabs)', 'Ibuprofeno Normon 400mg (10 tabs)'],
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=200',
    raw_text: 'MALABO MEDICAL CENTER\nReceta: Tomar Paracetamol 500mg tres veces al día por dolor de cabeza.\nAdicionalmente Ibuprofeno 400mg cada 8 horas si hay inflamación de garganta.'
  },
  {
    name: 'Receta de Infección (Amoxicilina Clavulánico)',
    medicines: ['Amoxicilina Clavulánico 875/125mg'],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=200',
    raw_text: 'DR. OBIANG - CLINICA GUADALUPE\nDiagnostico: Amoxicilina Clavulánico 875/125mg.\nTomar 1 cápsula cada 12 horas durante 7 días acompañando comidas.'
  },
  {
    name: 'Receta Combinada Completa',
    medicines: ['Amoxicilina Clavulánico 875/125mg', 'Ibuprofeno Normon 400mg (10 tabs)', 'Jabón Corporal Palmolive Natura 120g'],
    image: 'https://images.unsplash.com/photo-1527341852504-20a7b45ca46c?auto=format&fit=crop&q=80&w=200',
    raw_text: 'PRESCRIPTION FORM\n- Amoxicilina 875mg\n- Ibuprofeno 400mg\n- Jabon neutro de tocador humectante'
  }
];
