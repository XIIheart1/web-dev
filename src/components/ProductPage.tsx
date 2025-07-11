import React, { useState } from 'react';
import { ArrowLeft, Heart, ShoppingCart, Star, Plus, Minus, Package, Shirt, Image, Mouse, Shield, Truck, RotateCcw } from 'lucide-react';

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

interface ProductPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onAddToWishlist: (product: Product) => void;
}

export default function ProductPage({ product, onBack, onAddToCart, onAddToWishlist }: ProductPageProps) {
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const getIcon = (category: string) => {
    switch (category) {
      case 'tees': return Shirt;
      case 'hoodies': return Package;
      case 'posters': return Image;
      case 'mousepads': return Mouse;
      default: return Star;
    }
  };

  const getSizes = (category: string) => {
    if (category === 'tees' || category === 'hoodies') {
      return ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    } else if (category === 'posters') {
      return ['A4', 'A3', 'A2', 'A1'];
    } else if (category === 'mousepads') {
      return ['Standard', 'Large', 'XL'];
    }
    return ['One Size'];
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, quantity);
  };

  const handleAddToWishlist = () => {
    onAddToWishlist(product);
    setIsWishlisted(true);
    setTimeout(() => setIsWishlisted(false), 2000);
  };

  const IconComponent = getIcon(product.category);
  const sizes = getSizes(product.category);
  const priceValue = parseInt(product.price.replace('R', ''));

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square bg-gradient-to-br from-blue-900/20 to-black/80 rounded-lg flex items-center justify-center border border-blue-600/20">
            <div className="text-center">
              <div className="bg-blue-600/10 rounded-full p-16 w-48 h-48 flex items-center justify-center mx-auto mb-6">
                <IconComponent className="h-24 w-24 text-blue-400" />
              </div>
              <p className="text-gray-400 text-lg">{product.anime}</p>
              {product.rarity && (
                <span className="inline-block mt-2 bg-red-600 text-white text-sm px-3 py-1 rounded-full font-semibold">
                  {product.rarity}
                </span>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
                  <p className="text-xl text-blue-400 font-semibold">{product.anime}</p>
                </div>
                <button
                  onClick={handleAddToWishlist}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isWishlisted 
                      ? 'bg-red-600 text-white' 
                      : 'bg-white/5 text-white/60 hover:bg-red-600/20 hover:text-red-400'
                  }`}
                >
                  <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-blue-400">{product.price}</span>
                <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm capitalize">
                  {product.category}
                </span>
                {product.type && (
                  <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                    {product.type}
                  </span>
                )}
              </div>

              {product.stock && (
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">Stock: {product.stock}</p>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                      style={{ 
                        width: `${(parseInt(product.stock.split('/')[0]) / parseInt(product.stock.split('/')[1])) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
                <span className="ml-2 text-gray-400">(4.8/5 - 124 reviews)</span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                {product.description || `Premium quality ${product.category.slice(0, -1)} featuring ${product.anime} design. Made with high-quality materials for lasting comfort and style. Perfect for any anime fan looking to express their otaku pride.`}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                      selectedSize === size
                        ? 'border-blue-400 bg-blue-600/20 text-blue-400'
                        : 'border-white/20 text-white/80 hover:border-blue-400/50 hover:bg-blue-600/10'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-white/20 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-white/5 transition-colors duration-300"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-white/5 transition-colors duration-300"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-gray-400">
                  Total: <span className="text-blue-400 font-semibold">R{priceValue * quantity}</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
              <button
                onClick={handleAddToWishlist}
                className="bg-white/5 hover:bg-red-600/20 text-white hover:text-red-400 py-4 px-6 rounded-lg font-semibold transition-all duration-300 border border-white/20 hover:border-red-400/50"
              >
                <Heart className="h-5 w-5" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 text-sm">
                <div className="bg-green-600/10 rounded-full p-2">
                  <Truck className="h-4 w-4 text-green-400" />
                </div>
                <span className="text-gray-300">Free shipping over R500</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="bg-blue-600/10 rounded-full p-2">
                  <Shield className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-gray-300">Premium quality</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="bg-yellow-600/10 rounded-full p-2">
                  <RotateCcw className="h-4 w-4 text-yellow-400" />
                </div>
                <span className="text-gray-300">30-day returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-white/10">
            <div className="flex space-x-8">
              <button className="py-4 px-2 border-b-2 border-blue-400 text-blue-400 font-semibold">
                Description
              </button>
              <button className="py-4 px-2 text-white/60 hover:text-white transition-colors duration-300">
                Size Guide
              </button>
              <button className="py-4 px-2 text-white/60 hover:text-white transition-colors duration-300">
                Reviews
              </button>
            </div>
          </div>
          <div className="py-8">
            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-semibold mb-4">Product Description</h3>
              <p className="text-gray-300 mb-4">
                This premium {product.category.slice(0, -1)} features an exclusive {product.anime} design created by our talented artist Garnet. 
                Each piece is carefully crafted using high-quality materials to ensure both comfort and durability.
              </p>
              <h4 className="text-lg font-semibold mb-2">Features:</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Premium quality materials</li>
                <li>Exclusive anime-inspired design</li>
                <li>Comfortable fit for everyday wear</li>
                <li>Fade-resistant printing</li>
                <li>Machine washable</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}