import { UpdateProductSchema } from "@/app/models/ProductSchema";
import { ConnectDB } from "@/lib/Db";
import { PrismaInstance } from "@/lib/PrismaInstance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export const PUT = async (request: NextRequest) => {
  try {
    const reqBody: UpdateProductSchema = await request.json();

    // Sanitize the incoming data
    const productData = UpdateProductSchema.parse({
      id: reqBody?.id,
      name: reqBody?.name,
      price: reqBody?.price,
      description: reqBody?.description,
      category: reqBody?.category,
    });

    // connect to DB
    await ConnectDB();

    // validate the product id
    const product = await PrismaInstance.product.findUniqueOrThrow({
      where: {
        id: productData?.id,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          message: "No Product Found",
        },
        {
          status: 400,
        }
      );
    }

    // query the DB
    await PrismaInstance.product.update({
      where: {
        id: reqBody?.id,
      },
      data: {
        name: productData?.name,
        category: productData?.category,
        description: productData?.description,
        price: productData?.price,
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
