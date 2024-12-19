import { BiCategory } from "react-icons/bi";
import { Product } from "~/components/schema/Proudct.schema";
interface ProductProps {
  product: Product;
}
const ProductCategories = ({ product }: ProductProps) => {
  return (
    <div className="bg-white rounded-lg p-4 space-y-2 border border-gray-200">
      <div className="flex items-center gap-2 mb-2">
        <BiCategory className="w-5 h-5 text-gray-600" />
        <h3 className="font-medium">Categories</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {product.categories?.map((category, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-sm text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
