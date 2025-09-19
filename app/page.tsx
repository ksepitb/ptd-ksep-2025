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
import VisiMisi from "@/public/visi-misi.svg";
import PTDTitle from "@/public/PTDTitle.svg"
import CoinBG from "@/public/coinbackground.svg"
import Clock from "@/public/clock.svg"
import Story from "@/public/story.svg"



const page = () => {
  return (
    <main>
      <div className="overflow-hidden bg-gradient-to-b from-black via-[#44340C] to-[#271E08] w-full min-h-screen flex flex-col relative items-center justify-center">
        <Image src={Star} alt="Bg" className="absolute w-full opacity-40" />
        <Image
          src={Light}
          alt="Logo"
          className="absolute w-[500px] -top-[3%] -left-[7%]"
        />
        <Image
          src={Light}
          alt="Logo"
          className="absolute w-[500px] -top-[3%] -right-[7%] -scale-x-100"
        />
        <Image
          src={Sun}
          alt="Logo"
          className="absolute top-0 left-[44%] w-[200px] mx-auto mt-10 opacity-90"
        />
        <Image
          src={Landscape}
          alt="Logo"
          className="absolute bottom-0 w-full"
        />
        <Image
          src={Building}
          alt="Logo"
          className="absolute bottom-10 left-20 w-[500px]"
        />
        <Image
          src={Tree}
          alt="Logo"
          className="absolute bottom-52 right-10 w-[300px]"
        />
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute -left-40 w-[350px]" // container gets positioning
        >
          <Image
            src={LeftPillar}
            alt="Left Pillar"
            className="w-full h-auto"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute -right-40 w-[350px]"
        >
          <Image
            src={RightPillar}
            alt="Right Pillar"
            className="w-full h-auto"
          />
        </motion.div>
        <div className="text-white">
          <motion.div
            className="font-light text-xs md:text-sm text-center"
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
          >
            <Image src={Title} alt="Title" className="w-[700px] mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Image src={Board} alt="Board" className="w-[400px] z-1 mx-auto" />
          </motion.div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-black to-[#36290A] flex flex-col items-center justify-center">
        {" "}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="w-full flex justify-center mt-20"
        >
          <Image src={WhatIs} alt="Logo" className="w-[50%] max-w-lg" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
          className="w-full flex justify-center"
        >
          <Image src={PTDTitle} alt="Logo" className="w-[90%] max-w-6xl mt-6" />
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
            className="inset-0 w-full object-contain z-10"
          />
        </motion.div>
        <Image src={VisiMisi} alt="Logo" className="w-[50%] mt-48" />
      </div>
      <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#36290A] to-black flex flex-col items-center justify-center">
        <Image
          src={CoinBG}
          alt="Coin Background"
          fill
          className="w-full z-0"
          priority
        />
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
              className="w-[50%" 
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default page;
