"use client"

import { useState, useEffect } from "react";

import Input from "../../Input";
import { getAreas } from "@/services/areaService";
import TextArea from "../../TextArea";
import { Area } from "@/app/types";
import { createArticle } from "@/services/contentService";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

interface ArticleCreationProps {
  title: string,
  article: string,
  areaId: number
}

export default function CreateArticle() {
  const router = useRouter();
  const [articleData, setArticleData] = useState<ArticleCreationProps>({
    title: "",
    article: "",
    areaId: -1
  });
  const [areas, setAreas] = useState<Area[]>();

  useEffect(() => {
    getAreas().then(response => {
      setAreas(response.data);
    })
  }, [])

  const setFormValue = (value: string | number, formValueName: string) => {
    const newValues: any = {...articleData};
    newValues[formValueName] = value;

    setArticleData(newValues)
  }

  const callCreateArticle = () => {
    createArticle(articleData).then(() => {
      toast.success("Citação criada com sucesso!");
      router.push('/home')
    }).catch((error) => {
      toast.error(error.message)
    })
  }

  return (
    <section className="ml-4">
      <Input labelName="Título" fieldRequired={true} 
        inputChange={(text: string) => setFormValue(text, "title")} />
      <TextArea labelName="Conteúdo" rows={5} fieldRequired={true} 
        inputChange={(text: string) => setFormValue(text, "article")} />
      
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
      onClick={() => callCreateArticle()}
      className="mt-4 bg-primary rounded-lg h-11 w-64 text-white self-end">
        Publicar
      </button>
    </section>
  )
}