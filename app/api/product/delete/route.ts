import { ConnectDB } from "@/lib/Db";
import { PrismaInstance } from "@/lib/PrismaInstance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

interface DeleteProps {
  productId: string;
}

export const DELETE = async (request: NextRequest) => {
  try {
    const reqBody: DeleteProps = await request.json();

    // connect to DB
    await ConnectDB();

    // validate the product
    const product = await PrismaInstance.product.findUniqueOrThrow({
      where: {
        id: reqBody?.productId,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          message: "Product Not Found",
        },
        {
          status: 400,
        }
      );
    }

    // Query the DB
    await PrismaInstance.product.delete({
      where: {
        id: reqBody?.productId
      }
    })
    // Return the Response
    return NextResponse.json(
      {
        message: "Product Deleted",
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
