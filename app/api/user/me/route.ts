import { ConnectDB } from "@/lib/Db";
import { GetDataFromToken } from "@/lib/GetDataFromToken";
import { PrismaInstance } from "@/lib/PrismaInstance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export const GET = async (request: NextRequest) => {
  try {
    await ConnectDB();

    const token: any = await GetDataFromToken(request);
    if (!token) {
      return NextResponse.json(
        {
          message: "No Token",
        },
        {
          status: 400,
        }
      );
    }

    const user = await PrismaInstance.user?.findFirst({
      where: {
        id: token?.id,
      },
      select: {
        Product: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid User.",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        products: user?.Product.reverse(),
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
