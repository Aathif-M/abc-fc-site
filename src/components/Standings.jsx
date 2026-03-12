import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Standings = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Prevent duplicate script injection
        if (!document.querySelector('script[src*="widgets.scoreaxis.com"]')) {
            const script = document.createElement('script');
            script.src = "https://widgets.scoreaxis.com/api/football/league-table/6232265abf1fa71a672159ec?widgetId=9v46mljf6b6f&lang=en&teamLogo=1&tableLines=0&homeAway=1&header=1&position=1&goals=1&gamesCount=1&diff=1&winCount=1&drawCount=1&loseCount=1&lastGames=1&points=1&teamsLimit=all&links=1&font=heebo&fontSize=14&rowDensity=100&widgetWidth=auto&widgetHeight=auto&bodyColor=%23ffffff&textColor=%23141416&linkColor=%23141416&borderColor=%23ecf1f7&tabColor=%23f3f8fd";
            script.async = true;
            document.body.appendChild(script);
        }

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

        return () => {
            // We don't remove the script to avoid re-fetching issues, but we revert animation context
            ctx.revert();
        };
    }, []);

    return (
        <section className="bg-white py-20 px-4 md:px-12 relative z-10">
            <div ref={containerRef} className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="text-brand-red font-bold uppercase tracking-widest text-sm mb-2">Live Update</h2>
                        <h3 className="text-4xl md:text-6xl font-anton text-brand-navy">PL Standings</h3>
                    </div>
                    <div className="text-brand-blue font-bold tracking-widest uppercase text-xs mt-4 md:mt-0">
                        2024/25 Season
                    </div>
                </div>

                <div className="w-full overflow-hidden rounded-xl shadow-2xl border border-gray-100">
                    <div id="widget-9v46mljf6b6f" className="scoreaxis-widget" style={{ width: 'auto', height: 'auto', fontSize: '14px', backgroundColor: '#ffffff', color: '#141416', border: '1px solid', borderColor: '#ecf1f7', overflow: 'auto' }}>
                        <div className="widget-main-link" style={{ padding: '6px 12px', fontWeight: 500 }}>
                            Live data by <a href="https://www.scoreaxis.com/" style={{ color: 'inherit' }}>Scoreaxis</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Standings;
