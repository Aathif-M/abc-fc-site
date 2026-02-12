import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Marquee = () => {
    const marqueeRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const width = textRef.current.offsetWidth;

            gsap.to(textRef.current, {
                x: -width / 2,
                duration: 20,
                ease: "none",
                repeat: -1
            });
        }, marqueeRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={marqueeRef}
            className="w-full bg-brand-gold py-4 overflow-hidden relative z-30 transform -skew-y-2 border-y-4 border-black"
        >
            <div
                ref={textRef}
                className="whitespace-nowrap flex text-black font-anton text-4xl uppercase tracking-tighter"
            >
                <span className="mx-4">PASSION • GLORY • VICTORY • EST. 2026 • </span>
                <span className="mx-4">PASSION • GLORY • VICTORY • EST. 2026 • </span>
                <span className="mx-4">PASSION • GLORY • VICTORY • EST. 2026 • </span>
                <span className="mx-4">PASSION • GLORY • VICTORY • EST. 2026 • </span>
                <span className="mx-4">PASSION • GLORY • VICTORY • EST. 2026 • </span>
                <span className="mx-4">PASSION • GLORY • VICTORY • EST. 2026 • </span>
                <span className="mx-4">PASSION • GLORY • VICTORY • EST. 2026 • </span>
                <span className="mx-4">PASSION • GLORY • VICTORY • EST. 2026 • </span>
            </div>
        </div>
    );
};

export default Marquee;
