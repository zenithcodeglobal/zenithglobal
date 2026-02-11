'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ZenithHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const bottomContentRef = useRef<HTMLDivElement>(null);
    const overlayTextRef = useRef<HTMLDivElement>(null);
    const whyZenithRef = useRef<HTMLDivElement>(null);
    const heroContentRef = useRef<HTMLDivElement>(null);
    const textWrapperRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // 1. Initial State
            // Video is already full screen Z-0.
            // HeroContent is Z-10 covering it.

            // Creates a natural bobbing sensation as user scrolls (independent of pinned timeline)
            gsap.to(textWrapperRef.current, {
                y: '-50px',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'top top',
                    scrub: 1,
                },
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=400%',
                    pin: true,
                    scrub: 1,
                },
            });

            // 2. Animation Sequence
            tl
                // Step A: Lift the Black Hero Sheet UP to reveal Video
                .to(heroContentRef.current, {
                    y: '-100vh',
                    duration: 3, // Takes significant scroll to lift
                    ease: 'power1.inOut',
                }, 'start')

                // Step B: Text Parallax (Inner text moves slowly relative to wrapper)
                .to(textRef.current, {
                    y: '30vh', // Move DOWN 30vh relative to wrapper (which moves UP 100vh).
                    // Net movement = UP 70vh. Text stays on screen longer/slower.
                    duration: 3,
                    ease: 'none',
                }, 'start')

                // Step C: Sequence the Video Overlays
                // Wait until shutter is mostly up before swapping text

                // 1. Fade Out First Text
                .to(overlayTextRef.current, {
                    opacity: 0,
                    y: -50,
                    duration: 1,
                    ease: 'power2.in',
                }, '-=0.5') // Start fading out just as shutter finishes, or slightly before

                // 2. Reveal Why Zenith
                .to(whyZenithRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out',
                }, '-=0.2');

        },
        { scope: containerRef }
    );

    return (
        <div
            ref={containerRef}
            className="relative h-screen w-full bg-black text-white overflow-hidden flex flex-col items-center"
        >

            {/* Background Video Layer - Z-0 Base Layer */}
            <div
                ref={videoContainerRef}
                className="absolute inset-0 w-full h-full z-0 overflow-hidden flex items-center justify-center bg-black"
            // Height controlled by GSAP if needed, or fixed full if shutter moves
            >
                {/* Video stays full size relative to screen */}
                <div className="relative w-full h-screen">
                    <video
                        ref={videoRef}
                        src="/landing_bg_video_1.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />

                    {/* Centered Overlay Text 1 - Innovation - Visible initially (revealed by curtain) */}
                    <div
                        ref={overlayTextRef}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
                    >
                        <h2 className="text-3xl md:text-5xl font-light leading-tight max-w-4xl text-white">
                            Zenith turns complexity into <span className="text-white/60">clarity</span>, <span className="text-white/60">speed</span>, and <span className="text-white/60">innovation</span>.
                        </h2>
                        <p className="mt-6 text-lg md:text-xl text-white/80 font-light max-w-2xl">
                            We transform ideas into scalable digital products with precision and agility.
                        </p>
                    </div>

                    {/* Centered Overlay Text 2 - Why Zenith */}
                    <div
                        ref={whyZenithRef}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 opacity-0 translate-y-10"
                    >
                        <div className="mb-8">
                            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-mono tracking-widest uppercase rounded-sm text-white/90">
                                WHY ZENITH?
                            </span>
                        </div>
                        <p className="text-2xl md:text-4xl lg:text-5xl font-light leading-tight max-w-4xl text-white">
                            Because we think like <span className="text-white/60">innovators</span> independent, fast, efficient, and always focused on the goal.
                            <br className="hidden md:block" />
                            We work flexibly, think in networks, and deliver real results <span className="italic font-serif">anytime, anywhere.</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Hero Content Shutter - Z-10 - Lifts up to reveal video */}
            <div
                ref={heroContentRef}
                className="absolute inset-0 w-full h-full z-10 bg-black flex flex-col items-center"
            >
                {/* Main Massive Text - Centered on Mobile, Top Aligned on Desktop */}
                <div ref={textWrapperRef} className="relative z-10 mt-[15vh] w-full flex flex-col items-center px-6 md:px-0">
                    <h1
                        ref={textRef}
                        className="font-[family-name:var(--font-outfit)] font-bold tracking-tight text-[#f0f0f0] leading-none whitespace-nowrap select-none"
                        style={{ fontSize: '23vw' }}
                    >
                        ZENITH
                    </h1>
                    {/* Mobile Description - Below ZENITH, left-aligned */}
                    <div className="mt-6 max-w-md md:hidden text-left w-full">
                        <p className="text-sm font-light text-white/90 leading-relaxed">
                            We design and build intelligent systems <br />
                            <span className="text-white/60">that scale with your business and drive real outcomes.</span>
                        </p>
                    </div>
                </div>

                {/* Bottom Content Area */}
                <div
                    ref={bottomContentRef}
                    className="absolute bottom-8 md:bottom-12 w-full px-6 md:px-12 flex flex-row justify-between items-end z-20">

                    {/* Left: Intro Description */}
                    <div className="max-w-md hidden md:block">
                        <p className="text-sm md:text-base font-light text-white/90 leading-relaxed">
                            We design and build intelligent systems <br />
                            <span className="text-white/60">that scale with your business and drive real outcomes.</span>
                        </p>
                    </div>

                    {/* Center/Left: Scroll Button */}
                    <div className="flex items-end md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:bottom-2">
                        <button
                            onClick={() => {
                                // Scroll down to trigger the lift animation
                                const targetScroll = window.innerHeight * 2.5;

                                // @ts-ignore
                                if (window.__lenis) {
                                    // @ts-ignore
                                    window.__lenis.scrollTo(targetScroll, { duration: 2, easing: (t) => 1 - Math.pow(1 - t, 3) });
                                } else {
                                    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                                }
                            }}
                            className="group flex items-center justify-center w-10 h-10 bg-[#DBD40F] hover:bg-[#c2bc0d] text-black transition-all duration-300 cursor-pointer"
                        >
                            <ArrowDown className="w-4 h-4 animate-bounce" strokeWidth={2} />
                        </button>
                    </div>

                    {/* Right: Values List */}
                    <div className="flex flex-col items-end text-right gap-1 md:gap-2">
                        {['Digital Precision /01', 'AI-Driven Innovation /02', 'Engineering Excellence /03'].map((item, i) => (
                            <div key={i} className="text-xs md:text-sm font-mono text-white/80 uppercase tracking-widest">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
