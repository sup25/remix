export const getFeaturedProducts = async () => {
  const response = await fetch("/featured-product");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data.products;
};
