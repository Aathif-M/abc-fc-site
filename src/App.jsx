import React, { useEffect } from 'react';
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
import Academy from './components/Academy';
import Fans from './components/Fans';
import ErrorBoundary from './components/ErrorBoundary';

// Assets
import { getAssetPath } from './utils/getAsset';
const img1 = getAssetPath('ipswich-team');
const img2 = getAssetPath('marcelino-nunez');
const img3 = getAssetPath('leif-davis');
const img4 = getAssetPath('ipswich-legacy');
const img5 = getAssetPath('sam-morsy');
const img6 = getAssetPath('kieran-mckenna');


function App() {
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
