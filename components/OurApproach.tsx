'use client';
import { useRef, useState, MouseEvent, useEffect } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
    Search, Map, Code2, Cpu, Rocket,
    Layout, BrainCircuit, Server, Zap, ChevronRight
} from 'lucide-react';

// Dynamic import for Spline
const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
    loading: () => null
});

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// === CONTENT DATA ===
const steps = [
    {
        title: "Deep Dive & Discovery",
        tagline: "Understanding the 'Why' before the 'How'",
        description: "Great solutions start with clarity. Whether you need a high-converting website or an intricate AI automation, we start by deconstructing your business goals.",
        icon: <Search className="w-6 h-6" />
    },
    {
        title: "Architecture & Logic Design",
        tagline: "Mapping the ecosystem",
        description: "Before writing a single line of code, we blueprint the architecture. We ensure the foundation is scalable and secure.",
        icon: <Map className="w-6 h-6" />
    },
    {
        title: "Agile Development & Integration",
        tagline: "Where modern tech meets clean code",
        description: "This is where the magic happens. We build using a modular, agile approach. Our team crafts pixel-perfect interfaces that captivate users.",
        icon: <Code2 className="w-6 h-6" />
    },
    {
        title: "Optimization & Refinement",
        tagline: "Polishing for peak performance",
        description: "A solution isn't finished until it's battle-tested. We stress-test AI agents against complex edge cases and refine speed.",
        icon: <Cpu className="w-6 h-6" />
    },
    {
        title: "Launch & Evolution",
        tagline: "Delivering value, ensuring growth",
        description: "Deployment is just the beginning. We handle the technical handover to ensure a smooth launch.",
        icon: <Rocket className="w-6 h-6" />
    },
];

const techArsenal = [
    {
        category: "The Web Core",
        icon: <Layout className="w-8 h-8 text-blue-400" />,
        description: "High-performance frontends that render instantly.",
        tools: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        gradient: "from-blue-600/20 to-cyan-500/20",
    },
    {
        category: "The AI Brain",
        icon: <BrainCircuit className="w-8 h-8 text-purple-400" />,
        description: "Intelligent agents capable of reasoning and memory.",
        tools: ["OpenAI API", "LangChain", "Pinecone", "Python"],
        gradient: "from-purple-600/20 to-pink-500/20",
    },
    {
        category: "The Cloud Foundation",
        icon: <Server className="w-8 h-8 text-emerald-400" />,
        description: "Enterprise-grade security and 99.9% uptime.",
        tools: ["Vercel", "AWS", "Supabase", "PostgreSQL"],
        gradient: "from-emerald-600/20 to-teal-500/20",
    }
];

