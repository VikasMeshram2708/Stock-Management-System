"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [toggleEye, setToggleEye] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = useMutation({
    mutationFn: async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const res = await fetch("/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const result = await res.json();
        console.log("r", result);
      } catch (error) {
        console.log(`Something went wrong. Login Failed. ${error}`);
        toast.error("Login failed");
      }
    },
    onSuccess: () => {
      setUser({
        email: "",
        password: "",
      });
      toast.success("Logged In.");
      setTimeout(() => {
        router.push("/profile");
      }, 1500);
    },
  });

  return (
    <section className="container mx-auto">
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => onLogin.mutate(e)}
        className="border p-4 max-w-lg mx-auto grid gap-4 rounded shadow mt-10"
      >
        <h2 className="text-center text-2xl font-bold">Login</h2>
        <div>
          <h2>Enter Email </h2>
          <Input
            value={user?.email}
            onChange={(e) =>
              setUser({
                ...user,
                email: e?.target?.value,
              })
            }
            name="email"
            type="text"
            placeholder="Enter Email"
          />
        </div>
        <div className="relative">
          <h2>Enter Password </h2>
          <Input
            value={user?.password}
            onChange={(e) =>
              setUser({
                ...user,
                password: e?.target?.value,
              })
            }
            name="password"
            type={toggleEye ? "text" : "password"}
            placeholder="Enter Password"
          />
          <Button
            type="button"
            onClick={() => setToggleEye((prev) => !prev)}
            className="absolute right-3 top-6"
            variant={"ghost"}
          >
            {toggleEye ? <Eye size={20} /> : <EyeOff size={20} />}
          </Button>
        </div>
        <Button type="submit">Login</Button>
        <p>
          Not a User{" "}
          <span>
            <Link className="hover:underline" href="/signup">
              Sign Up
            </Link>
          </span>
        </p>
      </form>
    </section>
  );
}
