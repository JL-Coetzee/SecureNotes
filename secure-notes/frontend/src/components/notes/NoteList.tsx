// src/components/notes/NoteList.tsx
import React from "react";
import NoteCard from "./NoteCard";
import { Note } from "../../types";

interface Props {
  notes: Note[];
  theme: "dark" | "light";
}

const NoteList: React.FC<Props> = ({ notes, theme }) => {
  if (!notes.length) {
    return <p className="text-center">No notes yet.</p>;
  }
  return (
    <>
      {notes.map((note) => (
        <NoteCard key={note._id} note={note} theme={theme} />
      ))}
    </>
  );
};

export default NoteList;
