export interface Category {
  id: string; // UUID
  name: string;
  slug: string;
  description?: string;
  image?: string; // URL de Pillow
  is_active: boolean;
}
