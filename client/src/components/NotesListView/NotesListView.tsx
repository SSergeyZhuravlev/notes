import "./NotesListView.css";
import { NoteView } from "../NoteView";
import { NoteList } from "../../api/useFetchNoteList";
import { FC } from "react";

interface INotesListViewProps {
  noteList: NoteList
}

export const NotesListView: FC<INotesListViewProps> = ( { noteList } ) => {

  return noteList ? (
    <ul className="note-list-view">
      { noteList.map((note) => (
        <li key={note.id}> 
          <NoteView note={note} />
        </li>
      )) }
    </ul>
  ) : <div className="note-list-view ">Список заметок пуст</div>;
};
