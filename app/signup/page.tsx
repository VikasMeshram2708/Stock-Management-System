"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <section className="container mx-auto">
      <form
        className="border p-4 max-w-lg mx-auto grid gap-4 rounded shadow mt-10"
        action=""
      >
        <h2 className="text-center text-2xl font-bold">Sign Up</h2>
        <div>
          <h2>Enter UserName </h2>
          <Input type="text" placeholder="Enter UserName" />
        </div>
        <div>
          <h2>Enter Email </h2>
          <Input type="text" placeholder="Enter Email" />
        </div>
        <div>
          <h2>Enter Password </h2>
          <Input type="password" placeholder="Enter Password" />
        </div>
        <Button>Login</Button>
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
