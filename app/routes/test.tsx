import CreateUser from "../components/createUser";
import prisma from "~/_lib/db";
import { ActionFunction } from "@remix-run/node";
import CreatePost from "~/components/createPost";
import { makePost } from "~/services/post";

export let action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const type = formData.get("type") as string;

  if (type === "createUser") {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    if (!name || !email) {
      return { error: "Name and email are required" };
    }

    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
        },
      });
      console.log("User created successfully:", user);

      return { userId: user.id, userName: user.name };
    } catch (error: any) {
      if (error.code === "P2002") {
        return { error: "Email already exists" };
      }
      return { error: "Something went wrong" };
    }
  }

  if (type === "createPost") {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const authorId = formData.get("authorId") as string;

    if (!title || !content || !authorId) {
      return { error: "Title, content, and author are required" };
    }

    try {
      const post = await makePost({
        title,
        content,
        authorId: parseInt(authorId),
        published: true,
      });

      console.log("Post created successfully:", post);
      return { success: true, post };
    } catch (error: any) {
      return { error: "Something went wrong while creating the post" };
    }
  }

  return { error: "Invalid action type" };
};

const Test = () => {
  return (
    <div className="section">
      <div className="container">
        <h1 className="font-bricolage text-3xl font-medium">Testing CRUD</h1>
        <div className="flex flex-col gap-5">
          <CreateUser />
          <CreatePost />
        </div>
      </div>
    </div>
  );
};

export default Test;
