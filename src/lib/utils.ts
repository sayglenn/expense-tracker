import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { parse, format } from 'date-fns';

export function formatYearMonth(yearMonth : string) {
  const date = parse(yearMonth, 'yyyy-MM', new Date());
  return format(date, 'MMM yyyy');
}  

export function formatDateCard(dateString : string) {
  const date = new Date(dateString.slice(0, 10));
  return format(date, 'dd MMM yyyy');
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type Transaction = {
  amount: string;
  name: string;
  date: string;
  type: string;
  category: string;
  id: string;
};

export type GroupedTransactions = {
  [key: string]: Transaction[];
};
