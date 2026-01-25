"use client";

import { useEffect, useState } from "react";

type UserRole = "reader" | "writer" | "admin";

interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function loadUsers() {
      const res = await fetch("/api/users");
      if (res.ok) {
        setUsers(await res.json());
      }
    }
    loadUsers();
  }, []);

  async function updateRole(id: string, role: UserRole) {
    await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });

    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, role } : u))
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Users</h1>

      <table className="w-full mt-6 border">
        <thead>
          <tr className="border-b text-left">
            <th className="p-2">Name</th>
            <th>Email</th>
            <th>Role</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-b">
              <td className="p-2">{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td className="p-2">
                <select
                  className="border p-1 rounded"
                  value={u.role}
                  onChange={(e) =>
                    updateRole(u._id, e.target.value as UserRole)
                  }
                >
                  <option value="reader">Reader</option>
                  <option value="writer">Writer</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
