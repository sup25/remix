import { useEffect, useState } from "react";
import BrowseItems from "..";
import { getAllProducts } from "../../api";

interface Props {
  hideCategories: () => void;
}

const BrowseByCategories = ({ hideCategories }: Props) => {
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
      heading="Browse by Categories"
      products={products}
      handler={hideCategories}
      link="collection"
      type="category"
    />
  );
};

export default BrowseByCategories;
