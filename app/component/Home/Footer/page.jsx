import {
  Facebook,
  Twitter,
  Instagram,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Image from "next/image";

// === Text Variables ===
const companyName = "Ski agrotour luxe";
const companyDescription = "Business Agro touristique.";
const address = "Skikda/Algerie";
const phoneNumber = "+213 559528292";
const email = "Skiagrotourdeluxe10@gmail.com";

const companyLinks = [{ name: "About Us", href: "aboutus" }];

const supportLinks = [
  { name: "Help Center", href: "HelpCenter" },
  { name: "Privacy Policy", href: "Privacy&Policy" },
  { name: "Terms & Conditions", href: "Terms&conditions" },
];

const footerNote = `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`;

// === Color Variables (Tailwind utility class names) ===
const bgColor = "bg-black";
const textColor = "text-white";
const secondaryTextColor = "text-gray-400";
const sectionTitleColor = "text-white";
const borderColor = "border-gray-800";
const underlineBorderColor = "border-gray-700";
const linkHoverColor = "hover:text-white";
const iconColor = "text-gray-400";
const iconHoverColor = "hover:text-white";

export default function Footer() {
  return (
    <footer
      className={`${bgColor} ${textColor} px-6 py-12 border-t ${borderColor}`}
    >
      <div className="max-w-7xl mx-auto overflow-x-hidden grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        {/* Company Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{companyName}</h2>
          <p className={`${secondaryTextColor}`}>{companyDescription}</p>
          <div className={`space-y-2 ${secondaryTextColor}`}>
            <div className="flex items-center">
              <MapPin className={`w-4 h-4 mr-2 ${textColor}`} />
              {address}
            </div>
            <div className="flex items-center">
              <Phone className={`w-4 h-4 mr-2 ${textColor}`} />
              {phoneNumber}
            </div>
            <div className="flex items-center">
              <Mail className={`w-4 h-4 mr-2 ${textColor}`} />
              {email}
            </div>
          </div>
        </div>

        {/* Company Links */}
        <div className="space-y-3">
          <h3
            className={`text-lg font-medium ${sectionTitleColor} border-b ${underlineBorderColor} pb-1`}
          >
            Company
          </h3>
          <ul className={`space-y-2 ${secondaryTextColor}`}>
            {companyLinks.map((link) => (
              <li key={link.name}>
                <a href={"/aboutus"} className={`${linkHoverColor} transition`}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Links */}
        <div className="space-y-3">
          <h3
            className={`text-lg font-medium ${sectionTitleColor} border-b ${underlineBorderColor} pb-1`}
          >
            Support
          </h3>
          <ul className={`space-y-2 ${secondaryTextColor}`}>
            {supportLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className={`${linkHoverColor} transition`}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div className="space-y-4 text-center md:text-left">
          <h3
            className={`text-lg font-medium ${sectionTitleColor} border-b ${underlineBorderColor} pb-1`}
          >
            Follow Us
          </h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="https://www.facebook.com/share/1DhZw9n36S/"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className={`w-5 h-5 ${iconColor} ${iconHoverColor}`} />
            </a>
            <a
              href="https://www.instagram.com/ski_agrotour_luxe?igsh=MTJtNjdmbDViZDBobA=="
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className={`w-5 h-5 ${iconColor} ${iconHoverColor}`} />
            </a>
            <a
              href="https://wa.me/qr/OBSZF5M4XZ3PB1"
              aria-label="WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={"/images/whatsapp.png"}
                alt="WhatsApp"
                width={24}
                height={24}
                className={`w-6 h-6 ${iconColor} ${iconHoverColor}`}
              />{" "}
              {/* Use Phone as fallback */}
            </a>
            <a
              href="https://t.me/your_telegram_username"
              aria-label="Telegram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={"/images/telegramme.png"}
                alt="Telegram"
                width={24}
                height={24}
                className={`w-6 h-6 text-white ${iconColor} ${iconHoverColor}`}
              />{" "}
              {/* Use Mail as fallback */}
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div
        className={`mt-10 border-t ${borderColor} pt-6 text-center text-xs text-gray-500`}
      >
        {footerNote}
      </div>
    </footer>
  );
}
