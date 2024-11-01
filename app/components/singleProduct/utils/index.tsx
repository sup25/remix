export const calculateOriginalPrice = (
  currentPrice: number,
  discountPercentage: number | null | undefined
): number => {
  if (!discountPercentage || discountPercentage === 0) return currentPrice;
  return Number((currentPrice / (1 - discountPercentage / 100)).toFixed(2));
};
