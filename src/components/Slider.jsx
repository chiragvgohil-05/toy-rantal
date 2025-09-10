import React, { useState, useEffect, useRef } from "react";

const Slider = ({ slides = [] }) => {
    // Hooks always run
    const [current, setCurrent] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const slideRef = useRef(null);

    // Clone slides for infinite loop
    const extendedSlides = slides.length > 0 ? [slides[slides.length - 1], ...slides, slides[0]] : [];

    // Auto slide every 5s
    useEffect(() => {
        if (!slides.length) return; // skip if no slides
        const timer = setInterval(() => setCurrent(prev => prev + 1), 5000);
        return () => clearInterval(timer);
    }, [slides]);

    const prevSlide = () => {
        if (!slides.length) return;
        setIsTransitioning(true);
        setCurrent(prev => prev - 1);
    };

    const nextSlide = () => {
        if (!slides.length) return;
        setIsTransitioning(true);
        setCurrent(prev => prev + 1);
    };

    // Reset when reaching clones
    useEffect(() => {
        if (!slides.length) return;
        const handleTransitionEnd = () => {
            if (current === 0) {
                setIsTransitioning(false);
                setCurrent(slides.length);
            }
            if (current === slides.length + 1) {
                setIsTransitioning(false);
                setCurrent(1);
            }
        };

        const slider = slideRef.current;
        slider.addEventListener("transitionend", handleTransitionEnd);
        return () => slider.removeEventListener("transitionend", handleTransitionEnd);
    }, [current, slides]);

    // Render nothing visually if slides empty
    if (!slides.length) return <div className="w-full h-64 bg-gray-200 flex items-center justify-center">No slides available</div>;

    return (
        <div className="relative w-full h-[calc(100vh-7rem)] overflow-hidden">
            {/* Slides */}
            <div
                ref={slideRef}
                className={`flex h-full ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {extendedSlides.map((slide, idx) => (
                    <div key={idx} className="w-full flex-shrink-0 h-full relative">
                        <img
                            src={slide.img}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                        {slide.title || slide.desc || slide.link ? (
                            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-6">
                                {slide.title && <h2 className="text-4xl md:text-6xl font-bold">{slide.title}</h2>}
                                {slide.desc && <p className="mt-4 text-lg md:text-2xl max-w-2xl">{slide.desc}</p>}
                                {slide.link && (
                                    <a
                                        href={slide.link}
                                        className="mt-6 px-8 py-3 bg-pink-600 hover:bg-pink-700 rounded-full font-semibold transition"
                                    >
                                        Shop Now
                                    </a>
                                )}
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>

            {/* Controls */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 -translate-y-1/2 z-20 bg-black/40 text-white p-3 rounded-full hover:bg-black/70"
            >
                ❮
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 -translate-y-1/2 z-20 bg-black/40 text-white p-3 rounded-full hover:bg-black/70"
            >
                ❯
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index + 1)}
                        className={`w-4 h-4 rounded-full ${current === index + 1 ? "bg-pink-600" : "bg-white/70"}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
