import { useState } from "react";
import SearchBar from "../components/searchBar";

import { DropdownMenuMobile } from "../components/dropdownMenu/mobile";
import { AllProductsMobile } from "../components/allProducts/mobile";
import Logo from "../logo";
import SearchBarMobile from "../components/searchBar/mobile";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (e: any) => {
    e.preventDefault();
    console.log("Navigating to:", e.target.href);
    setIsOpen(false);
  };

  return (
    <div className="none relative">
      {/* Burger Menu Button - Visible in navbar */}
      {!isOpen && (
        <button
          onClick={toggleMenu}
          className="p-2 focus:outline-none bg-transparent rounded-md relative z-50"
          aria-label="Open Menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className="block h-0.5 w-full bg-black" />
            <span className="block h-0.5 w-full bg-black" />
            <span className="block h-0.5 w-full bg-black" />
          </div>
        </button>
      )}

      {/* Sliding Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "-translate-x-0" : "translate-x-full"
        }`}
      >
        {/* X Button inside drawer */}
        {isOpen && (
          <div className=" w-full justify-between items-center">
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 p-2 focus:outline-none bg-transparent rounded-md"
              aria-label="Close Menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className="block h-0.5 w-full bg-black transform rotate-45 translate-y-2" />
                <span className="block h-0.5 w-full bg-black opacity-0" />
                <span className="block h-0.5 w-full bg-black transform -rotate-45 -translate-y-2" />
              </div>
            </button>
            <div className="absolute top-4 left-4">
              <Logo />
            </div>
          </div>
        )}

        {/* Drawer Content */}
        <div className="pt-16 px-4">
          <nav className="flex flex-col gap-2">
            <DropdownMenuMobile />
            <AllProductsMobile />
            <SearchBarMobile />
          </nav>
        </div>
      </div>

      {/* Dark Overlay */}
      {/* {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black/50 z-40"
          aria-hidden="true"
        />
      )} */}
    </div>
  );
};

export default MobileMenu;
