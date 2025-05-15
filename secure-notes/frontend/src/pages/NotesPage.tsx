// src/pages/NotesPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNotes } from "../api/notes";
import NoteList from "../components/notes/NoteList";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { getThemeClasses } from "../theme/themeConfig";
import { useAuth } from "../context/AuthContext";
import type { Note } from "../types";

interface Props {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const NotesPage: React.FC<Props> = ({ theme, toggleTheme }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const classes = getThemeClasses(theme);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes().then((res) => setNotes(res.data));
  }, []);

  return (
    <div
      className={`flex flex-col min-h-screen ${classes.background} ${classes.text}`}
    >
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="flex-grow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className={classes.textSizes.heading}>Your Notes</h2>

          <div className="space-x-2">
            {/* New Note button */}
            <button
              onClick={() => navigate("/notes/new")}
              className={`px-4 py-2 ${classes.borderGreen} ${classes.text} bg-green-500 ${classes.spacing.rounded.medium} ${classes.hover}`}
            >
              + New Note
            </button>

            {/* Logout button */}
            <button
              onClick={logout}
              className={`px-4 py-2 ${classes.borderPurple} ${classes.text} bg-purple-500 ${classes.spacing.rounded.medium} ${classes.hover}`}
            >
              Logout
            </button>
          </div>
        </div>

        <NoteList notes={notes} theme={theme} />
      </main>

      <Footer theme={theme} />
    </div>
  );
};

export default NotesPage;
