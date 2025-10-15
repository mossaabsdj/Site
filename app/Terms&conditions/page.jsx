"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function TermsConditions({
  companyName = "Ski Agrotour Luxe",
  logo = "/images/logo.png",
  title = "Terms & Conditions",
  subtitle = "Please Read Carefully",
  description = "By using the Ski Agrotour Luxe platform, you agree to comply with the following terms and conditions, which define the rights and responsibilities between you (the user) and Ski Agrotour Luxe.",

  sections = [
    {
      title: "1. Acceptance of Terms",
      text: "By accessing or using our platform, you fully accept these terms and conditions. If you disagree with any part of these terms, please do not use the website or its services.",
    },
    {
      title: "2. User Responsibilities",
      text: "Users agree to provide accurate and truthful information when filling out forms or contacting farms. Any misuse, spam, or false information may result in restricted access to the platform.",
    },

    {
      title: "3. Contact Forms",
      text: "When a user fills out the contact form to reach a farm, the provided information (name, email, phone, etc.) will be shared only with the selected farm for communication purposes.",
    },
    {
      title: "4. Intellectual Property",
      text: "All content, including text, logos, designs, and media, is the exclusive property of Ski Agrotour Luxe. Reproduction or redistribution of this material without authorization is strictly prohibited.",
    },
    {
      title: "5. Limitation of Liability",
      text: "We aim to provide a reliable and secure service but cannot be held responsible for temporary interruptions, technical issues, or actions taken by third-party farm owners.",
    },
    {
      title: "6. Updates to Terms",
      text: "Ski Agrotour Luxe reserves the right to update these terms at any time. Continued use of the platform after updates implies acceptance of the new terms and conditions.",
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

      {/* Main Content */}
      <div className="max-w-3xl w-full space-y-10 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
          <Separator className="bg-black w-16 mx-auto" />
          <p className="text-gray-600">{subtitle}</p>
        </div>

        <Card className="border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition">
          <CardContent className="p-8 space-y-6 text-left">
            <p className="text-gray-800 leading-relaxed">{description}</p>
            {sections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-lg mb-1">{section.title}</h4>
                <p className="text-gray-700">{section.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Back Button */}
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

      {/* Footer */}
      <p className="mt-16 text-sm text-gray-500">
        © {new Date().getFullYear()} {companyName}. All rights reserved.
      </p>
    </div>
  );
}
