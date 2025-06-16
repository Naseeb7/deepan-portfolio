import { ProjectFieldTypes } from "@/constants/enums";
import Image from "next/image";
import React from "react";
import DummyImage from "@/assets/dummyImage.png";
import { replaceAndCapitalize } from "@/utils/commonutil.ut";

const ProjectCard = ({ name, category, heroImage }: ProjectFieldTypes) => {
  return (
    <div className="flex flex-col gap-3 hover:cursor-pointer">
      <Image
        src={heroImage || DummyImage}
        alt={name}
        width={400}
        height={192}
        sizes="(max-width: 768px) 100vw, 33vw"
        className="rounded-2xl h-[192px] object-cover"
        loading="eager"
      />

      <div className="flex flex-col gap-1">
        <h4 className="text-xl font-bold">{name}</h4>
        <span className="text-light-300">{replaceAndCapitalize(category)}</span>
      </div>
    </div>
  );
};

export default ProjectCard;
