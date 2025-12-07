import React from 'react';
import { motion } from 'framer-motion';
import { MenuItem } from '../types';
import { Plus, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface DishCardProps {
  item: MenuItem;
}

const DishCard: React.FC<DishCardProps> = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <div className="group h-[400px] w-full perspective-1000">
      <motion.div
        className="relative h-full w-full rounded-2xl bg-glass border border-glassBorder p-6 shadow-xl transition-all duration-500 ease-out preserve-3d group-hover:rotate-y-12 group-hover:rotate-x-6 backdrop-blur-md"
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Floating Image */}
        <div className="relative -mt-16 mb-4 flex justify-center transform group-hover:translate-z-10 transition-transform duration-500">
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gold/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
             <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          </div>
          {item.isVeg ? (
             <span className="absolute top-0 right-10 bg-green-500 text-xs px-2 py-1 rounded-full text-black font-bold">VEG</span>
          ) : (
             <span className="absolute top-0 right-10 bg-red-500 text-xs px-2 py-1 rounded-full text-white font-bold">NON-VEG</span>
          )}
        </div>

        {/* Content */}
        <div className="text-center space-y-3">
          <h3 className="text-2xl font-serif text-gold truncate">{item.name}</h3>
          
          <div className="flex justify-center items-center gap-1 text-yellow-400">
            <Star size={16} fill="currentColor" />
            <span className="text-sm">{item.rating}</span>
          </div>

          <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Bottom Action */}
        <div className="absolute bottom-6 left-0 right-0 px-6 flex justify-between items-center">
          <span className="text-xl font-bold text-white">${item.price}</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              addToCart(item);
            }}
            className="bg-gold/80 hover:bg-gold text-black p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg shadow-gold/20"
          >
            <Plus size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DishCard;
