import { useEffect, useState } from "react";
import BrowseItems from "..";

interface Props {
  hide: () => void;
}

const BrowseByBrands = ({ hide }: Props) => {
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
      heading="Browse by Brands"
      products={products}
      handler={hide}
      link="brand"
      type="brand"
    />
  );
};

export default BrowseByBrands;
