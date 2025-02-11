import { Link } from "@remix-run/react";
import { IProduct } from "../schema/Proudct.schema";
import AddToCartButton from "../addtocart";
import { useEffect, useState } from "react";

const ProductCard = ({ product }: { product: IProduct }) => {
  const [currency, setCurrency] = useState<string | null>(null);
  useEffect(() => {
    setCurrency(product.price.toLocaleString("ne-NP"));
  }, []);

  return (
    <div className="w-72 h-[440px] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col">
      <Link to={`/products/${product.slug}`} className="flex-1">
        {/* Image Container - Fixed height */}
        <div className="relative">
          {product.discountTag && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
              {product.discountTag}% OFF
            </div>
          )}

          <div className="h-64 w-full bg-gray-50">
            {product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>
        </div>

        {/* Content Container - Fixed height with text truncation */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-base font-semibold font-Arima text-gray-900 mb-1 line-clamp-2 h-12">
            {product.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2 truncate">{product.brand}</p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-lg text-red-500 font-medium truncate">
                रु {currency}
              </span>
            </div>
            <span
              className={`text-sm ${
                product.stock > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {product.stock > 0 ? "In stock" : "Out of stock"}
            </span>
          </div>
        </div>
      </Link>
      <div className="pt-0">
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
