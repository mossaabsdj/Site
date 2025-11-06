"use client";
import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { countries } from "@/data/countries";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import Progression from "@/app/component/Proogression/page";
const COLORS = {
  formBorder: "border-green-500",
  formFocus: "focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500",
  buttonBg: "bg-emerald-500",
  buttonHover: "hover:bg-emerald-600",
  socialBg: "bg-green-100",
  rightPaneBg: "bg-emerald-500",
};

const SOCIAL_ICONS = [
  { Icon: FaFacebookF, label: "Facebook" },
  { Icon: FaTwitter, label: "Twitter" },
  { Icon: FaInstagram, label: "Instagram" },
];

const FormInput = ({ type, placeholder, value, onChange, className = "" }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`h-14 px-4 rounded-lg border-2 ${COLORS.formBorder} ${COLORS.formFocus} text-gray-800 outline-none transition ${className}`}
    required
  />
);

const SocialButtons = () => (
  <div className="flex gap-4 mt-4">
    {SOCIAL_ICONS.map(({ Icon, label }, idx) => (
      <button
        key={idx}
        type="button"
        className={`${COLORS.socialBg} p-3 rounded-full shadow-md hover:scale-110 cursor-pointer transition ${COLORS.formFocus}`}
        aria-label={label}
      >
        <Icon className="text-emerald-600" />
      </button>
    ))}
  </div>
);

const WelcomeSection = ({ title, description, isRight }) => (
  <div
    className={`w-full md:w-1/2 ${
      COLORS.rightPaneBg
    } text-white flex flex-col justify-center items-center text-center p-10 ${
      isRight ? "order-2" : "order-1"
    }`}
    style={{ minHeight: "600px" }}
  >
    <img
      src="/images/logo.png"
      alt="Logo"
      className="w-32 h-32 rounded-full mb-6 shadow-2xl object-cover bg-white"
    />
    <h2 className="text-3xl font-bold mb-4">{title}</h2>
    <p className="text-lg opacity-90 max-w-sm">{description}</p>
  </div>
);

