import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

const MatchCentre = () => {
    // Hardcoded countdown date: Next Saturday 12:30
    // For demo purposes, we'll just set it to a future date relative to now or a fixed date
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
            };
        } else {
            // Fallback if date passed
            timeLeft = { d: 0, h: 0, m: 0 };
        }
        return timeLeft;
    }

    useEffect(() => {
        // Update every second for live countdown feel
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed bottom-0 md:bottom-8 left-0 right-0 z-40 px-4 pointer-events-none">
            <div className="max-w-4xl mx-auto bg-brand-navy/80 backdrop-blur-xl border border-white/10 rounded-t-xl md:rounded-full p-4 md:px-8 text-white flex flex-col md:flex-row justify-between items-center shadow-2xl pointer-events-auto overflow-hidden relative">

                {/* Glossy sheen */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                {/* Left: Label & Date */}
                <div className="flex flex-col items-center md:items-start mb-2 md:mb-0">
                    <span className="text-brand-red font-bold uppercase tracking-widest text-xs">Next Fixture</span>
                    <span className="font-anton text-2xl tracking-wide">LIVERPOOL FC (H)</span>
                </div>

                {/* Center: Venue */}
                <div className="hidden md:flex flex-col items-center border-l border-r border-white/20 px-8 mx-4">
                    <span className="text-gray-400 text-xs uppercase tracking-widest">Venue</span>
                    <span className="font-bold">PORTMAN ROAD</span>
                </div>

                {/* Right: Countdown */}
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-gray-400 text-xs uppercase tracking-widest">Kick Off</div>
                        <div className="font-bold">SAT 17 AUG | 12:30 BST</div>
                    </div>
                    {/* Timer Circle/Block (Decorative) */}
                    <div className="bg-brand-blue border border-white/10 p-2 rounded-lg text-center min-w-[60px]">
                        <span className="block text-xl font-anton leading-none">{timeLeft.d}d</span>
                        <span className="text-[0.6rem] text-brand-gold uppercase">Days</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchCentre;
