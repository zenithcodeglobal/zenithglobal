'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Define your navigation links here
const items = [
  { label: 'What We Do', href: '/what-we-do' },
  { label: 'About us', href: '/about-us' },
  { label: 'Our Work', href: '/our-work' },
  { label: 'Our solution', href: '/our-solution' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)
  const [videoMode, setVideoMode] = useState(false) // Logo vs Tagline
  const [isVisible, setIsVisible] = useState(true) // Navbar visibility
  const [lightBg, setLightBg] = useState(false) // Dark text on light sections
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()
  const headerRef = useRef(null)

  // Use GSAP for Scroll ScrollTrigger - trigger when video is fully visible
  useGSAP(() => {
    // If not on home page, always show logo (videoMode = true)
    if (pathname !== '/') {
      setVideoMode(true)
      return
    }

    // On home page, start with tagline (videoMode = false) unless scrolled
    setVideoMode(false)

    const trigger = ScrollTrigger.create({
      // Trigger after the hero animation completes (200vh scroll distance)
      start: () => `top -${window.innerHeight * 1.8}px`, // ~180vh scroll
      onEnter: () => setVideoMode(true),
      onLeaveBack: () => setVideoMode(false),
      // markers: true 
    })

    return () => trigger.kill()
  }, [pathname])


  // Handle Intro Animation timing
  useEffect(() => {
    const handler = () => setReady(true)
    if (typeof window !== 'undefined' && window.__introDone) setReady(true)
    window.addEventListener('intro:done', handler)
    return () => window.removeEventListener('intro:done', handler)
  }, [])

  // Scroll direction detection + light-background detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Always show navbar at the very top
      if (currentScrollY < 10) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide navbar
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)

      // Detect if navbar overlaps a light-background section
      const navbarHeight = headerRef.current?.offsetHeight || 70
      const lightSections = document.querySelectorAll('[data-navbar-theme="light"]')
      let isOverLight = false

      lightSections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        // Check if the navbar (top ~0 to navbarHeight) overlaps this section
        if (rect.top < navbarHeight && rect.bottom > 0) {
          isOverLight = true
        }
      })

      setLightBg(isOverLight)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Disable background scrolling when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.start();
      }
    }
    
    // Cleanup on unmount or when state changes
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.start();
      }
    }
  }, [open]);

  // Dynamic color classes
  const textColor = lightBg ? 'text-black/80' : 'text-white/80'
  const textColorStrong = lightBg ? 'text-black' : 'text-white'
  const navLinkColor = lightBg ? 'text-black/60 hover:text-black' : 'text-white/60 hover:text-white'
  const contactBtnClass = lightBg
    ? 'bg-black/10 hover:bg-black/20 hover:text-black text-black/80 border-black/20'
    : 'bg-white/10 hover:bg-white/20 hover:text-white text-white/80 border-white/10'
  const mobileBtnClass = lightBg
    ? 'bg-black/10 text-black/90 hover:bg-black/20'
    : 'bg-white/10 text-white/90 hover:bg-white/20'

  return (
    <motion.header
      ref={headerRef}
      initial={{ opacity: 0, y: -6 }}
      animate={ready ? {
        opacity: 1,
        y: isVisible ? 0 : -100
      } : {
        opacity: 0,
        y: -6
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[60] bg-transparent"
      style={{ transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)' }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 md:px-10 py-5">

        {/* LOGO / TAGLINE AREA — 3D Flip Card */}
        <div className="relative z-50" style={{ perspective: '600px' }}>
          <div
            className="relative w-[280px] sm:w-[300px] h-8"
            style={{
              transformStyle: 'preserve-3d',
              transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
              transform: videoMode ? 'rotateX(180deg)' : 'rotateX(0deg)',
            }}
          >
            {/* Front Face — Tagline */}
            <div
              className="absolute inset-0 flex items-center"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <span
                className={`font-mono text-[10px] sm:text-xs tracking-widest uppercase whitespace-nowrap transition-colors duration-400 ${textColor}`}
              >
                TURNING COMPLEXITY INTO CLARITY
              </span>
            </div>

            {/* Back Face — Zenith Logo */}
            <div
              className="absolute inset-0 flex items-center"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateX(180deg)',
              }}
            >
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/zenith_logo.png"
                  alt="Zenith"
                  width={28}
                  height={28}
                  className="object-contain"
                />
                <span
                  className={`font-[family-name:var(--font-outfit)] font-bold text-lg tracking-tight transition-colors duration-400 ${textColorStrong}`}
                >
                  ZENITH
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-12">
          {items.map((i) => (
            <Link
              key={i.label}
              href={i.href}
              className={`transition-colors duration-400 text-[13px] font-mono tracking-widest uppercase ${navLinkColor}`}
            >
              {i.label}
            </Link>
          ))}
        </nav>

        {/* ACTIONS & MOBILE TOGGLE */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className={`hidden md:inline-flex items-center gap-2 px-4 py-2 text-[12px] font-mono tracking-widest uppercase transition-all duration-400 backdrop-blur-sm border rounded-sm ${contactBtnClass}`}
          >
            CONTACT <span className="text-xs">↗</span>
          </Link>
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full z-50 backdrop-blur-md transition-colors duration-400 ${mobileBtnClass}`}
          >
            <span className="sr-only">Menu</span>
            {open ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div 
          className="md:hidden fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl overflow-hidden touch-none overscroll-none min-h-screen" 
          onClick={() => setOpen(false)}
          data-lenis-prevent="true"
        >
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-white/90 hover:bg-white/20"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
          <div className="mx-auto mt-24 w-full px-6 flex flex-col gap-8">
            {items.map((i) => (
              <Link
                key={i.label}
                href={i.href}
                className="text-white/90 text-2xl font-light tracking-wide border-b border-white/10 pb-4"
              >
                {i.label}
              </Link>
            ))}
            <Link href="/contact" className="mt-4 inline-flex justify-center rounded-sm bg-white text-black px-6 py-3 font-mono text-sm uppercase tracking-widest">
              Get in touch
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
