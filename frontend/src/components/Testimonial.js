import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://working-ecell-2.onrender.com/api/speakers";

export default function InspirationalSpeakers() {

  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const [speakers, setSpeakers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    desc: "",
    image: null
  });

  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  /* FETCH SPEAKERS */
  const fetchSpeakers = async () => {

    try {

      const res = await fetch(API_URL);
      const data = await res.json();

      setSpeakers(data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    fetchSpeakers();

  }, []);

  /* IMAGE SELECT */
  const handleImage = (e) => {

    const file = e.target.files[0];

    setFormData({
      ...formData,
      image: file
    });

  };

  /* ADD SPEAKER */
  const handleSubmit = async (e) => {

    e.preventDefault();

    const form = new FormData();

    form.append("name", formData.name);
    form.append("role", formData.role);
    form.append("desc", formData.desc);
    form.append("image", formData.image);

    try {

      await fetch(API_URL, {
        method: "POST",
        body: form
      });

      fetchSpeakers();

      setShowModal(false);

      setFormData({
        name: "",
        role: "",
        desc: "",
        image: null
      });

    } catch (error) {

      console.error(error);

    }

  };

  /* DELETE SPEAKER */
  const handleDelete = async (id) => {

    try {

      await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      fetchSpeakers();

    } catch (error) {

      console.error(error);

    }

  };

  /* SCROLL */
  const slide = (dir) => {

    const slider = sliderRef.current;

    if (!slider) return;

    const card = slider.querySelector(".speaker-card");

    const gap = 24;

    const scrollAmount = card.offsetWidth + gap;

    slider.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });

  };

  const handleLogout = () => {

    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    navigate("/");

  };

  return (
    <section className="bg-slate-50 pt-10 pb-20 relative">

      <div className="max-w-7xl mx-auto px-6 relative">

        <div className="text-center mb-12 relative">

          <h2 className="text-3xl md:text-5xl font-bold text-blue-900">
            Inspirational Speakers
          </h2>

          <div className="w-16 h-1 bg-orange-500 rounded-full mx-auto mt-3" />

          {isAdmin && (
            <div className="absolute right-0 top-0 flex gap-3">

              <button
                onClick={() => setShowModal(true)}
                className="bg-orange-500 text-white p-3 rounded-full shadow-lg"
              >
                <Plus size={18} />
              </button>

              <button
                onClick={handleLogout}
                className="bg-blue-900 text-white px-4 py-2 rounded-lg shadow"
              >
                Logout
              </button>

            </div>
          )}
        </div>

        <button
          onClick={() => slide("left")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() => slide("right")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
        >
          <ChevronRight />
        </button>

        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto md:overflow-hidden scroll-smooth snap-x snap-mandatory px-2 md:px-10"
        >

          {speakers.map((s) => (

            <div
              key={s._id}
              className="speaker-card  snap-start shrink-0 w-[85%] sm:w-[48%] lg:w-[23%] h-72 bg-blue-900 rounded-xl shadow-lg flex flex-col items-center justify-center p-4 text-white relative group"
            >

              {isAdmin && (
                <button
                  onClick={() => handleDelete(s._id)}
                  className="absolute top-2 right-2 bg-red-500 p-1.5 rounded-full"
                >
                  <Trash size={14} />
                </button>
              )}

              <img
                src={s.imageUrl}
                alt={s.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-orange-500 mb-3"
              />

              <h3 className="font-semibold text-sm text-center">
                {s.name}
              </h3>

              <p className="text-xs text-gray-300 text-center">
                {s.role}
              </p>

              <p className="text-xs mt-2 text-center opacity-0 group-hover:opacity-100 transition">
                {s.desc}
              </p>

            </div>

          ))}

        </div>
      </div>

      {showModal && isAdmin && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl w-80">

            <h3 className="text-lg font-semibold mb-4">
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

              <button className="bg-orange-500 text-white py-2 rounded">
                Submit
              </button>

            </form>

          </div>

        </div>

      )}

    </section>
  );
}