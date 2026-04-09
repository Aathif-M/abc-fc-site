import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PlaceholderImage from './PlaceholderImage';
import StatCounter from './StatCounter';

// Placeholder imports - using the same ones for now, but in reality we'd pull unique ones
import { getAssetPath } from '../utils/getAsset';
const samMorsy = getAssetPath('sam-morsy');
const leifDavis = getAssetPath('leif-davis');
const marcelinoNunez = getAssetPath('marcelino-nunez');
const conorChaplin = getAssetPath('conor-chaplin'); // Using team photo for Conor for now
const kieranMcKenna = getAssetPath('kieran-mckenna');

const Squad = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    const players = [
        { name: "Sam Morsy", role: "Captain / Midfielder", tagline: "The Engine", number: "5", img: samMorsy },
        { name: "Leif Davis", role: "Defender", tagline: "Assist King", number: "3", img: leifDavis },
        { name: "Marcelino Núñez", role: "Midfielder", tagline: "Electric Pace", number: "7", img: marcelinoNunez },
        { name: "Conor Chaplin", role: "Forward", tagline: "Fan Favourite", number: "10", img: conorChaplin },
        { name: "Kieran McKenna", role: "Manager", tagline: "The Architect", number: "KM", img: kieranMcKenna },
    ];

    useEffect(() => {
        const scrollContainer = containerRef.current;
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
                    end: "+=" + (totalWidth), // Scroll distance proportional to content width roughly
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1
                }
            });
        }, sectionRef);

        return () => context.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative h-screen bg-brand-navy overflow-hidden">
            <div className="absolute top-32 left-8 md:top-40 md:left-20 z-20">
                <h2 className="text-brand-gold text-sm font-bold tracking-[0.3em] uppercase mb-2">First Team Stars</h2>
                <h3 className="text-white font-anton text-4xl md:text-6xl uppercase tracking-tighter">The Squad</h3>
            </div>

            {/* Stat Counters Overlay */}
            <div className="absolute top-32 right-8 md:top-40 md:right-20 z-20 flex gap-8 hidden md:flex">
                <StatCounter label="Goals Scored" value={45} />
                <StatCounter label="Points" value={82} />
            </div>

            <div
                ref={containerRef}
                className="flex h-full w-[500vw] will-change-transform" // 100vw * 5 items
            >
                {players.map((player, index) => (
                    <div key={index} className="w-[100vw] h-full flex flex-col md:flex-row items-center justify-center relative border-r border-white/5 bg-brand-navy">

                        {/* Background with slight tint for variety */}
                        <div className={`absolute inset-0 opacity-20 ${index % 2 === 0 ? 'bg-black' : 'bg-brand-blue'} mix-blend-multiply`} />

                        {/* Image Half */}
                        <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brand-navy via-transparent to-transparent z-10" />
                            <img
                                src={player.img}
                                alt={player.name}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-110 group-hover:scale-100"
                            />
                        </div>

                        {/* Info Half */}
                        <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center p-8 md:p-20 relative z-10">
                            <div className="text-[10rem] md:text-[15rem] leading-none font-black text-white/5 absolute top-10 right-10 md:top-20 md:right-20 select-none font-anton">
                                {player.number}
                            </div>

                            <h4 className="text-brand-red font-bold uppercase tracking-widest mb-2">{player.role}</h4>
                            <h2 className="text-5xl md:text-8xl font-anton uppercase text-white mb-4 leading-[0.9]">
                                {player.name}
                            </h2>
                            <p className="text-xl md:text-3xl text-brand-gold font-light italic">"{player.tagline}"</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 right-10 z-20 animate-bounce text-white/50">
                <span className="text-xs uppercase tracking-widest">Scroll to Explore →</span>
            </div>
        </section>
    );
};

export default Squad;
