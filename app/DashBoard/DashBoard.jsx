"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import Header from "@/app/component/admin/navbar/page";
import Footer from "@/app/component/Home/Footer/page";
import ProductPage from "@/app/component/admin/products/page";
import CommandesPage from "@/app/component/admin/commandes/page";
import FarmsPage from "@/app/component/admin/farms/page";
import ParametrePage from "@/app/component/admin/parametre/page";
import UserManagement from "../component/admin/UserManagment/page";
import ClientCommandes from "@/app/component/admin/Client/commandePage/page";
export default function Admin() {
  const [currentPage, setCurrentPage] = useState("Paramètre");
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.user) {
      const pendingOrder = localStorage.getItem("pendingOrder");

      if (pendingOrder) {
        const order = JSON.parse(pendingOrder);

        // Attach user ID
        order.compteId = session.user.id;

        // Send order automatically
        fetch("/api/Commande", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            adresse: order.address,
            emballage: order.packagingId,
            quantite: order.quantity,
            productId: order.productId,
            compteId: session.user.id,
            status: false,
          }),
        })
          .then((res) => res.json())
          .then(() => {
            localStorage.removeItem("pendingOrder");

            Swal.fire({
              icon: "success",
              title: "Order Confirmed!",
              text: "Your order has been placed successfully after login.",
            });

            // router.push("/"); // redirect home or to /orders
          });
      }
    }
  }, [session]);
  return (
    <>
      <Header onNavChange={setCurrentPage} currentPage={currentPage} />

      {currentPage === "Products" && <ProductPage />}
      {currentPage === "Commandes" && <CommandesPage />}
      {currentPage === "Farms" && <FarmsPage />}
      {currentPage === "Paramètre" && <ParametrePage />}
      {currentPage === "Users" && <UserManagement />}
      {currentPage === "Client" && <ClientCommandes />}

      <Footer />
    </>
  );
}
