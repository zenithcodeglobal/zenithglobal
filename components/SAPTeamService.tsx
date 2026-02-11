'use client';

import { useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItem {
    title: string;
    content: string;
}

const accordionData: AccordionItem[] = [
    {
        title: 'ARCHITECTURE WITH IMPACT',
        content: "We design scalable, secure system architectures that grow with your business - from MVPs to enterprise platforms."
    },
    {
        title: 'SCALABLE EXPERTISE, ZERO FRICTION',
        content: "Access experienced engineers and automation specialists on demand - without long hiring cycles or operational overhead."
    },
    {
        title: 'BUSINESS-FIRST, NOT CODE-FIRST',
        content: "We start with your business goals, then engineer solutions that deliver measurable outcomes - not just features."
    }
];

export default function SAPTeamService() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section
            id="sap-team-service"
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
                            Product &<br />
                            Platform Engineering
                        </h2>
                    </div>

                    {/* Right: Description & CTA */}
                    <div className="flex flex-col justify-end items-start md:items-end gap-6 text-left md:text-right">
                        <p className="text-base md:text-lg text-black/70 leading-relaxed max-w-md">
                            We design, build, and scale digital products - combining engineering excellence, automation, and cloud-first thinking.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 px-5 py-3 border border-black/80 text-sm font-medium tracking-wide uppercase text-black hover:bg-black hover:text-white transition-all duration-300 w-fit"
                        >
                            START YOUR PROJECT
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
                                <div className="px-4 pb-6 pt-2 pl-10">
                                    <p className="text-base text-black/70 leading-relaxed max-w-2xl">
                                        {item.content.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                                            if (part.startsWith('**') && part.endsWith('**')) {
                                                return (
                                                    <strong key={i} className="font-semibold text-black">
                                                        {part.slice(2, -2)}
                                                    </strong>
                                                );
                                            }
                                            return part;
                                        })}
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
