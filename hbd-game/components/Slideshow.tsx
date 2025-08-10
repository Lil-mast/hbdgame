import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { SLIDESHOW_IMAGES } from '../src/assets'; // Fixed import path

interface SlideshowProps {
    onRestart: () => void;
}

// Component for romantic decorations
const RomanticDecoration: React.FC<{ style: React.CSSProperties; children: React.ReactNode }> = ({ style, children }) => (
    <div className="absolute text-3xl pointer-events-none" style={style}>{children}</div>
);

// Main Slideshow component
const Slideshow: React.FC<SlideshowProps> = ({ onRestart }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Callback to go to the next image
    const goToNext = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDESHOW_IMAGES.length);
    }, []);

    // Callback to go to the previous image
    const goToPrevious = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + SLIDESHOW_IMAGES.length) % SLIDESHOW_IMAGES.length);
    }, []);

    // Effect to automatically change images every 5 seconds
    useEffect(() => {
        const timer = setTimeout(goToNext, 5000); // Change image every 5 seconds
        return () => clearTimeout(timer);
    }, [currentIndex, goToNext]);

    // Memoized decorations for performance
    const decorations = useMemo(() => {
        return Array.from({ length: 20 }).map((_, i) => {
            const duration = Math.random() * 8 + 7; // 7-15 seconds
            const delay = Math.random() * 10;
            const left = `${Math.random() * 100}%`;
            const animationName = `float-${i}`;
            const keyframes = `
                @keyframes ${animationName} {
                    0% { transform: translateY(100vh) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(-100px) rotate(${Math.random() * 720 - 360}deg); opacity: 0; }
                }
            `;
            const icon = Math.random() > 0.5 ? '🌹' : '🍫';
            const size = Math.random() * 20 + 20;

            return (
                <React.Fragment key={i}>
                    <style>{keyframes}</style>
                    <RomanticDecoration
                        style={{
                            left,
                            fontSize: `${size}px`,
                            animation: `${animationName} ${duration}s ${delay}s linear infinite`,
                        }}
                    >
                        {icon}
                    </RomanticDecoration>
                </React.Fragment>
            );
        });
    }, []);

    return (
        <div
            className="absolute inset-0 bg-black flex flex-col items-center justify-center z-50 overflow-hidden animate-fade-in"
            style={{ animationDuration: '1s' }} // Optional: Smooth fade-in animation
        >
            <style>{`@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }`}</style>
            {decorations}

            {/* Slideshow Images */}
            <div className="relative w-full max-w-4xl h-full max-h-[80vh] flex items-center justify-center z-10 p-4">
                {SLIDESHOW_IMAGES.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Memory ${index + 1}`}
                        className={`absolute w-full h-full object-contain transition-opacity duration-1000 ease-in-out ${
                            index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 p-3 rounded-full text-white text-2xl hover:bg-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            >
                &#10094;
            </button>
            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 p-3 rounded-full text-white text-2xl hover:bg-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            >
                &#10095;
            </button>

            {/* Restart Button */}
            <div className="absolute bottom-10 z-20">
                <button
                    onClick={onRestart}
                    className="bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold py-3 px-8 rounded-lg text-xl jiggle transition-transform duration-200 transform hover:scale-105"
                >
                    Play Again
                </button>
            </div>
        </div>
    );
};

export default Slideshow;
