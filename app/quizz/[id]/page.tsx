"use client"

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import Creator from '@/app/_components/Content/Creator';
import { answerQuizz, deleteContent, getContentComments, getQuizzById } from '@/services/contentService';
import LikeAndComment from '@/app/_components/LikeAndComment';
import CommentsList from '@/app/_components/CommentsList';
import { FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function QuizPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [quizzAnswer, setQuizzAnswer] = useState<string>("");
  const [comments, setComments] = useState<any[]>([]);
  const router = useRouter();
  const userId = useRef<string>();

  useEffect(() => {
    userId.current = localStorage.getItem('userId') || "";

    if (id) {
      const quizzId = typeof id === "string" ? parseInt(id) : parseInt(id[0]);

      getContentComments(quizzId).then(response => {
        if (response.data) {
          setComments(response.data);
        }
      })

      getQuizzById(quizzId).then((response: any) => {
        if (response.data) {
          setQuiz(response.data)
        }
      }).catch((error: any) => {
        toast.error(error)
      })
    }
  }, [id]);

  const callAnswerQuizz = () => {
    if (!quizzAnswer) {
      toast.error("Selecione uma opção para responder!");
      return;
    }

    answerQuizz(quiz.id, quizzAnswer).then((response) => {
      if (response.data.isCorrect) {
        toast.success("Parabéns! Você respondeu corretamente")
      } else {
        toast.error("Ah, que pena! Você errou!")
      }
    })
  }

  const callDeleteContent = () => {
    deleteContent(quiz.contentId, "quizz").then(() => {
      toast.success("Conteúdo deletado com sucesso!");
      router.push("/home");
    })
  }

  if (!quiz) {
    return <div className="font-[family-name:var(--font-cormorant)] font-bold text-4xl text-primary mt-4">
      Carregando quiz...
    </div>;
  }

  return (
    <div className="flex flex-col gap-2 mt-6 max-w-[535px]">
      <div className="flex flex-row justify-between w-full">
        <Creator author={quiz.content.author} />
      
        {quiz.content.authorId == userId.current &&
          <button className="bg-transparent" onClick={callDeleteContent}>
            <FiTrash2 size={16} color="#27AE60" />
          </button>
        }
      </div>

      <span className="font-[family-name:var(--font-cormorant)] text-xl font-bold whitespace-pre-line">
        {quiz.question}
      </span>

      <div className="flex flex-row gap-1">
        {quiz.QuizzAnswer && quiz.QuizzAnswer.length > 0 ?
          (
            <div className="flex flex-row mb-4">
              <span className="font-[family-name:var(--font-cormorant)] text-base">
                Você respondeu {quiz.QuizzAnswer[0].isCorrect ? 'corretamente' : 'erroneamente'}:
              </span>
              <span className="font-[family-name:var(--font-cormorant)] text-base text-primary font-bold">
                &nbsp;{quiz.QuizzAnswer[0].answer}
              </span>
            </div>
          )
          :
          quiz.options.map((option: any) => 
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

      <LikeAndComment values={quiz.content._count} contentId={quiz.contentId} />

      <div className='border-b border-[#C2C2C2] py-2' />

      <CommentsList
        comments={comments}
      />
    </div>
  )
}