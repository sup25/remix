import AddToCartButton from "~/components/addtocart";
import { IProduct } from "~/components/schema/Proudct.schema";
import ShareButton from "./shareButton";
import { BookMark } from "./bookMark";
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

    <BookMark product={product} />
    <ShareButton />
  </div>
);

export default ProductActions;
