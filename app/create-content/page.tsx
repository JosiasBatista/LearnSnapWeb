"use client"

import { useState } from "react";

import Header from "../_components/Header";
import CreateArticle from "../_components/CreateContent/Article";
import CreateQuizz from "../_components/CreateContent/Quizz";
import CreateQuote from "../_components/CreateContent/Quote";

type ContentTypes = "Article" | "Quote" | "Quizz"

export default function CreateContent() {
  const [contentType, setContentType] = useState<ContentTypes | undefined>("Article");
  
  const renderContentOnScreen = () => {
    if (contentType === "Article") {
      return <CreateArticle />
    } else if (contentType === "Quizz") {
      return <CreateQuizz />
    } else if (contentType === "Quote") {
      return <CreateQuote />
    }
  }

  return (
    <div className="w-screen flex flex-col items-center pb-8">
      <Header />
      
      <section className="w-[500px] overflow-y-scroll pt-8">
        <strong className="font-[family-name:var(--font-cormorant)] text-2xl">
          Criando novo conteúdo
        </strong>

        <div className="flex flex-row mt-6">
          <section className="flex flex-col w-4/12">
            <button 
              onClick={() => setContentType("Article")}
              className={`h-12 border-b border-[#C2C2C2] 
                font-[family-name:var(--font-cormorant)] font-bold
                ${contentType === "Article" ? " bg-primary text-white" : " bg-[#F4F4F4]"}`
            }>
              Artigo
            </button>
            <button 
              onClick={() => setContentType("Quote")}
              className={`h-12 border-b border-[#C2C2C2] 
                font-[family-name:var(--font-cormorant)] font-bold
                ${contentType === "Quote" ? " bg-primary text-white" : " bg-[#F4F4F4]"}`
            }>
              Citação
            </button>
            <button 
              onClick={() => setContentType("Quizz")}
              className={`h-12 border-b border-[#C2C2C2] 
                font-[family-name:var(--font-cormorant)] font-bold
                ${contentType === "Quizz" ? " bg-primary text-white" : " bg-[#F4F4F4]"}`
            }>
              Quiz</
            button>
          </section>

          <section className="w-8/12 border-s border-[#C2C2C2]">
            {renderContentOnScreen()}
          </section>
        </div>
      </section>
    </div>
  )
}