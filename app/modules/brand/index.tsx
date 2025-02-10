import ProductCard from "~/components/productCard";
import { TProduct } from "~/components/schema/types";

type Props = {
  brandData: TProduct[];
};

const Brand = ({ brandData }: Props) => {
  return (
    <div className="section">
      <div className="container">
        <div className="flex flex-wrap gap-4 py-10 ">
          {brandData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brand;
