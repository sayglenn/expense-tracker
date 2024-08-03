import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import LoginForm from "@/src/components/login/LoginForm";

export default async function Page() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}
