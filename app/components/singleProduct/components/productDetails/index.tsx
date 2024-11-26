import { Product } from "../../../types";
import { calculateOriginalPrice } from "../../utils";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const originalPrice = calculateOriginalPrice(
    product.price,
    product.discountTag
  );
  const savings = Math.floor(originalPrice - product.price);

  const formattedPrice =
    "रु " + Math.floor(product.price).toLocaleString("en-NP");
  const formattedOriginalPrice =
    "रु " + Math.floor(originalPrice).toLocaleString("en-NP");
  const formattedSavings = "रु " + savings.toLocaleString("en-NP");

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-500 uppercase tracking-wide">
          {product.brand}
        </p>
        <h1 className="text-3xl font-bold mt-2">{product.title}</h1>
      </div>

      <div className="space-y-4">
        <div className="flex items-baseline gap-4">
          {product.discountTag && product.discountTag > 0 ? (
            <>
              <span className="text-3xl font-bold text-red-600">
                {formattedPrice}
              </span>
              <span className="text-lg text-gray-500 line-through">
                {formattedOriginalPrice}
              </span>
              <span className="text-sm font-medium text-red-600">
                Save {formattedSavings}
              </span>
            </>
          ) : (
            <span className="text-3xl font-bold">{formattedPrice}</span>
          )}
        </div>

        <p className="text-gray-600 leading-relaxed">
          {product.description || "No description available"}
        </p>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 border border-gray-300 rounded-full text-sm">
            Stock: {product.stock} units
          </span>
          {product.stock < 10 && (
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
              Low Stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
