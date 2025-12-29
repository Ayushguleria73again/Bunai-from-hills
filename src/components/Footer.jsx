import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  return (
    <footer 
      className="w-full py-8 md:py-12 px-4 md:px-8"
      style={{ background: '#75785b' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 
              className="font-serif text-xl md:text-2xl font-semibold mb-4"
              style={{ color: '#e6ddc5' }}
            >
              Bunai From The Hills
            </h3>
            <p 
              className="font-sans text-sm leading-relaxed"
              style={{ color: '#e6ddc5', opacity: 0.9 }}
            >
              Handcrafted crochet items made with love by skilled artisans from the Himalayan region.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 
              className="font-serif text-lg font-semibold mb-4"
              style={{ color: '#e6ddc5' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/blog" 
                  className="font-sans text-sm hover:opacity-80 transition-opacity"
                  style={{ color: '#e6ddc5', opacity: 0.9 }}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="font-sans text-sm hover:opacity-80 transition-opacity"
                  style={{ color: '#e6ddc5', opacity: 0.9 }}
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="font-sans text-sm hover:opacity-80 transition-opacity"
                  style={{ color: '#e6ddc5', opacity: 0.9 }}
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="font-sans text-sm hover:opacity-80 transition-opacity"
                  style={{ color: '#e6ddc5', opacity: 0.9 }}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 
              className="font-serif text-lg font-semibold mb-4"
              style={{ color: '#e6ddc5' }}
            >
              Connect With Us
            </h4>
            <p 
              className="font-sans text-sm leading-relaxed"
              style={{ color: '#e6ddc5', opacity: 0.9 }}
            >
              Follow us for updates on new products, crafting stories, and special offers.
            </p>
          </div>
        </div>

        <p className="font-sans text-xs md:text-sm tracking-wide text-center"
   style={{ color: '#e6ddc5', opacity: 0.85 }}>
  © 2025 Bunai From Hills — Handwoven stories from the hills, made with{' '}
  <FontAwesomeIcon icon={faHeart} className="text-red-500 inline-block" />{' '}
  in Himachal Pradesh.
</p>

      </div>
    </footer>
  )
}

export default Footer

