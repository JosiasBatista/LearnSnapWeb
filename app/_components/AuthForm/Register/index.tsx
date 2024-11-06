"use client"

import { useState } from "react";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import Input from "@/app/_components/Input"
import LoadingImg from "@/app/assets/LoadingWhite.svg";
import { register, RegisterProp } from "@/services/authService";
import { getUserById } from "@/services/userService";
import { useUser } from "@/app/_context/userContext";
import Image from "next/image";

export default function RegistrationForm({changeForm}: Readonly<{ changeForm: () => void }>) {
  const router = useRouter();
  const [registrationForm, setRegistrationForm] = useState<RegisterProp>({
    name: "",
    password: "",
    passwordConfirm: "",
    email: "",
    type: "Educator"
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useUser();

  const registerAccount = async () => {
    setLoading(true);

    register(registrationForm).then(async ({ userId }) => {
      const user = await getUserById(userId);
      setUser(user.data);
      localStorage.setItem('user', JSON.stringify(user.data));
      
      toast.success("Login realizado com sucesso!")
      router.push('/areas-of-interest')
    }).catch(() => {
      toast.error("Erro ao realizar login!");
      setLoading(false);
    })
  }

  const setFormValue = (value: string, formValueName: string) => {
    const newValues: any = {...registrationForm};
    newValues[formValueName] = value;

    setRegistrationForm(newValues)
  }

  return (
    <div className="w-5/6 bg-background rounded-2xl h-[70vh] flex flex-col
      items-center justify-center">
      <span className="w-3/4 text-2xl font-[family-name:var(--font-montserrat) 
      text-center mb-10">
        Faça o seu registro!
      </span>

      <Input
        inputChange={(text: string) => setFormValue(text, "email")}
        placeholder="Seu email"
        type="email"
      />
      <Input
        inputChange={(text: string) => setFormValue(text, "password")}
        placeholder="Sua senha"
        type="password"
      />
      <Input
        inputChange={(text: string) => setFormValue(text, "passwordConfirm")}
        placeholder="Confirme sua senha"
        type="password"
      />
      <Input
        inputChange={(text: string) => setFormValue(text, "name")}
        placeholder="Nome de usuário"
        type="text"
      />

      <button disabled={loading} onClick={() => registerAccount()} 
      className="mt-4 bg-primary flex justify-center items-center rounded-lg h-11 w-64 text-white">
        {loading ?
          <Image src={LoadingImg} alt="LoadingImg" /> :
          'Registrar-se'
        }
      </button>
      <button onClick={changeForm} 
      className="mt-2 bg-transparent text-primary text-sm">
        Já possuo uma conta
      </button>
    </div>
  )
}