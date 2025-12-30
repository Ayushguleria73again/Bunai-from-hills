import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/gallery`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch gallery');
        }
        
        const data = await response.json();
        setGalleryItems(data);
      } catch (err) {
        setError('Unable to load gallery');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setSelectedImage(galleryItems[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    const previousIndex = currentImageIndex === 0 
      ? galleryItems.length - 1 
      : currentImageIndex - 1;
    setCurrentImageIndex(previousIndex);
    setSelectedImage(galleryItems[previousIndex]);
  };

  const goToNext = () => {
    const nextIndex = currentImageIndex === galleryItems.length - 1 
      ? 0 
      : currentImageIndex + 1;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(galleryItems[nextIndex]);
  };

  // Loading state
  if (loading) {
    return (
      <section className="w-full py-24 text-center" style={{ background: '#e6ddc5' }}>
        <p className="text-2xl" style={{ color: '#75785b' }}>
          Loading gallery...
        </p>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="w-full py-24 text-center" style={{ background: '#e6ddc5' }}>
        <p className="text-xl text-red-600">{error}</p>
      </section>
    );
  }

  return (
    <section
      id="gallery"
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
            Gallery
          </h2>
          <p
            className="max-w-2xl mx-auto text-base md:text-lg"
            style={{ color: '#75785b', opacity: 0.8 }}
          >
            Explore our collection of beautiful handcrafted products
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={item._id || index}
              className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer aspect-square"
              onClick={() => openLightbox(index)}
              style={{ background: 'rgba(232, 189, 125, 0.2)' }}
            >
              <div className="w-full h-full flex items-center justify-center p-2">
                <img
                  src={`${API_BASE_URL}${item.imageUrl}`}
                  alt={item.title || 'Gallery item'}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full w-full">
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition-all"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
              
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition-all"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition-all"
              >
                <FontAwesomeIcon icon={faChevronRight} className="text-xl" />
              </button>
              
              <img
                src={`http://localhost:5001${selectedImage.imageUrl}`}
                alt={selectedImage.title || 'Gallery item'}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              
              {selectedImage.title && (
                <p className="text-white text-center mt-4 text-lg">
                  {selectedImage.title}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;