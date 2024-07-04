import "./NotesListView.css";
import { NoteView } from "../NoteView";
import { useFetchNoteList } from "../../api/useFetchNoteList";

export const NotesListView = () => {
  const notes = useFetchNoteList();
  console.log(notes.state);

  return (
    <ul className="note-list-view">
      <li>
        <NoteView />
      </li>
    </ul>
  );
};
