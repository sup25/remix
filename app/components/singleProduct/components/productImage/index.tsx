import React from "react";

interface ProductImageProps {
  imageUrl: string;
  discountTag?: number | null;
  title: string;
}

const ProductImage: React.FC<ProductImageProps> = ({
  imageUrl,
  discountTag,
  title,
}) => (
  <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
    <img
      src={imageUrl || "/api/placeholder/600/600"}
      alt={title || "Product Image"}
      className="w-full h-full object-cover"
    />
    {discountTag && discountTag > 0 && (
      <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
        {discountTag}% OFF
      </span>
    )}
  </div>
);

export default ProductImage;
