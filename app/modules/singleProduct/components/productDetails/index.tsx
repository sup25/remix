import { useEffect, useState } from "react";
import { IProduct } from "~/components/schema/Proudct.schema";
import { calculateOriginalPrice } from "../../utils";

interface ProductDetailsProps {
  product: IProduct;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const originalPrice = calculateOriginalPrice(
    product.price,
    product.discountTag
  );
  const savings = Math.floor(originalPrice - product.price);

  const [formattedPrice, setFormattedPrice] = useState("");
  const [formattedOriginalPrice, setFormattedOriginalPrice] = useState("");
  const [formattedSavings, setFormattedSavings] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setFormattedPrice(
      "रु " + Math.floor(product.price).toLocaleString("en-NP")
    );
    setFormattedOriginalPrice(
      "रु " + Math.floor(originalPrice).toLocaleString("en-NP")
    );
    setFormattedSavings("रु " + savings.toLocaleString("en-NP"));
  }, [product.price, originalPrice, savings]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-500 uppercase tracking-wide">
          {product.brand}
        </p>
        <h1 className="text-3xl font-Arima text-gray-800 font-bold mt-2">
          {product.title}
        </h1>
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

        <div className="relative">
          <p
            className={`text-gray-600 leading-relaxed ${
              !isExpanded ? "line-clamp-2" : ""
            }`}
          >
            {product.description || "No description available"}
          </p>
          {product.description && product.description.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-1 focus:outline-none"
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 border text-gray-500 border-gray-300 rounded-full text-sm">
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
