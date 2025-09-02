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
    <footer className="bg-black text-white max-w-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-8">
          {/* Social Media Section */}
          <div className="text-center md:text-center">
            <h2
              className="text-xl md:text-3xl font-bold mb-6 text-center md:text-center
                            bg-clip-text text-transparent
                            [background-image:linear-gradient(274deg,_#FFF_1.22%,_#C899FF_49.78%,_#FFF_98.35%)]"
            >
              Social Media
            </h2>
            <p className="text-gray-300 mb-6 font-medium text-xs md:text-sm">
              Follow us on social media to find out the
              <br />
              latest updates on our event!
            </p>

            <div className="flex align-middle justify-center text-white gap-8">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/ksepitb"
                target="_blank"
                className="w-12 h-12 rounded flex items-center justify-center transition-colors"
              >
                <FaLinkedin className="text-4xl md:text-5xl" />
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/infest.bdg/"
                target="_blank"
                className="w-12 h-12 rounded flex items-center justify-center transition-colors"
              >
                <FaInstagram className="text-4xl md:text-5xl" />
              </a>
              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@infest.bdg"
                target="_blank"
                className="w-12 h-12 rounded flex items-center justify-center transition-colors"
              >
                <FaTiktok className="text-4xl md:text-5xl" />
              </a>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="md:w-2/5">
            <h2
              className="text-xl md:text-3xl font-bold mb-6 text-center md:text-center
                            bg-clip-text text-transparent
                            [background-image:linear-gradient(274deg,_#FFF_1.22%,_#C899FF_49.78%,_#FFF_98.35%)]"
            >
              Contact Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center md:text-left font-medium">
              {/* Event Column */}
              <div>
                <h3 className="text-base md:text-xl font-semibold mb-2">
                  Event
                </h3>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm md:text-base font-bold">
                      Audie Quisha
                    </p>
                    <p className="text-xs md:text-sm text-gray-300 flex items-center justify-center md:justify-start gap-1">
                      <FaWhatsapp className="text-xs" /> 089536645252
                    </p>
                    <p className="text-xs md:text-sm text-gray-300 flex items-center justify-center md:justify-start gap-1">
                      <FaLine className="text-xs" /> audiejee
                    </p>
                  </div>

                  <div>
                    <p className="text-sm md:text-base font-bold ">
                      Daffa Andika
                    </p>
                    <p className="text-xs md:text-sm text-gray-300 flex items-center justify-center md:justify-start gap-1">
                      <FaWhatsapp className="text-xs" /> 089584631728
                    </p>
                    <p className="text-xs md:text-sm text-gray-300 flex items-center justify-center md:justify-start gap-1">
                      <FaLine className="text-xs" /> daffaandikaanya
                    </p>
                  </div>

                  <div>
                    <p className="text-sm md:text-base font-bold ">
                      Patricia Auriela
                    </p>
                    <p className="text-xs md:text-sm text-gray-300 flex items-center justify-center md:justify-start gap-1">
                      <FaWhatsapp className="text-xs" /> 089652246656
                    </p>
                    <p className="text-xs md:text-sm text-gray-300 flex items-center justify-center md:justify-start gap-1">
                      <FaLine className="text-xs" /> patriciaauriela
                    </p>
                  </div>
                </div>
              </div>

              {/* Competition Column */}
              <div className="text-center md:text-right">
                <h3 className="text-xl font-semibold mb-2">Competition</h3>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm md:text-base font-bold ">
                      Reivaldo Joan
                    </p>
                    <p className="text-xs md:text-sm text-gray-300 flex items-center justify-center md:justify-end gap-1">
                      089534801385 <FaWhatsapp />
                    </p>
                    <p className="text-xs md:text-sm text-gray-300 flex items-center justify-center md:justify-end gap-1">
                      vass270204 <FaLine />
                    </p>
                  </div>

                  <div>
                    <p className="text-sm md:text-base  font-bold ">
                      Vincent Andrew S.
                    </p>
                    <p className="text-xs md:text-sm text-gray-300 flex items-center justify-center md:justify-end gap-1">
                      089604076107 <FaWhatsapp />
                    </p>
                    <p className="text-xs md:text-sm text-gray-300 flex items-center justify-center md:justify-end gap-1">
                      reivaldojoan210 <FaLine />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center py-3">
          <Image src={Logo} alt="Logo" className="w-[30%] lg:w-[200px]" />
        </div>

        {/* Copyright */}
        <div className="pt-3">
          <p className="text-xs md:text-sm text-center text-white">
            © 2024 Kelompok Studi Ekonomi dan Pasar Modal ITB. All Rights
            Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
