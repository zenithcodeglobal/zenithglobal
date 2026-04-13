"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const teamImages = [
    {
        src: "/AboutUs_1.webp",
        alt: "Team collaboration",
        height: "h-[260px] md:h-[340px]" // Medium
    },
    {
        src: "/AboutUs_2.webp",
        alt: "Team working",
        height: "h-[300px] md:h-[400px]" // Tall
    },
    {
        src: "/AboutUs_3.webp",
        alt: "Team meeting",
        height: "h-[240px] md:h-[320px]" // Short
    },
    {
        src: "/AboutUs_4.webp",
        alt: "Team brainstorming session",
        height: "h-[280px] md:h-[380px]" // Medium-Tall
    }
];

export default function AboutHero() {
    // Duplicate images for seamless infinite scroll
    const duplicatedImages = [...teamImages, ...teamImages];

    // Helper function to extract numeric height from Tailwind class
    const getNumericHeight = (heightClass: string): number => {
        const match = heightClass.match(/h-\[(\d+)px\]/);
        return match ? parseInt(match[1]) : 0;
    };

    // Determine if an image should have rounded corners
    const shouldRoundCorners = (index: number): boolean => {
        const actualIndex = index % teamImages.length;
        const currentHeight = getNumericHeight(teamImages[actualIndex].height);

        // Get neighbors (wrap around for circular array)
        const prevIndex = (actualIndex - 1 + teamImages.length) % teamImages.length;
        const nextIndex = (actualIndex + 1) % teamImages.length;

        const prevHeight = getNumericHeight(teamImages[prevIndex].height);
        const nextHeight = getNumericHeight(teamImages[nextIndex].height);

        // Only round if taller than BOTH neighbors
        return currentHeight > prevHeight && currentHeight > nextHeight;
    };

    return (
        <div className="w-full bg-black text-white pt-24 md:pt-32 pb-8 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 mb-4 md:mb-12">

                {/* Heading at Top */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="font-sans text-white/95 font-extralight leading-[1.05] tracking-tight text-[clamp(2.5rem,7vw,6rem)] max-w-5xl"
                >
                    Where exceptional people unite for the love of the craft.
                </motion.h1>

            </div>

            {/* Auto-Scrolling Images - No Gaps */}
            <div className="relative w-full overflow-hidden">
                <motion.div
                    animate={{
                        x: [0, -50 + "%"]
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 25,
                            ease: "linear"
                        }
                    }}
                    className="flex gap-0 items-start md:items-end"
                >
                    {duplicatedImages.map((image, index) => {
                        const hasRoundedCorners = shouldRoundCorners(index);

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.5) }}
                                className={`relative flex-shrink-0 w-[260px] md:w-[380px] lg:w-[550px] ${image.height} ${hasRoundedCorners ? 'rounded-t-2xl' : ''} overflow-hidden bg-gray-900 group`}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    priority={index < 3}
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                    sizes="(max-width: 768px) 260px, (max-width: 1024px) 380px, 550px"
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    quality={85}
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

        </div>
    );
}
