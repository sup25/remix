import { Link } from "@remix-run/react";
import { IProduct } from "../schema/Proudct.schema";
import AddToCartButton from "../addtocart";
import { useCart } from "~/hooks/useCart";

const ProductCard = ({ product }: { product: IProduct }) => {
  const { addToCart, isCartOpen, setIsCartOpen } = useCart();

  const handleAddToCart = (e: React.MouseEvent, product: IProduct) => {
    e.preventDefault();
    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    <div className="w-72 bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <Link to={`/products/${product.slug}`}>
        {/* Image Container */}
        <div className="relative">
          {product.discountTag && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
              {product.discountTag}% OFF
            </div>
          )}

          <div className="h-64 bg-gray-50">
            {product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                No image available
              </div>
            )}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-base font-normal text-gray-900 mb-1">
            {product.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-lg text-red-500 font-medium">
                रु {product.price.toLocaleString("ne-NP")}
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

      <AddToCartButton product={product} />
    </div>
  );
};

export default ProductCard;
