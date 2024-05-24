import { ConnectDB } from "@/app/Db";
import { prismaInstance } from "@/utils/prismaInstance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export const GET = async (request: NextRequest) => {
  try {
    // Connect to DB
    await ConnectDB();

    // insert data into the DB
    const allProducts = (await prismaInstance.product.findMany()).reverse();

    // return the response
    return NextResponse.json(
      {
        success: true,
        data: allProducts,
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
          success: false,
          message: err?.issues[0]?.message,
        },
        {
          status: 201,
        }
      );
    }
    if (err instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          success: false,
          message: err?.message,
        },
        {
          status: 201,
        }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: err?.message,
      },
      {
        status: 201,
      }
    );
  }
};
