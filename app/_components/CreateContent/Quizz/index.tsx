"use client"

import { useEffect, useState } from "react";

import Input from "../../Input";
import { getAreas } from "@/services/areaService";
import { Area } from "@/app/types";
import { createQuizz } from "@/services/contentService";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import LoadingImg from "@/app/assets/LoadingWhite.svg";

interface QuizzCreationProps {
  question: string,
  option1: string,
  option2: string,
  option3: string,
  correctAnswer: string,
  areaId: number
}

export default function CreateQuizz() {
  const router = useRouter();
  const [quizzData, setQuizzData] = useState<QuizzCreationProps>({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    correctAnswer: "",
    areaId: -1
  });
  const [areas, setAreas] = useState<Area[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getAreas().then(response => {
      setAreas(response.data);
    })
  }, [])

  const setFormValue = (value: string | number, formValueName: string) => {
    const newValues: any = {...quizzData};
    newValues[formValueName] = value;

    setQuizzData(newValues)
  }

  const callCreateQuizz = () => {
    setLoading(true);

    createQuizz(quizzData).then(() => {
      toast.success("Citação criada com sucesso!");
      router.push('/home')
    }).catch((error) => {
      toast.error(error.message)
    }).finally(() => {
      setLoading(false);
    })
  }

  return (
    <section className="ml-4">
      <Input labelName="Pergunta" fieldRequired={true} 
        inputChange={(text: string) => setFormValue(text, "question")} />
      <Input labelName="Alternativa 1" fieldRequired={true} 
        inputChange={(text: string) => setFormValue(text, "option1")} />
      <Input labelName="Alternativa 2" fieldRequired={true} 
        inputChange={(text: string) => setFormValue(text, "option2")} />
      <Input labelName="Alternativa 3" fieldRequired={true} 
        inputChange={(text: string) => setFormValue(text, "option3")} />
      <Input labelName="Resposta Correta" fieldRequired={true} 
        inputChange={(text: string) => setFormValue(text, "correctAnswer")} />
      
      <div className="mb-2 flex flex-col">
        <label className="font-[family-name:var(--font-cormorant)] font-semibold text-base mb-2"
         htmlFor="areas">Áreas</label>
        <select name="areas" id="areas" 
          onChange={(e) => setFormValue(parseInt(e.currentTarget.value), "areaId")} 
          className="bg-dark_gray rounded-lg h-11 w-64 p-2"
        >
          <option value="">- Selecione uma área -</option>
          {areas?.map(area => <option key={area.id} value={area.id}>{area.description}</option>)}
        </select>
      </div>

      <button 
      disabled={loading}
      onClick={() => callCreateQuizz()}
      className="mt-4 bg-primary flex justify-center items-center rounded-lg h-11 w-64 text-white self-end"
      >
        {loading ?
          <Image src={LoadingImg} alt="LoadingImg" /> :
          'Publicar'
        }
      </button>
    </section>
  )
}