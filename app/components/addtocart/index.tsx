import { BsCart2, BsCheckLg } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { IProduct } from "~/components/schema/Proudct.schema";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "~/hooks/useCart";

interface AddToCartButtonProps {
  product: IProduct;
  className?: string;
  quantity?: number;
  setQuantity?: React.Dispatch<React.SetStateAction<number>>;
}

const AddToCartButton = ({
  product,
  quantity,
  setQuantity,
  className = "",
}: AddToCartButtonProps) => {
  const { addToCart, setIsCartOpen, cart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const cartItem = cart.find((item) => item.product.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;
  const availableStock = product.stock - cartQuantity;

  const requestedQuantity = quantity ?? 1;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAdding) return;

    // Prevent adding if stock is zero
    if (product.stock <= 0) {
      toast.error("Out of stock");
      return;
    }

    // Ensure quantity is valid
    if (requestedQuantity <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }

    // Check if requested quantity exceeds available stock
    if (requestedQuantity > availableStock) {
      toast.error(`Only ${availableStock} items available`);
      return;
    }

    for (let i = 0; i < requestedQuantity; i++) {
      addToCart(product);
    }

    setIsAdding(true);

    // Simulate adding to the cart
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsAdding(false);
    setIsCartOpen(true);

    // Reset quantity after adding to the cart
    if (setQuantity) {
      setQuantity(0);
    }
  };

  return (
    <motion.button
      onClick={handleAddToCart}
      disabled={availableStock <= 0 || isAdding}
      className={`w-full py-3 flex items-center justify-center gap-2 transition-colors duration-300 disabled:cursor-not-allowed ${className}`}
      style={{
        backgroundColor: isAdding ? "#22c55e" : "black",
      }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        {isAdding ? (
          <motion.div
            key="success"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex items-center gap-2 text-white"
          >
            <BsCheckLg className="w-5 h-5" />
            Added!
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex items-center gap-2 text-white"
          >
            <BsCart2 className="w-5 h-5" />
            Add to cart
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default AddToCartButton;
