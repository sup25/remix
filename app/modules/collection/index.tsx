import ProductCard from "~/components/productCard";
import { TProduct } from "~/components/schema/types";

type Props = {
  collectionData: TProduct[];
};

const Collection = ({ collectionData }: Props) => {
  return (
    <div className="section">
      <div className="container">
        <div className="flex flex-wrap gap-4 py-10">
          {collectionData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
