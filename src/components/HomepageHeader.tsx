"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function HomePageHeader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <div className="flex justify-center items-center flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute border-white border rounded-3xl px-12 py-7 bg-[#162341]">
        <p
          className={`text-white text-3xl font-bold transition-all duration-1000 ${
            loaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}
        >
          Your Personal Expense Tracker
        </p>
        <p
          className={`text-white italic transition-all delay-1000 duration-1000 mb-6 ${
            loaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          }`}
        >
          Need help with your expenses? Click below to begin.
        </p>
        <Link href="/login">
          <button className="group flex flex-row gap-2 items-center border-2 border-white py-4 px-8 duration-500 rounded-3xl text-white transition-all hover:bg-white hover:-translate-y-2">
            <p className="group-hover:text-[#162341]">Get Started</p>
            <FaArrowRight className="text-4xl transform transition-transform duration-1000 group-hover:translate-x-4 group-hover:bg-[#162341] p-2 rounded-full" />
          </button>
        </Link>
      </div>
    </>
  );
}
