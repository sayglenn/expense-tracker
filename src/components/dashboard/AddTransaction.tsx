"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import TransactionDialog from "./TransactionDialog";

export default function AddTransaction() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <button
        className="absolute right-[8%] bottom-[10%] group flex items-center justify-around w-16 h-16 text-[#162341] rounded-full transition-all duration-500 overflow-hidden hover:w-[200px] bg-white p-5"
        onClick={() => setShowDialog(true)}
      >
        <FaPlus className="text-2xl" />
        <p className="hidden ml-2 whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:block">
          Add Transaction
        </p>
      </button>
      <TransactionDialog
        isDialogOpen={showDialog}
        setDialog={() => setShowDialog(false)}
      />
    </>
  );
}
