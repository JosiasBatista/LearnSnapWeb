import Image from 'next/image';

import SeparatorDot from "@/app/assets/SeparatorDot.svg";

export default function Creator({ author }: any) {
  return (
    <div className="flex flex-row gap-1 items-center">
      <strong className="font-[family-name:var(--font-cormorant)] text-base font-bold">
        {author.name}
      </strong>
      <Image src={SeparatorDot} alt="separator" />
      <span className="font-[family-name:var(--font-cormorant)] text-xs font-bold">Educator</span>
    </div>
  )
}