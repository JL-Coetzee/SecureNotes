// src/api/notes.ts
import api from "./index";
import type { Note } from "../types";

export const fetchNotes = () => api.get<Note[]>("/notes");
export const createNote = (note: { title: string; body: string }) =>
  api.post<Note>("/notes", note);
