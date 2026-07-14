// src/app/signup/signup-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createAccountSchema, CreateAccountFormData } from "@/src/lib/schema/create-account-schema";
import { useCreateAccount, getApiErrorMessage } from "@/src/hooks/use-create-account";
import { Link } from "lucide-react";
import { Button } from "../../ui/button";

export function SignupForm() {
  const router = useRouter();
  const { mutate, isPending, error } = useCreateAccount();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: { payment: null },
  });

  function onSubmit(data: CreateAccountFormData) {
    const formData = {
      ...data,
      payment: data.payment || null,
    };
    mutate(formData, {
      onSuccess: () => {
        router.push("/login");
      },
      onError: (error) => {
        console.error("Erro ao criar conta:", error);
      },
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm">
        <div>
          <input {...register("name")} placeholder="Nome" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <input {...register("email")} type="email" placeholder="E-mail" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <input {...register("password")} type="password" placeholder="Senha" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <input {...register("payment")} placeholder="Pagamento (opcional)" />

        {error && <p className="text-red-500 text-sm">{getApiErrorMessage(error)}</p>}

        <button type="submit" disabled={isPending}>
          {isPending ? "Criando conta..." : "Criar conta"}
        </button>

      </form>

      <Button>
        <Link href="login">
          Login
        </Link>
      </Button>
    </>

  );
}