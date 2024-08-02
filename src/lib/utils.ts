import { db } from "@/src/drizzle/schema";

export function getUserFromDb(email: string) {
  return db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });
}