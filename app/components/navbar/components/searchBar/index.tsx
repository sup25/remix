import { IoIosSearch } from "react-icons/io";
const SearchBar = () => {
  return (
    <div className="flex">
      <input
        className="border-2 font-medium  transition-all duration-300 ease-in-out border-gray-300 rounded-l-md outline-none p-2 font-Arima"
        type=""
        placeholder="Search a prduct..."
      />
      <div className="cursor-pointer p-2 w-fit bg-gray-200 transition-all duration-300 ease-in-out hover:bg-gray-300 flex items-center rounded-r-md text-medium">
        <IoIosSearch size={25} />
      </div>
    </div>
  );
};

export default SearchBar;
