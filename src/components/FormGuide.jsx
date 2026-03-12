import React from 'react';

const FormGuide = () => {
    // Recent form data: W, W, D, W, W (Fictional good run)
    const form = [
        { result: 'W', opponent: 'MCI', score: '2-1', color: 'bg-brand-blue' },
        { result: 'W', opponent: 'TOT', score: '3-2', color: 'bg-brand-blue' },
        { result: 'D', opponent: 'AVL', score: '1-1', color: 'bg-gray-500' },
        { result: 'W', opponent: 'MUN', score: '1-0', color: 'bg-brand-blue' },
        { result: 'W', opponent: 'CHE', score: '2-0', color: 'bg-brand-blue' },
    ];

    return (
        <div className="absolute bottom-8 right-8 z-30 hidden md:block">
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2 text-right">Recent Form</h3>
            <div className="flex gap-2">
                {form.map((match, index) => (
                    <div key={index} className="group relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${match.color} border border-white/20 shadow-lg cursor-default hover:scale-110 transition-transform`}>
                            {match.result}
                        </div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max px-3 py-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            vs {match.opponent} ({match.score})
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FormGuide;
