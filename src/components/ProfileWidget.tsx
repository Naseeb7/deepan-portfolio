import { profileWidgetDetails } from "@/constants/defaultState";
import Image from "next/image";
import React from "react";

const ProfileWidget = () => {
  return (
    <section className="flex justify-center items-center flex-col px-6 py-10 bg-brand-200 w-full rounded-[20px] gap-6  border border-brand-500">
      <div className="bg-brand-400 rounded-2xl">
        <Image src={"/Profile.webp"} alt="Deepan" height={194} width={194} />
      </div>
      <div className="flex flex-col gap-3 items-center">
        <span className="text-[28px] font-extrabold">DEEPANRAJ MURALI</span>
        <span className="bg-brand-300 py-2 px-3 rounded-xl text-xl font-medium">
          UI/UX Designer
        </span>
      </div>
      <div className="border border-brand-500 w-full" />
      <div className="flex flex-col gap-8">
        {profileWidgetDetails.map((item) => {
          return (
            <div key={item.id} className="flex gap-2">
              <Image src={item.icon} alt="Email Logo" height={44} width={44} />
              <div className="flex flex-col gap-1">
                <span className="text-light-300 text-xs font-medium">
                  {item.label}
                </span>
                <span>{item.value}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProfileWidget;
