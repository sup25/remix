import { BiPackage } from "react-icons/bi";
import { BsBag } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import { useCart } from "~/context/shoppingCart";
import QuantityPicker from "~/components/quantityPicker";

const DrawerBody = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const hasItems = cart && cart.length > 0;

  return (
    <div className="flex h-[65%] w-full flex-col bg-gray-50">
      <div className="flex-1 py-6 px-2 overflow-y-auto">
        {hasItems ? (
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2 p-2 bg-white rounded-lg shadow-sm"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                  {item.product.images?.[0] ? (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <BiPackage className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="flex ">
                    <h3 className="font-medium">{item.product.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>

                  <div className="flex mt-1">
                    <QuantityPicker product={item.product} />
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FiTrash2 size={25} />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    रु{" "}
                    {(item.product.price * item.quantity).toLocaleString(
                      "ne-NP"
                    )}
                  </p>
                  <p className="text-sm text-gray-500">
                    रु {item.product.price.toLocaleString("ne-NP")}
                  </p>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <button
                onClick={clearCart}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <BsBag className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Your cart is empty
            </h3>
            <p className="text-sm text-gray-500 max-w-xs">
              Looks like you haven't added any items to your cart yet. Start
              shopping to fill it up!
            </p>
            <button className="mt-6 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              Browse Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DrawerBody;
