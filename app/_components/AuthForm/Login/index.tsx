"use client"

import { useState } from "react";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import Input from "@/app/_components/Input"
import LoadingImg from "@/app/assets/LoadingWhite.svg";
import { login } from "@/services/authService";
import { useUser } from "@/app/_context/userContext";
import { getUserById } from "@/services/userService";
import Image from "next/image";

export default function LoginForm({changeForm}: Readonly<{ changeForm: () => void }>) {
  const router = useRouter();
  const { setUser } = useUser();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const accessAccount = async () => {
    setLoading(true);
    const loginReq = { email, password };

    login(loginReq).then(async ({ userId }) => {
      const user = await getUserById(userId);
      setUser(user.data);
      localStorage.setItem('user', JSON.stringify(user.data));
      
      toast.success("Login realizado com sucesso!")
      router.push('/home')
    }).catch((error) => {
      toast.error(error.message);
      setLoading(false);
    })
  }

  return (
    <div className="w-5/6 bg-background rounded-2xl h-[70vh] flex flex-col
      items-center justify-center">
      <span className="w-3/4 text-2xl font-[family-name:var(--font-montserrat) 
      text-center mb-10">
        Acesse a sua conta agora mesmo!
      </span>

      <Input
        inputChange={(text: string) => setEmail(text)}
        placeholder="Seu email"
        type="email"
      />
      <Input
        inputChange={(text: string) => setPassword(text)}
        placeholder="Sua senha"
        type="password"
      />

      <button disabled={loading} onClick={() => accessAccount()} 
      className="mt-4 bg-primary flex justify-center items-center rounded-lg h-11 w-64 text-white">
        {loading ?
          <Image src={LoadingImg} alt="LoadingImg" /> :
          'Acessar'
        }
      </button>
      <button onClick={changeForm} 
      className="mt-2 bg-transparent text-primary text-sm">
        Ainda não possuo uma conta
      </button>
    </div>
  )
}