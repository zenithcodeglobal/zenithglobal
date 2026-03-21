"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// --- Configuration: The Gallery Content ---
const galleryImages = [
    // Column 1
    { src: "/AboutUs_Team Collaboration.jpg", label: "Team Collaboration" },
    { src: "/AboutUs_Code Development.jpg", label: "Code Development" },
    { src: "/AboutUs_Creative Workspace.jpg", label: "Creative Workspace" },

    // Column 2
    { src: "/AboutUs_Focused Work.jpg", label: "Focused Work" },
    { src: "/AboutUs_Team Meeting.jpg", label: "Team Meeting" },
    { src: "/AboutUs_Success Celebration.jpg", label: "Success Celebration" },

    // Column 3
    { src: "/AboutUs_Brainstorming.jpg", label: "Brainstorming" },
    { src: "/AboutUs_Tech Discussion.jpg", label: "Tech Discussion" },
    { src: "/AboutUs_Innovation.jpg", label: "Innovation" },
];

export default function AboutGallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Parallax Speeds: 
    // y1 (Col 1) moves slightly up
    // y2 (Col 2) moves up faster (creating depth)
    // y3 (Col 3) moves up slower 
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -75]);

    return (
        <section ref={containerRef} className="w-full bg-black text-white py-16 md:py-24 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 mb-16 md:mb-32">
                <h2 className="font-sans text-white/95 font-extralight leading-[1.05] tracking-tight text-[clamp(2.5rem,5vw,5rem)] max-w-4xl">
                    Where <span className="text-white/40 font-light">logic</span> meets <span className="text-white/40 font-light">creativity</span> <br />
                    for the love of the craft.
                </h2>
            </div>

            {/* The Masonry Grid */}
            <div className="container mx-auto px-6 md:px-12 pt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

                    {/* Column 1 */}
                    <Column images={[galleryImages[0], galleryImages[1], galleryImages[2]]} y={y1} isMobile={isMobile} />

                    {/* Column 2 (Offset start for visual variation) */}
                    <Column images={[galleryImages[3], galleryImages[4], galleryImages[5]]} y={y2} isMobile={isMobile} className="md:-mt-24" />

                    {/* Column 3 */}
                    <Column images={[galleryImages[6], galleryImages[7], galleryImages[8]]} y={y3} isMobile={isMobile} />

                </div>
            </div>
        </section>
    );
}

// Sub-component for a single column
const Column = ({ images, y, isMobile, className = "" }: { images: { src: string, label: string }[], y: MotionValue<number>, isMobile: boolean, className?: string }) => {
    return (
        <motion.div style={{ y: isMobile ? 0 : y }} className={`flex flex-col gap-6 md:gap-8 ${className}`}>
            {images.map((img, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden aspect-[3/4] md:aspect-[4/5]">
                    <Image
                        src={img.src}
                        alt={img.label}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Label */}
                    <div className="absolute bottom-6 left-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="text-white font-medium text-lg">{img.label}</span>
                    </div>
                </div>
            ))}
        </motion.div>
    );
};