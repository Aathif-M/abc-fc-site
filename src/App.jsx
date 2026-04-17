import React from 'react';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Marquee from './components/Marquee';
import Hero from './components/Hero';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

// Synchronous imports to ensure GSAP ScrollTrigger measures solid DOM heights accurately
import About from './components/About';
import Partner from './components/Partner';
import Contact from './components/Contact';
import MatchHub from './components/MatchHub';
import MediaGrid from './components/MediaGrid';
import LatestNews from './components/LatestNews';
import Standings from './components/Standings';
import Squad from './components/Squad';
import Academy from './components/Academy';
import Fans from './components/Fans';

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-black text-white selection:bg-brand-red selection:text-white">
        <CustomCursor />
        <Preloader />

        <div className="noise-overlay" />
        <div className="vignette-overlay" />

        <SmoothScroll>
          <main className="relative z-10 w-full">
            <div id="hero"><Hero /></div>
            
            <div id="matches">
              <MatchHub />
              <Standings />
            </div>
            <MediaGrid />
            <div id="news"><LatestNews /></div>
            <Marquee />
            <Navbar />
            <div id="academy"><Academy /></div>
            <div id="club"><About /></div>
            <div id="squad"><Squad /></div>
            <div id="fans"><Fans /></div>
            <div id="partner">
              <Partner />
            </div>
            <div id="contact"><Contact /></div>
          </main>

          <Footer />
        </SmoothScroll>
      </div>
    </ErrorBoundary>
  );
}

export default App;
