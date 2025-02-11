import { IProduct } from "../../components/schema/Proudct.schema";
import ProductCard from "../../components/productCard";
import { SomethingWentWrong } from "~/components/somethingWentWrong";
const Products = ({
  products,
}: {
  products: IProduct[] | null | undefined;
}) => {
  if (!products || products.length === 0) return <SomethingWentWrong />;
  return (
    <div className="section  ">
      <div className="container md:pb-20 pb-10">
        <div className="flex  flex-col">
          <h1 className="md:text-3xl font-Arima text-2xl font-bold text-black my-10">
            Proudcts
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-6 px-4 md:px-0 justify-items-center md:justify-items-start">
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
