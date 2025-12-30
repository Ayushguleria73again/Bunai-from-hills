import React from "react";
import Snowfall from "react-snowfall";
import bunai from "../images/bunai1.png";

const Hero = () => {
  const handleScrollToCollection = (e) => {
    e.preventDefault();
    const target = document.querySelector("#collection");
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="home"
      className="w-full min-h-screen flex items-center justify-center px-4 md:px-8 pt-20 md:pt-24 crochet-pattern"
    >
      {/* <Snowfall color="White" /> */}
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-6 md:mb-8 opacity-0 animate-fade-in-up">
          <img
            src={bunai}
            alt="Bunai From The Hills"
            className="w-28 h-28 md:w-32 md:h-32 mx-auto animate-float rounded-full object-cover"
          />
        </div>
        <h1
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-4 md:mb-6 opacity-0 animate-fade-in-up delay-200"
          style={{ color: "#75785b" }}
        >
          Artisan Crochet
        </h1>
        <p
          className="font-sans text-lg md:text-xl mb-3 md:mb-4 opacity-0 animate-fade-in-up delay-400"
          style={{ color: "#75785b" }}
        >
        
          Handcrafted Crochet from Himachal Pradesh
        </p>
        <p
          className="font-sans text-base md:text-lg mb-8 md:mb-12 px-4 opacity-0 animate-fade-in-up delay-600"
          style={{ color: "#75785b", opacity: 0.8 }}
        >
          Handmade with love in the Himalayas, delivered across India
        </p>
        <button
          onClick={handleScrollToCollection}
          className="btn-primary font-sans px-8 md:px-10 py-3 md:py-4 rounded-full text-base md:text-lg font-medium tracking-wide opacity-0 animate-fade-in-up delay-800 transition-transform hover:scale-105"
          style={{ background: "#75785b", color: "#e6ddc5" }}
        >
          Explore Collection
        </button>
      </div>
    </section>
  );
};

export default Hero;
