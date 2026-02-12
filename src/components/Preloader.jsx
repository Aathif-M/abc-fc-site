import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Preloader = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Pulse animation for the text
            tl.to(textRef.current, {
                scale: 1.1,
                duration: 0.8,
                yoyo: true,
                repeat: 2,
                ease: "power1.inOut"
            })
                // Slide up animation
                .to(containerRef.current, {
                    y: '-100%',
                    duration: 1.5,
                    ease: "expo.inOut",
                    delay: 0.2
                });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 bg-black z-[9999] flex items-center justify-center pointer-events-none"
        >
            <h1
                ref={textRef}
                className="text-white font-anton text-6xl md:text-9xl uppercase tracking-tighter"
            >
                ABC FC
            </h1>
        </div>
    );
};

export default Preloader;
