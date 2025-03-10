import prisma from "~/_lib/db";

export const LoadProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

export const getProductsByBrand = async (brand: string) => {
  const products = await prisma.product.findMany({
    where: {
      brand: brand,
    },
  });
  return products;
};

export const getProductBySlug = async (slug: string) => {
  const product = await prisma.product.findUnique({
    where: { slug },
  });
  return product;
};

export const getProductByCategory = async (selectedCategories: string[]) => {
  const products = await prisma.product.findMany({
    where: {
      categories: {
        hasSome: selectedCategories,
      },
    },
  });

  return products;
};

export const getSerchBarProducts = async (searchOption: string) => {
  const products = await prisma.product.findMany({
    where: {
      categories: {
        has: searchOption.toLowerCase(),
      },
    },
  });
  return products;
};
