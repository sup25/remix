import { Link } from "@remix-run/react";

interface AllProductProps {
  setDrawerOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AllProducts = ({ setDrawerOpen }: AllProductProps) => {
  return (
    <Link
      onClick={() => {
        setDrawerOpen?.(false);
      }}
      to="/products"
      className="flex   text-gray-600 hover:text-black  text-base font-heading-nav px-2 py-3 hover:scale-105  rounded-md hover:bg-gray-200  transition-all duration-300 ease-in-out"
    >
      All Prouducts
    </Link>
  );
};
