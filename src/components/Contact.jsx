import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send } from 'lucide-react';

const Contact = () => {
    const containerRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(containerRef.current.children,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.2,
                    duration: 1,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="bg-neutral-900 text-white py-24 px-4 md:px-12 border-t border-neutral-800">
            <div className="max-w-3xl mx-auto text-center mb-16">
                <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-brand-red mb-4">
                    Get In Touch
                </h3>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
                    Join The Club
                </h2>
                <p className="text-gray-400 text-lg">
                    Whether you're a fan, a partner, or a future champion—we want to hear from you.
                </p>
            </div>

            <form ref={formRef} className="max-w-2xl mx-auto space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-xs uppercase font-bold tracking-widest text-gray-500 ml-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full bg-black/50 border border-neutral-700 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-brand-gold transition-colors"
                            placeholder="Your Name"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-xs uppercase font-bold tracking-widest text-gray-500 ml-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full bg-black/50 border border-neutral-700 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-brand-gold transition-colors"
                            placeholder="your@email.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-xs uppercase font-bold tracking-widest text-gray-500 ml-1">Message</label>
                    <textarea
                        id="message"
                        rows="4"
                        className="w-full bg-black/50 border border-neutral-700 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-brand-gold transition-colors resize-none"
                        placeholder="How can we help you?"
                    ></textarea>
                </div>

                <button className="w-full md:w-auto px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-brand-gold transition-colors rounded-lg flex items-center justify-center gap-2 group">
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </form>
        </section>
    );
};

export default Contact;
