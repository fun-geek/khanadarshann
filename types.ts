export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'starter' | 'main' | 'dessert' | 'beverage';
  image: string;
  spicyLevel?: number; // 0-3
  isVeg: boolean;
  rating: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export enum OrderStatus {
  PLACED = 'Placed',
  PREPARING = 'Preparing',
  OUT_FOR_DELIVERY = 'Out for Delivery',
  DELIVERED = 'Delivered',
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  timestamp: number;
  estimatedTime: number; // minutes
}

export type ChatMessage = {
  role: 'user' | 'assistant';
  text: string;
};
