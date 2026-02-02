import React from 'react';

const PlaceholderImage = ({ label, className = "", style = {} }) => {
    return (
        <div
            className={`relative w-full h-full bg-neutral-900 border-2 border-dashed border-neutral-700 flex flex-col items-center justify-center text-neutral-500 font-mono text-sm uppercase tracking-widest p-6 hover:bg-neutral-800 transition-colors duration-300 ${className}`}
            style={style}
        >
            <span className="mb-2 opacity-50 text-3xl">📷</span>
            <span>{label || "INSERT: Image"}</span>
        </div>
    );
};

export default PlaceholderImage;
