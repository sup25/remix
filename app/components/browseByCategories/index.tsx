import React from "react";

import { BiX } from "react-icons/bi";
import BrowseItems from "../browseItems";

interface Props {
  hideCategories: () => void;
}

const CATEGORIES = [
  { value: "furniture", label: "Furniture", count: 120 },
  { value: "accessories", label: "Accessories", count: 85 },
  { value: "bookshelves", label: "Bookshelves", count: 45 },
  { value: "cabinets", label: "Cabinets", count: 67 },
  { value: "chairs", label: "Chairs", count: 93 },
  { value: "floorlamps", label: "Floor Lamps", count: 38 },
  { value: "lighting", label: "Lighting", count: 72 },
  { value: "shelves", label: "Shelves", count: 54 },
  { value: "sofas", label: "Sofas", count: 61 },
  { value: "tablelamps", label: "Table lamps", count: 43 },
  { value: "tables", label: "Tables", count: 89 },
  { value: "walllamps", label: "Wall Lamps", count: 35 },
];

const BrowseByCategories = ({ hideCategories }: Props) => {
  return (
    <BrowseItems
      heading="Browse by Category"
      products={CATEGORIES}
      handler={hideCategories}
      link="collection"
    />
  );
};

export default BrowseByCategories;
