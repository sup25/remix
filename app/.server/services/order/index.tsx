import prisma from "~/_lib/db";

export const checkExistingOrder = async (transactionUuid: string) => {
  return prisma.order.findUnique({
    where: { transactionUuid },
  });
};
