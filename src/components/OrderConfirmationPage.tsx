import React from 'react';
import { CheckCircle, Package, Truck, Mail, ArrowRight, Home } from 'lucide-react';

interface OrderConfirmationPageProps {
  orderData: any;
  onBackToHome: () => void;
}

export default function OrderConfirmationPage({ orderData, onBackToHome }: OrderConfirmationPageProps) {
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="bg-green-600/10 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-400" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-400">
            Thank you for your purchase! Your otaku gear is on its way.
          </p>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-400" />
              Order Details
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/80">Order Number:</span>
                <span className="font-semibold text-blue-400">{orderData.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Order Date:</span>
                <span className="font-semibold">{new Date(orderData.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Total Amount:</span>
                <span className="font-semibold text-green-400">R{orderData.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Payment Method:</span>
                <span className="font-semibold">{orderData.payment.cardNumber}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-400" />
              Delivery Information
            </h2>
            <div className="space-y-2">
              <p className="font-semibold">
                {orderData.delivery.firstName} {orderData.delivery.lastName}
              </p>
              <p className="text-white/80">{orderData.delivery.address}</p>
              <p className="text-white/80">
                {orderData.delivery.city}, {orderData.delivery.province} {orderData.delivery.postalCode}
              </p>
              <p className="text-white/80">{orderData.delivery.phone}</p>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-sm text-blue-400 font-semibold">
                  {orderData.delivery.deliveryOption === 'express' ? 'Express Delivery (2-3 days)' : 'Standard Delivery (5-7 days)'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white/5 rounded-lg p-6 border border-white/10 mb-12">
          <h2 className="text-xl font-bold mb-6">Items Ordered</h2>
          <div className="space-y-4">
            {orderData.items.map((item: any, index: number) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                <div className="bg-blue-600/10 rounded-lg p-3 flex-shrink-0">
                  <Package className="h-6 w-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-white/60">{item.anime}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full">
                      {item.size}
                    </span>
                    <span className="text-xs text-white/60">Qty: {item.quantity}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-400">
                    R{parseInt(item.price.replace('R', '')) * item.quantity}
                  </p>
                  <p className="text-xs text-white/60">{item.price} each</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-8 border border-blue-600/30 mb-12">
          <h2 className="text-2xl font-bold mb-6">What happens next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-600/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2">Order Confirmation</h3>
              <p className="text-sm text-white/80">You'll receive an email confirmation shortly</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2">Processing</h3>
              <p className="text-sm text-white/80">We'll prepare your order for shipping</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2">Delivery</h3>
              <p className="text-sm text-white/80">Your otaku gear will be delivered soon!</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onBackToHome}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Home className="h-5 w-5" />
            Continue Shopping
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2">
            Track Your Order
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}