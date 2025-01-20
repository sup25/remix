import { BsCart2, BsCheckLg } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { useCart } from "~/context/shoppingCart";
import { IProduct } from "~/components/schema/Proudct.schema";

interface AddToCartButtonProps {
  product: IProduct;
  className?: string;
}

const AddToCartButton = ({ product, className = "" }: AddToCartButtonProps) => {
  const { addToCart, setIsCartOpen } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAdding) return;

    setIsAdding(true);
    addToCart(product);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsAdding(false);
    setIsCartOpen(true);
  };

  return (
    <motion.button
      onClick={handleAddToCart}
      disabled={product.stock <= 0 || isAdding}
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
