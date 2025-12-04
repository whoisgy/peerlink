import React from "react";
import { useParams } from "react-router-dom";
import { tutors } from "../data/tutors";
import { Star, MessageCircle } from "lucide-react";

export default function TutorProfile({ onChat }) {
  const { id } = useParams();
  const tutor = tutors.find((t) => t.id === Number(id));

  if (!tutor) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-red-600 text-xl">
        Tutor not found.
      </div>
    );
  }

  const hasReviews = tutor.reviews && tutor.reviews.length > 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <img
          src={tutor.photo}
          alt={tutor.name}
          className="w-40 h-40 rounded-2xl object-cover shadow-lg"
        />

        <div>
          <h1 className="text-4xl font-bold">{tutor.name}</h1>
          <div className="text-gray-600 mt-1">{tutor.uniYear}</div>

          <div className="flex items-center gap-2 mt-3">
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            <span className="text-lg font-semibold">{tutor.rating}</span>
            {hasReviews && (
              <span className="text-sm text-gray-500">
                • {tutor.reviews.length} review
                {tutor.reviews.length > 1 ? "s" : ""}
              </span>
            )}
          </div>

          <div className="mt-3 text-indigo-600 font-semibold text-lg">
            {tutor.subject}
          </div>

          <div className="text-gray-700 mt-2">
            RM {tutor.price}{" "}
            <span className="text-sm text-gray-500">/ 30 mins</span>
          </div>

          <button
            onClick={() => onChat && onChat(tutor)}
            className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-medium shadow
                       hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5
                       transition cursor-pointer inline-flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Chat with Tutor
          </button>
        </div>
      </div>

      {/* Long Bio */}
      <div className="mt-10 text-gray-700 text-lg leading-relaxed">
        {tutor.longBio}
      </div>

      {/* Reviews Section */}
      {hasReviews ? (
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          <div className="space-y-4">
            {tutor.reviews.map((r) => (
              <div
                key={r.id}
                className="border rounded-2xl bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="font-semibold text-gray-800">
                    {r.student}
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < r.rating ? "fill-yellow-500" : "opacity-30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {r.course && (
                  <div className="text-xs text-indigo-600 mb-1">
                    {r.course}
                  </div>
                )}
                <p className="text-sm text-gray-700">{r.comment}</p>
                {r.date && (
                  <div className="mt-2 text-xs text-gray-500">{r.date}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-2">Reviews</h2>
          <p className="text-gray-500 text-sm">
            No reviews yet. Be the first to chat and arrange a session.
          </p>
        </section>
      )}
    </div>
  );
}
