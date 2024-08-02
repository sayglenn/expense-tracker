"use client";

import { FieldValues, useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { authenticate } from "@/src/lib/actions";
import { Spinner } from "@/src/components/ui/Spinner";

export default function Page() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    reValidateMode: "onSubmit",
  });
  const emailValue = watch("email", "");
  const passwordValue = watch("password", "");

  useEffect(() => {
    setLoaded(true);
  }, []);

  const loginUser = async (data: FieldValues) => {
    setSubmitting(true);
    try {
      await authenticate(data);
      reset();
      router.push("/dashboard");
    } catch (error) {
      setError("Invalid email or password.");
      setSubmitting(false);
    }
  };

  const fieldClass =
    "w-full p-3 border border-gray-300 placeholder:font-[300] placeholder:text-[15px] bg-[#162341] text-white rounded-xl";
  const errorClass = "text-red-500 text-[12px] mt-1";
  const labelClass =
    "rounded-md absolute left-3 -top-2 text-[#162341] text-[12px] bg-white px-1 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base transition-all duration-200 transform";

  return (
    <>
      <div className="flex flex-col items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute px-12 py-7 border-white border bg-[#162341] rounded-3xl">
        <p
          className={`text-white text-3xl font-bold transition-all duration-1000 ${
            loaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}
        >
          Sign In
        </p>
        <form
          onSubmit={handleSubmit(loginUser)}
          className="p-3 w-[90%] md:w-[400px]"
        >
          <div className="relative mt-3">
            <input
              {...register("email", {
                required: "Email is required",
                validate: (value) =>
                  /\S+@\S+\.\S+/.test(value) || "Email address is invalid",
              })}
              placeholder="Email"
              id="email"
              className={`${fieldClass} ${
                errors.email ? "border-red-500" : ""
              }`}
            ></input>
            <label
              htmlFor="email"
              className={`${labelClass}
                ${
                  emailValue
                    ? " opacity-100 translate-y-0"
                    : " opacity-0 translate-y-4"
                }`}
            >
              Email
            </label>
            {errors.email && (
              <p className={errorClass}>{errors.email.message as string}</p>
            )}
          </div>
          <div className="relative mt-5">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long.",
                },
              })}
              placeholder="Password"
              type="password"
              id="password"
              className={`${fieldClass} ${
                errors.email ? "border-red-500" : ""
              }`}
            ></input>
            <label
              htmlFor="password"
              className={`${labelClass}
                ${
                  passwordValue
                    ? " opacity-100 translate-y-0"
                    : " opacity-0 translate-y-4"
                }`}
            >
              Password
            </label>
            {errors.password && (
              <p className={errorClass}>{errors.password.message as string}</p>
            )}
          </div>
          <button
            disabled={submitting}
            className={`mt-7 duration-500 transition-all w-full border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:-translate-y-2 hover:text-[#162341] ${
              submitting ? "py-0" : "py-3"
            }`}
          >
            {submitting ? <Spinner /> : "Sign In"}
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        <p className="italic text-gray-400 mt-1">
          Don&apos;t have an account? Sign up{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            here!
          </Link>
        </p>
      </div>
    </>
  );
}
