import Image from "next/image";
import Logo from "@/public/next.svg";

import {
  FaLinkedin,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaComment,
  FaLine,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Social Media Section */}
        <h2
          className="text-xl md:text-5xl font-bold mb-6
                      bg-clip-text text-transparent
                      [background-image:linear-gradient(274deg,_#FFFFFF_20.22%,_#EBD7A4_49.78%,_#FFF_98.35%)] "
        >
          Social Media
        </h2>

        <p className="text-gray-300 mb-6 font-medium text-xs md:text-sm">
          Follow us on social media to find out the
          <br />
          latest updates on our event!
        </p>

        <div className="flex justify-center gap-8">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/ksepitb"
            target="_blank"
            className="transition-transform hover:scale-110"
          >
            <FaLinkedin className="text-4xl md:text-5xl" />
          </a>
          {/* Instagram */}
          <a
            href="https://www.instagram.com/infest.bdg/"
            target="_blank"
            className="transition-transform hover:scale-110"
          >
            <FaInstagram className="text-4xl md:text-5xl" />
          </a>
          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@infest.bdg"
            target="_blank"
            className="transition-transform hover:scale-110"
          >
            <FaTiktok className="text-4xl md:text-5xl" />
          </a>
        </div>
      </div>
      <div className="pt-3 mt-5">
        <p className="text-xs md:text-sm text-center text-white"> © 2024 Kelompok Studi Ekonomi dan Pasar Modal ITB. All Rights Reserved </p>
      </div>
    </footer>
  );
};

export default Footer;
