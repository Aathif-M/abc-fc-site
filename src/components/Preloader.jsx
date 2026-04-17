import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Preloader = ({ isLoaded }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const pulseTl = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Infinite pulse animation for the text
            pulseTl.current = gsap.timeline({ repeat: -1, yoyo: true });
            pulseTl.current.to(textRef.current, {
                scale: 1.1,
                duration: 0.8,
                ease: "power1.inOut"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (isLoaded) {
            const exitCtx = gsap.context(() => {
                if (pulseTl.current) {
                    pulseTl.current.kill();
                }
                
                const exitTl = gsap.timeline();
                exitTl.to(textRef.current, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power1.out"
                }).to(containerRef.current, {
                    y: '-100%',
                    duration: 1.5,
                    ease: "expo.inOut",
                    onComplete: () => {
                        if (containerRef.current) containerRef.current.style.display = 'none';
                    }
                });
            }, containerRef);
            return () => exitCtx.revert();
        }
    }, [isLoaded]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 bg-black z-[9999] flex items-center justify-center pointer-events-none"
        >
            <h1
                ref={textRef}
                className="text-white font-anton text-4xl md:text-7xl uppercase tracking-tighter text-center px-4"
            >
                Ipswich Town FC
            </h1>
        </div>
    );
};

export default Preloader;

