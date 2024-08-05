import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getTransactions } from "@/src/db/queries";
import TransactionsHeader from "@/src/components/dashboard/transactions/TransactionsHeader";
import { formatYearMonth, formatDateCard } from "@/src/lib/utils";
import EditDelete from "@/src/components/dashboard/transactions/EditDelete";
import { Transaction, GroupedTransactions } from "@/src/lib/utils";

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const transactions: Transaction[] = await getTransactions(
    session.user?.id as string
  );

  // Combine the transactions.
  const combined_transactions = transactions.reduce<GroupedTransactions>(
    (acc, transaction) => {
      const dateKey = transaction.date.slice(0, 7);
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(transaction);
      return acc;
    },
    {}
  );

  // Sort the months in descending order.
  const sorted_months = Object.keys(combined_transactions).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  // Sort the transactions in each month in descending order.
  for (const [month, transactions] of Object.entries(combined_transactions)) {
    combined_transactions[month] = transactions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  return (
    <>
      <div className="p-3 flex flex-col md:p-8 items-stretch flex-grow">
        <TransactionsHeader />
        <div className="px-1 flex flex-col gap-2 overflow-y-scroll h-[620px] w-[100%] md:px-5">
          {sorted_months.map((month) => {
            return (
              <div key={month} className="w-full border-b py-3">
                <p className="text-xl font-bold text-white mb-3">
                  {formatYearMonth(month)}
                </p>
                <div className="flex flex-col gap-5">
                  {combined_transactions[month].map((transaction) => {
                    const date = formatDateCard(transaction.date);
                    const time = transaction.date.slice(11, 16);
                    return (
                      <div
                        key={transaction.id}
                        className={`text-white flex flex-row px-6 py-4 rounded-3xl items-center gap-3 xl:gap-7 ${
                          transaction.type == "expense"
                            ? "bg-red-900"
                            : "bg-green-900"
                        }`}
                      >
                        <div className="flex flex-col flex-grow">
                          <p className="text-sm font-bold md:text-2xl">
                            {transaction.name}
                          </p>
                          <p>${transaction.amount}</p>
                          <p className="text-[10px] md:text-sm italic">
                            {date} {time}
                          </p>
                        </div>
                        <div className="bg-gray-900 p-3 rounded-3xl flex flex-row gap-2 items-center">
                          <p>{transaction.category.slice(0, 2)}</p>
                          <p className="hidden md:block text-sm">
                            {transaction.category.slice(2)}
                          </p>
                        </div>
                        <EditDelete transaction={transaction} />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
