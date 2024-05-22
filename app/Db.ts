import { prismaInstance } from "@/utils/prismaInstance";

export const ConnectDB = async () => {
  try {
    await prismaInstance.$connect();
    console.log("Connected to DB.");
  } catch (error) {
    console.log(`Something went wrong. Failed to connect to DB. ${error}`);
  } finally {
    prismaInstance.$disconnect();
    console.log("Connectiono released");
  }
};
