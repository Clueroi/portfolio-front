import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { ApiErrorResponse } from "../types/api-error";
import { createAccount } from "../services/auth/create-account";

export function useCreateAccount() {
  return useMutation({
    mutationFn: createAccount,
  });
}

export function getApiErrorMessage(error: unknown): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    if (error.response?.status === 409) {
      return "Esse e-mail já está cadastrado.";
    }
    return error.response?.data?.message ?? "Erro ao criar conta.";
  }
  return "Erro inesperado. Tente novamente.";
}