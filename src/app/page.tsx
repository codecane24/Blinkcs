"use client"; 
// app/page.tsx (Next.js App Router) OR pages/index.tsx (Pages Router)
import Sidebar from "@/components/Sidebar";
import Reveal from "@/components/Reveal";
import { Courier_Prime, Courgette, Khand, Montserrat } from 'next/font/google';
// Declare at top of file (module scope)
const courierPrime = Courier_Prime({ subsets: ['latin'], weight: '400' });
const courgette = Courgette({ subsets: ['latin'], weight: '400' });
const khand = Khand({ subsets: ['latin'], weight: ['400', '700'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
  const sentence = "Beautify Your Home With Stranth";


const words = sentence.split(" ");
 // List of background images
  const images = [
        "/bg-home-main.webp",
            "/bg-home5.webp",
    "/bg-home4.jpeg",
     "/bg-home3.jpeg",
    "/bg-home2.jpeg",
"/bg-home.jpeg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // changes every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

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
// Animation variant
const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className=" md:ml-16 flex-1 bg-[#F5F5F5]">
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
  <div className="w-full h-[100vh] sm:h-auto md:w-1/2 flex flex-col items-center justify-center p-6 ">
<div className="relative w-fit mb-4">
  <motion.img
    src="/blink-logo.webp"
    alt="Blink"
    className="w-52 sm:w-36 md:w-40 lg:w-52 xl:w-56 relative z-10"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    viewport={{ once: true }}
  />
  {/* Shimmer effect */}
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
    Beautify Your Home<br></br>
with Strength
    </motion.p>
   <motion.p
      className={`text-red-600 mt-2 text-sm sm:text-base ${courierPrime.className}`}
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.8, delay: 0.9 }}
      viewport={{ once: true }}
    >
      since 2022
    </motion.p>

  </div>

  {/* Right Side */}
<div className="relative w-full md:w-1/2 flex items-center justify-center h-[80vh] sm:h-auto sm:p-6">
  <div className="absolute inset-0">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        >
          {/* Black overlay */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      ))}
    </div>

      {/* <h2 className="relative text-3xl text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight text-center tracking-wide leading-relaxed">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.9 }}
          viewport={{ once: true }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </h2> */}
  </div>
</motion.section>

        {/* About Us Section */}
<motion.section
  id="about"
  className="min-h-screen  flex sm:items-center sm:justify-center p-0 m-0 relative "
>
  <Reveal y={50} delay={0.4}>
    <div className="relative flex bg-[#2C2C2C] sm:bg-transparent flex-col md:flex-row items-center md:justify-center w-full sm:px-5 md:px-0 gap-10">

      {/* Left Side - Big Image */}
      <div className="hidden sm:flex w-full md:w-[40%]  h-[20vh] md:h-[100vh] bg-cover rounded-lg lg:my-4 md:mx-9 z-10" 
           style={{ backgroundImage: `url('/AboutUs2.webp')` }}></div>

      {/* Right Side */}
      <div className="w-full md:w-[50%] mt-8 bg-[#2C2C2C] sm:rounded-lg p-8 lg:mx-9 lg:my-5 shadowss md:mx-9 z-10 xl: sm:min-h-[90vh]">
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
      
   <div className="sm:hidden flex w-full md:w-[40%]  h-[60vh] md:h-[100vh] bg-cover rounded-lg lg:my-4 md:mx-9 z-10" 
           style={{ backgroundImage: `url('/AboutUs2.webp')` }}>      {/* Bottom Background Div */}
   </div>
      {/* Bottom Background Div */}
      {/* for small screen  */}
         <div className="absolute  sm:hidden left-0 bottom-[0%] h-40 w-full   z-0 bg-cover "style={{ backgroundImage: `url('/bgof-about-us.webp')` }}></div>
         {/* for big screen */}
      <div className="hidden sm:flex absolute left-0 bottom-[14%] xl:bottom-[2%] h-40 w-full   z-0 bg-cover "style={{ backgroundImage: `url('/bgof-about-us.webp')` }}></div>

    </div>
  </Reveal>
</motion.section>


        {/* Gallery Section */}
       <Reveal y={90} delay={0.3}>
         <div id="gallery" className="">
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
      </Reveal> 

        {/* Contact Section */}
         <Reveal y={50} delay={0.4}>
<motion.section
  id="contact"
  className="min-h-screen text-black  flex items-center justify-center p-0 m-0"
 
>
  
  <div className="flex flex-col md:flex-row items-start justify-center  bg-[#f4f3f3] w-full sm:px-5 md:px-0 gap-10 xl:gap-0">
    {/* Left Side - Big Image */}
    
<div className="w-full md:w-1/2 rounded-lg overflow-hidden ">
  <div
    className="w-full h-auto bg-contain bg-center bg-no-repeat min-h-[500px] md:min-h-[700px]"
    style={{ backgroundImage: `url('/contact2.webp')` }}
  ></div>
</div>


    {/* Right Side - Form */}

    <div className="w-full md:w-1/2 bg-white rounded-lg p-8 lg:mr-9 shadowss my-5">
      <h1 className="text-4xl xl:text-6xl text-[#EC1C24] font-semibold mb-6">Contact Us</h1>

      {/* Form */}
      <form className="flex flex-col gap-4 bg-white px-5 py-4 rounded-xl">
        <input
          type="text"
          placeholder="Name"
          className="p-3 rounded   border focus:outline-none "
        />
        <input
          type="text"
          placeholder="Company"
          className="p-3 rounded   border focus:outline-none "
        />
        <input
          type="email"
          placeholder="Email"
          className="p-3 rounded   border focus:outline-none "
        />
        <textarea
          placeholder="Message"
          className="p-3 rounded   border focus:outline-none  h-32"
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
</Reveal>

 <div className="bg-black w-full h-12 pt-2 "><p className="text-white font-light text-center text-sm ">Copyright © 2025 Blink Concrete Solutions</p></div>

      </div>
     
    </div>
  );
}
