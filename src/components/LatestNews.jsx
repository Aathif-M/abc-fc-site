import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import News Images
import { getAssetPath } from '../utils/getAsset';
const newsFeatured = getAssetPath('news-featured-mckenna');
const newsSmall1 = getAssetPath('news-training-ground');
const newsSmall2 = getAssetPath('news-u21-victory');
const newsSmall3 = getAssetPath('news-tickets');

gsap.registerPlugin(ScrollTrigger);

const featuredNews = {
    id: 1,
    title: "MCKENNA REVEALS PLANS FOR THE UPCOMING PREMIER LEAGUE CAMPAIGN",
    category: "FIRST TEAM",
    date: "12 Hours Ago",
    image: newsFeatured,
    excerpt: "The boss sat down with Town TV to discuss pre-season preparations, squad dynamics, and the challenges awaiting in the top flight."
};

const newsList = [
    {
        id: 2,
        title: "NEW TRAINING GROUND FACILITIES FULLY OPERATIONAL",
        category: "CLUB NEWS",
        date: "1 Day Ago",
        image: newsSmall1
    },
    {
        id: 3,
        title: "U21s SECURE CONVINCING WIN OVER NORWICH CITY",
        category: "ACADEMY",
        date: "2 Days Ago",
        image: newsSmall2
    },
    {
        id: 4,
        title: "TICKET INFORMATION: OPENING DAY FIXTURE",
        category: "TICKETS",
        date: "3 Days Ago",
        image: newsSmall3
    }
];

const LatestNews = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const featuredRef = useRef(null);
    const listRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            });

            tl.from(headerRef.current.children, {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out"
            })
            .fromTo(featuredRef.current,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.4"
            )
            .from(listRef.current.children, {
                x: 50,
                opacity: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "power3.out"
            }, "-=0.6");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-brand-navy w-full relative z-20" id="news">
            <div className="max-w-7xl mx-auto px-4 md:px-12">
                
                {/* Header */}
                <div ref={headerRef} className="flex justify-between items-end mb-12 border-b border-white/20 pb-6">
                    <div>
                        <h2 className="text-brand-red font-anton tracking-[0.2em] text-sm md:text-base mb-2 uppercase">Headlines</h2>
                        <h3 className="text-4xl md:text-6xl font-anton uppercase tracking-tighter text-white">Latest News</h3>
                    </div>
                    <button className="hidden md:block bg-brand-blue text-white font-anton tracking-widest uppercase py-3 px-8 hover:bg-brand-gold transition-colors">
                        All News
                    </button>
                </div>

                {/* News Matrix Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Featured Article (Left - 7 cols) */}
                    <div ref={featuredRef} className="lg:col-span-7 group cursor-pointer block h-full">
                        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl mb-6">
                            <img loading="lazy" 
                                src={featuredNews.image} 
                                alt={featuredNews.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay gradient for text readability if needed, but keeping it clean here */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="flex items-center gap-4 mb-3">
                            <span className="bg-brand-red text-white text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded">
                                {featuredNews.category}
                            </span>
                            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                                {featuredNews.date}
                            </span>
                        </div>
                        <h4 className="text-3xl md:text-5xl font-anton uppercase tracking-tight text-white mb-4 group-hover:text-brand-gold transition-colors leading-[1.1]">
                            {featuredNews.title}
                        </h4>
                        <p className="text-gray-300 font-sans text-lg max-w-2xl">
                            {featuredNews.excerpt}
                        </p>
                    </div>

                    {/* Sub Articles List (Right - 5 cols) */}
                    <div ref={listRef} className="lg:col-span-5 flex flex-col gap-6 w-full">
                        {newsList.map((news) => (
                            <div key={news.id} className="group cursor-pointer flex gap-4 bg-white/5 hover:bg-white/10 p-4 rounded-xl transition-colors border border-white/5">
                                <div className="w-1/3 aspect-square md:aspect-[4/3] rounded-lg overflow-hidden flex-shrink-0">
                                    <img loading="lazy" 
                                        src={news.image} 
                                        alt={news.title} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="w-2/3 flex flex-col justify-center">
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                                        <span className="text-brand-red text-[10px] font-bold tracking-widest uppercase">
                                            {news.category}
                                        </span>
                                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider hidden sm:block">
                                            | {news.date}
                                        </span>
                                    </div>
                                    <h5 className="text-white font-anton uppercase tracking-tight text-xl md:text-2xl leading-none group-hover:text-brand-gold transition-colors">
                                        {news.title}
                                    </h5>
                                </div>
                            </div>
                        ))}
                        
                        {/* Mobile View All Button */}
                        <button className="md:hidden w-full mt-4 bg-transparent border border-white text-white font-anton tracking-widest uppercase py-4 px-8 hover:bg-white hover:text-brand-navy transition-colors">
                            View All News
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default LatestNews;
