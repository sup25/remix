import { Link } from "@remix-run/react";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { LuShapes } from "react-icons/lu";
import { MdOutlineVerified } from "react-icons/md";
import BrowseByCategories from "~/components/browseByCategories";

const Hero = () => {
  const [showCategories, setShowCategories] = useState(false);
  const showAllCategories = () => {
    setShowCategories(true);
  };
  const hideCategories = () => {
    setShowCategories(false);
  };
  return (
    <div className="section">
      <div className="container">
        {showCategories && (
          <BrowseByCategories hideCategories={hideCategories} />
        )}
        <div className="flex justify-between pt-20 items-center gap-10 flex-wrap">
          <div className="flex flex-col gap-4 ">
            <h2 className="text-sm w-fit text-red-400 p-1 font-Arima font-semibold border border-gray-200 bg-white">
              Selected iconic design
            </h2>
            <h1 className="md:text-3xl font-Arima text-2xl font-bold text-black ">
              Iconic products. Luxury furniture.
            </h1>
            <p className=" w-full  max-w-[600px]">
              Discover iconic, luxury furniture designed to elevate every space.
              Crafted with exceptional quality and timeless elegance, our
              collection combines modern sophistication with classic beauty,
              perfect for those who seek refined style and unparalleled
              craftsmanship.
            </p>
            <Link
              to="/products"
              className=" group text-base w-fit   font-semibold flex  items-center "
            >
              Browse all products
              <div className="group-hover:translate-x-2 transition-all duration-300 ease-in-out">
                <FaAngleRight />
              </div>
            </Link>
          </div>
          <div className="flex flex-col h-fit p-4 flex-wrap justify-between gap-2 rounded bg-gray-200 w-full md:max-w-[500px]">
            <div
              onClick={showAllCategories}
              className="inline-flex  cursor-pointer gap-4 bg-white hover:bg-gray-100 p-5 items-center font-bold rounded transition-all duration-300 ease-in-out "
            >
              <LuShapes size={25} /> Browse by categories
            </div>
            <Link
              to="/products"
              className="inline-flex gap-4  bg-white hover:bg-gray-100 p-5 items-center font-bold transition-all duration-300 ease-in-out "
            >
              <MdOutlineVerified size={25} /> Browse by brands
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
