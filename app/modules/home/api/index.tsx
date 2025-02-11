export const getFeaturedProducts = async () => {
  const response = await fetch("/featuredProducts");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data.products;
};

export const getAllProducts = async () => {
  const response = await fetch("/browseProducts");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data.products;
};
