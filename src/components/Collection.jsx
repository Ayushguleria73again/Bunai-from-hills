import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const Collection = () => {
  const navigate = useNavigate()

  // Available categories
  const categories = [
    { 
      id: 'crochet', 
      name: 'Crochet Items', 
      description: 'Beautiful handcrafted crochet products',
      color: 'from-green-400 to-green-600'
    },
    { 
      id: 'home-decor', 
      name: 'Home Decor', 
      description: 'Elegant home decoration items',
      color: 'from-yellow-400 to-yellow-600'
    },
    { 
      id: 'accessories', 
      name: 'Accessories', 
      description: 'Stylish and functional accessories',
      color: 'from-purple-400 to-purple-600'
    },
    { 
      id: 'toys', 
      name: 'Toys', 
      description: 'Handmade toys for children',
      color: 'from-blue-400 to-blue-600'
    },
    { 
      id: 'clothing', 
      name: 'Clothing', 
      description: 'Comfortable and stylish clothing',
      color: 'from-red-400 to-red-600'
    },
    { 
      id: 'bags', 
      name: 'Bags', 
      description: 'Practical and aesthetic bags',
      color: 'from-indigo-400 to-indigo-600'
    }
  ]

  const handleCategoryClick = (categoryId) => {
    navigate(`/collections?category=${categoryId}`)
  }

  return (
    <section
      id="collection"
      className="w-full py-16 md:py-24 px-4 md:px-8"
      style={{ background: '#e6ddc5' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2
            className="font-serif text-4xl md:text-5xl mb-4"
            style={{ color: '#75785b' }}
          >
            Shop By Category
          </h2>
          <p
            className="max-w-2xl mx-auto text-base md:text-lg"
            style={{ color: '#75785b', opacity: 0.8 }}
          >
            Browse our products by category
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(category => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="group rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              style={{ background: 'rgba(232, 189, 125, 0.2)' }}
            >
              {/* Category Header */}
              <div className="h-32 flex items-center justify-center" style={{ background: 'rgba(117, 120, 91, 0.1)' }}>
                <h3
                  className="font-serif text-2xl md:text-3xl font-bold text-center px-4"
                  style={{ color: '#75785b' }}
                >
                  {category.name}
                </h3>
              </div>

              {/* Category Content */}
              <div className="p-6">
                <p
                  className="text-sm mb-4 min-h-[3rem]"
                  style={{ color: '#75785b', opacity: 0.7 }}
                >
                  {category.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: '#75785b', borderWidth: '1px 0 0 0' }}>
                  <span className="text-sm font-semibold" style={{ color: '#75785b' }}>
                    Explore
                  </span>

                  <button className="flex items-center gap-2 text-sm font-semibold transition-transform group-hover:translate-x-1">
                    <span style={{ color: '#75785b' }}>View</span>
                    <FontAwesomeIcon icon={faArrowRight} style={{ color: '#75785b' }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Collections Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/collections')}
            className="flex items-center gap-2 mx-auto px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 active:scale-95"
            style={{ background: '#75785b', color: '#e6ddc5' }}
          >
            View All Collections
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Collection
