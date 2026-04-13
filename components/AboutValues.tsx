"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

// --- Content Configuration ---
// (Content remains the same as your specific requirement)
const content = [
    {
        id: "architects",
        headline: "Architects.",
        values: [
            {
                term: "First Principles",
                desc: "We don't copy-paste solutions. We deconstruct your problem to its core logic and build the most efficient path forward.",
            },
            {
                term: "AI-Native",
                desc: "Automation isn't an afterthought. We design systems where human creativity and AI efficiency work in tandem.",
            },
            {
                term: "Scalability",
                desc: "We write code for the user you have today, but architect the infrastructure for the million users you'll have tomorrow.",
            },
            {
                term: "Security",
                desc: "Trust is hard to gain and easy to lose. We implement fortress-level security protocols from the first line of code.",
            },
        ],
    },
    {
        id: "artisans",
        headline: "Artisans.",
        values: [
            {
                term: "Pixel Obsession",
                desc: "We sweat the details others ignore. A 10ms delay or a 1px misalignment is a bug to us.",
            },
            {
                term: "Fluidity",
                desc: "Static is boring. We create interfaces that breathe, react, and guide the user with natural, physics-based motion.",
            },
            {
                term: "Simplicity",
                desc: "Complexity is easy; simplicity is hard. We refine our designs until there is nothing left to remove.",
            },
            {
                term: "The 1%",
                desc: "We don't aim for industry standards. We aim for the top 1% of design quality and performance.",
            },
        ],
    },
    {
        id: "allies",
        headline: "Allies.",
        values: [
            {
                term: "Radical Candor",
                desc: "We are not 'yes men'. If a feature doesn't serve your business goals, we will tell you, and we will propose a better way.",
            },
            {
                term: "Ownership",
                desc: "We treat your budget and timeline as if they were our own. No bloat, no unnecessary billable hours.",
            },
            {
                term: "Long Game",
                desc: "Launch day is just the starting line. We stay to monitor, optimize, and evolve your product as the market changes.",
            },
            {
                term: "Transparency",
                desc: "No black boxes. You have full visibility into our code, our roadmap, and our challenges.",
            },
        ],
    },
];

export default function AboutValues() {
    const [activeSection, setActiveSection] = useState("architects");

    return (
        <div className="w-full bg-black text-white relative py-12 md:py-24">
            <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-0 lg:gap-24">

                {/* --- LEFT SIDE (Sticky) --- */}
                <div className="hidden lg:block lg:w-1/3 pt-12">
                    <div className="sticky top-32 flex flex-col justify-center min-h-[20vh]">
                        <h2 className="font-sans text-white/95 font-extralight leading-[1.1] tracking-tight text-[clamp(3rem,5vw,5rem)]">
                            We are <br />

                            {/* Animated Headlines */}
                            <div className="flex flex-col relative transition-all duration-500">
                                {content.map((section) => (
                                    <span
                                        key={section.id}
                                        className={`transition-opacity duration-500 ease-in-out cursor-pointer ${activeSection === section.id
                                                ? "text-white opacity-100 font-normal" // Active State
                                                : "text-white/20 opacity-40 font-extralight hover:opacity-60" // Inactive State
                                            }`}
                                        onClick={() => {
                                            document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                    >
                                        {section.headline}
                                    </span>
                                ))}
                            </div>
                        </h2>
                    </div>
                </div>

                {/* --- RIGHT SIDE (Scrolling List) --- */}
                <div className="w-full lg:w-2/3 pb-0 lg:pb-12">
                    {/* Mobile Only Header */}
                    <div className="lg:hidden mb-10">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-3 font-[family-name:var(--font-manrope)]">What drives us</p>
                        <h2 className="font-[family-name:var(--font-outfit)] text-white font-light leading-[1.1] tracking-tight text-5xl">
                            Our Core <br /> <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-300">Values.</span>
                        </h2>
                    </div>
                    {content.map((section, index) => (
                        <ValueSection
                            key={section.id}
                            id={section.id}
                            data={section}
                            sectionIndex={index}
                            setActiveSection={setActiveSection}
                            isLast={index === content.length - 1}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
}

// --- Sub-Component for each Section ---
const ValueSection = ({
    id,
    data,
    sectionIndex,
    setActiveSection,
    isLast,
}: {
    id: string;
    data: typeof content[0];
    sectionIndex: number;
    setActiveSection: (id: string) => void;
    isLast: boolean;
}) => {
    const ref = useRef(null);

    const isInView = useInView(ref, {
        margin: "-50% 0px -50% 0px",
        amount: "some"
    });

    useEffect(() => {
        if (isInView) {
            setActiveSection(id);
        }
    }, [isInView, id, setActiveSection]);

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div
            ref={ref}
            id={id}
            className={`flex flex-col ${isLast ? "mb-0" : "mb-10 lg:mb-24"} pt-0 lg:pt-4`}
        >
            {/* Mobile-only visible headline — redesigned as prominent section divider */}
            <div className="lg:hidden flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
                <span className="text-[10px] font-mono text-white/20 tracking-wider">0{sectionIndex + 1}</span>
                <h3 className="text-3xl font-[family-name:var(--font-outfit)] font-light text-white">
                    {data.headline}
                </h3>
            </div>

            {data.values.map((item, index) => (
                <div
                    key={index}
                    className="group border-t border-white/10 py-5 md:py-10 transition-all duration-500 hover:border-white/40"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <div className="flex flex-col md:flex-row gap-2 md:gap-12 md:items-start">
                        {/* Mobile: term with subtle number indicator */}
                        <div className="flex items-baseline gap-3 md:gap-0 min-w-[200px]">
                            <span className="text-[10px] font-mono text-white/15 md:hidden">{String(index + 1).padStart(2, '0')}</span>
                            <h3
                                className={`text-base md:text-2xl font-medium md:font-light transition-colors duration-300 ${hoveredIndex === index ? "text-white" : "text-white/80 md:text-white/60"
                                    }`}
                            >
                                {item.term}
                            </h3>
                        </div>

                        <p className="text-sm md:text-lg text-white/40 max-w-lg leading-relaxed font-light transition-colors duration-300 group-hover:text-white/80 pl-7 md:pl-0">
                            {item.desc}
                        </p>
                    </div>
                </div>
            ))}
            <div className="border-t border-white/10" />
        </div>
    );
};