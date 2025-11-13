import { useMemo, useState } from "react";
import { Search, Filter, Star, DollarSign, User } from "lucide-react";

const tutorsData = [
  { id: 1, name: "Aisha Ali", subject: "Data Structures & Algorithms", price: 25, rating: 4.9, uniYear: "CS Year 3", bio: "Top 5% in DSA, loves trees & graphs." },
  { id: 2, name: "Ken Wong", subject: "Probability & Statistics", price: 20, rating: 4.8, uniYear: "Math Year 2", bio: "Makes probability simple." },
  { id: 3, name: "Sara Lim", subject: "Python Programming", price: 18, rating: 4.7, uniYear: "CS Year 1", bio: "Beginner-friendly teacher." },
  { id: 4, name: "David Tan", subject: "Operating Systems", price: 28, rating: 4.9, uniYear: "CS Year 4", bio: "Threads, processes & scheduling expert." },
  { id: 5, name: "Nur Iman", subject: "Discrete Math", price: 22, rating: 4.8, uniYear: "CS Year 2", bio: "Logic & proofs made easy." },
  { id: 6, name: "Jason Lee", subject: "Linear Algebra", price: 21, rating: 4.7, uniYear: "Math Year 2", bio: "Vectors & matrices explained visually." },
  { id: 7, name: "Priya Kumar", subject: "Database Systems", price: 23, rating: 4.8, uniYear: "CS Year 3", bio: "SQL + ERDs specialist." },
  { id: 8, name: "Luqman Hakim", subject: "Computer Networks", price: 24, rating: 4.6, uniYear: "CS Year 3", bio: "Explains the internet from scratch." },
  { id: 9, name: "Emily Chong", subject: "Front-end Development", price: 19, rating: 4.7, uniYear: "IT Year 2", bio: "HTML, CSS & React basics." },
  { id: 10, name: "Hafiz Rahman", subject: "Java OOP", price: 23, rating: 4.8, uniYear: "CS Year 3", bio: "OOP concepts explained clearly." },
];

export default function TutorSearch({ onSelectTutor }) {
  const [filters, setFilters] = useState({
    subject: "",
    maxPrice: "",
    tutorName: "",
  });

  const subjects = useMemo(
    () => [...new Set(tutorsData.map((t) => t.subject))],
    []
  );

  const filtered = tutorsData.filter((t) => {
    const s = !filters.subject || t.subject === filters.subject;
    const p = !filters.maxPrice || t.price <= Number(filters.maxPrice);
    const n =
      !filters.tutorName ||
      t.name.toLowerCase().includes(filters.tutorName.toLowerCase());
    return s && p && n;
  });

  function change(e) {
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
            onChange={change}
            className="w-full mt-1 border rounded-xl px-3 py-2"
          >
            <option value="">Any</option>
            {subjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium flex items-center gap-1">
            <DollarSign className="w-4 h-4" /> Max Price
          </label>
          <input
            name="maxPrice"
            placeholder="e.g. 25"
            onChange={change}
            className="w-full mt-1 border rounded-xl px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium flex items-center gap-1">
            <User className="w-4 h-4" /> Tutor Name
          </label>
          <input
            name="tutorName"
            placeholder="e.g. Aisha"
            onChange={change}
            className="w-full mt-1 border rounded-xl px-3 py-2"
          />
        </div>
      </div>

      {/* Tutor Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="p-5 border rounded-2xl bg-white shadow-sm hover:shadow-xl 
                       hover:-translate-y-1 transition cursor-pointer"
          >
            <div className="font-bold text-lg">{t.name}</div>
            <div className="text-sm text-gray-500">{t.uniYear}</div>
            <div className="mt-1 text-indigo-600 font-medium">{t.subject}</div>
            <p className="mt-2 text-gray-600 text-sm">{t.bio}</p>

            <div className="mt-4 flex items-center justify-between">
              <div className="font-semibold">
                RM {t.price} <span className="text-gray-500 text-sm">/30 min</span>
              </div>

              <button
                onClick={() => onSelectTutor(t)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium
                           hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5
                           transition cursor-pointer"
              >
                Book with {t.name.split(" ")[0]}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
