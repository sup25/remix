import React, { ChangeEvent, useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IProduct } from "~/components/schema/Proudct.schema";
import { useCart } from "~/context/shoppingCart";

interface QuantityPickerProps {
  product: IProduct;
  min?: number;
  max?: number;
  className?: string;
  isSingleProduct?: boolean;
  quantity?: number;
  setQuantity?: React.Dispatch<React.SetStateAction<number>>;
}

const QuantityPicker: React.FC<QuantityPickerProps> = ({
  product,
  min = 0,
  max = product.stock,
  className = "",
  isSingleProduct = false,
  quantity = 0,
  setQuantity,
}) => {
  const { cart, updateQuantity } = useCart();
  const [currentQuantity, setCurrentQuantity] = useState(
    isSingleProduct ? quantity : 0
  );

  useEffect(() => {
    if (!isSingleProduct) {
      const cartQuantity =
        cart.find((item) => item.product.id === product.id)?.quantity || 0;
      setCurrentQuantity(cartQuantity);
    } else {
      setCurrentQuantity(quantity);
    }
  }, [cart, product.id, isSingleProduct, quantity]);

  const handleIncrement = (): void => {
    if (isSingleProduct) {
      if (quantity < max) setQuantity?.(quantity + 1);
    } else {
      if (currentQuantity < max) {
        updateQuantity(product.id, currentQuantity + 1);
      }
    }
  };

  const handleDecrement = (): void => {
    if (isSingleProduct) {
      if (quantity > min) setQuantity?.(quantity - 1);
    } else {
      if (currentQuantity > min) {
        updateQuantity(product.id, currentQuantity - 1);
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value, 10);
    if (isSingleProduct && setQuantity) {
      // Update local quantity for SingleProduct
      if (!isNaN(value) && value >= min && value <= max) setQuantity(value);
    } else if (!isSingleProduct && updateQuantity) {
      // Update the cart for Cart
      if (!isNaN(value) && value >= min && value <= max)
        updateQuantity(product.id, value);
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <button
        onClick={handleDecrement}
        disabled={currentQuantity <= min}
        className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
        type="button"
      >
        <FiMinus className="w-4 h-4" />
      </button>

      <input
        type="number"
        min={min}
        max={max}
        value={currentQuantity}
        onChange={handleInputChange}
        className="w-16 text-center rounded-md border border-gray-300 p-2"
        aria-label="Quantity"
      />

      <button
        onClick={handleIncrement}
        disabled={currentQuantity >= max}
        className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Increase quantity"
        type="button"
      >
        <FiPlus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default QuantityPicker;
