import Image from "next/image";

import Logo from "@/app/assets/Logo.svg";
import LoginImage from "@/app/assets/Login.svg";

export default function LoginPage() {
  return (
    <div className="bg-primary-color w-screen h-screen flex flex-row items-center justify-center">
      <section className="w-1/3">
        <div className="flex flex-row gap-x-12 items-center mb-10">
          <Image src={Logo} alt="App Logo" />
          <p className="text-white text-2xl font-[family-name:var(--font-cormorant-regular)]">
            Troque o scroll infrutífero por momentos de aprendizado no seu dia. 
            Tenha novas informações e conteúdos em um estalar de dedos.
          </p>
        </div>

        <Image src={LoginImage} alt="Relaxing image representing the app's user" />
      </section>

      <section className="w-1/3 flex items-center justify-center">
        <div className="w-5/6 bg-background rounded-2xl h-96"></div>
      </section>
    </div>
  )
}