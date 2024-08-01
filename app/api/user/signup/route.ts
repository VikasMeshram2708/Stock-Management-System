import { UserSchema } from "@/app/models/UserSchema";
import { ConnectDB } from "@/lib/Db";
import { PrismaInstance } from "@/lib/PrismaInstance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import bcrypt from "bcryptjs";

export const POST = async (request: NextRequest) => {
  try {
    const reqBody: UserSchema = await request.json();

    // Sanitize the Incoming Data
    const userData = UserSchema.parse({
      username: reqBody?.username,
      email: reqBody?.email,
      password: reqBody?.password,
    });

    // Connect to DB
    await ConnectDB();

    // Hash the Password
    const hashedPassword = await bcrypt.hash(userData?.password, 10);

    // Query the DB
    await PrismaInstance.user.create({
      data: {
        username: reqBody?.username,
        email: reqBody?.email,
        password: hashedPassword,
      },
    });

    // Return the Response
    return NextResponse.json(
      {
        message: "User Registered",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    const err = error as Error;
    if (err instanceof ZodError) {
      return NextResponse.json(
        {
          message: err?.issues[0]?.message,
        },
        {
          status: 500,
        }
      );
    }
    if (err instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          message: err?.message,
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json(
      {
        message: err?.message,
      },
      {
        status: 500,
      }
    );
  }
};
