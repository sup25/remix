import { BiPackage } from "react-icons/bi";

const DrawerBody = () => {
  const cartItems = [
    { id: 1, name: "Premium T-Shirt", price: 29.99, quantity: 2 },
    { id: 2, name: "Designer Jeans", price: 89.99, quantity: 1 },
    { id: 3, name: "Running Shoes", price: 119.99, quantity: 1 },
    { id: 3, name: "Running Shoes", price: 119.99, quantity: 1 },
    { id: 3, name: "Running Shoes", price: 119.99, quantity: 1 },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 5.99;
  const total = subtotal + shipping;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                <BiPackage className="w-8 h-8 text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  ${item.price.toFixed(2)} each
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrawerBody;
