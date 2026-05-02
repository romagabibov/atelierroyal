import { Phone, Mail, MessageSquare, X } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Magnetic } from './Magnetic';
import { useState } from 'react';

export function FloatingContacts() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Use a hard threshold to unmount the widget entirely, preventing it from sticking around
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Hide completely starting at 0.85 (which is safely before the last slide)
    if (latest > 0.86) {
      if (isVisible) setIsVisible(false);
      if (isOpen) setIsOpen(false); // Close if open
    } else {
      if (!isVisible) setIsVisible(true);
    }
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="fixed right-6 bottom-6 md:right-10 md:bottom-10 z-[100] flex flex-col items-end"
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: 'bottom right' }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="mb-4 bg-[#2C2A28]/95 backdrop-blur-xl border border-white/10 p-6 shadow-2xl overflow-hidden font-sans rounded-2xl w-[280px]"
              >
                <div className="flex flex-col gap-6">
                  {/* Phone */}
                  <div className="flex flex-col gap-1">
                    <span className="text-white/50 text-[10px] uppercase tracking-widest">(телефон)</span>
                    <a 
                      href="tel:+994512525656" 
                      className="text-white text-sm hover:text-[#A0AD77] transition-colors flex items-center gap-3"
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 shrink-0">
                        <Phone className="w-4 h-4" />
                      </span>
                      +994 51 252 56 56
                    </a>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex flex-col gap-1">
                    <span className="text-white/50 text-[10px] uppercase tracking-widest">(whatsapp)</span>
                    <a 
                      href="https://wa.me/994512525656" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white text-sm hover:text-[#A0AD77] transition-colors flex items-center gap-3"
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 shrink-0">
                        <MessageSquare className="w-4 h-4" />
                      </span>
                      Написать в WhatsApp
                    </a>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1">
                    <span className="text-white/50 text-[10px] uppercase tracking-widest">(почта)</span>
                    <a 
                      href="mailto:office@atelierroyal.az" 
                      className="text-white text-sm hover:text-[#A0AD77] transition-colors flex items-center gap-3"
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 shrink-0">
                        <Mail className="w-4 h-4" />
                      </span>
                      office@atelierroyal.az
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Magnetic intensity={0.2}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 backdrop-blur-md transition-all duration-300 shadow-xl ${
                isOpen 
                  ? 'bg-[#2C2A28] text-white hover:bg-[#2C2A28]' 
                  : 'bg-black/20 text-white hover:bg-black/40' // 20% opacity as requested earlier
              }`}
            >
              {isOpen ? (
                <X className="w-5 h-5 md:w-6 md:h-6" />
              ) : (
                <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
              )}
            </button>
          </Magnetic>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
