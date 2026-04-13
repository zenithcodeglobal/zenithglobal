'use client';

import Navbar from "@/components/Navbar";
import ShippingShowcaseSection from "@/components/OurWork/ShippingShowcaseSection";
import ProjectShowcaseSection, { ImageAspectRatio, Project } from "@/components/OurWork/ProjectShowcaseSection";
import Footer from "@/components/Footer";

// Example projects - replace with your actual data
const exampleProjects: Project[] = [
    {
        name: "E-Commerce",
        subtitle: "(01) CRM Solutions",
        description: "A modern, scalable e-commerce solution built with cutting-edge technologies. Features include real-time inventory management, seamless checkout experience, and advanced analytics dashboard for business insights.",
        images: [
            "/our_work_ecommerce_1.webp",
            "/our_work_ecommerce_2.webp",
            "/our_work_ecommerce_3.webp",
            "/our_work_ecommerce_4.webp",
        ],
        aspectRatio: ImageAspectRatio.DESKTOP
    },
    {
        name: "SaaS & Web Platforms",
        subtitle: "(02) Web Applications",
        description: "Scalable cloud-based SaaS platforms and high-performance web applications tailored to optimize business operations and user engagement. Built for speed, security, and growth.",
        images: [
            "/our_work_saas_1.webp",
            "/our_work_saas_2.webp",
            "/our_work_saas_3.webp",
        ],
        aspectRatio: ImageAspectRatio.DESKTOP
    },
    {
        name: "AI-Powered Solutions",
        subtitle: "(03) Artificial Intelligence",
        description: "Intelligent automation and data-driven solutions that transform business processes. From predictive analytics to custom LLM integrations, we build systems that learn and adapt.",
        images: [
            "/our_work_ai_1.webp",
            "/our_work_ai_2.webp",
        ],
        aspectRatio: ImageAspectRatio.DESKTOP
    }
];

export default function OurWorkPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            <Navbar />
            <ShippingShowcaseSection />

            {/* Project Showcases */}
            {exampleProjects.map((project, index) => (
                <ProjectShowcaseSection key={index} project={project} />
            ))}

            <Footer />
        </main>
    );
}