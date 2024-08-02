"use server";

import { FieldValues } from "react-hook-form";
import { signIn } from "@/auth";

export const authenticate = async (data: FieldValues) => {
  "use server";
  return await signIn("credentials", {
    ...data,
    redirect: false,   
  });
};