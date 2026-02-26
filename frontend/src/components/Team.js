import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

const API_URL = "https://working-ecell-2.onrender.com/api/team";

export default function Team() {
  const navigate = useNavigate();

  const [team, setTeam] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isAdmin, setIsAdmin] =
    useState(localStorage.getItem("isAdmin") === "true");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const developedBy = [
    {
      _id: "dev1",
      name: "Chandra Sekhar",
      role: "Frontend Developer",
      imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      linkedin: "https://linkedin.com",
      insta: "https://instagram.com",
      facebook: "https://facebook.com",
    },
    {
      _id: "dev2",
      name: "Raghu Kumar",
      role: "Backend Developer",
      imageUrl: "https://randomuser.me/api/portraits/men/45.jpg",
      linkedin: "https://linkedin.com",
      insta: "https://instagram.com",
      facebook: "https://facebook.com",
    },
    {
      _id: "dev3",
      name: "Sneha Reddy",
      role: "UI/UX Designer",
      imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      linkedin: "https://linkedin.com",
      insta: "https://instagram.com",
      facebook: "https://facebook.com",
    },
    {
      _id: "dev4",
      name: "Arjun Varma",
      role: "Full Stack Developer",
      imageUrl: "https://randomuser.me/api/portraits/men/52.jpg",
      linkedin: "https://linkedin.com",
      insta: "https://instagram.com",
      facebook: "https://facebook.com",
    },
  ];

  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    image: null,
    linkedin: "",
    instagram: "",
    facebook: "",
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch team");
      const data = await res.json();
      setTeam(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("Fetch team error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    navigate("/");
  };

  const handleAddMember = async () => {
    if (!newMember.name || !newMember.role || !newMember.image) {
      alert("Name, Role, and Image are required");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("name", newMember.name);
      formData.append("role", newMember.role);
      formData.append("image", newMember.image);
      formData.append("linkedin", newMember.linkedin);
      formData.append("insta", newMember.instagram);
      formData.append("facebook", newMember.facebook);

      const res = await fetch(API_URL, { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const createdMember = await res.json();

      setTeam((prev) => [createdMember, ...prev]);
      setShowModal(false);
      setNewMember({
        name: "",
        role: "",
        image: null,
        linkedin: "",
        instagram: "",
        facebook: "",
      });
    } catch (err) {
      console.error("Add member error:", err);
      alert("Failed to add member");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?"))
      return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setTeam((prev) => prev.filter((member) => member._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete member");
    }
  };

  return (
    <section className="bg-slate-50 pt-7 pb-20 md:pb-24 relative">
      {/* HEADER */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-10 relative">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-900">
          Meet the Team
        </h1>

        <div className="w-16 h-1 bg-orange-500 rounded-full mx-auto mt-3 mb-4" />

        <p className="text-slate-600 leading-relaxed text-xl">
          All the work we do is possible only with the cooperation of a
          passionately dedicated team.
        </p>

        {isAdmin && (
          <div className="absolute right-6 top-0 flex gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg"
            >
              <FaPlus />
            </button>

            <button
              onClick={handleLogout}
              className="bg-blue-900 hover:bg-blue-800 text-white p-3 rounded-full shadow-lg"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* LOADER */}
      {(loading || uploading) && (
        <div className="flex justify-center my-6">
          <div className="border-4 border-blue-400 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}

      {/* TEAM CARDS — RESPONSIVE GRID */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
          {team.map((member) => (
            <TeamCard
              key={member._id}
              member={member}
              isAdmin={isAdmin}
              onDelete={() => handleDelete(member._id)}
            />
          ))}
        </div>
      </div>

      {/* DEVELOPED BY */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-10">
          Developed by
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {developedBy.map((member) => (
            <TeamCard
              key={member._id}
              member={member}
              isAdmin={false}
              onDelete={() => {}}
            />
          ))}
        </div>
      </div>

      {/* ADD MODAL */}
      {showModal && isAdmin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 space-y-3">
            <h2 className="text-xl font-semibold text-center">
              Add Team Member
            </h2>

            <input
              type="text"
              placeholder="Name"
              className="w-full border p-2 rounded"
              value={newMember.name}
              onChange={(e) =>
                setNewMember({ ...newMember, name: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Role"
              className="w-full border p-2 rounded"
              value={newMember.role}
              onChange={(e) =>
                setNewMember({ ...newMember, role: e.target.value })
              }
            />

            <input
              type="file"
              accept="image/*"
              className="w-full"
              onChange={(e) =>
                setNewMember({ ...newMember, image: e.target.files[0] })
              }
            />

            <input
              type="text"
              placeholder="LinkedIn"
              className="w-full border p-2 rounded"
              value={newMember.linkedin}
              onChange={(e) =>
                setNewMember({ ...newMember, linkedin: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Instagram"
              className="w-full border p-2 rounded"
              value={newMember.instagram}
              onChange={(e) =>
                setNewMember({ ...newMember, instagram: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Facebook"
              className="w-full border p-2 rounded"
              value={newMember.facebook}
              onChange={(e) =>
                setNewMember({ ...newMember, facebook: e.target.value })
              }
            />

            <div className="flex justify-between pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
                disabled={uploading}
              >
                Cancel
              </button>

              <button
                onClick={handleAddMember}
                className="px-4 py-2 bg-orange-500 text-white rounded flex items-center justify-center gap-2"
                disabled={uploading}
              >
                {uploading && (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                {uploading ? "Uploading..." : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------- TEAM CARD (SMALLER & RESPONSIVE) ---------- */
function TeamCard({ member, isAdmin, onDelete }) {
  const iconBase = "p-2 rounded-full bg-white/20 transition text-white";

  const handleClick = (e, link) => {
    if (!link) e.preventDefault();
  };

  return (
    <div className="group relative w-full max-w-[220px] rounded-xl overflow-hidden shadow-lg">
      {isAdmin && (
        <button
          onClick={onDelete}
          className="absolute top-3 right-3 z-10 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
        >
          <FaTrash size={14} />
        </button>
      )}

      <img
        src={member.imageUrl}
        alt={member.name}
        className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col items-center justify-end text-center text-white px-4 pb-6">
        <h3 className="text-lg font-semibold">{member.name}</h3>
        <p className="text-sm text-gray-300 mb-3">{member.role}</p>

        <div className="flex gap-3">
          <a
            href={member.linkedin || "#"}
            onClick={(e) => handleClick(e, member.linkedin)}
            target="_blank"
            rel="noreferrer"
            className={`${iconBase} hover:bg-[#0A66C2]`}
          >
            <FaLinkedinIn />
          </a>

          <a
            href={member.insta || "#"}
            onClick={(e) => handleClick(e, member.insta)}
            target="_blank"
            rel="noreferrer"
            className={`${iconBase} hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF]`}
          >
            <FaInstagram />
          </a>

          <a
            href={member.facebook || "#"}
            onClick={(e) => handleClick(e, member.facebook)}
            target="_blank"
            rel="noreferrer"
            className={`${iconBase} hover:bg-[#1877F2]`}
          >
            <FaFacebookF />
          </a>
        </div>
      </div>
    </div>
  );
}