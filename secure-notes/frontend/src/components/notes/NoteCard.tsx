// src/components/notes/NoteCard.tsx
import React from "react";
import { Note } from "../../types";
import { getThemeClasses } from "../../theme/themeConfig";

interface Props {
  note: Note;
  theme: "dark" | "light";
}

const NoteCard: React.FC<Props> = ({ note, theme }) => {
  const classes = getThemeClasses(theme);
  return (
    <div
      className={`p-4 mb-4 rounded-lg ${classes.background} ${classes.shadow} ${classes.borderPurple} ${classes.transition} ${classes.hover} ${classes.text} ${classes.textSizes.body}`}
    >
      <h3
        className={`${classes.textSizes.subheading} ${classes.typography.fontSemibold} mb-2`}
      >
        {note.title}
      </h3>
      <p
        className={`${classes.textSizes.body} ${classes.typography.fontRegular}`}
      >
        {note.body}
      </p>
    </div>
  );
};

export default NoteCard;
