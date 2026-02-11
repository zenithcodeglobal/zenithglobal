'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function AdaptabilitySection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        // Simple fade in up animation for the text
        gsap.from(textRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    }, { scope: containerRef });

    return (
        <section
            id="adaptability-section"
            ref={containerRef}
            data-navbar-theme="light"
            className="relative z-50 w-full py-12 md:py-16 px-4 md:px-8 flex items-center"
            style={{ backgroundColor: '#F4F4EA' }}
        >
            <div
                className="relative w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 p-6 md:p-8 lg:p-10 rounded-md overflow-hidden"
                style={{ backgroundColor: '#FFFFF7' }}
            >
                {/* Left Label */}
                <div className="col-span-1 md:col-span-3">
                    <span className="inline-block text-xs font-mono tracking-widest uppercase text-black/60">
                        ADAPTABILITY
                    </span>
                </div>

                {/* Right Content */}
                <div className="col-span-1 md:col-span-9">
                    <p
                        ref={textRef}
                        className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed tracking-tight text-black"
                    >
                        We are used to <span className="inline-block bg-[#DBD40F] px-1.5 mx-0.5 rounded-sm font-normal">constantly adapting</span> to new environments, cultures, people, and conditions. This flexibility is a major asset - especially in agile projects and fast-changing contexts.
                    </p>
                </div>

                {/* Geometric Pattern - Bottom Right - Laptop/Device Outline */}
                <div className="absolute -bottom-4 -right-4 w-80 h-52 opacity-[0.10] pointer-events-none">
                    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        {/* Laptop screens */}
                        <g stroke="#888888" strokeWidth="1.2">
                            {/* Main laptop */}
                            <path d="M140 60 L140 160 L280 160 L280 60 L140 60" fill="none" />
                            <path d="M145 65 L145 155 L275 155 L275 65 L145 65" fill="none" />
                            {/* Screen dots/buttons */}
                            <circle cx="195" cy="170" r="2" />
                            <circle cx="205" cy="170" r="2" />
                            <circle cx="215" cy="170" r="2" />
                            <circle cx="225" cy="170" r="2" />
                            {/* Second laptop (perspective) */}
                            <path d="M180 70 L180 150 L300 150 L300 70 L180 70" fill="none" />
                            <path d="M185 75 L185 145 L295 145 L295 75 L185 75" fill="none" />
                            {/* Third laptop (more perspective) */}
                            <path d="M220 80 L220 140 L320 140 L320 80 L220 80" fill="none" />
                        </g>
                    </svg>
                </div>
            </div>
        </section>
    );
}
