"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { FiPlusSquare } from "react-icons/fi";

import Article from "../_components/Content/Article";
import Quizz from "../_components/Content/Quizz";
import Quote from "../_components/Content/Quote";
import Header from "../_components/Header";
import Empty from "@/app/assets/Empty.svg";
import { getContentList } from "@/services/contentService";
import Image from "next/image";

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [contents, setContents] = useState([]);

  useEffect(() => {
    getContentList(page).then(result => {
      setContents(result.data ? result.data.data : []);
    }).catch((error) => {
      toast.error(error.data.message);
    })
  }, []);
  
  const renderContentOnScreen = (content: any) => {
    if (content.article) {
      return <Article content={content} key={content.id} />
    } else if (content.quote) {
      return <Quote content={content} key={content.id} />
    } else if (content.quizz) {
      return <Quizz content={content} key={content.id} />
    }
  }

  return (
    <div className="w-screen flex flex-col items-center pb-8">
      <Header />

      {contents.length > 0 ?
        contents.map(content => 
          renderContentOnScreen(content)
        ) :
        <div className="mt-8 flex flex-col items-center">
          <Image
            src={Empty}
            width={450}
            alt="Aplicação sem conteúdos"
          />
          <strong className="font-[family-name:var(--font-cormorant)] font-bold text-4xl max-w-[70%] text-primary text-center">
            Ainda não existem conteúdos!
          </strong>
        </div>
      }
      
      <Link href="/create-content" className="fixed end-[15%] bottom-8 rounded-lg bg-primary flex items-center justify-center w-11 h-11">
        <FiPlusSquare size={24} color="#FFF" />
      </Link>
    </div>
  )
}