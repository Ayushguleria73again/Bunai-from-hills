import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

const FAQ = () => {
  const navigate = useNavigate()
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'How long does shipping take?',
      answer: 'Shipping times vary by location. Metro cities typically receive orders in 5-7 business days, while other cities take 7-10 business days. Remote areas may take 10-15 business days. We provide tracking information once your order ships.'
    },
    {
      question: 'Do you offer free shipping?',
      answer: 'Yes! We offer free shipping on all orders above ₹2,000. For orders below this amount, a shipping charge of ₹100 applies.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept Cash on Delivery (COD) and Online Payment methods including UPI, Credit Cards, and Debit Cards. All payments are processed securely.'
    },
    {
      question: 'Are your products handmade?',
      answer: 'Yes, all our products are handcrafted by skilled artisans from the Himalayan region. Each item is unique and made with care and attention to detail.'
    },
    {
      question: 'Can I return or exchange a product?',
      answer: 'Due to the handmade nature of our products, we accept returns only for defective or damaged items, or if you receive the wrong product. Returns must be initiated within 7 days of delivery, and items must be in original condition with tags attached.'
    },
    {
      question: 'How do I care for my crochet items?',
      answer: 'We recommend hand washing your crochet items in cold water with mild detergent. Gently squeeze out excess water and lay flat to dry. Avoid wringing or machine washing to preserve the quality and shape of your items.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Currently, we only ship within India. We are working on expanding our shipping to international destinations. Please check back with us or contact us for updates.'
    },
    {
      question: 'Can I customize an order?',
      answer: 'Yes! We offer customization options for many of our products. Please contact us through our contact page with your requirements, and we will work with you to create a custom piece. Custom orders may take additional time to complete.'
    },
    {
      question: 'What materials do you use?',
      answer: 'We use premium quality, natural yarns sourced sustainably. Our materials are chosen for their durability, comfort, and eco-friendly properties. Each product listing includes information about the materials used.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order is shipped, you will receive a tracking number via email and SMS. You can use this tracking number on our website or the courier service\'s website to track your package in real-time.'
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4" style={{ background: '#e6ddc5' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-6 text-sm font-sans hover:opacity-70 transition-opacity"
          style={{ color: '#75785b' }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Home
        </button>

        <h1 className="font-serif text-4xl md:text-5xl font-light mb-4" style={{ color: '#75785b' }}>
          Frequently Asked Questions
        </h1>
        <p className="font-sans text-base mb-12" style={{ color: '#75785b', opacity: 0.8 }}>
          Find answers to common questions about our products, shipping, and services
        </p>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden transition-all duration-300"
              style={{ 
                background: 'rgba(232, 189, 125, 0.2)',
                border: '1px solid rgba(117, 120, 91, 0.2)'
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left transition-all hover:opacity-80"
                style={{ color: '#75785b' }}
              >
                <h3 className="font-serif text-lg md:text-xl font-semibold pr-4">
                  {faq.question}
                </h3>
                <FontAwesomeIcon
                  icon={openIndex === index ? faChevronUp : faChevronDown}
                  className="flex-shrink-0 text-lg transition-transform duration-300"
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="font-sans text-base leading-relaxed" style={{ color: '#75785b', opacity: 0.9 }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 p-6 md:p-8 rounded-2xl text-center" style={{ background: 'rgba(117, 120, 91, 0.1)' }}>
          <h3 className="font-serif text-xl md:text-2xl font-semibold mb-3" style={{ color: '#75785b' }}>
            Still have questions?
          </h3>
          <p className="font-sans text-base mb-4" style={{ color: '#75785b', opacity: 0.8 }}>
            Feel free to reach out to us through our contact page
          </p>
          <button
            onClick={() => navigate('/#contact')}
            className="px-6 py-3 rounded-lg font-sans font-semibold transition-all hover:opacity-90"
            style={{ 
              background: '#75785b', 
              color: '#e6ddc5' 
            }}
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  )
}

export default FAQ

