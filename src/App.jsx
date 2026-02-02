import React, { useState } from 'react';
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

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-brand-red selection:text-white">
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <SmoothScroll>
        <FloatingBall />
        <main className="relative z-10">
          <Hero />
          <About />
          <Legacy />
          <Partner>
            <Goal />
          </Partner>
          <Contact />
        </main>

        <Footer />
      </SmoothScroll>
    </div>
  );
}

export default App;
