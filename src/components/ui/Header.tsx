import React from "react";

type HeaderProps = {
  text: string;
};

const Header = ({ text }: HeaderProps) => {
  return (
    <div className="flex flex-col gap-2 pb-4">
      <h2 className="font-bold text-[32px]">{text}</h2>
      <div className="border-2 w-[77px] rounded-[10px] border-secondary-100" />
    </div>
  );
};

export default Header;
