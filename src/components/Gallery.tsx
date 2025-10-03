"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade } from "swiper/modules";
import { ImageItem } from "@/app/page";

type GalleryProps = {
    allImages: ImageItem[];       
  visibleImages: ImageItem[];
  category: string;
  setCategory: (cat: string) => void;
  setCurrentPage: (page: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
  currentPage: number;
  totalPages: number;
    loading: boolean;
};

export default function Gallery({
    allImages,
    loading,
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

  // Only render on client to avoid hydration errors
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

// Categories come from full list
  const categories = ["All", ...Array.from(new Set(allImages.map(img => img.category)))];
// Filter images based on selected category
const filteredImages =
  category === "All"
    ? visibleImages
    : visibleImages.filter((img) => img.category === category);

  return (
    <div className="w-full p-4" id="gallery">
      {/* Top bar with categories and pagination */}
      <div className="flex flex-wrap sm:flex-nowrap gap-y-2.5  justify-between items-center mb-4">
        <div className="space-x-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setCurrentPage(0);
              }}
              className={`px-4 py-1 my-2 sm:my-0 rounded-4xl ${
                category === cat ? "bg-[#404041] text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

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

      {/* Grid for large devices */}
{/* Grid for large devices */}
<div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
  {loading
    ? Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="w-full h-48 rounded bg-gray-200 animate-pulse"
        ></div>
      ))
    : filteredImages.map((img, i) => (
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
            alt={img.category || "image"}
            fill
            className="object-contain p-2 shadow hover:scale-105 transition-transform duration-300"
            priority={img.id <= 4}
          />
          <div className="absolute inset-0 m-[1%] bg-black/40 rounded-xl backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <p className="font-semibold text-sm px-2 text-center">{img.description || ""}</p>
          </div>
        </motion.div>
      ))}
</div>
{/* Swiper for mobile */}
<div className="md:hidden">
  {loading ? (
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="w-full aspect-[1/1] rounded bg-gray-200 animate-pulse"
        ></div>
      ))}
    </div>
  ) : (
    <Swiper
      spaceBetween={16}
      slidesPerView={1}
      effect="fade"
      modules={[EffectFade]}
      fadeEffect={{ crossFade: true }}
      className="!overflow-hidden"
    >
      {Array.from({ length: Math.ceil(visibleImages.length / 4) }).map((_, i) => (
        <SwiperSlide key={i} className="!w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="grid grid-cols-2 gap-4"
          >
            {visibleImages.slice(i * 4, i * 4 + 4).map((img) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative w-full aspect-[1/1] bg-white rounded overflow-hidden flex items-center justify-center"
                onClick={() => setActiveDescId(activeDescId === img.id ? null : img.id)}
              >
                <Image
                  src={img.src}
                  alt={img.category || "image"}
                  fill
                  className="object-contain p-2"
                />
                {activeDescId === img.id && (
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center rounded transition-all duration-300">
                    <p className="text-white text-sm px-2 text-center">{img.description || ""}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  )}
</div>

    </div>
  );
}
