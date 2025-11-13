import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import TutorSearch from "./components/TutorSearch";
import BookingForm from "./components/BookingForm";
import BookingModal from "./components/BookingModal";
import {
  Zap,
  CheckCircle,
  Clock,
  Users,
  MessageSquare,
  CalendarCheck,
  Shield,
  Star,
} from "lucide-react";

function HomePage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-5xl font-extrabold leading-tight">
            Get unstuck fast with{" "}
            <span className="text-indigo-600">peer micro-tutoring</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            PeerLink matches you with students who mastered the topic you need—right now.
          </p>

          <button
            onClick={() => navigate("/tutors")}
            className="mt-6 px-5 py-3 rounded-xl bg-indigo-600 text-white font-medium shadow
                       hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5
                       transition cursor-pointer"
          >
            Find tutors
          </button>
        </div>

        <div>
          <div className="rounded-2xl bg-white shadow-xl p-6 border">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800"
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div>
                <div className="font-semibold">Match found</div>
                <div className="text-gray-500 text-sm">AVL Trees • Tonight 7:30 PM</div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {[
                { name: "Aisha, CS Year 3", rating: 4.9 },
                { name: "Ken, Math Year 2", rating: 4.8 },
              ].map((t, i) => (
                <div
                  key={i}
                  className="p-4 border rounded-xl flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-gray-500 text-sm">4.9 • Highly Rated</div>
                  </div>
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/tutors")}
              className="mt-6 w-full py-3 bg-indigo-600 text-white rounded-xl font-medium
                         hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5
                         transition cursor-pointer"
            >
              Book Session
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function TutorsPage({ onSelectTutor }) {
  return (
    <>
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-4">
        <h1 className="text-3xl font-bold">Browse tutors & book a session</h1>
        <p className="text-gray-600 mt-2">
          Choose your tutor, set your time, and confirm your session.
        </p>
      </section>

      <TutorSearch onSelectTutor={onSelectTutor} />
    </>
  );
}

export default function App() {
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  function handleSelectTutor(tutor) {
    setSelectedTutor(tutor);
    setBookingOpen(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-900">
      {/* NAVBAR */}
      <header className="sticky top-0 bg-white/70 backdrop-blur border-b z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <Zap className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-lg">PeerLink</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/" className="hover:text-indigo-600">Home</Link>
            <Link to="/tutors" className="hover:text-indigo-600">Tutors</Link>
          </nav>

          <Link
            to="/tutors"
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium shadow
                       hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5
                       transition cursor-pointer"
          >
            Book
          </Link>
        </div>
      </header>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tutors" element={<TutorsPage onSelectTutor={handleSelectTutor} />} />
      </Routes>

      {/* BOOKING MODAL */}
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)}>
        <BookingForm
          selectedTutor={selectedTutor}
          onSuccess={() => {
            setBookingOpen(false);
            alert("Booking confirmed! Email sent.");
          }}
        />
      </BookingModal>

      {/* FOOTER */}
      <footer className="border-t mt-10">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-gray-500 flex justify-between">
          <span>© {new Date().getFullYear()} PeerLink</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-indigo-600">Privacy</a>
            <a href="#" className="hover:text-indigo-600">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
