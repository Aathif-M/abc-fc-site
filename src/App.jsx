import React, { useEffect, useState, Suspense, lazy } from 'react';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Marquee from './components/Marquee';
import Hero from './components/Hero';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load heavy components below the fold
const About = lazy(() => import('./components/About'));
const Legacy = lazy(() => import('./components/Legacy'));
const Partner = lazy(() => import('./components/Partner'));
const Contact = lazy(() => import('./components/Contact'));
const MatchHub = lazy(() => import('./components/MatchHub'));
const MediaGrid = lazy(() => import('./components/MediaGrid'));
const LatestNews = lazy(() => import('./components/LatestNews'));
const Standings = lazy(() => import('./components/Standings'));
const Squad = lazy(() => import('./components/Squad'));
const Academy = lazy(() => import('./components/Academy'));
const Fans = lazy(() => import('./components/Fans'));

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
            
            {/* Defer heavy operations like GSAP and full React parsing until the Preloader signals app is loaded */}
            {isAppLoaded && (
              <Suspense fallback={<div className="h-[50vh] w-full" />}>
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
              </Suspense>
            )}
          </main>

          <Footer />
        </SmoothScroll>
      </div>
    </ErrorBoundary>
  );
}

export default App;
