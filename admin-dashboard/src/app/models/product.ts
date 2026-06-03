import { Category } from "./category";

export interface ProductImage {
  id: string; // UUID
  product: string; // ID del producto
  image: string; // URL de Pillow
  alt_text?: string;
  sort_order: number;
  is_primary: boolean;
}

export interface ProductVariant {
  id: string; // UUID
  product: string; // ID del producto
  variant_type: string; // Ej: 'Color', 'Talla'
  variant_value: string; // Ej: 'Negro', 'M'
  is_active: boolean;
}

export interface Product {
  id: string; // UUID
  category: Category; // O string (UUID) dependiendo de tu serializer en GET/POST
  name: string;
  slug: string;
  brand: string;
  short_description?: string;
  description: string;
  base_price: number;
  stock_quantity: number;
  low_stock_threshold: number;
  is_active: boolean;
  reviews_enabled: boolean;
  created_at: string;
  updated_at: string;
  variants?: ProductVariant[];
  images?: ProductImage[];
}
