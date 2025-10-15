"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function HelpCenter({
  companyName = "Ski Agrotour Luxe",
  logo = "/images/logo.png",
  title = "Help Center",
  subtitle = "Frequently Asked Questions",
  description = "Find quick answers to common questions about farm registration, account setup, and booking tours. Our Help Center ensures you get the information you need without delay.",
  faq = [
    {
      q: "What is Ski Agrotour Luxe?",
      a: "Ski Agrotour Luxe is a digital platform that connects visitors with Algerian farms offering authentic agrotourism experiences, products, and services. You can explore different farms, learn about their specialties, and connect directly with them.",
    },
    {
      q: "How can I discover farms?",
      a: "Simply browse the 'Discover Farms' section on our homepage. You can view detailed profiles of each farm, including their products, services, and agrotourism activities.",
    },
    {
      q: "How do I contact a farm I’m interested in?",
      a: "When you find a farm that interests you, fill out the contact form with your name, address, phone number, and email. Our team will forward your request, and the farm will contact you shortly.",
    },
    {
      q: "Can I see what products or services a farm offers?",
      a: "Yes! Each farm has its own profile showcasing its available products, services, and activities — such as local food, handmade goods, farm visits, or nature experiences.",
    },
    {
      q: "Is registration required to explore farms?",
      a: "No, you can freely browse and discover farms without registering. Registration is only needed if you want to manage a farm profile or list your own farm on the platform.",
    },
    {
      q: "How can I list my own farm on Ski Agrotour Luxe?",
      a: "Click 'Join as a Farm' on the homepage and complete the registration form. Once submitted, our team will review your information and approve your listing within 48 hours.",
    },
  ],
}) {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6 py-16">
      {/* Header */}
      <div className="flex flex-col items-center space-y-4 mb-12">
        <div className="relative w-20 h-20">
          <Image
            src={logo}
            alt={`${companyName} Logo`}
            fill
            className="object-contain rounded-full border border-gray-300 shadow-sm"
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase">
          {companyName}
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-3xl w-full space-y-10 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
          <Separator className="bg-black w-16 mx-auto" />
          <p className="text-gray-600">{subtitle}</p>
        </div>

        <Card className="border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition">
          <CardContent className="p-8 space-y-6 text-left">
            <p className="text-gray-800">{description}</p>
            {faq.map((item, index) => (
              <div key={index}>
                <h4 className="font-semibold text-lg">{item.q}</h4>
                <p className="text-gray-700">{item.a}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-center mt-10">
          <Link href="/" passHref>
            <Button
              variant="outline"
              className="border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 px-6 py-2 rounded-full"
            >
              ← Back to Home
            </Button>
          </Link>
        </div>
      </div>

      <p className="mt-16 text-sm text-gray-500">
        © {new Date().getFullYear()} {companyName}. All rights reserved.
      </p>
    </div>
  );
}
