import * as z from "zod";

export const UserSchema = z.object({
  username: z.string().min(2).max(120),
  email: z.string().email(),
  password: z.string().min(5).max(100),
});

export type UserSchema = z.infer<typeof UserSchema>;


export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(100),
});

export type LoginUserSchema = z.infer<typeof LoginUserSchema>;
