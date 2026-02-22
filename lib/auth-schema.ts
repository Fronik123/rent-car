import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "auth.validation.emailRequired")
    .email("auth.validation.emailInvalid"),
  password: z
    .string()
    .min(1, "auth.validation.passwordRequired")
    .min(5, "auth.validation.passwordMinLength"),
});

export type SignInFormData = z.infer<typeof signInSchema>;
