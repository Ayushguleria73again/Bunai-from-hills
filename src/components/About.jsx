import React from 'react'

const About = () => {
  return (
    <section id="about" className="w-full py-16 md:py-24 px-4 md:px-8" style={{ background: '#e8bd7d' }}>
      <div className="max-w-5xl mx-auto">
        <h2 
          className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-center mb-12 md:mb-16"
          style={{ color: '#75785b' }}
        >
          Our Story
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <p 
              className="font-sans text-base md:text-lg leading-relaxed mb-4 md:mb-6"
              style={{ color: '#75785b' }}
            >
              Each piece is lovingly handcrafted in the serene hills of Himachal Pradesh, where tradition meets contemporary design. Our artisans pour their heart into every stitch, creating unique crochet items that bring warmth and character to your home.
            </p>
            <p 
              className="font-sans text-base md:text-lg leading-relaxed"
              style={{ color: '#75785b', opacity: 0.9 }}
            >
              From cozy blankets to delicate accessories, every creation tells a story of craftsmanship, patience, and the timeless art of crochet passed down through generations.
            </p>
          </div>
          <div className="relative mt-8 md:mt-0">
            <svg 
              className="w-full h-auto" 
              viewBox="0 0 400 400" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="50" y="50" width="300" height="300" rx="150" fill="#e6ddc5" opacity="0.5" />
              <circle cx="200" cy="150" r="40" fill="#75785b" opacity="0.7" />
              <circle cx="150" cy="200" r="35" fill="#e6ddc5" />
              <circle cx="250" cy="200" r="35" fill="#e6ddc5" />
              <circle cx="200" cy="250" r="45" fill="#75785b" opacity="0.7" />
              <path d="M120 180 Q200 220 280 180" stroke="#75785b" strokeWidth="3" fill="none" />
              <path d="M140 240 Q200 280 260 240" stroke="#75785b" strokeWidth="3" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

