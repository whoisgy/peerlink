import { useMemo, useState } from "react";
import { Search, Filter, Star, DollarSign, User } from "lucide-react";

// 10 placeholder tutors
const tutorsData = [
  {
    id: 1,
    name: "Aisha Ali",
    subject: "Data Structures & Algorithms",
    price: 25,
    rating: 4.9,
    uniYear: "CS Year 3",
    bio: "Top 5% in DSA, loves explaining trees and graphs.",
  },
  {
    id: 2,
    name: "Ken Wong",
    subject: "Probability & Statistics",
    price: 20,
    rating: 4.8,
    uniYear: "Math Year 2",
    bio: "Makes probability feel like common sense.",
  },
  {
    id: 3,
    name: "Sara Lim",
    subject: "Intro to Programming (Python)",
    price: 18,
    rating: 4.7,
    uniYear: "CS Year 1",
    bio: "Great with beginners and gentle pace teaching.",
  },
  {
    id: 4,
    name: "David Tan",
    subject: "Operating Systems",
    price: 28,
    rating: 4.9,
    uniYear: "CS Year 4",
    bio: "Enjoys explaining processes, threads, and scheduling.",
  },
  {
    id: 5,
    name: "Nur Iman",
    subject: "Discrete Mathematics",
    price: 22,
    rating: 4.8,
    uniYear: "CS Year 2",
    bio: "Specialises in logic, sets, and proofs.",
  },
  {
    id: 6,
    name: "Jason Lee",
    subject: "Linear Algebra",
    price: 21,
    rating: 4.7,
    uniYear: "Math Year 2",
    bio: "Explains vectors and matrices with real-world examples.",
  },
  {
    id: 7,
    name: "Priya Kumar",
    subject: "Database Systems",
    price: 23,
    rating: 4.8,
    uniYear: "CS Year 3",
    bio: "Loves designing ERDs and SQL query optimisation.",
  },
  {
    id: 8,
    name: "Luqman Hakim",
    subject: "Computer Networks",
    price: 24,
    rating: 4.6,
    uniYear: "CS Year 3",
    bio: "Helps students visualise how packets move through the internet.",
  },
  {
    id: 9,
    name: "Emily Chong",
    subject: "Front-end Web Development",
    price: 19,
    rating: 4.7,
    uniYear: "IT Year 2",
    bio: "Focuses on HTML, CSS, and React basics.",
  },
  {
    id: 10,
    name: "Hafiz Rahman",
    subject: "Java OOP",
    price: 23,
    rating: 4.8,
    uniYear: "CS Year 3",
    bio: "Explains classes, inheritance, and interfaces clearly.",
  },
];

export default function TutorSearch({ onSelectTutor }) {
  const [filters, setFilters] = useState({
    subject: "",
    maxPrice: "",
    tutorName: "",
  });

  const subjects = useMemo(
    () => Array.from(new Set(tutorsData.map((t) => t.subject))),
    []
  );

  const filteredTutors = tutorsData.filter((t) => {
    const subjectOk = !filters.subject || t.subject === filters.subject;
    const priceOk =
      !filters.maxPrice || t.price <= Number(filters.maxPrice || 0);
    const nameOk =
      !filters.tutorName ||
      t.name.toLowerCase().includes(filters.tutorName.toLowerCase());
    return subjectOk && priceOk && nameOk;
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-6 h-6 text-indigo-600" />
        <h2 className="text-3xl font-bold">Find a tutor</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Filter by subject, budget, and tutor name. Click &quot;Book&quot; to
        pre-fill the booking form below.
      </p>

      {/* Filters */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1">
            <Filter className="w-4 h-4" /> Subject
          </label>
          <select
            name="subject"
            value={filters.subject}
            onChange={handleChange}
            className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Any subject</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1">
            <DollarSign className="w-4 h-4" /> Max price (per 30 min)
          </label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="e.g. 25"
            className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1">
            <User className="w-4 h-4" /> Tutor name
          </label>
          <input
            name="tutorName"
            value={filters.tutorName}
            onChange={handleChange}
            placeholder="Search by name"
            className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Tutor cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredTutors.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl border bg-white/90 p-5 shadow-sm
                       hover:shadow-xl hover:-translate-y-1 transition
                       cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-lg">{t.name}</div>
              <div className="flex items-center text-sm text-yellow-500">
                <Star className="w-4 h-4 fill-yellow-400" />
                <span className="ml-1 text-gray-700">{t.rating}</span>
              </div>
            </div>
            <div className="text-sm text-gray-500 mb-1">{t.uniYear}</div>
            <div className="text-sm font-medium text-indigo-700 mb-2">
              {t.subject}
            </div>
            <p className="text-sm text-gray-600 mb-4">{t.bio}</p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                <span className="font-semibold">RM {t.price}</span>{" "}
                <span className="text-xs text-gray-500">/ 30 min</span>
              </div>
              <button
                type="button"
                onClick={() => onSelectTutor(t)}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium
                           hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5
                           transition cursor-pointer"
              >
                Book with {t.name.split(" ")[0]}
              </button>
            </div>
          </div>
        ))}

        {filteredTutors.length === 0 && (
          <p className="text-gray-500 text-sm col-span-3">
            No tutors match your filters. Try adjusting your criteria.
          </p>
        )}
      </div>
    </section>
  );
}
