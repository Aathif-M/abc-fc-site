import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import footballSvg from '../assets/football.svg';

gsap.registerPlugin(ScrollTrigger);

const FloatingBall = () => {
    const ballRef = useRef(null);
    const hasScoredRef = useRef(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial State: Off-screen to the left, positioned vertically for About section
            gsap.set(ballRef.current, {
                xPercent: -200,
                yPercent: -50,
                top: "130vh", // Position in About section (below Hero 100vh)
                left: "0%",
                scale: 0.8,
                opacity: 0
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "body",
                    start: "15% top", // Start animation when user scrolls into About
                    end: "30% top",
                    scrub: 1,
                }
            });

            // Animate IN from side
            tl.to(ballRef.current, {
                xPercent: 50, // Move onto screen
                left: "5%",
                opacity: 1,
                rotation: 360,
                duration: 1,
                ease: "power2.out"
            });

        });

        return () => ctx.revert();
    }, []);

    const triggerConfetti = () => {
        const rect = ballRef.current.getBoundingClientRect();
        // Normalized coordinates for canvas-confetti (0 to 1)
        const x = rect.left / window.innerWidth;
        const y = rect.top / window.innerHeight;

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { x, y: 0.9 }, // Shoot from bottom
            colors: ['#d4af37', '#ffffff', '#ff0000'] // Gold, White, Red
        });
    };

    return (
        <div
            ref={ballRef}
            className="fixed z-50 pointer-events-none"
            style={{
                width: '60px',
                height: '60px',
                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))'
            }}
        >
            <img
                src={footballSvg}
                alt="Football"
                className="w-full h-full object-contain"
            />
        </div>
    );
};

export default FloatingBall;
