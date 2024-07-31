"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-slate-950 container mx-auto border-b p-4 flex items-center justify-between">
      <h1 className="text-3xl font-bold">
        <Link href="/">Stock Management System</Link>
      </h1>
      {loggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>
              <Button className="rounded" variant={"destructive"}>
                Logout <LogOut className="ml-2"/>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button className="rounded">
          <Link href="/login">Login / Sign Up</Link>
        </Button>
      )}
    </nav>
  );
}
