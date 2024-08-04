"use client";

import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCircleNotch } from "react-icons/fa";
import TransactionDialog from "../TransactionDialog";
import { Transaction } from "@/src/lib/utils";

export default function EditDelete({
  transaction,
}: {
  transaction: Transaction;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const deleteTransaction = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/transaction", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        console.log(errorMessage);
        return;
      }
    } catch (error) {
      console.error("An error occurred. Please try again.");
    }
    setLoading(false);
    router.refresh();
  };

  return (
    <>
      <div className="px-7 border-x flex justify-center items-center">
        <button
          onClick={() => setShowDialog(true)}
          className="transition-all duration-300 hover:bg-slate-800 p-2 rounded-full hover:scale-110 flex justify-center items-center"
        >
          <FaRegEdit className="text-2xl" />
        </button>
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={() => deleteTransaction(transaction.id)}
          className="transition-all duration-300 hover:bg-slate-800 p-2 rounded-full hover:scale-110 flex justify-center items-center"
        >
          {loading ? (
            <FaCircleNotch className="animate-spin text-2xl text-white" />
          ) : (
            <MdDeleteOutline className="text-2xl" />
          )}
        </button>
      </div>
      <TransactionDialog
        editing={true}
        isDialogOpen={showDialog}
        setDialog={() => setShowDialog(false)}
        transaction={transaction}
      />
    </>
  );
}
