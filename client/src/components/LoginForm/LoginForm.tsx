import "./LoginForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { useMutation } from "@tanstack/react-query";
import { LoginUser, loginUser, loginUserSchema } from "../../api/User";
import { queryClient } from "../../api/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Error } from "../Error/Error";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginUser>({
    resolver: zodResolver(loginUserSchema),
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['users', 'me'] })
    },

    onError() { reset() },
  },
  queryClient,
);

  return (
    <form className="login-form" onSubmit={handleSubmit(( { email, password } ) => {
      loginMutation.mutate({ email, password })
    })}>
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input {...register('email')} />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input type="password" {...register('password')} />
      </FormField>

      { loginMutation.error && <Error message={loginMutation.error.message} /> }

      <Button isLoading={loginMutation.isPending}>Войти</Button>
    </form>
  );
};
