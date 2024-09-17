import { z } from 'zod';

const UserSchema = z.object({
    name: z.string().optional(),
    email: z.string().email('Invalid email'),
    password: z.string().min(1, 'Password is required'),
})

const BookSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1),
    author: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const AddBookSchema = BookSchema.omit({id: true, createdAt: true, updatedAt: true});
export const LoginSchema = UserSchema.omit({name: true});
export const SignupSchema = UserSchema.omit({name: true});
