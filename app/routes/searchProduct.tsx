import { useLoaderData } from "@remix-run/react";
import { ShowProductInSearchBar as loader } from "../api";
import { IProduct } from "~/components/schema/Proudct.schema";
import ProductCard from "~/components/productCard";

export { loader };

export default function SearchProduct() {
  const searchData = useLoaderData<IProduct[]>();

  return (
    <div className="section bg-gray-50 h-screen">
      <div className="container   py-8">
        <div className="space-y-8">
          <div className="border-b border-gray-200 pb-5">
            <h1 className="text-3xl font-Arima font-bold tracking-tight text-gray-900">
              Search Results
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Found {searchData.length}{" "}
              {searchData.length === 1 ? "product" : "products"}
            </p>
          </div>

          {searchData.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
              {searchData.map((product) => (
                <div
                  key={product.id}
                  className="group relative flex justify-center"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg bg-white p-8 text-center shadow-sm">
              <p className="text-gray-500">
                No products found for your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
