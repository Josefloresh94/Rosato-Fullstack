export interface Role {
  id: string;
  name: string;
  description: string;
}

export interface User {
  id: string;
  role: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string
  phone: number;
  is_active: boolean;
  created_at: string;
}

export interface Address{
  id: string;
  user: string;
  alias: string;
  full_address: string;
  department: string;
  municipality: string;
  is_default: boolean;
}
