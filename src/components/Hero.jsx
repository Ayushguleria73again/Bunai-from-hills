import React from 'react'
import Snowfall from 'react-snowfall'

const Hero = () => {
  const handleScrollToCollection = (e) => {
    e.preventDefault()
    const target = document.querySelector('#collection')
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section id="home" className="w-full min-h-screen flex items-center justify-center px-4 md:px-8 pt-20 md:pt-24 crochet-pattern">
    <Snowfall
     color="White"
     />
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-6 md:mb-8 opacity-0 animate-fade-in-up">
          <svg 
            className="w-20 h-20 md:w-24 md:h-24 mx-auto animate-float" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="45" stroke="#75785b" strokeWidth="2" fill="none" />
            <path d="M50 20 Q60 30 50 40 Q40 30 50 20" fill="#e8bd7d" />
            <path d="M50 40 Q60 50 50 60 Q40 50 50 40" fill="#75785b" />
            <path d="M50 60 Q60 70 50 80 Q40 70 50 60" fill="#e8bd7d" />
            <circle cx="30" cy="35" r="8" fill="#75785b" opacity="0.6" />
            <circle cx="70" cy="35" r="8" fill="#e8bd7d" opacity="0.6" />
            <circle cx="30" cy="65" r="8" fill="#e8bd7d" opacity="0.6" />
            <circle cx="70" cy="65" r="8" fill="#75785b" opacity="0.6" />
          </svg>
        </div>
        <h1 
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-4 md:mb-6 opacity-0 animate-fade-in-up delay-200"
          style={{ color: '#75785b' }}
        >
          Artisan Crochet
        </h1>
        <p 
          className="font-sans text-lg md:text-xl mb-3 md:mb-4 opacity-0 animate-fade-in-up delay-400"
          style={{ color: '#75785b' }}
        >
          Handcrafted Crochet from Himachal Pradesh
        </p>
        <p 
          className="font-sans text-base md:text-lg mb-8 md:mb-12 px-4 opacity-0 animate-fade-in-up delay-600"
          style={{ color: '#75785b', opacity: 0.8 }}
        >
          Handmade with love in the Himalayas, delivered across India
        </p>
        <button 
          onClick={handleScrollToCollection}
          className="btn-primary font-sans px-8 md:px-10 py-3 md:py-4 rounded-full text-base md:text-lg font-medium tracking-wide opacity-0 animate-fade-in-up delay-800 transition-transform hover:scale-105"
          style={{ background: '#75785b', color: '#e6ddc5' }}
        >
          Explore Collection
        </button>
      </div>
    </section>
  )
}

export default Hero

