import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { BsFillHandbagFill } from "react-icons/bs";
import CartDrawer from "~/components/cartDrawer";
import { useCart } from "~/context/shoppingCart";

const NavCart = () => {
  const [showCart, setShowCart] = useState(false);
  const { cart } = useCart();
  const [isHydrated, setIsHydrated] = useState(false);

  const itemCount =
    cart?.reduce((total, item) => total + item.quantity, 0) || 0;

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleCartClick = () => {
    setShowCart(true);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showCart && <CartDrawer key="cart-drawer" onClose={handleCloseCart} />}
      </AnimatePresence>

      <div
        onClick={handleCartClick}
        className="relative flex rounded-md items-center gap-1 transition-all duration-300 ease-in-out hover:bg-gray-200 p-2 cursor-pointer group"
      >
        <BsFillHandbagFill
          size={24}
          className="transition-transform group-hover:scale-105"
        />
        <div className="rounded-full text-sm font-normal font-Arima px-2 py-1 border border-gray-300 bg-white transition-colors group-hover:border-gray-400">
          {isHydrated ? itemCount : ""}
        </div>
      </div>
    </>
  );
};

export default NavCart;
