"use client";

import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  company: string;
  mobile: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    mobile: "",
    email: "",
    message: "",
  });

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [sending, setSending] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setToast({ message: "Message sent successfully!", type: "success" });
        setFormData({ name: "", company: "", mobile: "", email: "", message: "" });
      } else {
        setToast({ message: result.error || "Something went wrong!", type: "error" });
      }
    } catch (error) {
      setToast({ message: "Something went wrong!", type: "error" });
      console.error(error);
    }

    setSending(false);

    // Hide toast after 3 seconds
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white px-5 py-4 rounded-xl shadow-md">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="p-3 rounded border border-[#D9D9D9] focus:outline-none" required />
        <input type="text" name="company" placeholder="Company" value={formData.company} onChange={handleChange} className="p-3 rounded border border-[#D9D9D9] focus:outline-none" />
        <input type="tel" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} className="p-3 rounded border border-[#D9D9D9] focus:outline-none" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-3 rounded border border-[#D9D9D9] focus:outline-none" required />
        <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} className="p-3 rounded border border-[#D9D9D9] focus:outline-none h-32" required></textarea>

        <button type="submit" disabled={sending} className={`bg-black text-white py-2 rounded-lg hover:scale-95 transition ${sending ? "opacity-70 cursor-not-allowed" : ""}`}>
          {sending ? "Sending..." : "Submit"}
        </button>
      </form>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-5 right-5 px-4 py-2 rounded shadow-lg text-white animate-slide-in ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      <style jsx>{`
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
