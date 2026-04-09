import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { getAssetPath } from '../utils/getAsset';

const logoIpswich = getAssetPath('ipswich') || '';
const logoMillwall = getAssetPath('millwall') || '';
const logoBirmingham = getAssetPath('birmingham') || '';
const logoNorwich = getAssetPath('norwich') || '';
const logoPortsmouth = getAssetPath('portsmouth') || '';

gsap.registerPlugin(ScrollTrigger);

const MatchHub = () => {
    const hubRef = useRef(null);
    const widgetRef = useRef(null);

    // Initial fallback state matching the scraped Concept Data
    const [matchData, setMatchData] = useState({
        lastMatch: {
            home: { name: 'Ipswich Town', logo: logoIpswich },
            away: { name: 'Millwall', logo: logoMillwall },
            score: '1 - 1',
            date: 'Sat, Mar 21',
            competition: 'Championship',
            scorers: { home: "Jack Clarke 41'", away: "Josh Coburn 50'" }
        },
        nextMatch: {
            opponent: 'BIRMINGHAM CITY (H)',
            logo: logoBirmingham,
            date: '2026-04-06T19:30:00',
            dateLabel: 'Mon, Apr 6 • 19:30'
        },
        upcoming: [
            { name: 'Norwich City (A)', logo: logoNorwich, date: 'Sat, Apr 11' },
            { name: 'Portsmouth (A)', logo: logoPortsmouth, date: 'Wed, Apr 15' }
        ]
    });

    const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

    // Dynamic API Fetcher
    useEffect(() => {
        const API_KEY = 'YOUR_API_KEY';
        const IPSWICH_ID = 'YOUR_IPSWICH_ID';

        // Skip fetch if placeholder key is used to prevent layout breakings
        if (API_KEY === 'YOUR_API_KEY' || IPSWICH_ID === 'YOUR_IPSWICH_ID') return;

        const fetchLiveMatches = async () => {
            try {
                // Fetch last match
                const lastRes = await fetch(`https://v3.football.api-sports.io/fixtures?team=${IPSWICH_ID}&last=1`, {
                    headers: { 'x-apisports-key': API_KEY }
                });
                const lastData = await lastRes.json();

                // Fetch next 3 matches
                const nextRes = await fetch(`https://v3.football.api-sports.io/fixtures?team=${IPSWICH_ID}&next=3`, {
                    headers: { 'x-apisports-key': API_KEY }
                });
                const nextData = await nextRes.json();

                if (lastData.response?.length > 0 && nextData.response?.length > 2) {
                    const last = lastData.response[0];
                    const next1 = nextData.response[0];
                    const next2 = nextData.response[1];
                    const next3 = nextData.response[2];

                    setMatchData({
                        lastMatch: {
                            home: { name: last.teams.home.name, logo: last.teams.home.logo },
                            away: { name: last.teams.away.name, logo: last.teams.away.logo },
                            score: `${last.goals.home ?? 0} - ${last.goals.away ?? 0}`,
                            date: new Date(last.fixture.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }),
                            competition: last.league.name,
                            scorers: { home: '', away: '' }
                        },
                        nextMatch: {
                            opponent: next1.teams.home.id.toString() === IPSWICH_ID ? `${next1.teams.away.name} (H)` : `${next1.teams.home.name} (A)`,
                            logo: next1.teams.home.id.toString() === IPSWICH_ID ? next1.teams.away.logo : next1.teams.home.logo,
                            date: next1.fixture.date,
                            dateLabel: new Date(next1.fixture.date).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                        },
                        upcoming: [
                            {
                                name: next2.teams.home.id.toString() === IPSWICH_ID ? `${next2.teams.away.name} (H)` : `${next2.teams.home.name} (A)`,
                                logo: next2.teams.home.id.toString() === IPSWICH_ID ? next2.teams.away.logo : next2.teams.home.logo,
                                date: new Date(next2.fixture.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
                            },
                            {
                                name: next3.teams.home.id.toString() === IPSWICH_ID ? `${next3.teams.away.name} (H)` : `${next3.teams.home.name} (A)`,
                                logo: next3.teams.home.id.toString() === IPSWICH_ID ? next3.teams.away.logo : next3.teams.home.logo,
                                date: new Date(next3.fixture.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
                            }
                        ]
                    });
                }
            } catch (error) {
                console.error("Failed to fetch live match data:", error);
            }
        };

        fetchLiveMatches();
    }, []);

    // Countdown Timer Logic
    useEffect(() => {
        const timer = setInterval(() => {
            const target = new Date(matchData.nextMatch.date);
            const difference = +target - +new Date();

            if (difference > 0) {
                setTimeLeft({
                    d: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    h: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    m: Math.floor((difference / 1000 / 60) % 60),
                    s: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [matchData.nextMatch.date]);

    const standingsWidgetRef = useRef(null);

    // Raw Scoreaxis Widget Execution
    useEffect(() => {
        if (widgetRef.current && widgetRef.current.children.length === 0) {
            // Contextual Fragment powerfully parses HTML precisely as the browser would natively, correctly initiating embedded <script> tags.
            const rawHTML = `<div id="widget-d7wtmn8lld6n" class="scoreaxis-widget" style="width: auto;height: auto;font-size: 14px;background-color: transparent;color: #ffffff;border: none;overflow: auto;"><script src="https://widgets.scoreaxis.com/api/football/live-match/685e3864137246404c0409c2?widgetId=d7wtmn8lld6n&lang=en&lineupsBlock=1&eventsBlock=1&statsBlock=1&links=1&font=heebo&fontSize=14&rowDensity=100&widgetWidth=auto&widgetHeight=auto&bodyColor=%2301152a&textColor=%23ffffff&linkColor=%23ffffff&borderColor=rgba(255,255,255,0.1)&tabColor=%2301152a" async></script><div class="widget-main-link" style="padding: 6px 12px;font-weight: 500;display:none;">Live data by <a href="https://www.scoreaxis.com/" style="color: inherit;">Scoreaxis</a></div></div>`;
            const fragment = document.createRange().createContextualFragment(rawHTML);
            widgetRef.current.appendChild(fragment);
        }

        if (standingsWidgetRef.current && standingsWidgetRef.current.children.length === 0) {
            const rawHTMLStandings = `<div id="widget-9dfdmnrbjujt" class="scoreaxis-widget" style="width: auto;height: auto;font-size: 14px;background-color: transparent;color: #ffffff;border: none;overflow: auto;"><script src="https://widgets.scoreaxis.com/api/football/league-table/623226651944015a9f657040?widgetId=9dfdmnrbjujt&lang=en&teamLogo=1&tableLines=0&homeAway=1&header=1&position=1&goals=1&gamesCount=1&diff=1&winCount=1&drawCount=1&loseCount=1&lastGames=1&points=1&teamsLimit=all&links=1&font=heebo&fontSize=14&rowDensity=100&widgetWidth=auto&widgetHeight=auto&bodyColor=%2301152a&textColor=%23ffffff&linkColor=%23ffffff&borderColor=rgba(255,255,255,0.1)&tabColor=%2301152a" async></script><div class="widget-main-link" style="padding: 6px 12px;font-weight: 500;display:none;">Live data by <a href="https://www.scoreaxis.com/" style="color: inherit;">Scoreaxis</a></div></div>`;
            const fragmentStandings = document.createRange().createContextualFragment(rawHTMLStandings);
            standingsWidgetRef.current.appendChild(fragmentStandings);
        }
    }, []);

    // GSAP Animation
    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(hubRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: hubRef.current,
                        start: "top 95%",
                    }
                }
            );
        }, hubRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={hubRef} className="w-full bg-[#021A38] py-8 md:py-12 text-white relative z-20 shadow-2xl border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col gap-10">

                {/* Top Statistics Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

                    {/* Left: Last Result */}
                    <div className="flex flex-col border-b md:border-b-0 md:border-r border-white/30 pb-6 md:pb-0 md:pr-8 w-full font-sans max-w-sm mx-auto md:mx-0">
                        <div className="flex w-full justify-between text-white/80 text-xs sm:text-sm mb-6 font-medium">
                            <span className="text-[#8ab4f8] drop-shadow-sm">{matchData.lastMatch.competition} <span className="text-white/50 px-1">•</span> {matchData.lastMatch.date}</span>
                            <span className="text-white font-bold drop-shadow-sm">Full-time</span>
                        </div>

                        <div className="flex w-full items-center justify-between px-2">
                            {/* Home Team */}
                            <div className="flex flex-col items-center gap-3 w-[80px]">
                                <img src={matchData.lastMatch.home.logo} alt={matchData.lastMatch.home.name} className="w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-md" />
                                <span className="font-normal text-[0.95rem] tracking-wide text-center pt-2 leading-tight">{matchData.lastMatch.home.name}</span>
                            </div>

                            {/* Score */}
                            <div className="flex items-center justify-center gap-3 md:gap-6">
                                <span className="text-4xl md:text-5xl font-bold leading-none tracking-tighter drop-shadow-md">{matchData.lastMatch.score.split('-')[0]?.trim()}</span>
                                <span className="text-3xl font-light text-white/70 leading-none pb-2">-</span>
                                <span className="text-4xl md:text-5xl font-bold leading-none tracking-tighter drop-shadow-md">{matchData.lastMatch.score.split('-')[1]?.trim()}</span>
                            </div>

                            {/* Away Team */}
                            <div className="flex flex-col items-center gap-3 w-[80px]">
                                <img src={matchData.lastMatch.away.logo} alt={matchData.lastMatch.away.name} className="w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-lg" />
                                <span className="font-normal text-[0.95rem] tracking-wide text-center pt-2 leading-tight">{matchData.lastMatch.away.name}</span>
                            </div>
                        </div>

                        {/* Goalscorers (Only rendered if present in fallback currently) */}
                        {matchData.lastMatch.scorers.home && (
                            <div className="flex w-full justify-between items-center text-xs sm:text-sm text-white/90 mt-8 pt-4 border-t border-white/20">
                                <span className="font-medium drop-shadow-sm">{matchData.lastMatch.scorers.home}</span>
                                <svg className="w-4 h-4 text-brand-gold drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2A10 10 0 1 0 22 12 10 10 0 0 0 12 2Zm0 2a8 8 0 0 1 4.54 1.4A8.72 8.72 0 0 0 12 6.5a8.72 8.72 0 0 0-4.54-1.1A8 8 0 0 1 12 4Zm-6.57 3A8.61 8.61 0 0 1 9.8 8.1 8.71 8.71 0 0 0 10 11.5a8.7 8.7 0 0 0-4.7 1.8A8 8 0 0 1 5.43 7Zm2.27 10.6A8.7 8.7 0 0 0 11 15.5V13a8.7 8.7 0 0 0-4.2-1 8.71 8.71 0 0 0-1.8 4.6 8 8 0 0 1 2.7 1ZM12 20a8 8 0 0 1-2.5-.4 8.6 8.6 0 0 1 2.5-3.1 8.6 8.6 0 0 1 2.5 3.1A8 8 0 0 1 12 20Zm4.3-2.4a8.71 8.71 0 0 0-1.8-4.6A8.7 8.7 0 0 0 13 13v2.5a8.7 8.7 0 0 0 3.3 2.1ZM18.7 13.3A8.7 8.7 0 0 0 14 11.5a8.71 8.71 0 0 0 .2-3.4 8.61 8.61 0 0 1 4.37-1.1A8 8 0 0 1 18.7 13.3Z" />
                                </svg>
                                <span className="font-medium drop-shadow-sm">{matchData.lastMatch.scorers.away}</span>
                            </div>
                        )}
                    </div>

                    {/* Center: Next Fixture */}
                    <div className="flex flex-col items-center space-y-3">
                        <span className="text-brand-gold font-anton tracking-widest text-sm uppercase">Next Fixture</span>
                        <div className="font-bold text-xl md:text-2xl tracking-wide uppercase text-center flex flex-col items-center">
                            <div className="flex items-center gap-3 mb-1">
                                <img src={matchData.nextMatch.logo} alt="Opponent" className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-md" />
                                <span>{matchData.nextMatch.opponent}</span>
                            </div>
                            <span className="text-sm font-bold text-brand-gold font-sans tracking-normal mt-1 uppercase">{matchData.nextMatch.dateLabel}</span>
                        </div>
                        <div className="flex gap-4 border border-white/30 bg-black/40 rounded-lg p-3 shadow-md">
                            <div className="text-center min-w-[50px]">
                                <span className="block text-2xl font-anton tracking-wider text-white">{timeLeft.d}</span>
                                <span className="text-[0.6rem] uppercase tracking-widest text-white/80">Days</span>
                            </div>
                            <div className="text-center min-w-[50px]">
                                <span className="block text-2xl font-anton tracking-wider text-white">{timeLeft.h}</span>
                                <span className="text-[0.6rem] uppercase tracking-widest text-white/80">Hrs</span>
                            </div>
                            <div className="text-center min-w-[50px]">
                                <span className="block text-2xl font-anton tracking-wider text-white">{timeLeft.m}</span>
                                <span className="text-[0.6rem] uppercase tracking-widest text-white/80">Mins</span>
                            </div>
                            <div className="text-center min-w-[50px]">
                                <span className="block text-2xl font-anton tracking-wider text-white">{timeLeft.s}</span>
                                <span className="text-[0.6rem] uppercase tracking-widest text-white/80">Secs</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Upcoming */}
                    <div className="flex flex-col items-center md:items-start space-y-2 border-t md:border-t-0 md:border-l border-white/30 pt-6 md:pt-0 md:pl-8 w-full relative h-[100%]">
                        <span className="text-brand-gold font-anton tracking-widest text-sm uppercase mb-3">Upcoming Focus</span>
                        <div className="flex flex-col w-full gap-3 font-sans h-full justify-center">
                            {matchData.upcoming.map((match, idx) => (
                                <div key={idx} className="flex justify-between items-center bg-black/40 px-3 py-3 md:px-4 rounded-lg border border-white/10 hover:border-brand-gold transition-colors cursor-pointer group shadow-md">
                                    <div className="flex items-center gap-3">
                                        <img src={match.logo} alt={match.name} className="w-6 h-6 md:w-7 md:h-7 object-contain drop-shadow-md" />
                                        <span className="font-bold text-white group-hover:text-brand-gold transition-colors text-sm md:text-base">{match.name}</span>
                                    </div>
                                    <span className="text-xs text-white bg-black/60 px-2 py-1 rounded whitespace-nowrap ml-2 uppercase shadow-inner">{match.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Bottom Widgets Row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-white/30 pt-8 mt-4">
                    <div className="lg:col-span-5 bg-black/40 p-6 rounded-xl border border-white/20 shadow-lg">
                        <h3 className="text-brand-gold font-anton tracking-widest text-sm uppercase mb-6 flex items-center gap-2 drop-shadow-md">
                            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
                            Match Data
                        </h3>
                        {/* Raw Scoreaxis Widget Container */}
                        <div className="w-full bg-black/20 rounded-md p-1 shadow-inner border border-white/5 overflow-hidden" ref={widgetRef}></div>
                    </div>

                    <div className="lg:col-span-7 bg-black/40 p-6 flex flex-col rounded-xl border border-white/20 shadow-lg">
                        <h3 className="text-brand-gold font-anton tracking-widest text-sm uppercase mb-6 flex items-center gap-2 drop-shadow-md">
                            <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
                            Current Standings
                        </h3>
                        <div className="w-full flex-grow bg-black/20 rounded-md p-1 shadow-inner border border-white/5 overflow-hidden" ref={standingsWidgetRef}></div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default MatchHub;
