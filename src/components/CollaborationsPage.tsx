import React from 'react';
import { ArrowLeft, Star, Package, Shirt, Image, Mouse, Crown, Award, Zap } from 'lucide-react';
import ProductPage from './ProductPage';
import { useCart } from '../hooks/useCart';

interface CollaborationsPageProps {
  onBack: () => void;
}

export default function CollaborationsPage({ onBack }: CollaborationsPageProps) {
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const { addToCart, addToWishlist } = useCart();

  const collaborations = [
    {
      partner: "Studio MAPPA",
      collection: "Attack on Titan Final Season",
      description: "Official merchandise celebrating the epic finale of humanity's greatest battle",
      items: "15 exclusive designs",
      status: "Available Now",
      logo: Crown,
      products: [
        { id: "c1", name: "MAPPA x Lowkey Eren Hoodie", price: "R550", anime: "Attack on Titan", type: "Official Collab", category: "hoodies", description: "Official collaboration with Studio MAPPA featuring Eren's final form. Premium heavyweight cotton with official licensing seal." },
        { id: "c2", name: "Survey Corps Elite Tee", price: "R450", anime: "Attack on Titan", type: "Official Collab", category: "tees", description: "Elite Survey Corps design approved by MAPPA. Features the Wings of Freedom emblem with metallic thread embroidery." },
        { id: "c3", name: "Founding Titan Poster", price: "R280", anime: "Attack on Titan", type: "Official Collab", category: "posters", description: "Official poster featuring the Founding Titan's colossal form. Signed by key animators from the final season." },
        { id: "c4", name: "Wings of Freedom Mousepad", price: "R480", anime: "Attack on Titan", type: "Official Collab", category: "mousepads", description: "Official Survey Corps mousepad with anti-fray stitching. Features the regiment's motto in Japanese and English." },
        { id: "c5", name: "Levi Squad Hoodie", price: "R650", anime: "Attack on Titan", type: "Official Collab", category: "hoodies", description: "Premium hoodie honoring Levi's Special Operations Squad. Includes individual member patches and squad insignia." }
      ]
    },
    {
      partner: "Toei Animation",
      collection: "One Piece Film: Red",
      description: "Limited edition items from the blockbuster movie featuring Shanks and Uta",
      items: "12 exclusive designs",
      status: "Pre-Order",
      logo: Award,
      products: [
        { id: "c6", name: "Toei x Lowkey Luffy Tee", price: "R420", anime: "One Piece", type: "Movie Exclusive", category: "tees", description: "Exclusive Film Red merchandise featuring Luffy's Gear 5 form. Only available through official Toei partnership." },
        { id: "c7", name: "Shanks Red Hair Hoodie", price: "R680", anime: "One Piece", type: "Movie Exclusive", category: "hoodies", description: "Movie-exclusive hoodie featuring Red-Haired Shanks. Premium red fleece with embroidered Jolly Roger." },
        { id: "c8", name: "Uta Concert Poster", price: "R270", anime: "One Piece", type: "Movie Exclusive", category: "posters", description: "Concert poster from Uta's performance in Film Red. Holographic finish with movie theater exclusive design." },
        { id: "c9", name: "Straw Hat Pirates Mousepad", price: "R470", anime: "One Piece", type: "Movie Exclusive", category: "mousepads", description: "Film Red exclusive mousepad featuring the crew's movie outfits. Extended size perfect for gaming." }
      ]
    },
    {
      partner: "WIT Studio",
      collection: "Attack on Titan Legacy",
      description: "Celebrating the iconic first three seasons with vintage-inspired designs",
      items: "10 exclusive designs",
      status: "Available Now",
      logo: Zap,
      products: [
        { id: "c10", name: "WIT Studio Levi Poster", price: "R260", anime: "Attack on Titan", type: "Artist Series", category: "posters", description: "Artist series poster celebrating WIT Studio's iconic Levi scenes. Hand-signed by the character designer." },
        { id: "c11", name: "Vintage Survey Corps Tee", price: "R410", anime: "Attack on Titan", type: "Artist Series", category: "tees", description: "Vintage-style tee honoring the original three seasons. Distressed print with authentic aging effects." },
        { id: "c12", name: "Titan Shifter Hoodie", price: "R620", anime: "Attack on Titan", type: "Artist Series", category: "hoodies", description: "Artist series hoodie featuring all nine titan shifters. Glow-in-the-dark titan marks and premium construction." },
        { id: "c13", name: "Colossal Titan Mousepad", price: "R460", anime: "Attack on Titan", type: "Artist Series", category: "mousepads", description: "Oversized mousepad featuring the Colossal Titan's imposing silhouette. Heat-reactive surface reveals hidden details." }
      ]
    },
    {
      partner: "Studio Pierrot",
      collection: "Naruto 20th Anniversary",
      description: "Commemorating two decades of ninja adventures with special edition designs",
      items: "18 exclusive designs",
      status: "Available Now",
      logo: Star,
      products: [
        { id: "c14", name: "Hokage Legacy Hoodie", price: "R700", anime: "Naruto", type: "Anniversary Edition", category: "hoodies", description: "20th anniversary hoodie featuring all seven Hokage. Gold foil numbering and premium anniversary packaging." },
        { id: "c15", name: "Team 7 Reunion Tee", price: "R440", anime: "Naruto", type: "Anniversary Edition", category: "tees", description: "Anniversary tee celebrating Team 7's bond. Features then-and-now artwork with metallic accents." },
        { id: "c16", name: "Nine-Tails Chakra Poster", price: "R290", anime: "Naruto", type: "Anniversary Edition", category: "posters", description: "Anniversary poster showcasing Kurama's chakra mode. UV-reactive inks create stunning visual effects." },
        { id: "c17", name: "Sharingan Gaming Mousepad", price: "R490", anime: "Naruto", type: "Anniversary Edition", category: "mousepads", description: "Gaming mousepad with animated Sharingan pattern. LED-compatible edges sync with your setup." }
      ]
    }
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Official Collab': return 'from-purple-500 to-purple-700';
      case 'Movie Exclusive': return 'from-blue-500 to-blue-700';
      case 'Artist Series': return 'from-green-500 to-green-700';
      case 'Anniversary Edition': return 'from-yellow-500 to-yellow-700';
      default: return 'from-purple-500 to-purple-700';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Home
        </button>

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-600/20 text-purple-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Star className="w-4 h-4" />
            EXCLUSIVE PARTNERSHIPS
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Epic <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Collaborations</span>
          </h1>
          <p className="text-xl text-gray-400">Official partnerships with legendary anime studios - All artwork by <a href="https://www.instagram.com/garnet_arts._/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">Garnet</a></p>
        </div>

        {/* Collaborations Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {collaborations.map((collab, index) => {
            const LogoIcon = collab.logo;
            return (
              <div key={index} className="bg-gradient-to-br from-purple-900/20 to-black/80 rounded-lg p-8 border border-purple-600/30 group hover:border-purple-400/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-600/10 rounded-full p-3 group-hover:bg-purple-600/20 transition-colors duration-300">
                      <LogoIcon className="h-8 w-8 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1 group-hover:text-purple-400 transition-colors duration-300">{collab.partner}</h3>
                      <p className="text-purple-400 font-semibold">{collab.collection}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    collab.status === 'Available Now' 
                      ? 'bg-green-600/20 text-green-400' 
                      : 'bg-yellow-600/20 text-yellow-400'
                  }`}>
                    {collab.status}
                  </span>
                </div>
                <p className="text-gray-300 mb-4">{collab.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{collab.items}</span>
                  <span className="text-sm text-purple-400 font-semibold">{collab.products.length} products available</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* All Collaboration Products */}
        <div className="space-y-16">
          {collaborations.map((collab, collabIndex) => (
            <div key={collabIndex}>
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-purple-600/10 rounded-full p-3">
                  <collab.logo className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{collab.partner}</h2>
                  <p className="text-purple-400">{collab.collection}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {collab.products.map((product, productIndex) => {
                  const IconComponent = getIcon(product.category);
                  
                  return (
                    <div key={productIndex} className="group cursor-pointer" onClick={() => handleProductSelect(product)}>
                      <div className="bg-black rounded-lg overflow-hidden shadow-2xl transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-purple-500/20 border border-purple-600/30 group-hover:border-purple-400/50 relative">
                        <div className="absolute top-4 right-4 z-10">
                          <span className={`bg-gradient-to-r ${getTypeColor(product.type)} text-white text-xs px-2 py-1 rounded-full font-semibold`}>
                            {product.type}
                          </span>
                        </div>
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-black/80 text-purple-300 text-xs px-2 py-1 rounded-full font-semibold">
                            Official
                          </span>
                        </div>
                        <div className="aspect-w-3 aspect-h-4 bg-gradient-to-br from-purple-900/20 to-black/80 h-80 flex items-center justify-center">
                          <div className="text-center">
                            <div className="bg-purple-600/10 rounded-full p-8 w-24 h-24 flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600/20 transition-colors duration-300">
                              <IconComponent className="h-12 w-12 text-purple-400" />
                            </div>
                            <p className="text-gray-400 text-sm">{product.anime}</p>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors duration-300">{product.name}</h3>
                          <div className="flex justify-between items-center mb-4">
                            <p className="text-purple-400 text-lg font-bold">{product.price}</p>
                            <span className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full capitalize">
                              {product.category}
                            </span>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProductSelect(product);
                            }}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                          >
                            {collab.status === 'Pre-Order' ? 'Pre-Order Details' : 'View Details'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}