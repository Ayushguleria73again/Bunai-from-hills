import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './context/ToastContext'

import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Gallery from './components/Gallery'
import Collection from './components/Collection'
import MoreCollections from './components/MoreCollections'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Cart from './components/Cart'
import ScrollToTop from './components/ScrollToTop'

import Checkout from './pages/Checkout'
import TermsAndConditions from './pages/TermsAndConditions'
import FAQ from './pages/FAQ'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Snowfall from 'react-snowfall'

import './styles/components.css'

const Home = () => (
  <>
    <Snowfall color="White" />
    <Hero />
    <About />
    <Gallery />
    <Collection />
    <Contact />
  </>
)

const App = () => {
  return (
    <ToastProvider>
      <CartProvider>
        <div className="w-full h-full font-sans overflow-auto" style={{ background: '#e6ddc5' }}>
          <ScrollToTop />
          <Navigation />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<MoreCollections />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
          </Routes>

          <Footer />
          <Cart />
        </div>
      </CartProvider>
    </ToastProvider>
  )
}

export default App
