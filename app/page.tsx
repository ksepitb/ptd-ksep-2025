"use client";

import Image from "next/image";
import { motion } from "motion/react"
import Sun from "@/public/sun.svg";
import Title from "@/public/titlep.webp";
import Building from "@/public/colloseum.svg";
import Landscape from "@/public/landscapee.svg";
import Tree from "@/public/treee.svg";
import Board from "@/public/board.webp";
import Light from "@/public/light.png";
import LeftPillar from "@/public/left-pillar.webp";
import RightPillar from "@/public/right-pillar.webp";
import Star from "@/public/starss.webp";
import WhatIs from "@/public/what-is.svg";
import WhatIsBox from "@/public/what-is-box.svg";
import VisiMisi from "@/public/visi-misi.webp";
import PTDTitle from "@/public/PTDTitle.svg"
import Clock from "@/public/clock.svg"
import Story from "@/public/story.svg"
import HeroBG from "@/public/herobg.svg"
import LeftPattern from "@/public/leftpattern.svg"
import RightPattern from "@/public/rightpattern.svg"

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
      <div className="overflow-hidden bg-gradient-to-b from-black to-[#36290A] flex flex-col items-center justify-center">
        {" "}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="w-full flex justify-center mt-20"
        >
          <Image src={WhatIs} alt="Logo" className="w-[50%] max-w-md" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
          className="w-full flex justify-center"
        >
          <Image src={PTDTitle} alt="Logo" className="w-[90%] max-w-6xl mt-6 md:mt-12" />
        </motion.div>
        <motion.div 
        className="relative w-full mt-16 flex items-center justify-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
        >
          <Image
            src={WhatIsBox}
            alt="Logo"
            className="inset-0 w-[60%] object-contain z-10"
          />
        </motion.div>

        <motion.div 
          className="w-full flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          >
            <Image src={VisiMisi} alt="Logo" className="w-[75%] mt-16 lg:mt-32" />
          </motion.div>
      </div>
      <div className="overflow-hidden relative w-full bg-gradient-to-b from-[#36290A] to-black flex flex-col items-center justify-center py-20 md:py-32">
        <div className="relative z-10 flex flex-col items-center w-full justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
            className="w-full flex justify-center"
          >
            <Image src={Clock} alt="Clock" className="w-[30%] max-w-lg" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image 
              src={Story} 
              alt="Let The Grand Story Unfold" 
              className="w-[80%] mx-auto mt-6" 
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default page;
