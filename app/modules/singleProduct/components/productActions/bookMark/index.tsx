import { useFetcher, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { CgHeart } from "react-icons/cg";
import { IProduct } from "~/components/schema/Proudct.schema";
import { useUser } from "~/hooks/useUser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface BookMarkFormData {
  product: IProduct;
}

export const BookMark = ({ product }: BookMarkFormData) => {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const onBookmark = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    const formData = new FormData();
    formData.append("userId", user.id!);
    formData.append("productId", product.id.toString());

    fetcher.submit(formData, {
      method: "post",
      action: "/bookmark",
    });
  };

  useEffect(() => {
    if (fetcher.data) {
      const { message, error } = fetcher.data as {
        message?: string;
        error?: string;
      };

      if (message) toast.success(message);
      if (error) toast.error(error);
    }
  }, [fetcher.data]);

  return (
    <button
      onClick={onBookmark}
      className="p-3 border border-gray-300 rounded-lg hover:border-red-500 transition-colors group"
      aria-label="Add to wishlist"
    >
      <CgHeart className="h-5 w-5 text-black transition-colors group-hover:text-red-500" />
    </button>
  );
};
