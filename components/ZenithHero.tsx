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
    // Stat counter refs (mobile only)
    const yearsRef = useRef<HTMLSpanElement>(null);
    const projectsRef = useRef<HTMLSpanElement>(null);
    const clientsRef = useRef<HTMLSpanElement>(null);
    const statsSectionRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const isMobile = window.innerWidth < 768;

            // Skip parallax/bobbing animations on mobile to avoid layout breakage
            if (!isMobile) {
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
            }

            // Mobile-only: smooth count-up triggered exactly when the intro overlay finishes
            if (isMobile) {
                const runCountUp = () => {
                    const counters = { years: 0, projects: 0, clients: 0 };
                    gsap.to(counters, {
                        years: 8,
                        projects: 120,
                        clients: 40,
                        duration: 2.5,
                        ease: 'power2.out',
                        delay: 0.2,   // slight breath after the overlay exits
                        onUpdate() {
                            if (yearsRef.current) yearsRef.current.textContent = `${Math.round(counters.years)}+`;
                            if (projectsRef.current) projectsRef.current.textContent = `${Math.round(counters.projects)}+`;
                            if (clientsRef.current) clientsRef.current.textContent = `${Math.round(counters.clients)}+`;
                        },
                    });
                };

                // @ts-ignore
                if (window.__introDone) {
                    // Overlay already gone (e.g. fast client-side nav) — run shortly
                    setTimeout(runCountUp, 150);
                } else {
                    // Wait for the overlay to signal completion
                    window.addEventListener('intro:done', runCountUp, { once: true });
                }
            }

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
                    duration: 3,
                    ease: 'power1.inOut',
                }, 'start');

            // Step B: Text Parallax — desktop only (stops ZENITH from sliding over subtitle on mobile)
            if (!isMobile) {
                tl.to(textRef.current, {
                    y: '30vh',
                    duration: 3,
                    ease: 'none',
                }, 'start');
            }

            tl
                // 1. Fade Out First Text
                .to(overlayTextRef.current, {
                    opacity: 0,
                    y: -50,
                    duration: 1,
                    ease: 'power2.in',
                }, '-=0.5')

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
                className="absolute inset-0 w-full h-full z-10 bg-black flex flex-col"
            >
                {/* ── Single unified layout: CSS handles mobile vs desktop differences ── */}

                {/* ZENITH + subtitle wrapper */}
                <div
                    ref={textWrapperRef}
                    className="pt-[12vh] md:mt-[15vh] md:pt-0 w-full flex flex-col items-center px-4 md:px-0"
                >
                    <h1
                        ref={textRef}
                        className="font-[family-name:var(--font-outfit)] font-bold tracking-tight text-[#f0f0f0] leading-none whitespace-nowrap select-none w-full text-center"
                        style={{ fontSize: '23vw' }}
                    >
                        ZENITH
                    </h1>

                    {/* Mobile-only subtitle — sits right below ZENITH */}
                    <div className="mt-5 md:hidden text-left w-full px-2">
                        <p className="text-sm font-light text-white/90 leading-relaxed">
                            We design and build intelligent systems
                            <br />
                            <span className="text-white/60">that scale with your business and drive real outcomes.</span>
                        </p>
                    </div>
                </div>

                {/* Mobile-only mid-section — fills the blank space with premium content */}
                <div ref={statsSectionRef} className="flex-1 md:hidden flex flex-col justify-between px-4 pb-2 pt-6">

                    {/* Thin rule */}
                    <div className="w-full h-px bg-white/10 mb-6" />

                    {/* Stats row — numbers animated by GSAP count-up on mobile */}
                    <div className="grid grid-cols-3 gap-2 mb-6">
                        {/* Years Experience */}
                        <div className="flex flex-col items-center text-center">
                            <span
                                ref={yearsRef}
                                className="font-[family-name:var(--font-outfit)] text-3xl font-bold text-white leading-none tracking-tight"
                            >
                                0+
                            </span>
                            <span className="mt-1 text-[10px] font-mono text-white/40 uppercase tracking-widest leading-tight whitespace-pre-line">
                                {'Years\nExperience'}
                            </span>
                        </div>

                        {/* Projects Delivered */}
                        <div className="flex flex-col items-center text-center">
                            <span
                                ref={projectsRef}
                                className="font-[family-name:var(--font-outfit)] text-3xl font-bold text-white leading-none tracking-tight"
                            >
                                0+
                            </span>
                            <span className="mt-1 text-[10px] font-mono text-white/40 uppercase tracking-widest leading-tight whitespace-pre-line">
                                {'Projects\nDelivered'}
                            </span>
                        </div>

                        {/* Enterprise Clients */}
                        <div className="flex flex-col items-center text-center">
                            <span
                                ref={clientsRef}
                                className="font-[family-name:var(--font-outfit)] text-3xl font-bold text-white leading-none tracking-tight"
                            >
                                0+
                            </span>
                            <span className="mt-1 text-[10px] font-mono text-white/40 uppercase tracking-widest leading-tight whitespace-pre-line">
                                {'Enterprise\nClients'}
                            </span>
                        </div>
                    </div>

                    {/* Thin rule */}
                    <div className="w-full h-px bg-white/10 mb-6" />

                    {/* What we do tagline */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DBD40F] flex-shrink-0" />
                        <p className="text-xs font-light text-white/50 tracking-wide uppercase text-center">
                            WEB · AI · Cloud · Digital Transformation
                        </p>
                    </div>

                </div>

                {/* Bottom content bar */}
                <div
                    ref={bottomContentRef}
                    className="w-full px-5 pb-8 md:absolute md:bottom-12 md:px-12 flex flex-row justify-between items-end z-20"
                >
                    {/* Desktop-only description */}
                    <div className="max-w-md hidden md:block">
                        <p className="text-sm md:text-base font-light text-white/90 leading-relaxed">
                            We design and build intelligent systems <br />
                            <span className="text-white/60">that scale with your business and drive real outcomes.</span>
                        </p>
                    </div>

                    {/* Scroll button — left on mobile, centered on desktop */}
                    <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:bottom-2">
                        <button
                            onClick={() => {
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

                    {/* Values list */}
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
