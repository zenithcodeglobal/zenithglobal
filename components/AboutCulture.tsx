"use client";
import React from "react";
import { motion } from "framer-motion";

const culturePoints = [
    {
        title: "Equipping you for success",
        desc: "Great work starts with great tooling. Whether it's Next.js for the web or Python agents for automation, we use the best-in-class stack.",
    },
    {
        title: "Knowledge as currency",
        desc: "We believe in transparency. We don't hide the magic; we document our process so you understand exactly how your product works.",
    },
    {
        title: "Raising the bar",
        desc: "We are obsessed with details. From the easing curve of an animation to the error handling of an API, quality is non-negotiable.",
    },
];

export default function AboutCulture() {
    return (
        <div className="w-full bg-black text-white py-16 md:py-24 border-t border-white/10">
            <div className="container mx-auto px-6 md:px-12">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-sans text-white/95 font-extralight leading-[1.1] tracking-tight text-[clamp(2rem,5vw,4rem)] mb-12 md:mb-20"
                >
                    A culture of excellence
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {culturePoints.map((point, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <h3 className="text-xl font-light text-white/95 mb-4">{point.title}</h3>
                            <p className="text-white/50 leading-relaxed font-light">
                                {point.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}