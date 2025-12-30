import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faShoppingBag, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

const Checkout = () => {
  const navigate = useNavigate()
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart
  } = useCart()
  const { addToast } = useToast()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits'
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required'
    }
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required'
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    if (cartItems.length === 0) {
      addToast('Your cart is empty!', 'error')
      navigate('/')
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare order data
      const orderData = {
        customerInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        items: cartItems.map(item => ({
          productId: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: total,
        paymentMethod: formData.paymentMethod
      };

      // Submit order to backend
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to place order');
      }
      
      const result = await response.json();
      
      if (result.success) {
        addToast(`Order placed successfully! Order ID: ${result.orderId}`, 'success')
        clearCart();
        navigate('/');
      } else {
        addToast('There was an issue placing your order. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      addToast(`Error: ${error.message || 'Failed to place order. Please try again.'}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  }

  const subtotal = getCartTotal()
  const shipping = subtotal > 2000 ? 0 : 100
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4" style={{ background: '#e6ddc5' }}>
        <div className="max-w-4xl mx-auto text-center py-20">
          <FontAwesomeIcon 
            icon={faShoppingBag} 
            className="text-6xl mb-4 opacity-30"
            style={{ color: '#75785b' }}
          />
          <h2 className="font-serif text-3xl mb-4" style={{ color: '#75785b' }}>
            Your cart is empty
          </h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-lg font-sans font-semibold transition-all hover:opacity-90"
            style={{ 
              background: '#75785b', 
              color: '#e6ddc5' 
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4" style={{ background: '#e6ddc5' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-6 text-sm font-sans hover:opacity-70 transition-opacity"
          style={{ color: '#75785b' }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Shopping
        </button>

        <h1 className="font-serif text-4xl md:text-5xl font-light mb-8" style={{ color: '#75785b' }}>
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Information */}
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(232, 189, 125, 0.2)' }}>
                <h2 className="font-serif text-2xl font-semibold mb-6" style={{ color: '#75785b' }}>
                  Shipping Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block mb-2 font-sans text-sm font-medium" style={{ color: '#75785b' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg font-sans border transition-all ${
                        errors.fullName ? 'border-red-500' : 'border-transparent'
                      }`}
                      style={{ 
                        background: 'rgba(117, 120, 91, 0.1)',
                        color: '#75785b'
                      }}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 font-sans text-sm font-medium" style={{ color: '#75785b' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg font-sans border transition-all ${
                        errors.email ? 'border-red-500' : 'border-transparent'
                      }`}
                      style={{ 
                        background: 'rgba(117, 120, 91, 0.1)',
                        color: '#75785b'
                      }}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 font-sans text-sm font-medium" style={{ color: '#75785b' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg font-sans border transition-all ${
                        errors.phone ? 'border-red-500' : 'border-transparent'
                      }`}
                      style={{ 
                        background: 'rgba(117, 120, 91, 0.1)',
                        color: '#75785b'
                      }}
                      placeholder="10-digit phone number"
                      maxLength="10"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2 font-sans text-sm font-medium" style={{ color: '#75785b' }}>
                      Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className={`w-full px-4 py-2 rounded-lg font-sans border transition-all resize-none ${
                        errors.address ? 'border-red-500' : 'border-transparent'
                      }`}
                      style={{ 
                        background: 'rgba(117, 120, 91, 0.1)',
                        color: '#75785b'
                      }}
                      placeholder="Street address, apartment, suite, etc."
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 font-sans text-sm font-medium" style={{ color: '#75785b' }}>
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg font-sans border transition-all ${
                        errors.city ? 'border-red-500' : 'border-transparent'
                      }`}
                      style={{ 
                        background: 'rgba(117, 120, 91, 0.1)',
                        color: '#75785b'
                      }}
                      placeholder="City"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 font-sans text-sm font-medium" style={{ color: '#75785b' }}>
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg font-sans border transition-all ${
                        errors.state ? 'border-red-500' : 'border-transparent'
                      }`}
                      style={{ 
                        background: 'rgba(117, 120, 91, 0.1)',
                        color: '#75785b'
                      }}
                      placeholder="State"
                    />
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 font-sans text-sm font-medium" style={{ color: '#75785b' }}>
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg font-sans border transition-all ${
                        errors.pincode ? 'border-red-500' : 'border-transparent'
                      }`}
                      style={{ 
                        background: 'rgba(117, 120, 91, 0.1)',
                        color: '#75785b'
                      }}
                      placeholder="6-digit pincode"
                      maxLength="6"
                    />
                    {errors.pincode && (
                      <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(232, 189, 125, 0.2)' }}>
                <h2 className="font-serif text-2xl font-semibold mb-6" style={{ color: '#75785b' }}>
                  Payment Method
                </h2>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all hover:opacity-80" style={{ background: formData.paymentMethod === 'cod' ? 'rgba(117, 120, 91, 0.2)' : 'rgba(117, 120, 91, 0.1)' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                      style={{ accentColor: '#75785b' }}
                    />
                    <span className="font-sans" style={{ color: '#75785b' }}>
                      Cash on Delivery (COD)
                    </span>
                  </label>
                  
                  <label className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all hover:opacity-80" style={{ background: formData.paymentMethod === 'online' ? 'rgba(117, 120, 91, 0.2)' : 'rgba(117, 120, 91, 0.1)' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={formData.paymentMethod === 'online'}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                      style={{ accentColor: '#75785b' }}
                    />
                    <span className="font-sans" style={{ color: '#75785b' }}>
                      Online Payment (UPI/Card)
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-lg font-sans font-semibold text-lg transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  background: '#75785b', 
                  color: '#e6ddc5' 
                }}
              >
                {isSubmitting ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-2xl" style={{ background: 'rgba(232, 189, 125, 0.2)' }}>
              <h2 className="font-serif text-2xl font-semibold mb-6" style={{ color: '#75785b' }}>
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 rounded-lg"
                    style={{ background: 'rgba(117, 120, 91, 0.1)' }}
                  >
                    <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden" style={{ background: 'rgba(117, 120, 91, 0.1)' }}>
                      {item.svg || (
                        <div className="w-full h-full flex items-center justify-center">
                          <FontAwesomeIcon icon={faShoppingBag} className="text-lg" style={{ color: '#75785b', opacity: 0.5 }} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-semibold text-sm truncate mb-1" style={{ color: '#75785b' }}>
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-xs" style={{ color: '#75785b', opacity: 0.8 }}>
                          Qty: {item.quantity} × ₹{item.price.toFixed(2)}
                        </span>
                        <span className="font-sans text-sm font-semibold" style={{ color: '#75785b' }}>
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-4 border-t" style={{ borderColor: '#75785b', borderWidth: '1px 0 0 0' }}>
                <div className="flex justify-between font-sans text-sm" style={{ color: '#75785b' }}>
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-sans text-sm" style={{ color: '#75785b' }}>
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `₹${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {subtotal < 2000 && (
                  <p className="text-xs" style={{ color: '#75785b', opacity: 0.7 }}>
                    Add ₹{(2000 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
                <div className="flex justify-between pt-3 border-t" style={{ borderColor: '#75785b', borderWidth: '1px 0 0 0' }}>
                  <span className="font-serif text-xl font-semibold" style={{ color: '#75785b' }}>
                    Total
                  </span>
                  <span className="font-serif text-xl font-bold" style={{ color: '#75785b' }}>
                    ₹{total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
