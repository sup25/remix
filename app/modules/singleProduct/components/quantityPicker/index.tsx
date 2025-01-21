import React, { useState, ChangeEvent } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IProduct } from "~/components/schema/Proudct.schema";

interface QuantityPickerProps {
  product: IProduct;
  min?: number;
  max?: number;
  initialValue?: number;
  onChange?: (value: number) => void;
  className?: string;
}

const QuantityPicker: React.FC<QuantityPickerProps> = ({
  product,
  min = 0,
  max = 99,
  initialValue = 1,
  onChange,
  className = "",
}) => {
  const [quantity, setQuantity] = useState<number>(initialValue);

  const handleIncrement = (): void => {
    if (quantity < max) {
      const newValue = quantity + 1;
      setQuantity(newValue);
      onChange?.(newValue);
    }
  };

  const handleDecrement = (): void => {
    if (quantity > min) {
      const newValue = quantity - 1;
      setQuantity(newValue);
      onChange?.(newValue);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= min && value <= max) {
      setQuantity(value);
      onChange?.(value);
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <button
        onClick={handleDecrement}
        disabled={quantity <= min}
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
        value={quantity}
        onChange={handleInputChange}
        className="w-16 text-center rounded-md border border-gray-300 p-2"
        aria-label="Quantity"
      />

      <button
        onClick={handleIncrement}
        disabled={quantity >= max}
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
