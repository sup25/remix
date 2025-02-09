import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUser } from "~/hooks/useUser";
import { IProduct } from "../schema/Proudct.schema";
import { RiBookMarkedFill, RiBookMarkedLine } from "react-icons/ri";

import ProductCard from "../productCard";
import { Loading } from "../loading";

interface BookmarkType {
  id: number;
  product: IProduct;
}

const ShowUserBookmarks = () => {
  const { user } = useUser();
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex w-full justify-center">
        <Loading />;
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
            <ProductCard key={bookmark.id} product={bookmark.product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowUserBookmarks;
