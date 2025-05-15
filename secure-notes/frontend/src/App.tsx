// src/App.tsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getThemeClasses } from "./theme/themeConfig";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotesPage from "./pages/NotesPage";
import CreateNotePage from "./pages/CreateNotePage";

const AppRoutes = ({
  theme,
  toggleTheme,
}: {
  theme: "dark" | "light";
  toggleTheme: () => void;
}) => {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={token ? "/notes" : "/login"} replace />}
        />
        <Route
          path="/login"
          element={<LoginPage theme={theme} toggleTheme={toggleTheme} />}
        />
        <Route
          path="/register"
          element={<RegisterPage theme={theme} toggleTheme={toggleTheme} />}
        />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <NotesPage theme={theme} toggleTheme={toggleTheme} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes/new"
          element={
            <ProtectedRoute>
              <CreateNotePage theme={theme} toggleTheme={toggleTheme} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const classes = getThemeClasses(theme);

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div
      className={`flex flex-col min-h-screen ${classes.background} ${classes.text}`}
    >
      <AuthProvider>
        <AppRoutes theme={theme} toggleTheme={toggleTheme} />
      </AuthProvider>
    </div>
  );
};

export default App;
