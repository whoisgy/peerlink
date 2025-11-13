import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function BookingForm({ selectedTutor, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    date: "",
    time: "",
    duration: "30",
    notes: "",
  });

  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (selectedTutor) {
      setForm((prev) => ({
        ...prev,
        subject: selectedTutor.subject,
      }));
    }
  }, [selectedTutor]);

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setStatus("loading");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          student_name: form.name,
          student_email: form.email,
          subject: form.subject,
          date: form.date,
          time: form.time,
          duration: form.duration + " minutes",
          tutor: selectedTutor?.name || "N/A",
          notes: form.notes || "No notes provided.",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      onSuccess?.(); // close modal

      setForm({
        name: "",
        email: "",
        subject: selectedTutor?.subject || "",
        date: "",
        time: "",
        duration: "30",
        notes: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">
        Book session {selectedTutor && `with ${selectedTutor.name}`}
      </h2>

      <form className="space-y-4" onSubmit={submit}>
        <div>
          <label className="text-sm font-medium">Your Name</label>
          <input
            required
            name="name"
            value={form.name}
            onChange={change}
            className="w-full mt-1 px-3 py-2 border rounded-xl"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Your Email</label>
          <input
            required
            name="email"
            type="email"
            value={form.email}
            onChange={change}
            className="w-full mt-1 px-3 py-2 border rounded-xl"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Subject</label>
          <input
            required
            name="subject"
            value={form.subject}
            onChange={change}
            className="w-full mt-1 px-3 py-2 border rounded-xl"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Date</label>
            <input
              required
              type="date"
              name="date"
              value={form.date}
              onChange={change}
              className="w-full mt-1 px-3 py-2 border rounded-xl"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Time</label>
            <input
              required
              type="time"
              name="time"
              value={form.time}
              onChange={change}
              className="w-full mt-1 px-3 py-2 border rounded-xl"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Duration</label>
          <select
            name="duration"
            value={form.duration}
            onChange={change}
            className="w-full mt-1 px-3 py-2 border rounded-xl"
          >
            <option value="15">15 min</option>
            <option value="30">30 min</option>
            <option value="60">60 min</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Notes (optional)</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={change}
            className="w-full mt-1 px-3 py-2 border rounded-xl h-20 resize-none"
            placeholder="Any specific topics?"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium
                     hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5
                     transition cursor-pointer disabled:opacity-50 flex items-center justify-center"
        >
          {status === "loading" && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {status === "loading" ? "Booking..." : "Confirm Booking"}
        </button>

        {status === "success" && (
          <p className="flex items-center text-green-600 text-sm mt-2">
            <CheckCircle className="w-4 h-4 mr-1" /> Booking successful!
          </p>
        )}

        {status === "error" && (
          <p className="flex items-center text-red-600 text-sm mt-2">
            <AlertCircle className="w-4 h-4 mr-1" /> Something went wrong.
          </p>
        )}
      </form>
    </div>
  );
}
