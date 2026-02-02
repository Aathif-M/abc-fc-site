import React, { forwardRef } from 'react';
import goalSVG from '../assets/goal.svg';

const Goal = forwardRef((props, ref) => {
    return (
        <div ref={ref} className="absolute bottom-0 left-0 w-32 h-32 z-10 opacity-80" {...props}>
            <img
                src={goalSVG}
                alt="Football"
                className="w-full h-full object-contain"
            />
        </div>
    );
});

export default Goal;
