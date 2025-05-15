// src/components/layout/Header.tsx
import React from "react";
import { getThemeClasses } from "../../theme/themeConfig";

interface HeaderProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const classes = getThemeClasses(theme);

  return (
    <header className={`flex justify-end p-4 ${classes.background}`}>
      <button
        onClick={toggleTheme}
        className={`px-4 py-2 border ${classes.borderPurple} ${classes.spacing.rounded.medium} ${classes.hover}`}
      >
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
};

export default Header;
