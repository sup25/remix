import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BsFillHandbagFill } from "react-icons/bs";
import CartDrawer from "~/components/cartDrawer";

const NavCart = () => {
  const [showCart, setShowCart] = useState(false);
  const handleCartClick = () => {
    setShowCart(true);
  };
  const handleCloseCart = () => {
    setShowCart(false);
  };
  return (
    <>
      <AnimatePresence>
        {showCart && <CartDrawer onClose={handleCloseCart} />}
      </AnimatePresence>
      <div
        onClick={handleCartClick}
        className="flex rounded-md items-center gap-1 transition-all duration-300 ease-in-out hover:bg-gray-200 p-2 cursor-pointer"
      >
        <BsFillHandbagFill size={24} />
        <div className="rounded-full text-sm font-normal font-Arima px-2 py-1 border border-gray-300 bg-white">
          0
        </div>
      </div>
    </>
  );
};

export default NavCart;
