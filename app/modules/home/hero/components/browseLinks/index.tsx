import { LuShapes } from "react-icons/lu";
import { MdOutlineVerified } from "react-icons/md";

type BrowseLinksProps = {
  onShowCategories: () => void;
  onShowBrands: () => void;
};

const BrowseLinks: React.FC<BrowseLinksProps> = ({
  onShowCategories,
  onShowBrands,
}) => (
  <div className="flex flex-col h-fit p-4 flex-wrap justify-between gap-2 rounded bg-gray-200 w-full md:max-w-[500px]">
    <div
      onClick={onShowCategories}
      className="inline-flex cursor-pointer gap-4 text-black bg-white hover:bg-gray-100 p-5 items-center font-bold rounded transition-all duration-300 ease-in-out"
    >
      <LuShapes size={25} className="text-black" /> Browse by categories
    </div>
    <div
      onClick={onShowBrands}
      className="inline-flex gap-4 text-black bg-white hover:bg-gray-100 p-5 items-center font-bold transition-all duration-300 ease-in-out"
    >
      <MdOutlineVerified size={25} className="text-black" /> Browse by brands
    </div>
  </div>
);

export default BrowseLinks;
