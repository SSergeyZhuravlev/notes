// import { useEffect, useState } from "react";
import { z } from "zod";
import { validateResponse } from "./validateResponse";

export const NoteSchema = z.object({
    id: z.string(),
    title: z.string().min(5, 'Минимальная длина - 5 символов'),
    text: z.string().min(10, 'Минимум 10 символов').max(300, 'Максимум 300 символов'),
    userId: z.string(),
    createdAt: z.number(),
});

export type Note = z.infer<typeof NoteSchema>;

export const NoteList = z.array(NoteSchema);

export type NoteList = z.infer<typeof NoteList>;

export const FetchNoteListSchema = z.object({
    list: NoteList,
    pageCount: z.number(),
});

export type FetchNoteList = z.infer<typeof FetchNoteListSchema>;

export const CreateNoteSchema = NoteSchema.pick({ title: true, text: true });

export type CreateNote = z.infer<typeof CreateNoteSchema>;

// type IdleResponseStatus = {
//     status: 'idle',
// }

// type PendingResponseStatus = {
//     status: 'pending',
// }

// type SuccessResponseStatus = {
//     status: 'success',
//     data: NoteList,
// }

// type ErrorResponseStatus = {
//     status: 'error',
//     error: unknown, 
// }

// export type ResponseStatus = IdleResponseStatus | PendingResponseStatus | SuccessResponseStatus | ErrorResponseStatus;

// export function useFetchNoteList() {
//     const [state, setState] = useState<ResponseStatus>({ status: 'idle' });

//     useEffect(() => {
//         if (state.status === 'pending') {
//             fetchNoteList()
//             .then((data) => {
//                 setState({status: 'success', data: data.list})
//             })
//             .catch((error) => {
//                 setState({status: 'error', error: error})
//             })
//         }
//     }, [state]);

//     useEffect(() => {
//         setState({ status: 'pending' })
//     }, [])

//     const refetch = () => {
//         setState({ status: 'pending' })
//     }
        
//     return {
//         state,
//         refetch,
//     }
// }

export async function fetchNoteList(): Promise<FetchNoteList> {
    return fetch('/api/notes/')
        .then(validateResponse)
        .then(res => res.json())
        .then(data => FetchNoteListSchema.parse(data));
}

export function createNote(note: CreateNote): Promise<void> {
    return fetch('/api/notes/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note)
    })
    .then(validateResponse)
    .then(() => undefined);
}