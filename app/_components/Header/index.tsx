import Image from "next/image";

import LogoGreen from "@/app/assets/LogoGreen.svg";

export default function Header() {
  return (
    <div className="w-[768px] h-20 flex flex-row items-end justify-between
    border-b border-black">
      <Image src={LogoGreen} alt="Application Logo"/>

      <strong className="font-[family-name:var(--font-cormorant)] text-base font-bold">
        Josias Abraão
      </strong>
    </div>
  )
}