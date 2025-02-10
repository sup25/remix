import prisma from "~/_lib/db";
//Get specific user Bookmarks
export const getUserBookmarks = async (userId: number) => {
  return prisma.bookMark.findMany({
    where: {
      userId: userId,
    },
    include: {
      product: true,
    },
  });
};

//Get Bookmark (to check if it exists)
export const getBookmark = async (userId: number, productId: number) => {
  return prisma.bookMark.findFirst({
    where: { userId, productId },
  });
};

// Create Bookmark
export async function createBookmark(userId: number, productId: number) {
  return await prisma.bookMark.create({
    data: { userId, productId },
  });
}

// Delete Bookmark
export async function deleteBookmark(userId: number, productId: number) {
  return await prisma.bookMark.deleteMany({
    where: { userId, productId },
  });
}
