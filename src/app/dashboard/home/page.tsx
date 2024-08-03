import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashboardHeader from "@/src/components/dashboard/home/DashboardHeader";

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <div className="flex flex-col p-8">
        <DashboardHeader name={session.user?.name as string} />
      </div>
    </>
  );
}
