// src/pages/CreateNotePage.tsx
import React from "react";
import NoteEditor from "../components/notes/NoteEditor";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

interface Props {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const CreateNotePage: React.FC<Props> = ({ theme, toggleTheme }) => (
  <div className="flex flex-col min-h-screen">
    <Header theme={theme} toggleTheme={toggleTheme} />
    <main className="flex-grow">
      <NoteEditor theme={theme} />
    </main>
    <Footer theme={theme} />
  </div>
);

export default CreateNotePage;
