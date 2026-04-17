import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// Assets for preloading
import { getAssetPath } from '../utils/getAsset';
const img1 = getAssetPath('ipswich-team');
const img2 = getAssetPath('marcelino-nunez');
const img3 = getAssetPath('leif-davis');
const img4 = getAssetPath('ipswich-legacy');
const img5 = getAssetPath('sam-morsy');
const img6 = getAssetPath('kieran-mckenna');

const Preloader = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const pulseTl = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Run preload logic internally to avoid triggering App-level re-renders that break GSAP Pin Spacers
        const preloadImages = async () => {
            const images = [img1, img2, img3, img4, img5, img6];
            const imagePromises = images.map((src) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = resolve;
                    img.onerror = resolve; // Continue even if error
                });
            });

            // Minimum 3.5 second delay
            const minimumWait = new Promise(resolve => setTimeout(resolve, 3500));

            await Promise.all([...imagePromises, minimumWait]);
            
            // Wait for next tick to ensure we don't conflict with any active layout refreshes
            setTimeout(() => {
                setIsLoaded(true);
            }, 50);
        };

        preloadImages();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Infinite pulse animation for the text
            pulseTl.current = gsap.timeline({ repeat: -1, yoyo: true });
            pulseTl.current.to(textRef.current, {
                scale: 1.1,
                duration: 0.8,
                ease: "power1.inOut"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (isLoaded) {
            const exitCtx = gsap.context(() => {
                if (pulseTl.current) {
                    pulseTl.current.kill();
                }
                
                const exitTl = gsap.timeline();
                exitTl.to(textRef.current, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power1.out"
                }).to(containerRef.current, {
                    y: '-100%',
                    duration: 1.5,
                    ease: "expo.inOut",
                    onComplete: () => {
                        if (containerRef.current) containerRef.current.style.display = 'none';
                        // Safety measure: dispatch global refresh to sync ScrollTriggers once overlay is gone
                        window.dispatchEvent(new Event('resize'));
                    }
                });
            }, containerRef);
            return () => exitCtx.revert();
        }
    }, [isLoaded]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 bg-black z-[9999] flex items-center justify-center pointer-events-none"
        >
            <h1
                ref={textRef}
                className="text-white font-anton text-4xl md:text-7xl uppercase tracking-tighter text-center px-4"
            >
                Ipswich Town FC
            </h1>
        </div>
    );
};

export default Preloader;

