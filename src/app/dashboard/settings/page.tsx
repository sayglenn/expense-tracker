import { signOut, auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session) {
    console.log(session);
    redirect("/login");
  }

  return (
    <form
      className="mt-12"
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        className="font-bold border-2 bg-purple-500 text-white border-white w-full py-3 rounded-xl transition duration-300
      hover:bg-white hover:text-purple-500 hover:border-purple-500 hover:-translate-y-1 hover:shadow-2xl"
      >
        Sign Out
      </button>
    </form>
  );
}
