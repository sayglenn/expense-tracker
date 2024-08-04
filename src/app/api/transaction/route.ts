import { NextRequest, NextResponse } from 'next/server';
import { transactions } from "@/src/db/schema";
import { db } from "@/src/db/index";
import { auth } from "@/auth";
import { eq } from 'drizzle-orm';

export async function POST(request : NextRequest) {
  const session = await auth();
  const body = await request.json();
  const { amount, category, name, transaction, time } = body;

  const tr = await db.insert(transactions).values({
    amount: amount,
    name: name,
    date: time,
    type: transaction,
    category: category,
    user_id: session?.user?.id as string,
  });

  return NextResponse.json(tr);
}

export async function DELETE(request : NextRequest) {
  const body = await request.json();
  const { id } = body;
  const tr = await db.delete(transactions).where(eq(transactions.id, id));

  return NextResponse.json(tr);
}