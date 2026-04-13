'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function EngineerClaritySection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        gsap.from(textRef.current, {
            y: 50,
            opacity: 0,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[85vh] overflow-hidden flex items-center justify-center bg-black"
        >
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    src="/landing_page_2.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster="/landing_page_2_poster.webp"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-black/40" /> {/* Extra overlay layer */}
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl px-6 text-center">
                <h2
                    ref={textRef}
                    className="text-4xl md:text-5xl lg:text-7xl font-light leading-tight tracking-tight text-white"
                >
                    We engineer clarity -<br className="hidden md:block" />
                    driven by strategy,<br className="hidden md:block" />
                    powered by technology.
                </h2>
            </div>
        </section>
    );
}
