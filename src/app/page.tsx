"use client"; 
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import { Phone, Mail, MapPin } from "lucide-react";
import { Courier_Prime, Courgette } from "next/font/google";
import { Inconsolata } from "next/font/google";
import ContactForm from "@/components/ContactForm";

// Fonts
const courierPrime = Courier_Prime({ subsets: ["latin"], weight: "400" });
const courgette = Courgette({ subsets: ["latin"], weight: "400" });
const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Image Data
const imagesData = [
  { id: 1, src: "/brick1.webp", category: "Interior", alt: "Interior custom concrete brick 1" },
  { id: 2, src: "/brick2.webp", category: "Exterior", alt: "Exterior custom concrete brick 2" },
  { id: 3, src: "/brick3.webp", category: "Interior", alt: "Interior custom concrete brick 3" },
  { id: 4, src: "/brick4.png", category: "Exterior", alt: "Exterior custom concrete brick 4" },
  { id: 5, src: "/brick5.webp", category: "Interior", alt: "Interior custom concrete brick 5" },
  { id: 6, src: "/brick6.webp", category: "Exterior", alt: "Exterior custom concrete brick 6" },
  { id: 7, src: "/brick7.webp", category: "Interior", alt: "Interior custom concrete brick 7" },
  { id: 8, src: "/brick8.webp", category: "Exterior", alt: "Exterior custom concrete brick 8" },
  { id: 9, src: "/brick1.webp", category: "Interior", alt: "Interior custom concrete brick 9" },
  { id: 10, src: "/brick5.webp", category: "Exterior", alt: "Exterior custom concrete brick 10" },
];

// Background Images
const backgroundImages = [
  "/bg-home-main.webp",
  "/bg-home5.webp",
  "/bg-home4.jpeg",
  "/bg-home3.jpeg",
  "/bg-home2.jpeg",
  "/bg-home.jpeg",
];

