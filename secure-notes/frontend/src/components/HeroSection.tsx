// /components/HeroSection.tsx

import { Card, Button } from "@rewind-ui/core";
import { FaSun, FaMoon } from "react-icons/fa";
import { getThemeClasses } from "../theme/themeConfig";
import { motion } from "framer-motion";

interface HeroSectionProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const HeroSection = ({ theme, toggleTheme }: HeroSectionProps) => {
  const classes = getThemeClasses(theme);

  return (
    <motion.section
      id="hero"
      className={`hero ${classes.gradient} ${classes.text} p-8 ${classes.typography.textAlignCenter}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      aria-labelledby="hero-heading"
    >
      <div
        className={`flex items-center justify-center ${classes.typography.marginBottom.large}`}
      >
        {/* Profile Card */}
        <motion.div
          className={`flex flex-col items-center p-6 rounded-lg ${classes.background} ${classes.shadow} max-w-sm`}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: "easeOut" },
            },
            hover: {
              scale: 1.02,
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
            },
          }}
          role="region"
          aria-label="Profile Information"
        >
          <motion.img
            src="./assets/me.jpg"
            alt="FC Venter"
            className="w-32 h-32 rounded-full mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          />
          <motion.h1
            id="hero-heading"
            className={`${classes.textSizes.heading} ${classes.typography.fontBold} ${classes.typography.marginBottom.medium}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            FC Venter
          </motion.h1>
          <motion.p
            className={`${classes.textSizes.body} ${classes.typography.marginBottom.medium}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Software Developer
          </motion.p>
          <motion.div
            whileHover="hover"
            variants={{
              hover: {
                scale: 1.05,
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <Button
              onClick={toggleTheme}
              variant="secondary"
              color="green"
              className="flex items-center justify-center p-2"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Button to open CV in a new tab */}
      <motion.div
        whileHover="hover"
        variants={{
          hover: {
            scale: 1.05,
            boxShadow: "0px 4px px rgba(0, 0, 0, 0.2)",
          },
        }}
        className={`flex items-center justify-center ${classes.typography.marginBottom.medium}`}
      >
        <Button
          as="a"
          href="/assets/documents/CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          color="green"
          shadow="base"
          className="w-auto flex items-center justify-center p-2" // Ensured w-auto
          aria-label="View My CV (opens in a new tab)"
        >
          View My CV
        </Button>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
