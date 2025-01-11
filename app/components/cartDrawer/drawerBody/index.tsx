import { BiPackage } from "react-icons/bi";
import { BsBag } from "react-icons/bs";
import { IProduct } from "~/components/schema/Proudct.schema";

const DrawerBody = ({ product }: { product?: IProduct }) => {
  const cartItems = product
    ? [
        {
          id: product.id,
          name: product.title,
          price: product.price,
          quantity: 1,
          image: product.images?.[0],
        },
      ]
    : [];

  return (
    <div className="flex h-[65%] w-full flex-col bg-gray-50">
      <div className="flex-1 p-6 overflow-y-auto">
        {cartItems.length > 0 ? (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <BiPackage className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    रु {(item.price * item.quantity).toLocaleString("ne-NP")}
                  </p>
                  <p className="text-sm text-gray-500">
                    रु {item.price.toLocaleString("ne-NP")} each
                  </p>
                </div>
              </div>
            ))}
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
