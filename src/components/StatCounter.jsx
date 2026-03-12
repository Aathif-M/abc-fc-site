import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const StatCounter = ({ label, value, suffix = '' }) => {
    const counterRef = useRef(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: counterRef.current,
                start: "top 80%",
                once: true,
                onEnter: () => {
                    // Animate a dummy object to update state
                    const target = { val: 0 };
                    gsap.to(target, {
                        val: value,
                        duration: 2,
                        ease: "power2.out",
                        onUpdate: () => {
                            setCount(Math.ceil(target.val));
                        }
                    });
                }
            });
        }, counterRef);
        return () => ctx.revert();
    }, [value]);

    return (
        <div ref={counterRef} className="text-center p-4">
            <div className="text-5xl md:text-7xl font-anton text-white mb-2 leading-none">
                {count}{suffix}
            </div>
            <div className="text-brand-gold text-xs font-bold uppercase tracking-widest">
                {label}
            </div>
        </div>
    );
};

export default StatCounter;
