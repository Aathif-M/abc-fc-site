import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAssetPath } from '../utils/getAsset';

const academyU21 = getAssetPath('academy-u21');
const academyYouth = getAssetPath('academy-youth');
const academyAction = getAssetPath('academy-action');

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        title: "Under 21s",
        desc: "Competing at the highest level of Premier League 2, our U21s bridge the gap to the first team.",
        image: academyU21,
    },
    {
        title: "Youth Development",
        desc: "A category one academy dedicated to nurturing the finest young talent in Suffolk and beyond.",
        image: academyYouth,
    },
    {
        title: "The Pathway",
        desc: "From local grassroots to the Portman Road pitch. The Ipswich way is built on opportunity.",
        image: academyAction,
    }
];

const Academy = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(headerRef.current.children, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });

            gsap.from(gridRef.current.children, {
                y: 80,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 75%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-black relative w-full overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-20">

                {/* Header */}
                <div ref={headerRef} className="text-center mb-16 md:mb-24">
                    <h2 className="text-brand-red font-anton tracking-[0.2em] text-sm md:text-base mb-2 uppercase">The Future</h2>
                    <h3 className="text-5xl md:text-7xl font-anton uppercase tracking-tighter text-white">Academy</h3>
                    <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light">
                        Building the next generation of Ipswich Town stars.
                        Our Category One academy is the beating heart of the club's philosophy.
                    </p>
                </div>

                {/* Grid */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group cursor-pointer">
                            <div className="w-full aspect-[4/3] overflow-hidden rounded-xl mb-6 relative">
                                <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                            </div>
                            <h4 className="text-2xl md:text-3xl font-anton uppercase text-white mb-3 group-hover:text-brand-gold transition-colors">
                                {feature.title}
                            </h4>
                            <p className="text-gray-400 font-sans leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <button className="bg-transparent border border-white text-white font-anton tracking-widest uppercase py-4 px-10 hover:bg-white hover:text-black transition-colors">
                        Explore The Academy
                    </button>
                </div>

            </div>
        </section>
    );
};

export default Academy;
