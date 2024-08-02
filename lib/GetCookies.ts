"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getCookie() {
  const token = cookies().get("token")?.value;
  if (!token) return null;
  const decoded = jwt.decode(token);
  return decoded;
}
