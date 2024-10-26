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
  showMoreLink: string;
}

const menuItems: MenuSection[] = [
  {
    title: "Furniture",
    items: [
      { label: "Sofas", href: "/furniture/sofas", count: 24 },
      { label: "Tables", href: "/furniture/tables", count: 18 },
      { label: "Chairs", href: "/furniture/chairs", count: 32 },
    ],
    showMoreLink: "/collection",
  },
  {
    title: "Lighting",
    items: [
      { label: "Lamps", href: "/lighting/lamps", count: 15 },
      { label: "Ceiling Lights", href: "/lighting/ceiling-lights", count: 21 },
      { label: "Wall Lights", href: "/lighting/wall-lights", count: 12 },
    ],
    showMoreLink: "/collection",
  },
  {
    title: "Brands",
    items: [
      { label: "Brand A", href: "/brands/brand-a", count: 45 },
      { label: "Brand B", href: "/brands/brand-b", count: 38 },
      { label: "Brand C", href: "/brands/brand-c", count: 27 },
    ],
    showMoreLink: "/vendor",
  },
];

export const DropdownMenu = ({ isMobile = false }: { isMobile?: boolean }) => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [highlightedItem, setHighlightedItem] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleAccordionToggle = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

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
    <div
      ref={menuRef}
      className={`${
        isMobile ? "flex flex-col space-y-2" : "hidden md:flex gap-2"
      }`}
    >
      {menuItems.map((menuItem, menuIndex) => (
        <div key={menuIndex} className="relative">
          <button
            onClick={() => handleAccordionToggle(menuIndex)}
            className={`group inline-flex items-center px-2 py-2 text-sm font-medium rounded-md
              transition-all duration-300 ease-in-out ${
                activeAccordion === menuIndex
                  ? "bg-gray-100 text-black shadow-sm"
                  : "text-gray-700 hover:text-black hover:bg-gray-200"
              } transform hover:scale-105 active:scale-95`}
          >
            <span className="mr-2 py-1  font-heading-nav  text-base">
              {menuItem.title}
            </span>
            <FiChevronDown
              className={`w-4 h-4 mt-1 transition-transform ${
                activeAccordion === menuIndex ? "rotate-180" : ""
              }`}
            />
          </button>

          {activeAccordion === menuIndex && (
            <div
              className={` animate-dropDown absolute z-50 left-0 mt-2 ${
                menuItem.items.length > 3 ? "md:w-96 w-full" : "w-64"
              } bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5`}
            >
              <div className="p-3">
                <div className="flex flex-col space-y-1">
                  {menuItem.items.map((item, itemIndex) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onMouseEnter={() => setHighlightedItem(itemIndex)}
                      onMouseLeave={() => setHighlightedItem(null)}
                      className={`flex items-center px-4 py-2 text-sm rounded-md transition-all duration-200 ${
                        highlightedItem === itemIndex
                          ? "bg-blue-50 text-black transform scale-105"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span
                        className={`
                          w-2 h-2 rounded-full mr-2 transition-all duration-200
                          ${
                            highlightedItem === itemIndex
                              ? "bg-black"
                              : "bg-gray-300"
                          }
                        `}
                      />
                      <span className="flex-grow">{item.label}</span>
                      <span className="ml-2 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                        {item.count}
                      </span>
                    </Link>
                  ))}
                  <Link
                    to={menuItem.showMoreLink}
                    className="flex items-center px-4 py-2 mt-1 text-sm rounded-md transition-all duration-200 text-blue-600 hover:bg-gray-50"
                  >
                    <span className="ml-4">Show More</span>
                  </Link>
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
