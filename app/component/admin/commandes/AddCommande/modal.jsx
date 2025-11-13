"use client";

import React, { useEffect, useState } from "react";
import LoadingPage from "@/app/component/loading/page";
import { fetchData } from "@/lib/FetchData/page";
import { useSession } from "next-auth/react";

export default function AddModal({ open, onClose, loadData }) {
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const { data: session } = useSession(); // ✅ get session from NextAuth

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [values, setValues] = useState({
    compteId: "",
    productId: "",
    adresse: "",
    emballage: "",
    quantite: 1,
    total: 0,
    status: null,
  });

  /** LOAD PRODUCTS + CLIENTS **/
  useEffect(() => {
    if (!open) return;

    const load = async () => {
      setLoading(true);

      const prods = await fetchData({ method: "GET", url: "/api/Product" });
      const users = await fetchData({
        method: "GET",
        url: "/api/users?email=" + encodeURIComponent(session.user.email),
      });

      setProducts(prods || []);
      setClients(users || []);

      const firstProduct = prods?.[0] || null;

      setValues((prev) => ({
        ...prev,
        productId: firstProduct?.id || "",
        compteId: users?.[0]?.id || "",
        total: firstProduct ? firstProduct.prix * prev.quantite : 0,
      }));

      setSelectedProduct(firstProduct);

      setLoading(false);
    };

    load();
  }, [open]);

  /** HANDLE INPUTS **/
  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValues = { ...values, [name]: value };

    // IF PRODUCT CHANGED → UPDATE PRODUCT + TOTAL
    if (name === "productId") {
      const prod = products.find((p) => p.id === Number(value));
      setSelectedProduct(prod);
      newValues.emballage = prod.emballages?.[0]?.name || "";

      newValues.total = prod.prix * Number(values.quantite);
    }

    // IF QUANTITY CHANGED → RECALCUL TOTAL
    if (name === "quantite") {
      const qty = Number(value);
      const prix = selectedProduct?.prix || 0;

      newValues.total = prix * qty;
    }

    setValues(newValues);
  };

  /** SUBMIT **/
  const onSubmit = async () => {
    setLoading(true);

    await fetchData({
      method: "POST",
      url: "/api/Commande",
      body: values,
    });

    setLoading(false);
    loadData();
    onClose();
  };

  if (!open) return null;

  return (
    <>
      {isLoading && <LoadingPage isVisible={true} />}

      {/* BACKDROP */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
        <div className="bg-white w-full max-w-3xl p-6 rounded-2xl shadow-xl relative animate-scaleIn max-h-[90vh] overflow-y-auto">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
            onClick={onClose}
          >
            ×
          </button>

          <h1 className="text-2xl font-bold text-center mb-6">
            Ajouter Commande
          </h1>

          {/* PRODUCT IMAGE */}
          {selectedProduct && (
            <div className="flex justify-center mb-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="w-40 h-40 object-contain rounded-xl shadow"
              />
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* CLIENT */}
              <div>
                <label className="block font-medium mb-1">Client</label>
                <select
                  name="compteId"
                  value={values.compteId}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.fullName}
                    </option>
                  ))}
                </select>
              </div>

              {/* ADRESSE */}
              <div>
                <label className="block font-medium mb-1">Adresse</label>
                <input
                  type="text"
                  name="adresse"
                  value={values.adresse}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                  placeholder="Adresse de livraison"
                  required
                />
              </div>

              {/* PRODUCT */}
              <div>
                <label className="block font-medium mb-1">Produit</label>
                <select
                  name="productId"
                  value={values.productId}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} — {p.prix} DA
                    </option>
                  ))}
                </select>
              </div>

              {/* EMBALLAGE */}
              <div>
                <label className="block font-medium mb-1">Emballage</label>

                <select
                  name="emballage"
                  value={values.emballage}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                  required
                >
                  <option value="">-- Choisir un emballage --</option>

                  {selectedProduct?.emballages?.length > 0 ? (
                    selectedProduct.emballages.map((emb) => (
                      <option key={emb.id} value={emb.name}>
                        {emb.name}
                      </option>
                    ))
                  ) : (
                    <option value="">Aucun emballage disponible</option>
                  )}
                </select>
              </div>

              {/* QUANTITE */}
              <div>
                <label className="block font-medium mb-1">Quantité</label>
                <input
                  type="number"
                  min="1"
                  name="quantite"
                  value={values.quantite}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                  required
                />
              </div>

              {/* PRIX */}
              <div>
                <label className="block font-medium mb-1">Prix unitaire</label>
                <div className="p-2 border rounded-lg bg-gray-50">
                  {selectedProduct?.prix || 0} DA
                </div>
              </div>

              {/* TOTAL */}
              <div>
                <label className="block font-medium mb-1">Total</label>
                <div className="p-2 border rounded-lg bg-green-50 font-bold">
                  {values.total} DA
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-black text-white py-2 rounded-lg shadow hover:bg-white hover:text-black border border-black transition"
            >
              Ajouter
            </button>
          </form>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.25s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.92);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
