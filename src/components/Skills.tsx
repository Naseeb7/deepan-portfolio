import React from "react";
import Header from "./ui/Header";
import UserCentricDesign from "@/assets/user-centric-design.webp";
import Location from "@/assets/location.webp";
import Ergonomics from "@/assets/Ergonomics.webp";
import Image from "next/image";

const Skills = () => {
  return (
    <div>
      <Header text="Skills" />
      <div className="flex gap-3">
        <div className="flex flex-col gap-6 items-center px-3 pt-4  bg-brand-800 rounded-2xl w-[28%]">
          <div className="flex flex-col items-center ">
            <span className="text-2xl font-bold">Advanced</span>
            <span className="text-xl font-semibold">User-Centric Design</span>
          </div>
          <Image
            src={UserCentricDesign}
            alt="User centric design"
            className="h-[325px] w-3/4"
          />
        </div>
        <div className="flex flex-col gap-3 w-[38%] items-center">
          <div className="flex bg-brand-800 rounded-2xl w-full p-4">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between w-full items-center">
                <span className="text-secondary-200">Attention to details</span>
                <span className="rounded-full w-[22px] h-[22px] bg-[#FC2624]" />
              </div>
              <div className="flex justify-between w-full items-center">
                <span className="text-xl font-bold">Colors</span>
                <span className="rounded-full w-[22px] h-[22px] bg-[#FF962D]" />
              </div>
              <div className="flex justify-between w-full items-center">
                <span className="text-xl font-bold">Typography</span>
                <span className="rounded-full w-[22px] h-[22px] bg-[#FACD2C]" />
              </div>
              <div className="flex justify-between w-full items-center">
                <span className="text-xl font-bold">Branding</span>
                <span className="rounded-full w-[22px] h-[22px] bg-[#8FD340]" />
              </div>
              <div className="flex justify-between w-full items-center">
                <span className="text-xl font-bold">Logo</span>
                <span className="rounded-full w-[22px] h-[22px] bg-[#2D8BD5]" />
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-brand-800 rounded-2xl pt-4 w-full relative h-[220px]">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">Location</span>
              <span className="text-xl font-semibold">
                Independent Professional
              </span>
            </div>
            <Image
              src={Location}
              alt="Location"
              className="w-full absolute bottom-0"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 w-1/3 items-center">
          <div className="flex flex-col gap-3 p-4 bg-brand-800 rounded-2xl">
            <span className="text-xl font-bold text-secondary-200">
              Specialized in interface design
            </span>
            <span className="text-sm">
              Interface, graphic charter, logo, brand image.
            </span>
          </div>
          <div className="flex flex-col justify-between p-4 bg-brand-800 rounded-2xl w-full h-full">
            <div className="flex flex-col gap-2">
              <span className="text-xl font-bold text-secondary-200">
                Ergonomics.
              </span>
              <p className="text-base">
                Improvement of the ergonomics and creation of a complete
                interface
              </p>
            </div>
            <Image src={Ergonomics} alt="Ergonomics" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
