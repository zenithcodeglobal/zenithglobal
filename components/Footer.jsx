'use client';

import Link from 'next/link';
import { Linkedin, Youtube, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative w-full h-[50vh] md:h-[65vh] bg-[#050505] text-white overflow-hidden flex flex-col justify-between px-6 py-6 md:px-12 md:py-10">

            {/* Top Section: Email & Socials (Right Aligned) */}
            <div className="flex flex-col items-end w-full">
                <div className="flex items-center gap-6 mb-6">
                    <a
                        href="https://zenithcodestore.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm md:text-base font-[family-name:var(--font-manrope)] tracking-wide hover:text-white/70 transition-colors uppercase flex items-center gap-1.5"
                    >
                        Store
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-50">
                            <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </a>
                    <span className="w-px h-4 bg-white/20" />
                    <a
                        href="mailto:zenithcode.global@gmail.com"
                        className="text-sm md:text-base font-[family-name:var(--font-manrope)] tracking-wide hover:text-white/70 transition-colors uppercase"
                    >
                        zenithcode.global@gmail.com
                    </a>
                </div>

                <div className="flex items-center gap-4">
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-sm transition-colors group">
                        <Linkedin className="w-5 h-5 text-white/70 group-hover:text-white" strokeWidth={1.5} />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-sm transition-colors group">
                        <Youtube className="w-5 h-5 text-white/70 group-hover:text-white" strokeWidth={1.5} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-sm transition-colors group">
                        <Instagram className="w-5 h-5 text-white/70 group-hover:text-white" strokeWidth={1.5} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-sm transition-colors group">
                        <Twitter className="w-5 h-5 text-white/70 group-hover:text-white" strokeWidth={1.5} />
                    </a>
                </div>
            </div>

            {/* Center: Huge Logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none">
                <h1 className="text-[18vw] leading-none font-bold tracking-tighter text-[#EFEFEF]">
                    ZENITH
                </h1>
            </div>

            {/* Bottom Section: Copyright (Left Aligned) */}
            <div className="w-full flex items-end justify-between">
                <p className="text-xs md:text-sm text-white/40 font-[family-name:var(--font-manrope)]">
                    © 2025 ZenithCode. All rights reserved.
                </p>
                {/* Empty Right Side as requested (No Design by...) */}
            </div>
        </footer>
    );
}
