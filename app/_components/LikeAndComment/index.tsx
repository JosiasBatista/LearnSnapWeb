import { likeContent, unlikeContent } from "@/services/contentService";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiHeart, FiMessageSquare } from "react-icons/fi";
import AddComment from "../AddComment";

export default function LikeAndComment({ values, liked, contentId }: any) {
  const [likeAmount, setLikeAmount] = useState<number>(values.Like);
  const [isLiked, setIsLiked] = useState(liked);
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);

  const executeLikeContent = () => {
    if (isLiked) {
      unlikeContent(isLiked?.id).then(() => {
        setIsLiked(null);
        setLikeAmount(likeAmount - 1);
      })
    } else {
      likeContent(contentId).then((response: any) => {
        setLikeAmount(response.data.likeAmount);
        setIsLiked({ id: response.data.like.id });

        toast.success("Conteúdo curtido com sucesso!")
      })
    }
  }

  return (
    <section className="flex flex-row gap-4 my-2">
      <button className="flex flex-row gap-1 items-center" onClick={() => executeLikeContent()}>
        <FiHeart size={16} color={isLiked ? "#27AE60" : "#747474"} />
        <span className={"font-[family-name:var(--font-montserrat)] text-xs font-regular"
          + (isLiked ? " text-primary" : "") 
        }>
          {likeAmount} curtidas
        </span>
      </button>

      <button className="flex flex-row gap-1 items-center" onClick={() => setIsCommentOpen(true)}>
        <FiMessageSquare size={16} color="#747474" />
        <span className="font-[family-name:var(--font-montserrat)] text-xs font-regular">
          {values.Comment} comentários
        </span>
      </button>

      {isCommentOpen &&
        <AddComment close={() => setIsCommentOpen(false)} contentId={contentId} />
      }
    </section>
  )
}