import { getCookie } from "@/lib/GetCookies";
import Link from "next/link";
import UserProfile from "./UserProfile";
import { Button } from "./ui/button";



export default async function Navbar() {
  const token = await getCookie();

  return (
    <nav className="sticky top-0 z-40 bg-slate-950 container mx-auto border-b p-4 flex items-center justify-between">
      <h1 className="text-3xl font-bold">
        <Link href="/">Stock Management System</Link>
      </h1>
      {token ? (
        <UserProfile />
      ) : (
        <Button className="rounded">
          <Link href="/login">Login / Sign Up</Link>
        </Button>
      )}
    </nav>
  );
}
