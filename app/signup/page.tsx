"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();

  const [toggleEye, setToggleEye] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onSignUp = useMutation({
    mutationFn: async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const res = await fetch("/api/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const result = await res.json();
        console.log("rs", result);
        if (res.ok && result) {
          return toast.success("User Successfully Registered.");
        }
        return result;
      } catch (error) {
        console.log(`Something went wrong. Sign Up Failed ${error}`);
        return toast.error(`Something went wrong. Sign Up Failed ${error}`);
      }
    },
    onSuccess: () => {
      setUser({
        username: "",
        email: "",
        password: "",
      });
      setTimeout(() =>{
        router.push('/login')
      }, 1500)
    },
  });
  return (
    <section className="container mx-auto">
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => onSignUp.mutate(e)}
        className="border p-4 max-w-lg mx-auto grid gap-4 rounded shadow mt-10"
      >
        <h2 className="text-center text-2xl font-bold">Sign Up</h2>
        <div>
          <h2>Enter UserName </h2>
          <Input
            value={user?.username}
            onChange={(e) =>
              setUser({
                ...user,
                username: e?.target?.value,
              })
            }
            name="username"
            type="text"
            placeholder="Enter UserName"
          />
        </div>
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
            className="password"
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
          Already a User{" "}
          <span>
            <Link className="hover:underline" href="/login">
              Login
            </Link>
          </span>
        </p>
      </form>
    </section>
  );
}
