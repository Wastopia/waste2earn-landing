import { FC, ReactElement } from "react";
import Image from "next/image";

const Button : FC<{
  target?: string,
  rel?: string,
  href?: string,
  primary?: boolean,
  secondary?: boolean,
  tertiary?: boolean,
  icon?: string | ReactElement,
  desc?: string | ReactElement,
  iconStyle?: any,
  className?: string,
}> = ({
  children,
  primary = false,
  secondary = false,
  tertiary = false,
  icon = undefined,
  desc = undefined,
  ...props
}: {
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  icon?: string | ReactElement;
  desc?: string | ReactElement;
  [key: string]: any;
}) => (
  <a {...props}
  className={
    `${props.className}
    w-full sm:px-6 px-4 py-4 rounded-[10px]
    hover:scale-[1.01] transition-all cursor-pointer
    text-xl
    ${icon
      ? 'flex flex-row flex-nowrap items-center text-left sm:space-x-4 block'
      : 'block text-center'}
      ${primary 
        ? 'bg-[#3EB94E] text-white'
        : secondary
          ? 'bg-[#f76805] text-white'
          :tertiary
            ? 'bg-[#03548a] text-white'
            : 'bg-white hover:border-[#C1DEF2] border border-[#C1DEF2]'
      }
  `}>
    {typeof icon === 'string' && <Image src={icon} alt={`${children} icon`} width={40} height={40} className="sm:h-10 sm:w-10 w-8 h-8 p-1" style={props.iconStyle} />}
    <span className="">{children}</span>
    {desc && <div className="flex-1 sm:text-right sm:flex sm:block hidden text-[17px] text-gray-600">{desc}</div>}
  </a>
);

export default Button;