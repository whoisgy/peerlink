// src/App.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Star,
  CalendarCheck,
  Users,
  MessageSquare,
  Zap,
  Shield,
} from "lucide-react";
import BookingForm from "./components/BookingForm";
import TutorSearch from "./components/TutorSearch";

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl shadow-lg bg-white/90 border border-gray-100 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

export default function App() {
  const [email, setEmail] = useState("");
  const [selectedTutor, setSelectedTutor] = useState(null);

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
        "Priority matching",
        "Calendar sync",
        "Tutor analytics",
        "Fewer fees on cash sessions",
      ],
      cta: "Get notified",
      featured: true,
    },
  ];

  const scrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectTutor = (tutor) => {
    setSelectedTutor(tutor);
    scrollToBooking();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white text-gray-900">
      {/* Nav */}
      <header className="sticky top-0 backdrop-blur bg-white/60 border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-lg">PeerLink</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="hover:text-indigo-600">
              Features
            </a>
            <a href="#how" className="hover:text-indigo-600">
              How it works
            </a>
            <a href="#tutors" className="hover:text-indigo-600">
              Tutors
            </a>
            <a href="#booking" className="hover:text-indigo-600">
              Book
            </a>
            <a href="#pricing" className="hover:text-indigo-600">
              Pricing
            </a>
            <a href="#faq" className="hover:text-indigo-600">
              FAQ
            </a>
          </nav>
          <button
            onClick={() => {
              setSelectedTutor(null);
              scrollToBooking();
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium shadow
                       hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5
                       transition cursor-pointer"
          >
            Book a session
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Get unstuck fast with{" "}
            <span className="text-indigo-600">peer micro-tutoring</span>
          </h1>
          <p className="mt-5 text-lg text-gray-600">
            PeerLink matches you with students who have already mastered the
            exact topic you need—right now.
          </p>
          <form
            id="waitlist"
            className="mt-8 flex w-full max-w-lg gap-2"
            onSubmit={(e) => {
              e.preventDefault();
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
                         hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5
                         transition cursor-pointer"
            >
              Join waitlist
            </button>
          </form>
          <div className="mt-6 flex items-center gap-3 text-sm text-gray-500">
            <Shield className="w-4 h-4" /> University-verified accounts •
            Privacy-first
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card>
            <CardContent>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop"
                  alt="students"
                  className="rounded-xl w-20 h-20 object-cover"
                />
                <div>
                  <div className="font-semibold">Match found</div>
                  <div className="text-sm text-gray-500">
                    AVL Trees • Today 7:30 PM
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {[
                  {
                    name: "Aisha, CS Year 3",
                    meta: "Top 5% in DSA • 4.9",
                    stars: 5,
                  },
                  {
                    name: "Ken, Math Year 2",
                    meta: "Probability wiz • 4.8",
                    stars: 5,
                  },
                ].map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-xl border bg-white"
                  >
                    <div>
                      <div className="font-medium">{t.name}</div>
                      <div className="text-sm text-gray-500">{t.meta}</div>
                    </div>
                    <div
                      className="flex items-center gap-1 text-yellow-500"
                      aria-label={`${t.stars} stars`}
                    >
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          className={`w-5 h-5 ${
                            s < t.stars ? "fill-yellow-400" : "opacity-30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="mt-6 w-full py-3 rounded-xl bg-indigo-600 text-white font-medium
                           hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5
                           transition cursor-pointer"
                onClick={() => {
                  setSelectedTutor(null);
                  scrollToBooking();
                }}
              >
                Book 30-min Session
              </button>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-4 py-10">
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

      {/* Tutors page/section */}
      <TutorSearch onSelectTutor={handleSelectTutor} />

      {/* Booking form */}
      <BookingForm selectedTutor={selectedTutor} />

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold">
          Simple, student-friendly pricing
        </h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {tiers.map((t, i) => (
            <Card
              key={i}
              className={`${t.featured ? "ring-2 ring-indigo-600" : ""}`}
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
              a: "We pilot per campus first for trust and safety, then expand to nearby universities with separate spaces.",
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
              a: "Use campus video tools (Meet/Zoom/Teams) or in-person on campus—your choice.",
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

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-600" />
            <span>PeerLink</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-indigo-600">
              Privacy
            </a>
            <a href="#" className="hover:text-indigo-600">
              Terms
            </a>
            <a href="#" className="hover:text-indigo-600">
              Contact
            </a>
          </div>
          <div>© {new Date().getFullYear()} PeerLink</div>
        </div>
      </footer>
    </div>
  );
}
