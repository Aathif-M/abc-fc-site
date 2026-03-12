import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MatchHub = () => {
    const hubRef = useRef(null);
    const targetDate = new Date('2026-08-17T12:30:00');
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const difference = +targetDate - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                d: Math.floor(difference / (1000 * 60 * 60 * 24)),
                h: Math.floor((difference / (1000 * 60 * 60)) % 24),
                m: Math.floor((difference / 1000 / 60) % 60),
                s: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = { d: 0, h: 0, m: 0, s: 0 };
        }
        return timeLeft;
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(hubRef.current, 
                { y: 50, opacity: 0 }, 
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 1, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: hubRef.current,
                        start: "top 95%",
                    }
                }
            );
        }, hubRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={hubRef} className="w-full bg-[#004E98] py-8 text-white relative z-20 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                
                {/* Left: Last Result */}
                <div className="flex flex-col items-center md:items-start space-y-2 border-b md:border-b-0 md:border-r border-white/20 pb-6 md:pb-0 md:pr-8">
                    <span className="text-brand-gold font-anton tracking-widest text-sm uppercase">Last Result</span>
                    <div className="flex items-center gap-4 text-xl md:text-2xl font-bold font-sans">
                        <span>TOWN</span>
                        <div className="bg-black/30 px-3 py-1 rounded text-lg">2 - 1</div>
                        <span className="text-gray-300">SUNDERLAND</span>
                    </div>
                </div>

                {/* Center: Next Fixture */}
                <div className="flex flex-col items-center space-y-3">
                    <span className="text-brand-gold font-anton tracking-widest text-sm uppercase">Next Fixture</span>
                    <div className="font-bold text-xl md:text-2xl tracking-wide uppercase text-center">
                        LIVERPOOL FC (H)
                    </div>
                    <div className="flex gap-4 border border-white/20 bg-black/20 rounded-lg p-3">
                        <div className="text-center min-w-[50px]">
                            <span className="block text-2xl font-anton tracking-wider">{timeLeft.d}</span>
                            <span className="text-[0.6rem] uppercase tracking-widest text-gray-300">Days</span>
                        </div>
                        <div className="text-center min-w-[50px]">
                            <span className="block text-2xl font-anton tracking-wider">{timeLeft.h}</span>
                            <span className="text-[0.6rem] uppercase tracking-widest text-gray-300">Hrs</span>
                        </div>
                        <div className="text-center min-w-[50px]">
                            <span className="block text-2xl font-anton tracking-wider">{timeLeft.m}</span>
                            <span className="text-[0.6rem] uppercase tracking-widest text-gray-300">Mins</span>
                        </div>
                        <div className="text-center min-w-[50px]">
                            <span className="block text-2xl font-anton tracking-wider">{timeLeft.s}</span>
                            <span className="text-[0.6rem] uppercase tracking-widest text-gray-300">Secs</span>
                        </div>
                    </div>
                </div>

                {/* Right: Quick Links */}
                <div className="flex flex-col items-center md:items-end space-y-4 border-t md:border-t-0 md:border-l border-white/20 pt-6 md:pt-0 md:pl-8">
                    <button className="w-full md:w-auto bg-white text-brand-navy font-anton tracking-widest uppercase py-3 px-8 hover:bg-brand-gold hover:text-white transition-colors">
                        Buy Tickets
                    </button>
                    <button className="w-full md:w-auto border border-white text-white font-anton tracking-widest uppercase py-3 px-8 hover:bg-white hover:text-brand-navy transition-colors">
                        League Table
                    </button>
                </div>

            </div>
        </section>
    );
};

export default MatchHub;
