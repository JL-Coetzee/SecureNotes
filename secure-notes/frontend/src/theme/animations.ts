// /theme/animations.ts
import type { Variants } from 'framer-motion';

// Fade-in and slide-up animation for sections and headers
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// Fade-in animation for simple elements
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Hover effect for interactive elements
export const hoverEffect: Variants = {
  hover: {
    scale: 1.02,
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
  },
};

// Floating animation for images or icons
export const floating: Variants = {
  animate: {
    y: [0, -10, 0], // Moves up by 10px and back to original position
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
};
