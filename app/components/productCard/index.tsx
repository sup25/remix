import { Link } from "@remix-run/react";
import { BsCart2 } from "react-icons/bs";
import { IProduct } from "../schema/Proudct.schema";
import { useState } from "react";
import CartDrawer from "../cartDrawer";

const ProductCard = ({ product }: { product: IProduct }) => {
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState<{ product: IProduct; quantity: number }[]>(
    []
  );

  const handleAddToCart = (product: IProduct) => {
    setShowCart(true);
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  return (
    <div className="w-72 bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <Link to={`/products/${product.slug}`}>
        {/* Image Container */}
        <div className="relative">
          {/* Discount Tag */}
          {product.discountTag && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
              {product.discountTag}% OFF
            </div>
          )}

          {/* Product Image */}
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

        {/* Product Info */}
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
      {/* Add to Cart Button */}
      <button
        onClick={() => handleAddToCart(product)}
        className="w-full bg-black text-white py-3 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors duration-300"
      >
        <BsCart2 className="w-5 h-5" />
        Add to cart
      </button>
      {showCart && <CartDrawer onClose={handleCloseCart} cart={cart} />}
    </div>
  );
};

export default ProductCard;
