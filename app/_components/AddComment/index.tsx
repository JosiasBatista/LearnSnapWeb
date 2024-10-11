"use client"

import { useState } from "react"
import { FiXCircle } from "react-icons/fi";
import TextArea from "../TextArea";
import toast from "react-hot-toast";
import { createComment } from "@/services/contentService";

interface CommentProps {
  contentId: number,
  close: () => void
}

export default function AddComment({ contentId, close }: CommentProps) {
  const [comment, setComments] = useState<string>("");

  const callAddComment = () => {
    if (!comment) {
      toast.error("Preencha o campo para adicionar um comentário!");
      return;  
    }

    createComment(contentId, comment).then(() => {
      toast.success("Comentário adicionado com sucesso!")
      close();
    }).catch(() => {
      toast.error("Houve um erro ao adicionar o comentário!");
    })
  }

  return (
    <div className="w-screen h-screen bg-black/60 fixed top-0 left-0">
      <div className="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] 
      bg-white py-6 px-12 rounded-2xl flex flex-col">
        <button className="self-end" onClick={close}>
          <FiXCircle color="" size={24} />
        </button>

        <TextArea labelName="Adicione um comentário" inputChange={(text) => setComments(text)} />

        <div className="right-3 bottom-3 self-end mt-4">
          <button className="text-primary font-[family-name:var(--font-cormorant)] 
          font-semibold text-base border border-primary rounded-lg px-2 py-1" onClick={close}>
            Cancelar
          </button>
          <button className="text-white font-[family-name:var(--font-cormorant)] 
          font-semibold text-base bg-primary rounded-lg px-2 py-1 ml-2" onClick={callAddComment}>
            Adicionar
          </button>
        </div>
      </div>
    </div>
  )
}