export default function FlipAuthPages() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginChange = (field) => (e) => {
    setLoginData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleRegisterChange = (field) => (e) => {
    const value = e.target.value;
    setRegisterData((prev) => {
      const updated = { ...prev, [field]: value };

      // Update phone number prefix when country changes
      if (field === "country") {
        const selectedCountry = countries.find((c) => c.name === value);
        if (selectedCountry) {
          updated.phone = selectedCountry.code + " ";
        }
      }

      return updated;
    });
  };
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
      callbackUrl: "/DashBoard",
    });
    setIsLoading(false);

    if (res?.ok) {
      // ✅ Success - redirect manually
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        customClass: {
          popup: "shadow-lg rounded-lg", // optional for soft edges and shadow
        },
        timer: 1500,
      }).then(() => {
        setIsLoading(true);
        window.location.href = res.url;
      });
    } else {
      // ❌ Error - show alert
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid username or password.",
        confirmButtonColor: "#d32f2f", // red confirm button
        customClass: {
          popup: "shadow-lg rounded-lg", // optional for soft edges and shadow
        },
      });
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", loginData);
    alert("Login submitted! Check console for data.");
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("Register:", registerData);
    alert("Registration submitted! Check console for data.");
  };

  return (
    <>
      {" "}
      {isLoading && <Progression isVisible={true} />}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-6xl" style={{ perspective: "2000px" }}>
          <div
            className="relative w-full transition-transform duration-700"
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              minHeight: "600px",
            }}
          >
            {/* LOGIN PAGE (Front) */}
            <div
              className="absolute w-full"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(0deg)",
              }}
            >
              <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Login Form */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center order-1">
                  <div className="w-full max-w-sm">
                    <h2 className="text-5xl font-extrabold text-gray-800 mb-2 text-center">
                      Log In
                    </h2>
                    <p className="text-gray-500 mb-6 text-center">
                      Welcome back! Please login to your account.
                    </p>

                    <div className="w-full flex flex-col space-y-4">
                      <FormInput
                        type="text"
                        placeholder="Username"
                        value={loginData.username}
                        onChange={handleLoginChange("username")}
                        className="w-full"
                      />

                      <FormInput
                        type="password"
                        placeholder="Password"
                        value={loginData.password}
                        onChange={handleLoginChange("password")}
                        className="w-full"
                      />

                      <button
                        onClick={handleLoginSubmit}
                        className={`w-full h-14 text-xl ${COLORS.buttonBg} text-white font-bold rounded-full shadow-md ${COLORS.buttonHover} hover:scale-105 transition-all duration-200 mt-2`}
                      >
                        Log In
                      </button>

                      <p className="text-gray-700 text-sm text-center pt-2">
                        Don't have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setIsFlipped(true)}
                          className="text-emerald-600 font-semibold hover:underline"
                        >
                          Create Account
                        </button>
                      </p>

                      <div className="flex justify-center">
                        <SocialButtons />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Welcome Section - Right */}
                <WelcomeSection
                  title="Welcome Back!"
                  description="Manage your orders, explore new products, and connect with your favorite farms — all from one place."
                  isRight={true}
                />
              </div>
            </div>

            {/* REGISTER PAGE (Back) */}
            <div
              className="absolute w-full"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Welcome Section - Left */}
                <WelcomeSection
                  title="Join Our Community!"
                  description="Create an account to access exclusive features, track your orders, and connect with local farms."
                  isRight={false}
                />

                {/* Register Form */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center order-2">
                  <div className="w-full max-w-2xl">
                    <h2 className="text-5xl font-extrabold text-gray-800 mb-2 text-center">
                      Sign Up
                    </h2>
                    <p className="text-gray-500 mb-6 text-center">
                      Create your account to get started.
                    </p>

                    <div className="w-full">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                          type="text"
                          placeholder="Full Name"
                          value={registerData.fullName}
                          onChange={handleRegisterChange("fullName")}
                          className="w-full"
                        />

                        <FormInput
                          type="email"
                          placeholder="Email"
                          value={registerData.email}
                          onChange={handleRegisterChange("email")}
                          className="w-full"
                        />

                        <select
                          value={registerData.country}
                          onChange={handleRegisterChange("country")}
                          className={`h-14 px-4 rounded-lg border-2 ${COLORS.formBorder} ${COLORS.formFocus} text-gray-800 outline-none transition w-full`}
                          required
                        >
                          <option value="">Select Country</option>
                          {countries.map((country, idx) => (
                            <option key={idx} value={country.name}>
                              {country.name} ({country.code})
                            </option>
                          ))}
                        </select>

                        <FormInput
                          type="tel"
                          placeholder="Phone Number"
                          value={registerData.phone}
                          onChange={handleRegisterChange("phone")}
                          className="w-full"
                        />

                        <FormInput
                          type="password"
                          placeholder="Password"
                          value={registerData.password}
                          onChange={handleRegisterChange("password")}
                          className="w-full"
                        />

                        <FormInput
                          type="password"
                          placeholder="Confirm Password"
                          value={registerData.confirmPassword}
                          onChange={handleRegisterChange("confirmPassword")}
                          className="w-full"
                        />
                      </div>

                      <button
                        onClick={handleRegisterSubmit}
                        className={`w-full h-14 text-xl ${COLORS.buttonBg} text-white font-bold rounded-full shadow-md ${COLORS.buttonHover} hover:scale-105 transition-all duration-200 mt-6`}
                      >
                        Create Account
                      </button>

                      <p className="text-gray-700 text-sm text-center pt-4">
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setIsFlipped(false)}
                          className="text-emerald-600 font-semibold hover:underline"
                        >
                          Log In
                        </button>
                      </p>

                      <div className="flex justify-center">
                        <SocialButtons />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
