import { CgHeart, CgShare } from "react-icons/cg";
import { BsCart2 } from "react-icons/bs";
const ProductActions = () => (
  <div className="flex gap-4">
    <button className="flex-1 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
      <BsCart2 className="h-5 w-5" />
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
