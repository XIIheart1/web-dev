import { useState } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: string;
  category: string;
  anime: string;
  size: string;
  quantity: number;
  type?: string;
  rarity?: string;
}

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

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  const addToCart = (product: Product, size: string, quantity: number) => {
    const existingItemIndex = cartItems.findIndex(
      item => item.id === product.id && item.size === size
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedItems);
    } else {
      const newItem: CartItem = {
        ...product,
        size,
        quantity
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const removeFromCart = (id: string, size: string) => {
    setCartItems(cartItems.filter(item => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }

    setCartItems(cartItems.map(item => 
      item.id === id && item.size === size 
        ? { ...item, quantity }
        : item
    ));
  };

  const addToWishlist = (product: Product) => {
    const exists = wishlistItems.some(item => item.id === product.id);
    if (!exists) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace('R', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    cartItems,
    wishlistItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    addToWishlist,
    removeFromWishlist,
    getCartTotal,
    getCartItemCount
  };
}