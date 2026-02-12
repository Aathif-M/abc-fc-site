import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // Hide default cursor
        document.body.style.cursor = 'none';

        const onMouseMove = (e) => {
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
        };

        // Add magnetic effect listeners
        const onMouseEnter = () => setIsHovering(true);
        const onMouseLeave = () => setIsHovering(false);

        const hoverables = document.querySelectorAll('a, button, .hover-trigger');

        hoverables.forEach(el => {
            el.addEventListener('mouseenter', onMouseEnter);
            el.addEventListener('mouseleave', onMouseLeave);
            el.style.cursor = 'none'; // Ensure elements don't show default cursor
        });

        window.addEventListener('mousemove', onMouseMove);

        return () => {
            document.body.style.cursor = 'auto';
            window.removeEventListener('mousemove', onMouseMove);
            hoverables.forEach(el => {
                el.removeEventListener('mouseenter', onMouseEnter);
                el.removeEventListener('mouseleave', onMouseLeave);
            });
        };
    }, []);

    useEffect(() => {
        if (isHovering) {
            gsap.to(cursorRef.current, {
                scale: 3,
                mixBlendMode: 'difference',
                duration: 0.3
            });
        } else {
            gsap.to(cursorRef.current, {
                scale: 1,
                mixBlendMode: 'difference',
                duration: 0.3
            });
        }
    }, [isHovering]);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2"
        />
    );
};

export default CustomCursor;
