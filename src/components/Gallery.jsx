import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { products } from '../data/products'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  const galleryItems = products.map((product, index) => ({
    ...product,
    id: index + 1
  }))

  const openLightbox = (item) => {
    setSelectedImage(item)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction) => {
    const currentIndex = galleryItems.findIndex(item => item.id === selectedImage.id)
    let newIndex
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % galleryItems.length
    } else {
      newIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length
    }
    
    setSelectedImage(galleryItems[newIndex])
  }

  return (
    <>
      <section id="gallery" className="w-full py-16 md:py-24 px-4 md:px-8" style={{ background: '#e6ddc5' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <h2 
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mb-4"
              style={{ color: '#75785b' }}
            >
              Our Gallery
            </h2>
            <p className="font-sans text-base md:text-lg max-w-2xl mx-auto" style={{ color: '#75785b', opacity: 0.8 }}>
              Explore our beautiful handcrafted creations through our visual gallery
            </p>
          </div>

          {/* Masonry-style Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                style={{ 
                  background: 'rgba(232, 189, 125, 0.2)',
                  aspectRatio: index % 3 === 0 ? '4/3' : index % 3 === 1 ? '3/4' : '1/1'
                }}
                onClick={() => openLightbox(item)}
              >
                {/* Product SVG/Image */}
                <div className="w-full h-full p-6 md:p-8 flex items-center justify-center">
                  <div className="w-full h-full transform group-hover:scale-110 transition-transform duration-500">
                    {item.svg}
                  </div>
                </div>
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center px-4">
                      <h3 className="font-serif text-xl md:text-2xl font-semibold mb-2 text-white">
                        {item.title}
                      </h3>
                      <p className="font-sans text-sm text-white opacity-90">
                        Click to view
                      </p>
                    </div>
                  </div>
                </div>

                {/* Corner Badge */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div 
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ 
                      background: 'rgba(117, 120, 91, 0.9)',
                      color: '#e6ddc5'
                    }}
                  >
                    View
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Section */}
          <div className="mt-16 md:mt-24">
            <div className="text-center mb-8">
              <h3 
                className="font-serif text-2xl md:text-3xl font-light mb-4"
                style={{ color: '#75785b' }}
              >
                Featured Creations
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {galleryItems.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="relative overflow-hidden rounded-3xl group cursor-pointer"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.5)',
                    border: '2px solid rgba(117, 120, 91, 0.2)'
                  }}
                  onClick={() => openLightbox(item)}
                >
                  <div className="p-8 md:p-12">
                    <div className="mb-6">
                      {item.svg}
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl font-semibold mb-3" style={{ color: '#75785b' }}>
                      {item.title}
                    </h3>
                    <p className="font-sans text-base mb-4" style={{ color: '#75785b', opacity: 0.8 }}>
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm" style={{ color: '#75785b', opacity: 0.7 }}>
                      <span>Click to view details</span>
                      <FontAwesomeIcon icon={faChevronRight} className="transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0, 0, 0, 0.9)' }}
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] overflow-auto rounded-2xl"
            style={{ background: '#e6ddc5' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-3 rounded-full transition-all hover:scale-110"
              style={{ 
                background: 'rgba(117, 120, 91, 0.9)',
                color: '#e6ddc5'
              }}
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faTimes} className="text-xl" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateImage('prev')
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all hover:scale-110"
              style={{ 
                background: 'rgba(117, 120, 91, 0.9)',
                color: '#e6ddc5'
              }}
              aria-label="Previous"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateImage('next')
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all hover:scale-110"
              style={{ 
                background: 'rgba(117, 120, 91, 0.9)',
                color: '#e6ddc5'
              }}
              aria-label="Next"
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-xl" />
            </button>

            {/* Content */}
            <div className="p-8 md:p-12">
              <div className="mb-6 flex justify-center">
                <div className="w-full max-w-md">
                  {selectedImage.svg}
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-serif text-3xl md:text-4xl font-semibold mb-4" style={{ color: '#75785b' }}>
                  {selectedImage.title}
                </h3>
                <p className="font-sans text-lg mb-6 max-w-2xl mx-auto" style={{ color: '#75785b', opacity: 0.8 }}>
                  {selectedImage.description}
                </p>
                <div className="flex items-center justify-center gap-2 text-sm" style={{ color: '#75785b', opacity: 0.7 }}>
                  <span>{galleryItems.findIndex(item => item.id === selectedImage.id) + 1} of {galleryItems.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Gallery
