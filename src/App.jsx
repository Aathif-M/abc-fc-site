import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Hero from './components/Hero';
import About from './components/About';
import Legacy from './components/Legacy';
import Partner from './components/Partner';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import FloatingBall from './components/FloatingBall';
import Goal from './components/Goal';
import Navbar from './components/Navbar';

// Assets
import img1 from './assets/teams_celebrate.jpg';
import img2 from './assets/lifting_trophy.jpg';
import img3 from './assets/team_huddle.jpg';
import img4 from './assets/historic_trophy.jpg';
import img5 from './assets/training_session.jpg';
import img6 from './assets/youth_academy.jpg';


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
    <div className="min-h-screen bg-black text-white selection:bg-brand-red selection:text-white">
      {loading && <Loader assetsLoaded={assetsLoaded} onComplete={() => setLoading(false)} />}

      <SmoothScroll>
        <FloatingBall />
        <main className="relative z-10">
          <div id="hero"><Hero /></div>
          <Navbar />
          <div id="about"><About /></div>
          <div id="legacy"><Legacy /></div>
          <div id="partner">
            <Partner>
              <Goal />
            </Partner>
          </div>
          <div id="contact"><Contact /></div>
        </main>

        <Footer />
      </SmoothScroll>
    </div>
  );
}

export default App;
