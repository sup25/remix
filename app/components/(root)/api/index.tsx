export const getFeaturedProducts = async () => {
  const response = await fetch("/featuredProduct");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data.products;
};
