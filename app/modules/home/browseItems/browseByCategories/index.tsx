import { useEffect, useState } from "react";
import BrowseItems from "..";

interface Props {
  hideCategories: () => void;
}

const BrowseByCategories = ({ hideCategories }: Props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/browseProducts");
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <BrowseItems
      heading="Browse by Categories"
      products={products}
      handler={hideCategories}
      link="collection"
      type="category"
    />
  );
};

export default BrowseByCategories;
