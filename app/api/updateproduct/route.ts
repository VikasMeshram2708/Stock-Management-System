import { ConnectDB } from "@/app/Db";
import { prismaInstance } from "@/utils/prismaInstance";
import { Category } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

interface ProductProp {
  id: string;
  title: string;
  price: number;
  category: Category;
}
export const PUT = async (request: NextRequest) => {
  try {
    // Sanitize the incoming data
    const reqBody: ProductProp = await request.json();

    // Connect to DB
    await ConnectDB();

    // insert data into the DB
    await prismaInstance.product.update({
      where: {
        id: reqBody.id,
      },
      data: {
        title: reqBody.title,
        price: reqBody.price,
        category: reqBody.category,
      },
    });

    // return the response
    return NextResponse.json(
      {
        success: true,
        message: "product updated successfully",
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
