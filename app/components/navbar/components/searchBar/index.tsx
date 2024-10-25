import { IoIosSearch } from "react-icons/io";

export const SearchBar = () => {
  return (
    <div className="flex">
      <input
        className="border-2 w-full min-w-screen-md font-medium transition-all duration-300 ease-in-out border-gray-300 rounded-l-md outline-none p-2"
        type="text"
        placeholder="Search a product..."
      />
      <div className="cursor-pointer p-2 bg-gray-200 hover:bg-gray-300 flex items-center rounded-r-md">
        <IoIosSearch size={25} />
      </div>
    </div>
  );
};
