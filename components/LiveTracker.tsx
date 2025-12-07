import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { OrderStatus } from '../types';
import { CheckCircle, Clock, Truck, ChefHat, MapPin } from 'lucide-react';

const steps = [
  { status: OrderStatus.PLACED, icon: CheckCircle, label: 'Order Placed' },
  { status: OrderStatus.PREPARING, icon: ChefHat, label: 'Preparing' },
  { status: OrderStatus.OUT_FOR_DELIVERY, icon: Truck, label: 'On The Way' },
  { status: OrderStatus.DELIVERED, icon: MapPin, label: 'Delivered' },
];

const LiveTracker: React.FC = () => {
  const { activeOrder } = useCart();

  if (!activeOrder) return null;

  const currentStepIndex = steps.findIndex(s => s.status === activeOrder.status);

  return (
    <div id="tracker-section" className="w-full max-w-4xl mx-auto my-12 p-1">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 backdrop-blur-xl border border-glassBorder rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gold/5 blur-3xl -z-10 rounded-full" />

            <div className="flex justify-between items-center mb-10">
                <div>
                    <h3 className="text-3xl font-serif text-gold mb-1">Live Tracking</h3>
                    <p className="text-gray-400 text-sm">Order ID: #{activeOrder.id}</p>
                </div>
                {activeOrder.status !== OrderStatus.DELIVERED && (
                    <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-2 rounded-full border border-green-400/20">
                        <Clock size={16} className="animate-pulse" />
                        <span className="text-sm font-bold">ETA: {activeOrder.estimatedTime} mins</span>
                    </div>
                )}
            </div>

            {/* Stepper */}
            <div className="relative flex justify-between items-center z-10">
                {/* Connecting Line Background */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 rounded-full -z-10" />
                
                {/* Connecting Line Active */}
                <motion.div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-gold to-yellow-600 rounded-full -z-10" 
                    initial={{ width: '0%' }}
                    animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />

                {steps.map((step, idx) => {
                    const isActive = idx <= currentStepIndex;
                    const isCurrent = idx === currentStepIndex;

                    return (
                        <div key={step.label} className="flex flex-col items-center gap-4 relative">
                            <motion.div 
                                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${
                                    isActive ? 'bg-black border-gold text-gold' : 'bg-black border-white/10 text-gray-600'
                                }`}
                                animate={{ scale: isCurrent ? 1.2 : 1 }}
                            >
                                <step.icon size={20} />
                            </motion.div>
                            <span className={`text-xs md:text-sm font-medium ${isActive ? 'text-white' : 'text-gray-600'}`}>
                                {step.label}
                            </span>
                            {isCurrent && activeOrder.status !== OrderStatus.DELIVERED && (
                                <motion.div 
                                    className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full"
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Order Summary Preview */}
            <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap gap-4">
                {activeOrder.items.map(item => (
                    <div key={item.id} className="flex items-center gap-3 bg-white/5 pr-4 rounded-full p-1">
                        <img src={item.image} className="w-8 h-8 rounded-full object-cover" alt="" />
                        <span className="text-sm text-gray-300">{item.quantity}x {item.name}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    </div>
  );
};

export default LiveTracker;
