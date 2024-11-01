import { CgHeart, CgShare, CgShoppingCart } from "react-icons/cg";

const ProductActions = () => (
  <div className="flex gap-4">
    <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
      <CgShoppingCart className="h-5 w-5" />
      Add to Cart
    </button>

    <button
      className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      aria-label="Add to wishlist"
    >
      <CgHeart className="h-5 w-5" />
    </button>

    <button
      className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      aria-label="Share product"
    >
      <CgShare className="h-5 w-5" />
    </button>
  </div>
);

export default ProductActions;
