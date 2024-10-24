import Logo from "./logo";
import { DropdownMenu } from "./components/dropdownMenu";
import { AllProducts } from "./components/allProducts";
import SearchBar from "./components/searchBar";
import Account from "./components/account";
import NavCart from "./components/navCart";
import MobileMenu from "./mobileMenu";
import { DropdownMenuMobile } from "./components/dropdownMenu/mobile";

const NavBar = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center ">
            <Logo />
            <div className="flex gap-2 items-center ml-10">
              <DropdownMenu />
              <AllProducts />
            </div>
          </div>
          <div className=" flex items-center md:gap-4 gap-2 ">
            <SearchBar />
            <Account />
            <NavCart />
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
