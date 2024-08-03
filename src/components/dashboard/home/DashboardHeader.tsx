"use client";

import { useState, useEffect } from "react";

export default function DashboardHeader({ name }: { name: string }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="flex flex-col text-white gap-1 border-b flex-wrap">
      <p
        className={`text-white text-3xl font-bold transition-all duration-1000 ${
          loaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
        }`}
      >
        Welcome, {name}.
      </p>
      <p
        className={`text-wrap text-white italic transition-all delay-1000 duration-1000 ${
          loaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
        }`}
      >
        Take a quick look at your most recent transactions.
      </p>
    </div>
  );
}
