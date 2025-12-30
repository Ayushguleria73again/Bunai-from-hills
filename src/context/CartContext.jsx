import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // -------------------------
  // LOAD CART FROM LOCALSTORAGE
  // -------------------------
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('bunaiCart')
      if (savedCart) {
        const parsed = JSON.parse(savedCart)
        setCartItems(
          parsed.map(item => ({
            ...item,
            id:
              typeof item.id === 'object'
                ? item.id.$oid || item.id.toString()
                : item.id,
          }))
        )
      }
    } catch (error) {
      console.error('Error loading cart:', error)
    }
  }, [])

  // -------------------------
  // SAVE CART TO LOCALSTORAGE
  // -------------------------
  useEffect(() => {
    const cartToSave = cartItems.map(({ svg, ...item }) => item)
    localStorage.setItem('bunaiCart', JSON.stringify(cartToSave))
  }, [cartItems])

  // -------------------------
  // CART ACTIONS
  // -------------------------
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [
        ...prevItems,
        {
          ...product,
          id:
            typeof product.id === 'object'
              ? product.id.$oid || product.id.toString()
              : product.id,
          quantity: 1,
        },
      ]
    })
  }

  const removeFromCart = (productId) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.id !== productId)
    )
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('bunaiCart')
  }

  // -------------------------
  // HELPERS
  // -------------------------
  const getCartTotal = () =>
    cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )

  const getCartItemsCount = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0)

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    isCartOpen,
    setIsCartOpen,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
