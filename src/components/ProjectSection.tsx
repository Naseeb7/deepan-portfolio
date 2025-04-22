import { ProjectType } from "@/constants/enums";
import React from "react";
import Header from "./ui/Header";
import Image from "next/image";
import DummyImage from "@/assets/dummyImage.png";
import ConnectArrow from "@/assets/ConnectArrow.svg";
import Link from "next/link";

const ProjectSection = ({
  name,
  //   heroImage,
  //   category,
  challenge,
  details,
  overview,
}: //   photos,
ProjectType) => {
  return (
    <div className="flex flex-col w-full gap-11 bg-brand-200 p-10 relative rounded-[20px] h-fit">
      <Header text={name} containerClassName="pb-0" />
      <Image
        src={DummyImage}
        alt={name}
        className="h-[440px] w-full object-cover rounded-4xl"
      />
      <div>
        <Header text="Overview" textClassName="text-2xl" />
        <p>{overview}</p>
      </div>
      <div>
        <Header text="Challenge" textClassName="text-2xl" />
        <p>{challenge}</p>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[440px]">
        <div className="row-span-2 h-full">
          <Image
            src={DummyImage}
            alt={`${name} photo 1`}
            className="h-full w-full object-cover rounded-4xl"
          />
        </div>
        <div className="h-full">
          <Image
            src={DummyImage}
            alt={`${name} photo 2`}
            className="h-full w-full object-cover rounded-4xl"
          />
        </div>
        <div className="h-full">
          <Image
            src={DummyImage}
            alt={`${name} photo 3`}
            className="h-full w-full object-cover rounded-4xl"
          />
        </div>
      </div>

      <div>
        <Header text="Project Details" textClassName="text-2xl" />
        <ul className="list-disc pl-5">
          {details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-10">
        <span className="flex justify-center w-full font-extrabold">
          Need to Know More about the Projects?
        </span>
        <div className="flex w-full items-center">
          <div className="h-[1px] bg-gradient-to-r from-brand-200 to-white/50 w-1/2" />
          <Link
            href={"/contact"}
            className="flex gap-1 py-3 justify-center w-1/5 bg-secondary-100 rounded-xl hover:cursor-pointer"
          >
            <span className="font-bold">Let&apos;s Connect</span>
            <Image src={ConnectArrow} alt="Arrow" />
          </Link>
          <div className="h-[1px] bg-gradient-to-l from-brand-200 to-white/50 w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
