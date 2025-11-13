import { useState } from "react";
import emailjs from "@emailjs/browser";
import { CalendarCheck, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    date: "",
    time: "",
    duration: "30",
    notes: "",
  });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          // 🔑 these keys MUST match your {{variables}} in EmailJS
          student_name: form.name,
          student_email: form.email,
          subject: form.subject,
          date: form.date,
          time: form.time,
          duration: form.duration + " minutes",
          notes: form.notes || "No additional notes provided.",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setForm({
        name: "",
        email: "",
        subject: "",
        date: "",
        time: "",
        duration: "30",
        notes: "",
      });
    } catch (err) {
      console.error("Booking email error:", err);
      setStatus("error");
    }
  }

  return (
    <section id="booking" className="max-w-3xl mx-auto px-4 py-16">
      <div className="flex items-center gap-2 mb-4">
        <CalendarCheck className="w-6 h-6 text-indigo-600" />
        <h2 className="text-3xl font-bold">Book a session</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Fill in the details below. You’ll receive an email with your booking
        summary once it’s confirmed.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border bg-white/90 p-6 shadow-lg"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Your name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Jane Student"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Your email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@university.edu"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Topic / Subject
          </label>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="AVL Trees in DSA"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Time</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Duration (minutes)
            </label>
            <select
              name="duration"
              value={form.duration}
              onChange={handleChange}
              className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="60">60</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Notes for your tutor (optional)
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full rounded-xl border px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="E.g. I understand basic trees but struggle with rotations..."
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-white font-medium hover:bg-indigo-700 disabled:opacity-60"
        >
          {status === "loading" && (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          )}
          {status === "loading" ? "Booking..." : "Book session & send email"}
        </button>

        {status === "success" && (
          <p className="mt-2 flex items-center text-sm text-emerald-600">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Booking submitted! Check your email for the details.
          </p>
        )}

        {status === "error" && (
          <p className="mt-2 flex items-center text-sm text-red-600">
            <AlertCircle className="w-4 h-4 mr-1" />
            Something went wrong sending the email. Please try again.
          </p>
        )}
      </form>
    </section>
  );
}
