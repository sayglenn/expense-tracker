import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getTransactions } from "@/src/db/queries";
import TransactionsHeader from "@/src/components/dashboard/transactions/TransactionsHeader";

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const transactions = await getTransactions(session.user?.id as string);

  console.log(transactions);

  return (
    <>
      <div className="flex flex-col p-8">
        <TransactionsHeader />
      </div>
    </>
  );
}
