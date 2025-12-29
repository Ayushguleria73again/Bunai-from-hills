import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const TermsAndConditions = () => {
  const navigate = useNavigate()

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
          Terms and Conditions
        </h1>
        <p className="font-sans text-sm mb-8" style={{ color: '#75785b', opacity: 0.7 }}>
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="space-y-8">
          {/* Section */}
          <div className="p-6 rounded-2xl" style={{ background: 'rgba(232, 189, 125, 0.2)' }}>
            <h2 className="font-serif text-2xl font-semibold mb-4" style={{ color: '#75785b' }}>
              1. Acceptance of Terms
            </h2>
            <p className="font-sans text-base leading-relaxed mb-4" style={{ color: '#75785b', opacity: 0.9 }}>
              By accessing and using Bunai From Hills website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
            <p className="font-sans text-base leading-relaxed" style={{ color: '#75785b', opacity: 0.9 }}>
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          {/* Section */}
          <div className="p-6 rounded-2xl" style={{ background: 'rgba(232, 189, 125, 0.2)' }}>
            <h2 className="font-serif text-2xl font-semibold mb-4" style={{ color: '#75785b' }}>
              2. Products and Services
            </h2>
            <p className="font-sans text-base leading-relaxed mb-4" style={{ color: '#75785b', opacity: 0.9 }}>
              All products displayed on our website are handcrafted items. We strive to provide accurate descriptions and images, but slight variations may occur as each item is uniquely made.
            </p>
            <ul className="list-disc list-inside space-y-2 font-sans text-base" style={{ color: '#75785b', opacity: 0.9 }}>
              <li>All prices are in Indian Rupees (₹) and are subject to change without notice</li>
              <li>Product availability is subject to stock levels</li>
              <li>We reserve the right to refuse any order</li>
            </ul>
          </div>

          {/* Section */}
          <div className="p-6 rounded-2xl" style={{ background: 'rgba(232, 189, 125, 0.2)' }}>
            <h2 className="font-serif text-2xl font-semibold mb-4" style={{ color: '#75785b' }}>
              3. Orders and Payment
            </h2>
            <p className="font-sans text-base leading-relaxed mb-4" style={{ color: '#75785b', opacity: 0.9 }}>
              When you place an order, you are making an offer to purchase products. We will send you a confirmation email once your order is received.
            </p>
            <p className="font-sans text-base leading-relaxed mb-4" style={{ color: '#75785b', opacity: 0.9 }}>
              We accept the following payment methods:
            </p>
            <ul className="list-disc list-inside space-y-2 font-sans text-base" style={{ color: '#75785b', opacity: 0.9 }}>
              <li>Cash on Delivery (COD)</li>
              <li>Online Payment (UPI/Card)</li>
            </ul>
          </div>

          {/* Section */}
          <div className="p-6 rounded-2xl" style={{ background: 'rgba(232, 189, 125, 0.2)' }}>
            <h2 className="font-serif text-2xl font-semibold mb-4" style={{ color: '#75785b' }}>
              4. Shipping and Delivery
            </h2>
            <p className="font-sans text-base leading-relaxed mb-4" style={{ color: '#75785b', opacity: 0.9 }}>
              We ship across India. Delivery times may vary based on your location:
            </p>
            <ul className="list-disc list-inside space-y-2 font-sans text-base mb-4" style={{ color: '#75785b', opacity: 0.9 }}>
              <li>Metro cities: 5-7 business days</li>
              <li>Other cities: 7-10 business days</li>
              <li>Remote areas: 10-15 business days</li>
            </ul>
            <p className="font-sans text-base leading-relaxed" style={{ color: '#75785b', opacity: 0.9 }}>
              Free shipping is available on orders above ₹2,000. Shipping charges apply for orders below this amount.
            </p>
          </div>

          {/* Section */}
          <div className="p-6 rounded-2xl" style={{ background: 'rgba(232, 189, 125, 0.2)' }}>
            <h2 className="font-serif text-2xl font-semibold mb-4" style={{ color: '#75785b' }}>
              5. Returns and Refunds
            </h2>
            <p className="font-sans text-base leading-relaxed mb-4" style={{ color: '#75785b', opacity: 0.9 }}>
              Due to the handmade nature of our products, we accept returns only in case of:
            </p>
            <ul className="list-disc list-inside space-y-2 font-sans text-base mb-4" style={{ color: '#75785b', opacity: 0.9 }}>
              <li>Defective or damaged items</li>
              <li>Wrong item received</li>
            </ul>
            <p className="font-sans text-base leading-relaxed" style={{ color: '#75785b', opacity: 0.9 }}>
              Returns must be initiated within 7 days of delivery. Items must be in original condition with tags attached.
            </p>
          </div>

          {/* Section */}
          <div className="p-6 rounded-2xl" style={{ background: 'rgba(232, 189, 125, 0.2)' }}>
            <h2 className="font-serif text-2xl font-semibold mb-4" style={{ color: '#75785b' }}>
              6. Intellectual Property
            </h2>
            <p className="font-sans text-base leading-relaxed" style={{ color: '#75785b', opacity: 0.9 }}>
              All content on this website, including images, text, and designs, is the property of Bunai From Hills and is protected by copyright laws. Unauthorized use is prohibited.
            </p>
          </div>

          {/* Section */}
          <div className="p-6 rounded-2xl" style={{ background: 'rgba(232, 189, 125, 0.2)' }}>
            <h2 className="font-serif text-2xl font-semibold mb-4" style={{ color: '#75785b' }}>
              7. Contact Information
            </h2>
            <p className="font-sans text-base leading-relaxed" style={{ color: '#75785b', opacity: 0.9 }}>
              For any questions regarding these terms and conditions, please contact us through our contact page or email us directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsAndConditions

