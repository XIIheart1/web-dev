import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../hooks/useCart';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, size: string, quantity: number) => void;
  onRemoveItem: (id: string, size: string) => void;
  onCheckout: () => void;
  cartTotal: number;
}

export default function CartModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout,
  cartTotal 
}: CartModalProps) {
  if (!isOpen) return null;

  const shippingCost = cartTotal >= 500 ? 0 : 50;
  const finalTotal = cartTotal + shippingCost;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-black/90 backdrop-blur-xl h-full w-full max-w-md border-l border-white/10 shadow-2xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <ShoppingBag className="h-6 w-6" />
                Shopping Cart
              </h2>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors duration-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <p className="text-white/60 mt-1">{cartItems.length} items</p>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-white/20 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                <p className="text-white/60 mb-6">Add some awesome anime merchandise!</p>
                <button
                  onClick={onClose}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-600/10 rounded-lg p-3 flex-shrink-0">
                        <ShoppingBag className="h-6 w-6 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{item.name}</h3>
                        <p className="text-sm text-white/60">{item.anime}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full">
                            {item.size}
                          </span>
                          <span className="text-xs bg-white/10 text-white/60 px-2 py-1 rounded-full capitalize">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id, item.size)}
                        className="text-white/40 hover:text-red-400 transition-colors duration-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.size, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.size, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-400">
                          R{parseInt(item.price.replace('R', '')) * item.quantity}
                        </p>
                        <p className="text-xs text-white/60">
                          {item.price} each
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-white/10">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-white/80">
                  <span>Subtotal</span>
                  <span>R{cartTotal}</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : `R${shippingCost}`}</span>
                </div>
                {cartTotal < 500 && (
                  <p className="text-xs text-yellow-400">
                    Add R{500 - cartTotal} more for free shipping!
                  </p>
                )}
                <div className="flex justify-between text-lg font-bold border-t border-white/10 pt-3">
                  <span>Total</span>
                  <span className="text-blue-400">R{finalTotal}</span>
                </div>
              </div>
              
              <button
                onClick={onCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}