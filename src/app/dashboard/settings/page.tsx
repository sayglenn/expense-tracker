import { signOut, auth } from "@/auth";
import SettingsHeader from "@/src/components/dashboard/settings/SettingsHeader";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session) {
    console.log(session);
    redirect("/login");
  }

  return (
    <div className="flex flex-col p-8">
      <SettingsHeader />
      <form
        className="mt-6"
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button
          className="font-bold border-2 bg-[#162341] text-white border-white w-full py-3 px-6 rounded-xl transition duration-300
        hover:bg-white hover:text-[#162341] hover:-translate-y-1"
        >
          Sign Out
        </button>
      </form>
    </div>
  );
}
