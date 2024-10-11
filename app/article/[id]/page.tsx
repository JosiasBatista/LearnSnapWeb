"use client"

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import Creator from '@/app/_components/Content/Creator';
import { answerQuizz, deleteContent, getArticleById, getContentComments, getQuizzById } from '@/services/contentService';
import LikeAndComment from '@/app/_components/LikeAndComment';
import CommentsList from '@/app/_components/CommentsList';
import { FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const router = useRouter();
  const userId = useRef<string>();

  useEffect(() => {
    userId.current = localStorage.getItem('userId') || "";

    if (id) {
      const articleId = typeof id === "string" ? parseInt(id) : parseInt(id[0]);

      getContentComments(articleId).then(response => {
        if (response.data) {
          setComments(response.data);
        }
      })

      getArticleById(articleId).then((response: any) => {
        if (response.data) {
          setArticle(response.data)
        }
      }).catch((error: any) => {
        toast.error(error)
      })
    }
  }, [id]);

  const callDeleteContent = () => {
    deleteContent(article.contentId, "article").then(() => {
      toast.success("Conteúdo deletado com sucesso!");
      router.push("/home");
    })
  }

  if (!article) {
    return <div className="font-[family-name:var(--font-cormorant)] font-bold text-4xl text-primary mt-4">
      Carregando artigo...
    </div>;
  }

  return (
    <div className="flex flex-col gap-2 mt-6 max-w-[535px]">
      <div className="flex flex-row justify-between w-full">
        <Creator author={article.content.author} />
      
        {article.content.authorId == userId.current &&
          <button className="bg-transparent" onClick={callDeleteContent}>
            <FiTrash2 size={16} color="#27AE60" />
          </button>
        }
      </div>

      <strong className="font-[family-name:var(--font-cormorant)] text-primary text-2xl font-bold">
        {article.title}
      </strong>

      <p className="font-[family-name:var(--font-montserrat)] text-xs font-regular">
        {article.article}
      </p>

      <LikeAndComment values={article.content._count} contentId={article.contentId} />

      <div className='border-b border-[#C2C2C2] py-2' />

      <CommentsList
        comments={comments}
      />
    </div>
  )
}