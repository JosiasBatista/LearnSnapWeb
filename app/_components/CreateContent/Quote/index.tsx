"use client"

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import Input from "../../Input";
import { getAreas } from "@/services/areaService";
import { Area } from "@/app/types";
import { createQuote } from "@/services/contentService";
import toast from "react-hot-toast";

interface QuoteCreationProps {
  description: string,
  quoteAuthor: string,
  areaId: number
}

export default function CreateQuote() {
  const router = useRouter();
  const [quoteData, setQuoteData] = useState<QuoteCreationProps>({
    description: "",
    quoteAuthor: "",
    areaId: -1
  });
  const [areas, setAreas] = useState<Area[]>();

  useEffect(() => {
    getAreas().then(response => {
      setAreas(response.data);
    })
  }, [])

  const setFormValue = (value: string | number, formValueName: string) => {
    const newValues: any = {...quoteData};
    newValues[formValueName] = value;

    setQuoteData(newValues)
  }

  const callCreateQuote = () => {
    createQuote(quoteData).then(() => {
      toast.success("Citação criada com sucesso!");
      router.push('/home')
    }).catch((error) => {
      toast.error(error.message)
    })
  }

  return (
    <section className="ml-4">
      <Input labelName="Citação" fieldRequired={true} 
        inputChange={(text: string) => setFormValue(text, "description")} />
      <Input labelName="Autor da Citação" fieldRequired={true} 
        inputChange={(text: string) => setFormValue(text, "quoteAuthor")} />

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
      onClick={() => callCreateQuote()}
      className="mt-4 bg-primary rounded-lg h-11 w-64 text-white self-end"
      >
        Publicar
      </button>
    </section>
  )
}