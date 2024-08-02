import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import {
  pgTable,
  integer,
  text,
  numeric,
  pgEnum,
  date,
  timestamp,
  primaryKey,
  boolean,
} from 'drizzle-orm/pg-core';

export const users = pgTable('tracker_user', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

const schema = {
  users,
};

export const db = drizzle(sql, { schema });