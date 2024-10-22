import { Form, useActionData } from "@remix-run/react";

interface ActionData {
  error?: string;
  userName?: string;
  userId?: string;
}

export default function CreateUser() {
  const actionData = useActionData<ActionData>();
  if (actionData?.userId) {
    localStorage.setItem("userId", actionData.userId);
  }

  return (
    <div className="my-5">
      <h1 className="text-2xl font-bold mb-4">Create a User</h1>

      {actionData?.error && <p className="text-red-500">{actionData.error}</p>}
      {actionData?.userName && (
        <p>User created successfully: {actionData.userName}</p>
      )}

      <Form method="post">
        <input type="hidden" name="type" value="createUser" />
        <div className="space-y-4">
          <div>
            <label className="block">
              Name:
              <input
                className="mt-1 block w-full p-2 border rounded bg-gray-50"
                type="text"
                name="name"
                required
              />
            </label>
          </div>
          <div>
            <label className="block">
              Email:
              <input
                className="mt-1 block w-full p-2 border rounded bg-gray-50"
                type="email"
                name="email"
                required
              />
            </label>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create User
          </button>
        </div>
      </Form>
    </div>
  );
}
