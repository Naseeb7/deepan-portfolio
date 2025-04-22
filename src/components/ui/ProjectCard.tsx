import { ProjectType } from "@/constants/enums";
import Image from "next/image";
import React from "react";
import DummyImage from "@/assets/dummyImage.png";
import { replaceAndCapitalize } from "@/utils/commonutil.ut";

const ProjectCard = ({ name, category }: ProjectType) => {
  return (
    <div className="flex flex-col gap-3 hover:cursor-pointer">
      <Image
        src={DummyImage}
        alt={name}
        className="w-full h-[192px]  object-cover rounded-2xl"
      />
      <div className="flex flex-col gap-1">
        <h4 className="text-xl font-bold">{name}</h4>
        <span className="text-light-300">{replaceAndCapitalize(category)}</span>
      </div>
    </div>
  );
};

export default ProjectCard;
