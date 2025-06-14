"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

// ===== 🎨 Style & Text Variables =====
const COLORS = {
  background: "bg-gray-100",
  card: "bg-white",
  textPrimary: "text-gray-800",
  textSecondary: "text-gray-600",
  price: "text-gray-500",
  button: "bg-white text-gray-800 hover:bg-gray-200",
  descriptionBg: "bg-white/30 text-black",
  dotActive: "bg-gray-800",
  dotInactive: "bg-gray-400",
};

const TEXT = {
  title: "🛍️ Nos Produits",
  subtitle:
    "Découvrez notre sélection avec la meilleure qualité pour répondre à tous vos besoins. Parce que vous méritez l'excellence au quotidien.",
};

// ===== 🛒 Products =====
const products = [
  {
    name: "Miel",
    price: 29.99,
    image: "/images/miel.png",
    description: "Miel pur naturel, riche en nutriments.",
  },
  {
    name: "Lait Bio",
    price: 59.99,
    image: "/images/milk.jpg",
    description: "Lait frais 100% biologique.",
  },
  {
    name: "Fraises",
    price: 149.99,
    image: "/images/fraise.jpg",
    description: "Fraises fraîches et sucrées de saison.",
  },
  {
    name: "Miel",
    price: 29.99,
    image: "/images/miel.png",
    description: "Miel pur naturel, riche en nutriments.",
  },
];

const CARD_WIDTH = 300;

export default function HomePage() {
  const scrollRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const isManualScroll = useRef(false);
  const timeoutRef = useRef(null);

  // 🧠 Responsive items count
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

  const totalPages = Math.ceil(products.length / itemsPerPage);

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
        const scrollLeft = container.scrollLeft;
        const newPage = Math.round(scrollLeft / (CARD_WIDTH * itemsPerPage));
        if (newPage !== currentPage) {
          setCurrentPage(newPage);
        }
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
      className={`min-h-screen ${COLORS.background} flex flex-col items-center justify-center p-6`}
    >
      <h1
        className={`text-4xl font-bold mb-2 text-center ${COLORS.textPrimary}`}
      >
        {TEXT.title}
      </h1>
      <p
        className={`text-lg ${COLORS.textSecondary} mb-8 text-center max-w-2xl`}
      >
        {TEXT.subtitle}
      </p>

      <div className="relative w-full max-w-6xl">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-md transition duration-200 ${COLORS.button}`}
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>

        {/* Product List */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-hidden scroll-smooth px-4 sm:px-10"
        >
          {products.map((product, idx) => (
            <div
              key={idx}
              className={`flex-shrink-0 w-72 ${COLORS.card} rounded-xl shadow-md overflow-hidden`}
            >
              <div className="relative group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-110"
                />
                <div
                  className={`absolute bottom-0 w-full ${COLORS.descriptionBg} text-sm text-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                >
                  {product.description}
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className={COLORS.price}>${product.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-md transition duration-200 ${COLORS.button}`}
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="mt-4 flex gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToPage(index)}
            className={`w-3 h-3 rounded-full transition ${
              currentPage === index ? COLORS.dotActive : COLORS.dotInactive
            }`}
          ></button>
        ))}
      </div>
    </main>
  );
}
