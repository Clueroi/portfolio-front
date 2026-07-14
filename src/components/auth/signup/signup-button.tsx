"use client";

import Link from "next/link";
import { Button } from "../../ui/button";


export interface ButtonProps  { 
    children: React.ReactNode
    path: string
 }

export function SignupButton({children, path}:ButtonProps) {

  return (
    <Button>
      <Link href={path}>
        {children}
      </Link>
    </Button>
  );
}