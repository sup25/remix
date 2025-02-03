import ProductImage from "./components/productImage";
import ProductDetails from "./components/productDetails";
import ProductActions from "./components/productActions";

import ProductCategories from "./components/productCategories";
import QuantityPicker from "../../components/quantityPicker";
import { IProduct } from "~/components/schema/Proudct.schema";
import EsewaPayment from "~/components/esewaPayment";
import { useEffect, useState } from "react";

const SingleProduct = ({ product }: { product: IProduct }) => {
  const [localQuantity, setLocalQuantity] = useState(0);
  const multipliedProducts = localQuantity * product.price;

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("quantity", localQuantity.toString());
    }
  }, [localQuantity]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <section className="py-12   section bg-gray-50">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductImage
            imageUrl={product.images?.[0] ?? ""}
            discountTag={product.discountTag}
            title={product.title ?? "Product Image"}
          />

          <div className="space-y-6">
            <ProductDetails product={product} />
            <ProductCategories product={product} />
            <QuantityPicker
              product={product}
              quantity={localQuantity}
              setQuantity={setLocalQuantity}
              isSingleProduct={true}
            />
            <ProductActions
              product={product}
              quantity={localQuantity}
              setQuantity={setLocalQuantity}
            />
            <EsewaPayment
              product={product}
              amount={Number(multipliedProducts)}
              quantity={localQuantity}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
