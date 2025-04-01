import { FC } from "react";
import Image from "next/image";

const ContributorButton : FC<{
  href: string,
  avatar: string,
  name: string,
}> = ({
  children,
  avatar = "/assets/icon/default-avatar.png",
  name = undefined,
  ...props
}) => (
  <a {...props}
  target="_blank"
  rel="noreferrer"
  className={
    `w-full sm:px-6 px-4 py-4 rounded-[10px]
    hover:border-[#C1DEF2] border border-[#C1DEF2]
    hover:scale-[1.01] transition-all cursor-pointer
    sm:space-y-1
    bg-white
  `}>
    <div className="sm:flex sm:flex-row block items-center sm:space-x-3 sm:space-y-0 space-y-2">
      <Image 
        src={avatar} 
        alt={`${name || 'Contributor'} avatar`}
        width={24}
        height={24}
        className="rounded-full" 
      />
      <div className="text-xl">{children}</div>
    </div>
    <div className="font-light text-gray-600 text-[17px]">
      {name}
    </div>
  </a>
);

export default ContributorButton;