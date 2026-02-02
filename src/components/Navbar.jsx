import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Navbar = () => {
    const navRef = useRef(null);
    const bgRef = useRef(null);

    const links = [
        { name: "Home", id: "hero" },
        { name: "About", id: "about" },
        { name: "Legacy", id: "legacy" },
        { name: "Partners", id: "partner" }, // Match component name/id
        { name: "Contact", id: "contact" },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: navRef.current,
                start: "top top", // When top of nav hits top of viewport
                end: 99999, // Forever
                onUpdate: (self) => {
                    // Start of 'stickiness'
                    if (self.progress > 0 && self.direction >= 0) {
                        // We rely on simple class toggle or state? 
                        // Actually scrollTrigger.isActive works if we set end to max.
                    }
                },
                onToggle: (self) => {
                    // self.isActive is true when we are past the start point
                    if (self.isActive) {
                        gsap.to(bgRef.current, {
                            opacity: 1,
                            backdropFilter: "blur(12px)",
                            duration: 0.5
                        });
                        gsap.to(navRef.current, {
                            paddingTop: "1rem",
                            paddingBottom: "1rem",
                            duration: 0.3
                        });
                    } else {
                        gsap.to(bgRef.current, {
                            opacity: 0,
                            backdropFilter: "blur(0px)",
                            duration: 0.5
                        });
                        gsap.to(navRef.current, {
                            paddingTop: "1.5rem",
                            paddingBottom: "1.5rem",
                            duration: 0.3
                        });
                    }
                }
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <nav
            ref={navRef}
            className="sticky top-0 z-50 w-full py-6 transition-all"
        >
            {/* Animated Background */}
            <div
                ref={bgRef}
                className="absolute inset-0 bg-black/80 opacity-0 border-b border-white/10"
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 flex justify-between items-center">
                {/* Logo */}
                <div
                    className="text-2xl font-black tracking-tighter uppercase cursor-pointer hover:text-brand-gold transition-colors"
                    onClick={() => scrollToSection('hero')}
                >
                    ABC FC
                </div>

                {/* Links */}
                <ul className="hidden md:flex space-x-8">
                    {links.map((link) => (
                        <li key={link.name}>
                            <button
                                onClick={() => scrollToSection(link.id)}
                                className="text-xs font-bold uppercase tracking-[0.2em] hover:text-brand-gold transition-colors"
                            >
                                {link.name}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button (Placeholder) */}
                <button className="md:hidden text-xs font-bold uppercase tracking-widest border border-white px-4 py-2">
                    Menu
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
