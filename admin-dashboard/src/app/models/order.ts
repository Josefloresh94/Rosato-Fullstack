export type OrderStatus = 'pending' | 'confirmed' | 'in_transit' | 'delivered' | 'cancelled';
export type PaymentMethod = 'wompi_card' | 'bank_transfer' | 'cash_on_delivery';
export type PaymentStatus = 'pending' | 'verified' | 'rejected';

export interface OrderItem {
  id: string;
  order: string;
  product: string;
  variant?: string | null;
  product_name: string;
  variant_info?: string | null;
  unit_price: number;
  quantity: number;
  subtotal: number;
}

export interface Payment {
  id: string;
  order: string;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  wompi_transaction_id?: string | null;
  transfer_proof_url?: string | null;
  verified_by?: string | null;
  verified_at?: string | null;
  created_at: string;
}

export interface Order {
  id: string;
  user: string; // UUID del usuario
  address: string; // UUID de la dirección
  status: OrderStatus;
  subtotal: number;
  total: number;
  notes?: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
  payment?: Payment;
}
