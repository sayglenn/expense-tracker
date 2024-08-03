"use client";

import { GoGraph, GoGear, GoQuestion } from "react-icons/go";
import { GrTransaction } from "react-icons/gr";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const links = [
    { href: "/dashboard/home", icon: <GoGraph />, text: "Dashboard" },
    {
      href: "/dashboard/transactions",
      icon: <GrTransaction />,
      text: "Transactions",
    },
    { href: "/dashboard/settings", icon: <GoGear />, text: "Settings" },
    { href: "/dashboard/about", icon: <GoQuestion />, text: "About" },
  ];

  return (
    <div className="flex flex-col justify-around text-white w-[18%] text-xl border-r-2 pr-7 flex-shrink-0">
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          <div
            className={`flex flex-col items-center justify-center max-w-[220px] h-[180px] rounded-3xl gap-3 transition-transform transform duration-200 hover:scale-110 ${
              pathname == link.href ? "bg-[#0c1323]" : ""
            }`}
          >
            {link.icon}
            <p className="hidden md:text-sm md:block lg:text-xl">{link.text}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
