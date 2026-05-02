/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Scene } from './components/Scene';
import { Loader } from './components/Loader';
import { FloatingContacts } from './components/FloatingContacts';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative bg-[#F7F3F0] min-h-screen text-[#2C2A28] selection:bg-[#A0AD77]/30">
      {/* Film Grain Overlay - Optimized for performance without mix-blend-difference */}
      <div 
        className="pointer-events-none fixed inset-0 z-[100] opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      
      <AnimatePresence>
        {isLoading && <Loader key="loader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Scene />
      <FloatingContacts />
    </div>
  );
}
