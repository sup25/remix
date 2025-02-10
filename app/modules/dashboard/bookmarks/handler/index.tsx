import { FetcherWithComponents } from "@remix-run/react";

export const handleRemoveBookmark = async (
  productId: number,
  userId: string,
  fetcher: FetcherWithComponents<any>,
  setBookmarks: React.Dispatch<React.SetStateAction<any[]>>
) => {
  if (!userId) return;

  const formData = new FormData();
  formData.append("productId", productId.toString());
  formData.append("userId", userId.toString());

  fetcher.submit(formData, {
    method: "DELETE",
    action: "/bookmark",
  });

  setBookmarks((prev) =>
    prev.filter((bookmark) => bookmark.product.id !== productId)
  );
};
