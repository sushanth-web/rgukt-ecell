import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const API_URL = "https://working-ecell-2.onrender.com/api/startups";

/* ================= STORY CARD ================= */
function StoryCard({ story, isAdmin, onDelete }) {
  return (
    <article className="group relative shadow-lg overflow-hidden rounded-2xl bg-white hover:shadow-xl transition duration-300 w-[85%] sm:w-72 flex-shrink-0 flex flex-col snap-start">
      {isAdmin && (
        <button
          onClick={onDelete}
          className="absolute top-3 right-3 z-10 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
        >
          <FaTrash size={12} />
        </button>
      )}

      <div className="relative h-36 sm:h-40 w-full overflow-hidden">
        <img
          src={story.imageUrl}
          alt={story.title}
          className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2E5F]/70 to-transparent" />
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#0B2E5F]">
            {story.title}
          </h3>
          <p className="mt-1 text-xs font-semibold text-orange-600">
            {story.name}
          </p>
        </div>
        <p className="mt-3 text-gray-600 text-sm">{story.desc}</p>
      </div>
    </article>
  );
}

/* ================= MAIN COMPONENT ================= */
export default function Startups() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [adding, setAdding] = useState(false);

  const [newStory, setNewStory] = useState({
    title: "",
    name: "",
    desc: "",
    image: null,
  });

  const [isAdmin, setIsAdmin] =
    useState(localStorage.getItem("isAdmin") === "true");

  /* ================= FETCH STARTUPS ================= */
  const fetchStartups = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStories(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStartups();
  }, []);

  /* ================= IMAGE SELECT ================= */
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewStory((prev) => ({ ...prev, image: file }));
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchStartups();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    navigate("/");
  };

  /* ================= SCROLL ================= */
  const scrollLeft = () => {
    const slider = scrollRef.current;
    if (!slider) return;
    const card = slider.querySelector("article");
    if (!card) return;
    slider.scrollBy({ left: -(card.offsetWidth + 16), behavior: "smooth" });
  };

  const scrollRight = () => {
    const slider = scrollRef.current;
    if (!slider) return;
    const card = slider.querySelector("article");
    if (!card) return;
    slider.scrollBy({ left: card.offsetWidth + 16, behavior: "smooth" });
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 pt-10 md:pt-16 pb-12 md:pb-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* ================= HEADER ================= */}
        <div className="text-center relative mb-10 md:mb-14">
          <h2 className="text-2xl md:text-5xl font-bold text-blue-900">
            Our Startups
          </h2>

          <div className="mx-auto mt-3 h-1 w-16 bg-orange-500 rounded-full" />

          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-gray-600">
            Real progress starts with small steps and teamwork.
          </p>

          {isAdmin && (
            <div className="absolute right-0 top-0 flex gap-3 mt-4 md:mt-0">
              <button
                onClick={() => setShowModal(true)}
                className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition"
              >
                <FaPlus />
              </button>

              <button
                onClick={handleLogout}
                className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* ================= STORIES ================= */}
        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-3 rounded-full hover:bg-gray-100 transition hidden md:flex"
          >
            <FaChevronLeft />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 md:px-0 py-2 no-scrollbar"
          >
            {loading ? (
              <div className="flex justify-center items-center w-full py-16">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
              </div>
            ) : (
              stories.map((story) => (
                <StoryCard
                  key={story._id}
                  story={story}
                  isAdmin={isAdmin}
                  onDelete={() => handleDelete(story._id)}
                />
              ))
            )}
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-3 rounded-full hover:bg-gray-100 transition hidden md:flex"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* ================= ADD MODAL ================= */}
      {showModal && isAdmin && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">

            <h2 className="text-xl font-semibold text-center mb-4">
              Add Startup
            </h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();

                if (!newStory.title || !newStory.name || !newStory.desc || !newStory.image) {
                  alert("Please fill all fields");
                  return;
                }

                setAdding(true);

                const formData = new FormData();
                formData.append("title", newStory.title);
                formData.append("name", newStory.name);
                formData.append("desc", newStory.desc);
                formData.append("image", newStory.image);

                try {
                  const res = await fetch(API_URL, {
                    method: "POST",
                    body: formData,
                  });

                  if (!res.ok) throw new Error("Failed to add startup");

                  await fetchStartups();
                  setNewStory({ title: "", name: "", desc: "", image: null });
                  setShowModal(false);
                } catch (error) {
                  console.error(error);
                  alert("Error adding startup");
                } finally {
                  setAdding(false);
                }
              }}
              className="space-y-3"
            >
              <input
                type="text"
                placeholder="Startup Title"
                className="w-full border p-2 rounded"
                value={newStory.title}
                onChange={(e) =>
                  setNewStory({ ...newStory, title: e.target.value })
                }
                required
              />

              <input
                type="text"
                placeholder="Founder / Team Name"
                className="w-full border p-2 rounded"
                value={newStory.name}
                onChange={(e) =>
                  setNewStory({ ...newStory, name: e.target.value })
                }
                required
              />

              <textarea
                placeholder="Description"
                className="w-full border p-2 rounded"
                value={newStory.desc}
                onChange={(e) =>
                  setNewStory({ ...newStory, desc: e.target.value })
                }
                required
              />

              <input
                type="file"
                accept="image/*"
                className="w-full border p-2 rounded"
                onChange={handleImageSelect}
                required
              />

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={adding}
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition flex items-center justify-center"
                >
                  {adding && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  )}
                  Add
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