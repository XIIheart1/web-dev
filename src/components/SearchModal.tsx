import React, { useState, useEffect } from 'react';
import { X, Search, Star, Package, Shirt, Image, Mouse } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  anime: string;
  type?: string;
  rarity?: string;
  stock?: string;
  description?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductSelect: (product: Product) => void;
  products: Product[];
}

export default function SearchModal({ isOpen, onClose, onProductSelect, products }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.anime.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  const getIcon = (category: string) => {
    switch (category) {
      case 'tees': return Shirt;
      case 'hoodies': return Package;
      case 'posters': return Image;
      case 'mousepads': return Mouse;
      default: return Star;
    }
  };

  const handleProductClick = (product: Product) => {
    onProductSelect(product);
    onClose();
    setSearchQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-black/90 backdrop-blur-xl rounded-2xl w-full max-w-2xl mx-4 border border-white/10 shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Search Products</h2>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors duration-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
            <input
              type="text"
              placeholder="Search by product name, anime, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              autoFocus
            />
          </div>

          <div className="max-h-96 overflow-y-auto">
            {searchQuery.trim() === '' ? (
              <div className="text-center py-8 text-white/60">
                Start typing to search for products...
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-8 text-white/60">
                No products found for "{searchQuery}"
              </div>
            ) : (
              <div className="space-y-2">
                {filteredProducts.map((product) => {
                  const IconComponent = getIcon(product.category);
                  return (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-300 group"
                    >
                      <div className="bg-blue-600/10 rounded-full p-3 group-hover:bg-blue-600/20 transition-colors duration-300">
                        <IconComponent className="h-6 w-6 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold group-hover:text-blue-400 transition-colors duration-300">
                          {product.name}
                        </h3>
                        <p className="text-sm text-white/60">{product.anime}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-400">{product.price}</p>
                        <p className="text-xs text-white/60 capitalize">{product.category}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}