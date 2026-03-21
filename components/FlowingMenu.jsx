'use client'

import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import './FlowingMenu.css'

function FlowingMenu({ items = [] }) {
    // Track which item is active on mobile (only one at a time)
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div className="flowing-menu-wrap">
            <nav className="flowing-menu">
                {items.map((item, idx) => (
                    <FlowingMenuItem
                        key={idx}
                        index={idx}
                        {...item}
                        isActive={activeIndex === idx}
                        onActivate={() => setActiveIndex(idx)}
                    />
                ))}
            </nav>
        </div>
    )
}

function FlowingMenuItem({ link, text, image, index, isActive, onActivate }) {
    const itemRef = useRef(null)
    const marqueeRef = useRef(null)
    const marqueeInnerRef = useRef(null)
    const [isMobile, setIsMobile] = useState(false)

    const animationDefaults = { duration: 0.6, ease: 'expo' }

    // Detect mobile screen size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Mobile: expand/collapse based on isActive (controlled by parent)
    useEffect(() => {
        if (!isMobile || !marqueeRef.current || !marqueeInnerRef.current) return

        if (isActive) {
            // Slide in from top
            gsap.timeline({ defaults: animationDefaults })
                .set(marqueeRef.current, { y: '-101%' }, 0)
                .set(marqueeInnerRef.current, { y: '101%' }, 0)
                .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0)
        } else {
            // Slide out to bottom
            gsap.timeline({ defaults: animationDefaults })
                .to(marqueeRef.current, { y: '101%' }, 0)
                .to(marqueeInnerRef.current, { y: '-101%' }, 0)
        }
    }, [isActive, isMobile])

    const findClosestEdge = (mouseX, mouseY, width, height) => {
        const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0)
        const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height)
        return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom'
    }

    const distMetric = (x, y, x2, y2) => {
        const xDiff = x - x2
        const yDiff = y - y2
        return xDiff * xDiff + yDiff * yDiff
    }

    const handleMouseEnter = (ev) => {
        if (isMobile) return  // desktop-only hover behaviour
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return
        const rect = itemRef.current.getBoundingClientRect()
        const x = ev.clientX - rect.left
        const y = ev.clientY - rect.top
        const edge = findClosestEdge(x, y, rect.width, rect.height)

        gsap
            .timeline({ defaults: animationDefaults })
            .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
            .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
            .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0)
    }

    const handleMouseLeave = (ev) => {
        if (isMobile) return  // desktop-only hover behaviour
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return
        const rect = itemRef.current.getBoundingClientRect()
        const x = ev.clientX - rect.left
        const y = ev.clientY - rect.top
        const edge = findClosestEdge(x, y, rect.width, rect.height)

        gsap
            .timeline({ defaults: animationDefaults })
            .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
            .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
    }

    // Mobile tap: activate this item (parent ensures only one is active)
    const handleTouchStart = (ev) => {
        if (!isMobile) return
        ev.preventDefault()
        onActivate()
    }

    const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (
        <React.Fragment key={idx}>
            <span>{text}</span>
            <div className="flowing-marquee__img" style={{ backgroundImage: `url(${image})` }} />
        </React.Fragment>
    ))

    return (
        <div className="flowing-menu__item" ref={itemRef}>
            <div
                className="flowing-menu__item-link"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
            >
                {text}
            </div>
            <div className="flowing-marquee" ref={marqueeRef}>
                <div className="flowing-marquee__inner-wrap" ref={marqueeInnerRef}>
                    <div className="flowing-marquee__inner" aria-hidden="true">
                        {repeatedMarqueeContent}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlowingMenu

