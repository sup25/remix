import { Link } from "@remix-run/react";

export const AllProducts = () => {
  return (
    <Link
      to="/"
      className="flex   text-gray-600 hover:text-black  text-base font-heading-nav px-2 py-3 hover:scale-105  rounded-md hover:bg-gray-200  transition-all duration-300 ease-in-out"
    >
      All Prouducts
    </Link>
  );
};
