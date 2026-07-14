"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginFormData } from "@/src/lib/schema/login-schema";
import { useLogin } from "@/src/hooks/use-login";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();

  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  function onSubmit(data: LoginFormData) {
    mutate(data, {
      onSuccess: ({ access_token }) => {
        localStorage.setItem("token", access_token);

        router.push("/");
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <input
        placeholder="Email"
        type="email"
        {...register("email")}
      />

      {errors.email && <p>{errors.email.message}</p>}

      <input
        placeholder="Senha"
        type="password"
        {...register("password")}
      />

      {errors.password && <p>{errors.password.message}</p>}

      <button disabled={isPending}>
        {isPending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  )
}