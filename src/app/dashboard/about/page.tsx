"use client";

import { useState, useEffect } from "react";
import Images from "@/src/components/dashboard/about/Images";

export default function Page() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="flex flex-col text-white gap-2 flex-wrap p-7 items-start">
      <p
        className={`text-white text-3xl font-bold transition-all duration-1000 border-b ${
          loaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
        }`}
      >
        About
      </p>
      <p
        className={`text-sm text-white lg:text-lg delay-500 transition-all duration-1000 mt-2 ${
          loaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
        }`}
      >
        This finance tracker is built with the a few functionalities, such as
        transaction tracking and handling, as well as a main overview of your
        transactions via the graphs on the dashboard.
      </p>
      <p
        className={`text-sm text-white lg:text-lg delay-500 transition-all duration-1000 mt-2 ${
          loaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
        }`}
      >
        The technologies used in this project are listed below. Next.js,
        Supabase, TailwindCSS, and Vercel.
      </p>
      <Images />
    </div>
  );
}
