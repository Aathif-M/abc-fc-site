import React from 'react';

const LeagueTable = () => {
    const table = [
        { pos: 1, team: 'Ipswich Town', p: 3, pts: 9 }, // Optimistic!
        { pos: 2, team: 'Man City', p: 3, pts: 7 },
        { pos: 3, team: 'Arsenal', p: 3, pts: 7 },
        { pos: 4, team: 'Liverpool', p: 3, pts: 6 },
        { pos: 5, team: 'Newcastle', p: 3, pts: 6 },
    ];

    return (
        <div className="bg-brand-navy/60 backdrop-blur-md border border-white/10 p-6 rounded-xl max-w-sm w-full shadow-2xl">
            <h3 className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-4 flex justify-between">
                <span>Premier League</span>
                <span>24/25</span>
            </h3>

            <div className="space-y-2">
                <div className="flex text-xs text-gray-400 border-b border-white/10 pb-2 mb-2">
                    <span className="w-8 text-center">Pos</span>
                    <span className="flex-1">Club</span>
                    <span className="w-8 text-center">Pl</span>
                    <span className="w-8 text-center font-bold">Pts</span>
                </div>

                {table.map((row) => (
                    <div
                        key={row.team}
                        className={`flex items-center text-sm py-2 rounded px-2 ${row.team === 'Ipswich Town' ? 'bg-brand-blue text-white font-bold' : 'text-gray-300'}`}
                    >
                        <span className="w-6 text-center">{row.pos}</span>
                        <span className="flex-1 truncate">{row.team}</span>
                        <span className="w-8 text-center opacity-70">{row.p}</span>
                        <span className="w-8 text-center font-bold">{row.pts}</span>
                    </div>
                ))}
            </div>

            <div className="mt-4 text-center">
                <a href="#" className="text-xs text-brand-red font-bold uppercase tracking-widest hover:text-white transition-colors">
                    View Full Table →
                </a>
            </div>
        </div>
    );
};

export default LeagueTable;
