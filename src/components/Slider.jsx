import React, { useState, useEffect } from "react";

const Slider = ({ slides = [], interval = 4000 }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying || slides.length === 0) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, interval);

        return () => clearInterval(timer);
    }, [isAutoPlaying, slides.length, interval]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);

    if (slides.length === 0) {
        return <div className="w-full h-screen flex items-center justify-center bg-black text-white">No slides available.</div>;
    }

    return (
        <div
            className="relative w-full h-screen overflow-hidden bg-black"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative w-full h-full">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id || index}
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                            index === currentSlide ? "opacity-100 z-20" : "opacity-0 z-10"
                        }`}
                        style={{ backgroundImage: `url(${slide.image})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-black/70 flex items-center justify-center z-30">
                            <div className="text-center text-white max-w-3xl px-5 animate-fadeInUp">
                                <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg mb-4">
                                    {slide.title}
                                </h1>
                                <p className="text-lg md:text-2xl font-light opacity-90 drop-shadow-md mb-6">
                                    {slide.subtitle}
                                </p>
                                {slide.buttonText && (
                                    <a
                                        href={slide.buttonLink}
                                        className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-full uppercase tracking-wider shadow-lg border-2 border-transparent transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-orange-500 hover:to-pink-500 hover:border-white/30"
                                    >
                                        {slide.buttonText}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            {slides.length > 1 && (
                <>
                    <button
                        className="absolute top-1/2 left-6 -translate-y-1/2 bg-white/20 hover:bg-white/30 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white transition-all duration-300 backdrop-blur-md border border-white/30 shadow-lg hover:scale-110 z-40"
                        onClick={prevSlide}
                    >
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18L9 12L15 6" />
                        </svg>
                    </button>

                    <button
                        className="absolute top-1/2 right-6 -translate-y-1/2 bg-white/20 hover:bg-white/30 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white transition-all duration-300 backdrop-blur-md border border-white/30 shadow-lg hover:scale-110 z-40"
                        onClick={nextSlide}
                    >
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18L15 12L9 6" />
                        </svg>
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-40">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                                    index === currentSlide
                                        ? "bg-white scale-125 shadow-[0_0_0_3px_rgba(255,255,255,0.3)]"
                                        : "border-white/60 bg-transparent hover:bg-white/80 hover:scale-110"
                                }`}
                            />
                        ))}
                    </div>

                    {/* Play/Pause Button */}
                    <button
                        className="absolute top-6 right-6 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white border border-white/30 transition-all duration-300 hover:scale-110 backdrop-blur-md z-40"
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    >
                        {isAutoPlaying ? (
                            <svg width="20" height="20" fill="currentColor">
                                <rect x="6" y="4" width="4" height="16" />
                                <rect x="14" y="4" width="4" height="16" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" fill="currentColor">
                                <polygon points="5,3 19,12 5,21" />
                            </svg>
                        )}
                    </button>
                </>
            )}
        </div>
    );
};

export default Slider;
