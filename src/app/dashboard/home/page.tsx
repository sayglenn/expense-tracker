import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashboardHeader from "@/src/components/dashboard/home/DashboardHeader";
import { getTransactions } from "@/src/db/queries";
import {
  Transaction,
  GroupedTransactions,
  formatYearMonth,
} from "@/src/lib/utils";
import { ExpenseChart } from "@/src/components/dashboard/home/ExpenseChart";
import { IncomeChart } from "@/src/components/dashboard/home/IncomeChart";

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const transactions: Transaction[] = await getTransactions(
    session.user?.id as string
  );

  const current_month = new Date().toISOString().slice(0, 7);
  const totalDays = new Date(2024, new Date().getMonth() + 1, 0).getDate();
  const expenseArray: { day: number; expense: string }[] = new Array(totalDays);
  const incomeArray: { day: number; income: string }[] = new Array(totalDays);

  for (let i = 0; i < totalDays; i++) {
    expenseArray[i] = { day: i + 1, expense: "0" };
    incomeArray[i] = { day: i + 1, income: "0" };
  }

  if (transactions.length > 0) {
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

    // Sort the transactions in each month in descending order.
    for (const [month, transactions] of Object.entries(combined_transactions)) {
      combined_transactions[month] = transactions.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }

    // Get current month transactions.
    const current_month_transactions = combined_transactions[current_month];

    current_month_transactions.forEach((transaction) => {
      const date = new Date(transaction.date).getDate();
      if (transaction.type === "income") {
        let currAmount = parseFloat(incomeArray[date - 1]["income"]);
        currAmount += parseFloat(transaction.amount);
        incomeArray[date - 1]["income"] = currAmount.toFixed(2);
        return;
      }
      let currAmount = parseFloat(expenseArray[date - 1]["expense"]);
      currAmount += parseFloat(transaction.amount);
      expenseArray[date - 1]["expense"] = currAmount.toFixed(2);
    });
  }

  return (
    <>
      <div className="flex flex-col p-8 sm:w-[65%]">
        <DashboardHeader name={session.user?.name as string} />
        <div className="px-1 overflow-y-scroll h-[590px] md:px-5">
          <ExpenseChart
            expenseData={expenseArray}
            month={formatYearMonth(current_month)}
          />
          <IncomeChart
            incomeData={incomeArray}
            month={formatYearMonth(current_month)}
          />
        </div>
      </div>
    </>
  );
}
