import React from "react";
import { getThemeClasses } from "../theme/themeConfig";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import RegisterForm from "../components/auth/RegisterForm";

interface Props {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const RegisterPage: React.FC<Props> = ({ theme, toggleTheme }) => {
  const classes = getThemeClasses(theme);

  return (
    <div
      className={`flex flex-col min-h-screen ${classes.background} ${classes.text}`}
    >
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow flex items-center justify-center">
        <RegisterForm theme={theme} />
      </main>
      <Footer theme={theme} />
    </div>
  );
};

export default RegisterPage;
