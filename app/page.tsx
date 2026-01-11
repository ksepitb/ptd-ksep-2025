"use client";

import Image from "next/image";
import { motion } from "motion/react"
import Sun from "@/public/sun.svg";
import Title from "@/public/titlep.webp";
import Board from "@/public/board.webp";
import Star from "@/public/starss.webp";
import HeroBG from "@/public/herobg.svg"

const page = () => { 
  return (
    <main>
      <div className="overflow-hidden bg-gradient-to-b from-black via-[#44340C] to-[#271E08] w-full min-h-screen flex flex-col relative items-center justify-center">
        <Image src={Star} alt="Bg" className="absolute w-full opacity-40" />
        <motion.div
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="absolute top-0 left-[44%] w-[200px] mx-auto mt-10 opacity-90"
        >
        <Image
          src={Sun}
          alt="Logo"
        />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="absolute bottom-0 w-full "
        >
          <Image src={HeroBG} alt="Landscape" className="w-full" />
        </motion.div>


        <div className="text-white">
          <motion.div
            className="font-light text-xs md:text-lg text-center z-2 relative"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          > 
            Kelompok Studi Ekonomi dan Pasar Modal ITB Presents
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative z-30"
          >
            <Image src={Title} alt="Title" className="w-[70%] max-w-[1200px] mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Image src={Board} alt="Board" className="w-[50%] max-w-[400px] z-20 mx-auto relative" />
          </motion.div>
        </div>
      </div>

   </main>
  );
};

export default page;
