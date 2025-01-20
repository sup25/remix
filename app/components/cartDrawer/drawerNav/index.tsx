import { RxCross1 } from "react-icons/rx";
import { DrawerProps } from "../type";
import { CgShoppingCart } from "react-icons/cg";
import { useCart } from "~/context/shoppingCart";

const DrawerNav = ({ onClose }: DrawerProps) => {
  const { totalItems } = useCart();
  const itemCount = totalItems || 0;

  return (
    <div className="min-h-6 p-2 bg-black flex items-center justify-between">
      <div className="flex items-center gap-2">
        <CgShoppingCart className="w-5 h-5 text-white" />
        <span className="font-medium text-white">
          ({itemCount} {itemCount === 1 ? "item" : "items"})
        </span>
      </div>
      <p className="text-white font-Arima font-semibold">Remix</p>

      <button onClick={onClose}>
        <RxCross1 className="text-white" />
      </button>
    </div>
  );
};

export default DrawerNav;
