import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Import Partner Logos
import { getAssetPath } from '../utils/getAsset';
const principalPartnerLogo = getAssetPath('logo-dark');
const sponsors = [
    { id: 1, name: "MSC", logo: getAssetPath("msc") },
    { id: 2, name: "Umbro", logo: getAssetPath("umbro") },
    { id: 3, name: "Fleximize", logo: getAssetPath("fleximize") },
    { id: 4, name: "University of Suffolk", logo: getAssetPath("university-of-suffolk") },
    { id: 5, name: "Birketts", logo: getAssetPath("birketts") },
    { id: 6, name: "Achilleus Security", logo: getAssetPath("achilleus") },
    { id: 7, name: "Greene King", logo: getAssetPath("greene-king") },
    { id: 8, name: "IFX Payments", logo: getAssetPath("ifx") },
    { id: 9, name: "Unilumin", logo: getAssetPath("unilumin") },
    { id: 10, name: "8Xbet", logo: getAssetPath("8xbet") },
    { id: 11, name: "S&P Global", logo: getAssetPath("sp-global") },
    { id: 12, name: "Edison House Group", logo: getAssetPath("edison-house") },
    { id: 13, name: "Sportfive", logo: getAssetPath("sportfive") },
    { id: 14, name: "Lucozade", logo: getAssetPath("lucozade") },
    { id: 15, name: "Nuffield Health", logo: getAssetPath("nuffield") },
    { id: 16, name: "MatchWornShirt", logo: getAssetPath("matchwornshirt") },
];

const Partner = () => {
    const marqueeRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const marqueeElements = marqueeRef.current.children;

            gsap.to(marqueeElements, {
                xPercent: -100,
                ease: "none",
                duration: 30,
                repeat: -1,
                modifiers: {
                    xPercent: gsap.utils.wrap(-100, 0)
                }
            });
        }, marqueeRef);
        return () => ctx.revert();
    }, []);

    return (
        <section className="bg-white py-26 border-t border-b border-gray-200 overflow-hidden relative" id="partner">
            <div className="max-w-7xl mx-auto px-4 md:px-12 mb-12 flex flex-col md:flex-row items-center justify-between gap-8">

                {/* Principal Partner Card */}
                <div className="w-full md:w-1/3 flex flex-col items-center md:items-start relative z-10 bg-gray-50 p-8 rounded-xl border-2 border-brand-blue shadow-lg">
                    <span className="text-brand-red font-anton tracking-widest uppercase text-sm mb-4 block">
                        Principal Partner
                    </span>
                    {/* INSERT PRINCIPAL PARTNER LINK HERE */}
                    <a
                        href="https://easymarkets.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full hover:scale-105 transition-transform duration-300"
                    >
                        <img
                            src={principalPartnerLogo}
                            alt="Principal Partner Logo"
                            className="w-75 h-auto object-contain mb-6 mx-auto md:mx-0 filter transition-all duration-500"
                            style={{ maxHeight: '200px' }}
                        />
                    </a>
                    <button className="text-brand-navy font-bold text-xs uppercase tracking-widest border-b-2 border-brand-blue hover:text-brand-blue transition-colors pb-1">
                        Learn More
                    </button>
                </div>

                {/* Vertical Divider (Desktop) */}
                <div className="hidden md:block w-px h-32 bg-gray-300 mx-8"></div>

                {/* Horizontal Divider (Mobile) */}
                <div className="md:hidden w-full h-px bg-gray-300 my-2"></div>

                {/* Title for regular sponsors */}
                <div className="w-full md:w-auto text-center md:text-left">
                    <h3 className="text-brand-navy font-anton lg:text-3xl text-2xl uppercase tracking-tighter">
                        Commercial Partners
                    </h3>
                    <p className="text-gray-500 text-sm mt-2">Proud supporters of Ipswich Town</p>
                </div>
            </div>

            {/* Marquee Scroller */}
            <div className="flex overflow-hidden whitespace-nowrap transition-opacity duration-500" ref={marqueeRef}>
                {/* We need two sets of the items to create a seamless loop */}
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex gap-16 md:gap-32 items-center px-8 md:px-16 min-w-full justify-around flex-shrink-0">
                        {sponsors.map((sponsor) => (
                            <img
                                key={`${i}-${sponsor.id}`}
                                src={sponsor.logo}
                                alt={sponsor.name}
                                className="h-22 w-auto object-contain transition-all duration-300"
                                onError={(e) => e.target.style.display = 'none'}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Partner;
