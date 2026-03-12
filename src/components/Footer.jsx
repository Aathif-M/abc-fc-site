import React from 'react';
import { Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#050b14] text-white py-16 px-6 border-t border-brand-blue/30 overflow-hidden relative">
            {/* Subtle background noise/texture can be applied via global css if needed, but styling is solid here */}
            
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                {/* Column 1: Brand & Socials */}
                <div className="flex flex-col">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/en/4/43/Ipswich_Town.svg" 
                        alt="Ipswich Town FC" 
                        className="h-20 w-auto object-contain mb-6 self-start"
                    />
                    <p className="text-gray-400 text-sm mb-8 max-w-xs">
                        Portman Road, Ipswich, Suffolk, IP1 2DA
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-blue transition-colors text-white border border-white/10">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                            </svg>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-blue transition-colors text-white border border-white/10">
                            <Instagram size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-blue transition-colors text-white border border-white/10">
                            <Youtube size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-blue transition-colors text-white border border-white/10">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.64-5.46-.02-.33-.02-.66-.02-.99 0-3.32-.01-6.64.01-9.97h4.14c.04 1.83.02 3.66.01 5.49-.01 1.54 1.25 2.87 2.78 2.83 1.5-.04 2.68-1.32 2.67-2.82.02-3.95.01-7.91.01-11.87zm-7.79 9.9c0 3.32.01 6.64-.01 9.97-.02 1.94 1.27 3.68 3.12 4.1 1.61.35 3.31-.04 4.54-1.09 1.4-1.16 2.19-2.91 2.15-4.75 0-3.32-.01-6.64.01-9.97.02-.31 0-.62-.02-.92H10.4c0 1.91.02 3.82-.01 5.73-.04 1.25-.8 2.39-1.95 2.72-1.28.37-2.73-.08-3.48-1.17-.46-.66-.69-1.47-.65-2.29-.01-1.66 0-3.33-.01-4.99H4.73z" clipRule="evenodd"></path>
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Column 2: Teams & Matches */}
                <div>
                    <h3 className="font-anton uppercase tracking-[0.15em] mb-6 text-brand-gold text-lg">Teams & Matches</h3>
                    <ul className="space-y-3 text-gray-300 font-sans text-sm">
                        <li><a href="#" className="hover:text-white hover:pl-2 transition-all">First Team</a></li>
                        <li><a href="#" className="hover:text-white hover:pl-2 transition-all">Academy U21s</a></li>
                        <li><a href="#" className="hover:text-white hover:pl-2 transition-all">Women's Team</a></li>
                        <li><a href="#" className="hover:text-white hover:pl-2 transition-all">Fixtures & Results</a></li>
                        <li><a href="#" className="hover:text-white hover:pl-2 transition-all">League Table</a></li>
                    </ul>
                </div>

                {/* Column 3: News & Media */}
                <div>
                    <h3 className="font-anton uppercase tracking-[0.15em] mb-6 text-brand-gold text-lg">News & Media</h3>
                    <ul className="space-y-3 text-gray-300 font-sans text-sm">
                        <li><a href="#" className="hover:text-white hover:pl-2 transition-all">Latest News</a></li>
                        <li><a href="#" className="hover:text-white hover:pl-2 transition-all">Town TV</a></li>
                        <li><a href="#" className="hover:text-white hover:pl-2 transition-all">Interviews</a></li>
                        <li><a href="#" className="hover:text-white hover:pl-2 transition-all">Match Highlights</a></li>
                        <li><a href="#" className="hover:text-white hover:pl-2 transition-all">Galleries</a></li>
                    </ul>
                </div>

                {/* Column 4: Club Info */}
                <div>
                    <h3 className="font-anton uppercase tracking-[0.15em] mb-6 text-brand-gold text-lg">Club Info</h3>
                    <ul className="space-y-3 text-gray-300 font-sans text-sm">
                        <li><a href="#" className="hover:text-white hover:pl-2 transition-all">History & Legacy</a></li>
                        <li><a href="#" className="hover:text-white hover:pl-2 transition-all">Portman Road</a></li>
                        <li><a href="#" className="hover:text-white hover:pl-2 transition-all">Contact Us</a></li>
                        <li><a href="#" className="hover:text-white hover:pl-2 transition-all">Safeguarding</a></li>
                        <li><a href="#" className="hover:text-white hover:pl-2 transition-all">Careers</a></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Strip */}
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs font-sans tracking-wide relative z-10">
                <p>&copy; 2026 Ipswich Town Football Club. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0 uppercase tracking-widest font-bold">
                    <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-brand-gold transition-colors">Terms & Conditions</a>
                    <a href="#" className="hover:text-brand-gold transition-colors">Cookies</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
