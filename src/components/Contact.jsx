import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faMapMarkerAlt, 
  faEnvelope, 
  faShippingFast 
} from '@fortawesome/free-solid-svg-icons'
import { useToast } from '../context/ToastContext'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addToast } = useToast()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit contact form');
      }

      const result = await response.json()
      
      addToast(`Thank you, ${formData.name}! We've received your message and will get back to you soon at ${formData.email}.`, 'success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      addToast(error.message || 'Thank you for your message! We\'ll get back to you soon.', 'error')
      setFormData({ name: '', email: '', message: '' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: faMapMarkerAlt,
      title: 'Location',
      content: 'Himachal Pradesh, India'
    },
    {
      icon: faEnvelope,
      title: 'Email',
      content: 'hello@bunaifromhills.com'
    },
    {
      icon: faShippingFast,
      title: 'Delivery',
      content: 'We ship across all of India with care and tracking'
    }
  ]

  return (
    <section id="contact" className="w-full py-16 md:py-24 px-4 md:px-8" style={{ background: '#e6ddc5' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mb-3 md:mb-4"
            style={{ color: '#75785b' }}
          >
            Get In Touch
          </h2>
          <p 
            className="font-sans text-base md:text-lg"
            style={{ color: '#75785b', opacity: 0.8 }}
          >
            We'd love to hear from you
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <div className="rounded-2xl p-6 md:p-8" style={{ background: 'rgba(232, 189, 125, 0.2)' }}>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label 
                  htmlFor="name" 
                  className="font-sans text-sm font-medium block mb-2"
                  style={{ color: '#75785b' }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input w-full px-4 py-3 rounded-lg font-sans text-base border-2"
                  style={{ 
                    background: '#e6ddc5', 
                    color: '#75785b', 
                    borderColor: 'rgba(117, 120, 91, 0.2)' 
                  }}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label 
                  htmlFor="email" 
                  className="font-sans text-sm font-medium block mb-2"
                  style={{ color: '#75785b' }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input w-full px-4 py-3 rounded-lg font-sans text-base border-2"
                  style={{ 
                    background: '#e6ddc5', 
                    color: '#75785b', 
                    borderColor: 'rgba(117, 120, 91, 0.2)' 
                  }}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label 
                  htmlFor="message" 
                  className="font-sans text-sm font-medium block mb-2"
                  style={{ color: '#75785b' }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-input w-full px-4 py-3 rounded-lg font-sans text-base border-2 resize-none"
                  style={{ 
                    background: '#e6ddc5', 
                    color: '#75785b', 
                    borderColor: 'rgba(117, 120, 91, 0.2)' 
                  }}
                  placeholder="Tell us about your requirements..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-3 md:py-4 rounded-lg font-sans font-medium text-base transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: '#75785b', color: '#e6ddc5' }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 md:space-y-8">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className="rounded-2xl p-6 md:p-8"
                style={{ background: 'rgba(232, 189, 125, 0.2)' }}
              >
                <div className="mb-4">
                  <FontAwesomeIcon 
                    icon={info.icon} 
                    className="w-10 h-10 md:w-12 md:h-12"
                    style={{ color: '#75785b' }}
                  />
                </div>
                <h3 
                  className="font-serif text-xl md:text-2xl font-semibold mb-2"
                  style={{ color: '#75785b' }}
                >
                  {info.title}
                </h3>
                <p 
                  className="font-sans text-sm md:text-base"
                  style={{ color: '#75785b', opacity: 0.8 }}
                >
                  {info.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

