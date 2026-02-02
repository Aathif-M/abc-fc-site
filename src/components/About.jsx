import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PlaceholderImage from './PlaceholderImage';
import teamsCelebrate from '../assets/teams_celebrate.jpg';
import historicTrophy from '../assets/historic_trophy.jpg';
import youthAcademy from '../assets/youth_academy.jpg';


const About = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Animate Title
            gsap.fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 80%",
                    }
                }
            );

            // Animate Grid Items
            const items = gridRef.current.children;
            gsap.fromTo(items,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 75%",
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="bg-black py-20 px-4 md:px-12 min-h-screen flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">
                {/* Header */}
                <div ref={titleRef} className="mb-16 md:mb-24">
                    <h2 className="text-sm md:text-base text-brand-red font-bold uppercase tracking-widest mb-2">Our History</h2>
                    <h3 className="text-4xl md:text-6xl font-bold max-w-2xl leading-tight">
                        Founded on passion, <br /> driven by <span className="text-brand-gold">glory</span>.
                    </h3>
                </div>

                {/* Grid */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 text-white">
                    {/* Item 1 - Big Image */}
                    <div className="lg:col-span-8 aspect-video md:aspect-auto md:h-[500px] overflow-hidden group relative rounded-xl">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                        <img
                            src={teamsCelebrate}
                            alt="Team Celebrate"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                        />
                    </div>

                    {/* Item 2 - Text */}
                    <div className="lg:col-span-4 flex flex-col justify-end space-y-6">
                        <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                            From the local streets to the global stage, we represent more than just a game. We represent a movement.
                        </p>
                        <div className="h-40 w-full overflow-hidden group relative rounded-xl">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                            <img
                                src={historicTrophy}
                                alt="Historic Trophy"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-110"
                            />
                        </div>
                    </div>

                    {/* Item 3 - Text */}
                    <div className="lg:col-span-5 md:h-[400px]">
                        <div className="h-full w-full overflow-hidden group relative rounded-xl">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                            <img
                                src={youthAcademy}
                                alt="Youth Academy"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* Item 4 - Image */}
                    <div className="lg:col-span-7 flex flex-col justify-center p-8 border border-neutral-800 rounded-xl bg-neutral-900/50">
                        <h4 className="text-3xl font-bold mb-4">A Legacy of Winners</h4>
                        <p className="text-gray-400 mb-6">
                            Since 1923, ABC FC has been defining what it means to be a champion.
                        </p>
                        <button className="self-start px-6 py-3 border border-white hover:bg-white hover:text-black transition-colors uppercase font-bold text-sm tracking-wider">
                            Read Full Story
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
