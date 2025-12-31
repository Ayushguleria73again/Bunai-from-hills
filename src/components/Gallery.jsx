import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(
          "https://bunai-from-hills-backend.vercel.app/api/gallery"
        );
        if (!response.ok) throw new Error("Failed to fetch gallery");
        const data = await response.json();
        setGalleryItems(data);
      } catch (err) {
        setError("Unable to load gallery");
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
    setTimeout(() => setIsAnimating(true), 10);
  };

  const closeLightbox = () => {
    setIsAnimating(false);
    setTimeout(() => setSelectedImage(null), 200);
  };

  const goToPrevious = () => {
    const index =
      currentImageIndex === 0 ? galleryItems.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(index);
    setSelectedImage(galleryItems[index]);
  };

  const goToNext = () => {
    const index =
      currentImageIndex === galleryItems.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(index);
    setSelectedImage(galleryItems[index]);
  };

  /* ------------------ STATES ------------------ */

  if (loading) {
    return (
      <section
        className="w-full py-28 text-center"
        style={{ background: "#e6ddc5" }}
      >
        <p className="text-2xl tracking-wide" style={{ color: "#75785b" }}>
          Loading gallery…
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className="w-full py-28 text-center"
        style={{ background: "#e6ddc5" }}
      >
        <p className="text-xl text-red-600">{error}</p>
      </section>
    );
  }

  return (
    <section
      id="gallery"
      className="w-full py-20 md:py-28 px-4 md:px-10"
      style={{ background: "#e6ddc5" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="font-serif text-4xl md:text-5xl mb-5"
            style={{ color: "#75785b" }}
          >
            Gallery
          </h2>
          <p
            className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
            style={{ color: "#75785b", opacity: 0.85 }}
          >
            A glimpse into our handcrafted world — warmth, texture, and timeless
            craft.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-7">
          {galleryItems.map((item, index) => (
            <div
              key={item._id || index}
              onClick={() => openLightbox(index)}
              className="group relative aspect-square rounded-3xl overflow-hidden cursor-pointer
                         backdrop-blur-md shadow-md hover:shadow-2xl
                         transition-all duration-500 hover:-translate-y-1"
              style={{
                background: "rgba(232, 189, 125, 0.25)",
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.title || "Gallery item"}
                className="w-full h-full object-cover transition-transform duration-700
                           group-hover:scale-110"
              />

              {/* Soft overlay */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {selectedImage && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4
    transition-opacity duration-300 ease-out
    ${isAnimating ? "opacity-100" : "opacity-0"}
    bg-black/80 backdrop-blur-md`}
          >
            <div
              className={`relative w-full max-w-5xl transform transition-all
      duration-300 ease-out
      ${isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
            >
              {/* Close */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-2 text-white/80 hover:text-white transition"
              >
                ✕
              </button>

              {/* Prev */}
              <button
                onClick={goToPrevious}
                className="absolute left-3 top-1/2 -translate-y-1/2
        p-3 rounded-full bg-white/20 hover:bg-white/30
        text-white transition"
              >
                ‹
              </button>

              {/* Next */}
              <button
                onClick={goToNext}
                className="absolute right-3 top-1/2 -translate-y-1/2
        p-3 rounded-full bg-white/20 hover:bg-white/30
        text-white transition"
              >
                ›
              </button>

              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title || "Gallery image"}
                className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />

              {selectedImage.title && (
                <p className="text-center text-white mt-4 text-lg tracking-wide">
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
