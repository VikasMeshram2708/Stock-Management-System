import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCookie } from "@/lib/GetCookies";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, LogOut, Mail, User } from "lucide-react";
import Link from "next/link";
import TotalProduct from "@/components/TotalProduct";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user: any = await getCookie();

  return (
    <section className="min-h-screen container mx-auto flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt={user?.username}
            />
            <AvatarFallback>
              {user?.username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold">{user?.username}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-gray-500" />
            <CardDescription>{user?.username}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-gray-500" />
            <CardDescription>{user?.email}</CardDescription>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/" className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </Button>
          <form
            action={async () => {
              "use server";
              cookies().set("token", "", {
                expires: new Date(0),
                httpOnly: true,
              });
              console.log("logout-success");
              redirect("/login");
            }}
          >
            <Button
              type="submit"
              variant="destructive"
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </form>
          <Button>
            <Link href="/">
              Total Products :
              <TotalProduct />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
