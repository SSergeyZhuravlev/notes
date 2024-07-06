import { useFetchNoteList } from "../../api/useFetchNoteList"
import { Button } from "../Button";
import { Loader } from "../Loader";
import { NotesListView } from "./NotesListView";

export const FetchNoteListView = () => {
    const { state, refetch } = useFetchNoteList();
    
    switch (state.status) {
        case 'idle':
        case 'pending':
            return <div className="auth-form">
                <Loader />
            </div>
                
        case 'success':
        return <NotesListView noteList={state.data} />
    
        case 'error':
            return (
                <div>
                    Ошибка
                    <Button onClick={refetch}>Попробовать снова</Button>
                </div>
            )
    }
}