"use client"

import { useState } from "react";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import Input from "@/app/_components/Input"
import { login } from "@/services/authService";

interface RegistrationProps {
  name: string,
  email: string,
  password: string,
  passwordConfirm: string,
  type: string
}

export default function RegistrationForm({changeForm}: Readonly<{ changeForm: () => void }>) {
  const router = useRouter();
  const [registrationForm, setRegistrationForm] = useState<RegistrationProps>({
    name: "",
    password: "",
    passwordConfirm: "",
    email: "",
    type: ""
  });
  const [loading, setLoading] = useState<boolean>(false);

  const registerAccount = async () => {
    setLoading(true);

    login(registrationForm).then(() => {
      toast.success("Login realizado com sucesso!")
      router.push('/about')
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
        inputChange={(text: string) => setFormValue(text, "name")}
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
        inputChange={(text: string) => setFormValue(text, "username")}
        placeholder="Nome de usuário"
        type="text"
      />

      <button disabled={loading} onClick={() => registerAccount()} 
      className="mt-4 bg-primary rounded-lg h-11 w-64 text-white">
        Registrar-se
      </button>
      <button onClick={changeForm} 
      className="mt-2 bg-transparent text-primary text-sm">
        Já possuo uma conta
      </button>
    </div>
  )
}