import { ProductSchema, ProductSchemaType } from "@/models/ProductSchema";
import { connectDB } from "@/utils/Db";
import { prismaInstance } from "@/utils/PrismaInstance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export const DELETE = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    const { productId } = reqBody;

    // connect to DB
    await connectDB();

    await prismaInstance.product.delete({
      where: {
        id: productId,
      },
    });

    // return the response
    return NextResponse.json(
      {
        message: "Product deleted",
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
