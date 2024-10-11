"use client"

import Link from "next/link";
import LikeAndComment from "../../LikeAndComment";
import Creator from "../Creator";
import { useState } from "react";
import toast from "react-hot-toast";
import { answerQuizz } from "@/services/contentService";

export default function Quizz({ content }: any) {
  const [quizzAnswer, setQuizzAnswer] = useState<string>("");

  const callAnswerQuizz = () => {
    if (!quizzAnswer) {
      toast.error("Selecione uma opção para responder!");
      return;
    }

    answerQuizz(content.id, quizzAnswer).then((response) => {
      if (response.data.isCorrect) {
        toast.success("Parabéns! Você respondeu corretamente")
      } else {
        toast.error("Ah, que pena! Você errou!")
      }
    })
  }
  
  return (
    <section className="w-[535px] overflow-y-scroll pt-8">
      <div className="flex flex-col border-b border-[#C2C2C2] gap-2">
        <div className="flex flex-row w-full justify-between">
          <Creator author={content.author} />

          <Link href={`/quizz/${content.id}`}
            className="font-[family-name:var(--font-cormorant)] text-sm text-primary"
          >
            Ver mais
          </Link>
        </div>
        
        <span className="font-[family-name:var(--font-cormorant)] text-xl font-bold">
          {content.quizz.question}
        </span>

        <div className="flex flex-row gap-1">
          {content.quizz.QuizzAnswer && content.quizz.QuizzAnswer.length > 0 ?
            (
              <div className="flex flex-row mb-4">
                <span className="font-[family-name:var(--font-cormorant)] text-base">
                  Você respondeu {content.quizz.QuizzAnswer[0].isCorrect ? 'corretamente' : 'erroneamente'}:
                </span>
                <span className="font-[family-name:var(--font-cormorant)] text-base text-primary font-bold">
                  &nbsp;{content.quizz.QuizzAnswer[0].answer}
                </span>
              </div>
            )
            :
            content.quizz.options.map((option: any) => 
              <>
                <div key={option.id} className="bg-[#E6E6E6] min-h-16 min-w-[30%] items-center rounded-lg flex flex-row p-2 gap-2">
                  <input 
                    type="radio" 
                    name="options" 
                    onChange={(e) => setQuizzAnswer(e.currentTarget.value)} 
                    value={option} 
                  />
                  <span className="font-[family-name:var(--font-montserrat)] max-w-[70%] text-xs font-regular">
                    {option}
                  </span>
                </div>
                
                <button 
                onClick={callAnswerQuizz}
                className="w-32 text-xs text-center h-6 rounded-lg bg-primary text-white mt-3 self-end"
                >
                  Responder
                </button>
              </>
            )
          }
        </div>

        <LikeAndComment values={content._count} liked={content.Like[0]} contentId={content.id} />
      </div>
    </section>
  )
}