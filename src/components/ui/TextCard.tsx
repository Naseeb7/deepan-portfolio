import Image from "next/image";
import React from "react";

type TextCardProps = {
  title: string;
  subTitle?: string;
  description: string;
  icon?: string;
  textContainerStyle?: string;
};

const TextCard = ({
  title = "Title",
  subTitle = "",
  description = "Description",
  icon,
  textContainerStyle = "",
}: TextCardProps) => {
  return (
    <div className="flex p-4 bg-brand-700 rounded-[20px] items-start justify-between w-full">
      <div className={`flex flex-col gap-1 ${textContainerStyle}`}>
        <h3 className="text-xl font-bold">{title}</h3>
        {subTitle && <div className="text-xs text-light-300">{subTitle}</div>}
        <p className="text-sm">{description}</p>
      </div>
      {icon && <Image src={icon} alt={title} />}
    </div>
  );
};

export default TextCard;
