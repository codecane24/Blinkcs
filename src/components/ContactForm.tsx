"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

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
        toast.success("Message sent successfully!");
        setFormData({ name: "", company: "", mobile: "", email: "", message: "" });
      } else {
        toast.error(result.error || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }

    setSending(false);
  };

  return (
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
  );
}
