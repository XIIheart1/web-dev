import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, User, Search, Star, Truck, Shield, ArrowRight, Instagram, Twitter, Facebook, Shirt, Package, Image, Mouse } from 'lucide-react';
import LimitedEditionsPage from './components/LimitedEditionsPage';
import CollaborationsPage from './components/CollaborationsPage';
import SearchModal from './components/SearchModal';
import ProductPage from './components/ProductPage';
import AuthModal from './components/AuthModal';
import CartModal from './components/CartModal';
import CheckoutPage from './components/CheckoutPage';
import OrderConfirmationPage from './components/OrderConfirmationPage';
import { useCart } from './hooks/useCart';
import { useAuth } from './hooks/useAuth';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 12,
    minutes: 34,
    seconds: 56
  });

  const { cartItems, addToCart, addToWishlist, getCartItemCount, getCartTotal, updateQuantity, removeFromCart } = useCart();
  const { user, login, signup, logout, checkAuth, isAuthenticated } = useAuth();

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [currentPage]);
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

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Loading Screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-600/20 rounded-full animate-spin border-t-blue-600 mb-8"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent rounded-full animate-ping border-t-blue-400"></div>
          </div>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent animate-pulse">
            Lowkey! Otaku
          </h1>
          <div className="flex items-center justify-center gap-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }
  const categories = [
    { id: 'all', name: 'All Products', icon: Package },
    { id: 'tees', name: 'Tees', icon: Shirt },
    { id: 'hoodies', name: 'Hoodies', icon: Package },
    { id: 'posters', name: 'Posters', icon: Image },
    { id: 'mousepads', name: 'Mousepads', icon: Mouse }
  ];

  const products = [
    { id: "1", name: "Anime Hero Tee", price: "R350", category: "tees", anime: "Attack on Titan" },
    { id: "2", name: "Cozy Otaku Hoodie", price: "R550", category: "hoodies", anime: "Demon Slayer" },
    { id: "3", name: "Epic Battle Poster", price: "R200", category: "posters", anime: "Naruto" },
    { id: "4", name: "Gaming Mousepad", price: "R420", category: "mousepads", anime: "One Piece" },
    { id: "5", name: "Kawaii Cat Tee", price: "R350", category: "tees", anime: "Studio Ghibli" },
    { id: "6", name: "Dragon Hoodie", price: "R550", category: "hoodies", anime: "Dragon Ball Z" },
    { id: "7", name: "Minimalist Poster", price: "R200", category: "posters", anime: "Death Note" },
    { id: "8", name: "RGB Mousepad", price: "R420", category: "mousepads", anime: "Tokyo Ghoul" },
    { id: "9", name: "Vintage Anime Tee", price: "R350", category: "tees", anime: "Cowboy Bebop" }
  ];

  // Combine all products for search
  const limitedProducts = [
    { id: "l1", name: "Golden Saiyan Hoodie", price: "R800", stock: "3/50", anime: "Dragon Ball Z", rarity: "Ultra Rare", category: "hoodies", description: "Ultra-rare limited edition hoodie featuring Goku's legendary Super Saiyan transformation." },
    { id: "l2", name: "Akatsuki Cloud Tee", price: "R500", stock: "12/100", anime: "Naruto", rarity: "Rare", category: "tees", description: "Rare design featuring the iconic Akatsuki cloud pattern." },
    { id: "l3", name: "Titan Shift Poster", price: "R300", stock: "7/25", anime: "Attack on Titan", rarity: "Limited", category: "posters", description: "Limited edition poster showcasing the epic titan transformation scenes." },
    { id: "l4", name: "Demon Slayer Mousepad", price: "R500", stock: "18/75", anime: "Demon Slayer", rarity: "Special", category: "mousepads", description: "Special edition mousepad featuring Tanjiro's breathing techniques." },
    { id: "l5", name: "Studio Ghibli Hoodie", price: "R750", stock: "5/30", anime: "Studio Ghibli", rarity: "Collector", category: "hoodies", description: "Collector's edition hoodie celebrating the magical world of Studio Ghibli." },
    { id: "l6", name: "One Piece Treasure Tee", price: "R450", stock: "23/150", anime: "One Piece", rarity: "Limited", category: "tees", description: "Limited edition tee featuring the Straw Hat Pirates' treasure hunt." }
  ];

  const collabProducts = [
    { id: "c1", name: "MAPPA x Lowkey Eren Hoodie", price: "R550", anime: "Attack on Titan", type: "Official Collab", category: "hoodies", description: "Official collaboration with Studio MAPPA featuring Eren's final form." },
    { id: "c2", name: "Toei x Lowkey Luffy Tee", price: "R420", anime: "One Piece", type: "Movie Exclusive", category: "tees", description: "Exclusive Film Red merchandise featuring Luffy's Gear 5 form." },
    { id: "c3", name: "WIT Studio Levi Poster", price: "R260", anime: "Attack on Titan", type: "Artist Series", category: "posters", description: "Artist series poster celebrating WIT Studio's iconic Levi scenes." }
  ];

  const allProducts = [...products, ...limitedProducts, ...collabProducts];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const handleAddToCart = (product, size, quantity) => {
    addToCart(product, size, quantity);
    // Show success message or notification here
    alert(`Added ${quantity}x ${product.name} (${size}) to cart!`);
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    alert(`Added ${product.name} to wishlist!`);
  };

  const handleLogin = async (email: string, password: string) => {
    const result = await login(email, password);
    if (result.success) {
      setIsAuthOpen(false);
      alert('Welcome back!');
    } else {
      alert('Login failed. Please try again.');
    }
  };

  const handleSignup = async (name: string, email: string, password: string) => {
    const result = await signup(name, email, password);
    if (result.success) {
      setIsAuthOpen(false);
      alert('Account created successfully!');
    } else {
      alert('Signup failed. Please try again.');
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setIsCartOpen(false);
      setIsAuthOpen(true);
      return;
    }
    setIsCartOpen(false);
    setCurrentPage('checkout');
  };

  const handleOrderComplete = (orderInfo: any) => {
    setOrderData(orderInfo);
    setCurrentPage('order-confirmation');
    // Clear cart after successful order
    // You might want to add a clearCart function to useCart hook
  };

  if (currentPage === 'limited') {
    return <LimitedEditionsPage onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'collabs') {
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

  if (currentPage === 'order-confirmation' && orderData) {
    return (
      <OrderConfirmationPage 
        orderData={orderData}
        onBackToHome={() => {
          setCurrentPage('home');
          setOrderData(null);
        }}
      />
    );
  }

  if (currentPage === 'product' && selectedProduct) {
    return (
      <ProductPage 
        product={selectedProduct}
        onBack={() => {
          setCurrentPage('home');
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Floating Navigation */}
      <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ease-out ${
        isScrolled ? 'scale-95 translate-y-1' : 'scale-100 translate-y-0'
      }`}>
        <div className="bg-black/80 backdrop-blur-xl rounded-full px-8 py-3 shadow-2xl border border-white/10 hover:shadow-blue-500/20 transition-all duration-500 hover:border-blue-500/30">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 mr-8">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer">
                Lowkey! Otaku
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-6">
                <button onClick={() => scrollToSection('hero')} className="text-white/80 hover:text-blue-400 transition-all duration-300 text-sm font-medium hover:scale-105 relative group">
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => scrollToSection('categories')} className="text-white/80 hover:text-blue-400 transition-all duration-300 text-sm font-medium hover:scale-105 relative group">
                  Categories
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => scrollToSection('products')} className="text-white/80 hover:text-blue-400 transition-all duration-300 text-sm font-medium hover:scale-105 relative group">
                  Products
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => scrollToSection('limited')} className="text-white/80 hover:text-blue-400 transition-all duration-300 text-sm font-medium hover:scale-105 relative group">
                  Limited
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => scrollToSection('collabs')} className="text-white/80 hover:text-blue-400 transition-all duration-300 text-sm font-medium hover:scale-105 relative group">
                  Collabs
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => scrollToSection('about')} className="text-white/80 hover:text-blue-400 transition-all duration-300 text-sm font-medium hover:scale-105 relative group">
                  About
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-white/80 hover:text-blue-400 transition-all duration-300 text-sm font-medium hover:scale-105 relative group">
                  Contact
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
              </div>
            </div>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-4 ml-8">
              <Search 
                className="h-5 w-5 text-white/80 hover:text-blue-400 cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12" 
                onClick={() => setIsSearchOpen(true)}
              />
              <div className="relative">
                {isAuthenticated ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white/80 animate-fade-in">Hi, {user?.name}</span>
                    <button
                      onClick={logout}
                      className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-all duration-300 hover:scale-105"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <User 
                    className="h-5 w-5 text-white/80 hover:text-blue-400 cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12" 
                    onClick={() => setIsAuthOpen(true)}
                  />
                )}
              </div>
              <div className="relative">
                <ShoppingBag 
                  className="h-5 w-5 text-white/80 hover:text-blue-400 cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12" 
                  onClick={() => setIsCartOpen(true)}
                />
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                    {getCartItemCount()}
                  </span>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-full text-white/80 hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:rotate-180"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 animate-slide-down">
            <div className="bg-black/90 backdrop-blur-xl rounded-2xl mx-4 p-4 shadow-2xl border border-white/10 animate-fade-in">
              <div className="space-y-2">
                <button onClick={() => scrollToSection('hero')} className="block w-full text-left px-4 py-3 text-white/80 hover:text-blue-400 hover:bg-white/5 rounded-xl transition-all duration-300 hover:translate-x-2">Home</button>
                <button onClick={() => scrollToSection('categories')} className="block w-full text-left px-4 py-3 text-white/80 hover:text-blue-400 hover:bg-white/5 rounded-xl transition-all duration-300 hover:translate-x-2">Categories</button>
                <button onClick={() => scrollToSection('products')} className="block w-full text-left px-4 py-3 text-white/80 hover:text-blue-400 hover:bg-white/5 rounded-xl transition-all duration-300 hover:translate-x-2">Products</button>
                <button onClick={() => scrollToSection('limited')} className="block w-full text-left px-4 py-3 text-white/80 hover:text-blue-400 hover:bg-white/5 rounded-xl transition-all duration-300 hover:translate-x-2">Limited</button>
                <button onClick={() => scrollToSection('collabs')} className="block w-full text-left px-4 py-3 text-white/80 hover:text-blue-400 hover:bg-white/5 rounded-xl transition-all duration-300 hover:translate-x-2">Collabs</button>
                <button onClick={() => scrollToSection('about')} className="block w-full text-left px-4 py-3 text-white/80 hover:text-blue-400 hover:bg-white/5 rounded-xl transition-all duration-300 hover:translate-x-2">About</button>
                <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-4 py-3 text-white/80 hover:text-blue-400 hover:bg-white/5 rounded-xl transition-all duration-300 hover:translate-x-2">Contact</button>
              </div>
              <div className="flex justify-center space-x-6 mt-4 pt-4 border-t border-white/10">
                <Search 
                  className="h-5 w-5 text-white/80 hover:text-blue-400 cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12" 
                  onClick={() => {
                    setIsSearchOpen(true);
                    setIsMenuOpen(false);
                  }}
                />
                {isAuthenticated ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white/80 animate-fade-in">Hi, {user?.name}</span>
                    <button
                      onClick={logout}
                      className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-all duration-300 hover:scale-105"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <User 
                    className="h-5 w-5 text-white/80 hover:text-blue-400 cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12" 
                    onClick={() => {
                      setIsAuthOpen(true);
                      setIsMenuOpen(false);
                    }}
                  />
                )}
                <div className="relative">
                  <ShoppingBag 
                    className="h-5 w-5 text-white/80 hover:text-blue-400 cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12" 
                    onClick={() => {
                      setIsCartOpen(true);
                      setIsMenuOpen(false);
                    }}
                  />
                  {getCartItemCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                      {getCartItemCount()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onProductSelect={handleProductSelect}
        products={allProducts}
      />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />

      {/* Cart Modal */}
      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
        cartTotal={getCartTotal()}
      />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden" data-animate>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-black/80 z-10"></div>
        <div className="absolute inset-0 bg-black overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent animate-pulse"></div>
          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-300/40 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-500/20 rounded-full animate-float-slow"></div>
          <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-blue-400/35 rounded-full animate-float-delayed"></div>
        </div>
        
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slide-up">
            Express Your
            <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent animate-gradient-x">
              Otaku Pride
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Premium anime merchandise for the cultured otaku. Tees, hoodies, posters, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <button 
              onClick={() => scrollToSection('products')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 group"
            >
              Shop Now <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button 
              onClick={() => scrollToSection('categories')}
              className="border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Browse Categories
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 bg-gradient-to-b from-black to-gray-900" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('categories') ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-400">Find your perfect otaku gear</p>
          </div>
          
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 ${visibleSections.has('categories') ? 'animate-stagger-in' : 'opacity-0'}`}>
            {categories.slice(1).map((category) => {
              const IconComponent = category.icon;
              return (
                <div key={category.id} className="group cursor-pointer animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }} onClick={() => {
                  setActiveCategory(category.id);
                  scrollToSection('products');
                }}>
                  <div className="bg-gradient-to-br from-blue-900/20 to-black/80 rounded-lg p-8 text-center transform transition-all duration-500 group-hover:scale-105 group-hover:bg-blue-600/20 border border-blue-600/20 group-hover:border-blue-400/40 group-hover:shadow-lg group-hover:shadow-blue-500/20 hover:-translate-y-2">
                    <div className="bg-blue-600/10 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600/20 transition-all duration-300 group-hover:rotate-12">
                      <IconComponent className="h-8 w-8 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-lg font-semibold group-hover:text-blue-400 transition-all duration-300 group-hover:scale-105">{category.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ${visibleSections.has('features') ? 'animate-stagger-in' : 'opacity-0'}`}>
            <div className="text-center group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="bg-blue-600/10 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                <Truck className="h-8 w-8 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-400 transition-colors duration-300">Free Shipping</h3>
              <p className="text-gray-400">Free worldwide shipping on orders over $50</p>
            </div>
            <div className="text-center group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-blue-600/10 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                <Shield className="h-8 w-8 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-400 transition-colors duration-300">Premium Quality</h3>
              <p className="text-gray-400">High-quality prints and materials for lasting wear</p>
            </div>
            <div className="text-center group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="bg-blue-600/10 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                <Star className="h-8 w-8 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-400 transition-colors duration-300">Otaku Approved</h3>
              <p className="text-gray-400">Designs by anime fans, for anime fans</p>
            </div>
          </div>
        </div>
      </section>

      {/* Limited Edition Section */}
      <section id="limited" className="py-20 bg-gradient-to-b from-black to-red-900/20" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('limited') ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
              LIMITED TIME
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Exclusive <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent animate-gradient-x">Limited Editions</span>
            </h2>
            <p className="text-xl text-gray-400">Rare drops for true collectors - All artwork by <a href="https://www.instagram.com/garnet_arts._/" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 underline">Garnet</a></p>
          </div>

          {/* Countdown Timer */}
          <div className={`bg-gradient-to-r from-red-900/30 to-black/80 rounded-lg p-8 mb-12 border border-red-600/30 transition-all duration-1000 ${visibleSections.has('limited') ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '0.2s' }}>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-red-400">Next Drop Ends In:</h3>
              <div className="flex justify-center gap-4 text-center">
                <div className="bg-red-600/20 rounded-lg p-4 min-w-[80px] hover:scale-105 transition-transform duration-300 animate-pulse">
                  <div className="text-3xl font-bold text-red-400">{timeLeft.days}</div>
                  <div className="text-sm text-gray-400">Days</div>
                </div>
                <div className="bg-red-600/20 rounded-lg p-4 min-w-[80px] hover:scale-105 transition-transform duration-300 animate-pulse" style={{ animationDelay: '0.1s' }}>
                  <div className="text-3xl font-bold text-red-400">{timeLeft.hours}</div>
                  <div className="text-sm text-gray-400">Hours</div>
                </div>
                <div className="bg-red-600/20 rounded-lg p-4 min-w-[80px] hover:scale-105 transition-transform duration-300 animate-pulse" style={{ animationDelay: '0.2s' }}>
                  <div className="text-3xl font-bold text-red-400">{timeLeft.minutes}</div>
                  <div className="text-sm text-gray-400">Minutes</div>
                </div>
                <div className="bg-red-600/20 rounded-lg p-4 min-w-[80px] hover:scale-105 transition-transform duration-300 animate-pulse" style={{ animationDelay: '0.3s' }}>
                  <div className="text-3xl font-bold text-red-400">{timeLeft.seconds}</div>
                  <div className="text-sm text-gray-400">Seconds</div>
                </div>
              </div>
            </div>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${visibleSections.has('limited') ? 'animate-stagger-in' : 'opacity-0'}`}>
            {[
              { name: "Golden Saiyan Hoodie", price: "R800", stock: "3/50", anime: "Dragon Ball Z", rarity: "Ultra Rare" },
              { name: "Akatsuki Cloud Tee", price: "R500", stock: "12/100", anime: "Naruto", rarity: "Rare" },
              { name: "Titan Shift Poster", price: "R300", stock: "7/25", anime: "Attack on Titan", rarity: "Limited" },
              { name: "Demon Slayer Mousepad", price: "R500", stock: "18/75", anime: "Demon Slayer", rarity: "Special" },
              { name: "Studio Ghibli Hoodie", price: "R750", stock: "5/30", anime: "Studio Ghibli", rarity: "Collector" },
              { name: "One Piece Treasure Tee", price: "R450", stock: "23/150", anime: "One Piece", rarity: "Limited" }
            ].map((product, index) => (
              <div key={index} className="group cursor-pointer animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="bg-black rounded-lg overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-red-500/20 border border-red-600/30 group-hover:border-red-400/50 relative hover:-translate-y-2">
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold animate-pulse">
                      {product.rarity}
                    </span>
                  </div>
                  <div className="aspect-w-3 aspect-h-4 bg-gradient-to-br from-red-900/20 to-black/80 h-80 flex items-center justify-center">
                    <div className="text-center">
                      <div className="bg-red-600/10 rounded-full p-8 w-24 h-24 flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600/20 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                        <Star className="h-12 w-12 text-red-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <p className="text-gray-400 text-sm">{product.anime}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-red-400 transition-all duration-300 group-hover:scale-105">{product.name}</h3>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-red-400 text-lg font-bold">{product.price}</p>
                      <span className="text-xs bg-red-600/20 text-red-300 px-2 py-1 rounded-full">
                        {product.stock} left
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-500 animate-pulse"
                        style={{ width: `${(parseInt(product.stock.split('/')[0]) / parseInt(product.stock.split('/')[1])) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={`text-center mt-12 transition-all duration-1000 ${visibleSections.has('limited') ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '0.8s' }}>
            <button 
              onClick={() => setCurrentPage('limited')}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 flex items-center justify-center gap-2 mx-auto group"
            >
              View More Limited Editions <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Collaborations Section */}
      <section id="collabs" className="py-20 bg-gradient-to-b from-red-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-600/20 text-purple-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Star className="w-4 h-4" />
              EXCLUSIVE COLLABS
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Epic <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Collaborations</span>
            </h2>
            <p className="text-xl text-gray-400">Official partnerships with top anime studios</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {[
              {
                partner: "Studio MAPPA",
                collection: "Attack on Titan Final Season",
                description: "Official merchandise celebrating the epic finale",
                items: "15 exclusive designs",
                status: "Available Now"
              },
              {
                partner: "Toei Animation",
                collection: "One Piece Film: Red",
                description: "Limited edition items from the blockbuster movie",
                items: "12 exclusive designs",
                status: "Pre-Order"
              }
            ].map((collab, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-900/20 to-black/80 rounded-lg p-8 border border-purple-600/30 group hover:border-purple-400/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors duration-300">{collab.partner}</h3>
                    <p className="text-purple-400 font-semibold">{collab.collection}</p>
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
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    View Collection
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Collab Products */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "MAPPA x Lowkey Eren Hoodie", price: "R650", partner: "Studio MAPPA", type: "Official Collab" },
              { name: "Toei x Lowkey Luffy Tee", price: "R420", partner: "Toei Animation", type: "Movie Exclusive" },
              { name: "WIT Studio Levi Poster", price: "R260", partner: "WIT Studio", type: "Artist Series" }
            ].map((product, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-black rounded-lg overflow-hidden shadow-2xl transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-purple-500/20 border border-purple-600/30 group-hover:border-purple-400/50 relative">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      {product.type}
                    </span>
                  </div>
                  <div className="aspect-w-3 aspect-h-4 bg-gradient-to-br from-purple-900/20 to-black/80 h-80 flex items-center justify-center">
                    <div className="text-center">
                      <div className="bg-purple-600/10 rounded-full p-8 w-24 h-24 flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600/20 transition-colors duration-300">
                        <Star className="h-12 w-12 text-purple-400" />
                      </div>
                      <p className="text-gray-400 text-sm">{product.partner}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors duration-300">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-purple-400 text-lg font-bold">{product.price}</p>
                      <span className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full">
                        Official
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => setCurrentPage('collabs')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
            >
              View More Collaborations <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-gradient-to-b from-gray-900 to-black" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('products') ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-xl text-gray-400">Discover our most popular anime merchandise - All artwork by <a href="https://www.instagram.com/garnet_arts._/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Garnet</a></p>
          </div>

          {/* Category Filter */}
          <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 ${visibleSections.has('products') ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '0.2s' }}>
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 hover:shadow-blue-500/20'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <IconComponent className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                  {category.name}
                </button>
              );
            })}
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${visibleSections.has('products') ? 'animate-stagger-in' : 'opacity-0'}`}>
            {filteredProducts.map((product, index) => {
              const categoryIcon = categories.find(cat => cat.id === product.category)?.icon || Package;
              const CategoryIcon = categoryIcon;
              
              return (
                <div key={index} className="group cursor-pointer animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }} onClick={() => handleProductSelect(product)}>
                  <div className="bg-black rounded-lg overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-blue-500/20 border border-blue-600/20 group-hover:border-blue-400/40 hover:-translate-y-2">
                    <div className="aspect-w-3 aspect-h-4 bg-gradient-to-br from-blue-900/20 to-black/80 h-80 flex items-center justify-center">
                      <div className="text-center">
                        <div className="bg-blue-600/10 rounded-full p-8 w-24 h-24 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600/20 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                          <CategoryIcon className="h-12 w-12 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <p className="text-gray-400 text-sm">{product.anime}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-all duration-300 group-hover:scale-105">{product.name}</h3>
                      <div className="flex justify-between items-center">
                        <p className="text-blue-400 text-lg font-bold">{product.price}</p>
                        <span className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full capitalize">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-black" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${visibleSections.has('about') ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <div className="animate-fade-in-left">
              <h2 className="text-4xl font-bold mb-6">About Lowkey! Otaku</h2>
              <p className="text-lg text-gray-300 mb-6">
                We're passionate anime fans creating premium merchandise for fellow otaku. From subtle designs for everyday wear to bold statements of your favorite series.
              </p>
              <p className="text-lg text-gray-300 mb-8">
                Every design is carefully crafted by our talented artist <a href="https://www.instagram.com/garnet_arts._/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Garnet</a> with attention to detail, using high-quality materials that anime fans deserve. Whether you're looking for a cozy hoodie, a statement tee, or the perfect poster for your room, we've got you covered.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
                Our Story
              </button>
            </div>
            <div className="bg-gradient-to-br from-blue-900/20 to-black/80 rounded-lg p-12 text-center border border-blue-600/20 animate-fade-in-right hover:scale-105 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/20">
              <div className="bg-blue-600/10 rounded-full p-12 w-48 h-48 flex items-center justify-center mx-auto hover:rotate-12 transition-transform duration-500">
                <Star className="h-24 w-24 text-blue-400 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold mt-6 mb-4">Otaku Quality</h3>
              <p className="text-gray-400">Made by fans, for fans with uncompromising quality</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-black" data-animate>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-4xl font-bold mb-6 transition-all duration-1000 ${visibleSections.has('newsletter') ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>Stay Updated, Fellow Otaku</h2>
          <p className={`text-xl text-blue-100 mb-8 transition-all duration-1000 ${visibleSections.has('newsletter') ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '0.2s' }}>
            Get notified about new releases, exclusive designs by Garnet, and special otaku deals
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 max-w-md mx-auto transition-all duration-1000 ${visibleSections.has('newsletter') ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '0.4s' }}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg bg-gray-900 border border-blue-600/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 focus:scale-105"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black py-16" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 transition-all duration-1000 ${visibleSections.has('contact') ? 'animate-stagger-in' : 'opacity-0'}`}>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Lowkey! Otaku</h3>
              <p className="text-gray-400 mb-4">Premium anime merchandise for the cultured otaku lifestyle. All artwork by <a href="https://www.instagram.com/garnet_arts._/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Garnet</a>.</p>
              <div className="flex space-x-4">
                <Instagram className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12" />
                <Twitter className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12" />
                <Facebook className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12" />
              </div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => {setActiveCategory('tees'); scrollToSection('products');}} className="hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Tees</button></li>
                <li><button onClick={() => {setActiveCategory('hoodies'); scrollToSection('products');}} className="hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Hoodies</button></li>
                <li><button onClick={() => {setActiveCategory('posters'); scrollToSection('products');}} className="hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Posters</button></li>
                <li><button onClick={() => {setActiveCategory('mousepads'); scrollToSection('products');}} className="hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Mousepads</button></li>
              </ul>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Shipping Info</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Returns</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Size Guide</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-all duration-300 hover:translate-x-2">FAQ</a></li>
              </ul>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="text-gray-400 space-y-2">
                <p>123 Anime Street</p>
                <p>Otaku City, OC 12345</p>
                <p>Phone: (555) 123-OTAKU</p>
                <p>Email: hello@lowkeyotaku.com</p>
              </div>
            </div>
          </div>
          <div className={`border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 transition-all duration-1000 ${visibleSections.has('contact') ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '0.6s' }}>
            <p>&copy; 2025 Lowkey! Otaku. All rights reserved. Made with ❤️ for anime fans. Artwork by <a href="https://www.instagram.com/garnet_arts._/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Garnet</a>.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;