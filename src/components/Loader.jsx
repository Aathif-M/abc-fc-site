import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => onComplete && onComplete()
        });

        tl.fromTo(textRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        )
            .to(textRef.current,
                { opacity: 0, scale: 1.2, duration: 0.5, delay: 0.5, ease: "power2.in" }
            )
            .to(containerRef.current,
                { yPercent: -100, duration: 0.8, ease: "power4.inOut" }
            );

    }, [onComplete]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-50 bg-black flex items-center justify-center">
            <h1 ref={textRef} className="text-6xl md:text-8xl font-black text-white tracking-tighter">
                ABC FC
            </h1>
        </div>
    );
};

export default Loader;
