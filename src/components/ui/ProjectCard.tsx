import { ProjectType } from "@/constants/enums";
import Image from "next/image";
import React from "react";
import DummyImage from "@/assets/dummyImage.png";

const ProjectCard = ({ name, category }: ProjectType) => {
  return (
    <div className="flex flex-col gap-3">
      <Image src={DummyImage} alt={name} height={192} className="w-full" />
      <div>
        <h4>{name}</h4>
        <span>{category}</span>
      </div>
    </div>
  );
};

export default ProjectCard;
