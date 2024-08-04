import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";
import { Spinner } from "@/src/components/ui/Spinner";
import { useState, useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { TfiAngleDown } from "react-icons/tfi";
import { useRouter } from "next/navigation";
import { Transaction } from "@/src/lib/utils";

export default function TransactionDialog({
  isDialogOpen,
  setDialog,
  editing,
  transaction,
}: {
  isDialogOpen: boolean;
  setDialog: () => void;
  editing: boolean;
  transaction?: Transaction;
}) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    reValidateMode: "onSubmit",
  });

  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const nameValue = watch("name", transaction?.name || "");
  const amountValue = watch("amount", transaction?.amount || "");
  const transactionValue = watch("transaction", transaction?.type || "income");

  useEffect(() => {
    if (transaction) {
      reset({
        name: transaction.name,
        amount: transaction.amount,
        transaction: transaction.type,
        category: transaction.category,
        time: transaction.date,
      });
    }
  }, [transaction, reset]);

  const submitTransaction = async (data: FieldValues) => {
    setSubmitting(true);
    setError("");
    if (editing) {
      try {
        const response = await fetch("/api/transaction", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data, id: transaction?.id }),
        });
        if (!response.ok) {
          const errorMessage = await response.text();
          setError(errorMessage);
          return;
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    } else {
      try {
        const response = await fetch("/api/transaction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          const errorMessage = await response.text();
          setError(errorMessage);
          return;
        }
        reset();
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    }
    router.refresh();
    setDialog();
    setSubmitting(false);
  };

  const fieldClass =
    "w-full p-3 border border-gray-300 placeholder:font-[300] placeholder:text-[15px] bg-[#162341] text-white rounded-xl";
  const errorClass = "text-red-500 text-[12px] mt-1";
  const labelClass =
    "rounded-md absolute left-3 -top-2 text-[#162341] text-[12px] bg-white px-1 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base transition-all duration-200 transform";

  return (
    <>
      <AlertDialog open={isDialogOpen} onOpenChange={setDialog}>
        <AlertDialogContent className="bg-[#162341] w-[80%] rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-center text-2xl">
              Add Transaction
            </AlertDialogTitle>
          </AlertDialogHeader>
          <form
            className="flex flex-col px-7"
            onSubmit={handleSubmit(submitTransaction)}
          >
            <div className="relative">
              <input
                placeholder="Transaction Name"
                id="name"
                className={`${fieldClass} ${
                  errors.name ? "border-red-500" : ""
                }`}
                {...register("name", { required: "Name is required" })}
              ></input>
              <label
                htmlFor="name"
                className={`${labelClass}
                    ${
                      nameValue
                        ? " opacity-100 translate-y-0"
                        : " opacity-0 translate-y-4"
                    }`}
              >
                Transaction Name
              </label>
              {errors.name && (
                <p className={errorClass}>{errors.name.message as string}</p>
              )}
            </div>
            <div className="relative mt-6">
              <input
                placeholder="Amount"
                id="amount"
                className={`${fieldClass} ${
                  errors.email ? "border-red-500" : ""
                }`}
                {...register("amount", {
                  required: "Amount is required",
                  pattern: {
                    value: /^\d+\.\d{2}$/,
                    message: "Amount must be in dollars and cents, e.g. 10.25",
                  },
                  validate: (value) =>
                    parseFloat(value) >= 0 ||
                    "Amount must be a positive number",
                })}
              ></input>
              <label
                htmlFor="amount"
                className={`${labelClass} 
                    ${
                      amountValue
                        ? " opacity-100 translate-y-0"
                        : " opacity-0 translate-y-4"
                    }`}
              >
                Amount
              </label>
              {errors.amount && (
                <p className={errorClass}>{errors.amount.message as string}</p>
              )}
            </div>
            <div className="relative mt-6">
              <input
                type="datetime-local"
                placeholder="Transaction Time"
                id="time"
                className={`${fieldClass} ${
                  errors.email ? "border-red-500" : ""
                }`}
                {...register("time", {
                  required: "Transaction Time is required",
                })}
              ></input>
              <label htmlFor="amount" className={labelClass}>
                Transaction Time
              </label>
              {errors.time && (
                <p className={errorClass}>{errors.time.message as string}</p>
              )}
            </div>
            <div className="relative mt-6">
              <select
                {...register("transaction", {
                  required: "Transaction type is required",
                })}
                id="transaction"
                className={
                  `${fieldClass} ${
                    errors.transaction ? "border-red-500" : ""
                  }` + " peer appearance-none bg-[#162341] px-4"
                }
              >
                <option value="income">📈 Income</option>
                <option value="expense">📉 Expense</option>
              </select>
              <label htmlFor="transaction" className={labelClass}>
                Transaction Type
              </label>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                <TfiAngleDown className="text-white" />
              </div>
              {errors.transaction && (
                <p className={errorClass}>
                  {errors.transaction.message as string}
                </p>
              )}
            </div>
            {transactionValue === "expense" && (
              <div className="relative mt-6">
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  id="category"
                  className={
                    `${fieldClass} ${
                      errors.transaction ? "border-red-500" : ""
                    }` + " peer appearance-none bg-[#162341] px-4"
                  }
                >
                  <option>🍔 Food</option>
                  <option>🚈 Transport</option>
                  <option>👔 Fashion</option>
                  <option>🚑 Healthcare</option>
                  <option>🛒 Groceries</option>
                  <option>🔄 Subscriptions</option>
                  <option>💡 Utilities</option>
                  <option>🕳️ Miscellaneous</option>
                </select>
                <label htmlFor="category" className={labelClass}>
                  Category
                </label>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                  <TfiAngleDown className="text-white" />
                </div>
                {errors.category && (
                  <p className={errorClass}>
                    {errors.category.message as string}
                  </p>
                )}
              </div>
            )}
            {transactionValue === "income" && (
              <div className="relative mt-6">
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  id="category"
                  className={
                    `${fieldClass} ${
                      errors.transaction ? "border-red-500" : ""
                    }` + " peer appearance-none bg-[#162341] px-4"
                  }
                >
                  <option>💰 Salary</option>
                  <option>💹 Investments</option>
                  <option>🧧 Gifts</option>
                  <option>💵 Allowance</option>
                  <option>🕳️ Miscellaneous</option>
                </select>
                <label htmlFor="category" className={labelClass}>
                  Category
                </label>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                  <TfiAngleDown className="text-white" />
                </div>
                {errors.category && (
                  <p className={errorClass}>
                    {errors.category.message as string}
                  </p>
                )}
              </div>
            )}
            <button
              disabled={submitting}
              type="submit"
              className={`mb-2 mt-7 duration-500 transition-all w-full border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:-translate-y-2 hover:text-[#162341] ${
                submitting ? "py-0" : "py-3"
              }`}
            >
              {submitting ? (
                <Spinner />
              ) : editing ? (
                "Edit Transaction"
              ) : (
                "Add Transaction"
              )}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
