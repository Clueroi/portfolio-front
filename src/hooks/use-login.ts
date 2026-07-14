
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
}

async function login(data: LoginRequest) {
  const response = await axios.post<LoginResponse>(
    "http://localhost:3333/sessions",
    data
  );

  return response.data;
}

export function useLogin() {
  return useMutation({
    mutationFn: login,
  });
}