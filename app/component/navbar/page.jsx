"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { User, LogOut } from "lucide-react"; // Icons
import Progression from "@/app/component/Proogression/page";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useSession, signOut, signIn } from "next-auth/react";
import { set } from "date-fns";

const TEXTS = {
  brandName: "Ski agrotour luxe",
  navItems: [
    "Home",
    "traditional cheese",
    "animal husbandry",
    "aquaculture farm",
    "red fruit farm",
    "honey farm",
    "edible mushroom farm",
    "order",
  ],
  login: "Login",
  logout: "Logout",
  Admin: "admin",
};

export default function AppNavbar({
  select,
  scroletoorder,
  selected_from_DescoverPage,
}) {
  const [open, setOpen] = React.useState(false);
  const { data: session, status } = useSession();
  const [SelectedItem, setselecteditem] = React.useState("Home");
  const [isLoading, setIsLoading] = React.useState(false);

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
        setIsLoading(false);
      }
    });
  };
  React.useEffect(() => {
    if (selected_from_DescoverPage != "order") {
      setselecteditem(selected_from_DescoverPage);
    }
  }, [selected_from_DescoverPage]);
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
            <NavigationMenuList className="flex gap-6">
              {TEXTS.navItems.map((item) => (
                <NavigationMenuItem key={item}>
                  <motion.button
                    onClick={() => {
                      if (item === "order") {
                        console.log("clicked");
                        scroletoorder();
                      } else {
                        select(item);

                        setselecteditem(item);
                      }
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={
                      SelectedItem === item ? { scale: 1.08 } : { scale: 1 }
                    }
                    className={`text-sm font-medium transition ${
                      SelectedItem === item && SelectedItem !== "order"
                        ? "text-white bg-black font-bold rounded-2xl p-2 h-9"
                        : "text-black"
                    }`}
                  >
                    {item}
                  </motion.button>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Login */}
          <div className="hidden sm:flex flex-col gap-2 items-end">
            {status === "loading" ? (
              <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="font-semibold bg-black text-white hover:bg-gray-700 transition"
                  >
                    {"Admin"}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-white shadow-lg rounded-xl border border-gray-200"
                >
                  <DropdownMenuItem
                    onClick={() => {
                      setIsLoading(true); // Start loading

                      select("admin");
                      setselecteditem("admin");
                    }}
                    className="flex items-center gap-2 text-black font-medium hover:bg-gray-100 px-3 py-2 rounded-lg cursor-pointer"
                  >
                    <User className="w-4 h-4 text-black" />
                    <span>{TEXTS.Admin}</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 font-semibold hover:bg-red-100 px-3 py-2 rounded-lg cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-red-600" />
                    <span>{TEXTS.logout}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                asChild
                variant="default"
                className="bg-black hover:bg-gray-700"
              >
                <Link
                  onClick={() => {
                    setIsLoading(true);
                  }}
                  href="/Login"
                >
                  {TEXTS.login}
                </Link>
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
                <div className="space-y-4">
                  {TEXTS.navItems.map((item) => (
                    <motion.button
                      key={item}
                      onClick={() => {
                        if (item === "order") {
                          scroletoorder();
                          setOpen(false);
                        } else {
                          setOpen(false);
                          select(item);

                          setselecteditem(item);
                        }
                      }}
                      whileTap={{ scale: 0.97 }}
                      animate={
                        SelectedItem === item ? { scale: 1.05 } : { scale: 1 }
                      }
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition ${
                        SelectedItem === item && SelectedItem != "order"
                          ? "text-white bg-black font-bold"
                          : "text-black bg-transparent"
                      }`}
                    >
                      {item}
                    </motion.button>
                  ))}

                  {status === "loading" ? (
                    <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
                  ) : session ? (
                    <>
                      <Button
                        onClick={() => {
                          setIsLoading(true); // Start loading

                          select("admin");
                          setselecteditem("admin");
                        }}
                        className="w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-700 mt-2"
                      >
                        {TEXTS.Admin}
                      </Button>
                      <Button
                        onClick={() => {
                          setOpen(false);
                          handleLogout();
                        }}
                        className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 mt-2"
                      >
                        {TEXTS.logout}
                      </Button>
                    </>
                  ) : (
                    <Button
                      asChild
                      variant="default"
                      className="w-full bg-black hover:bg-gray-700 mt-2"
                      onClick={() => setOpen(false)}
                    >
                      <Link
                        onClick={() => {
                          setIsLoading(true);
                        }}
                        href="/Login"
                      >
                        {TEXTS.login}
                      </Link>
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
