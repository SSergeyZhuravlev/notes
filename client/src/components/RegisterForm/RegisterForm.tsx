import { FormField } from "../FormField";
import { Button } from "../Button";
import { queryClient } from "../../api/queryClient";
import { useMutation } from "@tanstack/react-query";
import { registerUser, createUserSchema, CreateUser } from "../../api/User";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Error } from "../Error/Error";
import "./RegisterForm.css";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUser>({
    resolver: zodResolver(createUserSchema)
  })

  const registerMutation = useMutation({
    mutationFn: registerUser,

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['users', 'me'] })
    },

    onError() { reset() },
  },
    queryClient,
  );

  return (
    <form className="register-form" onSubmit={handleSubmit(( { username, email, password } ) => {
      registerMutation.mutate({ username, email, password });
    })}>
      <FormField label="Имя" errorMessage={errors.username?.message}>
        <input {...register('username')} />
      </FormField>
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input {...register('email')} />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input type="password" {...register('password')} />
      </FormField>
      
      { registerMutation.error && <Error message={registerMutation.error.message} /> }

      <Button type='submit' isLoading={registerMutation.isPending}>Зарегистрироваться</Button>
    </form>
  );
};
