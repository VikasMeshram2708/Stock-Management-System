"use client";

import { Cross, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const handleToggle = () => {
    setMenu((prev) => !prev);
  };
  return (
    <nav className="px-4 py-2 container mx-auto flex items-center flex-wrap justify-between">
      <h1 className="text-lg sm:text-3xl font-semibold">
        Stock Management System
      </h1>
      {menu ? (
        <X onClick={handleToggle} className="cursor-pointer" />
      ) : (
        <Menu className="block lg:hidden cursor-pointer" onClick={handleToggle} />
      )}
      {menu && (
        <ul className="bg-slate-900 p-3 w-full md:mt-5 rounded">
          <p>
            <Link href="/">Home</Link>
          </p>
          <p>
            <Link href="/">About Us</Link>
          </p>
          <p>
            <Link href="/">Contact Us</Link>
          </p>
          <p>
            <Link href="/">Privacy Policy</Link>
          </p>
        </ul>
      )}
      {!menu && (
        <ul className="lg:flex hidden items-center flex-wrap gap-5">
          <p>
            <Link href="/">Home</Link>
          </p>
          <p>
            <Link href="/">About Us</Link>
          </p>
          <p>
            <Link href="/">Contact Us</Link>
          </p>
          <p>
            <Link href="/">Privacy Policy</Link>
          </p>
        </ul>
      )}
    </nav>
  );
}
