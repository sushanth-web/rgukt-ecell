import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const API_URL = "https://working-ecell-2.onrender.com/api/startups";

/* STORY CARD */
function StoryCard({ story, isAdmin, onDelete }) {
  return (
    <article className="group relative shadow-lg overflow-hidden rounded-2xl bg-white hover:shadow-xl transition duration-300 w-72 flex-shrink-0">

      {isAdmin && (
        <button
          onClick={onDelete}
          className="absolute top-3 right-3 z-10 bg-red-500 text-white p-2 rounded-full"
        >
          <FaTrash size={12} />
        </button>
      )}

      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={story.imageUrl}
          alt={story.title}
          className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2E5F]/70 to-transparent" />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-[#0B2E5F]">{story.title}</h3>

        <p className="mt-1 text-xs font-semibold text-orange-600">
          {story.name}
        </p>

        <p className="mt-3 text-gray-600 text-sm">{story.desc}</p>
      </div>
    </article>
  );
}

export default function Startups() {

  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [stories, setStories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [newStory, setNewStory] = useState({
    title: "",
    name: "",
    desc: "",
    image: null,
  });

  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  /* FETCH STARTUPS */
  const fetchStartups = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStories(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchStartups();
  }, []);

  /* IMAGE SELECT */
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewStory({
        ...newStory,
        image: file,
      });
    }
  };

  /* ADD STARTUP */
  const handleAddStory = async () => {
    if (!newStory.title || !newStory.name || !newStory.desc || !newStory.image)
      return;

    const formData = new FormData();
    formData.append("title", newStory.title);
    formData.append("name", newStory.name);
    formData.append("desc", newStory.desc);
    formData.append("image", newStory.image);

    try {
      await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      fetchStartups();

      setNewStory({
        title: "",
        name: "",
        desc: "",
        image: null,
      });

      setShowModal(false);

    } catch (error) {
      console.error("Add startup error:", error);
    }
  };

  /* DELETE STARTUP */
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      fetchStartups();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  /* LOGOUT */
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    navigate("/");
  };

  /* SCROLL FUNCTIONS */
  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 relative">

      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* HEADER */}
        <div className="text-center relative">

          <h2 className="text-3xl md:text-5xl font-bold text-blue-900">
            Our Startups
          </h2>

          <div className="mx-auto mt-4 h-1 w-20 bg-orange-500 rounded-full" />

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
            Real progress starts with small steps and teamwork.
          </p>

          {isAdmin && (
            <div className="absolute right-0 top-0 flex gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="bg-orange-500 text-white p-3 rounded-full"
              >
                <FaPlus />
              </button>

              <button
                onClick={handleLogout}
                className="bg-blue-900 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* SCROLLABLE STORIES */}
        <div className="relative mt-14">

          {/* LEFT BUTTON */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-3 rounded-full"
          >
            <FaChevronLeft />
          </button>

          {/* STORIES CONTAINER */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-12"
          >
            {stories.map((story) => (
              <StoryCard
                key={story._id}
                story={story}
                isAdmin={isAdmin}
                onDelete={() => handleDelete(story._id)}
              />
            ))}
          </div>

          {/* RIGHT BUTTON */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-3 rounded-full"
          >
            <FaChevronRight />
          </button>

        </div>
      </div>

      {/* ADD STARTUP MODAL */}
      {showModal && isAdmin && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 space-y-3">

            <h2 className="text-xl font-semibold text-center">
              Add Startup
            </h2>

            <input
              type="text"
              placeholder="Startup Title"
              className="w-full border p-2 rounded"
              value={newStory.title}
              onChange={(e) =>
                setNewStory({ ...newStory, title: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Founder / Team Name"
              className="w-full border p-2 rounded"
              value={newStory.name}
              onChange={(e) =>
                setNewStory({ ...newStory, name: e.target.value })
              }
            />

            <textarea
              placeholder="Description"
              className="w-full border p-2 rounded"
              value={newStory.desc}
              onChange={(e) =>
                setNewStory({ ...newStory, desc: e.target.value })
              }
            />

            <input
              type="file"
              accept="image/*"
              className="w-full border p-2 rounded"
              onChange={handleImageSelect}
            />

            <div className="flex justify-between pt-2">

              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleAddStory}
                className="bg-orange-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>

            </div>

          </div>
        </div>
      )}
    </section>
  );
}