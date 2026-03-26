import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FormGuide from './FormGuide';

// Import Hero Slide Images
import { getAssetPath } from '../utils/getAsset';
const heroSlide1 = getAssetPath('hero-match-preview');
const heroSlide2 = getAssetPath('hero-mckenna-contract');
const heroSlide3 = getAssetPath('hero-away-kit');

gsap.registerPlugin(ScrollTrigger);

const stories = [
    {
        id: 1,
        headline: "MATCH PREVIEW: TOWN V LIVERPOOL",
        image: heroSlide1,
        date: "24 Aug 2026"
    },
    {
        id: 2,
        headline: "MCKENNA EXTENDS CONTRACT",
        image: heroSlide2,
        date: "21 Aug 2026"
    },
    {
        id: 3,
        headline: "NEW AWAY KIT REVEALED",
        image: heroSlide3,
        date: "18 Aug 2026"
    }
];

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);
    const progressRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
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

    useEffect(() => {
        // Timeline for slide transition
        const tl = gsap.timeline();

        // Animate text out
        if (textRef.current && textRef.current.children.length > 0) {
            tl.to(textRef.current.children, {
                y: -50,
                opacity: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: "power2.in"
            });
        }
        
        // Reset and animate text in
        tl.fromTo(textRef.current?.children,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
        );

        // Progress bar animation
        if (progressRef.current) {
            gsap.killTweensOf(progressRef.current.children);
            gsap.set(progressRef.current.children, { scaleX: 0, transformOrigin: "left" });
            
            const currentProgressBar = progressRef.current.children[currentIndex];
            gsap.to(currentProgressBar, {
                scaleX: 1,
                duration: 5,
                ease: "none",
                onComplete: () => {
                    setCurrentIndex((prev) => (prev + 1) % stories.length);
                }
            });
        }
        
        // Background image animate in
        if (imageRef.current) {
            gsap.fromTo(imageRef.current, 
                { scale: 1.1 }, 
                { scale: 1, duration: 1.5, ease: "power2.out" }
            );
        }

        return () => {
            tl.kill();
        };
    }, [currentIndex]);

    return (
        <section ref={containerRef} className="relative h-[85vh] lg:h-screen w-full overflow-hidden flex items-end pb-24 lg:pb-32 justify-center">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <div ref={imageRef} className="w-full h-full">
                    {stories.map((story, index) => (
                        <div
                            key={story.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ${
                                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                        >
                            <img
                                src={story.image}
                                alt={story.headline}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-transparent z-10"></div>
            </div>

            {/* Content */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-12 flex flex-col items-start gap-6">
                <div ref={textRef} className="max-w-4xl">
                    <p className="text-brand-gold font-anton tracking-[0.2em] text-sm md:text-lg mb-2 uppercase">
                        {stories[currentIndex].date}
                    </p>
                    <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-anton uppercase tracking-tighter leading-[0.9] text-white">
                        {stories[currentIndex].headline}
                    </h1>
                </div>

                {/* Progress Indicators */}
                <div className="flex gap-3 mt-8">
                    <div ref={progressRef} className="flex gap-3">
                        {stories.map((_, index) => (
                            <div 
                                key={index} 
                                className="w-16 h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer"
                                onClick={() => setCurrentIndex(index)}
                            >
                                <div className="w-full h-full bg-brand-gold origin-left scale-x-0"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full z-30">
                <FormGuide />
            </div>
        </section>
    );
};

export default Hero;
