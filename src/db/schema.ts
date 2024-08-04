import type { AdapterAccountType } from "next-auth/adapters"
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

export const users = pgTable('user', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
});

export const transactions = pgTable('transaction', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  amount: numeric('amount', {scale: 2}).notNull(),
  name: text('name').notNull(),
  date: text('date').notNull(),
  type: text('type').notNull(),
  category: text('category').notNull(),
  user_id: text('user_id').notNull().references(() => users.id),
});
