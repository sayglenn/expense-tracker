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
