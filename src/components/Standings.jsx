import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Standings = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Animation
        const ctx = gsap.context(() => {
            gsap.fromTo(containerRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="bg-white py-20 px-4 md:px-12 relative z-10">
            <div ref={containerRef} className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="text-brand-red font-bold uppercase tracking-widest text-sm mb-2">Live Update</h2>
                        <h3 className="text-4xl md:text-6xl font-anton text-brand-navy">Team Stats</h3>
                    </div>
                    <div className="text-brand-blue font-bold tracking-widest uppercase text-xs mt-4 md:mt-0">
                        2024/25 Season
                    </div>
                </div>

                <div className="w-full overflow-hidden rounded-xl shadow-2xl border border-gray-100 min-h-[420px] pointer-events-none">
                    <iframe src="https://footystats.org/api/club?id=220" height="100%" width="100%" style={{ height: '420px', width: '100%' }} frameBorder="0"></iframe>
                </div>
            </div>
        </section>
    );
};

export default Standings;
