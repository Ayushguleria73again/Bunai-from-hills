import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'

const Collection = () => {
  const { addToCart } = useCart()
  const collectionItems = products

  return (
    <section id="collection" className="w-full py-16 md:py-24 px-4 md:px-8" style={{ background: '#e6ddc5' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mb-4"
            style={{ color: '#75785b' }}
          >
            Shop Our Products
          </h2>
          <p className="font-sans text-base md:text-lg max-w-2xl mx-auto" style={{ color: '#75785b', opacity: 0.8 }}>
            Discover our handcrafted collection of crochet items, each made with love and care
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {collectionItems.map((item, index) => (
            <div 
              key={index}
              className="group rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              style={{ background: '#ffffff' }}
            >
              <div className="relative overflow-hidden" style={{ background: 'rgba(117, 120, 91, 0.05)' }}>
                <div className="p-8 md:p-10 aspect-square flex items-center justify-center">
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    {item.svg}
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#75785b' }}></div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl md:text-2xl font-semibold mb-2" style={{ color: '#75785b' }}>
                  {item.title}
                </h3>
                <p className="font-sans text-sm mb-4 min-h-[3rem]" style={{ color: '#75785b', opacity: 0.7 }}>
                  {item.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: '#75785b', borderWidth: '1px 0 0 0', borderOpacity: 0.2 }}>
                  <div>
                    <span className="font-serif text-2xl font-bold block" style={{ color: '#75785b' }}>
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-md"
                    style={{ 
                      background: '#75785b', 
                      color: '#e6ddc5' 
                    }}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Collection

