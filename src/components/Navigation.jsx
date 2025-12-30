import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../context/CartContext'

const Navigation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getCartItemsCount, setIsCartOpen } = useCart()
  const cartCount = getCartItemsCount()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault()
    
    // If we're on checkout page, navigate to home first
    if (targetId === '#gallery') {
      // Navigate to the dedicated gallery page
      navigate('/gallery')
      setIsMobileMenuOpen(false)
    } else if (targetId === '#blog' || targetId === '/blog') {
      // Navigate to the blog page
      navigate('/blog')
      setIsMobileMenuOpen(false)
    } else if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const target = document.querySelector(targetId)
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 100)
    } else {
      const target = document.querySelector(targetId)
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
    setIsMobileMenuOpen(false)
  }

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#collection', label: 'Collection' },
    { href: '#contact', label: 'Contact' }
  ]

  return (
    <>
      <nav 
        className={`w-full py-4 md:py-6 px-4 md:px-8 fixed top-0 left-0 z-50 backdrop-blur-sm transition-all duration-300 ${
          isScrolled ? 'shadow-md' : ''
        }`}
        style={{ background: 'rgba(230, 221, 197, 0.95)', marginBottom: '5px' }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo/Brand */}
          <div 
            className="font-serif text-2xl md:text-3xl font-semibold opacity-0 animate-fade-in cursor-pointer"
            style={{ color: '#75785b' }}
            onClick={(e) => {
              if (location.pathname !== '/') {
                navigate('/')
              } else {
                handleSmoothScroll(e, '#home')
              }
            }}
          >
            Bunai From The Hills
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 lg:gap-8 items-center">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={`nav-link font-sans text-sm tracking-wide opacity-0 animate-fade-in ${
                  index === 0 ? 'delay-200' : 
                  index === 1 ? 'delay-400' : 
                  index === 2 ? 'delay-600' : 'delay-800'
                }`}
                style={{ color: '#75785b' }}
              >
                {link.label}
              </a>
            ))}
            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:opacity-70 transition-opacity"
              style={{ color: '#75785b' }}
              aria-label="Shopping cart"
            >
              <FontAwesomeIcon icon={faShoppingBag} className="text-xl" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: '#75785b', color: '#e6ddc5' }}
                >
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button and Cart */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2"
              style={{ color: '#75785b' }}
              aria-label="Shopping cart"
            >
              <FontAwesomeIcon icon={faShoppingBag} className="text-xl" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: '#75785b', color: '#e6ddc5' }}
                >
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
              style={{ color: '#75785b' }}
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon 
                icon={isMobileMenuOpen ? faTimes : faBars} 
                className="text-2xl"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black z-[60] transition-opacity duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-60' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        style={{ top: 0, left: 0, right: 0, bottom: 0 }}
      />

      {/* Mobile Menu - Full Screen */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full z-[70] transition-transform duration-500 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ 
          backgroundColor: '#e6ddc5',
          background: '#e6ddc5'
        }}
      >
        {/* Header with Close Button */}
        <div 
          className={`flex items-center justify-between p-6 transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100 delay-100' : 'opacity-0'
          }`}
          style={{ 
            borderBottom: '1px solid rgba(117, 120, 91, 0.3)',
            backgroundColor: '#e6ddc5'
          }}
        >
          <div 
            className="font-serif text-2xl font-semibold"
            style={{ color: '#75785b' }}
          >
            Menu
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 hover:opacity-70 transition-all active:scale-95"
            style={{ color: '#75785b' }}
            aria-label="Close menu"
          >
            <FontAwesomeIcon icon={faTimes} className="text-2xl" />
          </button>
        </div>

        {/* Menu Items */}
        <div 
          className="flex flex-col pt-8 px-6 h-full overflow-y-auto"
          style={{ backgroundColor: '#e6ddc5' }}
        >
          <div className="flex flex-col gap-3">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={`font-sans text-lg font-medium py-4 px-5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                  isMobileMenuOpen 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-4'
                }`}
                style={{ 
                  color: '#75785b',
                  backgroundColor: 'rgba(117, 120, 91, 0.1)',
                  border: '1px solid rgba(117, 120, 91, 0.2)',
                  transitionDelay: isMobileMenuOpen ? `${150 + index * 50}ms` : '0ms'
                }}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setIsCartOpen(true)
                setIsMobileMenuOpen(false)
              }}
              className={`flex items-center gap-3 font-sans text-lg font-medium py-4 px-5 rounded-xl text-left transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                isMobileMenuOpen 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-4'
              }`}
              style={{ 
                color: '#75785b',
                backgroundColor: 'rgba(117, 120, 91, 0.1)',
                border: '1px solid rgba(117, 120, 91, 0.2)',
                transitionDelay: isMobileMenuOpen ? `${150 + navLinks.length * 50}ms` : '0ms'
              }}
            >
              <FontAwesomeIcon icon={faShoppingBag} />
              <span>Cart {cartCount > 0 && `(${cartCount})`}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigation
