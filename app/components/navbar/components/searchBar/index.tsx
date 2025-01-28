import { IoIosSearch } from "react-icons/io";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const SearchBar: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const initialQuery = searchParams.get("query") || "";
    setQuery(initialQuery);
  }, [searchParams]);

  const handleSearch = (): void => {
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
    <div className=" relative  md:w-[600px] w-full">
      <input
        className="w-full border-2 font-medium transition-all duration-300 ease-in-out border-gray-300 rounded-md outline-none p-2 pl-5"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search a product..."
      />
      <div className="absolute left-[94%] top-[2%] p-2 bg-gray-800 rounded-r-md">
        <IoIosSearch
          size={25}
          className="    text-gray-300 cursor-pointer"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
};
