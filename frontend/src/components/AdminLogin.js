import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.email === "epsc@rguktong.ac.in" && form.password === "ecell@Ongole") {
      localStorage.setItem("isAdmin", "true");
      navigate("/events");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            E-Cell Admin Login
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-1">
            Access the admin dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="admin@email.com"
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5
                         text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Enter password"
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5
                         text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg
                       font-semibold text-sm sm:text-base
                       hover:bg-orange-600 active:scale-[0.98] transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-slate-500 mt-6 hover:text-orange-500 cursor-pointer">
          Forgot password?
        </p>
      </div>
    </section>
  );
}