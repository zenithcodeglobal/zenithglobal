'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
            className="md:hidden relative z-[110] inline-flex h-10 w-10 items-center justify-center"
          >
            <span className="sr-only">Menu</span>
            <div className="w-6 h-[14px] relative flex flex-col justify-between">
              <span
                className={`block h-[2px] origin-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? 'bg-white w-full rotate-45 translate-y-[6px]' : `${lightBg ? 'bg-black/80' : 'bg-white/80'} w-full`}`}
              />
              <span
                className={`block h-[2px] origin-right transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? 'bg-white opacity-0 w-0' : `${lightBg ? 'bg-black/80' : 'bg-white/80'} w-3/4`}`}
              />
              <span
                className={`block h-[2px] origin-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? 'bg-white w-full -rotate-45 -translate-y-[6px]' : `${lightBg ? 'bg-black/80' : 'bg-white/80'} w-1/2`}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden fixed inset-0 z-[100] overflow-hidden touch-none overscroll-none"
            data-lenis-prevent="true"
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/[0.97] backdrop-blur-2xl"
              variants={{
                closed: { opacity: 0 },
                open: { opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
              }}
              onClick={() => setOpen(false)}
            />

            {/* Content container */}
            <div className="relative z-10 flex flex-col h-full px-6 pt-24 pb-10">
              {/* Navigation links */}
              <nav className="flex-1 flex flex-col justify-start gap-2">
                {items.map((item, index) => {
                  const isActive = pathname === item.href
                  return (
                    <motion.div
                      key={item.label}
                      variants={{
                        closed: { opacity: 0, x: -40 },
                        open: {
                          opacity: 1,
                          x: 0,
                          transition: {
                            duration: 0.5,
                            delay: 0.1 + index * 0.08,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline gap-4 py-4"
                      >
                        <span className={`font-mono text-xs tracking-widest transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/30 group-hover:text-white/60'}`}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className={`font-[family-name:var(--font-outfit)] text-[clamp(1.75rem,6vw,2.5rem)] font-light tracking-tight leading-tight transition-all duration-300 ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                          {item.label}
                        </span>
                        {isActive && (
                          <motion.span
                            layoutId="mobile-nav-active"
                            className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col gap-3"
                variants={{
                  closed: { opacity: 0, y: 20 },
                  open: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-4 bg-white text-black rounded-sm font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white/90"
                >
                  Get in touch
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="translate-y-[0.5px]">
                    <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <a
                  href="https://zenithcodestore.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-4 border border-white/15 text-white rounded-sm font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:border-white/30 hover:bg-white/5"
                >
                  Visit Store
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-60">
                    <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </motion.div>

              {/* Bottom info */}
              <motion.div
                className="mt-6 flex items-center justify-between"
                variants={{
                  closed: { opacity: 0 },
                  open: {
                    opacity: 1,
                    transition: { duration: 0.4, delay: 0.55, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase">
                  zenithcode.global@gmail.com
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
