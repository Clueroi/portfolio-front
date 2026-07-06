import { z } from "zod";

export const createAccountSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  payment: z.string().nullable(),
});

export type CreateAccountFormData = z.infer<typeof createAccountSchema>;