"use client";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade } from "swiper/modules";

type ImageItem = {
  description: string;
  id: number;
  src: string;
  category: string;
};

type GalleryProps = {
  visibleImages: ImageItem[];
  category: string;

  setCategory: (cat: string) => void;
  setCurrentPage: (page: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
  currentPage: number;
  totalPages: number;
};

export default function Gallery({

  visibleImages,
  category,
  setCategory,
  setCurrentPage,
  handlePrev,
  handleNext,
  currentPage,
  totalPages,
}: GalleryProps) {
  const [mounted, setMounted] = useState(false);
const [activeDescId, setActiveDescId] = useState<number | null>(null);
useEffect(() => setMounted(true), []);

if (!mounted) return null; // skip animations on server

  return (
    <div className="w-full p-4" id="gallery">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="space-x-2">
          {["All", "Interior", "Exterior"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setCurrentPage(0);
              }}
              className={`px-4 py-1 rounded-4xl ${
                category === cat
                  ? "bg-[#404041] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex space-x-2 font-bold">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="px-2 py-1 rounded-4xl bg-[#404041] text-white disabled:opacity-50"
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage >= totalPages - 1}
            className="px-2 py-1 rounded-4xl bg-[#404041] text-white disabled:opacity-50"
          >
            &#8594;
          </button>
        </div>
      </div>

      {/* Large devices → Grid with fade-in */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
  {visibleImages.map((img, i) => (
  <motion.div
    key={img.id}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
    viewport={{ once: true }}
    className="relative w-full h-48 rounded overflow-hidden flex items-center justify-center group"
  >
    <Image
      src={img.src}
      alt={img.category}
      fill
      className="object-contain p-2 shadowss2 hover:scale-105 transition-transform duration-300"
      priority={img.id <= 4}
    />

    {/* Description overlay */}
    <div className="absolute m-[1%] inset-0 bg-black/40  rounded-xl backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
      <p className="font-semibold text-sm px-2 text-shadow-2xs text-center">
        {img.description} 
      </p>
    </div>
  </motion.div>
))}

      </div>

      {/* Small & medium devices → Swiper carousel with fade effect */}
      <div className="md:hidden">
        <Swiper
          spaceBetween={16}
          slidesPerView={1}
          effect="fade"
          modules={[EffectFade]}
          className="!overflow-hidden"
          fadeEffect={{ crossFade: true }}
        >
          {Array.from({ length: Math.ceil(visibleImages.length / 4) }).map(
            (_, i) => (
   

<SwiperSlide key={i} className="!w-full">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
    className="grid grid-cols-2 gap-4"
  >
    {visibleImages.slice(i * 4, i * 4 + 4).map((img, idx) => (
      <motion.div
        key={img.id}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: idx * 0.1,
          ease: "easeOut",
        }}
        viewport={{ once: true }}
        className="relative w-full aspect-[1/1] bg-white rounded overflow-hidden flex items-center justify-center"
        onClick={() =>
          setActiveDescId(activeDescId === img.id ? null : img.id)
        }
      >
        <Image
          src={img.src}
          alt={img.category}
          fill
          className="object-contain p-2"
        />

        {/* Description overlay */}
        {activeDescId === img.id && (
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center rounded transition-all duration-300">
            <p className="text-white text-sm px-2 text-shadow-2xs text-center">
              {img.description} description here
            </p>
          </div>
        )}
      </motion.div>
    ))}
  </motion.div>
</SwiperSlide>

            )
          )}
        </Swiper>
      </div>
    </div>
  );
}
