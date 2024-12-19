import React from "react";
import { Product } from "~/components/schema/Proudct.schema";
interface ProductProps {
  product: Product;
}
const ProductSku = ({ product }: ProductProps) => {
  return (
    <div className="bg-white rounded-lg p-4 space-y-2 border border-gray-200">
      <p className="text-sm flex items-center gap-2">
        <span className="font-medium">SKU:</span>
        <span className="text-gray-600">{product.slug}</span>
      </p>
    </div>
  );
};

export default ProductSku;
