import NextJS from "./images/nextjs.png";
import Supabase from "./images/supabase.png";
import TailwindCSS from "./images/tailwind.webp";
import Vercel from "./images/vercel.svg";
import Image from "next/image";

export default function Images() {
  return (
    <>
      <div className="hidden sm:flex flex-row gap-5 justify-center p-8 flex-wrap self-center bg-white items-center rounded-3xl mt-6">
        <Image src={NextJS} alt="Next.js" width={100} height={100} />
        <Image src={Supabase} alt="PostgreSQL" width={100} height={100} />
        <Image src={TailwindCSS} alt="TailwindCSS" width={100} height={100} />
        <Image src={Vercel} alt="Vercel" width={100} height={100} />
      </div>
      <div className="flex sm:hidden flex-row gap-2 justify-center p-3 flex-wrap self-center bg-white items-center rounded-3xl mt-2">
        <Image src={NextJS} alt="Next.js" width={40} height={40} />
        <Image src={Supabase} alt="PostgreSQL" width={40} height={40} />
        <Image src={TailwindCSS} alt="TailwindCSS" width={40} height={40} />
        <Image src={Vercel} alt="Vercel" width={40} height={40} />
      </div>
    </>
  );
}
