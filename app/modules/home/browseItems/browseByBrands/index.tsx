import { useEffect, useState } from "react";
import BrowseItems from "..";
import { getAllProducts } from "../../api";

interface Props {
  hide: () => void;
}

const BrowseByBrands = ({ hide }: Props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const GetAllProudct = await getAllProducts();
      setProducts(GetAllProudct);
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
