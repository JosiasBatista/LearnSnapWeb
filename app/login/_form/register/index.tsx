"use client"

import { useState } from "react";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import Input from "@/app/_components/Input"
import { register, RegisterProp } from "@/services/authService";

export default function RegistrationForm({changeForm}: Readonly<{ changeForm: () => void }>) {
  const router = useRouter();
  const [registrationForm, setRegistrationForm] = useState<RegisterProp>({
    name: "",
    password: "",
    passwordConfirm: "",
    email: "",
    type: ""
  });
  const [loading, setLoading] = useState<boolean>(false);

  const registerAccount = async () => {
    setLoading(true);

    register(registrationForm).then(() => {
      toast.success("Login realizado com sucesso!")
      router.push('/home')
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
      <section className="flex flex-row w-[85%] justify-between">
        <div className="flex flex-row gap-1">
          <input type="radio" name="userType" 
            onChange={(value) => setFormValue(value.currentTarget.value, "type")} 
            value="Educator" />
          <span>Educador</span>
        </div>
        
        <div className="flex flex-row gap-1">
          <input type="radio" name="userType" 
          onChange={(value) => setFormValue(value.currentTarget.value, "type")} 
          value="Learner" />
          <span>Aprendiz</span>
        </div>
      </section>

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