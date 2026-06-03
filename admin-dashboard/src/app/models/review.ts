export interface Review {
  id: string;
  order_item: string;
  variant: string;
  user: string;
  rating: number; // 1 a 5
  title?: string | null;
  body: string;
  is_approved: boolean;
  created_at: string;
}
