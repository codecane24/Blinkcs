"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

// ✅ Define a proper Product type
type Product = {
  id: number;
  name?: string;
  title?: string;
  description?: string;
  imge?: { url: string }[];
  carousel_item?: { name?: string };
};

// ✅ Skeleton component for shimmer effect
const SkeletonCard = () => (
  <div className="animate-pulse bg-white shadow-md rounded-xl overflow-hidden">
    <div className="w-full h-56 bg-gray-200"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-full"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
    </div>
  </div>
);

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true); // ✅ loader state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://effortless-ducks-f3d115d1e3.strapiapp.com/api/carousel-items?fields=name,title,description&populate[imge][fields][0]=url&populate[carousel_item][fields][0]=name&pagination[pageSize]=100",
          { cache: "no-store" }
        );
        const data = await res.json();
        const productsData: Product[] = data.data || [];

        const uniqueCategories: string[] = [
          "All",
          ...new Set(
            productsData
              .map((item: Product) => item.carousel_item?.name)
              .filter((name): name is string => Boolean(name))
          ),
        ];

        setCategories(uniqueCategories);
        setProducts(productsData);
        setFiltered(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // ✅ stop loader
      }
    };

    fetchProducts();
  }, []);

  const handleFilter = (category: string) => {
    setActiveCategory(category);
    if (category === "All") setFiltered(products);
    else {
      setFiltered(
        products.filter(
          (item) =>
            item.carousel_item?.name?.toLowerCase() === category.toLowerCase()
        )
      );
    }
  };

  return (
    <div className="w-full md:w-[90%] mx-auto px-6 py-10">
      {/* Heading */}
      <h1 className="text-3xl lg:text-4xl text-black font-semibold text-center mb-8">
        Our Products
      </h1>

      {/* Filter Buttons */}
      <div className="flex overflow-x-scroll sm:overflow-auto items-center justify-center gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
              activeCategory === cat
                ? "bg-[#404041] text-white border-[#404041]"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ✅ Skeleton Loader or Products */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {item.imge?.[0]?.url ? (
                <Image
                  src={item.imge[0].url}
                  alt={item.name || "Product Image"}
                  width={400}
                  height={300}
                  className="w-full h-56 object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              <div className="p-4">
                <h2 className="text-lg font-light mb-2 text-gray-800">
                  {item.title || item.name || "Untitled Product"}
                </h2>
                <p className="text-sm font-semibold text-gray-800 mb-3">
                  {item.description || "No description available."}
                </p>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                  {item.carousel_item?.name || "Uncategorized"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No products found.</p>
      )}
    </div>
  );
};

export default ProductsPage;
