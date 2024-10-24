import { BsFillHandbagFill } from "react-icons/bs";

const NavCart = () => {
  return (
    <div className="flex rounded-md items-center gap-1 transition-all duration-300 ease-in-out hover:bg-gray-200 p-2 cursor-pointer">
      <BsFillHandbagFill size={24} />
      <div className="rounded-full text-sm font-normal font-Arima px-2 py-1 border border-gray-300 bg-white">
        0
      </div>
    </div>
  );
};

export default NavCart;
