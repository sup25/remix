import { Form, useActionData } from "@remix-run/react";
import { useEffect, useState } from "react";

interface ActionData {
  error?: string;
  userName?: string;
  post?: {
    id: number;
    title: string;
    content: string;
    authorId: number;
    createdAt: string;
    published: boolean;
  };
}

export default function CreatePost() {
  const actionData = useActionData<ActionData>();
  console.log("actiondata", actionData);
  const [authorId, setAuthorId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setAuthorId(storedUserId);
    }
  }, []);

  console.log(authorId);
  return (
    <div className="my-5">
      <h1>Create a Post</h1>

      {actionData?.error && <p className="text-red-500">{actionData.error}</p>}
      {actionData?.post && (
        <p>Post created successfully: {actionData.post.title}</p>
      )}
      <Form method="post">
        <input type="hidden" name="type" value="createPost" />
        <input type="hidden" name="authorId" value={authorId || ""} />

        <div className="flex flex-col my-5">
          <label className="flex flex-col bg-red-200">
            Title:{" "}
            <input
              className="p-2 bg-gray-200"
              type="text"
              name="title"
              required
            />
          </label>
        </div>

        <div>
          <label className="flex flex-col bg-red-200 ">
            Content:{" "}
            <textarea className="p-2 bg-gray-200" name="content" required />
          </label>
        </div>

        <button
          type="submit"
          className="my-4 p-2 bg-red-400"
          disabled={!authorId}
        >
          Create Post
        </button>
      </Form>
    </div>
  );
}
