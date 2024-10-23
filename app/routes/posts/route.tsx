import { useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import { loadPosts } from "../api";
import type { Post } from "~/types/post";
import { deletePost, updatePost } from "~/services/post";
import type { ActionFunction } from "@remix-run/node";
import { PostCard } from "~/components/posts/postCard";
import { useNavigation } from "@remix-run/react";

export const loader = loadPosts;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const action = formData.get("_action");
  const id = Number(formData.get("id"));

  if (action === "delete") {
    await deletePost(id);
    return null;
  }

  if (action === "edit") {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    await updatePost(id, { title, content });
    return null;
  }

  return null;
};

const Posts = () => {
  const posts: Post[] = useLoaderData();
  const [editingPost, setEditingPost] = useState<number | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "submitting") {
      setEditingPost(null);
    }
  }, [navigation.state]);

  const handleEdit = (post: Post) => {
    setEditingPost(post.id);
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="my-10 font-bricolage text-4xl font-medium">Posts</h1>
        <div className="p-6">
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                isEditing={editingPost === post.id}
                onEdit={handleEdit}
                onCancelEdit={handleCancelEdit}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
