import { FC } from "react";
import { LogoutButton } from "../LogoutButton";
import { UserView } from "../UserView";
import { NoteForm } from "../NoteForm";
import { FetchNoteListView } from "../NotesListView/FetchNoteListView";
import './AccountLayout.css';

interface IAccountLayoutProps {
    username: string,
    id: string,
}

export const AccountLayout: FC<IAccountLayoutProps> = ( { username, id } ) => {
    return (
        <div className="account">
            <UserView username={username} />
            <NoteForm />
            <FetchNoteListView id={id} />
            <LogoutButton />
        </div>
    )
}