import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import TutorSearch from "./components/TutorSearch";
import BookingForm from "./components/BookingForm";
import BookingModal from "./components/BookingModal";
import {
  Zap,
  Star,
  Menu,
  X,
} from "lucide-react";

/* ---------------- NAVBAR LINK COMPONENT ---------------- */
function NavbarLink({ to, text, activePath }) {
  return (
    <Link
      to={to}
      className={`relative group cursor-pointer ${
        activePath === to ? "text-indigo-600" : "text-gray-700"
      }`}
    >
      {text}

      {/* Smooth underline animation */}
      <span
        className={`absolute left-0 -bottom-1 h-[3px] bg-indigo-600 rounded-full transition-all duration-300 
        ${activePath === to ? "w-full" : "w-0 group-hover:w-full"}`}
      ></span>
    </Link>
  );
}

/* ---------------- HOME PAGE ---------------- */
function HomePage() {
  const navigate = useNavigate();

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

        {/* Right side example */}
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
              {[{ name: "Aisha, CS Year 3" }, { name: "Ken, Math Year 2" }].map(
                (t, i) => (
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
                )
              )}
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

/* ---------------- TUTORS PAGE ---------------- */
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

/* ---------------- MAIN APP ---------------- */
export default function App() {
  const location = useLocation();

  const [selectedTutor, setSelectedTutor] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  // Mobile menu state
  const [mobileOpen, setMobileOpen] = useState(false);

  // Shadow on scroll
  const [navShadow, setNavShadow] = useState(false);
  useEffect(() => {
    const onScroll = () => setNavShadow(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleSelectTutor(tutor) {
    setSelectedTutor(tutor);
    setBookingOpen(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-900">

      {/* ---------------- UPGRADED NAVBAR ---------------- */}
      <header
        className={`sticky top-0 z-50 backdrop-blur bg-white/70 border-b transition-shadow ${
          navShadow ? "shadow-md" : "shadow-none"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <Zap className="w-7 h-7 text-indigo-600" />
            <span className="font-extrabold text-2xl tracking-tight">PeerLink</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10 text-lg font-semibold">
            <NavbarLink to="/" text="Home" activePath={location.pathname} />
            <NavbarLink to="/tutors" text="Tutors" activePath={location.pathname} />
          </nav>

          {/* Book Button */}
          <Link
            to="/tutors"
            className="hidden md:inline-block px-5 py-2 rounded-xl bg-indigo-600 text-white text-lg font-semibold shadow
                       hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5 transition cursor-pointer"
          >
            Book
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          >
            <div
              className="absolute right-0 top-0 w-2/3 max-w-sm h-full bg-white shadow-xl py-6 px-5 flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold">Menu</span>
                <button onClick={() => setMobileOpen(false)}>
                  <X className="w-7 h-7" />
                </button>
              </div>

              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className={`text-xl font-semibold ${
                  location.pathname === "/" ? "text-indigo-600" : "text-gray-800"
                }`}
              >
                Home
              </Link>

              <Link
                to="/tutors"
                onClick={() => setMobileOpen(false)}
                className={`text-xl font-semibold ${
                  location.pathname === "/tutors" ? "text-indigo-600" : "text-gray-800"
                }`}
              >
                Tutors
              </Link>

              <Link
                to="/tutors"
                onClick={() => setMobileOpen(false)}
                className="mt-4 px-5 py-3 bg-indigo-600 text-white rounded-xl text-center font-semibold
                           hover:bg-indigo-700 transition"
              >
                Book Session
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ---------------- ROUTES ---------------- */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tutors" element={<TutorsPage onSelectTutor={handleSelectTutor} />} />
      </Routes>

      {/* ---------------- BOOKING MODAL ---------------- */}
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)}>
        <BookingForm
          selectedTutor={selectedTutor}
          onSuccess={() => {
            setBookingOpen(false);
            alert("Booking confirmed! Email sent.");
          }}
        />
      </BookingModal>

      {/* ---------------- FOOTER ---------------- */}
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
