import { z } from 'zod';
import { validateResponse } from './validateResponse';

export const UserSchema = z.object({
    id: z.string(),
    email: z.string().email('Введите почту в формате example@example.ru'),
    username: z.string().min(5, 'Имя пользователя должно содержать не менее 5 символов'),
});

export type User = z.infer<typeof UserSchema>;

export const createUserSchema = UserSchema.omit({ id: true }).merge(z.object(
    { password: z.string().min(8, 'Пароль должен содержать не менее 8 символов') }
));

export type CreateUser = z.infer<typeof createUserSchema>;

export const loginUserSchema = createUserSchema.omit({ username: true });

export type LoginUser = z.infer<typeof loginUserSchema>

export function registerUser(userData: CreateUser): Promise<void> {
    return fetch('/api/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(validateResponse)
    .then(() => undefined);
}

export function loginUser(loginData: LoginUser): Promise<void> {
    return fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    })
    .then(validateResponse)
    .then(() => undefined);
}

export function fetchMe(): Promise<User> {
    return fetch('/api/users/me')
    .then(validateResponse)
    .then(res => res.json())
    .then(data => UserSchema.parse(data));
}

export function logout(): Promise<void> {
    return fetch('/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(() => undefined);
}