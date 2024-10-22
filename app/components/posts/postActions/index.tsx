import { Form } from "@remix-run/react";
import type { Post } from "~/types/post";

interface PostActionsProps {
  post: Post;
  onEdit: (post: Post) => void;
}

export const PostActions = ({ post, onEdit }: PostActionsProps) => {
  return (
    <div className="space-x-2">
      <button
        onClick={() => onEdit(post)}
        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Edit
      </button>
      <Form method="post" className="inline">
        <input type="hidden" name="id" value={post.id} />
        <input type="hidden" name="_action" value="delete" />
        <button
          type="submit"
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete
        </button>
      </Form>
    </div>
  );
};
