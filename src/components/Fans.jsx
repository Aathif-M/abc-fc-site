import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAssetPath } from '../utils/getAsset';

const fansPortmanRoad = getAssetPath('fans-portman-road');
const fansCelebration = getAssetPath('fans-celebration');

gsap.registerPlugin(ScrollTrigger);

const StatsCounter = ({ value, label, suffix = "" }) => {
    const elRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(elRef.current, {
                innerText: 0,
                duration: 2,
                snap: { innerText: 1 },
                scrollTrigger: {
                    trigger: elRef.current,
                    start: "top 85%",
                }
            });
        }, elRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="flex flex-col items-center">
            <div className="text-4xl md:text-6xl font-anton text-brand-gold mb-2 flex">
                <span ref={elRef}>{value}</span>
                <span>{suffix}</span>
            </div>
            <div className="text-white text-xs md:text-sm tracking-[0.2em] uppercase font-bold text-center">
                {label}
            </div>
        </div>
    );
};

const Fans = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const imagesRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Text fade-in
            gsap.from(textRef.current.children, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 80%",
                }
            });

            // Parallax on images
            gsap.fromTo(".parallax-img",
                { yPercent: -15 },
                {
                    yPercent: 15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: imagesRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-brand-navy relative w-full overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-20">
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <div ref={textRef} className="order-2 lg:order-1">
                        <h2 className="text-brand-gold font-anton tracking-[0.2em] text-sm md:text-base mb-2 uppercase">The Blue Army</h2>
                        <h3 className="text-5xl md:text-7xl font-anton uppercase tracking-tighter text-white mb-6">Our Supporters</h3>
                        <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-10 font-sans">
                            More than just fans. A community united by passion, loyalty, and a deep-rooted love for Ipswich Town. Your voice is our strength.
                        </p>
                        
                        {/* Stats Row */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-8 border-t border-white/20">
                            <StatsCounter value={28000} label="Average Gate" suffix="+" />
                            <StatsCounter value={21000} label="Season Tickets" suffix="+" />
                            <StatsCounter value={100} label="Sell Outs" suffix="%" />
                        </div>
                        
                        <button className="mt-8 bg-brand-red text-white font-anton tracking-widest uppercase py-4 px-10 hover:bg-white hover:text-brand-red transition-colors">
                            Join The Club
                        </button>
                    </div>

                    {/* Image Collage */}
                    <div ref={imagesRef} className="order-1 lg:order-2 relative h-[500px] md:h-[600px] flex items-center justify-center">
                        {/* Background glowing orb */}
                        <div className="absolute inset-0 bg-brand-blue/30 blur-[100px] rounded-full scale-75 z-0 pointer-events-none"></div>
                        
                        <div className="relative w-full h-full z-10 flex flex-col gap-6">
                            <div className="w-[80%] h-[55%] self-end rounded-xl overflow-hidden shadow-2xl relative border-4 border-white">
                                <img loading="lazy" 
                                    src={fansPortmanRoad} 
                                    alt="Portman Road Fans" 
                                    className="parallax-img w-full h-[130%] object-cover object-center absolute top-[-15%]"
                                />
                                <div className="absolute inset-0 bg-brand-navy/30 mix-blend-multiply"></div>
                            </div>
                            
                            <div className="w-[70%] h-[45%] rounded-xl overflow-hidden shadow-2xl relative border-4 border-white -mt-16 z-20">
                                <img loading="lazy" 
                                    src={fansCelebration} 
                                    alt="Fans Celebration" 
                                    className="parallax-img w-full h-[130%] object-cover object-center absolute top-[-15%]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Fans;
