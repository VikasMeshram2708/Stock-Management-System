import { ConnectDB } from "@/app/Db";
import { productSchema, productSchemaType } from "@/schema/Product";
import { prismaInstance } from "@/utils/prismaInstance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

interface ProductProp {
  productId: string;
}

export const DELETE = async (request: NextRequest) => {
  try {
    // Sanitize the incoming data
    const reqBody: ProductProp = await request.json();

    // Connect to DB
    await ConnectDB();

    // insert data into the DB
    await prismaInstance.product.delete({
      where: {
        id: reqBody.productId,
      },
    });

    // return the response
    return NextResponse.json(
      {
        success: true,
        message: "product removed successfully",
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
