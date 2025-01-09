import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { DrawerNavProps } from "../type";
import { CgShoppingCart } from "react-icons/cg";

const DrawerNav = ({ onClose }: DrawerNavProps) => {
  return (
    <div className="min-h-6 p-2 bg-black flex items-center justify-between">
      <div className="flex items-center gap-2 ">
        <CgShoppingCart className="w-5 h-5 text-white" />
        <span className="font-medium text-white">({} items)</span>
      </div>
      <p className="text-white font-Arima font-semibold">Remix</p>

      <button onClick={onClose}>
        <RxCross1 className="text-white" />
      </button>
    </div>
  );
};

export default DrawerNav;
