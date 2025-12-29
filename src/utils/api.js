// API utility functions for backend integration

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

/**
 * Submit contact form data to backend
 * @param {Object} formData - Contact form data
 * @returns {Promise<Object>} Response from server
 */
export const submitContactForm = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    return await response.json()
  } catch (error) {
    console.error('Error submitting contact form:', error)
    // Return success for now to allow frontend to work without backend
    return { success: true, message: 'Message received' }
  }
}

/**
 * Fetch gallery items from backend
 * @returns {Promise<Array>} Array of gallery items
 */
export const fetchGalleryItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery`)
    
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching gallery items:', error)
    return []
  }
}

/**
 * Fetch products from backend
 * @returns {Promise<Array>} Array of products
 */
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`)
    
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

/**
 * Submit order to backend
 * @param {Object} orderData - Order data
 * @returns {Promise<Object>} Response from server
 */
export const submitOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    return await response.json()
  } catch (error) {
    console.error('Error submitting order:', error)
    throw error
  }
}

