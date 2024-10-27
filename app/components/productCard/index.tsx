import { BsCart2 } from "react-icons/bs";

const ProductCard = () => {
  return (
    <div className="w-80 bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative">
        {/* Discount Tag */}
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
          25% OFF
        </div>

        {/* Product Image */}
        <div className="h-64 bg-gray-50">
          <img
            src="https://res.cloudinary.com/dmufwerzv/image/upload/v1676881600/samples/ecommerce/accessories-bag.jpg"
            alt="Subscription Lamp"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-base font-normal text-gray-900 mb-1">
          Subscription Lamp #01
        </h3>

        {/* Brand/Manufacturer */}
        <p className="text-sm text-gray-600 mb-2">Lightnow</p>

        {/* Price & Stock */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-medium">$1,388.00</span>
          </div>
          <span className="text-sm text-green-500">In stock</span>
        </div>

        {/* Add to Cart Button */}
      </div>
      <button className="w-full bg-black text-white py-3 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors duration-300">
        <BsCart2 className="w-5 h-5" />
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
