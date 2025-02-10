import {
  ActionFunction,
  ActionFunctionArgs,
  json,
  LoaderFunction,
} from "@remix-run/node";
import {
  createBookmark,
  deleteBookmark,
  getBookmark,
  getUserBookmarks,
} from "~/.server/services/bookmarks";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return json({ error: "Missing user ID" }, { status: 400 });
    }

    const userBookmarks = await getUserBookmarks(Number(userId));
    return json(
      { message: "Bookmarks retrieved successfully", userBookmarks },
      { status: 200 }
    );
  } catch (error) {
    return json(
      { error: error instanceof Error ? error.message : "Database error" },
      { status: 500 }
    );
  }
};

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const userId = formData.get("userId");
  const productId = formData.get("productId");

  if (!userId || !productId) {
    return json({ error: "Missing user or product ID" }, { status: 400 });
  }

  const userIdNum = parseInt(userId.toString());
  const productIdNum = parseInt(productId.toString());

  try {
    if (request.method === "POST") {
      const existingBookmark = await getBookmark(userIdNum, productIdNum);
      if (existingBookmark) {
        return json({ error: "Already bookmarked" }, { status: 400 });
      }
      const bookmark = await createBookmark(userIdNum, productIdNum);
      return json(
        { message: "Bookmarked successfully", bookmark },
        { status: 201 }
      );
    } else if (request.method === "DELETE") {
      await deleteBookmark(userIdNum, productIdNum);
      return json(
        { message: "Bookmark removed successfully" },
        { status: 200 }
      );
    } else {
      return json({ error: "Method not allowed" }, { status: 405 });
    }
  } catch (error) {
    return json({ error: "Database error", details: error }, { status: 500 });
  }
};
