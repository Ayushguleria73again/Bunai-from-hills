import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Gallery from './components/Gallery'
import Collection from './components/Collection'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Cart from './components/Cart'
import ScrollToTop from './components/ScrollToTop'
import Checkout from './pages/Checkout'
import TermsAndConditions from './pages/TermsAndConditions'
import FAQ from './pages/FAQ'
import Blog from './pages/Blog'
import './styles/components.css'

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Gallery />
      <Collection />
      <Contact />
    </>
  )
}

function App() {
  return (
    <CartProvider>
      <div className="w-full h-full font-sans overflow-auto" style={{ background: '#e6ddc5' }}>
        <ScrollToTop />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
        <Footer />
        <Cart />
      </div>
    </CartProvider>
  )
}

export default App

