import { Link } from "@remix-run/react";
import { BiPackage, BiX } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { IBrowseItemsProps } from "./types";
const BrowseItems = ({
  heading,
  products,
  handler,
  link,
}: IBrowseItemsProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative h-screen w-full overflow-y-auto bg-white">
        <div className="mx-auto my-10 max-w-7xl px-4 py-8">
          <div className="flex items-center mt-6 justify-between bg-white p-4 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">{heading}</h2>
            <button
              onClick={handler}
              className="rounded-full p-2 text-black hover:bg-gray-100"
            >
              <BiX className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product.value}
                to={`/${link}/${product.value}`}
                onClick={handler}
                className="group relative flex flex-col rounded-lg border border-gray-200 bg-white p-6 transition-all hover:shadow-lg"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="rounded-lg bg-gray-50 p-3 transition-colors group-hover:bg-blue-50">
                    <BiPackage className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.count} items
                  </span>
                </div>

                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {product.label}
                </h3>

                <div className="mt-auto flex items-center text-sm text-gray-600 group-hover:text-blue-600">
                  <span className="mr-2">View collection</span>
                  <BsArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseItems;
