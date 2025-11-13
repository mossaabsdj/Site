"use client";
import { useState } from "react";
import Header from "@/app/component/admin/navbar/page";
import Footer from "@/app/component/Home/Footer/page";
import ProductPage from "@/app/component/admin/products/page";
import CommandesPage from "@/app/component/admin/commandes/page";
import FarmsPage from "@/app/component/admin/farms/page";
import ParametrePage from "@/app/component/admin/parametre/page";
import UserManagement from "../component/admin/UserManagment/page";
import ClientCommandes from "@/app/component/admin/Client/commandePage/page";
export default function Admin() {
  const [currentPage, setCurrentPage] = useState("Products");

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
