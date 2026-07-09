export interface OrderItem {
  id: number;

  product_id: number;

  title: string;

  image: string;

  size: string;

  quantity: number;

  price: number;
}

export interface Order {
  id: number;

  status: string;

  payment_status: string;

  total_amount: number;

  created_at: string;

  name: string;

  phone: string;

  address: string;

  city: string;

  state: string;

  pincode: string;

  items: OrderItem[];
}