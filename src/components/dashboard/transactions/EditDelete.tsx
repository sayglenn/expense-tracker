"use client";

import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Spinner } from "@/src/components/ui/Spinner";
import { useState } from "react";
import { FaCircleNotch } from "react-icons/fa";

export default function EditDelete({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
      <div className="px-7 border-x border-black flex justify-center items-center">
        <button className="hover:bg-slate-100 p-2 rounded-full hover:scale-110 flex justify-center items-center">
          <FaRegEdit className="text-2xl" />
        </button>
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={() => deleteTransaction(id)}
          className="hover:bg-slate-100 p-2 rounded-full hover:scale-110 flex justify-center items-center"
        >
          {loading ? (
            <FaCircleNotch className="animate-spin text-3xl text-inherit" />
          ) : (
            <MdDeleteOutline className="text-3xl" />
          )}
        </button>
      </div>
    </>
  );
}
