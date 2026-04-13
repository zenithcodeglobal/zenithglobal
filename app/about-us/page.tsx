import React from "react";
import AboutHero from "@/components/AboutHero";
import AboutValues from "@/components/AboutValues";
import AboutCulture from "@/components/AboutCulture";
import AboutGallery from "@/components/AboutGallery";
import Navbar from '@/components/Navbar';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Zenith Code",
    description: "We are builders, makers, and strategists crafting the future of web and AI.",
};

export default function AboutPage() {
    return (
        <main className="bg-black min-h-screen">
            <Navbar />

            {/* Hero Section with Image Transitions */}
            <AboutHero />

            {/* 1. The Values Section (Sticky Left, Scrolling Right) */}
            <AboutValues />

            {/* 2. The Culture Section (3 Column Grid) */}
            <AboutCulture />

            {/* 3. The Gallery Section (Visuals) */}
            <AboutGallery />

            {/* Final Call to Action Spacer */}
            <div className="py-16 md:py-24 text-center bg-black text-white px-6">
                <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-4 md:mb-4 font-[family-name:var(--font-manrope)]">Next step</p>
                <p className="text-white/60 text-lg md:text-base mb-6 md:mb-4 font-light">Ready to build something extraordinary?</p>
                <a href="/our-solution" className="inline-flex items-center gap-2 border-b border-white pb-1 text-2xl md:text-xl hover:text-gray-300 transition-colors font-[family-name:var(--font-outfit)]">
                    View Our Solutions
                    <svg className="w-5 h-5 md:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </a>
            </div>

        </main>
    );
}