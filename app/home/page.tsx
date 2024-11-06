"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { FiPlusSquare } from "react-icons/fi";
import Image from "next/image";

import Loading from "@/app/assets/Loading.svg";
import Article from "../_components/Content/Article";
import Quizz from "../_components/Content/Quizz";
import Quote from "../_components/Content/Quote";
import Header from "../_components/Header";
import Empty from "@/app/assets/Empty.svg";
import { getContentList } from "@/services/contentService";
import { Pagination } from "../_components/Pagination";

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalContents, setTotalContents] = useState<number>(0);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getContentList(page).then(result => {
      setContents(result.data ? result.data.data : []);
      setTotalPages(result.data.totalPages);
      setTotalContents(result.data.total);
    }).catch((error) => {
      toast.error(error.data.message);
    }).finally(() => {
      setLoading(false);
    })
  }, [page]);
  
  const renderContentOnScreen = (content: any) => {
    if (content.article) {
      return <Article content={content} key={content.id} />
    } else if (content.quote) {
      return <Quote content={content} key={content.id} />
    } else if (content.quizz) {
      return <Quizz content={content} key={content.id} />
    }
  }

  if (loading) {
    return (
      <div className="w-screen flex flex-col items-center pb-8">
        <Header />

        <Image src={Loading} alt="Carregando" className="mt-6" />
        <strong className="font-[family-name:var(--font-cormorant)] font-bold text-4xl max-w-[70%] text-primary text-center">
          Estamos carregando as informações
        </strong>
      </div>
    )
  }

  return (
    <div className="w-screen flex flex-col items-center pb-8">
      <Header />

      {contents.length > 0 ?
        <>
          {contents.map(content => 
            renderContentOnScreen(content)
          )}
          <Pagination visibleContentAmount={contents.length} currentPage={page} totalPages={totalPages} 
            total={totalContents} onPageChange={(page) => setPage(page)} />
        </>
        :
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