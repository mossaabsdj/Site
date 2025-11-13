"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ProductOrderModal({ product, onClose, onConfirm }) {
  if (!product) return null;

  const [selectedPackaging, setSelectedPackaging] = useState(
    product.emballages?.[0]?.name || null
  );

  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");

  // 🔥 Total Price based on quantity
  const totalPrice = product.prix * quantity;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-3">
          Order: {product.title}
        </h2>

        <img
          src={product.image}
          alt={product.title}
          className="w-full h-40 object-cover rounded-xl mb-4"
        />

        {/* Packaging */}
        <div className="mb-4">
          <label className="font-semibold text-gray-700">Packaging</label>
          <select
            value={selectedPackaging}
            onChange={(e) => setSelectedPackaging(e.target.value)}
            className="mt-2 w-full border rounded-lg p-2"
          >
            {product.emballages?.map((emb) => (
              <option key={emb.id} value={emb.name}>
                {emb.name}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label className="font-semibold text-gray-700">Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="mt-2 w-full border rounded-lg p-2"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="font-semibold text-gray-700">
            Delivery Address
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your full delivery address"
            className="mt-2 w-full border rounded-lg p-2 h-20 resize-none"
          ></textarea>
        </div>

        {/* Prices */}
        <div className="mb-4 text-gray-700">
          <p>
            Unit Price: <span className="font-semibold">{product.prix} DA</span>
          </p>
          <p className="mt-1">
            Quantity: <span className="font-semibold">{quantity}</span>
          </p>
          <p className="mt-2 text-lg font-bold">
            Total Price: <span className="text-green-600">{totalPrice} DA</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onConfirm({
                productId: product.id,
                title: product.title,
                prix: product.prix,
                packagingId: selectedPackaging,
                quantity,
                address,
                totalPrice,
              })
            }
            className="flex-1 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700"
          >
            Confirm Order
          </button>
        </div>
      </motion.div>
    </div>
  );
}
