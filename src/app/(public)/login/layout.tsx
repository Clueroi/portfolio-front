import type { Metadata } from "next";
import { type ReactElement } from "react";

export const metadata: Metadata = {
  title: "Login | Engineering Playground",
  description: "Página de login | Playground de Engenheiros"
};

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}): ReactElement {
  return <>{children}</>;
}