import { useState } from "react";
import Logo from "../logo";
import { DropdownMenuMobile } from "../components/dropdownMenu/mobile";
import { AllProducts } from "../components/allProducts";
import { SearchBar } from "../components/searchBar";

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
    <div className="md:hidden relative">
      {/* Burger Menu Button */}
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

      {/* Sliding Menu Panel */}
      <div
        className={`fixed top-16 left-0 right-0 h-[calc(100vh-4rem)] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Close Button */}
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

        {/* Menu Content */}
        <div className="p-6 flex flex-col gap-6">
          {/* Search Bar */}
          <div className="w-full">
            <SearchBar />
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-4">
            {/* All Products */}
            <div className="py-2 border-b border-gray-100">
              <AllProducts />
            </div>

            {/* Dropdown Menu */}
            <div className="py-2 border-b border-gray-100">
              <DropdownMenuMobile />
            </div>
          </nav>
        </div>
      </div>

      {/* Dark Overlay */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black/50 z-30"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default MobileMenu;
