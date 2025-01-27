// components/HeroHeader.tsx
import { Link } from "@remix-run/react";
import { FaAngleRight } from "react-icons/fa6";

const HeroHeader: React.FC = () => (
  <div className="flex flex-col gap-4">
    <h2 className="text-sm w-fit text-red-400 p-1 font-Arima font-semibold border border-gray-200 bg-white">
      Selected iconic design
    </h2>
    <h1 className="md:text-3xl font-Arima text-2xl font-bold text-black">
      Iconic products. Luxury furniture.
    </h1>
    <p className="w-full max-w-[600px] text-black">
      Discover iconic, luxury furniture designed to elevate every space. Crafted
      with exceptional quality and timeless elegance, our collection combines
      modern sophistication with classic beauty, perfect for those who seek
      refined style and unparalleled craftsmanship.
    </p>
    <Link
      to="/products"
      className="group text-base w-fit font-semibold flex items-center"
    >
      Browse all products
      <div className="group-hover:translate-x-2 transition-all duration-300 ease-in-out">
        <FaAngleRight />
      </div>
    </Link>
  </div>
);

export default HeroHeader;
