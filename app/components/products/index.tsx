import { Product } from "../../components/types";
import ProductCard from "../productCard";
const Products = ({ products }: { products: Product[] }) => {
  return (
    <div className="section">
      <div className="container">
        <div className="flex flex-col ">
          <h1 className="md:text-3xl font-Arima text-2xl font-bold text-black my-10">
            Proudcts
          </h1>
          <div className="flex flex-wrap gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
