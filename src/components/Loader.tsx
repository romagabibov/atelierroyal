import { motion } from 'motion/react';
import { useEffect } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  useEffect(() => {
    // Prevent scrolling during loading screen
    document.body.style.overflow = 'hidden';
    
    // Unmount the loader to allow full animation but open the site faster
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      document.body.style.overflow = '';
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#56565c] text-[#f3efe7] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ scale: 1.3, opacity: 0, filter: "blur(12px)" }}
        animate={{ 
          scale: [1.3, 1, 0.85], 
          opacity: [0, 1, 0], 
          filter: ["blur(12px)", "blur(0px)", "blur(8px)"] 
        }}
        transition={{ duration: 2.8, ease: "easeInOut", times: [0, 0.4, 1] }}
        className="flex flex-col items-center justify-center w-full px-4"
        style={{ willChange: "transform, opacity, filter" }}
      >
        <h1 
          className="font-[100] lg:font-[200] tracking-[0.2em] md:tracking-[0.3em] uppercase text-center whitespace-nowrap"
          style={{ 
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(1.5rem, 8vw, 10rem)",
            color: "#f3efe7"
          }}
        >
          ATELIER ROYAL
        </h1>
      </motion.div>
    </motion.div>
  );
}
