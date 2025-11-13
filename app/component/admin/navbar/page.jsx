"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Progression from "@/app/component/Proogression/page";

const TEXTS = {
  brandName: "Ski agrotour luxe",
  navItems: [
    { label: "Products", href: "/admin/products" },
    { label: "Commandes", href: "/admin/commande" },
    { label: "Farms", href: "/admin/farms" },
    { label: "Users", href: "/admin/Users" },
    { label: "Client", href: "/admin/Users" },

    { label: "Paramètre", href: "/admin/parametre" },
  ],
  login: "Login",
  logout: "Logout",
};

export default function AppNavbar({ onNavChange, currentPage }) {
  const [open, setOpen] = React.useState(false);
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);

        signOut({ callbackUrl: "/" });
      }
    });
  };

  return (
    <>
      {isLoading && <Progression isVisible={true} />}
      <header className="bg-white text-black shadow-sm px-6 py-4 z-50 ">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="ACME Logo"
              width={42}
              height={42}
              className="bg-black rounded-lg shadow-md"
            />
            <span className="text-lg font-bold">{TEXTS.brandName}</span>
          </div>

          {/* Desktop Nav */}
          <NavigationMenu className="hidden sm:flex">
            <NavigationMenuList className="flex gap-4">
              <button
                key="HOME"
                type="button"
                onClick={() => {
                  setIsLoading(true);
                  router.push("/"); // 👉 Smooth Next.js navigation to racine
                }}
                className={
                  "text-sm font-medium transition text-black bg-transparent"
                }
              >
                Home
              </button>
              {TEXTS.navItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  <button
                    type="button"
                    onClick={() => onNavChange(item.label)}
                    className={`text-sm font-medium ${
                      currentPage === item.label
                        ? "text-white bg-black font-bold  rounded-2xl w-24 h-9"
                        : "text-black"
                    }`}
                  >
                    {item.label}
                  </button>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Login/Logout */}
          <div className="hidden sm:block">
            {status === "loading" ? (
              <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
            ) : session ? (
              <Button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                {TEXTS.logout}
              </Button>
            ) : (
              <Button
                asChild
                variant="default"
                className="bg-black hover:bg-gray-700"
              >
                <Link href="/Login">{TEXTS.login}</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="sm:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  {open ? "✕" : "≡"}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[70%] p-6">
                <div className="flex flex-col gap-6">
                  <button
                    key="HOME"
                    type="button"
                    onClick={() => {
                      setIsLoading(true);
                      router.push("/"); // 👉 Smooth Next.js navigation to racine
                    }}
                    className={
                      "text-sm font-medium transition text-black bg-transparent"
                    }
                  >
                    Home
                  </button>
                  {TEXTS.navItems.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        onNavChange(item.label);
                        setOpen(false);
                      }}
                      className={`text-sm font-medium transition ${
                        currentPage === item.label
                          ? "text-white bg-black font-bold rounded-2xl p-2 h-9"
                          : "text-black bg-transparent"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  {session ? (
                    <Button
                      onClick={() => {
                        setIsLoading(true);

                        setOpen(false);
                        handleLogout();
                      }}
                      className="w-full bg-red-600 hover:bg-red-700 mt-4 text-white"
                    >
                      {TEXTS.logout}
                    </Button>
                  ) : (
                    <Button
                      asChild
                      className="w-full bg-black hover:bg-gray-700 mt-4"
                      onClick={() => setOpen(false)}
                    >
                      <Link href="/Login">{TEXTS.login}</Link>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
