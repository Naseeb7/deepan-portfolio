import Image from "next/image";
import React from "react";

type TextCardProps = {
  title: string;
  subTitle?: string;
  description: string;
  icon?: string;
};

const TextCard = ({
  title = "Title",
  subTitle = "",
  description = "Description",
  icon,
}: TextCardProps) => {
  return (
    <div>
      <div>
        <h3>{title}</h3>
        {subTitle && <div>{subTitle}</div>}
        <p>{description}</p>
      </div>
      {icon && <Image src={icon} alt={title} />}
    </div>
  );
};

export default TextCard;
