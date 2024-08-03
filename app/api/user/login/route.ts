import { LoginUserSchema } from "@/app/models/UserSchema";
import { ConnectDB } from "@/lib/Db";
import { PrismaInstance } from "@/lib/PrismaInstance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (request: NextRequest) => {
  try {
    const reqBody: LoginUserSchema = await request.json();

    // Sanitize the Incoming Data
    const userData = LoginUserSchema.parse({
      email: reqBody?.email,
      password: reqBody?.password,
    });

    // Connect to DB
    await ConnectDB();

    const user = await PrismaInstance.user.findFirst({
      where: {
        email: userData?.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          status: true,
          message: "Invalid User",
        },
        {
          status: 201,
        }
      );
    }

    // Compare the password
    const isValidPassword = await bcrypt.compare(
      userData?.password,
      user?.password!
    );

    if (!isValidPassword) {
      return NextResponse.json(
        {
          status: true,
          message: "Invalid Credentials",
        },
        {
          status: 400,
        }
      );
    }

    // Token Payload
    const payload = {
      id: user?.id,
      username: user?.username,
      email: user?.email,
    };

    // JWT
    const tokenData = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: 60 * 60,
    });

    console.log("token", tokenData);

    const response = NextResponse.json(
      {
        status: true,
        message: "User Logged In.",
      },
      {
        status: 201,
      }
    );

    response.cookies.set("token", tokenData, {
      httpOnly: true,
    });

    // Return the Response
    return response;
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
