import { z } from 'zod';

const UserSchema = z.object({
    id: z.string(),
    username: z.string().min(1, "Username is required"),
    email: z.string().email('Invalid email'),
    password: z.string().min(1, 'Password is required'),
    avatar: z.string().url('Avatar is URL')
})

const BookSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1),
    author: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    cover: z.string().url('Cover is URL').optional(),
    created_at: z.date().optional(),
    updated_at: z.date().optional(),
});

export const AddBookSchema = BookSchema.omit({id: true, created_at: true, updated_at: true});
export const LoginSchema = UserSchema.omit({id: true, username: true, avatar: true});
export const SignupSchema = UserSchema.omit({id: true, username: true, avatar: true});
export const UpdateUserSchema = UserSchema.omit({password: true, avatar: true});
