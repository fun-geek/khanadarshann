import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, placeOrder } = useCart();

  const handleCheckout = () => {
    placeOrder();
    onClose();
    // Scroll to tracker
    document.getElementById('tracker-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#121212] border-l border-glassBorder shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-glassBorder flex justify-between items-center bg-white/5">
              <h2 className="text-2xl font-serif text-gold flex items-center gap-2">
                <ShoppingBag /> Your Order
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
                <X />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p>Your plate is empty.</p>
                  <button onClick={onClose} className="text-gold underline">Explore Menu</button>
                </div>
              ) : (
                cart.map(item => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-4 bg-white/5 p-4 rounded-xl border border-white/5"
                  >
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-white line-clamp-1">{item.name}</h4>
                        <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 text-xs hover:text-red-300"
                        >Remove</button>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-gold font-bold">${item.price * item.quantity}</span>
                        <div className="flex items-center gap-3 bg-black/50 rounded-full px-2 py-1 border border-white/10">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:text-white text-gray-400"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm w-4 text-center">{item.quantity}</span>
                          <button 
                             onClick={() => updateQuantity(item.id, 1)}
                             className="p-1 hover:text-white text-gray-400"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-glassBorder bg-white/5 space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-400">Total Amount</span>
                  <span className="font-bold text-gold text-2xl">${cartTotal}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-gradient-to-r from-gold to-yellow-600 text-black font-bold rounded-xl text-lg hover:shadow-lg hover:shadow-gold/20 transition-all active:scale-95 flex justify-center items-center gap-2"
                >
                  Place Order <ArrowRight size={20} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
