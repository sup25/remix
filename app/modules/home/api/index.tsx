import { SomethingWentWrong } from "~/components/somethingWentWrong";

export const getFeaturedProducts = async () => {
  const response = await fetch("/featuredProducts");
  if (!response.ok) {
    <SomethingWentWrong />;
  }
  const data = await response.json();
  return data.products;
};
