import NavBar from "@/src/components/dashboard/NavBar";
import AddTransaction from "@/src/components/dashboard/AddTransaction";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-row border-2 border-white bg-[#162341] w-[90%] p-7 rounded-3xl">
          <NavBar />
          {children}
          <AddTransaction />
        </div>
      </div>
    </>
  );
}
