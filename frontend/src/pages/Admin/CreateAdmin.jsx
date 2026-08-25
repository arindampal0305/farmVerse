import { useState } from "react";
import { createAdmin } from "../../services/auth";

export default function CreateAdmin() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createAdmin(form);

      alert("Admin created successfully.");

      setForm({
        fullName: "",
        username: "",
        email: "",
        password: "",
      });

    } catch (err) {
      alert(
        err.response?.data ||
        "Unable to create admin."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8">
      <h1 className="text-3xl font-bold mb-6">
        Create Admin
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded-lg p-3"
        >
          {loading ? "Creating..." : "Create Admin"}
        </button>

      </form>
    </div>
  );
}