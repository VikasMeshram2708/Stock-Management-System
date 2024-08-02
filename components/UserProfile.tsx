"use server";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { getCookie } from "@/lib/GetCookies";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function UserProfile() {
  const cookieValue: any = await getCookie();
  console.log("c", cookieValue);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{cookieValue.username}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <form
            action={() => {
              "use server";
              cookies().set("token", "", {
                expires: new Date(0),
                httpOnly: true,
              });
              console.log('logout-success');
            }}
          >
            <Button type="submit" className="rounded" variant={"destructive"}>
              Logout <LogOut className="ml-2" />
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
