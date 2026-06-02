/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string; // Phone number is the id (Unique)
  name: string;
  email?: string;
  barrio?: string;
  pin?: string;
  created_at: string;
}

export interface Merchant {
  id: string;
  slug: string;
  name: string;
  type: 'abaceria' | 'farmacia';
  whatsapp_number: string;
  lat: number;
  lng: number;
  is_verified: boolean;
  visibility_rank: number;
  barrio: string;
  dip?: string;
  local_photos?: string[];
  is_claimed: boolean;
  is_sponsored?: boolean; // For Sponsored Listings (SEM)
  rating?: number;
}

export interface ProductMaster {
  id: string;
  name: string;
  category: 'alimentacion' | 'higiene' | 'medicamentos';
  image_url: string;
  description: string;
}

export interface MerchantInventory {
  merchant_id: string;
  product_id: string;
  price: number;
  is_available: boolean; // "Botón de Pánico" Switcher
  stock_count?: number; // QR code mobile pos simulation
}

export interface Ticket {
  id: string; // e.g. WTF-10294
  user_id: string; // customer phone
  user_name: string;
  merchant_id: string;
  merchant_name: string;
  products: Array<{
    product_id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total_price: number;
  status: 'pendiente' | 'atendido' | 'incidencia';
  created_at: string;
  reported_at?: string;
  is_reported?: boolean;
}
