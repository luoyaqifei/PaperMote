import { z } from 'zod';

const UserSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email('Invalid email'),
    password: z.string().min(1, 'Password is required'),
    avatar: z.string().url('Avatar is URL')
})

const BookSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1),
    author: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const AddBookSchema = BookSchema.omit({id: true, createdAt: true, updatedAt: true});
export const LoginSchema = UserSchema.omit({username: true});
export const SignupSchema = UserSchema.omit({username: true, avatar: true});
export const UpdateUserSchema = UserSchema.omit({password: true, avatar: true});
