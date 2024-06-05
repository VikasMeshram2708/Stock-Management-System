import { prismaInstance } from "./PrismaInstance";

export const connectDB = async () => {
  try {
    await prismaInstance.$connect();
    console.log("Connect to DB Successfully.");
  } catch (error) {
    console.log(`Something went wrong. Failed to connect to DB. :${error}`);
  } finally {
    await prismaInstance.$disconnect();
    console.log("Connection was released.");
  }
};
