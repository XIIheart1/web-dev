import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ShoppingCart, 
  Heart, 
  User, 
  Search, 
  Star, 
  Package, 
  Shirt, 
  Image, 
  Mouse, 
  Clock, 
  Zap, 
  Crown,
  Award,
  Filter,
  Grid,
  List
} from 'lucide-react';
import AuthModal from './components/AuthModal';
import CartModal from './components/CartModal';
import CheckoutPage from './components/CheckoutPage';
import OrderConfirmationPage from './components/OrderConfirmationPage';
import ProductPage from './components/ProductPage';
import LimitedEditionsPage from './components/LimitedEditionsPage';
import CollaborationsPage from './components/CollaborationsPage';
import SearchModal from './components/SearchModal';
import { useAuth } from './hooks/useAuth';
import { useCart } from './hooks/useCart';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [animatedElements, setAnimatedElements] = useState(new Set());
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [productFilter, setProductFilter] = useState('all'); // 'all', 'limited', 'collaborations'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const { user, login, signup, logout, checkAuth } = useAuth();
  const { cartItems, addToCart, removeFromCart, updateQuantity, addToWishlist, getCartTotal, getCartItemCount } = useCart();

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedElements(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [currentPage]);

  const products = [
    // Regular products
    { id: "1", name: "Naruto Hokage Hoodie", price: "R650", category: "hoodies", anime: "Naruto", type: "regular" },
    { id: "2", name: "Attack on Titan Scout Tee", price: "R350", category: "tees", anime: "Attack on Titan", type: "regular" },
    { id: "3", name: "Dragon Ball Z Poster", price: "R200", category: "posters", anime: "Dragon Ball Z", type: "regular" },
    { id: "4", name: "One Piece Straw Hat Mousepad", price: "R400", category: "mousepads", anime: "One Piece", type: "regular" },
    { id: "5", name: "Demon Slayer Tanjiro Hoodie", price: "R700", category: "hoodies", anime: "Demon Slayer", type: "regular" },
    { id: "6", name: "My Hero Academia Tee", price: "R380", category: "tees", anime: "My Hero Academia", type: "regular" },
    { id: "7", name: "Studio Ghibli Totoro Poster", price: "R250", category: "posters", anime: "Studio Ghibli", type: "regular" },
    { id: "8", name: "Jujutsu Kaisen Gaming Mousepad", price: "R450", category: "mousepads", anime: "Jujutsu Kaisen", type: "regular" },
    
    // Limited Edition products
    { id: "l1", name: "Golden Saiyan Hoodie", price: "R800", stock: "3/50", anime: "Dragon Ball Z", rarity: "Ultra Rare", category: "hoodies", type: "limited", description: "Ultra-rare limited edition hoodie featuring Goku's legendary Super Saiyan transformation. Premium gold foil accents and exclusive embroidery make this a true collector's piece." },
    { id: "l2", name: "Akatsuki Cloud Tee", price: "R500", stock: "12/100", anime: "Naruto", rarity: "Rare", category: "tees", type: "limited", description: "Rare design featuring the iconic Akatsuki cloud pattern. High-quality print with fade-resistant inks on premium cotton blend." },
    { id: "l3", name: "Titan Shift Poster", price: "R300", stock: "7/25", anime: "Attack on Titan", rarity: "Limited", category: "posters", type: "limited", description: "Limited edition poster showcasing the epic titan transformation scenes. Museum-quality print on archival paper." },
    { id: "l4", name: "Demon Slayer Mousepad", price: "R500", stock: "18/75", anime: "Demon Slayer", rarity: "Special", category: "mousepads", type: "limited", description: "Special edition mousepad featuring Tanjiro's breathing techniques. Anti-slip base and smooth surface for optimal gaming." },
    
    // Collaboration products
    { id: "c1", name: "Craft Singh x Lowkey Dragon Hoodie", price: "R750", anime: "Dragon Ball Z", type: "collaboration", category: "hoodies", partner: "Craft Singh", description: "Exclusive designer collaboration featuring premium streetwear aesthetics with Dragon Ball Z elements. Limited edition with custom embroidery." },
    { id: "c2", name: "Urban Saiyan Tee", price: "R550", anime: "Dragon Ball Z", type: "collaboration", category: "tees", partner: "Craft Singh", description: "High-end streetwear tee with minimalist Saiyan design. Premium cotton blend with subtle metallic accents." },
    { id: "c6", name: "Exactly x Lowkey Naruto Tee", price: "R520", anime: "Naruto", type: "collaboration", category: "tees", partner: "Exactly Clothing", description: "Perfectly tailored tee with precise measurements and premium fabric. Features subtle Naruto-inspired design elements." },
    { id: "c7", name: "Hokage Precision Hoodie", price: "R780", anime: "Naruto", type: "collaboration", category: "hoodies", partner: "Exactly Clothing", description: "Meticulously crafted hoodie with perfect fit guarantee. Premium materials with Hokage-inspired design details." }
  ];

  const handleLogin = async (email: string, password: string) => {
    const result = await login(email, password);
    if (result.success) {
      setIsAuthModalOpen(false);
    }
  };

  const handleSignup = async (name: string, email: string, password: string) => {
    const result = await signup(name, email, password);
    if (result.success) {
      setIsAuthModalOpen(false);
    }
  };

  const handleAddToCart = (product: any, size: string, quantity: number) => {
    addToCart(product, size, quantity);
    alert(`Added ${quantity}x ${product.name} (${size}) to cart!`);
  };

  const handleAddToWishlist = (product: any) => {
    addToWishlist(product);
    alert(`Added ${product.name} to wishlist!`);
  };

  const handleCheckout = () => {
    setIsCartModalOpen(false);
    setCurrentPage('checkout');
  };

  const handleOrderComplete = (data: any) => {
    setOrderData(data);
    setCurrentPage('order-confirmation');
    // Clear cart after successful order
    cartItems.forEach(item => removeFromCart(item.id, item.size));
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'tees': return Shirt;
      case 'hoodies': return Package;
      case 'posters': return Image;
      case 'mousepads': return Mouse;
      default: return Star;
    }
  };

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const typeMatch = productFilter === 'all' || product.type === productFilter;
    return categoryMatch && typeMatch;
  });

  const displayedProducts = showAllProducts ? filteredProducts : filteredProducts.slice(0, 8);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-purple-600 rounded-full animate-spin animation-delay-150"></div>
          </div>
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent animate-pulse">
            Lowkey! Otaku
          </h2>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-100"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce animation-delay-200"></div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'limited-editions') {
    return <LimitedEditionsPage onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'collaborations') {
    return <CollaborationsPage onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'checkout') {
    return (
      <CheckoutPage
        onBack={() => setCurrentPage('home')}
        cartItems={cartItems}
        cartTotal={getCartTotal()}
        onOrderComplete={handleOrderComplete}
      />
    );
  }

  if (currentPage === 'order-confirmation') {
    return (
      <OrderConfirmationPage
        orderData={orderData}
        onBackToHome={() => setCurrentPage('home')}
      />
    );
  }

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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl' 
          : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className={`text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent transition-all duration-300 ${
              isScrolled ? 'scale-90' : 'scale-100'
            }`}>
              Lowkey! Otaku
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="nav-link relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#products" className="nav-link relative group">
                Products
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#about" className="nav-link relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="nav-link relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsSearchModalOpen(true)}
                className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Search className="h-5 w-5 transition-transform duration-300 hover:rotate-12" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110">
                <Heart className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
              </button>
              <button 
                onClick={() => setIsCartModalOpen(true)}
                className="relative p-2 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110"
              >
                <ShoppingCart className="h-5 w-5 transition-transform duration-300 hover:rotate-12" />
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                    {getCartItemCount()}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110"
              >
                <User className="h-5 w-5 transition-transform duration-300 hover:rotate-12" />
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-white/10 rounded-full transition-all duration-300"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 animate-slide-down">
            <div className="px-4 py-6 space-y-4">
              <a href="#home" className="block py-2 hover:text-blue-400 transition-colors duration-300 animate-fade-in">Home</a>
              <a href="#products" className="block py-2 hover:text-blue-400 transition-colors duration-300 animate-fade-in animation-delay-100">Products</a>
              <a href="#about" className="block py-2 hover:text-blue-400 transition-colors duration-300 animate-fade-in animation-delay-200">About</a>
              <a href="#contact" className="block py-2 hover:text-blue-400 transition-colors duration-300 animate-fade-in animation-delay-300">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black"></div>
          {/* Floating Particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-float opacity-60"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-float-delayed opacity-40"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-pink-400 rounded-full animate-float-slow opacity-80"></div>
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-blue-300 rounded-full animate-float opacity-50"></div>
          <div className="absolute bottom-1/3 right-1/2 w-3 h-3 bg-purple-300 rounded-full animate-float-delayed opacity-30"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
              Lowkey!
            </span>
            <br />
            <span className="text-white animate-fade-in-up animation-delay-200">Otaku</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-400">
            Premium anime merchandise for true fans. Express your otaku pride with our exclusive collection of hoodies, tees, posters, and gaming gear.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
            <button 
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
            >
              Shop Now
              <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
            <button 
              onClick={() => setCurrentPage('limited-editions')}
              className="group bg-transparent border-2 border-white/20 hover:border-purple-400 text-white hover:text-purple-400 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Limited Drops
              <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">✨</span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="featured-title"
            data-animate
            className={`text-center mb-16 transition-all duration-800 ${
              animatedElements.has('featured-title') ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Collections</h2>
            <p className="text-xl text-gray-400">Discover our most popular anime merchandise</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              id="limited-card"
              data-animate
              className={`group cursor-pointer transition-all duration-800 ${
                animatedElements.has('limited-card') ? 'animate-fade-in-left' : 'opacity-0 -translate-x-8'
              }`}
              onClick={() => setCurrentPage('limited-editions')}
            >
              <div className="bg-gradient-to-br from-red-900/30 to-black/80 rounded-lg p-8 border border-red-600/30 group-hover:border-red-400/50 transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-red-500/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-red-600/10 rounded-full p-4 group-hover:bg-red-600/20 transition-colors duration-300">
                    <Clock className="h-8 w-8 text-red-400 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold group-hover:text-red-400 transition-colors duration-300">Limited Editions</h3>
                    <p className="text-red-400">Exclusive drops for collectors</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6">Rare and exclusive anime merchandise with limited quantities. Once they're gone, they're gone forever!</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">15+ exclusive items</span>
                  <span className="text-red-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">Explore →</span>
                </div>
              </div>
            </div>

            <div 
              id="collab-card"
              data-animate
              className={`group cursor-pointer transition-all duration-800 ${
                animatedElements.has('collab-card') ? 'animate-fade-in-right' : 'opacity-0 translate-x-8'
              }`}
              onClick={() => setCurrentPage('collaborations')}
            >
              <div className="bg-gradient-to-br from-purple-900/30 to-black/80 rounded-lg p-8 border border-purple-600/30 group-hover:border-purple-400/50 transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-purple-500/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-purple-600/10 rounded-full p-4 group-hover:bg-purple-600/20 transition-colors duration-300">
                    <Crown className="h-8 w-8 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-colors duration-300">Collaborations</h3>
                    <p className="text-purple-400">Official partnerships</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6">Exclusive collaborations with top brands and artists. Premium quality meets unique design.</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">4 brand partnerships</span>
                  <span className="text-purple-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">Explore →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="products-title"
            data-animate
            className={`text-center mb-12 transition-all duration-800 ${
              animatedElements.has('products-title') ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h2>
            <p className="text-xl text-gray-400">Premium anime merchandise crafted with love</p>
          </div>

          {/* Category Filters */}
          <div 
            id="category-filters"
            data-animate
            className={`flex flex-wrap justify-center gap-4 mb-8 transition-all duration-800 ${
              animatedElements.has('category-filters') ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
            }`}
          >
            {['all', 'hoodies', 'tees', 'posters', 'mousepads'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Product Type Filters (when showing all products) */}
          {showAllProducts && (
            <div 
              id="type-filters"
              data-animate
              className={`mb-8 transition-all duration-800 ${
                animatedElements.has('type-filters') ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-400 font-medium">Filter by type:</span>
                  <div className="flex gap-2">
                    {['all', 'limited', 'collaboration'].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setProductFilter(filter)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                          productFilter === filter
                            ? 'bg-blue-600 text-white'
                            : 'bg-white/5 text-white/80 hover:bg-white/10'
                        }`}
                      >
                        {filter === 'all' ? 'All Products' : 
                         filter === 'limited' ? 'Limited Edition' : 
                         'Collaborations'}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div 
            id="products-grid"
            data-animate
            className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' 
                : 'space-y-4'
            } transition-all duration-800 ${
              animatedElements.has('products-grid') ? 'animate-stagger-in' : 'opacity-0 translate-y-8'
            }`}
          >
            {displayedProducts.map((product, index) => {
              const IconComponent = getIcon(product.category);
              const isLimited = product.type === 'limited';
              const isCollaboration = product.type === 'collaboration';
              
              if (viewMode === 'list') {
                return (
                  <div 
                    key={index} 
                    className="group cursor-pointer bg-white/5 rounded-lg p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:bg-white/10"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="flex items-center gap-6">
                      <div className="bg-blue-600/10 rounded-lg p-4 group-hover:bg-blue-600/20 transition-colors duration-300">
                        <IconComponent className="h-8 w-8 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold group-hover:text-blue-400 transition-colors duration-300">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            {isLimited && (
                              <span className="bg-red-600/20 text-red-400 text-xs px-2 py-1 rounded-full font-semibold">
                                Limited
                              </span>
                            )}
                            {isCollaboration && (
                              <span className="bg-purple-600/20 text-purple-400 text-xs px-2 py-1 rounded-full font-semibold">
                                Collab
                              </span>
                            )}
                            <span className="text-2xl font-bold text-blue-400">{product.price}</span>
                          </div>
                        </div>
                        <p className="text-gray-400 mb-2">{product.anime}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full capitalize">
                            {product.category}
                          </span>
                          {isCollaboration && product.partner && (
                            <span className="text-sm text-purple-400">
                              with {product.partner}
                            </span>
                          )}
                          {isLimited && product.stock && (
                            <span className="text-sm text-red-400">
                              {product.stock} left
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div 
                  key={index} 
                  className="group cursor-pointer transform transition-all duration-300 hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="bg-black rounded-lg overflow-hidden shadow-2xl group-hover:shadow-blue-500/20 border border-white/10 group-hover:border-blue-400/50 transition-all duration-300 relative">
                    {/* Product Type Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      {isLimited && (
                        <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                          {product.rarity || 'Limited'}
                        </span>
                      )}
                      {isCollaboration && (
                        <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                          Collab
                        </span>
                      )}
                    </div>
                    
                    {/* Stock indicator for limited items */}
                    {isLimited && product.stock && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-black/80 text-red-300 text-xs px-2 py-1 rounded-full font-semibold">
                          {product.stock} left
                        </span>
                      </div>
                    )}

                    <div className="aspect-w-3 aspect-h-4 bg-gradient-to-br from-blue-900/20 to-black/80 h-80 flex items-center justify-center">
                      <div className="text-center">
                        <div className="bg-blue-600/10 rounded-full p-8 w-24 h-24 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600/20 transition-all duration-300 group-hover:scale-110">
                          <IconComponent className="h-12 w-12 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
                        </div>
                        <p className="text-gray-400 text-sm">{product.anime}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors duration-300">{product.name}</h3>
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-blue-400 text-lg font-bold">{product.price}</p>
                        <span className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full capitalize">
                          {product.category}
                        </span>
                      </div>
                      {isCollaboration && product.partner && (
                        <p className="text-xs text-purple-400 mb-2">with {product.partner}</p>
                      )}
                      {isLimited && product.stock && (
                        <div className="mb-4">
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-300"
                              style={{ 
                                width: `${(parseInt(product.stock.split('/')[0]) / parseInt(product.stock.split('/')[1])) * 100}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View More Button */}
          {!showAllProducts && filteredProducts.length > 8 && (
            <div 
              id="view-more-btn"
              data-animate
              className={`text-center mt-12 transition-all duration-800 ${
                animatedElements.has('view-more-btn') ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
              }`}
            >
              <button
                onClick={() => setShowAllProducts(true)}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
              >
                View More Products
                <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>
          )}

          {/* Show Less Button */}
          {showAllProducts && (
            <div className="text-center mt-12">
              <button
                onClick={() => {
                  setShowAllProducts(false);
                  setProductFilter('all');
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Show Less
                <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-y-1">↑</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div 
              id="about-content"
              data-animate
              className={`transition-all duration-800 ${
                animatedElements.has('about-content') ? 'animate-fade-in-left' : 'opacity-0 -translate-x-8'
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">About Lowkey! Otaku</h2>
              <p className="text-xl text-gray-300 mb-6">
                We're passionate anime fans creating premium merchandise for the otaku community. 
                Every design is crafted with love and attention to detail, celebrating the anime culture we all cherish.
              </p>
              <p className="text-lg text-gray-400 mb-8">
                From exclusive limited drops to official collaborations, we bring you the highest quality 
                anime merchandise that lets you express your otaku pride in style.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Our Story
                  <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
                <button className="group bg-transparent border-2 border-white/20 hover:border-blue-400 text-white hover:text-blue-400 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Join Community
                  <span className="inline-block ml-2 transition-transform duration-300 group-hover:scale-110">👥</span>
                </button>
              </div>
            </div>
            <div 
              id="about-visual"
              data-animate
              className={`transition-all duration-800 ${
                animatedElements.has('about-visual') ? 'animate-fade-in-right' : 'opacity-0 translate-x-8'
              }`}
            >
              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg p-8 border border-blue-600/30">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-600/10 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4 hover:bg-blue-600/20 transition-colors duration-300 hover:scale-110 transform">
                      <Package className="h-10 w-10 text-blue-400" />
                    </div>
                    <h3 className="font-semibold mb-2">Premium Quality</h3>
                    <p className="text-sm text-gray-400">High-quality materials and printing</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-600/10 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4 hover:bg-purple-600/20 transition-colors duration-300 hover:scale-110 transform">
                      <Star className="h-10 w-10 text-purple-400" />
                    </div>
                    <h3 className="font-semibold mb-2">Exclusive Designs</h3>
                    <p className="text-sm text-gray-400">Unique artwork by talented artists</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-600/10 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4 hover:bg-green-600/20 transition-colors duration-300 hover:scale-110 transform">
                      <Zap className="h-10 w-10 text-green-400" />
                    </div>
                    <h3 className="font-semibold mb-2">Fast Shipping</h3>
                    <p className="text-sm text-gray-400">Quick delivery across South Africa</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-red-600/10 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4 hover:bg-red-600/20 transition-colors duration-300 hover:scale-110 transform">
                      <Heart className="h-10 w-10 text-red-400" />
                    </div>
                    <h3 className="font-semibold mb-2">Made with Love</h3>
                    <p className="text-sm text-gray-400">By otaku, for otaku community</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="contact-title"
            data-animate
            className={`text-center mb-16 transition-all duration-800 ${
              animatedElements.has('contact-title') ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-400">Have questions? We'd love to hear from you!</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div 
              id="contact-info"
              data-animate
              className={`transition-all duration-800 ${
                animatedElements.has('contact-info') ? 'animate-fade-in-left' : 'opacity-0 -translate-x-8'
              }`}
            >
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="bg-blue-600/10 rounded-full p-3 group-hover:bg-blue-600/20 transition-colors duration-300">
                    <Package className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="text-gray-400">54 Black Rhino Street, Mqantsa</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="bg-green-600/10 rounded-full p-3 group-hover:bg-green-600/20 transition-colors duration-300">
                    <Package className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-gray-400">0684974448</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="bg-purple-600/10 rounded-full p-3 group-hover:bg-purple-600/20 transition-colors duration-300">
                    <Package className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-400">garnetlwky@icloud.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="bg-pink-600/10 rounded-full p-3 group-hover:bg-pink-600/20 transition-colors duration-300">
                    <Package className="h-6 w-6 text-pink-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Instagram</h4>
                    <a 
                      href="https://www.instagram.com/lowkey.otaku_/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-pink-400 hover:text-pink-300 transition-colors duration-300"
                    >
                      @lowkey.otaku_
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div 
              id="contact-form"
              data-animate
              className={`transition-all duration-800 ${
                animatedElements.has('contact-form') ? 'animate-fade-in-right' : 'opacity-0 translate-x-8'
              }`}
            >
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 resize-none"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="footer-content"
            data-animate
            className={`grid grid-cols-1 md:grid-cols-4 gap-8 transition-all duration-800 ${
              animatedElements.has('footer-content') ? 'animate-stagger-in' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="animate-fade-in-up">
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Lowkey! Otaku
              </h3>
              <p className="text-gray-400 mb-4">Premium anime merchandise for true fans.</p>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/lowkey.otaku_/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400 transition-all duration-300 hover:scale-110 hover:rotate-12">
                  <Package className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="animate-fade-in-up animation-delay-100">
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Home</a></li>
                <li><a href="#products" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Products</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">About</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Contact</a></li>
              </ul>
            </div>
            <div className="animate-fade-in-up animation-delay-200">
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setSelectedCategory('hoodies')} className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Hoodies</button></li>
                <li><button onClick={() => setSelectedCategory('tees')} className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">T-Shirts</button></li>
                <li><button onClick={() => setSelectedCategory('posters')} className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Posters</button></li>
                <li><button onClick={() => setSelectedCategory('mousepads')} className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Mousepads</button></li>
              </ul>
            </div>
            <div className="animate-fade-in-up animation-delay-300">
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>54 Black Rhino Street, Mqantsa</li>
                <li>0684974448</li>
                <li>garnetlwky@icloud.com</li>
                <li>
                  <a 
                    href="https://www.instagram.com/lowkey.otaku_/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-pink-400 transition-colors duration-300"
                  >
                    @lowkey.otaku_
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Lowkey! Otaku. All rights reserved. Artwork by <a href="https://www.instagram.com/garnet_arts._/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Garnet</a></p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />

      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
        cartTotal={getCartTotal()}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onProductSelect={setSelectedProduct}
        products={products}
      />
    </div>
  );
}

export default App;