"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/public/ptdlogosvg.svg";
import Aos from "aos";
import "aos/dist/aos.css";
import { signOut } from "@/lib/auth-client";

interface UserData {
  isLoggedIn: boolean;
  isKajasep: boolean;
  isDejasep: boolean;
  userName: string;
}

const MenuIcon = ({ className = "" }) => (
  <svg
    className={`w-7 h-7 text-white ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
);

const CloseIcon = ({ className = "" }) => (
  <svg
    className={`w-8 h-8 text-white ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default function NavbarClient({ user }: { user: UserData }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  // Get the dynamic middle link based on user type
  // ??? = not logged in → links to sign-in
  // Kajasep = for Dejasep users → links to /kajasep
  // Dejasep = for Kajasep users → links to /dejasep
  const getDynamicLink = () => {
    if (!user.isLoggedIn) {
      return { name: "???", href: "/sign-in" };
    }
    if (user.isKajasep) {
      return { name: "Dejasep", href: "/dejasep" };
    }
    if (user.isDejasep) {
      return { name: "Kajasep", href: "/kajasep" };
    }
    return { name: "???", href: "/sign-in" };
  };

  const dynamicLink = getDynamicLink();

  // Static nav links + dynamic link (only dynamic link, not static Kajasep)
  const navLinks = [
    { name: "Home", href: "/" },
    dynamicLink,
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsVisible(true);
        return;
      }
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < 10);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[700px] z-50 transition-transform duration-500 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-24"}`}
      >
        <div
          className="relative w-full h-16 bg-gradient-to-br from-white/30 to-white/0 rounded-full shadow-lg backdrop-blur-xl border border-white/20 flex justify-between items-center px-4"
          data-aos="fade-down"
        >
          <Link href="/">
            <Image src={Logo} alt="Logo" className="w-[70px] ml-3" />
          </Link>

          {/* Nav Links in the middle */}
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="hidden md:flex text-base relative font-bold transition-colors duration-300 px-2 py-1 h-full items-center"
              >
                <span
                  className={
                    isActive
                      ? "bg-gradient-to-b from-[#FFEED2] to-[#A3863D] text-transparent bg-clip-text"
                      : "text-white hover:text-[#FFEED2]"
                  }
                >
                  {link.name}
                </span>
                {isActive && (
                  <span className="absolute bottom-[18px] left-1/2 -translate-x-1/2 h-[1px] w-[80%] bg-gradient-to-r from-[#FFEED2] to-[#A3863D] rounded-full" />
                )}
              </Link>
            );
          })}

          {/* Right side button */}
          {user.isLoggedIn ? (
            <Link
              href="/dashboard"
              className="inset-shadow-sm inset-shadow-black hidden md:flex items-center bg-gradient-to-r from-[#FFEED2] to-[#A3863D] text-[#36290A] font-bold rounded-full transition-transform duration-300 hover:scale-105 py-2 px-6"
            >
              {user.userName}
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="inset-shadow-sm inset-shadow-black hidden md:flex items-center bg-gradient-to-r from-[#FFEED2] to-[#A3863D] text-[#36290A] font-bold rounded-full transition-transform duration-300 hover:scale-105 py-2 px-8"
            >
              Sign In
            </Link>
          )}

          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(true)} className="p-2">
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* --- Mobile Menu --- */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-lg"></div>

        <div
          className={`absolute top-4 right-4 z-10 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
        >
          <button onClick={() => setMobileMenuOpen(false)} className="p-2">
            <CloseIcon />
          </button>
        </div>

        <nav
          className={`flex flex-col items-center justify-center h-full gap-8 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-bold"
              >
                <span
                  className={
                    isActive
                      ? "bg-gradient-to-b from-[#FFEED2] to-[#A3863D] text-transparent bg-clip-text"
                      : "text-white hover:text-[#FFEED2]"
                  }
                >
                  {link.name}
                </span>
              </Link>
            );
          })}

          {user.isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="inset-shadow-sm inset-shadow-black mt-4 text-xl font-bold bg-gradient-to-r from-[#FFEED2] to-[#A3863D] text-[#36290A] rounded-full py-3 px-12"
              >
                {user.userName}
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignOut();
                }}
                className="text-white/70 hover:text-white font-medium text-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/sign-in"
              onClick={() => setMobileMenuOpen(false)}
              className="inset-shadow-sm inset-shadow-black mt-8 text-xl font-bold bg-gradient-to-r from-[#FFEED2] to-[#A3863D] text-[#36290A] rounded-full py-3 px-12"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </>
  );
}
