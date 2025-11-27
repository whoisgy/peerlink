import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import TutorSearch from "./components/TutorSearch";
import BookingForm from "./components/BookingForm";
import BookingModal from "./components/BookingModal";
import TutorProfile from "./pages/TutorProfile";

import {
  Zap,
  Star,
  Menu,
  X,
  CheckCircle,
  Clock,
  Users,
  MessageSquare,
  CalendarCheck,
  Shield,
} from "lucide-react";

/* ---------- Reusable Card Components ---------- */
function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl shadow-lg bg-white/90 border border-gray-100 ${className}`}
    >
      {children}
    </div>
  );
}

function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

/* ---------- Navbar Link (with underline animation) ---------- */
function NavbarLink({ to, text, activePath }) {
  return (
    <Link
      to={to}
      className={`relative group cursor-pointer ${
        activePath === to ? "text-indigo-600" : "text-gray-700"
      }`}
    >
      {text}
      <span
        className={`absolute left-0 -bottom-1 h-[3px] bg-indigo-600 rounded-full transition-all duration-300 
        ${activePath === to ? "w-full" : "w-0 group-hover:w-full"}`}
      ></span>
    </Link>
  );
}

/* ---------- Home Page (Landing) ---------- */
function HomePage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "On-demand help",
      desc: "Book 15–60 minute micro-sessions for exactly what you need.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Peer-verified tutors",
      desc: "Students teach what they excel at. University email gated.",
    },
    {
      icon: <CalendarCheck className="w-6 h-6" />,
      title: "Smart matching",
      desc: "Match by subject, availability, and course codes.",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Built-in chat",
      desc: "Coordinate before the session and share notes after.",
    },
  ];

  const tiers = [
    {
      name: "Campus Beta",
      price: "Free",
      perks: [
        "University email sign-in",
        "1:1 booking (15/30/60 min)",
        "Credits wallet",
        "Basic chat + email alerts",
      ],
      cta: "Join waitlist",
    },
    {
      name: "Pro",
      price: "$5 / mo",
      perks: [
        "Unlimited session recordings",
        "Monthly Session credits",
        "Priority tutor booking",
        "Tutor analytics",
      ],
      cta: "Get notified",
      featured: true,
    },
  ];

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
            PeerLink matches you with students who mastered the topic you
            need—right now.
          </p>

          <form
            className="mt-8 flex w-full max-w-lg gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              alert(`Thanks! We'll email ${email} when your campus opens.`);
              setEmail("");
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your university email"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-medium shadow
                         hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5
                         transition cursor-pointer"
            >
              Join as tutor/student
            </button>
          </form>

          <div className="mt-4 flex items-center gap-3 text-sm text-gray-500">
            <Shield className="w-4 h-4" /> University-verified accounts •
            Privacy-first
          </div>

          <button
            onClick={() => navigate("/tutors")}
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-white font-medium
                       hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5
                       transition cursor-pointer"
          >
            Find tutors
          </button>
        </div>

        {/* Right hero card */}
        <div>
          <Card>
            <CardContent>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800"
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div>
                  <div className="font-semibold">Match found</div>
                  <div className="text-gray-500 text-sm">
                    AVL Trees • Tonight 7:30 PM
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  { name: "Aisha, CS Year 3", meta: "Top 5% in DSA • 4.9" },
                  { name: "Ken, Math Year 2", meta: "Probability wiz • 4.8" },
                ].map((t, i) => (
                  <div
                    key={i}
                    className="p-4 border rounded-xl flex items-center justify-between bg-white"
                  >
                    <div>
                      <div className="font-medium">{t.name}</div>
                      <div className="text-gray-500 text-sm">{t.meta}</div>
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
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="max-w-6xl mx-auto px-4 py-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          Why students love PeerLink
        </h2>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => (
            <Card key={idx}>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                    {f.icon}
                  </div>
                  <div className="font-semibold">{f.title}</div>
                </div>
                <p className="mt-3 text-sm text-gray-600">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold">How it works</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {["Create your profile", "Search & match", "Book and learn"].map(
            (step, i) => (
              <Card key={i}>
                <CardContent>
                  <div className="flex items-center gap-2 text-indigo-600 font-semibold">
                    <CheckCircle className="w-5 h-5" /> Step {i + 1}
                  </div>
                  <div className="mt-2 font-medium">{step}</div>
                  <p className="mt-2 text-sm text-gray-600">
                    {i === 0 &&
                      "Use your university email, pick subjects you can teach or want to learn, and set availability."}
                    {i === 1 &&
                      "We match by subject, course code, rating, and time. Message to align topics & outcomes."}
                    {i === 2 &&
                      "Book 15/30/60 minutes. Meet via campus-supported video. Leave feedback and earn credits."}
                  </p>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold">
          Simple, student-friendly pricing
        </h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {tiers.map((t, i) => (
            <Card
              key={i}
              className={t.featured ? "ring-2 ring-indigo-600" : ""}
            >
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm uppercase tracking-wider text-gray-500">
                      {t.name}
                    </div>
                    <div className="mt-1 text-3xl font-extrabold">
                      {t.price}
                    </div>
                  </div>
                </div>
                <ul className="mt-6 space-y-2 text-sm">
                  {t.perks.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="min-w-[20px] w-5 h-5 text-indigo-600" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate("/tutors")}
                  className="mt-6 w-full py-3 rounded-xl bg-indigo-600 text-white font-medium
                             hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5
                             transition cursor-pointer"
                >
                  {t.cta}
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold">FAQ</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {[
            {
              q: "Is it only for one university?",
              a: "We pilot per campus first for trust and safety, currently we are only opening access for students from Sunway University, Taylors University and Monash Uniersity.",
            },
            {
              q: "How do credits work?",
              a: "Teach to earn credits and spend them to learn. Cash sessions are optionally enabled later.",
            },
            {
              q: "How do you verify tutors?",
              a: "University email, transcript badges (optional), and post-session reviews ensure quality.",
            },
            {
              q: "Where do sessions happen?",
              a: "Sessions will be held on our app/website.",
            },
          ].map((f, i) => (
            <Card key={i}>
              <CardContent>
                <div className="font-semibold">{f.q}</div>
                <p className="mt-2 text-sm text-gray-600">{f.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}

/* ---------- Tutors page (list + filters) ---------- */
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

/* ---------- Main App ---------- */
export default function App() {
  const location = useLocation();

  const [selectedTutor, setSelectedTutor] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);
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
      {/* Navbar */}
      <header
        className={`sticky top-0 z-50 backdrop-blur bg-white/70 border-b transition-shadow ${
          navShadow ? "shadow-md" : "shadow-none"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <Zap className="w-7 h-7 text-indigo-600" />
            <span className="font-extrabold text-2xl tracking-tight">
              PeerLink
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10 text-lg font-semibold">
            <NavbarLink to="/" text="Home" activePath={location.pathname} />
            <NavbarLink
              to="/tutors"
              text="Tutors"
              activePath={location.pathname.startsWith("/tutors") ? "/tutors" : location.pathname}
            />
          </nav>

          {/* Desktop button */}
          <Link
            to="/tutors"
            className="hidden md:inline-block px-5 py-2 rounded-xl bg-indigo-600 text-white text-lg font-semibold shadow
                       hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5 transition cursor-pointer"
          >
            Book
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>

        {/* Mobile drawer */}
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
                  location.pathname.startsWith("/tutors")
                    ? "text-indigo-600"
                    : "text-gray-800"
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

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/tutors"
          element={<TutorsPage onSelectTutor={handleSelectTutor} />}
        />
        <Route
          path="/tutors/:id"
          element={<TutorProfile onBook={handleSelectTutor} />}
        />
      </Routes>

      {/* Booking modal */}
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)}>
        <BookingForm
          selectedTutor={selectedTutor}
          onSuccess={() => {
            setBookingOpen(false);
            alert("Booking confirmed! Email sent.");
          }}
        />
      </BookingModal>

      {/* Footer */}
      <footer className="border-t mt-10">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-gray-500 flex justify-between">
          <span>© {new Date().getFullYear()} PeerLink</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-indigo-600">
              Privacy
            </a>
            <a href="#" className="hover:text-indigo-600">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
