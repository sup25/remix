import prisma from "~/_lib/db";

export const getProductBySlug = async (slug: string) => {
  const product = await prisma.product.findUnique({
    where: { slug },
  });
  return product;
};

export const getProductByCategory = async (selectedCategories: string[]) => {
  console.log(selectedCategories);
  const products = await prisma.product.findMany({
    where: {
      categories: {
        hasSome: selectedCategories,
      },
    },
  });

  return products;
};
