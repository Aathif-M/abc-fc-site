import React, { useEffect, useState } from 'react';
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

// Assets
import { getAssetPath } from './utils/getAsset';
const img1 = getAssetPath('ipswich-team');
const img2 = getAssetPath('marcelino-nunez');
const img3 = getAssetPath('leif-davis');
const img4 = getAssetPath('ipswich-legacy');
const img5 = getAssetPath('sam-morsy');
const img6 = getAssetPath('kieran-mckenna');


function App() {
  const [isAppLoaded, setIsAppLoaded] = useState(false);

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

      // Increased minimum delay to ensure smooth transition and allow preloading of heavy modules
      const minimumWait = new Promise(resolve => setTimeout(resolve, 3500));

      await Promise.all([...imagePromises, minimumWait]);
      setIsAppLoaded(true);
    };

    preloadImages();
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-black text-white selection:bg-brand-red selection:text-white">
        <CustomCursor />
        <Preloader isLoaded={isAppLoaded} />

        <div className="noise-overlay" />
        <div className="vignette-overlay" />

        <SmoothScroll>
          <main className="relative z-10 w-full">
            <div id="hero"><Hero /></div>
            
            {/* Defer heavy operations like GSAP and full React parsing until the Preloader signals app is loaded. We avoid Suspense/Lazy to ensure DOM geometry is explicitly painted all at once for strict GSAP Pin positioning. */}
            {isAppLoaded && (
              <>
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
              </>
            )}
          </main>

          <Footer />
        </SmoothScroll>
      </div>
    </ErrorBoundary>
  );
}

export default App;
