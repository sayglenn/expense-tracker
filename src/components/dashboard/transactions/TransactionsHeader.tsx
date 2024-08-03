"use client";

import { useState, useEffect } from "react";

export default function TransactionsHeader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="flex flex-col text-white gap-1 flex-wrap">
      <p
        className={`text-white text-3xl font-bold transition-all duration-1000 border-b ${
          loaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
        }`}
      >
        Your Transactions
      </p>
    </div>
  );
}
