// src/components/notes/NoteEditor.tsx
import React, { useState } from "react";
import { createNote } from "../../api/notes";
import { useNavigate } from "react-router-dom";
import { getThemeClasses } from "../../theme/themeConfig";

interface Props {
  theme: "dark" | "light";
}

const NoteEditor: React.FC<Props> = ({ theme }) => {
  const classes = getThemeClasses(theme);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createNote({ title, body });
      navigate("/notes");
    } catch (err: any) {
      const apiMsg =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        err.response?.data?.error;
      setError(apiMsg || err.message || "Could not create note");
    }
  };

  return (
    <div
      className={`max-w-md mx-auto mt-10 p-6 rounded-lg ${classes.background} ${classes.borderGreen} ${classes.shadow}`}
    >
      <h2
        className={`${classes.textSizes.heading} ${classes.typography.fontSemibold}  mb-4 text-center`}
      >
        New Note
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full ${classes.spacing.padding.small} ${classes.spacing.rounded.medium} ${classes.background} ${classes.text} focus:outline-none focus:ring-2 focus:ring-purple-500`}
        />
        <textarea
          placeholder="Body"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          className={`w-full ${classes.spacing.padding.small} ${classes.spacing.rounded.medium} ${classes.background} ${classes.text} focus:outline-none focus:ring-2 focus:ring-purple-500`}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className={`w-full ${classes.spacing.padding.small} ${classes.spacing.rounded.medium} bg-green-500 text-white ${classes.hover}`}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default NoteEditor;
