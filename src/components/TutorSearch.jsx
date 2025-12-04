import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Star, DollarSign, User, MessageCircle } from "lucide-react";
import { tutors } from "../data/tutors";

export default function TutorSearch({ onChat }) {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    subject: "",
    maxPrice: "",
    tutorName: "",
  });

  const subjects = useMemo(
    () => [...new Set(tutors.map((t) => t.subject))],
    []
  );

  const filtered = tutors.filter((t) => {
    const s = !filters.subject || t.subject === filters.subject;
    const p = !filters.maxPrice || t.price <= Number(filters.maxPrice);
    const n =
      !filters.tutorName ||
      t.name.toLowerCase().includes(filters.tutorName.toLowerCase());
    return s && p && n;
  });

  function handleChange(e) {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {/* Filters */}
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <div>
          <label className="text-sm font-medium flex items-center gap-1">
            <Filter className="w-4 h-4" /> Subject
          </label>
          <select
            name="subject"
            value={filters.subject}
            onChange={handleChange}
            className="w-full mt-1 border rounded-xl px-3 py-2"
          >
            <option value="">Any</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium flex items-center gap-1">
            <DollarSign className="w-4 h-4" /> Max Price
          </label>
          <input
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="e.g. 25"
            className="w-full mt-1 border rounded-xl px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium flex items-center gap-1">
            <User className="w-4 h-4" /> Tutor Name
          </label>
          <input
            name="tutorName"
            value={filters.tutorName}
            onChange={handleChange}
            placeholder="e.g. Aisha"
            className="w-full mt-1 border rounded-xl px-3 py-2"
          />
        </div>
      </div>

      {/* Tutor cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="p-5 border rounded-2xl bg-white shadow-sm hover:shadow-xl 
                       hover:-translate-y-1 transition cursor-pointer"
            onClick={() => navigate(`/tutors/${t.id}`)} // whole card → profile
          >
            <img
              src={t.photo}
              alt={t.name}
              className="w-full h-40 object-cover rounded-xl mb-4"
            />

            <div className="font-bold text-lg">{t.name}</div>
            <div className="text-sm text-gray-500">{t.uniYear}</div>
            <div className="mt-1 text-indigo-600 font-medium">{t.subject}</div>
            <p className="mt-2 text-gray-600 text-sm">{t.bio}</p>

            <div className="flex items-center gap-1 mt-3">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="text-gray-700 font-semibold">{t.rating}</span>
            </div>

            <div className="mt-2 text-gray-700 font-medium">
              RM {t.price}{" "}
              <span className="text-sm text-gray-500">/ 30 min</span>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              {/* View Profile */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/tutors/${t.id}`);
                }}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 rounded-xl text-sm font-medium
                           hover:bg-gray-200 hover:shadow transition cursor-pointer"
              >
                View Profile
              </button>

              {/* Chat with tutor */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onChat) onChat(t);
                }}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium
                           hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5
                           transition cursor-pointer inline-flex items-center justify-center gap-1"
              >
                <MessageCircle className="w-4 h-4" />
                Chat with {t.name.split(" ")[0]}
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-3 text-center text-gray-500 text-sm">
            No tutors match your filters.
          </p>
        )}
      </div>
    </section>
  );
}