export default function HomePage() {
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Background slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Filtered and paginated images (memoized)
  const imagesPerPage = 8;
  const filteredImages = useMemo(() => {
    return category === "All"
      ? imagesData
      : imagesData.filter((img) => img.category === category);
  }, [category]);

  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
  const visibleImages = useMemo(() => {
    const startIndex = currentPage * imagesPerPage;
    return filteredImages.slice(startIndex, startIndex + imagesPerPage);
  }, [currentPage, filteredImages]);

  // Pagination handlers
  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  // Animation variant
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="flex overflow-x-hidden">
      <Sidebar />
      <div className="lg:ml-16 flex-1 bg-[#F5F5F5]">
        {/* Hero Section */}
        <motion.section
          id="home"
          className="sm:h-screen flex flex-col md:flex-row sm:mb-12 lg:mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Left */}
          <div className="w-full h-[100vh] sm:h-auto md:w-1/2 flex flex-col items-center justify-center p-6">
            <div className="relative w-fit mb-4">
              <motion.img
                src="/blink-logo.webp"
                alt="BLINK Concrete Solutions Logo"
                className="w-52 sm:w-36 md:w-40 lg:w-52 xl:w-56 relative z-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: true }}
                 loading="eager"
                 
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent z-20"
                initial={{ x: "-100%" }}
                whileInView={{ x: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                viewport={{ once: true }}
              />
            </div>

            <motion.p
              className={`text-[#404041] mb-10 text-center mt-10 text-lg sm:text-xl lg:text-2xl xl:3xl ${courgette.className}`}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              Beautify Your Home<br />
              with Strength
            </motion.p>
            <motion.p
              className={`text-red-600 mt-2 text-sm sm:text-base ${courierPrime.className}`}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.8, delay: 0.9 }}
              viewport={{ once: true }}
            >
              since 2017
            </motion.p>
          </div>

          {/* Right */}
          <div className="relative w-full md:w-1/2 flex items-center justify-center h-[80vh] sm:h-auto sm:p-6">
            {backgroundImages.map((img, index) => (
              <div
              
                key={index}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
                style={{ backgroundImage: `url(${img})` }}
              >
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section id="about" className="min-h-screen flex sm:items-center sm:justify-center p-0 m-0 relative sm:mb-12 lg:mb-20">
          <Reveal y={50} delay={0.4}>
            <div className="relative flex bg-[#2C2C2C] sm:bg-transparent flex-col md:flex-row items-center md:justify-center w-full sm:px-5 md:px-0 gap-10">
              <div
                className="hidden sm:flex w-full md:w-[50%] h-[20vh] md:min-h-[40vh] lg:h-[100vh] bg-cover rounded-lg lg:my-4 md:mx-2 lg:mx-9 z-10"
                style={{ backgroundImage: `url('/AboutUs2.webp')` }}
              ></div>

              <div className="w-full md:w-[50%] mt-8 bg-[#2C2C2C] sm:rounded-lg p-8 lg:mx-9 lg:my-5 shadowss md:mx-0 z-10 md:min-h-[70vh] lg:min-h-[90vh]">
                <h1 className="text-5xl xl:text-6xl text-[#F5F5F5] font-semibold mb-3">About Us</h1>
                <div className="bg-[#EC1C24] h-[2px] w-full mb-3"></div>
                <p className="text-sm xl:text-xl md:text-lg font-extralight text-[#F5F5F5]">
                  At Blink, we believe every home should be a perfect balance of beauty and strength. Since our inception in 2022, we have been dedicated to crafting premium concrete bricks that combine durability with design excellence.
                </p>
                <p className="text-sm xl:text-xl md:text-base leading-relaxed text-[#F5F5F5] mt-4">
                  Guided by our tagline – <span className="italic">“Beautify your home with Strength”</span> – we ensure that every product not only supports strong foundations but also enhances the aesthetic appeal of every structure. Our advanced manufacturing process, strict quality checks, and eco-conscious approach make us a trusted choice for builders, architects, and homeowners alike.
                </p>
                <p className="text-sm xl:text-xl md:text-base leading-relaxed text-[#F5F5F5] mt-4">
                  At Blink, we don’t just make bricks – we create building blocks for homes, dreams, and lasting legacies.
                </p>
              </div>

              <div
                className="sm:hidden flex w-full md:w-[40%] h-[60vh] md:h-[100vh] bg-cover rounded-lg lg:my-4 md:mx-9 z-10"
                style={{ backgroundImage: `url('/AboutUs2.webp')` }}
              ></div>

              <div
                className="absolute sm:hidden left-0 bottom-[0%] h-40 w-full z-0 bg-cover"
                style={{ backgroundImage: `url('/bgof-about-us.webp')` }}
              ></div>

              <div
                className="hidden sm:flex absolute left-0 bottom-[14%] xl:bottom-[2%] h-40 w-full z-0 bg-cover"
                style={{ backgroundImage: `url('/bgof-about-us.webp')` }}
              ></div>
            </div>
          </Reveal>
        </motion.section>

        {/* Gallery Section */}
        <Reveal y={90} delay={0.3}>
          <div id="gallery" className="mb-11 sm:mb-12 lg:mb-20">
            <Gallery
              visibleImages={visibleImages}
              category={category}
              setCategory={setCategory}
              setCurrentPage={setCurrentPage}
              handlePrev={handlePrev}
              handleNext={handleNext}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        </Reveal>

        {/* Contact Section */}
        <Reveal y={50} delay={0.4}>
          <motion.section
            id="contact"
            className="min-h-screen text-black flex items-center justify-center p-0 mb-5 sm:mb-12 lg:mb-20"
          >
            <div className="flex flex-col md:flex-row items-start justify-center bg-[#f4f3f3] w-full sm:px-5 md:px-0 gap-4 lg:gap-10 xl:gap-10">
              <div className="w-[80%] sm:w-1/2 mx-auto rounded-lg overflow-hidden md:mt-5 md:ml-5 lg:mt-5 lg:ml-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117470.76714368863!2d72.385109!3d23.061874000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9f6d1bb128c5%3A0xaf09f75451dfac6f!2sGodhavi%2C%20Gujarat%20382115!5e0!3m2!1sen!2sin!4v1757494236106!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  className="min-h-[500px] md:min-h-[700px] border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>

              <div className="w-full md:w-1/2 bg-white sm:rounded-lg p-8 md:mr-2 lg:mr-9 sm:shadowss my-5">
      <h1 className="text-4xl xl:text-6xl text-[#EC1C24] font-semibold mb-6">Contact Us</h1>
              <ContactForm />

                <div className="mt-10">
                  <h3 className="text-2xl font-semibold mb-4">How to reach us</h3>
                  <div className="flex flex-col gap-3">
                    <a href="tel:+916353156181" className="flex items-center gap-3 hover:text-black transition">
                      <Phone className="w-6 h-6 text-black" /> +916353156181
                    </a>
                    <a href="mailto:nilesh@blinkcs.com" className="flex items-center gap-3 hover:text-black transition">
                      <Mail className="w-6 h-6 text-black" /> nilesh@blinkcs.com
                    </a>
                    <a href="https://maps.app.goo.gl/CZGnZEure8qTvSTQA" target="_blank" rel="noopener noreferrer" className="flex items-start sm:items-center gap-3 hover:text-black transition">
                      <MapPin className="w-8 h-8 text-black" /> 74/2, Palodia Tekra, Nr. Aarya Farm, Shilaj Road, Ahmedabad – 380059
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </Reveal>

{/* Footer section */}
       <div className="bg-black w-full h-12 pt-2 text-white font-light text-center text-sm flex flex-col md:flex-row items-center justify-center relative">
  
  <p className="mx-auto">© 2025 Blink Concrete Solutions</p>
  
  <span className="text-[0.7rem] mt-1 md:mt-0 md:absolute md:right-5">
    - developed by{' '}
    <span className={`${inconsolata.className} antialiased text-sm`}>
      Tech Tycoons
    </span>
  </span>

</div>

      </div>
    </div>
  );
}
