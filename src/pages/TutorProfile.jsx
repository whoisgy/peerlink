import { useParams } from "react-router-dom";
import { tutors } from "../data/tutors";
import { Star } from "lucide-react";

export default function TutorProfile({ onBook }) {
  const { id } = useParams();
  const tutor = tutors.find((t) => t.id === Number(id));

  if (!tutor) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-red-600 text-xl">
        Tutor not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <img
          src={tutor.photo}
          className="w-40 h-40 rounded-2xl object-cover shadow-lg"
        />

        <div>
          <h1 className="text-4xl font-bold">{tutor.name}</h1>
          <div className="text-gray-600 mt-1">{tutor.uniYear}</div>

          <div className="flex items-center gap-2 mt-3">
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            <span className="text-lg font-semibold">{tutor.rating}</span>
          </div>

          <div className="mt-3 text-indigo-600 font-semibold text-lg">
            {tutor.subject}
          </div>

          <div className="text-gray-700 mt-2">
            RM {tutor.price} <span className="text-sm">/ 30 mins</span>
          </div>

          <button
            onClick={() => onBook(tutor)}
            className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-medium shadow
                       hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5
                       transition cursor-pointer"
          >
            Book a session
          </button>
        </div>
      </div>

      {/* Long Bio Section */}
      <div className="mt-10 text-gray-700 text-lg leading-relaxed">
        {tutor.longBio}
      </div>
    </div>
  );
}
