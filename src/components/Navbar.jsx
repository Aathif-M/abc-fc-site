import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    const navRef = useRef(null);

    const topLinks = ["Tickets", "Shop", "iFollow/TV", "Login"];
    const mainLinks = [
        { name: "News", id: "news" },
        { name: "Matches", id: "matches" },
        { name: "First Team", id: "squad" },
        { name: "Academy", id: "academy" },
        { name: "Club", id: "club" },
        { name: "Fans", id: "fans" },
        { name: "Partners", id: "partner" },
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
                trigger: document.body,
                start: "top -50",
                end: 99999,
                onToggle: (self) => {
                    if (self.isActive && navRef.current) {
                        gsap.to(navRef.current, {
                            backgroundColor: "rgba(2, 31, 89, 0.85)", // brand-navy semi-transparent
                            backdropFilter: "blur(12px)",
                            borderBottomColor: "rgba(255, 255, 255, 0.1)",
                            duration: 0.3
                        });
                    } else if (navRef.current) {
                        gsap.to(navRef.current, {
                            backgroundColor: "transparent",
                            backdropFilter: "blur(0px)",
                            borderBottomColor: "transparent",
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
            className="fixed top-0 left-0 w-full z-50 transition-colors border-b border-transparent"
        >
            {/* Top thin bar */}
            <div className="bg-black/40 border-b border-white/5 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 md:px-12 flex justify-end items-center h-8">
                    <ul className="flex space-x-6 text-[10px] font-bold uppercase tracking-widest text-gray-300">
                        {topLinks.map((link) => (
                            <li key={link}>
                                <a href="#" className="hover:text-white transition-colors">{link}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Main bar */}
            <div className="max-w-7xl mx-auto px-4 md:px-12 flex justify-between items-center h-20">
                {/* Logo */}
                <div
                    className="cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
                    onClick={() => scrollToSection('hero')}
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/en/4/43/Ipswich_Town.svg"
                        alt="Ipswich Town FC"
                        className="h-14 w-auto drop-shadow-2xl"
                    />
                </div>

                {/* Main Links */}
                <ul className="hidden md:flex space-x-8 -mr-4 lg:mr-0 lg:space-x-10">
                    {mainLinks.map((link) => (
                        <li key={link.name}>
                            <button
                                onClick={() => scrollToSection(link.id)}
                                className="text-sm font-bold uppercase tracking-[0.15em] hover:text-brand-gold transition-colors font-sans"
                            >
                                {link.name}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-xs font-bold uppercase tracking-widest border border-white px-4 py-2 hover:bg-white hover:text-brand-navy transition-colors">
                    Menu
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
