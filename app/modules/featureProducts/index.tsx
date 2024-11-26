import { useEffect, useState } from "react";
import { getFeaturedProducts } from "./api";
import ProductCard from "~/components/productCard";
import { ProductProp } from "~/components/types";

const FeatureProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const products = await getFeaturedProducts();
        setProducts(products);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="section">
      <div className="container">
        <div className="flex flex-col  justify-between flex-start gap-10">
          <h2 className="text-sm w-fit text-red-400 p-1 font-Arima font-semibold border border-gray-200 bg-white">
            Feature Products
          </h2>
          <div className="w-full  flex flex-wrap gap-9">
            {products.map((product: ProductProp) => (
              <ProductCard
                key={product.id}
                product={{
                  title: product.title,
                  brand: product.brand,
                  slug: product.slug,
                  price: product.price,
                  stock: product.stock,
                  images: product.images,
                  discountTag: product.discountTag,
                  categories: product.categories,
                  id: product.id,
                  createdAt: product.createdAt,
                  updatedAt: product.updatedAt,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureProducts;
