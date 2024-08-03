import { db } from "./index";

export function getUserFromDb(email: string) {
  return db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });
}

export function getTransactions(id : string) {
  return db.query.transactions.findMany({
    where: (transactions, { eq }) => eq(transactions.user_id, id),
  });
}