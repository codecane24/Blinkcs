"use client"; 
// app/page.tsx (Next.js App Router) OR pages/index.tsx (Pages Router)
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";

import { useState } from "react";
   import { Phone, Mail, MapPin } from "lucide-react";
import Gallery from "@/components/Gallery";
const imagesData = [
  { id: 1, src: "/brick1.webp", category: "Interior" },
  { id: 2, src: "/brick2.webp", category: "Exterior" },
  { id: 3, src: "/brick3.webp", category: "Interior" },
  { id: 4, src: "/brick4.png", category: "Exterior" },
  { id: 5, src: "/brick5.webp", category: "Interior" },
  { id: 6, src: "/brick6.webp", category: "Exterior" },
  { id: 7, src: "/brick7.webp", category: "Interior" },
  { id: 8, src: "/brick8.webp", category: "Exterior" },
  { id: 9, src: "/brick1.webp", category: "Interior" },
  { id: 10, src: "/brick5.webp", category: "Exterior" },
];
export default function HomePage() {
   const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);

  const imagesPerPage = 8; // 4 per row × 2 rows
  const filteredImages =
    category === "All"
      ? imagesData
      : imagesData.filter((img) => img.category === category);

  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);

  const startIndex = currentPage * imagesPerPage;
  const visibleImages = filteredImages.slice(
    startIndex,
    startIndex + imagesPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className=" md:ml-16 flex-1">
    {/* First Section */}
<motion.section
  id="home"
  className="sm:h-screen flex flex-col md:flex-row "  // stack on small, row on medium+
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  viewport={{ once: true }}
>
  {/* Left Side */}
  <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 ">
    <motion.img
      src="/blink-logo.webp"
      alt="Blink"
      className="w-32 sm:w-36 md:w-40 lg:w-52 xl:w-56 mb-4"
      initial={{ scale: 4.2, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true }}
    />

    <motion.p
      className="text-red-600 mt-2 text-sm sm:text-base"
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5, delay: 0.8 }}
      viewport={{ once: true }}
    >
      since 2022
    </motion.p>
  </div>

  {/* Right Side */}
<div className="relative w-full md:w-1/2 flex items-center justify-center h-96 sm:h-auto sm:p-6">
{/* Background image with blur and blackish tone */}
<div className="absolute inset-0 bg-[url('/wall-home.webp')] bg-cover bg-center filter "style={{ filter: 'blur(2px)' }}>
  <div className="absolute inset-0 bg-black/20"></div> {/* Black overlay with 20% opacity */}
</div>

    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 3, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-center tracking-wide leading-relaxed"
    >
      Beautify <br /> Your Home <br /> With Stranth
    </motion.h2>
  </div>
</motion.section>

        {/* About Us Section */}
<motion.section
    id="about"
  className="min-h-screen text-black   flex items-center justify-center p-0 m-0"
  initial={{ opacity: 0, x: -100 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.9, ease: "easeOut" }}
  viewport={{ once: true }}
>
  <div className="flex flex-col md:flex-row items-center md:justify-center w-full sm:px-5 md:px-0 gap-10">
    {/* Left Side - Big Image */}
    <div className="w-full md:w-1/2 h-96 md:h-[600px] bg-cover rounded-lg" style={{ backgroundImage: `url('/AboutUs.webp')` }}></div>

    {/* Right Side - Form */}
    <div className="w-full md:w-1/2 bg-[#E6E6E6] rounded-lg p-8 lg:mx-9">
      <h1 className="text-4xl xl:text-6xl text-[#EC1C24] font-semibold mb-6">About Us</h1>
    <p className="text-sm xl:text-xl md:text-base leading-relaxed text-black">
          At Blink, we believe every home should be a perfect balance of beauty
          and strength. Since our inception in 2022, we have been dedicated to
          crafting premium concrete bricks that combine durability with design
          excellence.
        </p>
        <p className="text-sm xl:text-xl md:text-base leading-relaxed text-black mt-4">
          Guided by our tagline – <span className="italic">“Beautify your home with Strength”</span> – 
          we ensure that every product not only supports strong foundations but also 
          enhances the aesthetic appeal of every structure. Our advanced manufacturing 
          process, strict quality checks, and eco-conscious approach make us a trusted 
          choice for builders, architects, and homeowners alike.
        </p>
        <p className="text-sm xl:text-xl md:text-base leading-relaxed text-black mt-4">
          At Blink, we don’t just make bricks – we create building blocks for homes, 
          dreams, and lasting legacies.
        </p>

    
    </div>
  </div>
</motion.section>

        {/* Gallery Section */}
        <div id="gallery">
  <Gallery 
        visibleImages={visibleImages}
        category={category}
        setCategory={setCategory}
        setCurrentPage={setCurrentPage}
        handlePrev={handlePrev}
        handleNext={handleNext}
        currentPage={currentPage}
        totalPages={totalPages}
      /></div>

        {/* Contact Section */}
<motion.section
  id="contact"
  className="min-h-screen text-black  flex items-center justify-center p-0 m-0"
  initial={{ opacity: 0, x: -100 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.9, ease: "easeOut" }}
  viewport={{ once: true }}
>
  <div className="flex flex-col md:flex-row items-center justify-center w-full sm:px-5 md:px-0 gap-10">
    {/* Left Side - Big Image */}
    <div className="w-full md:w-1/2 h-96 md:h-[600px] bg-cover bg-center rounded-lg" style={{ backgroundImage: `url('/contact.webp')` }}></div>

    {/* Right Side - Form */}
    <div className="w-full md:w-1/2 bg-[#E6E6E6] rounded-lg p-8 lg:mx-9">
      <h1 className="text-4xl xl:text-6xl text-[#EC1C24] font-semibold mb-6">Contact Us</h1>

      {/* Form */}
      <form className="flex flex-col gap-4 bg-white px-5 py-4 rounded-xl">
        <input
          type="text"
          placeholder="Name"
          className="p-3 rounded  border-black border focus:outline-none "
        />
        <input
          type="text"
          placeholder="Company"
          className="p-3 rounded  border-black border focus:outline-none "
        />
        <input
          type="email"
          placeholder="Email"
          className="p-3 rounded  border-black border focus:outline-none "
        />
        <textarea
          placeholder="Message"
          className="p-3 rounded  border-black border focus:outline-none  h-32"
        ></textarea>
        <button
          type="submit"
          className="bg-black text-white py-2 rounded hover:scale-95 transition"
        >
          Submit
        </button>
      </form>



{/* Contact Info */}
<div className="mt-10">
  <h3 className="text-2xl font-semibold mb-4">How to reach us</h3>
  <div className="flex flex-col gap-3">
    <a
      href="tel:+911234567890"
      className="flex items-center gap-3 hover:text-black transition"
    >
      <Phone className="w-6 h-6 text-black" /> +91 12345 67890
    </a>
    <a
      href="mailto:info@blink.com"
      className="flex items-center gap-3 hover:text-black transition"
    >
      <Mail className="w-6 h-6 text-black" /> info@blink.com
    </a>
    <a
      href="https://goo.gl/maps/your-location"
      target="_blank"
      className="flex items-center gap-3 hover:text-black transition"
    >
      <MapPin className="w-6 h-6 text-black" /> 123 Main Street, City
    </a>
  </div>
</div>

    </div>
  </div>
</motion.section>

      </div>
    </div>
  );
}
