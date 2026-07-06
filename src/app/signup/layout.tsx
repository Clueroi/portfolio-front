import type { Metadata } from "next";
import { type ReactElement } from "react";

export const metadata: Metadata = {
  title: "Signup | Engineering Playground",
  description: "Página de criação de conta | Playground de Engenheiros"
};

export default function AboutLayout({
  children
}: {
  children: React.ReactNode;
}): ReactElement {
  return <>{children}</>;
}