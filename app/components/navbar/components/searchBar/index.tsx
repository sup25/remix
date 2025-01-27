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

  return (
    <div className="flex">
      <input
        className="border-2 w-full min-w-screen-md font-medium transition-all duration-300 ease-in-out border-gray-300 rounded-l-md outline-none p-2"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search a product..."
      />
      <div
        className="cursor-pointer p-2 bg-gray-200 hover:bg-gray-300 flex items-center rounded-r-md"
        onClick={handleSearch}
      >
        <IoIosSearch size={25} />
      </div>
    </div>
  );
};
