import Image from "next/image";
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
        <Image
          src={LeftPillar}
          alt="Logo"
          className="absolute -left-40 w-[350px]"
        />
        <Image
          src={RightPillar}
          alt="Logo"
          className="absolute -right-40 w-[350px]"
        />
        <div className="text-white">
          <p className="font-light text-xs md:text-sm text-center">
            Kelompok Studi Ekonomi dan Pasar Modal ITB Presents
          </p>
          <Image src={Title} alt="Title" className="w-[700px] mx-auto" />
          <Image src={Board} alt="Title" className="w-[400px] mx-auto" />
        </div>
      </div>
      <div className="bg-gradient-to-b from-black to-[#36290A] flex flex-col items-center justify-center">
        {" "}
        <Image src={WhatIs} alt="Logo" className="w-[200px]" />
        <div className="relative w-full mt-20 flex items-center justify-center">
          <Image
            src={WhatIsBox}
            alt="Logo"
            className="absolute inset-0 w-full object-contain z-10"
          />
          <p className="relative text-center w-[60%] mx-auto z-20 text-white text-lg md:text-xl p-4">
            PTD KSEP merupakan tempat pesertanya untuk mengeksplorasi
            perekonomian dan pasar modal, sekaligus tempat pesertanya untuk
            berkembang menjadi individu yang memegang teguh nilai-nilai KSEP
            ITB.
          </p>
        </div>
        <Image src={VisiMisi} alt="Logo" className="mt-40" />
      </div>
    </main>
  );
};

export default page;
