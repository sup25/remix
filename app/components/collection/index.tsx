import ProductCard from "../productCard";
import { Product } from "../types";

const CollectionPage = ({ collectionData }: { collectionData: Product[] }) => {
  console.log(collectionData);

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

export default CollectionPage;