export default function OurApproach() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const mainOrbContainerRef = useRef<HTMLDivElement>(null);
    const techSectionRef = useRef<HTMLDivElement>(null);
    const [splineLoaded, setSplineLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [shouldLoadSpline, setShouldLoadSpline] = useState(false);

    // Detect mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile || shouldLoadSpline) return;
        const el = mainOrbContainerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoadSpline(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [isMobile, shouldLoadSpline]);

    useGSAP(() => {
        const cards = gsap.utils.toArray('.approach-card');
        const techCards = gsap.utils.toArray('.tech-card');

        // === 1. THE ANCHOR POINT ===
        const ANCHOR_POINT = '50vh';
        const isMobileView = window.innerWidth < 768;

        // Defining scales for clarity
        const HERO_SCALE_DESKTOP = 1.2;
        const TIMELINE_SCALE_DESKTOP = 0.4;
        const HERO_SCALE_MOBILE = 0.6;
        const TIMELINE_SCALE_MOBILE = 0.25;


        // === 2. PHASE 1: HERO -> TIMELINE LOCK ===
        if (mainOrbContainerRef.current && heroRef.current) {
            const orbTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    endTrigger: trackRef.current,
                    end: `top ${ANCHOR_POINT}`,
                    scrub: 1,
                }
            });

            if (isMobileView) {
                // MOBILE ANIMATION
                orbTimeline.to(mainOrbContainerRef.current, {
                    left: '80px',
                    top: `calc(${ANCHOR_POINT} - 100px)`,
                    scale: TIMELINE_SCALE_MOBILE,
                    ease: "power2.inOut",
                });
            } else {
                // DESKTOP ANIMATION
                orbTimeline.to(mainOrbContainerRef.current, {
                    // FIX: This ensures it animates TO the center (50%)
                    left: 'calc(50% - 295px)',
                    top: `calc(${ANCHOR_POINT} - 300px)`,
                    scale: TIMELINE_SCALE_DESKTOP,
                    ease: "power2.inOut",
                });
            }
        }

        // === 3. PHASE 2: TIMELINE END -> EXPLOSION ===
        if (mainOrbContainerRef.current && trackRef.current) {
            gsap.fromTo(mainOrbContainerRef.current,
                {
                    scale: isMobileView ? TIMELINE_SCALE_MOBILE : TIMELINE_SCALE_DESKTOP,
                    opacity: 1,
                    filter: "blur(0px)",
                    y: 0,
                },
                {
                    scrollTrigger: {
                        trigger: trackRef.current,
                        start: "bottom 70%",
                        end: "bottom 10%",
                        scrub: 1,
                    },
                    scale: 4,
                    opacity: 0.4,
                    filter: "blur(10px)",
                    y: 100,
                    ease: "power2.in",
                    immediateRender: false
                }
            );
        }

        // === 4. HERO PARALLAX ===
        const heroEl = heroRef.current;
        if (heroEl) {
            heroEl.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 20;
                const y = (e.clientY / window.innerHeight - 0.5) * 20;
                gsap.to('.hero-blob-1', { x: x * 2, y: y * 2, duration: 2, ease: 'power2.out' });
                gsap.to('.hero-blob-2', { x: -x * 2, y: -y * 2, duration: 2, ease: 'power2.out' });
            });
        }

        // === 5. HERO TEXT ===
        gsap.fromTo('.hero-text-anim',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
        );

        // === 6. CARD ANIMATIONS ===
        cards.forEach((card: any, index) => {
            gsap.fromTo(card,
                { opacity: 0, y: 100, scale: 0.9, filter: "blur(10px)", transformPerspective: 1000, rotationX: 15 },
                {
                    opacity: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: card, start: "top 85%", end: "top 55%", scrub: 1 }
                }
            );

            // Beam Connections
            ScrollTrigger.create({
                trigger: card,
                start: `top ${ANCHOR_POINT}`,
                end: `bottom ${ANCHOR_POINT}`,
                onEnter: () => {
                    gsap.to(`.beam-${index}`, { opacity: 1, width: '100%', duration: 0.2 });
                    gsap.to(`.card-glow-${index}`, { opacity: 1, duration: 0.2 });
                },
                onLeave: () => {
                    gsap.to(`.beam-${index}`, { opacity: 0, width: '0%', duration: 0.2 });
                    gsap.to(`.card-glow-${index}`, { opacity: 0, duration: 0.2 });
                },
                onEnterBack: () => {
                    gsap.to(`.beam-${index}`, { opacity: 1, width: '100%', duration: 0.2 });
                    gsap.to(`.card-glow-${index}`, { opacity: 1, duration: 0.2 });
                },
                onLeaveBack: () => {
                    gsap.to(`.beam-${index}`, { opacity: 0, width: '0%', duration: 0.2 });
                    gsap.to(`.card-glow-${index}`, { opacity: 0, duration: 0.2 });
                }
            });
        });

        // === 7. TECH SECTION ENTRANCE ===
        gsap.fromTo(techCards,
            { y: 50, opacity: 0, scale: 0.9 },
            {
                y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)",
                scrollTrigger: { trigger: techSectionRef.current, start: "top 70%" }
            }
        );

    }, { scope: containerRef });

    // === INTERACTION HANDLERS ===
    const handleCardMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        const rotateX = (y - rect.height / 2) / 20;
        const rotateY = (x - rect.width / 2) / -20;
        gsap.to(card, { rotateX: rotateX, rotateY: rotateY, transformPerspective: 1000, duration: 0.4, ease: "power2.out" });
    };

    const handleCardMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" });
    };

    return (
        <div ref={containerRef} className="relative w-full bg-black text-white overflow-x-hidden">

            {/* === FIXED CANVAS FOR 3D ORB === */}
            {/* === FIXED CANVAS FOR 3D ORB === */}
            <div
                ref={mainOrbContainerRef}
                className="fixed z-40 pointer-events-none hidden md:block"
                style={{
                    width: isMobile ? '200px' : '600px',
                    height: isMobile ? '200px' : '600px',
                    top: isMobile ? 'calc(50vh - 100px)' : 'calc(50vh - 300px)',
                    // FIX: Initial position back to the right side (75%)
                    left: isMobile ? 'calc(50% - 100px)' : 'calc(75% - 300px)',
                    transform: `scale(${isMobile ? 0.6 : 1.2})`
                }}
            >
                <div className="absolute -inset-10 rounded-full bg-emerald-500/10 blur-[60px] animate-pulse" />
                <div className="absolute -inset-4 rounded-full bg-cyan-500/15 blur-[40px] animate-pulse" style={{ animationDelay: '0.5s' }} />

                <div className="relative w-full h-full rounded-full overflow-hidden cursor-grab active:cursor-grabbing pointer-events-auto">
                    {shouldLoadSpline && !isMobile && (
                        <div className="relative w-full h-full" style={{ filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.4))' }}>
                            <div className="w-full h-full scale-125 origin-center">
                                <Spline
                                    scene="https://prod.spline.design/XSwNW8D1nX3OM3Mc/scene.splinecode"
                                    onLoad={() => setSplineLoaded(true)}
                                    className={`w-full h-full transition-opacity duration-1000 ${splineLoaded ? 'opacity-100' : 'opacity-0'}`}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* === 1. HERO SECTION (ZENITH STANDARD) === */}
            <section ref={heroRef} className="relative min-h-[70vh] md:min-h-screen flex items-start md:items-center pt-[18vh] md:pt-20 pb-12 md:pb-20 overflow-hidden z-10">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="hero-blob-1 absolute top-[-5%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-600/10 rounded-full blur-[80px] md:blur-[120px]" />
                    <div className="hero-blob-2 absolute bottom-[-10%] right-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-teal-600/10 rounded-full blur-[100px] md:blur-[120px]" />
                </div>
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">

                        {/* LEFT: Content */}
                        <div className="max-w-2xl mx-auto lg:mx-0 pointer-events-auto flex flex-col items-center text-center lg:items-start lg:text-left">
                            {/* Tagline */}
                            <div className="hero-text-anim inline-flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
                                <div className="h-[1px] w-8 bg-cyan-500/50 hidden lg:block"></div>
                                <span className="text-[10px] md:text-xs text-cyan-400 font-mono tracking-[0.2em] uppercase">Methodology</span>
                                <div className="h-[1px] w-8 bg-cyan-500/50 hidden lg:block"></div>
                            </div>

                            {/* Headline */}
                            <h1 className="hero-text-anim font-sans text-white/95 font-light leading-[1.1] md:leading-[1] tracking-tight text-[clamp(2.5rem,8vw,6.5rem)] mb-6 md:mb-8">
                                The Zenith <br className="hidden lg:block" />
                                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-300">
                                    Standard.
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="hero-text-anim text-white/60 text-[clamp(0.95rem,1.2vw,1.2rem)] mb-10 md:mb-12 leading-relaxed font-light max-w-[90%] md:max-w-lg lg:border-l lg:border-white/10 lg:pl-6">
                                We don't rely on guesswork. We operate on a rigorous, engineering-first framework designed to eliminate technical debt before it begins.
                                <br className="hidden md:block" /><br className="hidden md:block" />
                                <span className="text-white/40 text-[10px] md:text-sm mt-4 md:mt-0 flex flex-col md:inline-block">
                                    <span className="md:hidden opacity-50 mb-1">Guarantees:</span>
                                    Precision. Scalability. Future-Proofing.
                                </span>
                            </p>

                            {/* System Status Ticker */}
                            <div className="hero-text-anim flex flex-col items-center lg:items-start gap-3 md:gap-4">
                                <div className="text-[10px] md:text-xs font-mono text-white/30 uppercase tracking-widest mb-1 md:mb-2">System Parameters</div>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3">
                                    {['0% Bloat', '100% Type-Safe', 'Pixel-Perfect', 'Modular Arch'].map((tag, i) => (
                                        <div key={i} className="px-2.5 md:px-3 py-1.5 rounded border border-white/5 bg-white/5 text-[9px] md:text-xs font-mono text-cyan-200/70">
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Empty Placeholder for Orb */}
                        <div className="relative h-[400px] lg:h-[600px] w-full hidden lg:block pointer-events-none"></div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 mix-blend-screen hidden md:flex">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white font-light">Initiate Sequence</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
                    </div>
                </div>
            </section>

            {/* === 2. TIMELINE SECTION === */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 mb-32 z-10">
                {/* --- BACKGROUND GRID --- */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

                <div ref={trackRef} className="absolute top-0 left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-zinc-900 rounded-full z-0" />
                <div className="relative z-10 flex flex-col gap-20 md:gap-32 pt-32 pb-20">
                    {steps.map((step, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div key={index} className={`approach-card flex flex-col md:flex-row items-start md:items-center w-full relative ${isEven ? 'md:flex-row-reverse' : ''}`}>

                                {/* --- HOLLOW WATERMARK (Desktop Only) --- */}
                                <div className="hidden lg:flex w-1/2 items-center justify-center pointer-events-none select-none">
                                    <div className="text-[15rem] font-bold font-mono tracking-tighter text-transparent opacity-[0.03] transition-opacity duration-500"
                                        style={{ WebkitTextStroke: '2px white' }}>
                                        0{index + 1}
                                    </div>
                                </div>

                                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-24' : 'md:pl-24'}`}>
                                    <div className="relative p-6 md:p-8 rounded-2xl md:rounded-3xl bg-zinc-950/80 backdrop-blur-xl border border-white/10 group overflow-hidden transition-colors hover:bg-zinc-900/90 hover:border-cyan-500/30">
                                        <div className={`absolute top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-cyan-500 to-transparent z-0 hidden md:block ${isEven ? '-right-12 rotate-180 origin-right' : '-left-12 origin-left'}`}>
                                            <div className={`beam-${index} w-0 h-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)] opacity-0`} />
                                        </div>
                                        <div className={`card-glow-${index} absolute inset-0 bg-cyan-900/10 opacity-0 transition-opacity duration-500`} />
                                        <div className="relative z-10">
                                            <div className="flex items-start md:items-center gap-3 md:gap-4 mb-4 md:mb-6">
                                                <div className="flex-shrink-0 p-2.5 md:p-3 rounded-lg md:rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-teal-500 transition-all duration-500 shadow-lg">{step.icon}</div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-extralight text-white/95 mb-1 tracking-tight break-words">{step.title}</h3>
                                                    <p className="text-[10px] md:text-xs font-mono text-cyan-400/80 uppercase tracking-widest font-light">{step.tagline}</p>
                                                </div>
                                            </div>
                                            <p className="text-white/55 text-sm md:text-[clamp(0.9rem,1.2vw,1.05rem)] leading-relaxed border-l-2 border-zinc-800 pl-3 md:pl-4 group-hover:border-cyan-500/50 transition-colors duration-300 font-light">{step.description}</p>
                                            <div className="absolute top-3 md:top-4 right-4 md:right-6 text-4xl md:text-6xl font-black text-white/5 pointer-events-none select-none">0{index + 1}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* === 3. TECHNOLOGY ARSENAL === */}
            <section ref={techSectionRef} className="relative w-full py-32 px-6 bg-transparent overflow-hidden border-t border-white/5 z-50">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-6 uppercase tracking-widest">
                            <Zap className="w-3 h-3" /> Technical Authority
                        </div>
                        <h2 className="font-sans text-white/95 font-extralight leading-[1.1] tracking-tight text-[clamp(2rem,6vw,4rem)] mb-6">
                            Powered by Modern <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500 font-light">Infrastructure</span>
                        </h2>
                        <p className="text-white/60 max-w-2xl mx-auto text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed font-light">
                            We don't rely on legacy code. We build your solutions using the most powerful, scalable, and future-proof stack available.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {techArsenal.map((tech, i) => (
                            <div
                                key={i}
                                onMouseMove={handleCardMouseMove}
                                onMouseLeave={handleCardMouseLeave}
                                className="tech-card group relative p-8 rounded-3xl bg-zinc-900/30 backdrop-blur-sm border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <div
                                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                                    style={{ background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(6,182,212,0.08), transparent 40%)` }}
                                />
                                <div className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />
                                <div className="relative z-10 flex flex-col h-full" style={{ transform: 'translateZ(20px)' }}>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 shadow-lg group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-300">{tech.icon}</div>
                                        <h3 className="text-xl font-light text-white/95 tracking-wide">{tech.category}</h3>
                                    </div>
                                    <p className="text-white/50 text-sm leading-relaxed mb-8 flex-grow group-hover:text-white/70 transition-colors font-light">{tech.description}</p>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {tech.tools.map((tool, tIndex) => (
                                            <span key={tIndex} className="px-3 py-1.5 text-xs font-mono font-light rounded-md bg-black/40 border border-cyan-500/10 text-zinc-400 group-hover:border-cyan-500/30 group-hover:text-white transition-all duration-300">{tool}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}