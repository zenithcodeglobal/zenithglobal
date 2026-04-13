'use client';

import { useState, useEffect } from 'react';

export default function ShippingShowcaseSection() {
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @font-face {
                font-family: 'Gemola';
                src: url('/fonts/GemolaTTF.ttf') format('truetype');
            }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const scrollToWork = () => {
        // Scroll down by one screen height
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <section className="relative w-full h-screen overflow-hidden">
            {/* Full-screen background video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                poster="/our_work_bg_poster.webp"
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="/our_work_bg_video_1080p.mp4" type="video/mp4" />
            </video>

            {/* Dark overlay for better text readability */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/30" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col md:flex md:flex-row md:justify-end p-8 md:p-12 lg:p-16">
                {/* Main heading */}
                <div className="flex-1 flex flex-col justify-end md:justify-center md:items-start mb-12 md:mb-0 md:mr-auto">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-thin text-white leading-tight tracking-tight text-left">
                        <div>
                            <span>We</span>{' '}
                            <span style={{ fontFamily: 'Gemola' }} className='italic'>Ship</span>{' '}
                        </div>
                        {/* <span className='font-thin'>exceptional </span>{' '} */}
                        <span> Products that</span>{' '}
                        <span style={{ fontFamily: 'Gemola' }} className="block mt-2 itlalic lg:text-9xl">Scale</span>
                        <div className="mt-6 w-24 h-1 bg-white/80 md:mr-auto" />
                    </h1>
                </div>

                {/* Bottom right - Scroll button */}
                <div className="flex justify-end items-end md:items-end">
                    <button
                        onClick={scrollToWork}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="group relative overflow-hidden"
                    >
                        {/* White pill container with padding */}
                        <div className="relative bg-white rounded-full px-2 py-2 pr-6 flex items-center gap-3">
                            {/* Animated black background - starts as circle, expands to full width */}
                            <div
                                className={`absolute left-2 top-1/2 -translate-y-1/2 bg-black rounded-full transition-all duration-500 ease-out ${isHovered ? 'w-[calc(100%-16px)]' : 'w-12'
                                    }`}
                                style={{ height: '48px' }}
                            />

                            {/* Arrow icon */}
                            <div className="relative z-10 flex items-center justify-center w-12 h-12">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 text-white transition-all duration-500"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                                    />
                                </svg>
                            </div>

                            {/* Text */}
                            <span
                                className={`relative z-10 text-sm font-semibold tracking-wide transition-colors duration-500 ${isHovered ? 'text-white' : 'text-black'
                                    }`}
                            >
                                SEE WORK
                            </span>
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
}