import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function GetDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";

    // Decode the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);

    return decodedToken;
  } catch (error) {
    console.log('Invalid Token',error)
  }
}
