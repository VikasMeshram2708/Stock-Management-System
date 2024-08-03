import { GetDataFromToken } from "@/lib/GetDataFromToken";
import { PrismaInstance } from "@/lib/PrismaInstance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export const GET = async (request: NextRequest) => {
  try {
    const userData: any = await GetDataFromToken(request);
    // console.log('ud', userData);

    const userProducts = await PrismaInstance.user.findFirst({
      where: {
        id: userData?.id,
      },
      select: {
        Product: true,
      },
    });

    // console.log("pd", userProducts);

    const products = userProducts?.Product.reverse();

    return NextResponse.json(
      {
        products,
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
