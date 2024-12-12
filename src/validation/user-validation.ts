import { z, ZodType } from "zod";

export const registerSchema: ZodType = z.object({
  name: z.string().min(3).max(50),
  username: z.string().min(3).max(50),
  password: z.string().min(5).max(100),
});

export const loginSchema: ZodType = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(5).max(100),
});

export const updateSchema: ZodType = z.object({
  name: z.string().min(3).max(50).optional(),
  password: z.string().min(5).max(100).optional(),
});

export const tokenSchema: ZodType = z.string().min(5);
