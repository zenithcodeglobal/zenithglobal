'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Check, ChevronDown, Loader2 } from 'lucide-react'

// You might need to install: npm install @emailjs/browser lucide-react

// Custom Dropdown Component
function CustomDropdown({
    options,
    value,
    onChange,
    label,
    name
}: {
    options: string[],
    value: string,
    onChange: (name: string, value: string) => void,
    label: string,
    name: string
}) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative group" ref={dropdownRef}>
            <label className="absolute left-0 -top-2 text-xs text-white/50 z-10">{label}</label>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-transparent border-b py-4 text-white text-lg transition-all cursor-pointer flex justify-between items-center ${isOpen ? 'border-white/80' : 'border-white/20 hover:border-white/40'}`}
            >
                <span className={value ? 'text-white' : 'text-white/40'}>
                    {value || `Select ${label.split(' ')[0]}`}
                </span>
                <ChevronDown className={`w-4 h-4 text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    data-lenis-prevent="true"
                    onWheel={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                    className="absolute top-full left-0 w-full mt-2 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden max-h-64 overflow-y-auto custom-scrollbar"
                >
                    {options.map((option, i) => (
                        <div
                            key={i}
                            onClick={() => {
                                onChange(name, option)
                                setIsOpen(false)
                            }}
                            className={`px-5 py-3 cursor-pointer text-white/80 transition-colors hover:bg-white/10 hover:text-white ${value === option ? 'bg-white/5 text-white' : ''}`}
                        >
                            {option}
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    )
}

export default function Contact() {
    const formRef = useRef<HTMLFormElement>(null)
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.2 })

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        service: '',
        budget: '',
        message: ''
    })

    // Dropdown Options
    const services = [
        "Full-Stack Web Development",
        "App Development",
        "AI Solutions",
        "Chatbots",
        "AI Automation (n8n, Make, Zapier)",
        "Cloud Solutions",
        "CRM Development",
        "API Integrations",
        "UI/UX Design",
        "SEO & Performance Optimization"
    ]

    const budgets = [
        "<1k",
        "1–5k",
        "5–10k",
        "10k+"
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleDropdownChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || !formData.email || !formData.message) {
            setErrorMessage("Please fill in all required fields.")
            return
        }

        setStatus('loading')
        setErrorMessage('')

        try {
            await emailjs.sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                formRef.current!,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            )

            setStatus('success')
            setFormData({ name: '', email: '', company: '', service: '', budget: '', message: '' })
        } catch (error: any) {
            console.error("FAILED...", error)
            if (error.text) console.error("Error text:", error.text)
            setErrorMessage("Something went wrong. Please try again later. (" + (error.text || "Unknown error") + ")")
            setStatus('error')
        }
    }

    return (
        <section
            id="contact"
            ref={containerRef}
            className="relative w-full min-h-screen bg-black text-white px-4 md:px-8 py-20 flex items-center justify-center overflow-hidden"
        >


            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

                {/* LEFT SIDE - Visual Section */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-full h-[400px] sm:h-[500px] lg:h-[800px] rounded-3xl overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-black/20 z-10 transition-colors duration-500 group-hover:bg-transparent" />
                    <motion.img
                        src="/telephone.webp"
                        alt="Vintage Telephone"
                        className="w-full h-full object-cover grayscale brightness-75 contrast-125 group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                        initial={{ scale: 1.1 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                    />

                    {/* Overlay Text */}
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                        <h2 className="text-4xl md:text-5xl font-light font-[family-name:var(--font-outfit)] leading-tight mb-4 tracking-tight">
                            Let&rsquo;s build something <br />
                            <span className="font-semibold text-white">extraordinary together.</span>
                        </h2>
                        <div className="w-12 h-1 bg-white/30 rounded-full" />
                    </div>
                </motion.div>


                {/* RIGHT SIDE - Form Section */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="relative flex flex-col justify-center h-full"
                >

                    {status === 'success' ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center p-12 bg-white/5 border border-white/10 rounded-3xl text-center min-h-[400px]"
                        >
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                                <Check className="w-10 h-10 text-green-400" />
                            </div>
                            <h3 className="text-3xl font-[family-name:var(--font-outfit)] mb-3">Message Sent!</h3>
                            <p className="text-white/60 text-lg">Thanks! We’ve received your message and will get back to you within 24 hours.</p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="mt-8 text-sm text-white/50 hover:text-white underline transition-colors"
                            >
                                Send another message
                            </button>
                        </motion.div>
                    ) : (
                        <>
                            <div className="mb-10">
                                <h3 className="text-2xl font-[family-name:var(--font-outfit)] font-light text-white/80 mb-2">Get in touch</h3>
                                <p className="text-white/50 font-[family-name:var(--font-manrope)]">Fill out the form below and we'll start the conversation.</p>
                            </div>

                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

                                {/* Full Name */}
                                <div className="group relative">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder=" "
                                        className="peer w-full bg-transparent border-b border-white/20 py-4 text-white text-lg focus:outline-none focus:border-white/80 transition-all font-[family-name:var(--font-manrope)]"
                                    />
                                    <label className="absolute left-0 top-4 text-white/40 text-lg transition-all duration-300 pointer-events-none peer-focus:-top-2 peer-focus:text-xs peer-focus:text-white/70 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-white/70">
                                        Full Name
                                    </label>
                                </div>

                                {/* Email */}
                                <div className="group relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder=" "
                                        className="peer w-full bg-transparent border-b border-white/20 py-4 text-white text-lg focus:outline-none focus:border-white/80 transition-all font-[family-name:var(--font-manrope)]"
                                    />
                                    <label className="absolute left-0 top-4 text-white/40 text-lg transition-all duration-300 pointer-events-none peer-focus:-top-2 peer-focus:text-xs peer-focus:text-white/70 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-white/70">
                                        Email Address
                                    </label>
                                </div>

                                {/* Company */}
                                <div className="group relative">
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder=" "
                                        className="peer w-full bg-transparent border-b border-white/20 py-4 text-white text-lg focus:outline-none focus:border-white/80 transition-all font-[family-name:var(--font-manrope)]"
                                    />
                                    <label className="absolute left-0 top-4 text-white/40 text-lg transition-all duration-300 pointer-events-none peer-focus:-top-2 peer-focus:text-xs peer-focus:text-white/70 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-white/70">
                                        Company (Optional)
                                    </label>
                                </div>

                                {/* Hidden inputs for EmailJS since custom dropdowns don't natively submit value unless bound to form */}
                                <input type="hidden" name="service" value={formData.service} />
                                <input type="hidden" name="budget" value={formData.budget} />

                                {/* Service & Budget Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-30">
                                    <CustomDropdown
                                        options={services}
                                        value={formData.service}
                                        onChange={handleDropdownChange}
                                        label="Service Interested In"
                                        name="service"
                                    />
                                    <CustomDropdown
                                        options={budgets}
                                        value={formData.budget}
                                        onChange={handleDropdownChange}
                                        label="Budget (Optional)"
                                        name="budget"
                                    />
                                </div>

                                {/* Message */}
                                <div className="group relative mt-6 border-t border-transparent">
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder=" "
                                        rows={4}
                                        className="peer w-full bg-transparent border-b border-white/20 py-4 text-white text-lg focus:outline-none focus:border-white/80 transition-all resize-none font-[family-name:var(--font-manrope)] mt-8"
                                    />
                                    <label className="absolute left-0 top-12 text-white/40 text-lg transition-all duration-300 pointer-events-none peer-focus:top-4 peer-focus:text-xs peer-focus:text-white/70 peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-white/70">
                                        Tell us about your project
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-6 relative z-10">
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full text-lg font-medium transition-all duration-300 hover:scale-[1.02] hover:bg-gray-200 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed w-full md:w-auto min-w-[200px]"
                                    >
                                        {status === 'loading' ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <div className="w-2 h-2 rounded-full bg-black group-hover:scale-150 transition-transform duration-300" />
                                            </>
                                        )}
                                    </button>
                                </div>

                                {errorMessage && (
                                    <p className="text-red-400 text-sm mt-3">{errorMessage}</p>
                                )}
                            </form>
                        </>
                    )}
                </motion.div>
            </div>
        </section>
    )
}

