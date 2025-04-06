import Image from "next/image";
import React from "react";
import StarFilled from "@/assets/StarFilled.svg";
import StarUnfilled from "@/assets/StarUnfilled.svg";

type RatingCardProps = {
  title: string;
  rating: number;
  description: string;
  icon?: string;
  textContainerStyle?: string;
};

const RatingCard = ({
  title = "Title",
  description = "Description",
  rating = 0,
  icon,
  textContainerStyle = "",
}: RatingCardProps) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <div className="flex p-4 bg-brand-700 rounded-[20px] gap-2 items-start w-full">
      {icon && <Image src={icon} alt={title} />}
      <div className={`flex flex-col gap-1 ${textContainerStyle}`}>
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="flex">
            {stars.map((star) =>
              star <= rating ? (
                <Image src={StarFilled} alt={"Filled Star"} key={star} />
              ) : (
                <Image src={StarUnfilled} alt={"Unfilled Star"} key={star} />
              )
            )}
          </div>
        </div>
        <p className="text-sm w-5/6">{description}</p>
      </div>
    </div>
  );
};

export default RatingCard;
