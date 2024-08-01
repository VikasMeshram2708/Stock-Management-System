import { PrismaInstance } from "./PrismaInstance";

export async function ConnectDB() {
  try {
    await PrismaInstance.$connect();
    console.log("Connected to DB Successfully.");
  } catch (error) {
    console.log(`Something went wrong. Failed to Connect to DB.`);
  } finally {
    await PrismaInstance.$disconnect();
    console.log("Connection with DB Released.");
  }
}
