import { ProductSchema } from "@/app/models/ProductSchema";
import { ConnectDB } from "@/lib/Db";
import { GetDataFromToken } from "@/lib/GetDataFromToken";
import { PrismaInstance } from "@/lib/PrismaInstance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export const POST = async (request: NextRequest) => {
  try {
    const reqBody: ProductSchema = await request.json();
    
    // token validation
    const tokenData:any = await GetDataFromToken(request);

    if (!tokenData) {
      return NextResponse.json(
        {
          message: "Invalid Token",
        },
        {
          status: 400,
        }
      );
    }

    // Sanitize the incoming data

    const productData = ProductSchema.parse({
      name: reqBody?.name,
      description: reqBody?.description,
      price: reqBody?.price,
      category: reqBody?.category,
    });

    // Connect to DB
    await ConnectDB();

    // const userId = "0be1cd22-980d-4563-98fc-a021a29009e0";

    // Query the DB
    await PrismaInstance.product.create({
      data: {
        name: productData?.name,
        description: productData?.description,
        price: productData?.price,
        category: productData?.category,
        User: {
          connect: {
            id: tokenData.id,
          },
        },
      },
    });

    // Return the Response
    return NextResponse.json(
      {
        message: "Product Added",
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
