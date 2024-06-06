import { connectDB } from "@/utils/Db";
import { prismaInstance } from "@/utils/PrismaInstance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

interface ProductProp {
  id: String;
  name: String;
  price: Number;
  category: String;
}

export const PUT = async (request: NextRequest) => {
  try {
    const reqBody: ProductProp = await request.json();

    // sanitize the incoming data
    // ProductSchema.parse(reqBody);

    const { id, name, price, category } = reqBody;

    // connect to DB
    await connectDB();

    // find the item
    const product = await prismaInstance.product.findUnique({
      where: {
        id: id as string,
      },
    });

    await prismaInstance.product.update({
      where: {
        id: id as string,
      },
      data: {
        productName: name as string,
        productCategory: (category as string) || product?.productCategory,
        productPrice: +price || product?.productPrice,
      },
    });

    // return the response
    return NextResponse.json(
      {
        message: "Product Updated",
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
