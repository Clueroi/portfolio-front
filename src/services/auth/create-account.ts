import { api } from "@/src/http/api";
import { CreateAccountFormData } from "../../lib/schema/create-account-schema";

export async function createAccount(data: CreateAccountFormData): Promise<void> {
  await api.post("/signup", data);
}