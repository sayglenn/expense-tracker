import { NextRequest, NextResponse } from 'next/server';
import { transactions } from "@/src/db/schema";
import { db } from "@/src/db/index";
import { auth } from "@/auth";

export async function POST(request : NextRequest) {
  const session = await auth();
  const body = await request.json();
  const { amount, category, name, transaction } = body;

  const tr = await db.insert(transactions).values({
    amount: amount,
    name: name,
    date: new Date(),
    type: transaction,
    category: category,
    user_id: session?.user?.id as string,
  });

  return NextResponse.json(tr);
}