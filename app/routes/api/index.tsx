import { json, LoaderFunction } from "@remix-run/node";
import { getPosts } from "~/services/post";

export const loadPosts: LoaderFunction = async () => {
  const posts = await getPosts();
  return json(posts);
};
