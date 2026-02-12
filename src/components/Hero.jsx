import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PlaceholderImage from './PlaceholderImage';
import heroVideo from '../assets/hero_vid.mp4';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Initial entrance (after loader)
            tl.fromTo(imageRef.current,
                { scale: 1.2, opacity: 0.5 },
                { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }
            );

            // Children of textRef are the h2 and h1
            tl.fromTo(textRef.current.children,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
                "-=1"
            );

            // Parallax on scroll
            gsap.to(imageRef.current, {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <div ref={imageRef} className="w-full h-full">
                    <video
                        src={heroVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-60"
                    />
                </div>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black z-10"></div>
            </div>

            {/* Content */}
            <div ref={textRef} className="relative z-20 text-center px-4 mix-blend-difference">
                <h2 className="text-xl md:text-2xl font-anton tracking-[0.5em] text-brand-gold mb-4 uppercase">
                    Welcome to the Arena
                </h2>
                <h1 className="text-8xl md:text-[12rem] font-anton uppercase tracking-tighter leading-[0.8] italic">
                    <div className="text-white">The Pride</div>
                    <div className="text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500">
                        Of The City
                    </div>
                </h1>
            </div>
        </section>
    );
};

export default Hero;
