import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { DrawerNavProps } from "../type";

const DrawerNav = ({ onClose }: DrawerNavProps) => {
  return (
    <div className="min-h-6 p-2 bg-black flex items-center justify-between">
      <div className="text-white">Cart</div>
      <p className="text-white font-Arima font-semibold">Remix</p>

      <button onClick={onClose}>
        <RxCross1 className="text-white" />
      </button>
    </div>
  );
};

export default DrawerNav;
