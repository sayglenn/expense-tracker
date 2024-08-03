"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Spinner } from "@/src/components/ui/Spinner";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import SignUpComplete from "@/src/components/signup/SignUpComplete";

export default function Page() {
  const [loaded, setLoaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [displayForm, setDisplayForm] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    reValidateMode: "onSubmit",
  });

  useEffect(() => setLoaded(true), []);

  const registerUser = async (data: FieldValues) => {
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        console.log(errorMessage);
        setError(errorMessage);
        setSubmitting(false);
        return;
      }
      setSubmitting(false);
      reset();
      setDisplayForm(false);
      setShowDialog(true);
    } catch (error) {
      setError("An error occurred. Please try again.");
      setSubmitting(false);
    }
  };

  const nameValue = watch("name", "");
  const emailValue = watch("email", "");
  const passwordValue = watch("password", "");

  const fieldClass =
    "w-full p-3 border border-gray-300 placeholder:font-[300] placeholder:text-[15px] bg-[#162341] text-white rounded-xl";
  const errorClass = "text-red-500 text-[12px] mt-1";
  const labelClass =
    "rounded-md absolute left-3 -top-2 text-[#162341] text-[12px] bg-white px-1 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base transition-all duration-200 transform";

  return (
    <>
      <div
        className={`flex-col items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute px-12 py-7 border-white border bg-[#162341] rounded-3xl ${
          displayForm ? "flex" : "hidden"
        }`}
      >
        <p
          className={`text-white text-3xl font-bold transition-all duration-1000 ${
            loaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}
        >
          Sign Up
        </p>
        <div className="flex flex-col items-center">
          <form
            className="w-[90%] md:w-[400px]"
            onSubmit={handleSubmit(registerUser)}
          >
            <div className="relative mt-6">
              <input
                placeholder="Name"
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
                Name
              </label>
              {errors.name && (
                <p className={errorClass}>{errors.name.message as string}</p>
              )}
            </div>
            <div className="relative mt-6">
              <input
                placeholder="Email"
                id="email"
                className={`${fieldClass} ${
                  errors.email ? "border-red-500" : ""
                }`}
                {...register("email", {
                  required: "Email is required",
                  validate: (value) =>
                    /\S+@\S+\.\S+/.test(value) || "Email address is invalid",
                })}
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
            <div className="relative mt-6">
              <input
                placeholder="Password"
                type="password"
                id="password"
                className={`${fieldClass} ${
                  errors.password ? "border-red-500" : ""
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long.",
                  },
                })}
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
                <p className={errorClass}>
                  {errors.password.message as string}
                </p>
              )}
            </div>
            <button
              disabled={submitting}
              type="submit"
              className={`mt-7 duration-500 transition-all w-full border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:-translate-y-2 hover:text-[#162341] ${
                submitting ? "py-0" : "py-3"
              }`}
            >
              {submitting ? <Spinner /> : "Sign Up"}
            </button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <p className="italic text-gray-400 mt-4">
            Already have an account? Log in{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              here!
            </Link>
          </p>
          <SignUpComplete
            isDialogOpen={showDialog}
            setDialog={() => {
              setShowDialog(false);
            }}
          />
        </div>
      </div>
    </>
  );
}
