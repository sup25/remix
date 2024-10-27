import ProductCard from "~/components/productCard";

const FeatureProducts = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="flex flex-col  justify-between flex-start gap-10">
          <h2 className="text-sm w-fit text-red-400 p-1 font-Arima font-semibold border border-gray-200 bg-white">
            Feature Products
          </h2>
          <ProductCard />
        </div>
      </div>
    </div>
  );
};

export default FeatureProducts;
