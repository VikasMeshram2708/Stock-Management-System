import { ProductSchema, ProductSchemaType } from "@/models/ProductSchema";
import { connectDB } from "@/utils/Db";
import { prismaInstance } from "@/utils/PrismaInstance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export const POST = async (request: NextRequest) => {
  try {
    const reqBody: ProductSchemaType = await request.json();

    // Sanitize the incoming data
    ProductSchema.parse(reqBody);

    // connect to DB
    await connectDB();

    // insert into DB
    await prismaInstance.product.create({
      data: {
        productName: reqBody.name,
        productPrice: +reqBody.price,
        productCategory: reqBody.category,
      },
    });

    // return the response
    return NextResponse.json(
      {
        message: "Product added to cart.",
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
