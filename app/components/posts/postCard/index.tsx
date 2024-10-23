import type { Post } from "~/types/post";
import { PostEditForm } from "../postEditForm";
import { PostActions } from "../postActions";
import { Link } from "@remix-run/react";

interface PostCardProps {
  post: Post;
  isEditing: boolean;
  onEdit: (post: Post) => void;
  onCancelEdit: () => void;
}

export const PostCard = ({
  post,
  isEditing,
  onEdit,
  onCancelEdit,
}: PostCardProps) => {
  console.log("Post ID in PostCard:", post.id);
  return (
    <div className="p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
      {isEditing ? (
        <PostEditForm post={post} onCancel={onCancelEdit} />
      ) : (
        <>
          <Link to={`/posts/${post.id}`}>
            <h3 className="font-semibold text-lg text-gray-900 mb-2 hover:underline">
              {post.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-2">{post.content}</p>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Author ID: {post.authorId}</p>
            <PostActions post={post} onEdit={onEdit} />
          </div>
        </>
      )}
    </div>
  );
};
