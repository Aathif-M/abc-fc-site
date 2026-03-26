import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Video Thumbnails
import { getAssetPath } from '../utils/getAsset';
const videoThumb1 = getAssetPath('video-thumb-highlights');
const videoThumb2 = getAssetPath('video-thumb-mckenna');
const videoThumb3 = getAssetPath('video-thumb-training');
const videoThumb4 = getAssetPath('video-thumb-nunez');

gsap.registerPlugin(ScrollTrigger);

const videos = [
    {
        id: 1,
        title: "Extended Highlights: Town vs Sunderland",
        category: "HIGHLIGHTS",
        duration: "10:24",
        image: videoThumb1
    },
    {
        id: 2,
        title: "Manager Interview: Kieran McKenna",
        category: "INTERVIEWS",
        duration: "05:12",
        image: videoThumb2
    },
    {
        id: 3,
        title: "Behind the Scenes: Training Session",
        category: "TOWN TV",
        duration: "15:45",
        image: videoThumb3
    },
    {
        id: 4,
        title: "Player Profile: Marcelino Núñez",
        category: "FEATURES",
        duration: "08:30",
        image: videoThumb4
    }
];

const MediaGrid = () => {
    const gridRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(gridRef.current.children, {
                y: 100,
                opacity: 0,
                rotation: 5,
                scale: 0.9,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 w-full bg-black relative">
            <div className="max-w-7xl mx-auto px-4 md:px-12">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-brand-red font-anton tracking-[0.2em] text-sm md:text-base mb-2 uppercase">Town TV</h2>
                        <h3 className="text-4xl md:text-6xl font-anton uppercase tracking-tighter text-white">Latest Videos</h3>
                    </div>
                    <button className="hidden md:block border-b border-brand-gold text-brand-gold font-anton tracking-widest uppercase hover:text-white hover:border-white transition-colors pb-1">
                        View All Media
                    </button>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {videos.map((video) => (
                        <div key={video.id} className="group relative cursor-pointer rounded-lg overflow-hidden block">
                            {/* Image Container */}
                            <div className="relative aspect-video overflow-hidden">
                                <img 
                                    src={video.image} 
                                    alt={video.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
                                
                                {/* Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-gold/80 transition-all duration-300">
                                        <div className="w-16 h-16 absolute rounded-full border border-white/50 animate-ping opacity-0 group-hover:opacity-100 duration-1000"></div>
                                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Duration Badge */}
                                <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
                                    {video.duration}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="pt-4">
                                <span className="text-brand-gold text-xs font-bold tracking-widest uppercase mb-1 block">
                                    {video.category}
                                </span>
                                <h4 className="text-white font-sans font-bold text-lg leading-tight group-hover:text-brand-gold transition-colors">
                                    {video.title}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MediaGrid;
