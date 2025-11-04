"use client";

import Image from "next/image";
import { motion } from "motion/react"
import Sun from "@/public/sun.svg";
import Title from "@/public/titlep.webp";
import Board from "@/public/board.webp";
import Star from "@/public/starss.webp";
import WhatIs from "@/public/what-is.svg";
import VisiMisi from "@/public/visi-misi.webp";
import PTDTitle from "@/public/PTDTitle.svg"
import Clock from "@/public/clock.svg"
import Story from "@/public/story.svg"
import HeroBG from "@/public/herobg.svg"
import DescBG from "@/public/DescBG.svg"

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
        <div className="w-full flex justify-center">
          <div className="w-[90%] grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">

            {/* Top: PTD description (spans both columns) */}
            <motion.div 
              className="relative lg:col-span-2 text-lg md:text-xl lg:text-2xl flex items-center justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="bg-[#4C2222] p-[8px] rounded-2xl w-full">
                <div className="bg-[#D6B3A2] rounded-2xl py-8 px-10 flex items-center justify-center">
                  <p className="text-center text-[#392E28] font-bold leading-relaxed w-[90%] mx-auto">
                    PTD KSEP merupakan tempat pesertanya untuk 
                    mengeksplorasi perekonomian dan pasar modal, 
                    sekaligus tempat pesertanya untuk berkembang menjadi
                    individu yang memegang teguh nilai-nilai KSEP ITB.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Left: VISI */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="bg-[#4C2222] p-[8px] rounded-2xl h-full">
                <div className="bg-[#D6B3A2] rounded-2xl h-full p-8 flex flex-col items-center justify-start text-center">
                  <h2 className="text-[#4C2222] font-extrabold text-2xl md:text-3xl mb-4">
                    VISI
                  </h2>
                  <p className="text-[#392E28] font-semibold text-base md:text-2xl leading-relaxed">
                    PTD sebagai tempat inklusif untuk mengeksplorasi dunia pasar modal
                    dengan mengedepankan nilai profesionalitas dan kekeluargaan.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right: MISI */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="bg-[#4C2222] p-[8px] rounded-2xl h-full">
                <div className="bg-[#D6B3A2] rounded-2xl h-full p-8 text-[#392E28] font-semibold text-base md:text-lg leading-relaxed flex flex-col justify-start">
                  <h2 className="text-[#4C2222] font-extrabold text-2xl md:text-3xl mb-4 text-center">
                    MISI
                  </h2>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>
                      Mengembangkan pengetahuan teoritis dan praktis tentang pasar modal
                      pada masa Ca-KSEP untuk mencapai potensi terbaiknya.
                    </li>
                    <li>
                      Mengembangkan dan mengevaluasi kemampuan profesionalitas dalam
                      segala aktivitas yang dilakukan oleh Ca-KSEP.
                    </li>
                    <li>
                      Menghasilkan penerus KSEP yang menjunjung tinggi kekeluargaan dengan
                      angkatannya dan memiliki kedekatan dengan angkatan pendahulunya.
                    </li>
                    <li>
                      Mengenalkan kepada peserta PTD nilai-nilai yang dipegang oleh KSEP ITB
                      dan bagaimana penanaman nilai itu dilakukan.
                    </li>
                  </ol>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
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
