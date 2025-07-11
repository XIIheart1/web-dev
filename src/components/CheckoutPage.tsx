import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, MapPin, User, Mail, Phone, Lock, Calendar, Shield } from 'lucide-react';

interface CheckoutPageProps {
  onBack: () => void;
  cartItems: any[];
  cartTotal: number;
  onOrderComplete: (orderData: any) => void;
}

export default function CheckoutPage({ onBack, cartItems, cartTotal, onOrderComplete }: CheckoutPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    deliveryOption: 'standard'
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const shippingCost = cartTotal >= 500 ? 0 : 50;
  const deliveryCost = deliveryInfo.deliveryOption === 'express' ? 100 : shippingCost;
  const finalTotal = cartTotal + deliveryCost;

  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    const orderData = {
      items: cartItems,
      delivery: deliveryInfo,
      payment: { ...paymentInfo, cardNumber: '**** **** **** ' + paymentInfo.cardNumber.slice(-4) },
      total: finalTotal,
      orderNumber: 'LO' + Date.now(),
      date: new Date().toISOString()
    };
    onOrderComplete(orderData);
  };

  const provinces = [
    'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 
    'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Cart
        </button>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-8">
            <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-blue-400' : 'text-white/40'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-600' : 'bg-white/10'}`}>
                <Truck className="h-4 w-4" />
              </div>
              <span className="font-semibold">Delivery</span>
            </div>
            <div className={`w-16 h-0.5 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-white/20'}`}></div>
            <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-blue-400' : 'text-white/40'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-600' : 'bg-white/10'}`}>
                <CreditCard className="h-4 w-4" />
              </div>
              <span className="font-semibold">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 ? (
              /* Delivery Information */
              <div className="bg-white/5 rounded-lg p-8 border border-white/10">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Truck className="h-6 w-6 text-blue-400" />
                  Delivery Information
                </h2>

                <form onSubmit={handleDeliverySubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                        <input
                          type="text"
                          required
                          value={deliveryInfo.firstName}
                          onChange={(e) => setDeliveryInfo({...deliveryInfo, firstName: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="Enter first name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                        <input
                          type="text"
                          required
                          value={deliveryInfo.lastName}
                          onChange={(e) => setDeliveryInfo({...deliveryInfo, lastName: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="Enter last name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                        <input
                          type="email"
                          required
                          value={deliveryInfo.email}
                          onChange={(e) => setDeliveryInfo({...deliveryInfo, email: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="Enter email address"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                        <input
                          type="tel"
                          required
                          value={deliveryInfo.phone}
                          onChange={(e) => setDeliveryInfo({...deliveryInfo, phone: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Street Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                      <input
                        type="text"
                        required
                        value={deliveryInfo.address}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter street address"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">City</label>
                      <input
                        type="text"
                        required
                        value={deliveryInfo.city}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, city: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Province</label>
                      <select
                        required
                        value={deliveryInfo.province}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, province: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="">Select Province</option>
                        {provinces.map(province => (
                          <option key={province} value={province} className="bg-black">{province}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Postal Code</label>
                      <input
                        type="text"
                        required
                        value={deliveryInfo.postalCode}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, postalCode: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter postal code"
                      />
                    </div>
                  </div>

                  {/* Delivery Options */}
                  <div>
                    <label className="block text-sm font-medium mb-4">Delivery Option</label>
                    <div className="space-y-3">
                      <label className="flex items-center p-4 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors duration-300">
                        <input
                          type="radio"
                          name="delivery"
                          value="standard"
                          checked={deliveryInfo.deliveryOption === 'standard'}
                          onChange={(e) => setDeliveryInfo({...deliveryInfo, deliveryOption: e.target.value})}
                          className="mr-3"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">Standard Delivery (5-7 days)</span>
                            <span className="text-blue-400">{cartTotal >= 500 ? 'Free' : 'R50'}</span>
                          </div>
                          <p className="text-sm text-white/60">Free shipping on orders over R500</p>
                        </div>
                      </label>
                      <label className="flex items-center p-4 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors duration-300">
                        <input
                          type="radio"
                          name="delivery"
                          value="express"
                          checked={deliveryInfo.deliveryOption === 'express'}
                          onChange={(e) => setDeliveryInfo({...deliveryInfo, deliveryOption: e.target.value})}
                          className="mr-3"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">Express Delivery (2-3 days)</span>
                            <span className="text-blue-400">R100</span>
                          </div>
                          <p className="text-sm text-white/60">Get your otaku gear faster!</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            ) : (
              /* Payment Information */
              <div className="bg-white/5 rounded-lg p-8 border border-white/10">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <CreditCard className="h-6 w-6 text-blue-400" />
                  Payment Information
                </h2>

                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                      <input
                        type="text"
                        required
                        value={paymentInfo.cardName}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter cardholder name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                      <input
                        type="text"
                        required
                        value={paymentInfo.cardNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
                          if (value.replace(/\s/g, '').length <= 16) {
                            setPaymentInfo({...paymentInfo, cardNumber: value});
                          }
                        }}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Expiry Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                        <input
                          type="text"
                          required
                          value={paymentInfo.expiryDate}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
                            if (value.length <= 5) {
                              setPaymentInfo({...paymentInfo, expiryDate: value});
                            }
                          }}
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CVV</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                        <input
                          type="text"
                          required
                          value={paymentInfo.cvv}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 3) {
                              setPaymentInfo({...paymentInfo, cvv: value});
                            }
                          }}
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="123"
                          maxLength={3}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-600/10 rounded-lg p-4 border border-blue-600/20">
                    <div className="flex items-center gap-2 text-blue-400 mb-2">
                      <Shield className="h-5 w-5" />
                      <span className="font-semibold">Secure Payment</span>
                    </div>
                    <p className="text-sm text-white/80">
                      Your payment information is encrypted and secure. We never store your card details.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white py-4 rounded-lg font-semibold transition-all duration-300"
                    >
                      Back to Delivery
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      Complete Order
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 rounded-lg p-6 border border-white/10 sticky top-24">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex items-center gap-3">
                    <div className="bg-blue-600/10 rounded-lg p-2 flex-shrink-0">
                      <div className="w-6 h-6 bg-blue-400/20 rounded"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{item.name}</p>
                      <p className="text-xs text-white/60">{item.size} • Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-blue-400">
                      R{parseInt(item.price.replace('R', '')) * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-white/10 pt-4">
                <div className="flex justify-between text-white/80">
                  <span>Subtotal</span>
                  <span>R{cartTotal}</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Delivery</span>
                  <span>{deliveryCost === 0 ? 'Free' : `R${deliveryCost}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-white/10 pt-3">
                  <span>Total</span>
                  <span className="text-blue-400">R{finalTotal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}