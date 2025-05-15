// src/components/layout/Footer.tsx
import React from "react";
import { getThemeClasses } from "../../theme/themeConfig";

interface FooterProps {
  theme: "dark" | "light";
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  const classes = getThemeClasses(theme);
  return (
    <footer
      className={`text-center p-4 mt-auto ${classes.background} ${classes.mutedText}`}
    >
      &copy; {new Date().getFullYear()} Secure Notes
    </footer>
  );
};

export default Footer;
