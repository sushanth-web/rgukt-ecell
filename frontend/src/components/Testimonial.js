import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://working-ecell-2.onrender.com/api/speakers";

export default function InspirationalSpeakers() {
  const sliderRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [adding, setAdding] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    desc: "",
    image: null,
  });

  const [isAdmin, setIsAdmin] =
    useState(localStorage.getItem("isAdmin") === "true");

  /* ================= FETCH SPEAKERS ================= */
  const fetchSpeakers = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setSpeakers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpeakers();
  }, []);

  /* ================= IMAGE SELECT ================= */
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  /* ================= CANCEL ================= */
  const handleCancel = () => {
    setShowModal(false);
    setAdding(false);
    setFormData({
      name: "",
      role: "",
      desc: "",
      image: null,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* ================= ADD SPEAKER ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.role || !formData.desc || !formData.image) {
      alert("Please fill all fields");
      return;
    }

    setAdding(true);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("role", formData.role);
    form.append("desc", formData.desc);
    form.append("image", formData.image);

    try {
      const res = await fetch(API_URL, { method: "POST", body: form });

      if (!res.ok) {
        throw new Error("Failed to add speaker");
      }

      await fetchSpeakers();
      handleCancel();
    } catch (error) {
      console.error(error);
      alert("Error adding speaker");
    } finally {
      setAdding(false);
    }
  };

  /* ================= DELETE SPEAKER ================= */
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchSpeakers();
    } catch (error) {
      console.error(error);
    }
  };

  /* ================= SLIDER ================= */
  const slide = (dir) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const card = slider.querySelector(".speaker-card");
    if (!card) return;

    slider.scrollBy({
      left: dir === "left" ? -card.offsetWidth - 16 : card.offsetWidth + 16,
      behavior: "smooth",
    });
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <section className="bg-slate-50 pt-8 md:pt-10 pb-12 md:pb-20 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-10 md:mb-12 relative">
          <h2 className="text-2xl md:text-5xl font-bold text-blue-900">
            Inspirational Speakers
          </h2>
          <div className="w-16 h-1 bg-orange-500 rounded-full mx-auto mt-3" />

          {isAdmin && (
            <div className="absolute right-0 top-0 flex gap-3 mt-4 md:mt-0">
              <button
                onClick={() => setShowModal(true)}
                className="bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition"
              >
                <Plus size={18} />
              </button>

              <button
                onClick={handleLogout}
                className="bg-blue-900 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-800 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* ================= ARROWS ================= */}
        <button
          onClick={() => slide("left")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100 transition"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() => slide("right")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100 transition"
        >
          <ChevronRight />
        </button>

        {/* ================= SPEAKERS ================= */}
        <div
          ref={sliderRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 md:px-10 no-scrollbar"
        >
          {loading ? (
            <div className="flex justify-center items-center w-full py-16">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            speakers.map((s) => (
              <div
                key={s._id}
                className="speaker-card snap-start shrink-0 w-[85%] sm:w-[48%] lg:w-[23%] h-72 sm:h-80 bg-blue-900 rounded-xl shadow-lg flex flex-col items-center justify-center p-4 text-white relative group transform hover:scale-105 transition duration-500"
              >
                {isAdmin && (
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="absolute top-2 right-2 bg-red-500 p-1.5 rounded-full hover:bg-red-600 transition"
                  >
                    <Trash size={14} />
                  </button>
                )}

                <img
                  src={s.imageUrl}
                  alt={s.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-orange-500 mb-3"
                />

                <h3 className="font-semibold text-sm text-center">
                  {s.name}
                </h3>

                <p className="text-xs text-gray-300 text-center">
                  {s.role}
                </p>

                <p className="text-xs mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {s.desc}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && isAdmin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Add Speaker
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">

              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border p-2 rounded"
                required
              />

              <input
                type="text"
                placeholder="Role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="border p-2 rounded"
                required
              />

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="border p-2 rounded"
                required
              />

              <textarea
                placeholder="Description"
                value={formData.desc}
                onChange={(e) =>
                  setFormData({ ...formData, desc: e.target.value })
                }
                className="border p-2 rounded"
                required
              />

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-1/2 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={adding}
                  className="w-1/2 bg-orange-500 text-white py-2 rounded flex items-center justify-center hover:bg-orange-600 transition"
                >
                  {adding && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  )}
                  Submit
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}