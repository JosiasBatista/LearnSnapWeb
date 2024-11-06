"use client"

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import Creator from '@/app/_components/Content/Creator';
import { deleteContent, getContentComments, getQuoteById } from '@/services/contentService';
import LikeAndComment from '@/app/_components/LikeAndComment';
import CommentsList from '@/app/_components/CommentsList';
import { FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function QuizPage() {
  const { id } = useParams();
  const [quote, setQuote] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const router = useRouter();
  const userId = useRef<string>();

  useEffect(() => {
    userId.current = localStorage.getItem('userId') || "";

    if (id) {
      const quoteId = typeof id === "string" ? parseInt(id) : parseInt(id[0]);

      getContentComments(quoteId).then(response => {
        if (response.data) {
          setComments(response.data);
        }
      })

      getQuoteById(quoteId).then((response: any) => {
        if (response.data) {
          setQuote(response.data)
        }
      }).catch((error: any) => {
        toast.error(error)
      })
    }
  }, [id]);

  const callDeleteContent = () => {
    deleteContent(quote.contentId, "quote").then(() => {
      toast.success("Conteúdo deletado com sucesso!");
      router.push("/home");
    })
  }

  if (!quote) {
    return <div className="font-[family-name:var(--font-cormorant)] font-bold text-4xl text-primary mt-4">
      Carregando quote...
    </div>;
  }

  return (
    <div className="flex flex-col gap-2 mt-6 max-w-[535px]">
      <div className="flex flex-row justify-between w-full">
        <Creator author={quote.content.author} />
      
        {quote.content.authorId == userId.current &&
          <button className="bg-transparent" onClick={callDeleteContent}>
            <FiTrash2 size={16} color="#27AE60" />
          </button>
        }
      </div>

      <div className="flex flex-row gap-2">
        <strong className="font-[family-name:var(--font-cormorant)] leading-8 text-primary text-[42px] font-bold">
          &quot;</strong>
        <p className="font-[family-name:var(--font-cormorant)] text-2xl font-bold whitespace-pre-line">
          {quote.description}
        </p>
      </div>

      <span className="font-[family-name:var(--font-cormorant)] mt-2 text-primary text-base font-bold">
        {quote.quoteAuthor}
      </span>

      <LikeAndComment values={quote.content._count} contentId={quote.contentId} />

      <div className='border-b border-[#C2C2C2] py-2' />

      <CommentsList
        comments={comments}
      />
    </div>
  )
}