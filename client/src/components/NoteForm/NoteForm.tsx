import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { useForm } from "react-hook-form"
import { FormField } from "../FormField";
import { Button } from "../Button";
import { CreateNote, createNote } from "../../api/useFetchNoteList";
import { CreateNoteSchema } from "../../api/useFetchNoteList";
import { zodResolver } from "@hookform/resolvers/zod";
import { Error } from "../Error/Error";
import "./NoteForm.css";

export const NoteForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateNote>({
    resolver: zodResolver(CreateNoteSchema)
  });

  const noteFormMutation = useMutation({
    mutationFn: createNote,
    
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    }
  },
    queryClient,
  );

  return (
    <form className="note-form" onSubmit={handleSubmit(( { title, text } ) => {
      noteFormMutation.mutate({ title, text });
      reset();
    })}>
      <FormField label="Заголовок" errorMessage={errors.title?.message}>
        <input type="text" {...register('title')} />
      </FormField>
      <FormField label="Текст" errorMessage={errors.text?.message}>
        <textarea {...register('text')} />
      </FormField>

    { noteFormMutation.error && <Error message={noteFormMutation.error.message} /> }

      <Button isLoading={noteFormMutation.isPending}>Сохранить</Button>
    </form>
  );
};
