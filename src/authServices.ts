import prisma from "./lib/Prisma";

export const findAdmin = async (username: string) => {
  return prisma.admin.findUnique({
    where: {
      username, 
    },
  });
};