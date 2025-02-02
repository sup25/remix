import { useEffect, useState } from "react";
import { getFeaturedProducts } from "~/modules/home/api";
import ProductCard from "~/components/productCard";
import { TProduct } from "~/components/schema/types";
import { Loading } from "~/components/loading";
import { SomethingWentWrong } from "~/components/somethingWentWrong";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
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

  if (loading) return <Loading />;
  if (error) return <SomethingWentWrong />;

  const randomProducts = products
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  return (
    <div className="section">
      <div className="container">
        <div className="flex flex-col justify-between flex-start gap-10">
          <h2 className="text-sm w-fit text-red-400 p-1 font-Arima font-semibold border border-gray-200 bg-white">
            Featured Products
          </h2>
          <div className="w-full md:justify-start justify-center flex flex-wrap gap-9">
            {randomProducts.map((product) => (
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

export default FeaturedProducts;
