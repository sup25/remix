import { CgHeart, CgShare } from "react-icons/cg";
import AddToCartButton from "~/components/navbar/components/addtocart";
import { IProduct } from "~/components/schema/Proudct.schema";
const ProductActions = ({ product }: { product: IProduct }) => (
  <div className="flex gap-4">
    <AddToCartButton product={product} />

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
