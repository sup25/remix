import { CgHeart, CgShare } from "react-icons/cg";
import AddToCartButton from "~/components/addtocart";
import { IProduct } from "~/components/schema/Proudct.schema";
import ShareButton from "./shareButton";
interface ProductActionsProps {
  product: IProduct;
  quantity?: number;
  setQuantity?: React.Dispatch<React.SetStateAction<number>>;
}
const ProductActions = ({
  product,
  quantity,
  setQuantity,
}: ProductActionsProps) => (
  <div className="flex gap-4">
    <AddToCartButton
      product={product}
      quantity={quantity}
      setQuantity={setQuantity}
    />

    <button
      className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      aria-label="Add to wishlist"
    >
      <CgHeart className="h-5 w-5 text-black" />
    </button>

    {/* <button
      className="p-3 border border-gray-300 rounded-lg  hover:bg-gray-50 transition-colors"
      aria-label="Share product"
    >
      <CgShare className="h-5 w-5 text-black" />
    </button> */}
    <ShareButton />
  </div>
);

export default ProductActions;
