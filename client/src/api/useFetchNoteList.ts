import { useEffect, useState } from "react";
import { z } from "zod";

export const NoteSchema = z.object({
    id: z.string(),
    title: z.string(),
    text: z.string(),
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

type IdleResponseStatus = {
    status: string,
}

type PendingResponseStatus = {
    status: string,
}

type SuccessResponseStatus = {
    status: string,
    data: NoteList
}

type ErrorResponseStatus = {
    status: string,
    error: unknown, 
}

type ResponseStatus = IdleResponseStatus | PendingResponseStatus | SuccessResponseStatus | ErrorResponseStatus;

export function useFetchNoteList() {
    const [state, setState] = useState<ResponseStatus>({ status: 'idle' });

    useEffect(() => {
        if (state.status === 'pending') {
            fetchNoteList()
            .then(data => {
                setState({status: 'success', data: data.list})
            })
            .catch(error => {
                setState({status: 'error', error: error})
            })
        }
    }, [state]);

    useEffect(() => {
        setState({ status: 'pending' })
    }, [])

    const refetch = () => {
        setState({ status: 'pending' })
    }
        
    return {
        state,
        refetch,
    }
}

export function fetchNoteList(): Promise<FetchNoteList> {
    return fetch('/api/notes/')
        .then(res => res.json())
        .then(data => FetchNoteListSchema.parse(data));
}