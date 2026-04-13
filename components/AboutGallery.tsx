"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const galleryImages = [
    { src: "/AboutUs_Team Collaboration.webp", label: "Team Collaboration" },
    { src: "/AboutUs_Code Development.webp", label: "Code Development" },
    { src: "/AboutUs_Creative Workspace.webp", label: "Creative Workspace" },
    { src: "/AboutUs_Focused Work.webp", label: "Focused Work" },
    { src: "/AboutUs_Team Meeting.webp", label: "Team Meeting" },
    { src: "/AboutUs_Success Celebration.webp", label: "Success Celebration" },
    { src: "/AboutUs_Brainstorming.webp", label: "Brainstorming" },
    { src: "/AboutUs_Tech Discussion.webp", label: "Tech Discussion" },
    { src: "/AboutUs_Innovation.webp", label: "Innovation" },
];

const mobileImages = [
    galleryImages[0],
    galleryImages[1],
    galleryImages[3],
    galleryImages[5],
    galleryImages[6],
    galleryImages[8],
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

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -75]);

    return (
        <section ref={containerRef} className="w-full bg-black text-white py-16 md:py-24 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 mb-10 md:mb-32">
                <h2 className="font-[family-name:var(--font-outfit)] text-white/95 font-extralight leading-[1.05] tracking-tight text-[clamp(2rem,5vw,5rem)] max-w-4xl">
                    Where <span className="text-white/40 font-light">logic</span> meets <span className="text-white/40 font-light">creativity</span> <br />
                    for the love of the craft.
                </h2>
            </div>

            <div className="container mx-auto px-6 md:px-12 pt-8">
                {/* Mobile: 2-column compact grid with 6 curated images */}
                {isMobile ? (
                    <div className="grid grid-cols-2 gap-3">
                        {mobileImages.map((img, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                                className="relative rounded-lg overflow-hidden aspect-[3/4]"
                            >
                                <Image
                                    src={img.src}
                                    alt={img.label}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute bottom-3 left-3">
                                    <span className="text-white/80 text-xs font-light">{img.label}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    /* Desktop: original 3-column masonry with parallax */
                    <div className="grid grid-cols-3 gap-8">
                        <Column images={[galleryImages[0], galleryImages[1], galleryImages[2]]} y={y1} />
                        <Column images={[galleryImages[3], galleryImages[4], galleryImages[5]]} y={y2} className="-mt-24" />
                        <Column images={[galleryImages[6], galleryImages[7], galleryImages[8]]} y={y3} />
                    </div>
                )}
            </div>
        </section>
    );
}

const Column = ({ images, y, className = "" }: { images: { src: string, label: string }[], y: MotionValue<number>, className?: string }) => {
    return (
        <motion.div style={{ y }} className={`flex flex-col gap-8 ${className}`}>
            {images.map((img, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden aspect-[4/5]">
                    <Image
                        src={img.src}
                        alt={img.label}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-6 left-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="text-white font-medium text-lg">{img.label}</span>
                    </div>
                </div>
            ))}
        </motion.div>
    );
};
