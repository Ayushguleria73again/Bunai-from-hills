import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faTimes, 
  faPlus, 
  faMinus, 
  faShoppingBag,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const navigate = useNavigate()
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    isCartOpen,
    setIsCartOpen
  } = useCart()

  const handleCheckout = () => {
    if (cartItems.length === 0) return
    setIsCartOpen(false)
    navigate('/checkout')
  }

  if (!isCartOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Cart Sidebar */}
      <div
        className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto"
        style={{ background: '#e6ddc5' }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: '#75785b', borderWidth: '0 0 1px 0' }}>
            <h2 className="font-serif text-2xl font-semibold" style={{ color: '#75785b' }}>
              <FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
              Shopping Cart
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:opacity-70 transition-opacity"
              style={{ color: '#75785b' }}
            >
              <FontAwesomeIcon icon={faTimes} className="text-xl" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <FontAwesomeIcon 
                  icon={faShoppingBag} 
                  className="text-6xl mb-4 opacity-30"
                  style={{ color: '#75785b' }}
                />
                <p className="font-sans text-lg" style={{ color: '#75785b', opacity: 0.7 }}>
                  Your cart is empty
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-2 rounded-lg font-sans transition-all"
                  style={{ 
                    background: '#75785b', 
                    color: '#e6ddc5' 
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-lg"
                    style={{ background: 'rgba(232, 189, 125, 0.2)' }}
                  >
                    {/* Product Image/Icon */}
                    <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden" style={{ background: 'rgba(117, 120, 91, 0.1)' }}>
                      {item.imageUrl ? (
                        <img 
                          src={`${import.meta.env.VITE_API_BASE_URL}${item.imageUrl}`} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : item.image ? (
                        <img 
                          src={`${import.meta.env.VITE_API_BASE_URL}${item.image}`} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : item.svg ? (
                        item.svg
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FontAwesomeIcon icon={faShoppingBag} className="text-2xl" style={{ color: '#75785b', opacity: 0.5 }} />
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-semibold mb-1 truncate" style={{ color: '#75785b' }}>
                        {item.title}
                      </h3>
                      <p className="font-sans text-sm mb-2" style={{ color: '#75785b', opacity: 0.8 }}>
                        ₹{item.price.toFixed(2)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded flex items-center justify-center transition-all hover:opacity-70"
                          style={{ background: '#75785b', color: '#e6ddc5' }}
                        >
                          <FontAwesomeIcon icon={faMinus} className="text-xs" />
                        </button>
                        <span className="font-sans text-sm w-8 text-center" style={{ color: '#75785b' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded flex items-center justify-center transition-all hover:opacity-70"
                          style={{ background: '#75785b', color: '#e6ddc5' }}
                        >
                          <FontAwesomeIcon icon={faPlus} className="text-xs" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto p-1 hover:opacity-70 transition-opacity"
                          style={{ color: '#75785b' }}
                        >
                          <FontAwesomeIcon icon={faTrash} className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with Total and Checkout */}
          {cartItems.length > 0 && (
            <div className="border-t p-6" style={{ borderColor: '#75785b', borderWidth: '1px 0 0 0' }}>
              <div className="flex justify-between items-center mb-4">
                <span className="font-serif text-xl font-semibold" style={{ color: '#75785b' }}>
                  Total:
                </span>
                <span className="font-serif text-2xl font-bold" style={{ color: '#75785b' }}>
                  ₹{getCartTotal().toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-3 rounded-lg font-sans font-semibold text-lg transition-all hover:opacity-90"
                style={{ 
                  background: '#75785b', 
                  color: '#e6ddc5' 
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Cart

