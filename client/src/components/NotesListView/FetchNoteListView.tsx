// import { useFetchNoteList } from "../../api/useFetchNoteList"
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { Button } from "../Button";
import { Loader } from "../Loader";
import { NotesListView } from "./NotesListView";
import { fetchNoteList } from "../../api/useFetchNoteList";

interface IFetchNoteListProps {
    id: string,
}

export const FetchNoteListView: FC<IFetchNoteListProps> = ({ id }) => {
    // const { state, refetch } = useFetchNoteList();
    const noteListViewQuery = useQuery({
        queryFn: () => fetchNoteList(),
        queryKey: ['notes'],
    }, 
    queryClient,
)
    
    switch (noteListViewQuery.status) {
        case 'pending':
            return <div className="note-list-view__loader">
                <Loader />
            </div>
                
        case 'success':
        return <NotesListView noteList={noteListViewQuery.data.list.filter((note) => note.userId === id)} />
    
        case 'error':
            return (
                <div>
                    Ошибка
                    <Button onClick={() => noteListViewQuery.refetch()}>Попробовать снова</Button>
                </div>
            )
    }
}