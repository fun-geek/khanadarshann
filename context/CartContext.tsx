import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, MenuItem, Order, OrderStatus } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  activeOrder: Order | null;
  placeOrder: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // Cart logic
  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === itemId) {
        return { ...i, quantity: Math.max(1, i.quantity + delta) };
      }
      return i;
    }));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Order Simulation Logic
  const placeOrder = () => {
    if (cart.length === 0) return;
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      items: [...cart],
      total: cartTotal,
      status: OrderStatus.PLACED,
      timestamp: Date.now(),
      estimatedTime: 30 + Math.floor(Math.random() * 15), // 30-45 mins
    };
    setActiveOrder(newOrder);
    clearCart();
  };

  // Live Tracking Simulation
  useEffect(() => {
    if (!activeOrder || activeOrder.status === OrderStatus.DELIVERED) return;

    const timer = setInterval(() => {
      setActiveOrder(prev => {
        if (!prev) return null;
        let nextStatus = prev.status;
        
        if (prev.status === OrderStatus.PLACED) nextStatus = OrderStatus.PREPARING;
        else if (prev.status === OrderStatus.PREPARING) nextStatus = OrderStatus.OUT_FOR_DELIVERY;
        else if (prev.status === OrderStatus.OUT_FOR_DELIVERY) nextStatus = OrderStatus.DELIVERED;

        if (nextStatus !== prev.status) {
          return { ...prev, status: nextStatus };
        }
        return prev;
      });
    }, 10000); // Change status every 10 seconds for demo purposes (usually would be minutes)

    return () => clearInterval(timer);
  }, [activeOrder]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, activeOrder, placeOrder, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
