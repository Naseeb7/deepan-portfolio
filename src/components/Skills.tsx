import React from "react";
import Header from "./ui/Header";
import UserCentricDesign from "@/assets/user-centric-design.webp";
import Location from "@/assets/location.webp";
import Image from "next/image";

type Props = {};

const Skills = (props: Props) => {
  return (
    <div>
      <Header text="Skills" />
      <div className="flex gap-3">
        <div className="flex flex-col gap-6 items-center px-3 pt-4  bg-brand-800 rounded-2xl w-[30%]">
          <div className="flex flex-col items-center ">
            <span className="text-2xl font-bold">Advanced</span>
            <span className="text-xl font-semibold">User-Centric Design</span>
          </div>
          <Image
            src={UserCentricDesign}
            alt="User centric design"
            className="h-[300px]"
          />
        </div>
        <div className="flex flex-col gap-3 w-[35%] items-center">
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
        <div className="flex flex-col gap-3 w-[33%] items-center">
          <div className="flex flex-col gap-3 p-4 bg-brand-800 rounded-2xl">
            <span className="text-xl font-bold text-secondary-200">
              Specialized in interface design
            </span>
            <span>Interface, graphic charter, logo, brand image.</span>
          </div>
          <div>Ergonomics</div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
