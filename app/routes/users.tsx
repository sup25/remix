import {
  json,
  LoaderFunction,
  ActionFunction,
  redirect,
} from "@remix-run/node";
import prisma from "~/_lib/db";
import { useLoaderData, Form, useNavigation } from "@remix-run/react";
import { useState, useEffect } from "react";

// Define User interface
interface User {
  id: number;
  name: string;
  email: string;
}

// Loader to fetch all users
export const loader: LoaderFunction = async () => {
  const users = await prisma.user.findMany();
  return json(users);
};

// Action to handle both updates and deletions
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const actionType = formData.get("_action");
  const id = formData.get("id");

  if (actionType === "delete") {
    // Delete user from the database
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    return redirect("/users");
  } else if (actionType === "update") {
    const name = formData.get("name");
    const email = formData.get("email");

    // Update user in the database
    await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name: String(name),
        email: String(email),
      },
    });
    return redirect("/users");
  }
};

const Users = () => {
  const users: User[] = useLoaderData();
  const navigation = useNavigation();
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
  const [savingUserId, setSavingUserId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Start editing a user
  const handleEdit = (user: User) => {
    setEditingUserId(user.id);
    setFormData({ name: user.name, email: user.email });
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingUserId(null);
    setFormData({ name: "", email: "" });
  };

  // Handle delete click
  const handleDeleteClick = (userId: number) => {
    setDeletingUserId(userId);
  };

  // Handle save click
  const handleSaveClick = (userId: number) => {
    setSavingUserId(userId);
  };

  // Reset the editing state after successful save
  useEffect(() => {
    if (navigation.state === "idle" && savingUserId !== null) {
      setEditingUserId(null); // Reset editing mode
      setSavingUserId(null); // Reset saving state
    }
  }, [navigation.state, savingUserId]);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {editingUserId === user.id ? (
              <Form method="post" onSubmit={() => handleSaveClick(user.id)}>
                <input type="hidden" name="id" value={user.id} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  name="_action"
                  value="update"
                  disabled={navigation.state === "submitting"}
                >
                  {navigation.state === "submitting" && savingUserId === user.id
                    ? "Saving..."
                    : "Save"}
                </button>
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </Form>
            ) : (
              <>
                {user.name} ({user.email}){" "}
                <button onClick={() => handleEdit(user)}>Edit</button>
                <Form
                  method="post"
                  style={{ display: "inline" }}
                  onSubmit={() => handleDeleteClick(user.id)}
                >
                  <input type="hidden" name="id" value={user.id} />
                  <button
                    type="submit"
                    name="_action"
                    value="delete"
                    disabled={
                      navigation.state === "submitting" &&
                      deletingUserId === user.id
                    }
                    style={{ marginLeft: "10px" }}
                  >
                    {navigation.state === "submitting" &&
                    deletingUserId === user.id
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </Form>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
