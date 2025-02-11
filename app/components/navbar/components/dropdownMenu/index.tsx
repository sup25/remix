import { useState, useRef, useEffect } from "react";
import { Link } from "@remix-run/react";
import { FiChevronDown } from "react-icons/fi";
import "../../styles.css";
import { getAllProducts } from "~/modules/home/api";
import { IProduct } from "~/components/schema/Proudct.schema";
import { SomethingWentWrong } from "~/components/somethingWentWrong";
import { Loading } from "~/components/loading";

interface productDropdown {
  isMobile?: boolean;
  setDrawerOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
export const DropdownMenu = ({
  isMobile = false,
  setDrawerOpen,
}: productDropdown) => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [highlightedItem, setHighlightedItem] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts: IProduct[] = await getAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  if (!products) {
    return <SomethingWentWrong />;
  }
  if (products.length === 0) {
    return <Loading size={25} />;
  }
  const groupedProducts = products.reduce<Record<string, IProduct[]>>(
    (acc, product) => {
      const category = product.categories?.[0] || "Uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    },
    {}
  );

  const handleAccordionToggle = (category: string) => {
    setActiveAccordion(activeAccordion === category ? null : category);
  };

  return (
    <div
      ref={menuRef}
      className={`${
        isMobile ? "flex flex-col space-y-2" : "hidden md:flex gap-2"
      }`}
    >
      {Object.entries(groupedProducts).map(([category, items]) => (
        <div key={category} className="relative">
          <button
            onClick={() => handleAccordionToggle(category)}
            className={`group inline-flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-300 ease-in-out ${
              activeAccordion === category
                ? "bg-gray-100 text-black shadow-sm"
                : "text-gray-700 hover:text-black hover:bg-gray-200"
            } transform hover:scale-105 active:scale-95`}
          >
            <span className="mr-2 py-1 font-heading-nav text-base">
              {category}
            </span>
            <FiChevronDown
              className={`w-4 h-4 mt-1 transition-transform ${
                activeAccordion === category ? "rotate-180" : ""
              }`}
            />
          </button>

          {activeAccordion === category && (
            <div className="animate-dropDown absolute z-50 left-0 mt-2 w-full bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5">
              <div className="p-3">
                <div className="flex flex-col space-y-1">
                  {items.map((product) => (
                    <Link
                      onClick={() => {
                        setDrawerOpen?.(false);
                        setActiveAccordion(null);
                      }}
                      key={product.id}
                      to={`/collection/${product.categories}`}
                      onMouseEnter={() => setHighlightedItem(product.id)}
                      onMouseLeave={() => setHighlightedItem(null)}
                      className={`flex items-center px-4 py-2 text-sm rounded-md transition-all duration-200 ${
                        highlightedItem === product.id
                          ? "bg-blue-50 text-black transform scale-105"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full mr-2 transition-all duration-200 ${
                          highlightedItem === product.id
                            ? "bg-black"
                            : "bg-gray-300"
                        }`}
                      />
                      <span className="flex-grow">{product.title}</span>
                      <span className="ml-2 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 whitespace-nowrap">
                        {product.stock} in stock
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="absolute top-0 left-0 w-3 h-3 bg-white transform -translate-y-1.5 translate-x-6 rotate-45 border-t border-l border-gray-100"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DropdownMenu;
