import { Link } from "@remix-run/react";

export const AllProductsMobile = () => {
  return (
    <Link
      to="/"
      className="font-Arima  text-gray-600 hover:text-black  text-2xl font-heading-nav px-4 py-3 hover:scale-105  rounded-md hover:bg-gray-200  transition-all duration-300 ease-in-out"
    >
      All Prouducts
    </Link>
  );
};
