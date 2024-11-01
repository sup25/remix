import { BsCart2 } from "react-icons/bs";

interface ProductCardProps {
  product: {
    title: string;
    brand: string;

    price: number;
    stock: number;
    images: string[];
    discountTag?: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="w-80 bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
            <span className="text-lg font-medium">${product.price}</span>
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

      {/* Add to Cart Button */}
      <button className="w-full bg-black text-white py-3 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors duration-300">
        <BsCart2 className="w-5 h-5" />
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
