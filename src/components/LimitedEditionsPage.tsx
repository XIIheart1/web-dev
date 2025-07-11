import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Clock, Package, Shirt, Image, Mouse } from 'lucide-react';
import ProductPage from './ProductPage';
import { useCart } from '../hooks/useCart';

interface LimitedEditionsPageProps {
  onBack: () => void;
}

export default function LimitedEditionsPage({ onBack }: LimitedEditionsPageProps) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart, addToWishlist } = useCart();
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 12,
    minutes: 34,
    seconds: 56
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const limitedProducts = [
    { id: "l1", name: "Golden Saiyan Hoodie", price: "R800", stock: "3/50", anime: "Dragon Ball Z", rarity: "Ultra Rare", category: "hoodies", description: "Ultra-rare limited edition hoodie featuring Goku's legendary Super Saiyan transformation. Premium gold foil accents and exclusive embroidery make this a true collector's piece." },
    { id: "l2", name: "Akatsuki Cloud Tee", price: "R500", stock: "12/100", anime: "Naruto", rarity: "Rare", category: "tees", description: "Rare design featuring the iconic Akatsuki cloud pattern. High-quality print with fade-resistant inks on premium cotton blend." },
    { id: "l3", name: "Titan Shift Poster", price: "R300", stock: "7/25", anime: "Attack on Titan", rarity: "Limited", category: "posters", description: "Limited edition poster showcasing the epic titan transformation scenes. Museum-quality print on archival paper." },
    { id: "l4", name: "Demon Slayer Mousepad", price: "R500", stock: "18/75", anime: "Demon Slayer", rarity: "Special", category: "mousepads", description: "Special edition mousepad featuring Tanjiro's breathing techniques. Anti-slip base and smooth surface for optimal gaming." },
    { id: "l5", name: "Studio Ghibli Hoodie", price: "R750", stock: "5/30", anime: "Studio Ghibli", rarity: "Collector", category: "hoodies", description: "Collector's edition hoodie celebrating the magical world of Studio Ghibli. Embroidered details and premium fleece lining." },
    { id: "l6", name: "One Piece Treasure Tee", price: "R450", stock: "23/150", anime: "One Piece", rarity: "Limited", category: "tees", description: "Limited edition tee featuring the Straw Hat Pirates' treasure hunt. Vintage-style distressed print on soft cotton." },
    { id: "l7", name: "Evangelion Unit-01 Hoodie", price: "R800", stock: "2/20", anime: "Evangelion", rarity: "Ultra Rare", category: "hoodies", description: "Ultra-rare hoodie featuring Unit-01's iconic purple and green design. Glow-in-the-dark accents and premium construction." },
    { id: "l8", name: "Spirited Away Poster", price: "R280", stock: "15/60", anime: "Studio Ghibli", rarity: "Collector", category: "posters", description: "Collector's poster featuring Chihiro's magical journey. Hand-numbered limited edition with certificate of authenticity." },
    { id: "l9", name: "Jujutsu Kaisen Tee", price: "R480", stock: "8/80", anime: "Jujutsu Kaisen", rarity: "Rare", category: "tees", description: "Rare design featuring Yuji's cursed energy manifestation. Reactive ink that changes color with temperature." },
    { id: "l10", name: "Chainsaw Man Mousepad", price: "R480", stock: "11/40", anime: "Chainsaw Man", rarity: "Limited", category: "mousepads", description: "Limited edition mousepad with Denji's chainsaw transformation. Extended size with stitched edges for durability." },
    { id: "l11", name: "Mob Psycho 100 Hoodie", price: "R700", stock: "9/45", anime: "Mob Psycho 100", rarity: "Special", category: "hoodies", description: "Special edition hoodie featuring Mob's psychic powers visualization. Color-changing design that reacts to body heat." },
    { id: "l12", name: "Your Name Poster", price: "R270", stock: "20/100", anime: "Your Name", rarity: "Limited", category: "posters", description: "Limited edition poster capturing the movie's most iconic scene. Holographic elements that shimmer in different lighting." },
    { id: "l13", name: "Hunter x Hunter Tee", price: "R460", stock: "14/90", anime: "Hunter x Hunter", rarity: "Rare", category: "tees", description: "Rare tee featuring Gon and Killua's friendship bond. Embossed print with metallic accents on premium fabric." },
    { id: "l14", name: "Tokyo Ghoul Mousepad", price: "R470", stock: "25/120", anime: "Tokyo Ghoul", rarity: "Special", category: "mousepads", description: "Special edition mousepad with Kaneki's kagune design. RGB-compatible edges for gaming setups." },
    { id: "l15", name: "Bleach Bankai Hoodie", price: "R720", stock: "6/35", anime: "Bleach", rarity: "Collector", category: "hoodies", description: "Collector's hoodie featuring Ichigo's Bankai release. Embroidered sword details and premium heavyweight cotton." }
  ];

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product, size, quantity) => {
    addToCart(product, size, quantity);
    alert(`Added ${quantity}x ${product.name} (${size}) to cart!`);
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    alert(`Added ${product.name} to wishlist!`);
  };

  if (selectedProduct) {
    return (
      <ProductPage 
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
      />
    );
  }

  const getIcon = (category: string) => {
    switch (category) {
      case 'tees': return Shirt;
      case 'hoodies': return Package;
      case 'posters': return Image;
      case 'mousepads': return Mouse;
      default: return Star;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Ultra Rare': return 'from-red-500 to-red-700';
      case 'Collector': return 'from-purple-500 to-purple-700';
      case 'Rare': return 'from-orange-500 to-orange-700';
      case 'Limited': return 'from-yellow-500 to-yellow-700';
      case 'Special': return 'from-pink-500 to-pink-700';
      default: return 'from-red-500 to-red-700';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Home
        </button>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            LIMITED TIME ONLY
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Exclusive <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">Limited Editions</span>
          </h1>
          <p className="text-xl text-gray-400">Rare drops for true collectors - once they're gone, they're gone forever. All artwork by <a href="https://www.instagram.com/garnet_arts._/" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 underline">Garnet</a></p>
        </div>

        {/* Countdown Timer */}
        <div className="bg-gradient-to-r from-red-900/30 to-black/80 rounded-lg p-8 mb-12 border border-red-600/30">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-red-400 flex items-center justify-center gap-2">
              <Clock className="h-6 w-6" />
              Current Drop Ends In:
            </h3>
            <div className="flex justify-center gap-4 text-center">
              <div className="bg-red-600/20 rounded-lg p-4 min-w-[80px]">
                <div className="text-3xl font-bold text-red-400">{timeLeft.days}</div>
                <div className="text-sm text-gray-400">Days</div>
              </div>
              <div className="bg-red-600/20 rounded-lg p-4 min-w-[80px]">
                <div className="text-3xl font-bold text-red-400">{timeLeft.hours}</div>
                <div className="text-sm text-gray-400">Hours</div>
              </div>
              <div className="bg-red-600/20 rounded-lg p-4 min-w-[80px]">
                <div className="text-3xl font-bold text-red-400">{timeLeft.minutes}</div>
                <div className="text-sm text-gray-400">Minutes</div>
              </div>
              <div className="bg-red-600/20 rounded-lg p-4 min-w-[80px]">
                <div className="text-3xl font-bold text-red-400">{timeLeft.seconds}</div>
                <div className="text-sm text-gray-400">Seconds</div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {limitedProducts.map((product, index) => {
            const IconComponent = getIcon(product.category);
            const stockPercentage = (parseInt(product.stock.split('/')[0]) / parseInt(product.stock.split('/')[1])) * 100;
            
            return (
              <div key={index} className="group cursor-pointer" onClick={() => handleProductSelect(product)}>
                <div className="bg-black rounded-lg overflow-hidden shadow-2xl transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-red-500/20 border border-red-600/30 group-hover:border-red-400/50 relative">
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`bg-gradient-to-r ${getRarityColor(product.rarity)} text-white text-xs px-2 py-1 rounded-full font-semibold`}>
                      {product.rarity}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-black/80 text-red-300 text-xs px-2 py-1 rounded-full font-semibold">
                      {product.stock} left
                    </span>
                  </div>
                  <div className="aspect-w-3 aspect-h-4 bg-gradient-to-br from-red-900/20 to-black/80 h-80 flex items-center justify-center">
                    <div className="text-center">
                      <div className="bg-red-600/10 rounded-full p-8 w-24 h-24 flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600/20 transition-colors duration-300">
                        <IconComponent className="h-12 w-12 text-red-400" />
                      </div>
                      <p className="text-gray-400 text-sm">{product.anime}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-red-400 transition-colors duration-300">{product.name}</h3>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-red-400 text-lg font-bold">{product.price}</p>
                      <span className="text-xs bg-red-600/20 text-red-300 px-2 py-1 rounded-full capitalize">
                        {product.category}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${stockPercentage}%` }}
                      ></div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductSelect(product);
                      }}
                      className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}