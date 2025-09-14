"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

// ===== 🎨 Style & Text Variables =====
const COLORS = {
  background: "bg-gray-100",
  card: "bg-white",
  textPrimary: "text-gray-800",
  textSecondary: "text-gray-600",
  price: "text-gray-500",
  button: "bg-white text-gray-800 hover:bg-gray-200",
  descriptionBg: "bg-white/80 text-black",
  dotActive: "bg-gray-800",
  dotInactive: "bg-gray-400",
};

const TEXT = {
  title: "🛍️ Our Products",
  subtitle:
    "Discover our selection with the highest quality to meet all your needs. Because you deserve excellence every day.",
};

const CARD_WIDTH = 300;

export default function HomePage() {
  const scrollRef = useRef(null);
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const isManualScroll = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    fetch("/api/Product")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]));
  }, []);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) setItemsPerPage(1);
      else if (width < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil((products?.length || 0) / itemsPerPage);

  const scrollToPage = (pageIndex) => {
    if (!scrollRef.current) return;
    isManualScroll.current = true;
    scrollRef.current.scrollTo({
      left: pageIndex * CARD_WIDTH * itemsPerPage,
      behavior: "smooth",
    });
    setCurrentPage(pageIndex);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isManualScroll.current = false;
    }, 400);
  };

  const scrollLeft = () => {
    if (currentPage > 0) scrollToPage(currentPage - 1);
  };

  const scrollRight = () => {
    if (currentPage < totalPages - 1) scrollToPage(currentPage + 1);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      if (isManualScroll.current) return;
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        const newPage = Math.round(
          container.scrollLeft / (CARD_WIDTH * itemsPerPage)
        );
        if (newPage !== currentPage) setCurrentPage(newPage);
      }, 100);
    };
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutRef.current);
    };
  }, [currentPage, itemsPerPage]);

  return (
    <main
      className={`min-h-screen ${COLORS.background} flex items-center justify-center p-4 sm:p-6`}
    >
      <div className="w-full max-w-7xl overflow-x-hidden bg-white rounded-3xl shadow-lg p-4 sm:p-8">
        <motion.h1
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-3xl sm:text-4xl font-bold mb-2 text-center ${COLORS.textPrimary}`}
        >
          {TEXT.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-base sm:text-lg ${COLORS.textSecondary} mb-6 sm:mb-8 text-center max-w-2xl mx-auto`}
        >
          {TEXT.subtitle}
        </motion.p>

        {!products || products.length === 0 ? (
          <div className="relative w-full max-w-6xl mx-auto">
            <span
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full shadow-md ${COLORS.button}`}
            >
              <Skeleton className="w-5 h-5 rounded-full" />
            </span>

            <div className="flex space-x-4 overflow-x-auto px-2 sm:px-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-64 sm:w-72 bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <Skeleton className="w-full h-48 mb-0" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-1/2 mb-2" />
                    <Skeleton className="h-5 w-1/3" />
                  </div>
                </div>
              ))}
            </div>

            <span
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full shadow-md ${COLORS.button}`}
            >
              <Skeleton className="w-5 h-5 rounded-full" />
            </span>

            <div className="mt-4 flex gap-2 justify-center">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="w-3 h-3 rounded-full" />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="relative w-full max-w-6xl mx-auto">
              {/* Left Arrow */}
              <button
                onClick={scrollLeft}
                className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full shadow-md transition duration-200 ${COLORS.button}`}
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>

              {/* Carousel */}
              <div
                ref={scrollRef}
                className="flex space-x-4 overflow-x-auto scroll-smooth overflow-y-hidden px-2 sm:px-6"
              >
                {products.map((product, idx) => (
                  <motion.div
                    key={idx}
                    className="flex-shrink-0 w-64 sm:w-72 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: false, amount: 0.2 }}
                  >
                    <div className="relative group">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-48 object-cover bg-white"
                      />
                      <div className="absolute bottom-0 w-full bg-white/80 text-black text-xs text-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {product.desc}
                      </div>
                    </div>
                    <div className="p-4">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {product.title}
                      </h2>
                      <p className="text-gray-500">{product.prix} DA</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={scrollRight}
                className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full shadow-md transition duration-200 ${COLORS.button}`}
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="mt-4 flex gap-2 justify-center">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToPage(index)}
                  className={`w-3 h-3 rounded-full transition ${
                    currentPage === index
                      ? COLORS.dotActive
                      : COLORS.dotInactive
                  }`}
                ></button>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
