import { X, Send, CalendarCheck } from "lucide-react";
import { useState } from "react";

export default function ChatModal({ open, onClose, tutor, onRequestBooking }) {
  if (!open || !tutor) return null;

  const [messages, setMessages] = useState([
    {
      from: "tutor",
      text: `Hi! I'm ${tutor.name}. How can I help you today?`,
    },
  ]);

  const [input, setInput] = useState("");

  function sendMessage() {
    if (!input.trim()) return;

    setMessages([...messages, { from: "student", text: input }]);
    setInput("");

    // Fake tutor reply for prototype
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "tutor",
          text: "Thanks for your message! If you'd like, we can schedule a session. Just click “Arrange Session”.",
        },
      ]);
    }, 600);
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-semibold">
            Chat with {tutor.name}
          </div>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto" style={{ maxHeight: "400px" }}>
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl max-w-[80%] ${
                m.from === "student"
                  ? "bg-indigo-600 text-white ml-auto"
                  : "bg-gray-100 text-gray-800 mr-auto"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2 p-4 border-t">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-xl"
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 text-white px-3 py-2 rounded-xl hover:bg-indigo-700 transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Arrange session button */}
        <button
          onClick={onRequestBooking}
          className="m-4 px-4 py-3 flex items-center justify-center gap-2 rounded-xl bg-green-600 text-white font-medium shadow
                     hover:bg-green-700 transition cursor-pointer"
        >
          <CalendarCheck className="w-5 h-5" />
          Arrange Session
        </button>

      </div>
    </div>
  );
}
