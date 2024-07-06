import { FC } from "react";
import { Note } from "../../api/useFetchNoteList";
import "./NoteView.css";

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

interface INoteViewData {
  note: Note
}

export const NoteView: FC<INoteViewData> = ( { note } ) => {
  return (
    <div className="note-view">
      <div className="note-view__head">
        <p className="note-view__datetime">{formatDate(note.createdAt)}</p>
        <p className="note-view__title">{note.title}</p>
      </div>

      <p className="note-view__text">
        {note.text}
      </p>
    </div>
  );
};
