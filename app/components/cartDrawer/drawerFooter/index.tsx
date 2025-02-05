import { BiChevronRight } from "react-icons/bi";
import { useCart } from "~/hooks/useCart";
import Checkout from "./checkoutBtn";

const DrawerFooter = () => {
  const { cart } = useCart();
  console.log(cart);

  const items = cart;
  const subtotal = items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);
  const shipping = subtotal ? 100 : 0;
  const total = subtotal + shipping;
  return (
    <div className="p-4 pb-4  fixed bottom-0 w-full  bg-white border-t border-gray-200">
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>
            रु
            {subtotal.toLocaleString("ne-NP", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>
            रु
            {shipping.toLocaleString("ne-NP", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <hr className="border-gray-200" />
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>
            रु
            {total.toLocaleString("ne-NP", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>

      <Checkout products={cart} amount={total} />
    </div>
  );
};

export default DrawerFooter;
