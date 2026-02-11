'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function DigitalCompetence() {
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
            id="digital-competence"
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
                        DIGITAL COMPETENCE
                    </span>
                </div>

                {/* Right Content */}
                <div className="col-span-1 md:col-span-9">
                    <p
                        ref={textRef}
                        className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed tracking-tight text-black"
                    >
                        At Zenith, we build teams that are <span className="inline-block bg-[#DBD40F] px-1.5 mx-0.5 rounded-sm font-normal">engineering-first</span>,
                        deeply analytical, and fluent in modern technologies - enabling businesses to move faster, scale smarter, and turn complex challenges into reliable digital systems.
                    </p>
                </div>

                {/* Geometric Pattern - Bottom Right */}
                <div className="absolute -bottom-8 -right-8 w-72 h-48 opacity-[0.10] pointer-events-none">
                    <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        {/* Perspective grid rectangles */}
                        <g stroke="#888888" strokeWidth="1.2">
                            {/* Row 1 */}
                            <rect x="180" y="20" width="40" height="25" transform="skewX(-15)" />
                            <rect x="225" y="18" width="35" height="22" transform="skewX(-15)" />
                            <rect x="265" y="16" width="30" height="20" transform="skewX(-15)" />

                            {/* Row 2 */}
                            <rect x="150" y="55" width="50" height="30" transform="skewX(-15)" />
                            <rect x="205" y="52" width="40" height="28" transform="skewX(-15)" />
                            <rect x="250" y="50" width="35" height="25" transform="skewX(-15)" />

                            {/* Row 3 */}
                            <rect x="120" y="95" width="55" height="32" transform="skewX(-15)" />
                            <rect x="180" y="92" width="45" height="30" transform="skewX(-15)" />
                            <rect x="230" y="90" width="40" height="28" transform="skewX(-15)" />
                            <rect x="275" y="88" width="30" height="24" transform="skewX(-15)" />

                            {/* Row 4 */}
                            <rect x="90" y="138" width="60" height="35" transform="skewX(-15)" />
                            <rect x="155" y="135" width="50" height="32" transform="skewX(-15)" />
                            <rect x="210" y="132" width="45" height="30" transform="skewX(-15)" />
                            <rect x="260" y="130" width="35" height="26" transform="skewX(-15)" />

                            {/* Row 5 */}
                            <rect x="60" y="180" width="65" height="38" transform="skewX(-15)" />
                            <rect x="130" y="177" width="55" height="35" transform="skewX(-15)" />
                            <rect x="190" y="174" width="48" height="32" transform="skewX(-15)" />
                            <rect x="243" y="172" width="40" height="28" transform="skewX(-15)" />
                        </g>
                    </svg>
                </div>
            </div>
        </section>
    );
}
