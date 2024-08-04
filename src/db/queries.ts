import { db } from "./index";
import { transactions } from "./schema";
import { eq } from "drizzle-orm";

export function getUserFromDb(email: string) {
  return db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });
}

export function getTransactions(id : string) {
  return db.query.transactions.findMany({
    columns: { amount: true, name: true, date: true, type: true, category: true, id: true, },
    where: (transactions, { eq }) => eq(transactions.user_id, id),
  });
}

export async function deleteTransaction(id : string) {
  await db.delete(transactions).where(eq(transactions.id, id));
}