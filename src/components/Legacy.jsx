import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PlaceholderImage from './PlaceholderImage';
import TrainingSession from '../assets/training_session.jpg';
import TeamHuddle from '../assets/team_huddle.jpg';
import LiftingTrophy from '../assets/lifting_trophy.jpg';

const Legacy = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const scrollContainer = containerRef.current;

        // Amount to scroll = width of container - viewport width
        // But since we want to scroll 3 sections of 100vw, the total width is 300vw.
        // The translation needed is (totalWidth - viewportWidth).

        const context = gsap.context(() => {
            const totalWidth = scrollContainer.scrollWidth;
            const viewportWidth = window.innerWidth;
            const xMovement = -(totalWidth - viewportWidth);

            gsap.to(scrollContainer, {
                x: xMovement,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=3000", // Sticky for 3000px of scroll
                    pin: true,
                    scrub: 1, // Smooth scrubbing
                    anticipatePin: 1
                }
            });
        }, sectionRef);

        return () => context.revert();
    }, []);

    const values = [
        { title: "Discipline", desc: "The foundation of every victory.", img: TrainingSession },
        { title: "Teamwork", desc: "United we stand, divided we fall.", img: TeamHuddle },
        { title: "Victory", desc: "The ultimate pursuit.", img: LiftingTrophy },
    ];

    return (
        <section ref={sectionRef} className="relative h-screen bg-brand-dark overflow-hidden">
            <div
                ref={containerRef}
                className="flex h-full w-[300vw] will-change-transform" // 300vw for 3 items
            >
                {values.map((item, index) => (
                    <div key={index} className="w-[100vw] h-full flex items-center justify-center relative border-r border-neutral-900">
                        {/* Background Image Placeholder */}
                        <div className="absolute inset-0 z-0 opacity-40 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 z-10" />
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-full object-cover scale-105 animate-slow-zoom"
                            />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 text-center p-8 bg-black/60 backdrop-blur-sm rounded-xl max-w-2xl border border-white/10">
                            <h3 className="text-8xl md:text-[10rem] font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent opacity-80 leading-none">
                                0{index + 1}
                            </h3>
                            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white mb-4 -mt-8 md:-mt-16 relative z-20">
                                {item.title}
                            </h2>
                            <p className="text-xl text-gray-300 font-light tracking-wide">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-10 z-20 md:hidden animate-pulse">
                <span className="text-xs uppercase tracking-widest text-white/50">Swipe →</span>
            </div>
        </section>
    );
};

export default Legacy;
