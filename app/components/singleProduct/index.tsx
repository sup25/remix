import { Product } from "../types";
import ProductImage from "./components/productImage";
import ProductDetails from "./components/productDetails";
import ProductActions from "./components/productActions";
import EsewaPayment from "../esewaPayment";

const SingleProduct = ({ product }: { product: Product }) => {
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductImage
            imageUrl={product.images?.[0] ?? ""}
            discountTag={product.discountTag}
            title={product.title ?? "Product Image"}
          />

          <div className="space-y-6">
            <ProductDetails product={product} />
            <ProductActions />

            <div className="bg-white rounded-lg p-4 space-y-2 border border-gray-200">
              <p className="text-sm flex items-center gap-2">
                <span className="font-medium">SKU:</span>
                <span className="text-gray-600">{product.slug}</span>
              </p>
            </div>

            <EsewaPayment amount={product.price} productName={product.title} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
