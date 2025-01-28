import { IoIosSearch } from "react-icons/io";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const SearchBar = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const initialQuery = searchParams.get("query") || "";
    setQuery(initialQuery);
  }, [searchParams]);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/searchProduct?query=${query}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full">
      <div className="relative flex items-center">
        <input
          className="w-full bg-gray-100 md:w-[600px] border-2 font-medium transition-all duration-300 ease-in-out  rounded-md outline-none p-2 pl-5 pr-10"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search a product..."
        />
        <div
          className="absolute right-0 bg-gray-500 p-2 rounded-r-md cursor-pointer"
          onClick={handleSearch}
        >
          <IoIosSearch
            size={24}
            className="text-gray-300 hover:text-black transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
