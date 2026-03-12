import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Marquee from './components/Marquee';
import Hero from './components/Hero';
import About from './components/About';
import Legacy from './components/Legacy';
import Partner from './components/Partner';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import MatchHub from './components/MatchHub';
import MediaGrid from './components/MediaGrid';
import LatestNews from './components/LatestNews';
import Standings from './components/Standings';
import Squad from './components/Squad';
import ErrorBoundary from './components/ErrorBoundary';

// Assets
import img1 from './assets/ipswich-team.jpg';
import img2 from './assets/omari-hutchinson.jpg';
import img3 from './assets/leif-davis.jpg';
import img4 from './assets/ipswich-legacy.jpg';
import img5 from './assets/sam-morsy.jpg';
import img6 from './assets/kieran-mckenna.jpg';


function App() {
  const [loading, setLoading] = useState(true);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      const images = [img1, img2, img3, img4, img5, img6];

      const imagePromises = images.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve; // Continue even if error
        });
      });

      // Simple timeout for video or other non-criticals
      // We can also try to fetch the video blob, but for a landing page, just ensuring images are ready is usually enough to stop layout shift.
      // Let's add a minimum delay to ensure smooth transition
      const minimumWait = new Promise(resolve => setTimeout(resolve, 2000));

      await Promise.all([...imagePromises, minimumWait]);
      setAssetsLoaded(true);
    };

    preloadImages();
  }, []);

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
            <MatchHub />
            <MediaGrid />
            <LatestNews />
            <Marquee />
            <Navbar />
            <div id="about"><About /></div>
            <Standings />
            <div id="legacy"><Squad /></div>
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
