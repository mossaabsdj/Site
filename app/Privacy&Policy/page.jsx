"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy({
  companyName = "Ski Agrotour Luxe",
  logo = "/images/logo.png",
  title = "Privacy Policy",
  subtitle = "Your Data, Our Responsibility",
  description = "We value your privacy. This policy explains how we collect, use, and protect your information when using our platform.",
  sections = [
    {
      title: "Data Collection",
      text: "We collect personal information such as name, email, and farm details to provide better services.",
    },
    {
      title: "Use of Information",
      text: "Your data is used solely for improving your experience and connecting you with relevant agritourism opportunities.",
    },
    {
      title: "Security",
      text: "We implement strict data protection measures and never share your personal data with unauthorized parties.",
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
            {sections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-lg">{section.title}</h4>
                <p className="text-gray-700">{section.text}</p>
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
