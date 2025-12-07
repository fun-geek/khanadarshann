import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CartProvider, useCart } from './context/CartContext';
import { MENU_ITEMS } from './constants';
import DishCard from './components/DishCard';
import AIChef from './components/AIChef';
import CartDrawer from './components/CartDrawer';
import LiveTracker from './components/LiveTracker';
import { ShoppingCart, UtensilsCrossed, Search } from 'lucide-react';
import { motion } from 'framer-motion';

// Inner App to use Context
const KhanaDarshanApp = () => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();

  const categories = ['all', 'starter', 'main', 'dessert', 'beverage'];

  const filteredItems = categoryFilter === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === categoryFilter);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white selection:bg-gold selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-black">
              <UtensilsCrossed size={20} />
            </div>
            <h1 className="text-2xl font-serif font-bold tracking-tight text-white">
              Khana<span className="text-gold">Darshan</span>
            </h1>
          </div>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-3 rounded-full hover:bg-white/10 transition-colors"
          >
            <ShoppingCart className="text-white" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Parallax */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2874&auto=format&fit=crop" 
            alt="Restaurant Ambience" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/50 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xl md:text-2xl text-gold font-medium tracking-widest uppercase mb-4">Welcome to Royal Dining</h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight">
              Taste the <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-300">Tradition</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
              Experience the finest culinary artistry where modern techniques meet ancient recipes. 
            </p>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-8 px-8 py-3 bg-gold text-black font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            Explore Menu
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-20">
        
        {/* Live Tracker (Shows only when order is active) */}
        <LiveTracker />

        {/* Menu Section */}
        <section id="menu" className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-serif text-white">Our Masterpieces</h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                  categoryFilter === cat 
                    ? 'bg-gold text-black shadow-lg shadow-gold/20' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-12">
            {filteredItems.map((item) => (
              <DishCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500">
          <h2 className="text-2xl font-serif text-white mb-4">Khana<span className="text-gold">Darshan</span></h2>
          <p className="mb-4">123 Culinary Avenue, Flavor Town, FT 56001</p>
          <p>&copy; {new Date().getFullYear()} KhanaDarshan. All rights reserved.</p>
        </div>
      </footer>

      {/* Overlays */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AIChef />
    </div>
  );
};

// Root Render
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Could not find root element to mount to");

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <CartProvider>
      <KhanaDarshanApp />
    </CartProvider>
  </React.StrictMode>
);