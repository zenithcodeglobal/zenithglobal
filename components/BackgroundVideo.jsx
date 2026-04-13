'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function BackgroundVideo() {
  const pathname = usePathname()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const handler = () => setReady(true)
    if (typeof window !== 'undefined' && window.__introDone) setReady(true)
    window.addEventListener('intro:done', handler)
    return () => window.removeEventListener('intro:done', handler)
  }, [])

  // Only show video on homepage
  if (pathname !== '/') {
    return null
  }

  return (
    <motion.video
      src="/landing_bg_video_1.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster="/landing_bg_poster.webp"
      initial={{ opacity: 0 }}
      animate={ready ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-0 h-[100dvh] w-[100dvw] sm:h-screen sm:w-screen object-cover object-center pointer-events-none"
    />
  )
}
