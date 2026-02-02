import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PlaceholderImage from './PlaceholderImage';
import { ExternalLink } from 'lucide-react'; // Using lucide-react as requested
import Goal from './Goal';

const Partner = () => {
    const containerRef = useRef(null);

    useEffect(() => {
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
    }, []);

    return (
        <section className="bg-white text-black py-24 px-4 md:px-12 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 left-0 w-64 h-64 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

            <div ref={containerRef} className="max-w-4xl mx-auto text-center relative z-10">
                <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-gray-500 mb-6">
                    Official Partner
                </h3>

                <h2 className="text-5xl md:text-7xl font-bold mb-12 tracking-tighter">
                    POWERED BY <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-600">
                        EXCELLENCE
                    </span>
                </h2>

                <div className="w-64 h-64 mx-auto mb-12 shadow-2xl rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-500 rounded-xl">
                    <PlaceholderImage label="Sponsor Logo" className="bg-gray-50 !border-gray-200" />
                </div>

                <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Proudly supporting the next generation of champions. Together, we redefine what's possible on and off the pitch.
                </p>

                <a
                    href="https://easymarkets.com"
                    target="_blank"
                    rel="dofollow"
                    className="group inline-flex items-center gap-3 px-10 py-5 bg-black text-white text-lg font-bold uppercase tracking-wider hover:bg-brand-red transition-all duration-300 rounded-full shadow-xl hover:shadow-2xl"
                >
                    Visit Our Partner
                </a>
            </div>

            {/* <Goal className="absolute bottom-0 left-4 w-24 h-24 md:w-48 md:h-48 z-0 opacity-50" /> */}
        </section >
    );
};

export default Partner;
