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
            const aboutSection = document.getElementById('about');
            const legacySection = document.getElementById('legacy');

            if (!aboutSection || !legacySection) return;

            // --- Phase 1: Travel Travel to Legacy Bottom-Left ---

            // Start Position (calculated relative to viewport start)
            const startRelTop = (aboutSection.offsetTop + aboutSection.offsetHeight * 0.05) - aboutSection.offsetTop;

            // Destination 1: Left 10%, Bottom 10% (Top 90%)
            const destXPercent = window.innerWidth * 0.1;
            const startRightPx = window.innerWidth - 32 - 60; // right: 2rem(32px)
            const xDelta = -(startRightPx - destXPercent);

            const destYFromTop = window.innerHeight * 0.9 - 60;
            const yDelta = destYFromTop - startRelTop;

            // Set initial state
            gsap.set(ballRef.current, {
                position: "absolute",
                top: aboutSection.offsetTop + (aboutSection.offsetHeight * 0.05),
                right: "2rem",
                left: "auto",
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1
            });

            // Timeline 1: About -> Legacy Start
            const tl1 = gsap.timeline({
                scrollTrigger: {
                    trigger: aboutSection,
                    start: "top top",
                    endTrigger: legacySection,
                    end: "top top",
                    scrub: 1.5,
                    pin: ballRef.current,
                    invalidateOnRefresh: true,
                }
            });

            tl1.to(ballRef.current, {
                x: xDelta,
                y: yDelta,
                rotation: -180,
                ease: "power2.inOut"
            });

            // --- Phase 2: Legacy Interaction (Bounce & Lift) ---

            // We want to lift to Top 10% at the end.
            const liftYTarget = window.innerHeight * 0.1;
            // The ball is currently at 'yDelta' relative to its start.
            // Visually it is at 'destYFromTop' in the viewport.
            // We need to move it to 'liftYTarget'.
            // The delta needed = liftYTarget - destYFromTop.
            const liftDelta = liftYTarget - destYFromTop; // This will be negative (moving up)

            const tl2 = gsap.timeline({
                scrollTrigger: {
                    trigger: legacySection,
                    start: "top top", // Immediately after tl1
                    end: "+=3000", // Match Legacy component's pin duration
                    scrub: 1,
                    pin: ballRef.current, // Continue pinning
                    invalidateOnRefresh: true
                }
            });

            // Animation:
            // 80% duration: Subtle Bounce
            // 20% duration: Lift to top

            tl2.to(ballRef.current, {
                y: "+=20", // Small bounce down
                rotation: "+=10",
                duration: 0.1, // Short duration relative to whole, but repeated
                yoyo: true,
                repeat: 20, // Repeat enough times to cover most of the scroll
                ease: "sine.inOut"
            })
                .to(ballRef.current, {
                    y: "+=" + liftDelta, // Move to Top 10%
                    rotation: -360,
                    duration: 5, // Represents the final 'lift' phase (relative units)
                    ease: "power2.inOut"
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
            className="absolute z-[60] pointer-events-none drop-shadow-2xl"
            style={{
                width: '60px',
                height: '60px',
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
