import { useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";
import { getPostById } from "~/services/post";
import type { Post } from "~/types/post";

export const loader: LoaderFunction = async ({ params }) => {
  console.log("Params:", params);

  const postId = parseInt(params.postId || "", 10);
  console.log("Parsed postId:", postId);

  if (isNaN(postId)) {
    throw new Response("Invalid post ID", { status: 400 });
  }

  const post = await getPostById(postId);

  if (!post) {
    throw new Response("Post not found", { status: 404 });
  }

  return json(post);
};

const PostDetail = () => {
  const post = useLoaderData<Post>();

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Author ID: {post.authorId}</p>
    </div>
  );
};

export default PostDetail;
