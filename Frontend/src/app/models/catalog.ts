export interface ProductImage {
  id: string;
  image: string; // Django enviará la URL completa de Pillow, ej: http://127.0.0.1:8000/media/products/foto.jpg
  alt_text: string;
  is_primary: string;
}

export interface ProductVariant {
  id: string;
  variant_type: string;
  variant_value: string;
}

export interface Product {
  id: string;
  category: string;
  name: string;
  slug: string;
  brand: string;
  short_description: string;
  description: string;
  base_price: string; // Los DecimalField bajan como strings para no perder precisión numérica
  stock_quantity: number;
  is_active: boolean;
  images: ProductImage[];
  variants: ProductVariant[];
}
