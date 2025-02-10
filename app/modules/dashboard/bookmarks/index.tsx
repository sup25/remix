import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUser } from "~/hooks/useUser";
import { RiBookMarkedFill, RiBookMarkedLine } from "react-icons/ri";
import { useFetcher } from "@remix-run/react";
import { handleRemoveBookmark } from "./handler";
import { IProduct } from "~/components/schema/Proudct.schema";
import { Loading } from "~/components/loading";
import ProductCard from "~/components/productCard";

interface BookmarkType {
  id: number;
  product: IProduct;
}

const ShowUserBookmarks = () => {
  const { user } = useUser();
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);
  const [loading, setLoading] = useState(true);
  const fetcher = useFetcher();

  useEffect(() => {
    if (!user?.id) return;

    const fetchBookmarks = async () => {
      try {
        const response = await fetch(`/bookmark?userId=${user.id}`);
        const data = await response.json();

        if (data?.userBookmarks) {
          setBookmarks(data.userBookmarks);
        } else {
          toast.error(data?.error || "No bookmarks found.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching bookmarks.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [user]);

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

  if (loading) {
    return (
      <div className="flex w-full justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center gap-3 mb-8 w-full">
        <RiBookMarkedLine size={24} />
        <h2 className="text-3xl font-bold">Your Bookmarks</h2>
        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
          {bookmarks.length} items
        </span>
      </div>

      {bookmarks.length === 0 ? (
        <div className="bg-gray-50 rounded-lg shadow">
          <div className="flex flex-col items-center justify-center py-12">
            <RiBookMarkedFill className="h-16 w-16 text-gray-400 mb-4" />
            <p className="text-lg text-gray-600">No bookmarks yet</p>
            <p className="text-sm text-gray-500 mt-2">
              Start saving your favorite products!
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap md:flex-row flex-col gap-6">
          {bookmarks.map((bookmark) => (
            <div key={bookmark.id} className="flex flex-col">
              <ProductCard product={bookmark.product} />
              <div
                onClick={() =>
                  handleRemoveBookmark(
                    bookmark.product.id,
                    user.id!,
                    fetcher,
                    setBookmarks
                  )
                }
                className="my-2 p-2 bg-red-500 flex items-center justify-center text-white rounded-lg cursor-pointer"
              >
                Remove
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowUserBookmarks;
