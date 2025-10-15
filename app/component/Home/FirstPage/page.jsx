"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import content from "@/app/Texts/content.json";

const firstPage = content.FirstPage;

export default function TaxLawyerLandingPage({ scroleDiscover }) {
  return (
    <main className="min-h-screen flex items-center overflow-x-hidden justify-center bg-white px-6 py-12">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Text Section */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <span className="uppercase tracking-widest text-3xl font-semibold  text-gray-600">
            {firstPage.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            {/* Render HTML for colored span */}
            {firstPage.title
              .split("\n")
              .map((line, i) => (
                <span key={i} dangerouslySetInnerHTML={{ __html: line }} />
              ))
              .reduce((prev, curr) => [prev, <br key={Math.random()} />, curr])}
          </h1>
          <p className="text-gray-500 max-w-md">{firstPage.description}</p>
          <button
            onClick={() => {
              scroleDiscover(); // Call the function
            }}
            className="inline-block px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-full font-medium transition"
          >
            {firstPage.button}
          </button>

          <div className="flex flex-wrap gap-3 mt-4">
            {firstPage.tags.map((label, idx) => (
              <span
                key={idx}
                className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-600"
              >
                {label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="rounded-3xl overflow-hidden shadow-lg bg-gray-50 p-6"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <Image
            src={firstPage.image.src}
            alt={firstPage.image.alt}
            width={firstPage.image.width}
            height={firstPage.image.height}
            className="rounded-3xl object-cover w-full h-auto"
            priority
          />
        </motion.div>
      </div>
    </main>
  );
}
