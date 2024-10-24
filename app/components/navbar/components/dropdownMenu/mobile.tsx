import { useState, useRef, useEffect } from "react";
import { Link } from "@remix-run/react";
import { FiChevronDown } from "react-icons/fi";
import "../../styles.css";
interface MenuItem {
  label: string;
  href: string;
  count: number;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const menuItems: MenuSection[] = [
  {
    title: "Furniture",
    items: [
      { label: "Sofas", href: "/furniture/sofas", count: 24 },
      { label: "Tables", href: "/furniture/tables", count: 18 },
      { label: "Chairs", href: "/furniture/chairs", count: 32 },
    ],
  },
  {
    title: "Lighting",
    items: [
      { label: "Lamps", href: "/lighting/lamps", count: 15 },
      { label: "Ceiling Lights", href: "/lighting/ceiling-lights", count: 21 },
      { label: "Wall Lights", href: "/lighting/wall-lights", count: 12 },
    ],
  },
  {
    title: "Brands",
    items: [
      { label: "Brand A", href: "/brands/brand-a", count: 45 },
      { label: "Brand B", href: "/brands/brand-b", count: 38 },
      { label: "Brand C", href: "/brands/brand-c", count: 27 },
      { label: "Brand D", href: "/brands/brand-d", count: 27 },
      { label: "Brand E", href: "/brands/brand-e", count: 27 },
    ],
  },
];

export const DropdownMenuMobile = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [highlightedItem, setHighlightedItem] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveAccordion(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="none flex flex-col gap-2">
      {menuItems.map((menuItem, menuIndex) => (
        <div key={menuIndex} className="relative">
          <button
            onClick={() =>
              setActiveAccordion(
                activeAccordion === menuIndex ? null : menuIndex
              )
            }
            className={`
              group inline-flex items-center px-4 py-2 text-base font-medium rounded-md
              transition-all duration-300 ease-in-out
              ${
                activeAccordion === menuIndex
                  ? "bg-gray-100 text-black shadow-sm"
                  : "text-gray-700 hover:text-black hover:bg-gray-200"
              }
              transform hover:scale-105 active:scale-95
            `}
          >
            <span className="mr-2 mt-2 font-heading-nav font-Arima text-2xl">
              {menuItem.title}
            </span>
            <div
              className={`transition-all duration-300 ${
                activeAccordion === menuIndex ? "rotate-180" : ""
              }`}
            >
              <FiChevronDown className="w-4 h-4 mt-1" />
            </div>
          </button>

          {activeAccordion === menuIndex && (
            <div
              className={`
                absolute z-50 left-0 mt-2 
                ${menuItem.items.length > 3 ? "w-96" : "w-64"}
                transform transition-all duration-300 ease-out
                bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5
                animate-dropDown
              `}
            >
              <div
                className={`p-3 ${
                  menuItem.items.length > 3
                    ? "grid grid-cols-2 gap-4"
                    : "flex flex-col"
                }`}
              >
                {menuItem.items.map((item, itemIndex) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onMouseEnter={() => setHighlightedItem(itemIndex)}
                    onMouseLeave={() => setHighlightedItem(null)}
                    className={`
                      flex items-center justify-between px-4 py-3 my-1 text-base
                      rounded-md transition-all duration-200
                      ${
                        highlightedItem === itemIndex
                          ? "bg-blue-50 text-black transform scale-105"
                          : "text-gray-700 hover:bg-gray-50"
                      }
                      hover:shadow-md focus:outline-none 
                    `}
                  >
                    <span className="flex items-center">
                      <span
                        className={`
                          w-2 h-2 rounded-full mr-3 transition-all duration-200
                          ${
                            highlightedItem === itemIndex
                              ? "bg-black"
                              : "bg-gray-300"
                          }
                        `}
                      ></span>
                      {item.label}
                    </span>
                    <span
                      className={`
                        px-2 py-1 text-xs rounded-full transition-all duration-200
                        ${
                          highlightedItem === itemIndex
                            ? "bg-blue-100 text-black"
                            : "bg-gray-100 text-gray-600"
                        }
                      `}
                    >
                      {item.count}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="absolute top-0 left-0 w-3 h-3 bg-white transform -translate-y-1.5 translate-x-6 rotate-45 border-t border-l border-gray-100"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
