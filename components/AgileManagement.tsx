'use client';

import { useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItem {
    title: string;
    content: string;
}

const accordionData: AccordionItem[] = [
    {
        title: 'CATALYSTS FOR PROGRESS',
        content: "We remove blockers, streamline workflows, and help teams move from idea to execution faster."
    },
    {
        title: 'ADAPTIVE FRAMEWORKS',
        content: "Our delivery models adapt to your product, team, and growth stage - not the other way around."
    },
    {
        title: 'RADICAL TRANSPARENCY',
        content: "Clear communication, real-time visibility, and shared ownership at every stage of delivery."
    }
];

export default function AgileManagement() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section
            id="agile-management"
            data-navbar-theme="light"
            className="relative z-50 w-full py-16 md:py-24 px-4 md:px-8"
            style={{ backgroundColor: '#F4F4EA' }}
        >
            <div className="w-full max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-16">
                    {/* Left: Title */}
                    <div>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light leading-tight text-black">
                            Delivery &<br />
                            Growth Enablement
                        </h2>
                    </div>

                    {/* Right: Description & CTA */}
                    <div className="flex flex-col justify-end items-start md:items-end gap-6 text-left md:text-right">
                        <p className="text-base md:text-lg text-black/70 leading-relaxed max-w-md">
                            We help teams ship faster, iterate smarter, and scale confidently with modern delivery practices.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 px-5 py-3 border border-black/80 text-sm font-medium tracking-wide uppercase text-black hover:bg-black hover:text-white transition-all duration-300 w-fit"
                        >
                            ACCELERATE DELIVERY
                            <ArrowUpRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Accordion Section */}
                <div className="border-t border-black/10">
                    {accordionData.map((item, index) => (
                        <div
                            key={index}
                            className="border-b border-black/10"
                        >
                            {/* Accordion Header */}
                            <button
                                onClick={() => toggleAccordion(index)}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className={`w-full flex items-center justify-between py-8 px-6 text-left transition-all duration-300 ${hoveredIndex === index
                                    ? 'bg-[#DBD40F]'
                                    : 'bg-transparent'
                                    }`}
                            >
                                <div className="flex items-center gap-6">
                                    <span className={`w-3 h-3 rounded-full transition-colors duration-300 ${hoveredIndex === index ? 'bg-black' : 'bg-[#DBD40F]'
                                        }`} />
                                    <span className="text-lg sm:text-xl md:text-3xl font-light tracking-wide uppercase text-black">
                                        {item.title}
                                    </span>
                                </div>
                                <div className="text-black/60">
                                    {openIndex === index ? (
                                        <ChevronUp className="w-5 h-5" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5" />
                                    )}
                                </div>
                            </button>

                            {/* Accordion Content */}
                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="px-4 pb-6 pt-2 pl-15">
                                    <p className="text-base text-black/70 leading-relaxed max-w-2xl ml-9">
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
