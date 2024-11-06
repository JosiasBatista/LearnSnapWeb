"use client"

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { FiLogOut, FiSettings } from "react-icons/fi";
import Image from "next/image";

import LogoGreen from "@/app/assets/LogoGreen.svg";
import { useUser } from "@/app/_context/userContext";
import { logout } from "@/services/authService";

export default function Header() {
  const router = useRouter();
  const userId = useRef<string>();
  const { user } = useUser();

  const redirectTo = (route: string) => {
    router.push(route);
  }

  const makeUserLogout = () => {
    userId.current = localStorage.getItem('userId') || "";

    logout(userId.current);
  }

  return (
    <div className="w-[768px] h-20 flex flex-row items-end justify-between
    border-b border-black">
      <button onClick={() => redirectTo('/home')}>
        <Image src={LogoGreen} alt="Application Logo"/>
      </button>

      <section className="flex h-16 self-center flex-col justify-between items-end">
        <strong className="font-[family-name:var(--font-cormorant)] text-base font-bold">
          { user?.name || "Nome de Usuário" }
        </strong>

        <div className="flex flex-row gap-2">
          <button onClick={() => redirectTo('/areas-of-interest')}>
            <FiSettings color="#27AE60" size={18} />
          </button>
          <button onClick={makeUserLogout}>
            <FiLogOut color="#27AE60" size={18} />
          </button>
        </div>
      </section>
    </div>
  )
}