import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { SearchBar } from "./components/searchBar";
import { DropdownMenu } from "./components/dropdownMenu";
import Logo from "./logo";
import Account from "./components/account";
import NavCart from "./components/navCart";
import { AllProducts } from "./components/allProducts";

export const NavBar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) setDrawerOpen(false);
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return (
    <nav className="bg-white z-[9999] section fixed top-0 left-0 w-full flex justify-center shadow-sm">
      <div className="container">
        <div className="flex w-full bg-white items-center justify-between py-4">
          <Logo />
          <div className="hidden show gap-4">
            <AllProducts />
          </div>
          <div className="hidden show gap-4">
            <SearchBar />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2">
              <Account />
              <NavCart />
            </div>
            <button
              className="text-2xl lg:hidden"
              onClick={() => setDrawerOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {isDrawerOpen ? (
                <FiX className="text-black" />
              ) : (
                <FiMenu className="text-black" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Render mobile menu only after mount */}
      {typeof window !== "undefined" && isMobile && (
        <div
          className={`fixed top-[4rem] space-y-4 left-0 z-40 w-full h-[calc(100vh-4rem)] bg-gray-50 p-4 transform transition-transform duration-300 ease-out ${
            isDrawerOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
        >
          <DropdownMenu isMobile setDrawerOpen={setDrawerOpen} />
          <AllProducts setDrawerOpen={setDrawerOpen} />
          <SearchBar setDrawerOpen={setDrawerOpen} />
        </div>
      )}
    </nav>
  );
};

export default NavBar;
