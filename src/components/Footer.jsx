import React from 'react';
import { Twitter, Instagram, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-neutral-900 text-white py-16 px-6 border-t border-neutral-800">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand */}
                <div className="md:col-span-2">
                    <h2 className="text-3xl font-black tracking-tighter mb-6">ABC FC</h2>
                    <p className="text-gray-400 max-w-xs mb-8">
                        The Pride of the City. Bringing fans together since 1923.
                    </p>
                    <div className="flex gap-4">
                        {[Twitter, Instagram, Facebook, Youtube].map((Icon, i) => (
                            <a key={i} href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-brand-red transition-colors text-white">
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h3 className="font-bold uppercase tracking-widest mb-6 text-sm text-gray-500">Club</h3>
                    <ul className="space-y-4 text-gray-300">
                        <li><a href="#" className="hover:text-white transition-colors">First Team</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Academy</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Shop</a></li>
                    </ul>
                </div>

                {/* Partner */}
                <div>
                    <h3 className="font-bold uppercase tracking-widest mb-6 text-sm text-gray-500">Partners</h3>
                    <ul className="space-y-4 text-gray-300">
                        <li>
                            <a href="#" className="hover:text-brand-gold transition-colors flex items-center gap-2">
                                Main Sponsor
                                <span className="text-xs bg-brand-gold text-amber-300 px-2 py-0.5 rounded-sm font-bold">PREMIUM</span>
                            </a>
                        </li>
                        <li><a href="#" className="hover:text-white transition-colors">Kit Supplier</a></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                <p>&copy; 2024 ABC Football Club. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
